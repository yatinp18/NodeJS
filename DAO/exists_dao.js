// var db=require('./main_dao');
// module.exports=function(name){
//
// const con=db.con;
//
// con.connect(function(err,res) {
//   if (err) throw err;
//   console.log("Connected!");
//
//   if (err) throw err;
//   let que=`SELECT * FROM Users WHERE name LIKE ${name} `;
//   con.query(que, function (err, result) {
//     console.log("Result: " + JSON.stringify(result));
//   });
// });
//
// }
