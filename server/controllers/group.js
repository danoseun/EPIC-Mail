/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import 'dotenv/config';
import db from '../config';
import {
  createGroupQuery, insertAdminIntoGroupMembersTable, findUserById, fetchAllGroupsByUser, updateGroupName, deleteGroup, queryUsersByEmail, createGroupMember, selectMembers, selectAllMembers, deleteGroupMembers, groupReceievedMessages, groupSentMessages, groupReceivedMessages
} from '../config/sql';
import pool from '../config/config';

const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const cliente = require('twilio')(accountSid, authToken);
/**
 * Class representing GroupController
 * @class GroupController
 */
export class GroupController {
  /**
   * User can create group on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof GroupController
   */
  static async createGroup(req, res) {
    const { id } = req.authData.payload;

    const clientt = await pool.connect();
    try {
      const { rows } = await db.query(findUserById, [id]);
      const { email } = rows[0];
      const { name } = req.body;
      const params = [name, email];
      await clientt.query('BEGIN');
      const result = await db.query(createGroupQuery, params);
      const values = [result.rows[0].id, id, 'admin'];
      await db.query(insertAdminIntoGroupMembersTable, values);
      await clientt.query('COMMIT');
      const newGroup = result.rows[0];
      return res.status(201).json({
        status: 201,
        data: newGroup
      });
    } catch (error) {
      await clientt.query('ROLLBACK');
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * User can fetch all groups on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof GroupController
   */
  static async getAllGroupsByUser(req, res) {
    const { id } = req.authData.payload;
    try {
      const { rows, rowCount } = await db.query(fetchAllGroupsByUser, [id]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'No groups created yet',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * User can fetch all groups on the application
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof GroupController
   */
  static async patchGroupByName(req, res) {
    const { foundGroup } = req.body;
    try {
      const { rows } = await db.query(updateGroupName, [req.body.name, foundGroup.groupid]);
      const updatedGroup = rows[0];
      console.log(updatedGroup);
      const { id, name, role } = updatedGroup;
      return res.status(200).json({
        id,
        name,
        role,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * Delete Specific Group on the application
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function/route handler
   * @returns {object} JSON representing the failure message.
   */
  static async deleteSpecificGroup(req, res) {
    const { foundGroup } = req.body;
    try {
      await db.query(deleteGroup, [foundGroup.groupid]);
      return res.status(200).json({
        status: 200,
        message: 'Group successfully deleted',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * Add users to Specific Group on the application
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function/route handler
   * @returns {object} JSON representing the failure message.
   */
  static async addUserToGroup(req, res) {
    const { foundGroup, email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: 'Please supply email of user to be added'
      });
    }
    try {
      const foundUser = await db.query(queryUsersByEmail, [email]);
      if (foundUser.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'User does not exist',
        });
      }
      // check if user is a member of this group already
      const checkUser = await db.query(selectMembers, [foundGroup.groupid, foundUser.rows[0].id]);
      if (checkUser.rowCount !== 0) {
        return res.status(409).json({
          status: 409,
          error: 'User belongs to this group already'
        });
      }
      await db.query(createGroupMember, [foundGroup.groupid, foundUser.rows[0].id]);
      const result = await db.query(selectAllMembers, [foundGroup.groupid]);
      return res.status(201).json({
        status: 201,
        data: result.rows
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * Delete user from a Specific Group on the application
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function/route handler
   * @returns {object} JSON representing the failure message.
   */
  static async deleteSpecificUserGroup(req, res) {
    const { foundGroup } = req.body;
    const user = Number(req.params.userId);
    try {
      // if user(coming from params) === id (from auth) don't delete else delete
      const deletedMember = await db.query(deleteGroupMembers, [foundGroup.groupid, user]);
      if (deletedMember.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: 'User deleted successfully from group'
        });
      }
      return res.status(404).json({
        status: 404,
        data: 'User does not exist on this application'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * Send message to a Specific Group on the application
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function/route handler
   * @returns {object} JSON representing the failure message.
   */
  // static async sendMailToGroup(req, res) {
  //   const { foundGroup } = req.body;
  //   const { id } = req.authData.payload;
  //   const { email } = req.authData.payload;
  //   const {
  //     subject, message
  //   } = req.body;
  //   const client = await pool.connect();

  //   // Check if user is the creator of the group and in turn a member of the group
  //   try {
  //     const { rowCount } = await db.query(selectMembers, [foundGroup.groupid, id]);
  //     if (rowCount === 0) {
  //       return res.status(403).json({
  //         status: 403,
  //         error: 'You are not permitted to carry out this operation'
  //       });
  //     }

  //     /**
  //      * new implementation will be to insert this message
  //      * into sent for the sender and received into
  //      */
  //     const values = [subject, message, id, foundGroup.groupid];
  //     await client.query('BEGIN');
  //     const messages = await db.query(groupSentMessages, values);
  //     console.log('message', messages);

  //     await db.query(groupReceivedMessages, [subject, message, id, email, foundGroup.groupid]);

  //     await client.query('COMMIT');
  //     // send messages via twilio
  //     cliente.messages.create({
  //       from: process.env.FROM,
  //       to: process.env.TO,
  //       body: `Hello, ${email} sent ${messages.rows[0].message} to group ${foundGroup.groupid}`
  //     });
  //     return res.status(201).json({
  //       status: 201,
  //       data: messages.rows[0]
  //     });
  //   } catch (error) {
  //     await client.query('ROLLBACK');
  //     return res.status(500).json({
  //       status: 500,
  //       error: error.message,
  //     });
  //   }
  // }

  /**
   * Send message to a Specific Group on the application
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function/route handler
   * @returns {object} JSON representing the failure message.
   */
  static async sendMessageToGroup(req, res) {
    const { foundGroup } = req.body;
    const { id } = req.authData.payload;
    const { email } = req.authData.payload;
    const {
      subject, message
    } = req.body;

    const client = await pool.connect();

    // Check if user is the creator of the group and in turn a member of the group
    try {
      const { rowCount } = await db.query(selectMembers, [foundGroup.groupid, id]);
      if (rowCount === 0) {
        return res.status(403).json({
          status: 403,
          error: 'You are not permitted to carry out this operation'
        });
      }
      // insert into sent messages table
      await client.query('BEGIN');
      const insertResult = await db.query(groupSentMessages, [subject, message, id, foundGroup.groupid]);
      // console.log('groups', insertResult.rows[0]);
      // persist into received messages table
      await db.query(groupReceivedMessages, [subject, message, id, email, foundGroup.groupid]);

      await client.query('COMMIT');
      return res.status(201).json({
        status: 201,
        data: insertResult.rows[0]
      });
    } catch (error) {
      await client.query('ROLLBACK');
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
}
