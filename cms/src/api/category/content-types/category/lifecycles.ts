// src/api/category/content-types/category/lifecycles.ts
'use strict';
declare const strapi: any;

interface Category {
  id: number;
  isVerified: boolean;
}

/**
 * Додає у CategoryVectorEntry записи для кожного опублікованого питання
 * ігноруючи «биті» події з інших моделей.
 */
async function populateCategoryVectorEntries(categoryId: number): Promise<void> {
  strapi.log.info(`🛠️ [populate] Start for categoryId=${categoryId}`);

  // 1) Отримуємо всі живі (published) питання через entityService
  const questions: { id: number }[] = await strapi.entityService.findMany(
    'api::question.question',
    {
      fields: ['id'],
      publicationState: 'live',
      sort: { order: 'asc' },
    }
  );
  const qids = questions.map((q) => q.id).join(', ');
  strapi.log.info(`🛠️ [populate] question IDs: [${qids}]`);

  // 2) Створюємо лише ті пари (category, question), яких ще нема
  let createdCount = 0;
  for (const { id: questionId } of questions) {
    const exists = await strapi.db
      .query('api::category-vector-entry.category-vector-entry')
      .findOne({ where: { category: categoryId, question: questionId } });
    if (exists) {
      strapi.log.debug(`⏭️ Skip existing: category=${categoryId}, question=${questionId}`);
      continue;
    }

    strapi.log.info(`➕ Creating CVE for category=${categoryId}, question=${questionId}`);
    try {
      const created = await strapi.entityService.create(
        'api::category-vector-entry.category-vector-entry',
        {
          data: {
            category: { connect: { id: categoryId } },
            question: { connect: { id: questionId } },
            value: 3,
          },
          populate: ['category', 'question'],
        }
      );
      createdCount++;
      strapi.log.info(
        `✅ Created entryId=${created.id} → category=${created.category?.id}, question=${created.question?.id}`
      );
    } catch (err) {
      strapi.log.error(`❌ Error creating CVE for questionId=${questionId}`, err);
    }
  }

  strapi.log.info(
    `🛠️ [populate] Finished for categoryId=${categoryId}, created=${createdCount}`
  );
}

export default {
  // Працює тільки коли створюється Category (не інші моделі!)
  async afterCreate(event: any) {
    // Захистимося від «левих» подій
    if (event.model?.uid !== 'api::category.category') return;

    const { id, isVerified }: Category = event.result;
    strapi.log.info(`🔔 [afterCreate] Category id=${id}, isVerified=${isVerified}`);
    if (isVerified) {
      await populateCategoryVectorEntries(id);
    }
  },

  // Працює тільки коли оновлюється Category (не інші моделі!)
  async afterUpdate(event: any) {
    if (event.model?.uid !== 'api::category.category') return;

    const { id, isVerified }: Category = event.result;
    const was = event.params.data.isVerified;
    strapi.log.info(
      `🔔 [afterUpdate] Category id=${id}, wasVerified=${was}, nowVerified=${isVerified}`
    );
    if (was === true && isVerified) {
      await populateCategoryVectorEntries(id);
    }
  },
};
