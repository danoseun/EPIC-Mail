import pool from '../config';

const contactTable = `DROP TABLE IF EXISTS contacts CASCADE;
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY NOT NULL,
  firstname CHARACTER VARYING(255) NOT NULL,
  lastname CHARACTER VARYING(255) NOT NULL,
  email CHARACTER VARYING(100) UNIQUE NOT NULL,
  createdon TIMESTAMP WITH TIME ZONE DEFAULT now()
)`;

/**
 * Function representing ContactTableHandler
 * @returns {object} representing sucess or failure
 */
export default async function createContactsTable() {
  try {
    const create = await pool.query(contactTable);
    console.log(`contactTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(error);
  }
}
