import express from 'express';

import orders from './orders';
import pharmacy from './pharmacy';


const router = express.Router();

export default (): express.Router => {
  pharmacy(router);
  orders(router);
  return router;
};