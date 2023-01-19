import express from "express";
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";
import {BookType,Book} from "./models/book";
import book_routes from "./handler/book";
import user_routes from "./handler/User";

const app = express()
const port = 3000;



const {ENV}= process.env;
const rootFolder: string = path.resolve(__dirname) + path.normalize("/public/");
app.use(express.static(rootFolder));
//Enable cors for all routes
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req: express.Request, res: express.Response)=>{
  res.sendFile(rootFolder + "index.html");
});

app.get('/signin', (req: express.Request, res: express.Response)=>{
  res.sendFile(rootFolder + "login.html")
});

app.get('/signup', (req: express.Request, res: express.Response)=>{
  res.sendFile(rootFolder + "signup.html")
});

book_routes(app);

user_routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


// app.get('/index', (req, res)=>{
//   const createBook = new Book((ENV as unknown) as string);
//   createBook.index().then((item)=>{
//     res.send(item);
//   });

// app.get('/create', (req, res)=>{
//   const createBook = new Book((ENV as unknown) as string);
//   const newBook: BookType = {
//     title: (req.query.title as unknown) as string, 
//     author: (req.query.author as unknown) as string,
//     type:(req.query.type as unknown) as string,
//     total_pages:(req.query.pages as unknown) as number,
//     summary: (req.query.summary as unknown) as string 
//   };
//   createBook.create(newBook).then((item)=>{
//     res.send(item);
//   });
// });

// app.get('/show', (req, res)=>{
//   const createBook = new Book((ENV as unknown) as string);
//   createBook.show((req.query.author as unknown) as string).then((item)=>{
//     res.send(item);
//   });
  
// });

// app.get('/update',(req, res)=>{
//   const createBook = new Book((ENV as unknown) as string);
//   createBook.update('3', (req.query.author as unknown) as string)
//   .then((item)=>{
//     res.send('Updated!');
//   }) 
// })