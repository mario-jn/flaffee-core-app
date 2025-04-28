import express, {Express} from "express"

const web: Express = express();

web.use(express.json());

export default web;