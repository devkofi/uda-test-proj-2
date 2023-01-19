import express, {Request, Response} from 'express';
import {User, SignIn, SignUp} from '../models/User';
import dotenv from 'dotenv';

const {ENV} = process.env;

const user = new User((ENV as unknown) as string);

const signIn = async (req: Request, res: Response): Promise<void> =>{
    const sign = user.signIn({email: req.body.email, password: req.body.password}).then((item)=>{
        res.json(item);
    });
}

const signUp = async (req: Request, res: Response): Promise<void> =>{
    const sign = user.signUp({name: req.body.name,email: req.body.email, password: req.body.password}).then((item)=>{
        res.json(item);
    });
}

const user_routes = (app: express.Application): void =>{
    app.post('/signin', signIn);
    app.post('/signup', signUp);
}

export default user_routes;