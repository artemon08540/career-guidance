export default {
  async beforeCreate(event) {
    // Автоматично встановлюємо order = останній + 1
    const count = await strapi.entityService.count("api::question.question");
    event.params.data.order = count + 1;
  },

  async afterCreate(event) {
    const { result } = event;
    const categories = await strapi.entityService.findMany("api::category.category");

    for (const category of categories) {
      await strapi.entityService.create("api::category-vector-entry.category-vector-entry", {
        data: {
          category: category.id,
          question: result.id,
          value: 3 // значення за замовчуванням
        },
      });
    }
  },

  async beforeDelete(event) {
    const id = event.params.where.id;

    // Видаляємо всі vector entries пов’язані з цим питанням
    const related = await strapi.entityService.findMany("api::category-vector-entry.category-vector-entry", {
      filters: { question: id }
    });

    for (const entry of related) {
      await strapi.entityService.delete("api::category-vector-entry.category-vector-entry", entry.id);
    }
  }
};
