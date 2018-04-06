const joi=require('joi');
const control=require('../controller');
const privateKey='mydriverkey';
const jwt=require('jsonwebtoken');
const exc= require('../excep').Message.type;
const privateotpkey='mydriverotpkey';
const jwtDec=require('jwt-decode');

module.exports = [
///////////////////////////GET BY ID////////////////////////////////////////////
{

               method: 'GET',
               path: '/driver',
               //insert validation here
             config:{
               handler: function(req,res){
                        console.log("TOKEN",req.headers.token);
                        try{
                          jwt.verify(req.headers.token,privateKey);
                        }catch(error){
                          throw exc.invalidToken;
                        }
                        return control.driver.getDriver(req.headers.token);
              },
              plugins:{
                          'hapi-swagger':{
                            payloadType:'form',
                            headers:'form'
                          }

                     },
              tags: ['api'],
              validate:{
                headers: joi.object({'token': joi.any().required()}).unknown()
              }
            }
},
/////////////////////////CREATE USER////////////////////////////////////////////
{
      method: 'POST',
      path: '/driver/signup',
      config: {
          handler: async function(req,res){
              return await control.driver.signup(req.payload);
          },
          plugins:{
                      'hapi-swagger':{
                        payloadType:'form',
                        headers:'form'
                      }

                 },
          tags: ['api'], // ADD THIS TAG
          validate: {

              payload:{
                first_name:joi.string().min(2).max(50).error(exc.invalidFirstName).required().description('First Name'),
                last_name:joi.string().min(2).max(50).error(exc.invalidLastName).required().description('Last Name'),
                email:joi.string().email().error(exc.invalidEmail).required().description('Email ID'),
                password:joi.string().min(5).max(10).error(exc.invalidPassword).required().description('Password Max Length:10 Min Length:5'),
                phone:joi.string().required().error(exc.invalidPhoneNumber).required().description('Phone')

                   //created_at:joi.string().required().error(new Error('Invalid Date')).required().description('Created at date'),
                   //modified_at:joi.string().required().error(new Error('Invalid Date')).required().description('Modified at date'),
                   //otp_is_verified:joi.string().required().error(new Error('Invalid OTP')).required().description('OTP')

                 }


             }


          }

  },

////////////////////////UPDATE USER/////////////////////////////////////////////

  {
               method: 'PUT',
               path: '/driver/update',
               handler: function(req,res){
                       try{

                         jwt.verify(req.headers.token,privateKey);
                       }catch(error){
                         throw exc.invalidToken;
                       }

                      return control.driver.putUser(req);
                        //return("Details updated");
            },
            config:{
              plugins:{
                          'hapi-swagger':{
                            payloadType:'form',
                            headers:'form'
                          }

                     },
              tags: ['api'],
              validate:{
                 payload:{
                   first_name:joi.string().min(2).max(50).error(exc.invalidFirstName).required().description('First Name'),
                   last_name:joi.string().min(2).max(50).error(exc.invalidLastName).required().description('Last Name'),
                   email:joi.string().email().error(exc.invalidEmail).required().description('Email ID'),
                   password:joi.string().min(5).max(10).error(exc.invalidPassword).required().description('Password Max Length:10 Min Length:5')


                 },
                headers:
                        joi.object({'token': joi.any().required()}).unknown()

              }

            }

  },

///////////////////////////////////////////////////////////////////////////////

  {
               method: 'POST',
               path: '/driver/login',
               handler: function(req,res){
                    console.log(`login called`);
                    return  control.driver.login(req.payload);

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
             path: '/driver/verifyOTP',
             handler: function(req,res){
                  console.log(`verify OTP called`);

                  try{
                    console.log('routes verify otp');

                    jwt.verify(req.payload.token,privateotpkey);
                    //console.log('after verify');

                  }catch(error){
                    throw exc.invalidToken;
                  }

                  return  control.driver.verifyOTP(req.payload);

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
                 token:joi.any().error(exc.invalidToken).required().description('OTP token'),
                 otp:joi.string().min(4).max(4).error(exc.invalidOTP).required().description('OTP')
              }
            }
          }

}

];
