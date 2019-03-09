import express from 'express';
import { UserController } from '../controllers';
import { UserValidator } from '../middlewares';

const { createAccount } = UserController;
const { signUpValidator } = UserValidator;

export const userRouter = express.Router();

userRouter.post('/auth/signup', signUpValidator, createAccount);
