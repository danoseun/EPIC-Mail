import pool from '../config';

const receivedMessagesTable = `DROP TABLE IF EXISTS received CASCADE;
CREATE TABLE received (
  id SERIAL PRIMARY KEY NOT NULL,
  subject CHARACTER VARYING(255) NOT NULL,
  message CHARACTER VARYING(500) NOT NULL,
  parentmessageid INTEGER NULL,
  senderid INTEGER NOT NULL,
  senderemail CHARACTER VARYING(50) NULL,
  receiverid INTEGER NULL,
  groupid INTEGER NULL,
  FOREIGN KEY (parentmessageid) references received (id) on delete CASCADE,
  FOREIGN KEY (senderid) REFERENCES users (id) on DELETE CASCADE,
  FOREIGN KEY (senderemail) REFERENCES users (email) on DELETE CASCADE,
  FOREIGN KEY (receiverid) references users (id) on DELETE CASCADE,
  FOREIGN KEY (groupid) references groups (id) on DELETE CASCADE,
  status CHARACTER VARYING(50) NOT NULL DEFAULT('unread'),
  createdon TIMESTAMP WITH TIME ZONE DEFAULT now()
)`;

/**
 * Function representing receivedMessagesTableHandler
 * @returns {object} representing sucess or failure
 */
export default async function createReceivedMessagesTable() {
  try {
    const create = await pool.query(receivedMessagesTable);
    console.log(`receivedmessagesTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(error);
  }
}
