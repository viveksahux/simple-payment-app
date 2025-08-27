import express from 'express';
import { Account } from '../db/cluster.js'
import verifyToken from '../middleware.js/auth.js';
import { transactReq } from '../middleware.js/validator.js';
import mongoose from 'mongoose';
const router = express.Router();

router.get('/balance', verifyToken, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ balance: account.balance });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/transfer',verifyToken, transactReq,async (req,res)=>{
    const session = await mongoose.startSession();
       try {
        session.startTransaction();
        const { amount, receiver } = req.body;

        // Find the sender's account
        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            // insufficient Balance or Account Not FOund
            await session.abortTransaction();
            return res.status(402).json({ message: "Insufficient Balance or Account Does Not Exist" });
        }

        // Find the receiver's account
        const receiverAccount = await Account.findOne({ userId: receiver }).session(session);
        if (!receiverAccount) {
            // Abort if receiver's account doesn't exist
            await session.abortTransaction();
            return res.status(404).json({ message: "Receiver Account Not Found" });
        }

        // Perform the transaction
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: receiver }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction if all operations are successful
        await session.commitTransaction();

        // Send the success response
        res.status(200).json({ message: "Transfer Successful" });

    } catch (error) {
        // Abort transaction if any error occurs
        await session.abortTransaction();
        console.error("Transaction error:", error);
        res.status(500).json({ message: "Transaction failed", error: error.message });

    } finally {
        // End the session, regardless of success or failure
        session.endSession();
    }
})
export default router;