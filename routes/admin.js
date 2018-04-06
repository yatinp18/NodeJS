const joi=require('joi');
const control=require('../controller');
const privateKey='myadminkey';
const jwt=require('jsonwebtoken');
const exc= require('../excep').Message.type;
const privateotpkey='myotpkey';
const jwtDec=require('jwt-decode');

module.exports = [
///////////////////////////GET BY ID////////////////////////////////////////////
{

               method: 'POST',
               path: '/admin/getAllUsers',
               //insert validation here
             config:{

               handler: function(req,res){
                        console.log("TOKEN",req.headers.token);
                        try{
                          jwt.verify(req.headers.token,privateKey);
                        }catch(error){
                          throw exc.invalidToken;
                        }
                        return control.admin.getAllUsers(req);
              },
              plugins:{
                          'hapi-swagger':{
                            payloadType:'form',
                            headers:'form'
                          }

                     },
              tags: ['api'],
              validate:{
                payload:{
                  limit:joi.number().required().description('LIMIT'),
                  offset:joi.number().required().description('OFFSET')
                },
                headers: joi.object({'token': joi.any().required()}).unknown()
              }
            }
},
////////////////////////////////////////////////////////////////////////////////


{

               method: 'POST',
               path: '/admin/getAllUsersAndDrivers',
               //insert validation here
             config:{

               handler: function(req,res){
                        console.log("TOKEN",req.headers.token);
                        try{
                          jwt.verify(req.headers.token,privateKey);
                        }catch(error){
                          throw exc.invalidToken;
                        }
                        return control.admin.getAllBookingsAndDrivers(req);
              },
              plugins:{
                          'hapi-swagger':{
                            payloadType:'form',
                            headers:'form'
                          }

                     },
              tags: ['api'],
              validate:{
                payload:{
                  limit:joi.number().required().description('LIMIT'),
                  offset:joi.number().required().description('OFFSET')
                },
                headers: joi.object({'token': joi.any().required()}).unknown()
              }
            }
},








///////////////////////////GET BY ID////////////////////////////////////////////
{

               method: 'POST',
               path: '/admin/getAllDrivers',
               //insert validation here
             config:{

               handler: function(req,res){
                        console.log("TOKEN",req.headers.token);
                        try{
                          jwt.verify(req.headers.token,privateKey);
                        }catch(error){
                          throw exc.invalidToken;
                        }
                        return control.admin.getAllDrivers(req);
              },
              plugins:{
                          'hapi-swagger':{
                            payloadType:'form',
                            headers:'form'
                          }

                     },
              tags: ['api'],
              validate:{
                payload:{
                  limit:joi.number().required().description('LIMIT'),
                  offset:joi.number().required().description('OFFSET')
                },
                headers: joi.object({'token': joi.any().required()}).unknown()
              }
            }
},

///////////////////////////GET BY ID////////////////////////////////////////////
{

               method: 'POST',
               path: '/admin/getAllBookings',
               //insert validation here
             config:{

               handler: function(req,res){
                        console.log("TOKEN",req.headers.token);
                        try{
                          jwt.verify(req.headers.token,privateKey);
                        }catch(error){
                          throw exc.invalidToken;
                        }
                        return control.admin.getAllBookings(req);
              },
              plugins:{
                          'hapi-swagger':{
                            payloadType:'form',
                            headers:'form'
                          }

                     },
              tags: ['api'],
              validate:{
                payload:{
                  limit:joi.number().required().description('LIMIT'),
                  offset:joi.number().required().description('OFFSET')
                },
                headers: joi.object({'token': joi.any().required()}).unknown()
              }
            }
},

////////////////////////////////////////////////////////////////////////////////
{

               method: 'POST',
               path: '/admin/getAllPrettyBookings',
               //insert validation here
             config:{

               handler: function(req,res){
                        console.log("TOKEN",req.headers.token);
                        try{
                          jwt.verify(req.headers.token,privateKey);
                        }catch(error){
                          throw exc.invalidToken;
                        }
                        return control.admin.getPrettyBookings(req);
              },
              plugins:{
                          'hapi-swagger':{
                            payloadType:'form',
                            headers:'form'
                          }

                     },
              tags: ['api'],
              validate:{
                payload:{
                  limit:joi.number().required().description('LIMIT'),
                  offset:joi.number().required().description('OFFSET')
                },
                headers: joi.object({'token': joi.any().required()}).unknown()
              }
            }
},




///////////////////////////////////////////////////////////////////////////////

  {
               method: 'POST',
               path: '/admin/login',
               handler: function(req,res){
                    console.log(`login called`);
                    return  control.admin.login(req.payload);

            },
            config:{
              tags:['api'],
              plugins:{
                'hapi-swagger':{
                  payloadType:'form-data',
                  //headers:'form'
                }

              },
              validate:{
                payload:{
                   //token:joi.any().error(exc.invalidToken).required().description('OTP token'),
                   email:joi.string().email().error(exc.invalidEmail).required().description('Email ID'),
                   password:joi.string().required().error(exc.invalidPassword).required().description('Password')
                }
              }
            }

  },
////////////////////////////////////////////////////////////////////////////////

{

               method: 'POST',
               path: '/admin/assignDriversToBookings',
               //insert validation here
             config:{

               handler: function(req,res){
                        console.log("TOKEN",req.headers.token);
                        try{
                          jwt.verify(req.headers.token,privateKey);
                        }catch(error){
                          throw exc.invalidToken;
                        }
                        return control.admin.assignDriversToBookings(req);
              },
              plugins:{
                          'hapi-swagger':{
                            payloadType:'form',
                            headers:'form'
                          }

                     },
              tags: ['api'],
              validate:{
                payload:{
                  booking_id:joi.number().required().description('Enter Booking_ID'),
                  driver_id:joi.number().required().description('Enter Driver_ID')
                },
                headers: joi.object({'token': joi.any().required()}).unknown()
              }
            }
},













////////////////////////////////////////////////////////////////////////////////

];
