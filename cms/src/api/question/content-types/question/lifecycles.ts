export default {
  async afterCreate(event) {
    const { result } = event;
    console.log(`📌 Питання створено: ID ${result.id}`);

    // Пропускаємо, якщо чернетка
    if (!result.publishedAt) {
      console.log('🟡 Чернетка. Вектори не оновлюємо.');
      return;
    }

    const categories = await strapi.entityService.findMany('api::category.category');
    for (const category of categories) {
      const currentVector = Array.isArray(category.vector) ? category.vector : [];
      const updatedVector = [...currentVector, 3];

      await strapi.entityService.update('api::category.category', category.id, {
        data: { vector: updatedVector },
      });
    }

    const expertAnswers = await strapi.entityService.findMany('api::expert-answer.expert-answer');
    for (const answer of expertAnswers) {
      const currentAnswers = Array.isArray(answer.answers) ? answer.answers : [];
      const updatedAnswers = [...currentAnswers, 3];

      await strapi.entityService.update('api::expert-answer.expert-answer', answer.id, {
        data: { answers: updatedAnswers },
      });
    }

    console.log('✅ Після створення питання — вектори оновлено.');
  },

  async afterDelete(event) {
    const { result } = event;
    console.log(`❌ Питання видалено: ID ${result.id}`);

    const deletedOrder = result.order;
    if (deletedOrder === undefined) return;

    const indexToDelete = deletedOrder - 1;

    const categories = await strapi.entityService.findMany('api::category.category');
    for (const category of categories) {
      const currentVector = Array.isArray(category.vector) ? category.vector : [];
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
      const currentAnswers = Array.isArray(answer.answers) ? answer.answers : [];
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
    console.log(`🛠️ Питання оновлено: ID ${result.id}`);

    const wasDraft = params.data.publishedAt === undefined;
    const isNowPublished = result.publishedAt !== null;

    if (wasDraft && isNowPublished) {
      console.log('📢 Питання щойно опубліковане — додаємо "3" у вектори');

      const categories = await strapi.entityService.findMany('api::category.category');
      for (const category of categories) {
        const currentVector = Array.isArray(category.vector) ? category.vector : [];
        const updatedVector = [...currentVector, 3];

        await strapi.entityService.update('api::category.category', category.id, {
          data: { vector: updatedVector },
        });
      }

      const expertAnswers = await strapi.entityService.findMany('api::expert-answer.expert-answer');
      for (const answer of expertAnswers) {
        const currentAnswers = Array.isArray(answer.answers) ? answer.answers : [];
        const updatedAnswers = [...currentAnswers, 3];

        await strapi.entityService.update('api::expert-answer.expert-answer', answer.id, {
          data: { answers: updatedAnswers },
        });
      }
    }

    // Перестановка order
    if (params.data.order !== undefined && result.order !== undefined && params.data.order !== result.order) {
      console.log(`🔁 Зміна порядку: ${params.data.order} → ${result.order}`);

      const prevOrder = params.data.order;
      const newOrder = result.order;

      const categories = await strapi.entityService.findMany('api::category.category');
      for (const category of categories) {
        const currentVector = Array.isArray(category.vector) ? category.vector : [];
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
        const currentAnswers = Array.isArray(answer.answers) ? answer.answers : [];
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
