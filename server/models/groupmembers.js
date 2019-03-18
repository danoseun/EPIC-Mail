import pool from '../config';

const groupMembers = `DROP TABLE IF EXISTS groupmembers CASCADE;
  CREATE TABLE groupmembers (
  id SERIAL PRIMARY KEY NOT NULL,
  groupid INTEGER NOT NULL,
  userid INTEGER NOT NULL,
  createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
  FOREIGN KEY (groupid) references groups (id) on delete CASCADE,
  FOREIGN KEY (userid) references users (id) on delete CASCADE
)`;

/**
 * Function representing GroupMembersTableHandler
 * @returns {object} representing sucess or failure
 */
export default async function createGroupMembersTable() {
  try {
    const create = await pool.query(groupMembers);
    console.log(`groupMembers: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(error);
  }
}
