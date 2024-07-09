import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import MyUserRoute from './routes/MyUserRoute';
import { v2 as cloudinary } from "cloudinary";
import MyRestaurantRoute from './routes/MyRestaurantRoute';
import RestaurantRoute from './routes/RestaurantRoute';
import orderRoute from './routes/orderRoute';

 const app = express();
 
 app.use(cors())

 mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("Connected to the database successfully");
 })

 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


 app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
 app.use(express.json());
 app.use("/api/my/user",MyUserRoute);
 app.use("/api/my/restaurant",MyRestaurantRoute);
 app.use("/api/restaurant",RestaurantRoute);
 app.use("/api/orders", orderRoute);



app.listen(8000,()=>{
    console.log("server started at localhost 8000");
})