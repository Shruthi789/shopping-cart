import {client} from '../index.js';
import bcrypt from 'bcrypt';

function getUser(username){
    return client.db('shoppingDB').collection('users').findOne({username});
}

async function genPassword(password){
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    return hashedPassword;
}

function signUp(userData){
    return client.db('shoppingDB').collection('users').insertOne(userData);
}

async function comparePassword(password,storedPassword){
   const result=bcrypt.compare(password,storedPassword);
   return result;
}
function passwordStrength(password){
    const regexp=new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})','g');
    const condition=regexp.test(password);
    if(condition)
    {
        return 'Password Strong!!'
    }
    return 'Password weak!!'
}

export {getUser,genPassword,signUp,passwordStrength,comparePassword};