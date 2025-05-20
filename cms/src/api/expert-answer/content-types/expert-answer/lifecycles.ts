export default {
    async afterUpdate(event) {
        const { result, params } = event;

        if (params.data.isConfirmed === true) {
            const categoryId = result.category?.id || result.category;

            const confirmedAnswers = await strapi.entityService.findMany("api::expert-answer.expert-answer", {
                filters: {
                    category: categoryId,
                    isConfirmed: true
                }
            });

            if (confirmedAnswers.length === 0) return;

            const vectors = confirmedAnswers
                .map((a) => a.answers)
                .filter((arr): arr is number[] => Array.isArray(arr) && arr.every(v => typeof v === 'number'));

            if (vectors.length === 0) return;

            const length = vectors[0].length;
            const avg = new Array(length).fill(0);

            for (const vec of vectors) {
                for (let i = 0; i < length; i++) {
                    avg[i] += vec[i];
                }
            }

            for (let i = 0; i < length; i++) {
                avg[i] = Math.round(avg[i] / vectors.length);
            }

            // оновлюємо vectorEntries
            const entries: any[] = await strapi.entityService.findMany("api::category-vector-entry.category-vector-entry", {
                filters: { category: categoryId },
                populate: ["question"]
            });

            for (let i = 0; i < avg.length; i++) {
                const entry = entries.find((e) => e.question?.order === i + 1);
                if (entry) {
                    await strapi.entityService.update("api::category-vector-entry.category-vector-entry", entry.id, {
                        data: { value: avg[i] }
                    });
                }
            }
        }
    }
};
