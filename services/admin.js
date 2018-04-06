const d=require('../connection.js');
const exc= require('../excep').Message.type;
//const model=require('../model');
//const ObjectID=require('mongodb').ObjectID;
const fs=require('fs');
const er=require('../excep');
const jwt=require('jsonwebtoken');
const jwtDec=require('jwt-decode');
const bcrypt=require('bcrypt');
const saltRounds=10;
const randomatic=require('randomatic');
const privateKey='myadminkey';
const privateotpkey='myotpkey';
const msg91=require('msg91-sms');

//global.otp='';

module.exports={
////////////////////////////////////////////////////////////////////////////////

         createTwoAdmins:async function(data){
             try{

               let check_query=`SELECT * from admin`;

               let obtained_data= await new Promise(function(resolve,reject){

                    con.query(check_query,function(err,rows,fields){
                           if(err){
                             throw err;
                           }
                           resolve(rows);
                    });
               });

              if(obtained_data[0]){
                return "Two admins exist already";
              }





             console.log('Entered data',data);
             console.log('Running signup');


             let first_admin={

              first_name:"yatin",
              last_name:"pandey",
              email:"yatin.pandey@jungleworks.co",
              password:"yatin",
              phone:"8958176148",
              created_at:new Date()

             };


             let second_admin={

              first_name:"admin",
              last_name:"admin",
              email:"admin@jungleworks.co",
              password:"tiger",
              phone:"7007091901",
              created_at:new Date()

             };

             //mydata.password=bcrypt.hashSync();
             const hash=bcrypt.hashSync(first_admin.password,saltRounds);
             first_admin.password=hash;

             const hash2=bcrypt.hashSync(second_admin.password,saltRounds);
             second_admin.password=hash2;


             //console.log('received admin data=',first_admin);

             //console.log("Connected inserted first admin!");

             let que=`INSERT INTO admin SET ?`;

             let inserted_data1= await new Promise(function(resolve,reject){

                  con.query(que,first_admin,function(err,rows,fields){
                         if(err){
                           throw err;
                         }
                         resolve(rows);
                  });
             });


             let inserted_data2= await new Promise(function(resolve,reject){

                  con.query(que,second_admin,function(err,rows,fields){
                         if(err){
                           throw err;
                         }
                         resolve(rows);
                  });
             });

            console.log('admins created succesfully');
            //return('Inserted Values Succesfully');


          }catch(error){
              // console.log(error);
               throw error;
          }
       },



//////////////////////////GET ALL USERS/////////////////////////////////////////



       getAllUsers:async (data)=>{
                try{
                 console.log('Running get all users');
                 console.log("Token="+data.payload.headers);


                 let fetched_data= await  new Promise(function(resolve,reject){
                      con.query('SELECT * from customer LIMIT ? OFFSET ?',[data.payload.limit,data.payload.offset],function(err,rows,fields){
                             if(err){
                               throw err;
                             }
                             resolve(rows);
                      });
                 });


                return({status: er.MessageSuccess.type1,data:fetched_data});
                //return a;
              }catch(error){
                   console.log(error);
                   return(exc.type.fetchExit);
              }

       },


///////////////////////////////LOGIN////////////////////////////////////////////

 login:async(data)=>{

          console.log("running login");
          console.log("DATAAA",data.email);
          console.log("Pass",data.password);
  try{



         let fetched_data= await  new Promise(function(resolve,reject){
                  con.query('SELECT password,admin_id from admin WHERE email=?',data.email,function(err,rows,fields){
                         if(err){
                           throw err;
                         }
                         resolve(rows);
                  });
             });

            console.log('Obtained password from db',fetched_data[0].password);
            console.log('Entered password',data.password);

             if(!bcrypt.compareSync(data.password,fetched_data[0].password) ){
                throw exc.invalidPassword;
             }


                   console.log("pehle");
                   const token=jwt.sign({id:fetched_data[0].id},privateKey);
                   console.log(token);

                   //return token;

                   return({status:er.MessageSuccess.type1,data:{email:data.email,id:fetched_data[0].id,token:token}});

   }catch(error){


    throw(error);

   }

 },
 //////////////////////////GET ALL USERS/////////////////////////////////////////



        getAllDrivers:async(data)=>{
                 try{
                  console.log('Running get all drivers');
                  console.log("Token="+data.headers);


                  let fetched_data= await new Promise(function(resolve,reject){
                       con.query('SELECT * from driver LIMIT ? OFFSET ?',[data.payload.limit,data.payload.offset],function(err,rows,fields){
                              if(err){
                                throw err;
                              }
                              resolve(rows);
                       });
                  });


                 return({status: er.MessageSuccess.type1,data:fetched_data});
                 //return a;
               }catch(error){
                    console.log(error);
                    return(exc.type.fetchExit);
               }

        },

//////////////////////////GET ALL BOOKINGS/////////////////////////////////////////



               getAllBookings:async(data)=>{
                        try{
                         console.log('Running get all drivers');
                         console.log("Token="+data.payload.headers);


                         let fetched_data= await new Promise(function(resolve,reject){
                              con.query('select booking.booking_id,customer.first_name as USERNAME,customer.email as USER_MAIL,address.pick_from,address.drop_to,driver.first_name as ASSIGNED_DRIVER,driver.phone as DRIVER_PHONE,booking.booking_status,booking.created_at from address JOIN booking ON address.booking_id=booking.booking_id JOIN driver ON booking.driver_id=driver.driver_id JOIN customer on customer.id=booking.user_id LIMIT ? OFFSET ?',[data.payload.limit,data.payload.offset],function(err,rows,fields){
                                     if(err){
                                       throw err;
                                     }
                                     resolve(rows);
                              });
                         });


                        return({status: er.MessageSuccess.type1,data:fetched_data});
                        //return a;
                      }catch(error){
                           console.log(error);
                           return(exc.type.fetchExit);
                      }

               },

////////////////////////////////////////////////////////////////////////////////
getPrettyBookings:async(data)=>{
         try{
          console.log('Running get all drivers');
          console.log("Token="+data.payload.headers);


          let fetched_data= await new Promise(function(resolve,reject){
               con.query('select booking.booking_id,customer.first_name as USERNAME,customer.email as USER_MAIL,address.pick_from,address.drop_to,driver.first_name as ASSIGNED_DRIVER,driver.phone as DRIVER_PHONE,booking.booking_status,booking.created_at from address JOIN booking ON address.booking_id=booking.booking_id JOIN driver ON booking.driver_id=driver.driver_id JOIN customer on customer.id=booking.user_id LIMIT ? OFFSET ?',[data.payload.limit,data.payload.offset],function(err,rows,fields){
                      if(err){
                        throw err;
                      }
                      resolve(rows);
               });
          });


         return({status: er.MessageSuccess.type1,data:fetched_data});
         //return a;
       }catch(error){
            console.log(error);
            return(exc.type.fetchExit);
       }

},

////////////////////////////////////////////////////////////////////////////////
assignDriversToBookings:async (data)=>{
         try{
          console.log('Assigning drivers to bookings');
          console.log("Token="+data.payload.headers);


          let fetched_data= await  new Promise(function(resolve,reject){
               con.query('UPDATE booking SET driver_id=? WHERE booking_id=?',[data.payload.driver_id,data.payload.booking_id],function(err,rows,fields){
                      if(err){
                        throw err;
                      }
                      resolve(rows);
               });
          });

         const values_to_return={driver_id:data.payload.driver_id,booking_id:data.payload.booking_id};

         return({status: er.MessageSuccess.type3,data:values_to_return});
         //return a;
       }catch(error){
            console.log(error);
            return(exc.type.fetchExit);
       }

},

////////////////////////////////////////////////////////////////////////////////


               getAllBookingsAndDrivers:async(data)=>{
                        try{
                         console.log('Running get all drivers and bookings');
                         console.log("Token="+data.headers.token);


                         let fetched_data= await new Promise(function(resolve,reject){
                              con.query('SELECT * FROM booking RIGHT JOIN driver ON booking.driver_id=driver.driver_id LIMIT ? OFFSET ?',[data.payload.limit,data.payload.offset],function(err,rows,fields){
                                     if(err){
                                       throw err;
                                     }
                                     resolve(rows);
                              });
                         });


                        return({status: er.MessageSuccess.type1,data:fetched_data});
                        //return a;
                      }catch(error){
                           console.log(error);
                           return(exc.type.fetchExit);
                      }

               },








}
