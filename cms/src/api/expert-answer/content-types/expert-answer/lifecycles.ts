// src/api/expert-answer/content-types/expert-answer/lifecycles.ts
'use strict';
declare const strapi: any;

export default {
  // При створенні нової відповіді
  async afterCreate(event: { result: any }) {
    const created = event.result as any;
    if (!created.isConfirmed) return;

    // Довантажуємо повний запис з категорією
    const full = await strapi.entityService.findOne(
      'api::expert-answer.expert-answer',
      created.id,
      { populate: ['category'] }
    );
    const categoryId = (full as any).category?.id;
    if (!categoryId) {
      strapi.log.warn(`[EA.afterCreate] Відсутній categoryId для id=${created.id}`);
      return;
    }

    strapi.log.info(`🧪 [EA.afterCreate] confirmed answer id=${created.id}, categoryId=${categoryId}`);
    await recalcCVE(categoryId);
  },

  // При оновленні існуючої відповіді
  async afterUpdate(event: { result: any; params: { data: any } }) {
    if (event.params.data.isConfirmed !== true) return;

    // Довантажуємо повний запис з категорією
    const full = await strapi.entityService.findOne(
      'api::expert-answer.expert-answer',
      event.result.id,
      { populate: ['category'] }
    );
    const categoryId = (full as any).category?.id;
    if (!categoryId) {
      strapi.log.warn(`[EA.afterUpdate] Відсутній categoryId для id=${event.result.id}`);
      return;
    }

    strapi.log.info(`🧪 [EA.afterUpdate] confirmed answer id=${full.id}, categoryId=${categoryId}`);
    await recalcCVE(categoryId);
  },
};

/**
 * Перерахунок ExpertAnswer → CVE для категорії
 */
async function recalcCVE(categoryId: number) {
  strapi.log.info(`🔄 [recalcCVE] START categoryId=${categoryId}`);

  // 1) Завантажуємо всі підтверджені відповіді (лише поле answers)
  const answers = await strapi.entityService.findMany(
    'api::expert-answer.expert-answer',
    {
      filters: { category: { id: categoryId }, isConfirmed: true },
      fields: ['answers'],            // тут було 'answer'
    }
  ) as Array<{ answers: number[] }>;   // тут було { answer: number[] }

  if (answers.length === 0) {
    strapi.log.info(`🔄 [recalcCVE] Неможливо перерахувати — немає confirmed answers`);
    return;
  }

  // 2) Рахуємо поелементні середні
  const arrays = answers.map(a => a.answers);  // доступ до поля answers
  const maxLen = Math.max(...arrays.map(a => a.length));
  const sums = Array(maxLen).fill(0);
  const counts = Array(maxLen).fill(0);
  arrays.forEach(arr => {
    arr.forEach((v, i) => {
      sums[i] += v;
      counts[i] += 1;
    });
  });
  const means = sums.map((s, i) => counts[i] > 0 ? s / counts[i] : 0);

  // 3) Довантажуємо всі CVE з question.order
  const rawCves = await strapi.entityService.findMany(
    'api::category-vector-entry.category-vector-entry',
    {
      filters: { category: { id: categoryId } },
      populate: { question: { fields: ['order'] } },
    }
  ) as Array<{ id: number; question: { order: number } }>;

  // 4) Оновлюємо кожен CVE.value
  for (const { id, question } of rawCves) {
    const ord = question.order;
    const newVal = means[ord - 1] ?? 0;
    await strapi.entityService.update(
      'api::category-vector-entry.category-vector-entry',
      id,
      { data: { value: newVal } }
    );
    strapi.log.info(`✅ [recalcCVE] CVE id=${id}, order=${ord} → value=${newVal}`);
  }

  strapi.log.info(`🔄 [recalcCVE] END categoryId=${categoryId}`);
}
