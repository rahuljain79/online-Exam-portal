let express=require('express');
let {authenticateToken} =require('../middleware/authMidleware');
let router=express.Router();


router.get('/dashboard',authenticateToken,(req,res)=>{
    res.json({msg:'welcome to your dashboard',user:req.user});
    
});

module.exports=router;
