// user.route.js

import express from "express";
import asyncHandler from 'express-async-handler';

import { userSignin, userReview, userMission } from "file:///C:/UMC-Node.js/test_folder/src/controllers/user.controllers.js";

export const userRouter = express.Router();

userRouter.post('/signin', asyncHandler(userSignin));
userRouter.post('/review', asyncHandler(userReview));
userRouter.post('/mission', asyncHandler(userMission));
