let model=require('../models/courseModel');


exports.addCourse=(req,res)=>{
    let {name,description}=req.body;
    let promise=model.createcourse(name,description);

    promise.then((result)=>{
        res.json({msg:'course created succesfully'});
    })
    promise.catch((err)=>{
        res.json({msg:err.message})
    });
}

exports.viewcourse=(req,res)=>{
    let promise=model.viewcourse();

    promise.then((row)=>{
        res.json(row);
    })
    promise.catch((err)=>{
        res.json({msg: 'err.message'});
    });
}

exports.getcourseById=(req,res)=>{

  let id = req.query.id;
      console.log(id);
    let p=model.getcourseById(id);
    p.then(row=>{
        res.json(row);
    })
    p.catch((err)=>{
        res,json({msg:err.message});
    })
}

exports.updatecourse=(req,res)=>{
    let id=req.query.id;
    let {name,description}=req.body;
    let p=model.updatecourse(id,name,description);
    p.then((result)=>{
        res.json({msg:'course updated done'})
    })
    p.catch((err)=>{
        res.json({msg:err.message});
    })
}

exports.deletecourse=(req,res)=>{
    let id=req.query.id;
    let p=model.deletecourse(id);
    p.then((result)=>{
        res.json({msg:'deleted succesfully'})
    })
    p.catch((err)=>{
        res.json(err.message);
    })
}

exports.searchcourseByDate=(req,res)=>{
    let date=req.query.date;
    if (!date || isNaN(Date.parse(date))) {
    return res.json({ msg: 'Invalid or missing date format' });
    }
    let p=model.searchcourseByDate(date);
    p.then((result)=>{
        if(result.length===0) res.json({msg:'record not available'})
       else res.json(result);
    })
    p.catch((err)=>{
        res.json({msg:'something went wrong'});
    })
}
