
import express from 'express';
import bootstrap from './src/app.controller.js';
import path from 'node:path';
import * as dotenv from 'dotenv';
dotenv.config({path:path.resolve("./src/config/.env.dev")});

const app = express();
const port = process.env.PORT || 5000;


bootstrap(app,express)



 app.listen(port, () => {console.log('server is running on port '+ port)});