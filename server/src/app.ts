import express, { Request, Response } from 'express';
import cors from 'cors';
import './config/mongodb';
import authenticationRouter from './routes/authentication';
import io, {chatServer } from'./chat/chatIo';
import roomRouter from './routes/room';
import morgan from 'morgan';
import error from './error';//Error handler

const port: number = 3000;
const app = express();



app.use(cors());
//ENABLE CORS
app.all('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


app.use('/api/auth/', authenticationRouter);
app.use('/api/room/', roomRouter);


app.listen(port, () => {
    console.log(`Seed server is listening at http://localhost:${port}`)
});

chatServer.listen(port + 1, () => {
    console.log(`Seed chat server is listening at http://localhost:${port + 1}`)
});


app.use(error);

export default app;