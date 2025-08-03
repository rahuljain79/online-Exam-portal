let express = require('express');
let router = express.Router();
let contro = require('../controllers/sheduleController');
let {authenticateToken,isAdmin}=require('../middleware/authMidleware');

// router.put()
router.post('/scheduleadd',contro.createSchdeule);
router.get('/scheduleview',contro.getAllschedule);
router.get('/scheduleById',contro.getscheduleByID);
router.put('/updatescheuleByid',authenticateToken,isAdmin, contro.updatescheduleByID);
router.delete('/delshedule',contro.deletescheduleById);
router.get('/searchscheduleByDate',contro.searchScheduleByDate)





module.exports = router;
