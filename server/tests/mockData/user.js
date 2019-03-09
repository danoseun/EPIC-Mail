export const validSignUpData = [
  {
    email: 'jjames@gmail.com',
    password: 'jamespass',
    firstname: 'John',
    lastname: 'James'
  },
  {
    email: 'jinajoe@gmail.com',
    password: 'jinajoe',
    firstname: 'Jina',
    lastname: 'Joegomez'
  }
];

export const inValidSignUpData = [
  // undefined email 0
  {
    password: 'jamespass',
    firstname: 'John',
    lastname: 'James'
  },
  // empty email 1(wasn't used)
  {
    email: '',
    password: 'jamespass',
    firstname: 'John',
    lastname: 'James'
  },
  // spaced email 2
  {
    email: 'jja mes@gmail.com',
    password: 'jamespass',
    firstname: 'John',
    lastname: 'James'
  },
  // invalid email format 3
  {
    email: 'jjamesgmail.com',
    password: 'jamespass',
    firstname: 'John',
    lastname: 'James'
  },
  // short email 4
  {
    email: 'j@mai.com',
    password: 'jamespass',
    firstname: 'John',
    lastname: 'James'
  },
  // Existing email 5
  {
    email: 'jjames@gmail.com',
    password: 'jamespass',
    firstname: 'John',
    lastname: 'James'
  },

  // Password
  // undefined password 6
  {
    email: 'jjake@gmail.com',
    firstname: 'John',
    lastname: 'James'
  },
  // short password 7
  {
    email: 'jwees@gmail.com',
    password: 'jam2',
    firstname: 'John',
    lastname: 'James'
  },
  // Firstname
  // undefined firstname 8
  {
    email: 'krames@gmail.com',
    password: 'jamespass',
    lastname: 'James'
  },
  // empty firstname 9(not used)
  {
    email: 'wersa@gmail.com',
    password: 'jamespass',
    firstname: '',
    lastname: 'James'
  },
  // firstname includes space 10
  {
    email: 'wale@gmail.com',
    password: 'jamespass',
    firstname: 'Jo  hn',
    lastname: 'James'
  },
  // short firstname length 11
  {
    email: 'obey@gmail.com',
    password: 'jamespass',
    firstname: 'J',
    lastname: 'James'
  },
  // firstname with numbers 12
  {
    email: 'eben@gmail.com',
    password: 'jamespass',
    firstname: 'J3ohn',
    lastname: 'James'
  },

  // lastname
  // undefined lastname 13
  {
    email: 'ebey@gmail.com',
    password: 'jamespass',
    firstname: 'John'
  },
  // empty lastname 14(not used)
  {
    email: 'kobe@gmail.com',
    password: 'jamespass',
    firstname: 'John',
    lastname: ''
  },
  // lastname space 15
  {
    email: 'gobe@gmail.com',
    password: 'jamespass',
    firstname: 'John',
    lastname: 'Ja  mes'
  },
  // short lastname 16
  {
    email: 'rundev@gmail.com',
    password: 'jamespass',
    firstname: 'John',
    lastname: 'J'
  },
  // lastname with numbers 17
  {
    email: 'splitdev@gmail.com',
    password: 'jamespass',
    firstname: 'John',
    lastname: 'James33'
  },
];
