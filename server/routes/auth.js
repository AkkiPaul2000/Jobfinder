const express=require('express');
const bcrypt=require('bcrypt')
const User=require('../schema/user.schema')
const router=express.Router()
const jwt=require('jsonwebtoken')
router.get('/',(req,res)=>{
    // throw new Error('This is an error got introduced')
    res.send('login page');
})
router.post('/register',async(req,res)=>{
    const saltRounds=10

    try{
        
    const {name,email,password}=req.body;
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400).send('User already exists')
    }
    const salt=bcrypt.genSaltSync(saltRounds)
    const hash=bcrypt.hashSync(password,salt)
    const user=new User ({name,email,password:hash})
    await user.save();
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.json({email:user.email,token})
    }
    catch(err){
        return new Error(err.message)
    }
})
router.post('/login',async(req,res)=>{
    try{
    const {email,password}=req.body;
    const userExists=await User.findOne({email})
    if(!userExists){
        res.status(400).send('email or password is wrong')
    }
    const validPass=bcrypt.compareSync(password,userExists.password)
    if(!validPass){
        return res.status(400).send('email or password is wrong');
    }
    const user=await User.findOne({email})
    const token=jwt.sign({_id:userExists._id},process.env.TOKEN_SECRET)
    res.json({email:userExists.email,token})
    }
    catch(err){
        return new Error(err.message)
    }
})
router.post('/updatePassword',async (req,res)=>{
    const saltRounds=10
    try{
        
        const {email,password,newPassword}=req.body;
        // console.log("hey",req.headers)
        const salt=bcrypt.genSaltSync(saltRounds)
        const hash=bcrypt.hashSync(newPassword,salt)
        const token=req.headers['authorization'];

        // const token=authHeader && authHeader.split('.')[1];
        const userExists=await User.findOne({email});
        console.log("hey_Toke",token,"got user?",userExists._id.toString())
        if(!userExists){
            res.status(400).send('email or password is wrong')
        }
        const validPass=bcrypt.compareSync(password,userExists.password)
        if(!validPass){
            return res.status(400).send('email or password is wrong')
        }
        const verifiedToken=jwt.verify(token,process.env.TOKEN_SECRET)
        console.log("hey_verifyToke",verifiedToken,"got user?",userExists._id)

        if(verifiedToken._id!==userExists._id.toString()){
            return res.status(401).send('UnAuthorized');
        }
        await User.findOneAndUpdate({email:userExists.email},{password:hash})
        res.json({
            message:'Password updates successfully'
        })
        
    }
    catch(e){
        return new Error(e.message)
    }
})

module.exports=router