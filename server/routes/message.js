import express from 'express';
import { MessageController } from '../controllers';
import { messageValidator } from '../middlewares';
import { verifyToken } from '../helpers/auth';

const {
  postMessage, receiveAllMails, fetchAllUnreadMails, fetchAllSentMails, getSingleMail, deleteSingleEmail
} = MessageController;


export const messageRouter = express.Router();

messageRouter.post('/messages', verifyToken, messageValidator, postMessage);
messageRouter.get('/messages', verifyToken, receiveAllMails);
messageRouter.get('/messages/unread', verifyToken, fetchAllUnreadMails);
messageRouter.get('/messages/sent', verifyToken, fetchAllSentMails);
messageRouter.get('/messages/:messageId', verifyToken, getSingleMail);
messageRouter.delete('/messages/:messageId', verifyToken, deleteSingleEmail);
