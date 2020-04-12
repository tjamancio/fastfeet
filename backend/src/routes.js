import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import ScheduleController from './app/controllers/ScheduleController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.post('/deliverymen/sessions', DeliveryManController.signin);
routes.get('/deliverymen/:deliverymanId/deliveries', ScheduleController.index);
routes.put(
  '/deliverymen/:deliverymanId/deliveries/:deliveryId/withdraw',
  ScheduleController.withdraw
);
routes.put(
  '/deliverymen/:deliverymanId/deliveries/:deliveryId/finish',
  ScheduleController.finish
);

routes.get(
  '/deliveries/:deliveryId/problems',
  DeliveryProblemController.deliveryProblems
);
routes.post(
  '/deliveries/:deliveryId/problems',
  DeliveryProblemController.store
);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);

routes.get('/deliverymen', DeliveryManController.index);
routes.get('/deliverymen/:id', DeliveryManController.show);
routes.post('/deliverymen', DeliveryManController.store);
routes.put('/deliverymen/:id', DeliveryManController.update);
routes.delete('/deliverymen/:id', DeliveryManController.destroy);

routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.destroy);

routes.delete(
  '/delivery-problems/:problemId/cancel-delivery',
  DeliveryController.cancel
);
routes.get('/delivery-problems', DeliveryProblemController.index);

export default routes;
