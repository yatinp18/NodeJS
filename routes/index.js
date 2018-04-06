const user=require('./user.js');
const booking=require('./booking.js');
const driver=require('./driver.js');
const admin=require('./admin.js');
let route=[];
const routes=route.concat(user,booking,driver,admin);
module.exports=routes;
