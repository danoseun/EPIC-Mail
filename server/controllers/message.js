/* eslint-disable no-unused-vars */
import { sentMessages, receivedMessages } from '../dummyDb';
import { generateRandomArbitraryNumber, generateRandomParentMessageId } from '../helpers/random';

/**
 * Class representing MessageController
 * @class MessageController
 */
export class MessageController {
  /**
       * Create user account on the application
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success
       * @memeberof MessageController
       */
  static postMessage(req, res) {
    const { subject, message } = req.body;
    const senderId = generateRandomArbitraryNumber(1, 100);
    const receiverId = generateRandomArbitraryNumber(1, 100);
    const parentMessageId = generateRandomParentMessageId(0, 10);
    const newMessage = {
      id: sentMessages.length + 1,
      createdOn: Date.now(),
      subject,
      message,
      senderId,
      receiverId,
      parentMessageId,
      status: 'sent'
    };
    sentMessages.push(newMessage);
    return res.status(201).json({
      status: 201,
      data: { newMessage }
    });
  }

  /**
       * User can fetch all received emails on the application
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success
       * @memeberof MessageController
       */
  static receiveAllMails(req, res) {
    return res.status(200).json({
      status: 200,
      data: receivedMessages
    });
  }

  /**
       * User can fetch all unread received emails on the application
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success
       * @memeberof MessageController
       */
  static fetchAllUnreadMails(req, res) {
    const unreadMails = receivedMessages.filter(message => message.status === 'unread');
    if (unreadMails.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'You have no unread emails at this time'
      });
    }
    return res.status(200).json({
      status: 200,
      data: unreadMails
    });
  }

  /**
       * User can fetch all sent emails on the application
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success
       * @memeberof MessageController
       */
  static fetchAllSentMails(req, res) {
    return res.status(200).json({
      status: 200,
      data: sentMessages
    });
  }

  /**
       * User can fetch single email record on the application
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success
       * @memeberof MessageController
       */
  static getSingleMail(req, res) {
    const { foundEmail } = req.body;
    return res.status(200).json({
      status: 200,
      data: foundEmail
    });
  }
}
