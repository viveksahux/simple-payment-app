import express from 'express';
import user from './user.js'
import payments from './payments.js'

const router = express.Router();

router.use('/user', user);

router.use('/payments', payments);

export default router;