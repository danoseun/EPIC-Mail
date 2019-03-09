export const sentMessages = [
  {
    id: 1,
    createdOn: Date.now(),
    subject: 'Welcome to Andela',
    message: 'Congratulations, after two weeks of evaluation, you arewelcome to Andela',
    senderId: 1,
    receiverId: 2,
    parentMessageId: null,
    status: 'sent'
  },
  {
    id: 2,
    createdOn: Date.now(),
    subject: 'Welcome to Google',
    message: 'Congratulations, after two weeks of evaluation, you arewelcome to Andela',
    senderId: 1,
    receiverId: 2,
    parentMessageId: null,
    status: 'sent'
  },
];

export const unreadMessages = [
  {
    id: 1,
    createdOn: Date.now(),
    subject: 'Action Group notice',
    message: 'This is to notify you of our early closure today',
    senderId: 1,
    receiverId: 2,
    parentMessageId: null,
    status: 'unread'
  },
  {
    id: 2,
    createdOn: Date.now(),
    subject: 'Deduction bank alert',
    message: 'Your transcation with firstbank group...',
    senderId: 1,
    receiverId: 2,
    parentMessageId: null,
    status: 'unread'
  },
];
