// src/api/question/services/question.ts
'use strict';

// Цей модуль експортує функцію, яку Strapi викликає з аргументом { strapi }
export default ({ strapi }: { strapi: any }) => ({
  /**
   * Shift orders up (insert) чи down (delete) у таблиці questions
   * @param pos — порядковий номер (1–based)
   * @param id  — id вставленого/видаленого питання
   * @param isInsert — true для вставки, false для видалення
   */
  async shiftOrders(pos: number, id: number, isInsert = true) {
    const knex = strapi.db.connection;

    // 1) Зчитати поточний max(order)
    const [{ max }] = await knex('questions').max('order as max');
    const maxOrder = Number(max) || 0;

    if (isInsert) {
      // якщо вставляємо в межах [1..maxOrder]
      if (pos <= maxOrder) {
        await knex('questions')
          .where('order', '>=', pos)
          .andWhere('id', '!=', id)
          .increment('order', 1);
      }
    } else {
      // видаляємо — якщо pos < maxOrder
      if (pos < maxOrder) {
        await knex('questions')
          .where('order', '>', pos)
          .decrement('order', 1);
      }
    }

    // 2) Опціонально: гарантуємо, що порядок без дірок 1..n
    const rows = await knex('questions').select('id').orderBy('order', 'asc');
    for (let i = 0; i < rows.length; i++) {
      await knex('questions')
        .where({ id: rows[i].id })
        .update({ order: i + 1 });
    }
  },
});
