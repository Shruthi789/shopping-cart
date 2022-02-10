import jwt from 'jsonwebtoken';

function adminAuth(request,response,next){
    try{
    const token=request.header('x-auth-token');
    jwt.verify(token,process.env.ADMIN_SECRETKEY);
    next();
    }catch(error){
      response.status(401).send(error.message);
    }

}
function regAuth(request,response,next){
  try{
  const token=request.header('x-auth-token');
  jwt.verify(token,process.env.REGULAR_SECRETKEY);
  next();
  }catch(error){
    response.status(401).send(error.message);
  }

}
export {adminAuth,regAuth};