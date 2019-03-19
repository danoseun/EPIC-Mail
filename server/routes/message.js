import express from 'express';
import { MessageController } from '../controllers';
import { messageValidator, findMailById } from '../middlewares';
import { verifyToken } from '../helpers/auth'

const {
  postMessage, receiveAllMails, fetchAllUnreadMails, fetchAllSentMails, getSingleMail, deleteSingleEmail
} = MessageController;


export const messageRouter = express.Router();

messageRouter.post('/messages', verifyToken, messageValidator, postMessage);
messageRouter.get('/messages', receiveAllMails);
messageRouter.get('/messages/unread', fetchAllUnreadMails);
messageRouter.get('/messages/sent', fetchAllSentMails);
messageRouter.get('/messages/:messageId', findMailById, getSingleMail);
messageRouter.delete('/messages/:messageId', findMailById, deleteSingleEmail);
