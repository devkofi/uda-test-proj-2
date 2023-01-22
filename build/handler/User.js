"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var path_1 = __importDefault(require("path"));
var _a = process.env, ENV = _a.ENV, BCRYPT_PEPPER = _a.BCRYPT_PEPPER, TOKEN_SECRET = _a.TOKEN_SECRET, SALT_ROUNDS = _a.SALT_ROUNDS;
var user = new user_1.User(ENV);
var rootFolder = path_1.default.resolve("./build") + path_1.default.normalize("/public/");
(0, express_1.default)().use(express_1.default.static(rootFolder));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user.index().then(function (item) {
                    console.log(item);
                    res.json(item);
                })];
            case 1:
                index = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var show;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user.show(req.params.id).then(function (item) {
                    console.log(item);
                    res.json(item);
                })];
            case 1:
                show = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sign;
    return __generator(this, function (_a) {
        sign = user.signIn({ email: req.body.email, password: req.body.password }).then(function (item) {
            res.json(item);
        });
        return [2 /*return*/];
    });
}); };
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tempuser, newUser, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tempuser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user.signUp(tempuser)];
            case 2:
                newUser = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
                console.log(token);
                res.json(token);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1 + user);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var delUser;
    return __generator(this, function (_a) {
        delUser = user.deleteUser(req.params.id).then(function (item) {
            res.json(item);
        });
        return [2 /*return*/];
    });
}); };
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.authenticate({ email: req.body.email, password: req.body.password }).then(function (item) {
                        var token = jsonwebtoken_1.default.sign({ user: item }, process.env.TOKEN_SECRET, { algorithm: 'HS256' });
                        res.cookie('token', token, {
                            httpOnly: true,
                            //secure: true,
                            maxAge: (1000 * 60),
                            //signed: true
                        });
                        console.log(token);
                        var header = function () { return res.set('authorization', token); };
                        header();
                        //console.log(req.headers);
                        //console.log(header());
                        console.log(item);
                        //console.log(req.headers);
                        //res.json(token);
                        // const hash = bcrypt.hash(((item?.password) as string) + BCRYPT_PEPPER, parseInt((SALT_ROUNDS as unknown) as string)).then((item)=>{
                        // });
                        if (bcrypt_1.default.compareSync(req.body.password + BCRYPT_PEPPER, item === null || item === void 0 ? void 0 : item.password)) {
                            res.status(200);
                            res.redirect('/');
                        }
                        else {
                            res.send('Could not connect');
                            //res.send('Provide the correct details');
                        }
                    })];
            case 1:
                auth = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2 + user);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var verifyAuthToken = function (req, res, next) {
    var token = req.cookies.token;
    try {
        if (typeof token !== 'undefined') {
            var verify = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, jsonwebtoken_1.default.verify(token, TOKEN_SECRET)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            next();
        }
        else {
            res.redirect("/signin");
        }
    }
    catch (error) {
        console.log(error);
        res.clearCookie("token");
        res.redirect("/signin");
    }
};
var user_routes = function (app) {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', signUp);
    app.delete('/users', deleteUser);
    app.post('/users/authenticate', authenticate);
};
exports.default = user_routes;
// const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
//         const authorizationHeader = req.headers['authorization'];
//         const token = ((authorizationHeader as unknown) as string).split(' ')[1]
//     try {
//         console.log(authorizationHeader);
//         jwt.verify(token, (process.env.TOKEN_SECRET as unknown) as string,{algorithms: ['HS256']});
//         next();
//     } catch(err) {
//         //res.sendStatus(401);
//         //res.sendFile(rootFolder+path.normalize("login.html"))
//         res.send(token)
//         //res.send('Access denied, invalid token')
//     }
//     // const authorizationHeader = req.headers['authorization'];
//     //     const token = ((authorizationHeader as unknown) as string).split(' ')[1]
//     //     jwt.verify(token, (process.env.TOKEN_SECRET as unknown) as string);
//     // if(typeof authorizationHeader !== undefined){
//     // }
//     // else{
//     //     res.sendStatus(403);
//     // }
// }
// // Verify Token
// function verifyToken(req: Request, res:Response, next: NextFunction) {
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined') {
//       // Split at the space
//       const bearer = bearerHeader.split(' ');
//       // Get token from array
//       const bearerToken = bearer[1];
//       // Set the token
//       req = bearerToken;
//       // Next middleware
//       next();
//     } else {
//       // Forbidden
//       res.sendStatus(403);
//     }
//   }
//   function authenticateToken(req:Request, res:Response, next:NextFunction) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)
//     jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
//       console.log(err)
//       if (err) return res.sendStatus(403)
//       req.user = user
//       next()
//     })
//   }  
