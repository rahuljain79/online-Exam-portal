let jwt=require('jsonwebtoken');
let secret_key=process.env.secret_key;

let authenticateToken=(req,res,next)=>{
    let authHeader=req.headers['authorization'];

    let token=authHeader && authHeader.split(' ')[1];
    if(!token)
       return res.json({msg:'token missing'})

    jwt.verify(token,secret_key,(err,user)=>{
        if(err)
          return res.json({msg:'sorry expired token'})

        req.user=user;
        next();
    })
}

let isAdmin=(req,res,next)=>{
    if(req.user && req.user.role==='admin'){
        next();
    }
    else{
        res.json({msg:'Admin access required'})
    }
};
module.exports={authenticateToken,isAdmin};