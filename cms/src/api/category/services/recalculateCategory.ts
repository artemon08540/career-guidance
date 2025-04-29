export const recalculateCategory = async (strapi, categoryId: string) => {
    const expertAnswers = await strapi.entityService.findMany('api::expert-answer.expert-answer', {
      filters: {
        category: {
          id: {
            $eq: categoryId,
          },
        },
        isConfirmed: {
          $eq: true,
        },
      }
      
    });
  
    if (!expertAnswers.length) {
      console.warn('Немає підтверджених відповідей для перерахунку.');
      return;
    }
  
    const allVectors = expertAnswers
      .map(answer => answer.answers)
      .filter((ans): ans is number[] => Array.isArray(ans) && ans.every(num => typeof num === 'number'));
  
    if (allVectors.length === 0 || allVectors[0].length === 0) {
      console.warn('Немає валідних векторів для перерахунку.');
      return;
    }
  
    const vectorLength = allVectors[0].length;
    const avgVector = new Array(vectorLength).fill(0);
  
    for (const vec of allVectors) {
      for (let i = 0; i < vectorLength; i++) {
        avgVector[i] += vec[i];
      }
    }
  
    for (let i = 0; i < vectorLength; i++) {
      avgVector[i] /= allVectors.length;
    }
  
    await strapi.entityService.update('api::category.category', categoryId, {
      data: {
        vector: avgVector,
        isVerified: true,
      },
    });
  
    console.log(`✅ Категорію ID ${categoryId} оновлено успішно!`);
  };
  