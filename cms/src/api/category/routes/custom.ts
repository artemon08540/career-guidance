export default {
    routes: [
      {
        method: 'POST',
        path: '/recalculate-category/:id',
        handler: 'category.recalculate',
        config: {
          auth: false, // або auth: true, якщо потім захочеш доступ тільки для авторизованих
        },
      },
    ],
  };
  