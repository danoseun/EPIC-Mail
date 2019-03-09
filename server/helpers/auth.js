import jwt from 'jsonwebtoken';

export const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRETKEY);
  return token;
};
