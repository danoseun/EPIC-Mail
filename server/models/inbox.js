import pool from '../config';

const inboxTable = `DROP TABLE IF EXISTS inbox CASCADE;
CREATE TABLE inbox (
  id SERIAL PRIMARY KEY NOT NULL,
  messageid INTEGER NOT NULL,
  receiverid INTEGER NOT NULL,
  FOREIGN KEY (messageid) REFERENCES messages (id) on DELETE CASCADE,
  FOREIGN KEY (receiverid) REFERENCES users (id) on DELETE CASCADE,
  createdon TIMESTAMP WITH TIME ZONE DEFAULT now()
)`;

/**
 * Function representing InboxMessagesTableHandler
 * @returns {object} representing sucess or failure
 */
export default async function createinboxMessagesTable() {
  try {
    const create = await pool.query(inboxTable);
    console.log(`inboxTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(error);
  }
}
