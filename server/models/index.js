import createUsersTable from './user';
import createContactsTable from './contact';
import createReceivedMessagesTable from './message';
import createsentMessagesTable from './sent';
// import createInboxMesssagesTable from './inbox';
import createGroupTable from './group';
import createGroupMembersTable from './groupmembers';

(async () => {
  try {
    await createUsersTable();
    await createContactsTable();
    await createReceivedMessagesTable();
    await createsentMessagesTable();
    // await createInboxMesssagesTable();
    await createGroupTable();
    await createGroupMembersTable();
  } catch (error) {
    console.log(error);
  }
})();
