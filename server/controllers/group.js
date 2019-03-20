import db from '../config';
import {
  createGroupQuery, insertAdminIntoGroupMembersTable, findUserById, fetchAllGroupsByUser, updateGroupName, deleteGroup, queryUsersByEmail, createGroupMember
} from '../config/sql';

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
    try {
      const { rows } = await db.query(findUserById, [id]);
      const { email } = rows[0];
      const { name } = req.body;
      const params = [name, email];
      const result = await db.query(createGroupQuery, params);
      const values = [result.rows[0].id, id, 'admin'];
      await db.query(insertAdminIntoGroupMembersTable, values);
      const newGroup = result.rows[0];
      return res.status(201).json({
        status: 201,
        data: newGroup
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
      const { rows } = await db.query(deleteGroup, [foundGroup.groupid]);
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
    try {
      const foundUser = await db.query(queryUsersByEmail, [email]);
      if (!foundUser) {
        return res.status(404).json({
          status: 404,
          error: 'User does not exist',
        });
      }
      const { rows } = await db.query(createGroupMember, [foundGroup.groupid, foundUser.rows[0].id]);
      return res.status(201).json({
        status: 201,
        data: rows
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}
