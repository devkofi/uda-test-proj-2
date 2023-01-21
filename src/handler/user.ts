import express, {NextFunction, Request, Response} from 'express';
import {User, SignIn, SignUp} from '../models/user';
import jwt from 'jsonwebtoken'
import {connection} from './connection';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';


const {ENV,BCRYPT_PEPPER, TOKEN_SECRET, SALT_ROUNDS} = process.env;

const user = new User((ENV as unknown) as string);

const rootFolder: string = path.resolve("./build") + path.normalize("/public/");
express().use(express.static(rootFolder));

const index = async (req: Request, res: Response): Promise<void> =>{
    const index = await user.index().then((item)=>{
        console.log(item);
        res.json(item)
    })
}

const show = async (req: Request, res: Response): Promise<void> =>{
    const show = await user.show(req.params.id).then((item)=>{
        console.log(item);
        res.json(item);
    })
}

const signIn = async (req: Request, res: Response): Promise<void> =>{
    const sign = user.signIn({email: req.body.email, password: req.body.password}).then((item)=>{
        res.json(item);
    });
}

const signUp = async (req: Request, res: Response): Promise<void> =>{
    // const sign = user.signUp({name: req.body.name, email: req.body.email, password: req.body.password}).then((item)=>{
    //     res.json(item);
    // });
    const tempuser: SignUp = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    try {
        const newUser = await user.signUp(tempuser);
        const token = jwt.sign({user: newUser}, (process.env.TOKEN_SECRET as unknown) as string);
        console.log(token);
        res.json(token);
        
    } catch (err) {
        res.status(400);
        res.json((err as unknown) as string + user);
    }
    
}

const deleteUser = async (req: Request, res:Response): Promise<void> =>{
    const delUser = user.deleteUser(req.params.id).then((item)=>{
        res.json(item);
    })
}

const authenticate = async(req: Request, res: Response): Promise<void> =>{
    // const auth = await user.authenticate({email: req.body.email, password: req.body.password}).then((item)=>{
        
    //     if(bcrypt.compareSync(req.body.password+BCRYPT_PEPPER, (item?.password as unknown) as string)){
    //         console.log('Password: ' + item?.password);
    //         res.send('Connected Successfully');
    //     }
    //     //res.json(item);
    // });

    try {

        const auth = await user.authenticate({email: req.body.email, password: req.body.password}).then((item)=>{
        const token = jwt.sign({user: item}, (process.env.TOKEN_SECRET as unknown) as string, {algorithm: 'HS256'});
        res.cookie('token', token, {
            httpOnly: true,
            //secure: true,
            maxAge: (1000 * 60),
            //signed: true
        });

        console.log(token);
            
            const header = ()=>{return res.set('authorization', token)};
            header();
            //console.log(req.headers);
            //console.log(header());
            console.log(item);
            //console.log(req.headers);
            //res.json(token);
            // const hash = bcrypt.hash(((item?.password) as string) + BCRYPT_PEPPER, parseInt((SALT_ROUNDS as unknown) as string)).then((item)=>{
                
            // });

            if(bcrypt.compareSync(req.body.password+BCRYPT_PEPPER, (item?.password as unknown) as string)){
                res.status(200);
                res.redirect('/')
            }
            else{
                res.send('Could not connect');
                //res.send('Provide the correct details');
            }
            
            
        });
        
    } catch (err) {
        res.status(400);
        res.json((err as unknown) as string + user);
        
    }
    

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


const user_routes = (app: express.Application): void =>{
    app.get('/users',verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', signUp);
    app.delete('/users', deleteUser);
    app.post('/users/authenticate', authenticate);

}

export default user_routes;

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