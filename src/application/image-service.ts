import express, { Express } from 'express';

const webStatic: Express = express();

webStatic.use('/', express.static('img'));

export default webStatic;
