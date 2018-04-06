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
const privateKey='myuserkey';
const privateotpkey='myotpkey';
const msg91=require('msg91-sms');

//global.otp='';

module.exports={
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////CHECK DUPLICATE EMAIL//////////////////////////


checkDuplicateEmail:function(email,res){

      return new Promise(function(resolve,reject){
           con.query('SELECT * from customer WHERE email=?',email,function(err,rows,fields){
                  if(err){
                    throw err;
                  }
                  resolve(rows);
           });
      });

  },


///////////////////////////////CHECK DUPLICATE PHONE////////////////////////////

  checkDuplicatePhone:function (phone,res){

        return new Promise(function(resolve,reject){
             con.query('SELECT * from customer WHERE phone=?',phone,function(err,rows,fields){
                    if(err){
                      throw err;
                    }
                    resolve(rows);
             });
        });

    },

//////////////////////////CREATE NEW USER///////////////////////////////////////

         signup:async function(data){
             try{

             console.log('Entered data',data);
             console.log('Running signup');


             let mydata={

              first_name:data.first_name,
              last_name:data.last_name,
              email:data.email,
              password:data.password,
              phone:data.phone,
              created_at:new Date()

             };



             //mydata.password=bcrypt.hashSync();
             const hash=bcrypt.hashSync(mydata.password,saltRounds);
             mydata.password=hash;

             console.log('received data=',mydata);

             console.log("Connected insert!");



             /////////////SMS GATEWAY////////////////////



             //Authentication Key
             const authkey='205938A5N9KBFIsK05ab8b3c6';


             //for single number
             const number=data.phone;

             //message
             const otp=randomatic('0','4');
             const message=otp;
             console.log('OTP :  '+message);

             //Sender ID
             const senderid='Yatins';

             //Route
             //const route='https://control.msg91.com/user/index.php#send_sms';
             const route='https://control.msg91.com/user/index.php#send_sms';

             //Country dial code
             const dialcode='+91';

             msg91.sendOne(authkey,number,message,senderid,route,dialcode,function(response){


             //Returns Message ID, If Sent Successfully or the appropriate Error Message
             console.log(response);

             });


             ////////////////////////////Gateway ends///////////////////////////


             let que=`INSERT INTO customer SET ?`;

             let inserted_data= await  new Promise(function(resolve,reject){

                  con.query(que,mydata,function(err,rows,fields){
                         if(err){
                           throw err;
                         }
                         resolve(rows);
                  });
             });

             console.log('1 value inserted= ',inserted_data.insertId);







             const token=jwt.sign({id:inserted_data.insertId,otp:message},privateotpkey);

             let data_with_token={user_data:mydata,otp_token:token};


              return{status: er.MessageSuccess.type1.status,message:er.MessageSuccess.type1.message,data:data_with_token};
            //return('Inserted Values Succesfully');
          }catch(error){
              // console.log(error);
               throw error;
          }
       },



//////////////////////////GET USER CREDENTIALS//////////////////////////////////



       getUser:async (data)=>{
                try{
                 console.log('Running get user');
                 console.log("Token="+data);


                 let fetched_data= await  new Promise(function(resolve,reject){
                      con.query('SELECT * from customer WHERE id=?',data,function(err,rows,fields){
                             if(err){
                               throw err;
                             }
                             resolve(rows);
                      });
                 });


                return({status: er.MessageSuccess.type1,data:fetched_data[0]});
                //return a;
              }catch(error){
                   console.log(error);
                   return(exc.type.fetchExit);
              }

       },

//////////////////////////////GET ALL///////////////////////////////////////////

/////////////////////////////UPDATE USER////////////////////////////////////////



       putUser:async function(data){
           try{
               console.log('Running putuser');
               console.log(data.payload);
               let modifiedDate=new Date();
               console.log(modifiedDate);

               const hash=bcrypt.hashSync(data.payload.password,saltRounds);
               data.payload.password=hash;
               //console.log("data pass",data);
               const t=jwtDec(data.headers.token);
               console.log("data",t.id);

               //const a=await db.collection('user').update({_id:ObjectID(t.id)},{$set:data.payload});
               //console.log(a);
                let b={
                  email:data.payload.email,
                  first_name:data.payload.first_name,
                  last_name:data.payload.last_name

                };


                let updated_data= await  new Promise(function(resolve,reject){
                     con.query('UPDATE customer SET email=?,first_name=?,last_name=?,modified_at=?,password=? WHERE id=?',[data.payload.email,data.payload.first_name,data.payload.last_name,modifiedDate,hash,t.id],function(err,rows,fields){
                            if(err){
                              throw err;
                            }
                            resolve(rows);
                     });
                });
     // //return "DONE";
               return({status: er.MessageSuccess.type1.status,message: er.MessageSuccess.type1.message,data:b});
               //console.log("1 document updated");

           }catch(error){
                 throw exc.invalidCredentials;
                 //return(exc.type.)
           }
     },
///////////////////////////////LOGIN////////////////////////////////////////////
 login:async(data)=>{

          console.log("running login");
  try{

         let fetched_data= await  new Promise(function(resolve,reject){
                  con.query('SELECT password,id from customer WHERE email=?',data.email,function(err,rows,fields){
                         if(err){
                           throw err;
                         }
                         resolve(rows);
                  });
             });

            console.log('Obtained password from db',fetched_data[0].password);
            console.log('Entered password',data.password);

             if( !bcrypt.compareSync(data.password,fetched_data[0].password) ){
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
 ///////////////////////////////////////////////////////////////////////////////
 getIdFromToken:async (data)=>{
          try{
          console.log('Running get id from token');
          console.log("Token",data);
          const t=jwtDec(data);
          if(t){
            return t.id;
          }else{
            throw exc.userNotFound;
          }
        }catch(error){
             throw(error);
        }

  }
,
 ////////////////////////////////////////////////////////////////////////////////
 getIdOtpFromToken:async (data)=>{
          try{
          console.log('Running get ID and OTP from token');
          console.log("Token",data);
          const t=jwtDec(data);
          console.log("id decoded from token",t.id);
          console.log("OTP from token",t.otp);

          if(t){
            return t;
          }else{
            throw exc.userNotFound;
          }
        }catch(error){
             throw(error);
        }

  },
////////////////////////////////////////////////////////////////////////////////
verifyOTP: async function(req_otp,id_otp){

              try{


              if(req_otp===id_otp.otp){
                console.log('OTP VERIFIED!!!');
              }else{
                throw exc.invalidOTP;
              }

              const updated_table_cursor= new Promise(function(resolve,reject){
    //UPDATE customer SET email=?,first_name=?,last_name=?,modified_at=?,password=? WHERE id=?',[data.payload.email,data.payload.first_name,data.payload.last_name,modifiedDate,hash,t.id],function(err,rows,fields)
                   con.query('UPDATE customer SET is_verified=? WHERE id=?',[true,id_otp.id],function(err,rows,fields){
                          if(err){
                            throw err;
                          }
                          resolve(rows);
                   });
              });

            //return(updated_table_cursor);
            return({status:er.MessageSuccess.type2});


        }catch(error){
             throw error;
        }
    },
/////////////////////////////////IS ALREADY VERIFIED////////////////////////////

isAlreadyVerified:async function(id){
          try{

            const is_verified=await new Promise(function(resolve,reject){
                 con.query('SELECT is_verified from customer WHERE id=?',id,function(err,rows,fields){
                        if(err){
                          throw err;
                        }
                        resolve(rows);
                 });
            });

          console.log(' CHANGED is_verified '+is_verified[0]);

            return(is_verified[0]);


          }catch(err){
              throw err;
          }

},
isAlreadyVerifiedByMail:async function(email){
          try{
            console.log('running already verified by mail');

            const is_verified= await new Promise(function(resolve,reject){
                 con.query('SELECT is_verified from customer WHERE email=?',email,function(err,rows,fields){
                        if(err){
                          return  reject(err);
                        }
                        return resolve(rows);
                 });
            });
            console.log(is_verified);

            return(is_verified[0]);


          }catch(err){
              throw err;
          }

}


}
