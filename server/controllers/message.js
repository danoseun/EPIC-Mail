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
}
