import express from 'express';
import { GroupController } from '../controllers';
import { GroupValidator } from '../middlewares';
import { verifyToken } from '../helpers/auth';

const { validateName, findSpecificGroup } = GroupValidator;

const {
  createGroup, getAllGroupsByUser, patchGroupByName, deleteSpecificGroup, addUserToGroup, deleteSpecificUserGroup, sendMessageToGroup
} = GroupController;

export const groupRouter = express.Router();

groupRouter.post('/groups', verifyToken, validateName, createGroup);
groupRouter.get('/groups', verifyToken, getAllGroupsByUser);
groupRouter.patch('/groups/:groupId/name', verifyToken, findSpecificGroup, patchGroupByName);
groupRouter.delete('/groups/:groupId', verifyToken, findSpecificGroup, deleteSpecificGroup);
groupRouter.post('/groups/:groupId/users', verifyToken, findSpecificGroup, addUserToGroup);
groupRouter.delete('/groups/:groupId/users/:userId', verifyToken, findSpecificGroup, deleteSpecificUserGroup);
groupRouter.post('/groups/:groupId/messages', verifyToken, findSpecificGroup, sendMessageToGroup);
