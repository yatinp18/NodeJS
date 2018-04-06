const mysql = require('mysql');

global.con= mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database:"yatin"
});

con.connect(function(err,res){
  if (err){
    console.log("Error connecting");
    throw err;
  }else{
    console.log("Connected!");
  }
});

module.exports={
  con:con
}
