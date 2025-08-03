
let db=require('../../db');
exports.examExists = (exam_id, s_time) => {
   let date = s_time.split(' ')[0]; 
console.log(date);
  return new Promise((resolve, reject) => {
    db.query('select count(*) as count from exam_schedule where exam_id = ? AND date(start_time) = ?', [exam_id,date], (err, result) => {
       console.log(result);
      if (err) return reject(err);     
      resolve(result);
    });
  });
};

exports.addSchedule=(exam_id,start_time,end_time,status)=>{
    return new Promise((resolve,reject)=>{
        db.query('insert into exam_schedule(exam_id,start_time,end_time,status) values(?,?,?,?)',[exam_id,start_time,end_time,status],(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result.insertId)
            }
        })
    })
  }

  exports.find=(()=>{
      return new Promise((resolve,reject)=>{
        db.query('select * from exam_schedule',(err,result)=>{
        if(err){
          reject(err);
        }
        else{
          resolve(result);
        }
      });
        
      })
  })
  
  exports.getByID=((id)=>{
      return new Promise((resolve,reject)=>{
        db.query('select * from exam_schedule where schedule_id=?',[id],(err,result)=>{
          if(err){
            reject(err);
          }
          else{
            resolve(result)
          }
        })
      })
  })

  exports.updatebyID=((id,...data)=>{
    return new Promise((resolve,reject)=>{
      db.query('update exam_schedule set exam_id=?, start_time=?,end_time=?,status=? where schedule_id=? ',[...data,id],(err,result)=>{
        if(err) reject(err);
        else resolve(result);
      })
    })
  })

  exports.delById=((id)=>{
    return new Promise((resolve,reject)=>{
      db.query('delete from exam_schedule where schedule_id=?',[id],(err,result)=>{
        if(err) reject(err);
        else resolve(result);
      });
    });
  });

  exports.searchdetailByDate=((date)=>{
    return new Promise((resolve,reject)=>{
      db.query('select * from exam_schedule where date(start_time)=?',[date],(err,result)=>{
        if(err) reject(err);
        else resolve(result);
      })
    })
  })