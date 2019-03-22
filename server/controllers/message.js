/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import db from '../config';
import pool from '../config/config';
import {
  postMessage,
  findUserByEmail,
  insertIntoSent,
  insertIntoInbox,
  receivedMessages,
  unReadReceivedMessages,
  sentMessages,
  draftQuery,
  queryString,
  readPatch,
  deleteSentQuery,
  deleteInboxQuery,
  deleteMessageQuery,
  queryUsersByEmail,
  recMes,
  unReadRec
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

    const client = await pool.connect();
    try {
      const result = await db.query(queryUsersByEmail, [email]);
      if (result.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'User does not exist'
        });
      }
      const insertResult = await db.query(postMessage, [subject, message, null, id, 'sent']);
      // persisting into sent table
      await client.query('BEGIN');
      await db.query(insertIntoSent, [insertResult.rows[0].id, id]);
       
      // persisting into inbox table
      await db.query(insertIntoInbox, [insertResult.rows[0].id, result.rows[0].id]);
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
      const { rows, rowCount } = await db.query(recMes, [id]);
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
      const { rows, rowCount } = await db.query(unReadRec, [
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
   * User can fetch single email record on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof MessageController
   */
  static async getSingleMail(req, res) {
    const params = Number(req.params.messageId);
    const { id } = req.authData.payload;

    try {
      const draftResult = await db.query(draftQuery, [id, 'draft', params]);
      if (draftResult.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: draftResult.rows[0]
        });
      }
      const { rows } = await db.query(queryString, [params]);
      if (rows[0].senderid === id) {
        return res.status(200).json({
          status: 200,
          data: rows[0]
        });
      }
      if (rows[0].receiverid === id) {
        const updatedMessage = await db.query(readPatch, ['read', rows[0].id]);
        return res.status(200).json({
          status: 200,
          data: updatedMesssage.rows[0]
        });
      }

      return res.status(404).json({
        status: 404,
        error: 'message is non existent'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'message is non-existent'
      });
    }
  }

  /**
   * User can delete single email record on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof MessageController
   */
  static async deleteSingleEmail(req, res) {
    const params = Number(req.params.messageId);
    const { id } = req.authData.payload;

    try {
      const deletedDraft = await db.query(deleteMessageQuery, [id, 'draft', params]);
      if (deletedDraft.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: 'Message was succesfully deleted'
        });
      }
      const { rows } = await db.query(deleteSentQuery, [params]);
      console.log(rows);
      if (rows[0].senderid === id) {
        return res.status(200).json({
          status: 200,
          data: 'Message was sucessfully deleted'
        });
      }
      if (rows[0].receiverid === id) {
        const updatedMessage = await db.query(deleteInboxQuery, [id, rows[0].id]);
        return res.status(200).json({
          status: 200,
          data: 'Message was successfully deleted'
        });
      }

      return res.status(404).json({
        status: 404,
        error: 'message is non existent'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'message is non-existent'
      });
    }
  }
}
