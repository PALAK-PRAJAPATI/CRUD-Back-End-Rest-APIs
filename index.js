import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import route from './routes/userRoute.js'

const app = express()
app.use(bodyParser.json());
dotenv.config();


const port = process.env.PORT  || 3000;
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
.then(()=>{
    console.log("Data Base Connected Successfully...");
})
.catch((error)=>{
    console.log(error)
})

app.listen(port,()=>{
    console.log(`Server is Running on port : ${port}`);
})



app.use("/api/user", route)