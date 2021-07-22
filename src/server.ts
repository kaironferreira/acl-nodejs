import "reflect-metadata";
import express from 'express';
import router from './routes';

import './database';
const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log("Servidor rodando na URL: http://localhost:" + PORT);
});