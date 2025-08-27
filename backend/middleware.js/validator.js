import { z } from 'zod';
const registerSchema = z.object({
    username : z.string().min(2).lowercase(),
    firstname : z.string().min(2),
    lastname : z.string().min(2),
    email : z.email(),
    password : z.string().min(8),

})

function registerValidate(req, res, next) {
    let valid = registerSchema.safeParse(req.body);
    if(!valid.success){
        return res.status(400).json({
            message:"Data format Invalid",
            errors: valid.error
        })
    }
    next();
}

const singinSchema = z.object({
    email : z.email(),
    password : z.string().min(1)
})

function signinValidate(req,res,next){
    const valid = singinSchema.safeParse(req.body);
    if(!valid.success){
        return res.status(400).json({
            message:"Data format Invalid",
            errors: valid.error
        })
    }
    next();
}

const transactionSchema = z.object({
  amount: z.number().min(1, { message: "Amount must be at least 1" }),
  receiver: z.string().min(24)
});

function transactReq(req,res,next){
    const valid = transactionSchema.safeParse(req.body);
    if(!valid.success){
        return res.status(400).json({
            message:"Data Format Invalid",
            error : valid.error
        })
    }
    next();
}
export {registerValidate, signinValidate, transactReq}