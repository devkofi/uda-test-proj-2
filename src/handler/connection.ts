import {Pool} from 'pg';
import dotenv from 'dotenv'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env 

console.log(ENV)

export const connection = (): Pool =>{
    const conn = ENV === "dev" ? new Pool({
        host: POSTGRES_HOST,
        port: Number(POSTGRES_PORT),
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    }) : new Pool({
        host: POSTGRES_HOST,
        port: Number(POSTGRES_PORT),
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });

    return conn;
}