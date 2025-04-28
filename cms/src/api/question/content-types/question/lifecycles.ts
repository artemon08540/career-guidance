export default {
  async afterCreate(event) {
    const { result } = event;
    console.log(`Question created: ID ${result.id}`);

    // Якщо питання ще не опубліковане (draft), пропускаємо
    if (!result.publishedAt) {
      console.log('Питання створене як чернетка. Пропускаємо додавання у вектори.');
      return;
    }

    const categories = await strapi.entityService.findMany('api::category.category');
    for (const category of categories) {
      const currentVector = (category.vector || []) as number[];
      const updatedVector = [...currentVector, 3];
      await strapi.entityService.update('api::category.category', category.id, {
        data: { vector: updatedVector },
      });
    }

    const expertAnswers = await strapi.entityService.findMany('api::expert-answer.expert-answer');
    for (const answer of expertAnswers) {
      const currentAnswers = (answer.answers || []) as number[];
      const updatedAnswers = [...currentAnswers, 3];
      await strapi.entityService.update('api::expert-answer.expert-answer', answer.id, {
        data: { answers: updatedAnswers },
      });
    }
  },

  async afterDelete(event) {
    const { result } = event;
    console.log(`Question deleted: ID ${result.id}`);

    const deletedOrder = result.order;
    if (deletedOrder === undefined) return;

    const indexToDelete = deletedOrder - 1;

    const categories = await strapi.entityService.findMany('api::category.category');
    for (const category of categories) {
      const currentVector = (category.vector || []) as number[];
      if (currentVector.length > indexToDelete) {
        const updatedVector = [...currentVector];
        updatedVector.splice(indexToDelete, 1);
        await strapi.entityService.update('api::category.category', category.id, {
          data: { vector: updatedVector },
        });
      }
    }

    const expertAnswers = await strapi.entityService.findMany('api::expert-answer.expert-answer');
    for (const answer of expertAnswers) {
      const currentAnswers = (answer.answers || []) as number[];
      if (currentAnswers.length > indexToDelete) {
        const updatedAnswers = [...currentAnswers];
        updatedAnswers.splice(indexToDelete, 1);
        await strapi.entityService.update('api::expert-answer.expert-answer', answer.id, {
          data: { answers: updatedAnswers },
        });
      }
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;
    console.log(`Question updated: ID ${result.id}`);

    const wasDraft = params.data.publishedAt === undefined;
    const isNowPublished = result.publishedAt !== null;

    // Якщо тільки що опублікували питання (draft -> published)
    if (wasDraft && isNowPublished) {
      console.log('Питання щойно опубліковане. Додаємо 3 у вектори.');

      const categories = await strapi.entityService.findMany('api::category.category');
      for (const category of categories) {
        const currentVector = (category.vector || []) as number[];
        const updatedVector = [...currentVector, 3];
        await strapi.entityService.update('api::category.category', category.id, {
          data: { vector: updatedVector },
        });
      }

      const expertAnswers = await strapi.entityService.findMany('api::expert-answer.expert-answer');
      for (const answer of expertAnswers) {
        const currentAnswers = (answer.answers || []) as number[];
        const updatedAnswers = [...currentAnswers, 3];
        await strapi.entityService.update('api::expert-answer.expert-answer', answer.id, {
          data: { answers: updatedAnswers },
        });
      }
    }

    // Логіка перепорядкування якщо змінено order
    if (params.data.order !== undefined && result.order !== undefined && params.data.order !== result.order) {
      console.log(`Order changed: ${params.data.order} -> ${result.order}`);

      const prevOrder = params.data.order;
      const newOrder = result.order;

      const categories = await strapi.entityService.findMany('api::category.category');
      for (const category of categories) {
        const currentVector = (category.vector || []) as number[];
        if (currentVector.length >= Math.max(prevOrder, newOrder)) {
          const updatedVector = [...currentVector];
          const [movedValue] = updatedVector.splice(prevOrder - 1, 1);
          updatedVector.splice(newOrder - 1, 0, movedValue);
          await strapi.entityService.update('api::category.category', category.id, {
            data: { vector: updatedVector },
          });
        }
      }

      const expertAnswers = await strapi.entityService.findMany('api::expert-answer.expert-answer');
      for (const answer of expertAnswers) {
        const currentAnswers = (answer.answers || []) as number[];
        if (currentAnswers.length >= Math.max(prevOrder, newOrder)) {
          const updatedAnswers = [...currentAnswers];
          const [movedValue] = updatedAnswers.splice(prevOrder - 1, 1);
          updatedAnswers.splice(newOrder - 1, 0, movedValue);
          await strapi.entityService.update('api::expert-answer.expert-answer', answer.id, {
            data: { answers: updatedAnswers },
          });
        }
      }
    }
  },
};
