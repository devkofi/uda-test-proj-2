import express, {Request, Response} from 'express';
import {User, SignIn, SignUp} from '../models/user';
import {connection} from './connection';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

const {ENV,BCRYPT_PEPPER, SALT_ROUNDS} = process.env;

const user = new User((ENV as unknown) as string);

const signIn = async (req: Request, res: Response): Promise<void> =>{
    const sign = user.signIn({email: req.body.email, password: req.body.password}).then((item)=>{
        res.json(item);
    });
}

const signUp = async (req: Request, res: Response): Promise<void> =>{
    const sign = user.signUp({name: req.body.name, email: req.body.email, password: req.body.password}).then((item)=>{
        res.json(item);
    });
}

const deleteUser = async (req: Request, res:Response): Promise<void> =>{
    const delUser = user.deleteUser(req.params.id).then((item)=>{
        res.json(item);
    })
}

const authenticate = async(req: Request, res: Response): Promise<void> =>{
    const auth = user.authenticate({email: req.body.email, password: req.body.password}).then((item)=>{
        
        if(bcrypt.compareSync(req.body.password+BCRYPT_PEPPER, (item?.password as unknown) as string)){
            console.log('Password: ' + item?.password);
            res.send('Connected Successfully')
        }
        //res.json(item);
    });

}

const user_routes = (app: express.Application): void =>{
    app.post('/authenticate', authenticate);
    app.post('/signup', signUp);
    app.delete('/delete/:id', deleteUser);
}

export default user_routes;