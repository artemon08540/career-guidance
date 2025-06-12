// src/api/question/content-types/question/lifecycles.ts
'use strict';
declare const strapi: any;
import { recalculateCategory } from '../../../category/services/recalculateCategory';

export default {
  // Автоматично виставляємо order = max+1 якщо не задано
  async beforeCreate(event: { params: { data: any } }) {
    const { data } = event.params;
    if (data.order == null) {
      const existing = await strapi.entityService.findMany(
        'api::question.question',
        { sort: { order: 'desc' }, limit: 1, fields: ['order'] }
      );
      const max = existing[0]?.order ?? 0;
      data.order = max + 1;
    }
  },

  // Після будь-якої зміни (create/update/delete) — пересчет CVE
  async afterCreate()  { await recalcAllCats(); },
  async afterUpdate()  { await recalcAllCats(); },
  async beforeDelete(event: { params: { where: { id: number }; questionId?: number } }) {
    event.params.questionId = event.params.where.id;
  },

  async afterDelete(event: { params: { questionId?: number } }) {
    const id = event.params.questionId;

    if (id) {
      // Find related CVE ids first to avoid JOIN deletes that break on SQLite
      const toRemove = await strapi.db
        .query('api::category-vector-entry.category-vector-entry')
        .findMany({ select: ['id'], where: { question: { id } } });

      if (toRemove.length) {
        await strapi.db
          .query('api::category-vector-entry.category-vector-entry')
          .deleteMany({ where: { id: { $in: toRemove.map(e => e.id) } } });
      }
    }

    // Clean up any entries whose question link became null
    const orphaned = await strapi.db
      .query('api::category-vector-entry.category-vector-entry')
      .findMany({ select: ['id'], where: { question: null } });

    if (orphaned.length) {
      await strapi.db
        .query('api::category-vector-entry.category-vector-entry')
        .deleteMany({ where: { id: { $in: orphaned.map(e => e.id) } } });
    }

    await recalcAllCats();
  },
};

async function recalcAllCats() {
  const cats = await strapi.entityService.findMany(
    'api::category.category', { fields: ['id'] }
  );
  for (const { id } of cats) {
    await recalculateCategory(strapi, id);
  }
}
