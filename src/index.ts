 import express from 'express';
 import cors from 'cors';
 import 'dotenv/config';
import mongoose from 'mongoose';
import MyUserRoute from './routes/MyUserRoute';
import { jwtCheck } from './middleware/auth';

 const app = express();
 app.use(express.json());
 app.use(cors())

 mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("Connected to the database successfully");
 })

 app.use("/api/my/user",MyUserRoute);



app.listen(8000,()=>{
    console.log("server started at localhost 8000");
})