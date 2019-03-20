import Validator from 'validatorjs';
/* eslint-disable use-isnan */
import { queryGroupByName, fetchSpecificGroupByUser } from '../config/sql';
import db from '../config';

/**
 * Function to Validate group input
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - Calls the next function
 * @returns {object} JSON representing the failure message
 */
export class GroupValidator {
  /**
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function
   * @returns {object} JSON representing the failure message
   */
  static async validateName(req, res, next) {
    /* eslint-disable prefer-const */
    let { name } = req.body;

    const rules = {
      name: 'required|max:50|alpha',
    };
    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors
      });
    }

    name = name.toLowerCase().trim();
    try {
      const { rows } = await db.query(queryGroupByName, [name]);
      if (rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'Name already exists please choose another name',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
    req.body.name = name;
    return next();
  }


  /**
   * Fetch Specific Group By to the application
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function/route handler
   * @returns {object} JSON representing the failure message.
   */
  static async findSpecificGroup(req, res, next) {
    const { id } = req.authData.payload;
    const gId = Number(req.params.groupId);
    try {
      const { rows, rowCount } = await db.query(fetchSpecificGroupByUser, [id, gId]);
      console.log('FIND', rows[0], rowCount);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Group does not exist',
        });
      }
      const foundGroup = rows[0];
      req.body.foundGroup = foundGroup;
      return next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}
