export const createUser = 'INSERT INTO users (email,password,firstname, lastname) VALUES ($1, $2, $3, $4) returning *';
export const findUserById = 'SELECT * FROM users WHERE id = $1';
export const queryUsersByEmail = 'SELECT * FROM users where email = $1';
export const postMessage = 'INSERT INTO messages (subject, message, parentmessageid, creator, status) VALUES ($1, $2, $3, $4, $5) returning *';
export const findUserByEmail = 'SELECT * FROM users WHERE email = $1';
export const insertIntoSent = 'INSERT INTO sent (messageid, senderid) VALUES ($1, $2) returning *';
export const insertIntoInbox = 'INSERT INTO inbox (messageid, receiverid) VALUES ($1, $2) returning *';
export const receivedMessages = 'SELECT messages.id, messages.createdon, messages.subject, messages.message, messages.parentmessageid, messages.status FROM messages LEFT JOIN inbox ON messages.id = inbox.messageid WHERE inbox.receiverid = $1';
export const unReadReceivedMessages = 'SELECT messages.id, messages.createdon, messages.subject, messages.message, messages.parentmessageid, messages.status FROM messages LEFT JOIN inbox ON messages.id = inbox.messageid WHERE (inbox.receiverid, messages.status) = ($1, $2)';
export const sentMessages = 'SELECT messages.id, messages.createdon, messages.subject, messages.message, messages.parentmessageid, messages.status FROM messages LEFT JOIN sent ON messages.id = sent.messageid WHERE sent.senderid = $1';
export const draftQuery = 'SELECT * FROM messages WHERE (creator, status, id) = ($1, $2, $3)';
export const queryString = 'SELECT messages.id, messages.createdon, messages.subject, messages.message, messages.parentmessageid, messages.status, sent.senderid, inbox.receiverid FROM messages LEFT JOIN inbox ON messages.id = inbox.messageid LEFT JOIN sent ON messages.id = sent.messageid WHERE messages.id = $1';
export const readPatch = 'UPDATE messages SET STATUS = $1 WHERE ID = $2 returning *';
export const deleteSentQuery = 'DELETE FROM sent WHERE (senderid, messageid) = ($1, $2) returning *';
export const deleteInboxQuery = 'DELETE FROM inbox WHERE (receiverid, messageid) =($1, $2) returning *';
export const deleteMessageQuery = 'DELETE FROM messages WHERE (creator, status, id) = ($1, $2, $3) returning *';


export const createGroupQuery = 'INSERT INTO groups (name, creator) VALUES ($1, $2) returning *';
export const insertAdminIntoGroupMembersTable = 'INSERT INTO groupmembers (groupid, userid, userrole) VALUES ($1, $2, $3) returning *';
export const fetchAllGroupsByUser = 'SELECT groupid,name,role FROM groups INNER JOIN groupmembers on groupmembers.groupid = groups.id WHERE userid = $1;';
export const fetchSpecificGroupByUser = 'SELECT groupid,name,role FROM groups INNER JOIN groupmembers on groupmembers.groupid = groups.id WHERE userid = $1 AND groupid = $2;';
export const updateGroupName = ' UPDATE groups SET name = $1 WHERE id = $2 returning * ';
export const deleteGroup = 'DELETE FROM groups WHERE id = $1';
export const queryGroupByName = 'SELECT * FROM groups WHERE name = $1';
export const createGroupMember = 'INSERT INTO groupmembers (groupid, userid) VALUES ($1, $2) returning *';
