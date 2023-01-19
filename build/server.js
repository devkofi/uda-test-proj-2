"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var book_1 = __importDefault(require("./handler/book"));
var user_1 = __importDefault(require("./handler/user"));
var app = (0, express_1["default"])();
var port = 3000;
var ENV = process.env.ENV;
var rootFolder = path_1["default"].resolve(__dirname) + path_1["default"].normalize("/public/");
app.use(express_1["default"].static(rootFolder));
//Enable cors for all routes
app.use((0, cors_1["default"])());
// parse application/x-www-form-urlencoded
app.use(body_parser_1["default"].urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.sendFile(rootFolder + "index.html");
});
app.get('/signin', function (req, res) {
    res.sendFile(rootFolder + "login.html");
});
app.get('/signup', function (req, res) {
    res.sendFile(rootFolder + "signup.html");
});
(0, book_1["default"])(app);
(0, user_1["default"])(app);
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
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
