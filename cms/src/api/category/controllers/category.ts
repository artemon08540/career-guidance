import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  async recalculate(ctx) {
    const { id } = ctx.params;

    // Отримуємо всі відповіді експертів для цієї категорії
    const expertAnswers = await strapi.entityService.findMany('api::expert-answer.expert-answer', {
      filters: {
        category: id,
      },
    });

    if (!expertAnswers.length) {
      return ctx.badRequest('No expert answers found for this category.');
    }

    // Витягуємо всі масиви відповідей
    const allVectors = expertAnswers
      .map(answer => answer.answers)
      .filter((ans): ans is number[] => Array.isArray(ans) && ans.every(num => typeof num === 'number')) as number[][];

    if (allVectors.length === 0 || allVectors[0].length === 0) {
      return ctx.badRequest('No valid answer vectors found.');
    }

    const vectorLength = allVectors[0].length;
    const avgVector = new Array(vectorLength).fill(0);

    // Обчислюємо середній вектор
    for (const vec of allVectors) {
      for (let i = 0; i < vectorLength; i++) {
        avgVector[i] += vec[i];
      }
    }

    for (let i = 0; i < vectorLength; i++) {
      avgVector[i] /= allVectors.length;
    }

    // Оновлюємо категорію
    await strapi.entityService.update('api::category.category', id, {
      data: {
        vector: avgVector,
        isVerified: true,
      },
    });

    ctx.body = { 
      message: 'Category vector recalculated successfully.',
      newVector: avgVector, // Додаємо виведення нового вектору для зручності
    };
  }
}));
