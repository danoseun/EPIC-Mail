import pool from '../config';

const sentMessagesTable = `DROP TABLE IF EXISTS sent CASCADE;
CREATE TABLE sent (
  id SERIAL PRIMARY KEY NOT NULL,
  subject CHARACTER VARYING(255) NOT NULL,
  message CHARACTER VARYING(500) NOT NULL,
  parentmessageid INTEGER NULL,
  senderid INTEGER NOT NULL,
  receiveremail CHARACTER VARYING(50) NULL,
  receiverid INTEGER NULL,
  groupid INTEGER NULL,
  FOREIGN KEY (parentmessageid) references sent (id) on delete CASCADE,
  FOREIGN KEY (senderid) REFERENCES users (id) on DELETE CASCADE,
  FOREIGN KEY (receiveremail) REFERENCES users (email) on DELETE CASCADE,
  FOREIGN KEY (receiverid) references users (id) on DELETE CASCADE,
  FOREIGN KEY (groupid) references groups (id) on DELETE CASCADE,
  status CHARACTER VARYING(50) NOT NULL DEFAULT ('sent'),
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
