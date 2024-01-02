// health.route.js

import express from "express";
import { healthController } from "../controllers/health.controllers.js";

export const healthRoute = express.Router();

healthRoute.get('', healthController)