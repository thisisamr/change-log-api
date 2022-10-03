import express from 'express';
import { appendFile } from 'fs';
import path from 'path'
import router from './router'
import morgan from 'morgan'
const app = express();
app.use(morgan('dev'))
app.use('/api/v1',router)

export default app;