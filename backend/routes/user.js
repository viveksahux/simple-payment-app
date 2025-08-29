import express from 'express';
import env from '../config.js'
import {User, Account} from '../db/cluster.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { registerValidate, signinValidate } from '../middleware.js/validator.js';
import verifyToken from '../middleware.js/auth.js';
const router = express.Router();

const JWT_SECRET = env.JWT_SECRET;
const SALT_ROUNDS = env.SALT_ROUNDS;

router.post('/signup', registerValidate, async(req , res)=> {
    const { username, firstname, lastname, email, password } = req.body;
    try{
        const exsit = await User.findOne({username, email});
        //Check if User Already Exsist in DB
        if(exsit){
            return res.status(400).json({ message: 'Username or Email Already Exsist' });
        }
        //Hash the passowrd using bcrypt
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        //Proceed to create new user in the DB
        const newUser = new User({ username, firstname, lastname, email, password:hashedPassword});
        const savedUser = await newUser.save();
        const balance = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
        await Account.create({
            userId: savedUser._id,
            balance
        });
        return res.status(201).json({ message: 'User and account created successfully' });
    } catch (err){
        res.status(500).json({ message: 'Server error', error: err });
    }    

});

router.post('/signin',signinValidate, async(req,res)=>{
    const { email, password } = req.body;
    
  try {
    // 1. Find user by email OR username
    const 
    user = await User.findOne({email:email});

    if (!user) {
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    // 2. Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    // 3. Generate token
    const userID = await User.findOne({email:email}).select('_id');
    const payload = {userID,email}
    const token = jwt.sign(payload,JWT_SECRET, { expiresIn: '24h' })
    // 4. Send token
    res.json({ message : "Signin Successful", token : token });

  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ message: 'Server error' });
  }
})

router.put('/modifypass', verifyToken, signinValidate, async (req,res)=>{
  try{
    //Hash the Entered Password Before Updating it in the DB
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)
    await User.updateOne(
    { _id: req.userId },     // Filter
    { password: hashedPassword }  // Fields to update
    );
    res.status(200).json({message:"Password Updated Successfully"})
  }catch (err){
    res.status(400).json({message:"Error Updating the Password", error: err})
  }
})

router.get('/users', verifyToken, async(req,res)=>{
  const filter = req.query.filter || "";
  const users = await User.find({
    $or:[{
      firstname: {"$regex" : filter}
    },{
      lastname: {"$regex" : filter}
    }]
  })

  res.status(200).json({
    user: users.map(user=>({
      _id : user._id,
      username : user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email : user.email,
    }))
  })
});
 



export default router;