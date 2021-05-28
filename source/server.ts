import express from 'express';
import config from './configs/config';
import routes from './routes/index';

const app = express();
// const PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(config.SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${config.SERVER_PORT}`);
});
