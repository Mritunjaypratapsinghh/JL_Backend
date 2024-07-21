require('dotenv').config();

const connectDB = require("./db/db")
const express = require("express")
const port = process.env.PORT || 3000

const app = express()

connectDB()

app.get('/',(req,res)=>{
    res.send({route : "/"})
})

app.listen(port,()=>{
    console.log("Server Started Successfully",port)
})