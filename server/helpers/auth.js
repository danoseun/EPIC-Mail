import jwt from 'jsonwebtoken';

export const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRETKEY);
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  if (!token) {
    return res.status(403).json({
      status: 403,
      error: 'No token supplied'
    });
  }
  jwt.verify(token, process.env.SECRETKEY, (error, authData) => {
    if (error) {
      if (error.message.includes('signature')) {
        return res.status(403).json({
          status: 403,
          error: 'Invalid token supplied'
        });
      }
      return res.status(403).json({
        message: error
      });
    }
    req.authData = authData;
    return next();
  });
};
