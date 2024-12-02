import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import countriesRouter from './routes/countries.routes.js';

dotenv.config();
const app = express();
const serverHTTP = http.createServer(app);

const port = process.env.PORT || 8080;
const host = '0.0.0.0';

app.use(cors());
app.use(express.json());

app.use("/api/countries", countriesRouter);

app.get('*', (req, res) => {
    res.status(404).send({ status: "error", msg: 'ERROR: Esa ruta no existe', data: {} });
});

// Iniciar el servidor
serverHTTP.listen(port, host, () => console.log(`Servidor arriba en: ${process.env.BACKEND_URL} !!`));