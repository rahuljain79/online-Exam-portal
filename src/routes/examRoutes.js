let express=require('express');
let control=require('../controllers/examController');
let router=express.Router();
let {authenticateToken,isAdmin}=require('../middleware/authMidleware');

router.post('/createexam',control.createexam);
router.get('/views',control.examview);
router.get('/examschedule',control.examscheduleByID);
router.put('/updatexamBYID',authenticateToken,isAdmin, control.updateexamByID);
router.delete('/del',control.deleteExamById);
router.get('/search',control.searchExamByDate);


module.exports=router;