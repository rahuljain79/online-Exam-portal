let model=require("../models/authModel");
let bcrupt=require('bcrypt');
let jwt=require('jsonwebtoken');
require('dotenv').config();

let secret_key=process.env.secret_key;


exports.register=(req,res)=>{
    let {name,email,password,role}=req.body;
    
bcrupt.hash(password,10,(err,hashedpasswrd)=>{
    if(err){
        res.json({msg:'error hashing passwrd',error:err});
    }
    let promise=model.isregister(name,email,hashedpasswrd,role);
    promise.then((result)=>{
        
        if(result.affectedRows > 0){
            res.json({msg:"Registration Sucessful",data:result});
        }
        else{
            res.json({msg:"Incorrecr details"});
        }
    }).catch((err)=>{
        res.json(err)
    })
})
}

exports.login=(req,res)=>{
    let {email,password}=req.body;
    console.log(email,password);
        let promise=model.iscorrect(email);

    if(!email||!password){
            res.json({msg:'email and passwrd required'})
    }

    promise.then(result=>{
        if(!result||result<0)
            return res.status(200).json({msg:'invalid passwrd or email'});
       let user=result[0];

       bcrupt.compare(password,user.password,(err,isMatch)=>{
        console.log(password+" "+user.password);
        console.log(isMatch);
        
        
        if(err){
            console.log('bcrypt error');
          return res.json({msg:'server error<'});
        }
        if(!isMatch){
           return res.json({msg:'invalid email or passwrd'})
        }

        let token=jwt.sign(
            {
            id:user.id,
            email:user.email,
            role:user.role
            },
            secret_key,
            {expiresIn:'1h'}
        );

      return res.json({msg:'congratulations login successfull',token,
            user:{
                id:user.id,
                name:user.name,
                user:user.name,
                role:user.role
            }
        });
       });
    }).catch(err=>{
        console.log('login error :',err);
        res.json({msg:'server error->'});
    });  
}
