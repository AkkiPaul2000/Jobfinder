const express=require('express')
const dotenv=require('dotenv')
const authRoute=require('./routes/auth')
const mongoose=require('mongoose')
const fs=require('fs')
const bodyParser=require('body-parser')
const app=express()
dotenv.config()
const port=process.env.PORT||4000;
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.use((req,res,next)=>{
    const reqString=`${req.method} ${req.url}\n`;
    fs.writeFile('log.txt',reqString,{flag:'a'},(err)=>{
if(err){console.log(err)}
    })
    console.log(reqString)
    next()
}
)


app.use('/v1/auth',authRoute)

app.use((err,req,res,next)=>{
    const reqString=`${req.method} ${req.url} ${err.message} \n`;
    fs.writeFile('error.txt',reqString,{flag:'a'},(err)=>{
if(err){console.log(err)}
    })
    console.log(reqString)
    res.status(500).send('Internal server Error')
    next()
}
)


app.listen(port,()=>{
    mongoose.connect(process.env.DB_CONNECT)
    console.log(`App listening on port ${port}`)
})
