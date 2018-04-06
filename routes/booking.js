//const controller = require('./controller');
const joi=require('joi');
const control=require('../controller');
const privateKey='myuserkey';
const exc= require('../excep').Message.type;
const jwt=require('jsonwebtoken');
//const validation=require('./validation');
module.exports = [
///////////////////////GET JOB BY ID////////////////////////////////////////////

    {
     method: 'GET',
     path: '/booking/getbooking',
     config:{
     handler: async function(req,res){
               try{
                 jwt.verify(req.headers.token,privateKey);
               }catch(error){
                 return exc.invalidToken;
               }
              return await control.booking.getBookingByID(req);
            },
            plugins:{
                        'hapi-swagger':{
                          headers:'form'
                        }

                    },
            tags: ['api'],
            validate:{
              headers:joi.object({'token': joi.any().required()}).unknown()
            }



       }
    },


/////////////////////////CREATE JOB/////////////////////////////////////////////

  {
   method: 'POST',
   path:'/booking/book',

     config:{
       handler:async(request,result)=>{

         try{
           jwt.verify(request.headers.token,privateKey);

         }catch(error){
           throw exc.invalidToken;
         }
         //console.log(control);
         //console.log('received',request.payload);
         return control.booking.book(request,result);
         //return('Inserted Values Succesfully');
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
                   pick_from:joi.string().error(exc.invalidLocation).required().description('Pickup Location'),
                   drop_to:joi.string().error(exc.invalidLocation).required().description('Drop Location')
                 },

       headers:joi.object({'token': joi.any().required()}).unknown()
     }
   }

},

/////////////////////////////REMOVE JOB/////////////////////////////////////////


{
 method: 'POST',
 path: '/booking/cancel',
 config:{
 handler:
          function(req,res){
            try{
              jwt.verify(req.headers.token,privateKey);
            }catch(error){
              return exc.invalidToken;
            }
          return control.booking.cancelBooking(req);
          //return("Job removed");
          }
          ,
          plugins:{
                      'hapi-swagger':{
                        payloadType:'form',
                        headers:'form'
                      }

                 },
          tags: ['api'],

          validate:{
             payload:{
                  booking_id:joi.string().min(1).max(2).required().error(exc.invalidBookingID).description('Booking Id to be cancelled')
             },
             headers:joi.object({'token': joi.any().required()}).unknown()
          }
       }

}




////////////////////////////////////////////////////////////////////////////////

];
