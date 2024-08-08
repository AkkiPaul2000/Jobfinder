const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    throw new Error('This is an error got introduced')
    // res.send('login page');
})

module.exports=router