const d=require('../connection.js');
const model=require('../model');
const ObjectID=require('mongodb').ObjectID;
const er=require('../excep');
const exc= require('../excep').Message.type;
const jwtDec=require('jwt-decode');
const privateKey='myuserkey';
//const ObjectID=require('mongodb').ObjectID;

module.exports={

//////////////////////////////BOOK TICKET///////////////////////////////////////


         book:async function(data,result){
         try{

         console.log('Running Booking Entry');
         console.log("Received data",data.payload);

         const decoded_token=jwtDec(data.headers.token);
         console.log('decoded id',decoded_token.id);

        //const t=ObjectID(data.id);

         const myobj ={user_id:decoded_token.id,booking_status:'pending',created_at:new Date() };

         console.log('given object');
         console.log(myobj);



         ///INSERT INTO THE BOOKING TABLE

         let que=`INSERT INTO booking SET ?`;

         let inserted_data= await  new Promise(function(resolve,reject){

              con.query(que,myobj,function(err,rows,fields){
                     if(err){
                       throw err;
                     }
                     resolve(rows);
              });
         });

         console.log(`inserted data`,inserted_data.insertId);
         //return(inserted_data);

         //INSERT INTO THE ADDRESS TABLE
         let que2=`INSERT INTO address SET ?`;
         console.log('TYPEOF',typeof inserted_data.insertId);
         const myobj2={booking_id:inserted_data.insertId,pick_from:data.payload.pick_from,drop_to:data.payload.drop_to};

         console.log(myobj2);

         let inserted_data2= await  new Promise(function(resolve,reject){

              con.query(que2,myobj2,function(err,rows,fields){
                     if(err){
                       throw err;
                     }
                     resolve(rows);
              });
         });

         const created=new Date();

         await db.collection('history').insert({booking_id:inserted_data.insertId,user_id:decoded_token.id,created_at:created});

         return{status: er.MessageSuccess.type1.status,message:er.MessageSuccess.type1.message,data:myobj2};
        // console.log("1 job inserted");

       }catch(error){
                  throw(error);
             }
       }
       ,
/////////////////////////GET JOB BY OBJECT ID///////////////////////////////////


       getBookingByID:async (data)=>{
                try{
                console.log('Running get job');
                console.log('token',data.headers.token);



                const decoded_token=jwtDec(data.headers.token,privateKey);

                //console.log('myid',myid);

                //return(decoded_token.id);

                //SQL QUERY

                let fetched_data= await  new Promise(function(resolve,reject){
                     con.query('SELECT * from booking WHERE user_id=?',decoded_token.id,function(err,rows,fields){
                            if(err){
                              throw err;
                            }
                            resolve(rows);
                     });
                });


               return({status: er.MessageSuccess.type1,data:fetched_data});






            //    return retreived_data;

              }catch(error){
                throw error;
              }
       },


///////////////////////////REMOVE JOB///////////////////////////////////////////


       cancelBooking:
           async function(data){
           try{
               console.log('Running cancel Booking');
               //console.log(data);

               const decoded_token=jwtDec(data.headers.token,privateKey);
               //console.log('a',a);
               //const mytoken={token:a};


               let updated_data= await  new Promise(function(resolve,reject){
                    con.query('UPDATE booking SET booking_status="cancelled" WHERE booking_id=?',[data.payload.booking_id],function(err,rows,fields){
                           if(err){
                             throw err;
                           }
                           resolve(rows);
                    });
               });

  const created=new Date();
  await db.collection('history').insert({booking_id:data.payload.booking_id,user_id:decoded_token.id,created_at:created});


               return({status: er.MessageSuccess.type1.status,message: er.MessageSuccess.type1.message,data:decoded_token});
           }catch(error){
                 throw(error);
           }
       }



}
