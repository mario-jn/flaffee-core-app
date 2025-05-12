import express, { Express } from 'express';
import { publicRouter } from '../route/public-api';
import { errorMiddleware } from '../middleware/error-middleware';

const web: Express = express();

web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);

export default web;
