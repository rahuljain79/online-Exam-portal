let mysql=require('mysql2');


let conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'onlineexam'
})

conn.connect((err)=>{
    if(err)
        console.log("something went wrong");
    else
        console.log("connected");
}
)
module.exports=conn;