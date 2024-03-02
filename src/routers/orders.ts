import express from 'express';

import { createOrder, getOrder, getOrderById } from '../controllers/orders';

export default (router: express.Router) => {
  router.post('/:pharmacy/createOrder', createOrder);
  router.get('/:pharmacy/orders', getOrder);
  router.get('/:pharmacy/orders/:orderId', getOrderById);

};