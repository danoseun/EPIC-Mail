import express from 'express';
import { MessageController } from '../controllers';
import { messageValidator } from '../middlewares';

const { postMessage } = MessageController;


export const messageRouter = express.Router();

messageRouter.post('/messages', messageValidator, postMessage);
