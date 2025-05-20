export const syncCategoryVectorEntries = async (strapi: any, categoryId?: number) => {
  const categories = categoryId
    ? [await strapi.entityService.findOne("api::category.category", categoryId)]
    : await strapi.entityService.findMany("api::category.category");

  const questions = await strapi.entityService.findMany("api::question.question");

  for (const category of categories) {
    if (!category) continue;
    for (const question of questions) {
      const exists = await strapi.entityService.findMany("api::category-vector-entry.category-vector-entry", {
        filters: {
          category: category.id,
          question: question.id
        },
      });

      if (exists.length === 0) {
        await strapi.entityService.create("api::category-vector-entry.category-vector-entry", {
          data: {
            category: category.id,
            question: question.id,
            value: 3,
          }
        });
      }
    }
  }

  console.log("✅ Векторні записи синхронізовано для", categoryId ? `категорії ID ${categoryId}` : "всіх категорій");
};

