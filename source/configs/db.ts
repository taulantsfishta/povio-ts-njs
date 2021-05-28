//Pool DB Connection
import mysql from 'mysql';
import config from './config';

//Connect to DB
const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: '',
    database: config.MYSQL_DB
});

export default pool;
