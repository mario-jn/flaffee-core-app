import express from "express";
import {HealthController} from "../controller/healthController";

export const publicRouter = express.Router();

publicRouter.get("/api/health", HealthController.checkHealth);