import { factories } from '@strapi/strapi';
import { recalculateCategory } from '../../category/services/recalculateCategory';

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  async recalculate(ctx) {
    const { id } = ctx.params;
    await recalculateCategory(strapi, id);
    ctx.body = { message: 'Category vector recalculated successfully.' };
  },
}));
