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

export type BookType = {
    id?: Number;
    title: string;
    author: string;
    type:string,
    total_pages: Number;
    summary: string;
};

export class Book{
    //conn: Pool;

    constructor(environment: string){
        
    }
    
    async index(): Promise<BookType[]>{
        try{
            const conn = this.connection();
            // const conn = ENV === "dev" ? new Client({
            //     host: POSTGRES_HOST,
            //     port: Number(POSTGRES_PORT),
            //     database: POSTGRES_DB,
            //     user: POSTGRES_USER,
            //     password: POSTGRES_PASSWORD,
            // }) : new Client({
            //     host: POSTGRES_HOST,
            //     port: Number(POSTGRES_PORT),
            //     database: POSTGRES_TEST_DB,
            //     user: POSTGRES_USER,
            //     password: POSTGRES_PASSWORD,
            // });
            await conn.connect();
            const sql = 'SELECT * FROM books';
            // await conn.query(sql, (err, res)=>{
            //     if(!err){
            //         books = res.rows
            //         return books;
            //     }
            //     else{
            //         console.log(`An error occured; ${err}`);
                    
            //     }
            //     conn.end();
            // });
            const result = await conn.query(sql);
            conn.end();
            console.log(result.rows)
            return result.rows;

        } catch (err) {
            throw new Error(`Could not get books. Error: ${err}`)
        }
        
    }

    async show(author: string): Promise<BookType[]>{
        try {
            
            // // @ts-ignore
            // const conn = await Client.connect();
            // const result = await conn.query(sql, [id]);
            // const books = result.rows;
            // conn.release();
            // return books;

            const conn = this.connection();
            await conn.connect();
            const sql = 'SELECT * FROM books WHERE author=($1)';
            const result = await conn.query(sql, [author]);
            conn.end();
            console.log(result.rows)
            return result.rows;


        } catch (err) {
            throw new Error(`Could not find book ${author}. Error: ${err}`)
        }
    }

    async update(id: string, author: string): Promise<BookType[]>{
        try {
            const conn = this.connection();
            const sql = 'UPDATE books SET author=($1) WHERE id=($2)';
            await conn.connect();
            const result = await conn.query(sql, [author, id]);
            conn.end();
            console.log(result.rows[0]);
            return result.rows[0];
        } catch (err) {
            throw new Error('Could not update book')
        }
    }

    async delete(id: string): Promise<BookType[]>{
        try {
            
            // const sql = 'DELETE FROM books WHERE id=($1)';
            // // @ts-ignore
            // const conn = await Client.connect();
            // const result = await conn.query(sql,[id]);
            // const book = result.rows[0];
            // conn.release();
            // return book;

            const conn = this.connection();
            const sql = 'DELETE FROM books WHERE id=($1)';
            await conn.connect();
            const result = await conn.query(sql,[id]);
            const output = await conn.query('SELECT * FROM books');
            conn.end();
            console.log(output.rows)
            return output.rows;
        } catch (err) {
            throw new Error(`Could not delete book ${id}. Error: ${err}`)
        }
    }

    async create(book: BookType): Promise<BookType[]>{
        try {
            // const sql = `INSERT INTO books(title, author, total_pages, summary) VALUES ($1, $2, $3, $4)`;
            // // @ts-ignore
            // const conn = await Client.connect();
            // const result = await conn.query(sql, [book.title, book.author, book.total_pages, book.summary]);
            // const createdBook = result.rows[0];
            // conn.release();
            // return createdBook;

            const sql = `INSERT INTO books(title, author, type, total_pages, summary) VALUES ($1, $2, $3, $4, $5)`;
            const conn = this.connection();
            await conn.connect();
            const result = await conn.query(sql, [book.title, book.author, book.type, book.total_pages, book.summary]);
            const output = await conn.query('SELECT * FROM books WHERE title=($1)',[book.title])
            
            conn.end();
            console.log(output.rows)
            return output.rows;

        } catch (err) {
            throw new Error(`Could not add new book ${book.title}. Error: ${err}`);
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
        });;

        return conn;
    }


}