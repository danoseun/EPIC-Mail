import express from 'express';
import { MessageController } from '../controllers';
import { messageValidator } from '../middlewares';

const { postMessage, receiveAllMails, fetchAllUnreadMails, fetchAllSentMails } = MessageController;


export const messageRouter = express.Router();

messageRouter.post('/messages', messageValidator, postMessage);
messageRouter.get('/messages', receiveAllMails);
messageRouter.get('/messages/unread', fetchAllUnreadMails);
messageRouter.get('/messages/sent', fetchAllSentMails);
