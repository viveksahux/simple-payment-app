import express from 'express';
import user from './user.js'
import transaction from './transaction.js'

const router = express.Router();

router.use('/user', user);

router.use('/transaction', transaction);

export default router;