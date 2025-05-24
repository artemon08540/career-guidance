import { recalculateCategory } from '../../../category/services/recalculateCategory';

export default {
  async afterUpdate(event) {
    const { result, params } = event;

    if (params.data.isConfirmed === true) {
      console.log('🧪 LIFECYCLE: ExpertAnswer оновлено!');
      console.log('🧪 event.params.data:', params.data);

      // Отримуємо повністю оновлену відповідь з заповненою категорією
      const fullAnswer = await strapi.entityService.findOne(
        'api::expert-answer.expert-answer',
        result.id,
        { populate: ['category'] }
      );

      console.log('🧪 Populated answer:', fullAnswer);

      const categoryId = (fullAnswer as any).category?.id;

      if (!categoryId) {
        console.warn('⚠️ Немає категорії для цієї відповіді.');
        return;
      }

      await recalculateCategory(strapi, categoryId);
    }
  },
};
