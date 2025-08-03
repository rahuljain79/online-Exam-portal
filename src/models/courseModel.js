
// const { reject } = require('bcrypt/promises');
let db=require('../../db');

exports.createcourse=((name,description)=>{
    return new Promise((resolve,reject)=>{
        db.query('insert into courses(name,description) values(?,?)',[name,description],(err,result)=>{
            if(err) reject(err);
            else resolve(result);
        })
    })
})

exports.viewcourse=(()=>{
    return new Promise((resolve,reject)=>{
        db.query('select * from courses',(err,result)=>{
            if(err) reject(err);
            else resolve(result);
        })
    })
})

exports.getcourseById=((id)=>{
    return new Promise((resolve,reject)=>{
        db.query('select * from courses where course_id=?',[id],(err,result)=>{
            if(err) reject(err);
            else resolve(result);
        });
    })
})

exports.updatecourse=(id,...data)=>{
    return new Promise((resolve,reject)=>{
        db.query('update courses set name=?,description=? where course_id=?',[...data,id],(err,result)=>{
            if(err) reject(err);
            else resolve(result);
        })
    })
}

exports.deletecourse=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query('delete from courses where course_id=? ',[id],(err,result)=>{
            if(err) reject(err);
            else resolve(result);
        })
    })
}
//   exports.searchdetailByDate=((date)=>{
//     return new Promise((resolve,reject)=>{
//       db.query('select * from exam_schedule where date(start_time)=?',[date],(err,result)=>{
//         if(err) reject(err);
//         else resolve(result);
//       })
//     })
//   })

  exports.searchcourseByDate=((date)=>{
    return new Promise((resolve,reject)=>{
    db.query('select * from courses where date=?',[date],(err,result)=>{
            if(err) reject(err);
            else resolve(result);
        })
  })
})