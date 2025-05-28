// src/api/question/content-types/question/lifecycles.ts
'use strict';
declare const strapi: any;
import { recalculateCategory } from '../../../category/services/recalculateCategory';

export default {
  /**
   * Перед створенням:
   * – якщо order не передано, ставимо maxOrder+1
   * – якщо order передано, зсуваємо вниз усі питання з order ≥ data.order
   */
  async beforeCreate(event: { params: { data: any } }) {
    const { data } = event.params;

    // Знаходимо поточний максимум order
    const existing = await strapi.entityService.findMany(
      'api::question.question',
      {
        sort: { order: 'desc' },
        limit: 1,
        fields: ['order'],
      }
    );
    const maxOrder = existing[0]?.order ?? 0;

    if (data.order == null) {
      // Якщо order не вказано — додаємо в кінець
      data.order = maxOrder + 1;
    } else {
      // Якщо вказано — зсуваємо вниз усі з order ≥ newOrder
      const toShift = await strapi.entityService.findMany(
        'api::question.question',
        {
          filters: { order: { $gte: data.order } },
          sort: { order: 'desc' },
          fields: ['id', 'order'],
        }
      );
      for (const { id, order } of toShift) {
        await strapi.entityService.update(
          'api::question.question',
          id,
          { data: { order: order + 1 } }
        );
      }
    }
  },

  /**
   * Після створення — пересчет CVE для всіх категорій
   */
  async afterCreate() {
    const cats = await strapi.entityService.findMany(
      'api::category.category',
      { fields: ['id'] }
    );
    for (const { id } of cats) {
      await recalculateCategory(strapi, id);
    }
  },

  /**
   * Перед оновленням — якщо в payload є order, зберігаємо старий і новий
   */
  async beforeUpdate(event: { params: { where: { id: number }; data: any }; state: any }) {
    const { id } = event.params.where;
    const { data } = event.params;

    if (data.order != null) {
      const prev = await strapi.entityService.findOne(
        'api::question.question',
        id,
        { fields: ['order'] }
      );
      event.state.prevOrder = prev.order;
      event.state.newOrder = data.order;
    }
  },

  /**
   * Після оновлення — якщо order змінився, зсуваємо проміжні, потім CVE
   */
  async afterUpdate(event: { state: any }) {
    const { prevOrder, newOrder } = event.state;
    if (
      prevOrder != null &&
      newOrder != null &&
      prevOrder !== newOrder
    ) {
      if (newOrder < prevOrder) {
        // Підняли вгору: shift orders [newOrder..prevOrder-1] +1
        const toShiftUp = await strapi.entityService.findMany(
          'api::question.question',
          {
            filters: { order: { $gte: newOrder, $lt: prevOrder } },
            sort: { order: 'desc' },
            fields: ['id', 'order'],
          }
        );
        for (const { id, order } of toShiftUp) {
          await strapi.entityService.update(
            'api::question.question',
            id,
            { data: { order: order + 1 } }
          );
        }
      } else {
        // Опустили вниз: shift orders (prevOrder..newOrder] -1
        const toShiftDown = await strapi.entityService.findMany(
          'api::question.question',
          {
            filters: { order: { $gt: prevOrder, $lte: newOrder } },
            sort: { order: 'asc' },
            fields: ['id', 'order'],
          }
        );
        for (const { id, order } of toShiftDown) {
          await strapi.entityService.update(
            'api::question.question',
            id,
            { data: { order: order - 1 } }
          );
        }
      }

      // Перераховуємо CVE для всіх категорій
      const cats = await strapi.entityService.findMany(
        'api::category.category',
        { fields: ['id'] }
      );
      for (const { id } of cats) {
        await recalculateCategory(strapi, id);
      }
    }
  },

  /**
   * Перед видаленням — зберігаємо order видаленого
   */
  async beforeDelete(event: { params: { where: { id: number }; deletedOrder?: number } }) {
    const { id } = event.params.where;
    const q = await strapi.entityService.findOne(
      'api::question.question',
      id,
      { fields: ['order'] }
    );
    event.params.deletedOrder = q.order;
  },

  /**
   * Після видалення — shift orders > deletedOrder -1, потім CVE
   */
  async afterDelete(event: { params: { deletedOrder?: number } }) {
    const del = event.params.deletedOrder;
    if (del != null) {
      const toShift = await strapi.entityService.findMany(
        'api::question.question',
        {
          filters: { order: { $gt: del } },
          sort: { order: 'asc' },
          fields: ['id', 'order'],
        }
      );
      for (const { id, order } of toShift) {
        await strapi.entityService.update(
          'api::question.question',
          id,
          { data: { order: order - 1 } }
        );
      }
      // Перерахунок CVE
      const cats = await strapi.entityService.findMany(
        'api::category.category',
        { fields: ['id'] }
      );
      for (const { id } of cats) {
        await recalculateCategory(strapi, id);
      }
    }
  },
};
