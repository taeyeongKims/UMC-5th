// temp.route.js

import express from 'express';
import { tempTest, tempException } from 'file:///C:/UMC-Node.js/test_folder/src/controllers/temp.controllers.js';

export const tempRouter = express.Router();

tempRouter.get('/test', tempTest);
tempRouter.get('/exception/:flag', tempException);