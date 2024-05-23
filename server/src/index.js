import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import initRoutes from './routers';

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

// Logger request
app.use(morgan('combined'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World');
});
// init router
initRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}: http://localhost:${port}`);
});
