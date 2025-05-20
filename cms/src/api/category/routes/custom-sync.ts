export default {
  routes: [
    {
      method: 'POST',
      path: '/sync-vectors',
      handler: 'category.sync',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
