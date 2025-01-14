import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global{
  namespace Express{
    interface Request{
      userId:String;
      auth0Id:String;
    }
  }
}

export  const  jwtCheck = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

  export const jwtParse = async(req:Request,res:Response,next:NextFunction)=>{
    const {authorization} = req.headers;
    if(!authorization ||  !authorization.startsWith("Bearer ")){
      console.log("bearer error");
      return res.sendStatus(401);
    }
    const token = authorization.split(" ")[1];
    try{
       const decoded = jwt.decode(token) as jwt.JwtPayload;
       const auth0Id = decoded.sub;
       const user = await User.findOne({auth0Id})

       if(!user){
        return res.sendStatus(401);
        console.log("no user");
       }

       req.auth0Id = auth0Id as string;
       req.userId= user._id.toString();
       next();
    }
    catch(error){
      console.log("other error");
      return res.sendStatus(401);
    }
  }
  