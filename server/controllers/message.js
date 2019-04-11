/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import db from '../config';
import pool from '../config/config';
import {
  insertIntoReceived,
  insertIntoSent,
  receivedMessages,
  unReadReceivedMessages,
  sentMessages,
  queryUsersByEmail,
  getSingleReceivedMessage,
  updateReceivedStatus,
  getSingleSentMessage,
  deleteReceievedMessage,
  deleteSentMessage
} from '../config/sql';

/* eslint-disable no-unused-vars */

import {
  generateRandomArbitraryNumber,
  generateRandomParentMessageId
} from '../helpers/random';


/**
 * Class representing MessageController
 * @class MessageController
 */
export class MessageController {
  /**
   * Send message on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof MessageController
   */
  static async postMessage(req, res) {
    const {
      subject, message, email
    } = req.body;

    const { id } = req.authData.payload;
    const senemail = req.authData.payload.email;

    const client = await pool.connect();
    try {
      const result = await db.query(queryUsersByEmail, [email]);
      if (result.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'User does not exist'
        });
      }

      // insert into sent messages table
      await client.query('BEGIN');
      const insertResult = await db.query(insertIntoSent, [subject, message, id, email, result.rows[0].id]);
      // persisting into received messages table
      await db.query(insertIntoReceived, [subject, message, id, senemail, result.rows[0].id]);

      await client.query('COMMIT');
      return res.status(201).json({
        status: 201,
        data: insertResult.rows[0]
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
  static async receiveAllMails(req, res) {
    const { id } = req.authData.payload;
    try {
      const { rows, rowCount } = await db.query(receivedMessages, [id]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'You have no received emails at this time'
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
   * User can fetch all unread received emails on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof MessageController
   */
  static async fetchAllUnreadMails(req, res) {
    const { id } = req.authData.payload;
    try {
      const { rows, rowCount } = await db.query(unReadReceivedMessages, [
        id,
        'unread'
      ]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error:
            'You do not have any unread messages in your inbox at this time'
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
   * User can fetch all sent emails on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof MessageController
   */
  static async fetchAllSentMails(req, res) {
    const { id } = req.authData.payload;
    try {
      const { rows, rowCount } = await db.query(sentMessages, [id]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'You do not have any sent messages at this time'
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
   * User can fetch single received email record on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof MessageController
   */
  static async getSingleReceivedMail(req, res) {
    const params = Number(req.params.messageId);
    const { id } = req.authData.payload;

    try {
      const { rows, rowCount } = await db.query(getSingleReceivedMessage, [params, id]);
      if (rowCount > 0) {
        if (rows[0].status === 'unread') {
          const res = await db.query(updateReceivedStatus, ['read', params, id]);
          return res.status(200).json({
            status: 200,
            data: res.rows[0]
          });
        }
        return res.status(200).json({
          status: 200,
          data: rows[0]
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Message is unavailable'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
   * User can fetch single sent email record on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof MessageController
   */
  static async getSingleSentMail(req, res) {
    const params = Number(req.params.messageId);
    const { id } = req.authData.payload;

    try {
      const { rows, rowCount } = await db.query(getSingleSentMessage, [params, id]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'The message you are requesting for is unavailable'
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows[0]
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
   * User can delete single received email record on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof MessageController
   */
  static async deleteSingleReceivedEmail(req, res) {
    const params = Number(req.params.messageId);
    const { id } = req.authData.payload;

    try {
      const { rows, rowCount } = await db.query(deleteReceievedMessage, [params, id]);
      if (rowCount === 0) {
        res.status(404).json({
          status: 404,
          error: 'You cant delete a received message that you dont have'
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: 'Received Message successfully deleted'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
   * User can delete single sent email record on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof MessageController
   */
  static async deleteSingleSentEmail(req, res) {
    const params = Number(req.params.messageId);
    const { id } = req.authData.payload;

    try {
      const { rows, rowCount } = await db.query(deleteSentMessage, [params, id]);
      if (rowCount === 0) {
        res.status(404).json({
          status: 404,
          error: 'You cant delete a sent message that you dont have'
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: 'Sent Message successfully deleted'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
}
