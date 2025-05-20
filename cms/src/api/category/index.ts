import controller from './controllers/category';
import service from './services/category';
import customRoutes from './routes/custom-sync';

export default {
  routes: [...customRoutes.routes],
  controllers: {
    category: controller,
  },
  services: {
    category: service,
  },
};
