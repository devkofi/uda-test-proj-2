import { doesNotMatch } from 'assert';
import dotenv from 'dotenv'
import { connect } from 'http2';
import {Pool, Client} from 'pg';

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

export type SignUp = {
    id?: number;
    name: string;
    email: string;
    password:string
};

export type SignIn = {
    id?: number,
    email: string,
    password: string
}

export class User{

    constructor(environment: string){
        
    }
    
    async signUp(signUp: SignUp): Promise<SignUp[]>{
        try{
            const conn = this.connection();
            await conn.connect();
            const sql = 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3)';
            const result = await conn.query(sql,[signUp.name, signUp.email, signUp.password]);
            conn.end();
            console.log(result.rows)
            return result.rows;

        } catch (err) {
            throw new Error(`Could not get books. Error: ${err}`)
        }
        
    }

    async signIn(signIn: SignIn): Promise<SignIn[]>{
        try{
            const conn = this.connection();
            await conn.connect();
            const sql = 'SELECT email, password FROM users WHERE email=($1) AND password=($2)';
            const result = await conn.query(sql,[signIn.email, signIn.password]);
            conn.end();
            console.log(result.rows)
            return result.rows;

        } catch (err) {
            throw new Error(`Could not get books. Error: ${err}`)
        }
    }


    connection(): Pool{
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


}