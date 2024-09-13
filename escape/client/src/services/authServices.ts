import {URLs} from '../constants/consts';
import axios from 'axios';
import {User} from '../types/types';
import {Response} from './response';
import authHeader from "./authHeader";


export const registerUser = async (user:User) => {
             return axios.post(URLs.BASE+URLs.AUTH+"register", user).then((res) =>{
              const response:Response = res.data;
               // console.log("Success register")
                //console.log(response)
                localStorage.setItem("user", JSON.stringify(res.data));
                   return response;
            }).catch((err)=>{
              console.log("Error!! Cannot Register");
              const response:Response = {
                success: false,
                message: err as string
              }
                console.log(response);
                return response;
            })

};

export const loginUser = (user:Pick<User, 'email' | 'password'>) => {
  return axios
    .post(URLs.BASE+URLs.AUTH+"signin", user)
    .then((res) => {
      const response:Response = res.data;
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response));
      }

      return (response);
    }).catch((err)=>{
      console.log("Error!! Cannot Login");
      const response:Response = {
        success: false,
        message: err as string
      }
        console.log(response);
        return response;
    });
};
export const loginCheck = () => {
  return axios
    .get(URLs.BASE+URLs.AUTH+"home", {headers: {'Authorization': authHeader()}})
    .then((response) => {
      //console.log("authenticated");
     // console.log(response.data);
      return response.data;
    }).catch((err)=>{
      console.log("Error!! Cannot Authenticate");
              const response:Response = {
                success: false,
                message: err as string
              }
                //console.log(response);
                return response;
            
    });
};
export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};

