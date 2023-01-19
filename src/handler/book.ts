import express, {Request, Response} from 'express';
import {BookType, Book} from '../models/book';
import dotenv from 'dotenv';

const {ENV} = process.env;

const createBook = new Book((ENV as unknown) as string);

const index = async (_req: Request, res: Response): Promise<void> =>{
    const book = createBook.index().then((item)=>{
        res.json(item);
    });
}

const show = async (req: Request, res: Response): Promise<void> =>{
    const book = createBook.show((req.query.author as unknown) as string).then((item)=>{
        res.json(item);
    });
}

const update = async (req: Request, res: Response): Promise<void> =>{
    const book = createBook.update('3', (req.query.author as unknown) as string).then((item)=>{
        res.json(item);
    });
}

const create = async (req: Request, res: Response): Promise<void> =>{
      const newBook: BookType = {
        title: (req.body.title as unknown) as string, 
        author: (req.body.author as unknown) as string,
        type:(req.body.type as unknown) as string,
        total_pages:(req.body.pages as unknown) as number,
        summary: (req.body.summary as unknown) as string 
    };
    const book = createBook.create(newBook).then((item)=>{
        res.json(item);
    });
    
}

const deleteBook = async (req: Request, res: Response): Promise<void> =>{
    const book = createBook.delete(req.params.id).then((item)=>{
        res.send('Successfully Deleted item');
    });
}

const book_routes = (app: express.Application): void =>{
    app.get('/index', index);
    app.get('/show', show);
    app.get('/update', update);
    app.post('/create', create);
    app.delete('/delete/:id/', deleteBook);
}

export default book_routes;

  
  

