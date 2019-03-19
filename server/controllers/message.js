/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import db from '../config';
import pool from '../config/config';
import {
  postMessage, findUserByEmail, insertIntoSent, insertIntoInbox,
} from '../config/sql';

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
  static async postMessage(req, res) {
    const {
      subject, message, status, email, parentmessageid,
    } = req.body;

    const { id } = req.authData.payload;

    const client = await pool.connect();
    try {
      if (status === 'draft') {
        const params = [subject, message, parentmessageid, id, status];
        const { rows } = await db.query(postMessage, params);
        return res.status(201).json({
          status: 201,
          data: rows[0]
        });
      }
      const receiver = await db.query(findUserByEmail, [email]);
      if (!receiver.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'User does not exist'
        });
      }
      
      const values = [subject, message, parentmessageid, id, 'sent'];
      const { rows } = await db.query(postMessage, values);

      await client.query('BEGIN');
      // persisting into sent table
      const sent = [rows[0].id, id];
      await db.query(insertIntoSent, sent);

      // persisting into inbox table
      const inboxValues = [rows[0].id, receiver.rows[0].id];
      await db.query(insertIntoInbox, inboxValues);
      await client.query('COMMIT');
      return res.status(201).json({
        status: 201,
        data: rows[0]
      });
    } catch (error) {
      await client.query('ROLLBACK');
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
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

  /**
       * User can delete single email record on the application
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success
       * @memeberof MessageController
       */
  static deleteSingleEmail(req, res) {
    const { foundEmail } = req.body;
    messages.splice(foundEmail.id - 1, 1);
    return res.status(200).json({
      status: 200,
      message: 'Email successfully deleted'
    });
  }
}
