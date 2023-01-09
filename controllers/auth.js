import User from "../models/User.js"

export const register = async (req,res,next)=>{
    try{
    const newUser = new User({
    email: req.body.email,
    mobile:req.body.mobile,
    name:req.body.name,
    })

    await newUser.save()
    res.status(200).send("User has been created.")
    }catch(err){
    next(err)
    }
}