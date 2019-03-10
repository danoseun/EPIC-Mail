import express from 'express';
import { MessageController } from '../controllers';
import { messageValidator } from '../middlewares';

const { postMessage, receiveAllMails } = MessageController;


export const messageRouter = express.Router();

messageRouter.post('/messages', messageValidator, postMessage);
messageRouter.get('/messages', receiveAllMails);
