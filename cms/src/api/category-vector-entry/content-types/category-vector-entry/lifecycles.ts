// src/api/category-vector-entry/content-types/category-vector-entry/lifecycles.ts
'use strict';
declare const strapi: any;

interface CategoryVectorEntry {
  value: number;
  question: {
    order: number;
  };
}

/**
 * Замінює вектор у категорії на позиції, що відповідає question.order
 */
async function updateCategoryVectorAt(
  categoryId: number,
  questionOrder: number,
  newValue: number
) {
  // 1) Зчитуємо поточний масив vector
  const cat = await strapi.entityService.findOne(
    'api::category.category',
    categoryId,
    { fields: ['vector'] }
  );
  const vector: number[] = Array.isArray(cat.vector) ? cat.vector : [];

  // 2) Дістаємо всі записи, щоб знати порядок
  const raws = await strapi.entityService.findMany(
    'api::category-vector-entry.category-vector-entry',
    {
      filters: { category: { id: categoryId } },
      populate: { question: { fields: ['order'] } },
    }
  );
  const entries = raws as CategoryVectorEntry[];

  // 3) Знаходимо індекс за order
  const sortedOrders = entries
    .map((e) => e.question.order)
    .sort((a, b) => a - b);
  const idx = sortedOrders.indexOf(questionOrder);
  if (idx === -1) {
    strapi.log.warn(
      `[CVE] Не знайдено order=${questionOrder} для category=${categoryId}`
    );
    return;
  }

  // 4) Замінюємо та зберігаємо
  vector[idx] = newValue;
  await strapi.entityService.update(
    'api::category.category',
    categoryId,
    { data: { vector } }
  );
}

/**
 * Повне перестроєння вектора (після видалення, бо індекси зсуваються)
 */
async function updateCategoryVector(categoryId: number) {
  const raws = await strapi.entityService.findMany(
    'api::category-vector-entry.category-vector-entry',
    {
      filters: { category: { id: categoryId } },
      populate: { question: { fields: ['order'] } },
    }
  );
  const entries = (raws as CategoryVectorEntry[]).sort(
    (a, b) => a.question.order - b.question.order
  );
  const vector = entries.map((e) => e.value);
  await strapi.entityService.update(
    'api::category.category',
    categoryId,
    { data: { vector } }
  );
}

export default {
  // Після створення — додаємо нове значення в нужну позицію
  async afterCreate(event: { result: any }) {
    const { id } = event.result as { id: number };
    const fresh = await strapi.entityService.findOne(
      'api::category-vector-entry.category-vector-entry',
      id,
      { populate: ['question', 'category'] }
    );
    await updateCategoryVectorAt(
      fresh.category.id,
      fresh.question.order,
      fresh.value
    );
  },

  // Після оновлення — міняємо тільки потрібне значення
  async afterUpdate(event: { result: any }) {
    const { id } = event.result as { id: number };
    const fresh = await strapi.entityService.findOne(
      'api::category-vector-entry.category-vector-entry',
      id,
      { populate: ['question', 'category'] }
    );
    await updateCategoryVectorAt(
      fresh.category.id,
      fresh.question.order,
      fresh.value
    );
  },

  // Перед видаленням — зберігаємо categoryId
  async beforeDelete(event: { params: { where: { id: number }; categoryId?: number } }) {
    const id = event.params.where.id;
    const entry = await strapi.entityService.findOne(
      'api::category-vector-entry.category-vector-entry',
      id,
      { populate: ['category'] }
    );
    event.params.categoryId = (entry as any).category.id;
  },

  // Після видалення — робимо повне перестроєння вектора
  async afterDelete(event: { params: { categoryId?: number } }) {
    const categoryId = event.params.categoryId;
    if (categoryId) {
      await updateCategoryVector(categoryId);
    }
  },
};
