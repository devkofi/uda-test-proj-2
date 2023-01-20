import { doesNotMatch } from 'assert';
import {connection} from '../handler/connection'
import { connect } from 'http2';
import {Pool, Client} from 'pg';
import bcrypt from 'bcrypt';
import { Sign } from 'crypto';


import dotenv from 'dotenv'

dotenv.config()
const {
    BCRYPT_PEPPER,
    SALT_ROUNDS,
} = process.env

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
    pepper: string;
    salt: string;
    constructor(environment: string){
        this.pepper = (BCRYPT_PEPPER as unknown) as string;
        this.salt = (SALT_ROUNDS as unknown) as string;
    }
    
    async signUp(signUp: SignUp): Promise<SignUp[]>{
        try{
            const conn = connection();

            await conn.connect();
            const sql = 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3)';
            const hash = await bcrypt.hash(signUp.password + this.pepper, parseInt(this.salt));
            const result = await conn.query(sql,[signUp.name, signUp.email, hash]);
            const output = await conn.query('SELECT * FROM users WHERE email=($1)', [signUp.email]);
            conn.end();
            console.log(output.rows)
            return output.rows;

        } catch (err) {
            throw new Error(`Could SignUp User. Error: ${err}`)
        }
        
    }

    async signIn(signIn: SignIn): Promise<SignIn[]>{
        try{
            const conn = connection();
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

    async deleteUser(id: string): Promise<SignUp[]>{
        const conn = connection();
        await conn.connect();
        const sql = 'DELETE FROM users WHERE id=($1)';
        const result = await conn.query(sql, [id]);
        const output = await conn.query('SELECT * FROM users');
        conn.end();
        console.log(output.rows);
        return output.rows;
    }

    async authenticate(auth: SignIn): Promise<SignIn | null>{

        const conn = connection();
        await conn.connect();
        const sql = 'SELECT password from users WHERE email=($1)';
        const result = await conn.query(sql,[auth.email]);
        conn.end();
        console.log(auth.password+this.pepper);
        console.log(result.rows[0]);

        if(result.rows.length){
            const user = result.rows[0]
            console.log(user);

            if(bcrypt.compareSync(auth.password+this.pepper, user.password)){
                return user;
            }
        }

        return null;
    }

    


}