let express=require('express');
let control=require('../controllers/courseController');
let router=express.Router();
let {authenticateToken,isAdmin}=require('../middleware/authMidleware');

router.post('/addcourse',authenticateToken,isAdmin,control.addCourse);
router.get('/viewcourse',control.viewcourse);
router.get('/getcourseById',control.getcourseById);
router.put('/updatecourse',control.updatecourse);
router.delete('/deletecourse',control.deletecourse);
router.get('/searchcourseByDate',control.searchcourseByDate);



module.exports=router;