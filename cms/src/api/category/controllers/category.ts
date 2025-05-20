export default {
  async sync(ctx) {
    const { categoryId } = ctx.request.body;

    try {
      await strapi
        .service('api::category.category')
        .syncCategoryVectorEntries(strapi, categoryId);
      ctx.send({ success: true, message: 'Синхронізація завершена' });
    } catch (err) {
      ctx.throw(500, 'Помилка синхронізації: ' + err.message);
    }
  },
};
