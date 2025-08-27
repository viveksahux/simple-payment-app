import mongoose from 'mongoose';
import env from '../config.js'

const MONGO_URI = env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


const userSchema = mongoose.Schema({
  username: {
    type : String,
    required : true,
    lowercase : true,
    unique : true,
    trim : true,
    minLength : 1,
    maxLength : 50
  },
  firstname : {
    type : String,
    required : true,
    trim : true,
    maxLength : 50
  },
  lastname : {
    type : String,
    required : true,
    trim : true,
    maxLength : 50
  },
  email: {
    type : String,
    required : true,
    unique : true,
    maxLength : 50
  },
  password: {
    type : String,
    required : true,
  }
}, { autoCreate: false, autoIndex: false });

const User = mongoose.model('User', userSchema);

const accoutnSchema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  balance : {
    type : Number,
    required : true
  }
})

const Account = mongoose.model('Account', accoutnSchema)



export {User, Account};