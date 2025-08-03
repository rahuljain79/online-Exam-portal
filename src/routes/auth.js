let express=require('express');
let conn=require('../controllers/authcontroller');
let router=express.Router();

router.post('/register',conn.register);
router.post('/login',conn.login);

module.exports=router;

