// let express=require('express');
let model=require('../models/scheduleModel');

exports.createSchdeule=(req,res)=>{
    let {eid, s_time, end_time, status} = req.body;

    if(!eid||!s_time||!end_time){
        res.json({msg:'examid,start_time,end_time are required'})
    }

    let promise=model.examExists(eid,s_time);
    promise.then(result=>{
        if(result[0].count>0){
            return res.json({msg:'duplicate schduled'});
        }
        else{
        return model.addSchedule(eid,s_time,end_time,status||'scheduled')
        .then(schedule_id=>{
            res.json({schedule_id});
        })  }     
    }).catch(err=>{
        console.log(err);
        res.json({msg:'server error'});
    })
};

exports.getAllschedule=(req,res)=>{
    let promise=model.find();
  promise.then((rows)=>{
        res.json(rows);
    })
  promise.catch((err)=>{
        res.json({msg:err.message});
    })
}


exports.getscheduleByID=(req,res)=>{
    let {id}=req.body;
    let promise=model.getByID(id);
    promise.then(([rows])=>{
        res.json([rows]);
    })
    promise.catch((err)=>{
        res.json({msg:err})
    })
}

exports.updatescheduleByID=(req,res)=>{
    let id=req.query.id;
    let user=req.user;
    console.log('user making the request: ',user);
    
    let {eid,stime,etime,status}=req.body;
    let promise=model.updatebyID(id,eid,stime,etime,status);
    promise.then((result)=>{
        res.json({msg:'updation successfully done'});
    })
    promise.catch((err)=>{
        res.json({err:err.message});
    })
}

exports.deletescheduleById=(req,res)=>{
    let id=req.query.id;
    let p=model.delById(id);
    p.then((result)=>{
        res.json({msg:'deleted successfully'})
    })
    p.catch((err)=>{
        res.json({msg:err.message})
    })
}

exports.searchScheduleByDate=(req,res)=>{
    let date=req.query.date;
    if (!date || isNaN(Date.parse(date))) {
    return res.json({ msg: 'Invalid or missing date format' });
    }
    let p=model.searchdetailByDate(date);
    p.then((result)=>{
        if(result.length===0) res.json({msg:'record not available'})
       else res.json(result);
    })
    p.catch((err)=>{
        res.json({msg:'something went wrong'});
    })
}

