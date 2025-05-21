export default {
  async afterUpdate(event) {
    const { result, params } = event;

    // Якщо не було змінено isConfirmed — не оновлюємо
    if (params.data?.isConfirmed === undefined) return;

    const categoryId = result.category?.id || result.category;
    const questionId = result.question?.id || result.question;

    if (!categoryId || !questionId) return;

    // Отримати всі підтверджені експертні відповіді вручну через SQL-style
    const confirmedAnswers = await strapi.db
      .query('api::expert-answer.expert-answer')
      .findMany({
        where: {
          category: categoryId,
          question: questionId,
          isConfirmed: true,
        },
        select: ['value'],
      });

    if (!confirmedAnswers.length) return;

    // Середнє арифметичне
    const average =
      confirmedAnswers.reduce((sum, ans) => sum + (ans.value || 0), 0) / confirmedAnswers.length;

    // Оновити CategoryVectorEntry
    const entry = await strapi.db
      .query('api::category-vector-entry.category-vector-entry')
      .findOne({
        where: {
          category: categoryId,
          question: questionId,
        },
      });

    if (entry) {
      await strapi.db
        .query('api::category-vector-entry.category-vector-entry')
        .update({
          where: { id: entry.id },
          data: { value: Math.round(average) },
        });
    }
  },
};
