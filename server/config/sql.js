export const createUser = 'INSERT INTO users (email,password,firstname, lastname) VALUES ($1, $2, $3, $4) returning *';
export const findUserById = 'SELECT * FROM users WHERE id = $1';
export const queryUsersByEmail = 'SELECT * FROM users where email = $1';
export const insertIntoReceived = 'INSERT INTO received (subject, message, senderid, senderemail, receiverid) VALUES ($1, $2, $3, $4, $5) returning *';
export const insertIntoSent = 'INSERT INTO sent (subject, message, senderid, receiveremail, receiverid) VALUES ($1, $2, $3, $4, $5) returning *';
export const receivedMessages = 'SELECT id, subject, message, senderid, senderemail, status, createdon FROM received WHERE receiverid = $1 ORDER BY createdon';
export const unReadReceivedMessages = 'SELECT id, subject, message, senderid, senderemail, status, createdon FROM received WHERE (receiverid, status) = ($1, $2) ORDER BY createdon';
export const sentMessages = 'SELECT id, subject, message, receiverid, receiveremail, status, createdon FROM sent WHERE senderid = $1 ORDER BY createdon';
export const getSingleReceivedMessage = 'SELECT id, subject, message, senderid, senderemail, status, createdon FROM received WHERE (id, receiverid) = ($1, $2)';
export const updateReceivedStatus = 'UPDATE received SET status = $1 WHERE id = $2 and receiverid = $3 returning *';
export const getSingleSentMessage = 'SELECT id, subject, message, receiverid, receiveremail, status, createdon FROM sent WHERE (id, senderid) = ($1, $2)';
export const deleteReceievedMessage = 'DELETE FROM received WHERE (id, receiverid) = ($1, $2) returning *';
export const deleteSentMessage = 'DELETE FROM sent WHERE (id, senderid) = ($1, $2) returning *';

// Group Query
export const createGroupQuery = 'INSERT INTO groups (name, creator) VALUES ($1, $2) returning *';
export const insertAdminIntoGroupMembersTable = 'INSERT INTO groupmembers (groupid, userid, userrole) VALUES ($1, $2, $3) returning *';
export const fetchAllGroupsByUser = 'SELECT groupid,name,role FROM groups INNER JOIN groupmembers on groupmembers.groupid = groups.id WHERE userid = $1;';
export const fetchSpecificGroupByUser = 'SELECT groupid,name,role FROM groups INNER JOIN groupmembers on groupmembers.groupid = groups.id WHERE userid = $1 AND groupid = $2;';
export const updateGroupName = ' UPDATE groups SET name = $1 WHERE id = $2 returning * ';
export const deleteGroup = 'DELETE FROM groups WHERE id = $1';
export const queryGroupByName = 'SELECT * FROM groups WHERE name = $1';
export const createGroupMember = 'INSERT INTO groupmembers (groupid, userid) VALUES ($1, $2) returning *';
export const selectMembers = 'SELECT * FROM groupmembers WHERE (groupid, userid) = ($1, $2)';
export const selectAllMembers = 'SELECT id,userid,userrole FROM groupmembers WHERE groupid = $1';
export const deleteGroupMembers = 'DELETE FROM groupmembers WHERE (groupid, userid) = ($1, $2) returning *';
export const groupSentMessages = 'INSERT INTO sent (subject, message, senderid, groupid) VALUES ($1, $2, $3, $4) returning *';
export const groupReceivedMessages = 'INSERT INTO received (subject, message, senderid, senderemail, groupid) VALUES ($1, $2, $3, $4, $5) returning *';
