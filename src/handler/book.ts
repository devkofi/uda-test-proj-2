import express, {Request, Response, NextFunction} from 'express';
import {BookType, Book} from '../models/book';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const {ENV, TOKEN_SECRET} = process.env;

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

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.cookies.token;
    
    try {
        if(typeof token !== 'undefined'){
            const verify = async () =>{
                await jwt.verify(token, (TOKEN_SECRET as unknown) as string);
            }
            next()
        }
        else{
            res.redirect("/signin")
        }
        
    } catch (error) {
        console.log(error)
        res.clearCookie("token");
        res.redirect("/signin");
    }

}


const book_routes = (app: express.Application): void =>{
    app.get('/index', verifyAuthToken, index);
    app.get('/show', verifyAuthToken, show);
    app.patch('/update', verifyAuthToken, update);
    app.post('/create', verifyAuthToken, create);
    app.delete('/delete/:id/', verifyAuthToken, deleteBook);
}

export default book_routes;

  
// const verifyAuthToken = (req: Request, res: Response, next: express.NextFunction) => {
    
//     try {
//         const authorizationHeader = req.headers.authorization;
//         const token = ((authorizationHeader as unknown) as string).split(' ')[1]
//         jwt.verify(token, (process.env.TOKEN_SECRET as unknown) as string);
//         next();
//     } catch(err) {
//         res.status(401)
//         res.json('Access denied, invalid token')
//         return
//     }

// }

