import express from 'express';
import { UserController } from '../controllers';
import { UserValidator } from '../middlewares';

const { createAccount, loginUser } = UserController;
const { signUpValidator, loginValidator } = UserValidator;

export const userRouter = express.Router();

userRouter.post('/auth/signup', signUpValidator, createAccount);
userRouter.post('/auth/login', loginValidator, loginUser);
