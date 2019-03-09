import express from 'express';

export const defaultRouter = express.Router();

defaultRouter.get('/api/v1', (req, res) => res.status(200).json({
  data: 'I bid you welcome to EPIC Mail'
}));

defaultRouter.all('*', (req, res) => res.status(404).json({
  error: 'Sorry, page not found!'
}));
