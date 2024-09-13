import {Messages} from '../constants/messages';
import {Response} from '../models/reponse';
import {User, UserInterface} from '../models/user';
import bcrypt from 'bcryptjs';
import jwt, {Secret} from 'jsonwebtoken';


export const registerUser = async (user: Partial<UserInterface>)  => {
  const response:Response ={success:true};
    if (!user) {
      response.success = false;
      response.message = Messages.MISSING_USER_INFO;
    }
    if (!user.firstName) {
      response.success = false;
      response.message = Messages.MISSING_FIRSTNAME;
    }
    if (!user.lastName) {
      response.success = false;
      response.message = Messages.MISSING_LASTNAME;
    }
    if (!user.email) {
      response.success = false;
      response.message = Messages.MISSING_EMAIL;
    }
    if (!user.password) {
      response.success = false;
      response.message = Messages.MISSING_PASSWORD;
    }
    
    if(response.success){
      try{
        const existingUser = await User.findOne({email:user.email});
        if (existingUser) {
          response.message = Messages.EXISTING_USER;
          response.data = JSON.stringify(existingUser);
        }else{
          const newUser = new User(user)
          await newUser.save()
          const accessToken = jwt.sign({
            user: {
              email:newUser.email,
              firstName: newUser.firstName,
              id:newUser._id,
            }
          }, process.env.JWT_KEY as Secret, {expiresIn: "60m"});
          //const token = await newUser.generateAuthToken()
          response.data = JSON.stringify({"firstName":user.firstName, "lastName":user.lastName, "email":user.email, "id": newUser._id})
          response.accessToken = accessToken;
        }
      } catch {
        response.success=false;
        response.message = Messages.DB_ERROR_RESPONSE;
      }
      
    }
    return response;
    
}
export const signInUser = async (user: Partial<UserInterface>)  => {
  const response:Response ={success:true};
  if (!user.email ) {
    response.success = false;
    response.message = Messages.MISSING_EMAIL
  }
  if (!user.password) {
    response.success = false;
    response.message = Messages.MISSING_PASSWORD
  }

  if(response.success){
    try{
      const existingUser = await User.findOne({email:user.email});
      if (!existingUser) {
        response.success = false;
        response.message = Messages.INVALID_EMAIL
      }else{
        const userAllowed = await bcrypt.compare(user.password as string, existingUser.password);
        if(userAllowed){
          const accessToken = jwt.sign({
            user: {
              email:existingUser.email,
              firstName: existingUser.firstName,
              id:existingUser._id,
            }
          }, process.env.JWT_KEY as Secret, {expiresIn: "60m"})
          response.data = JSON.stringify({firstName: existingUser.firstName, lastName:existingUser.lastName, email:existingUser.email,id:existingUser._id });
          response.accessToken = accessToken;
        }else{
          response.success = false;
          response.message = Messages.INVALID_PASSWORD
        }
      }
    } catch{
      response.success=false;
      response.message = Messages.DB_ERROR_RESPONSE;
    }
  }
  return response;
}

