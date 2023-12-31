// user.route.js

import express from "express";
import asyncHandler from 'express-async-handler';

import { userSignin, userReview, userMission, reviewPreview, progressingMissionPreview, missionPreview, userMissionComplete } from "../controllers/user.controllers.js";

export const userRouter = express.Router({mergeParams: true});


userRouter.post('/signin', asyncHandler(userSignin));
userRouter.post('/reviews', asyncHandler(userReview));
userRouter.post('/missions', asyncHandler(userMission));
userRouter.post('/missions/:missionId', asyncHandler(userMissionComplete));

userRouter.get('/reviews', asyncHandler(reviewPreview));
userRouter.get('/missions', asyncHandler(progressingMissionPreview));
userRouter.get('/missions/:storeId', asyncHandler(missionPreview));

