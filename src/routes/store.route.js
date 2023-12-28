// store.route.js

import express from "express";
import asyncHandler from 'express-async-handler';

import { storeAdd, missionAdd, reviewPreview } from "file:///C:/UMC-Node.js/test_folder/src/controllers/store.controllers.js";

export const storeRouter = express.Router({mergeParams: true});

storeRouter.post('/add', asyncHandler(storeAdd));
storeRouter.post('/mission', asyncHandler(missionAdd));

storeRouter.get('/reviews', asyncHandler(reviewPreview));
