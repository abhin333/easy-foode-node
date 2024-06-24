var { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    { username: user.username,id: user.id },
    "jwtsecreteKey"
  );
  return accessToken;
};

const validateToken=(req,res,next)=>{
    console.log("@@@@@@@@@@@@@",req.headers.authorization);
    const accessToken=req.headers.authorization;
    console.log("ezzzzzzzzz",accessToken);

    // if(!accessToken){
    //     return res.status(400).json({error:"user not Authorised"})
    // }

    try{
        const validToken= verify(accessToken,"jwtsecreteKey")
        console.log("valid token",validToken);
        if(validToken){
            req.authenticated =true;
            return next();
        }
    }catch(err){
        res.status(400).json({error:err})
    }
};

module.exports={createToken,validateToken};
