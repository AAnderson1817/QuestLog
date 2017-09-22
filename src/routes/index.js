import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import landmark from '../controller/landmark';
import account from '../controller/account';

let router = express();

//Connect to database
initializeDb(db => {

  //Internal middleware
  router.use(middleware({ config, db }));
  //API routes v1 (/v1)
  router.use('/landmark', landmark({ config, db }));
  router.use('/account', account({ config, db }));
})

export default router;
