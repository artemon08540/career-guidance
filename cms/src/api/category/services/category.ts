export default {
  async syncCategoryVectorEntries(strapi, categoryId?) {
    const questions = await strapi.entityService.findMany('api::question.question', {
      fields: ['id', 'order'],
      sort: { order: 'asc' },
      publicationState: 'live',
    });

    const categories = categoryId
      ? [await strapi.entityService.findOne('api::category.category', categoryId)]
      : await strapi.entityService.findMany('api::category.category');

    for (const category of categories) {
      for (const question of questions) {
        const existing = await strapi.db.query('api::category-vector-entry.category-vector-entry').findOne({
          where: { category: category.id, question: question.id },
        });

        if (!existing) {
          await strapi.entityService.create('api::category-vector-entry.category-vector-entry', {
            data: {
              category: category.id,
              question: question.id,
              value: 0,
              order: question.order,
              publishedAt: new Date(),
            },
          });
        } else if (existing.order !== question.order) {
          await strapi.entityService.update('api::category-vector-entry.category-vector-entry', existing.id, {
            data: { order: question.order },
          });
        }
      }
    }
  },
};
