import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import initRoutes from './routers';
import cors from 'cors';

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

// Logger request
app.use(morgan('combined'));

// Cookie-Parser
app.use(cookieParser());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

// Middleware cors
app.use(cors(corsOptions));

// init router
initRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}: http://localhost:${port}`);
});
