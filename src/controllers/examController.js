let model=require('../models/examModel');


exports.createexam = (req, res) => {
    const { title, courseId, duration, date } = req.body;

    model.createexam(title, courseId, duration, date)
        .then((result) => {
            res.status(201).json({ msg: 'Exam created successfully' });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

exports.examview=(req,res)=>{

   let p= model.examview()
    p.then((result)=>{
        res.json(result);
    })
    p.catch((err)=>{
        res.json(err);
    });
};

exports.examscheduleByID=(req,res)=>{
    let id=req.query.id;
    let p=model.getExamById(id);
    p.then((row)=>{res.json(row)});
    p.catch((err)=>{
        res.json(err.message);
    });

}

exports.updateexamByID=(req,res)=>{
    let id=req.query.id;
    let user=req.user;
    console.log('user making the request: ',user);
    
    let { title, courseId, duration, date}=req.body;
    let promise=model.updatebyID( id,title, courseId, duration, date);
    promise.then((result)=>{
        res.json({msg:'updation successfully done'});
    })
    promise.catch((err)=>{
        res.json({err:err.message});
    })
}


exports.deleteExamById=(req,res)=>{
    let id=req.query.id;
    let p=model.delById(id);
    p.then((result)=>{
        res.json({msg:'deleted successfully'})
    })
    p.catch((err)=>{
        res.json({msg:err.message})
    })
}

exports.searchExamByDate=(req,res)=>{
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
