import pool from '../config/config';

const usersTable = `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users (
        id SERIAL PRIMARY KEY NOT NULL,
        email CHARACTER VARYING(50) UNIQUE NOT NULL,
        password CHARACTER VARYING(255) NOT NULL,
        firstname CHARACTER VARYING(255) NOT NULL,
        lastname CHARACTER VARYING(255) NOT NULL,
        registeredon TIMESTAMP WITH TIME ZONE DEFAULT now()
        )`;
/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */
export default async function createUsersTable() {
  try {
    const create = await pool.query(usersTable);
    console.log(`userTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`userTable ${error}`);
  }
}
