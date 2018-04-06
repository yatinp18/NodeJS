const serv=require('../services');
module.exports={

//////////////////////////////BOOK TICKET//////////////////////////////////////

book:

       async function(req,res){
         try{
           //console.log('console in control',req.payload);
         return await serv.booking.book(req,res);
         }
     catch(error){
       throw(error);
     }
   }
,

////////////////////GET JOB BY ID//////////////////////////////////////////////

getBookingByID:

  async function(id){
    try{
    return await serv.booking.getBookingByID(id);
    }
  catch(error){
      console.log(error);
    }
  }
,

cancelBooking:

       async function(req,res){
         try{
           console.log(`remove job in control`);
           //console.log('console in control',req.payload);
          return await serv.booking.cancelBooking(req,res);
         }
     catch(error){
       throw(error);
     }
   }
   ,
   update:

          async function(req,res){
            try{
              //console.log('console in control',req.payload);
            return await serv.job.update(req,res);
            }
        catch(error){
          throw(error);
        }
      }



};
