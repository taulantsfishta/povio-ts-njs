import dotenv from 'dotenv';

dotenv.config();

const config = {
    SERVER_HOSTNAME: process.env.SERVER_HOSTNAME || 'localhost',
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    DB_PORT: 8080,
    DB_HOST: 'localhost',
    DB_USER: 'root',
    MYSQL_DB: 'povio-database',
    TOKEN: 'SHQIPNIETNIKE--'
};
export default config;
