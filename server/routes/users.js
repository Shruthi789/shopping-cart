import express from "express";
import { getUser,genPassword,signUp,passwordStrength,comparePassword } from "../actions/usersActions.js";
import jwt from 'jsonwebtoken';
const router=express.Router();

router.route('/signup')
      .post(async(request,response)=>{
          const {username,password,userType}=request.body;
          const user=await getUser(username);
          const passStrength=passwordStrength(password);
          if(user){
              response.status(400).send('Duplicate value!!');
          }
          else if(passStrength==='Password weak!!'){
            response.status(400).send(passStrength);
        }
        else{
          const hashedPassword=await genPassword(password);
          const result=await signUp({username,password:hashedPassword,userType});
          response.send(result);
        }
      });
router.route('/signin')
      .post(async(request,response)=>{
        const {username,password}=request.body;
          const user=await getUser(username);
          let token;
          if(!user){
              response.status(401).send('Invalid credentials');
              return;
          }
          const passValid=await comparePassword(password,user.password);
          if(!passValid){
            response.status(401).send('Invalid credentials');
            return;
        }
          if(user.userType==='Admin'){
          token=jwt.sign({id:user._id},process.env.ADMIN_SECRETKEY);
          }
          if(user.userType==='Regular'){
          token=jwt.sign({id:user._id},process.env.REGULAR_SECRETKEY);
          }
          response.send({msg:'Sign in successful',id:user._id,token});
      });

export const usersRouter=router;