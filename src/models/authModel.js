let db=require('../../db');


exports.isregister=(name,email,hashedpasswrd,role)=>{
    // console.log(name,email,password,role);
    
    return new Promise((resolve,reject)=>{
        
        db.query("insert into users(name,email,password,role) values(?,?,?,?)",[name,email,hashedpasswrd,role],(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });

    })
}


exports.iscorrect=(email)=>{
    return new Promise((resolve, reject) => {
        db.query('select * from users where email=?', [email], (err, result) => {
            if (err) {
                reject(err);
            }
            //  else if (result && result.length > 0) {
            //     resolve(true);}
             else {
                resolve(result);
            }
        });
    });
};

