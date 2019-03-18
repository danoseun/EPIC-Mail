import pool from './config';

export default {
  /**
     * DB Query
     * @param {object} text
     * @param {object} params
     * @returns {object} object
     */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }
};
