import pool from '../config';

const sentMessagesTable = `DROP TABLE IF EXISTS sent CASCADE;
CREATE TABLE sent (
  id SERIAL PRIMARY KEY NOT NULL,
  messageid INTEGER NOT NULL,
  senderid INTEGER NOT NULL,
  FOREIGN KEY (messageid) REFERENCES messages (id) on DELETE CASCADE,
  FOREIGN KEY (senderid) REFERENCES users (id) on DELETE CASCADE,
  createdon TIMESTAMP WITH TIME ZONE DEFAULT now()
)`;

/**
 * Function representing SentMessagesTableHandler
 * @returns {object} representing sucess or failure
 */
export default async function createSentMessagesTable() {
  try {
    const create = await pool.query(sentMessagesTable);
    console.log(`sentTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(error);
  }
}
