import {Request} from 'express';
import jwt, {Secret} from 'jsonwebtoken';
import {Response} from '../models/reponse';
import {Messages} from '../constants/messages';
import { TokenInterface } from './token';

export const validateToken = (req: Request)=>{
    console.log(req.headers);
    const res:Response = {success:true}
    const authHeader = (req.headers.Authorization ||  req.headers.authorization)?.toString();
    if(authHeader && authHeader.startsWith('Bearer')){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY as Secret, (err, decoded)=>{
            if(err){
                res.success = false;
                res.message = Messages.USER_NOT_AUTHORIZED
            }else{
                const decodedRes  = (decoded as TokenInterface).user;
                res.data = JSON.stringify({"firstName": decodedRes.firstName, "email": decodedRes.email, "id":decodedRes.userId});
                //console.log(res);
            }
            
        })
    }else{
        res.success = false;
        res.message = Messages.INVALID_USER_TOKEN
    }
    return res;
}