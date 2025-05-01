import express, {Express} from "express"
import {publicRouter} from "../route/publicApi";
import {errorMiddleware} from "../middleware/errorMiddleware";

const web: Express = express();

web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);

export default web;