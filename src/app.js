import dotenv from "dotenv-safe"
import express from "express"
import database from "./config/database.js";
import authRouter from "./Routes/authRoutes.js"
import postRoutes from "./Routes/postRoutes.js"
import cors from 'cors';
import userRouter from "./Routes/userRoutes.js";
import petRouter from "./Routes/petRoutes.js";
import bodyParser from "body-parser";

const app = express();

app.options('*', cors()) // include before other routes

app.use(cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
}));

// dotenv.config();

database.on('error', (error) => console.error(error)); //alterado
database.on('open', () => console.log('Connected to database')); //alterado

app.use(bodyParser({ limit: '50mb' }));

app.use(express.json());//alterado
// CAMINHO RAIZ DA REQUEST  

app.get('/', (req, res, next) => {

    res.status(200).json({
        status: 'success',
        data: {
            name: 'socialpet',
            version: '0.1.0'
        }
    });

});

app.use('/auth', authRouter)

app.use('/user', userRouter)

app.use('/posts', postRoutes)

app.use('/pets', petRouter)

export default app;