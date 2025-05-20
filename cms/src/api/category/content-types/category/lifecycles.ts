import { syncCategoryVectorEntries } from "../../services/syncCategoryVectorEntries";

export default {
  async afterCreate(event) {
    const { result } = event;
    await syncCategoryVectorEntries(strapi, result.id);
  },

  async beforeDelete(event) {
    const id = event.params.where.id;

    // Видаляємо всі vector entries, що належать до цієї категорії
    const related = await strapi.entityService.findMany("api::category-vector-entry.category-vector-entry", {
      filters: { category: id }
    });

    for (const entry of related) {
      await strapi.entityService.delete("api::category-vector-entry.category-vector-entry", entry.id);
    }
  }
};