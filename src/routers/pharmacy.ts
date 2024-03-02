import express from 'express';

import { getPharamacy } from '../controllers/pharamcy';

export default (router: express.Router) => {
  router.get('/getPharamcy', getPharamacy);
};