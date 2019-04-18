import express from 'express';
import { MessageController } from '../controllers';
import { messageValidator } from '../middlewares';
import { verifyToken } from '../helpers/auth';

const {
  postMessage, receiveAllMails, fetchAllUnreadMails, fetchAllSentMails, getSingleReceivedMail, getSingleSentMail, deleteSingleReceivedEmail, deleteSingleSentEmail
} = MessageController;


export const messageRouter = express.Router();

messageRouter.post('/messages', verifyToken, messageValidator, postMessage);
messageRouter.get('/messages', verifyToken, receiveAllMails);
messageRouter.get('/messages/unread', verifyToken, fetchAllUnreadMails);
messageRouter.get('/messages/sent', verifyToken, fetchAllSentMails);
messageRouter.get('/messages/received/:messageId', verifyToken, getSingleReceivedMail);
messageRouter.get('/messages/sent/:messageId', verifyToken, getSingleSentMail);
messageRouter.delete('/messages/received/:messageId', verifyToken, deleteSingleReceivedEmail);
messageRouter.delete('/messages/sent/:messageId', verifyToken, deleteSingleSentEmail);
