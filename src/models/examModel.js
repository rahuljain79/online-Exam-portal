// const { reject } = require('bcrypt/promises');
let db=require('../../db');

exports.createexam = (title, courseId, duration, date) => {
    return new Promise((resolve, reject) => {
        db.query(
            'insert into exams (title, course_id, duration, date) VALUES (?, ?, ?, ?)',
            [title, courseId, duration, date],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};

exports.examview=(()=>{
    return new Promise((resolve,reject)=>{
        db.query('select * from exams',(err,result)=>{
            if(err) reject(err);
            else resolve(result);
        });
    });
});

exports.getExamById=((id)=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from exams where exam_id=?',[id],(err,result)=>{
                if(err) reject(err);
                else resolve(result);
            })
        })
})

exports.updatebyID=((id,...data)=>{
    return new Promise((resolve,reject)=>{
        db.query('update exams set title=?, course_Id=?, duration=?, date=? where exam_id=?',[...data,id],(err,result)=>{
            if(err) reject(err);
            else resolve(result);
        })
    })
})

  exports.delById=((id)=>{
    return new Promise((resolve,reject)=>{
      db.query('delete from exams where exam_id=?',[id],(err,result)=>{
        if(err) reject(err);
        else resolve(result);
      });
    });
  });

    exports.searchdetailByDate=((date)=>{
    return new Promise((resolve,reject)=>{
      db.query('select * from exams where date=?',[date],(err,result)=>{
        if(err) reject(err);
        else resolve(result);
      })
    })
  })