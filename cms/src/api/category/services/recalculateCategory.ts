// файл: src/api/category/services/recalculateCategory.ts
'use strict';
declare const strapi: any;

/**
 * Для категорії:
 * 1) Додає CVE для всіх опублікованих питань (якщо їх ще нема)
 * 2) Перераховує вектор (масив value) за порядком питань
 */
export async function recalculateCategory(strapi: any, categoryId: number): Promise<void> {
  strapi.log.info(`[recalculateCategory] START categoryId=${categoryId}`);

  // 1) Отримати всі live питання
  const questions = await strapi.entityService.findMany(
    'api::question.question',
    {
      fields: ['id'],
      publicationState: 'live',
      sort: { order: 'asc' },
    }
  ) as Array<{ id: number }>;

  // 2) Для кожного питання переконатися, що є CVE
  for (const { id: questionId } of questions) {
    const exists = await strapi.db
      .query('api::category-vector-entry.category-vector-entry')
      .findOne({ where: { category: categoryId, question: questionId } });

    if (!exists) {
      await strapi.entityService.create(
        'api::category-vector-entry.category-vector-entry',
        {
          data: {
            category: { connect: { id: categoryId } },
            question: { connect: { id: questionId } },
            value: 0,
          },
        }
      );
      strapi.log.debug(`➕ CVE created for category=${categoryId}, question=${questionId}`);
    }
  }

  // 3) Зібрати всі CVE цієї категорії, відсортувати по question.order і сформувати вектор
  const rawEntries = await strapi.entityService.findMany(
    'api::category-vector-entry.category-vector-entry',
    {
      filters: { category: { id: categoryId } },
      populate: { question: { fields: ['order'] } },
    }
  ) as Array<{ value: number; question: { order: number } }>;

  const vector = rawEntries
    .sort((a, b) => a.question.order - b.question.order)
    .map(e => e.value);

  // 4) Записати вектор у Category
  await strapi.entityService.update(
    'api::category.category',
    categoryId,
    { data: { vector } }
  );

  strapi.log.info(`[recalculateCategory] DONE categoryId=${categoryId}, vector=[${vector.join(', ')}]`);
}
