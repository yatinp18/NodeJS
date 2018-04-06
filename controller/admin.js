const serv=require('../services');
const jwtDec=require('jwt-decode');
const exc= require('../excep').Message.type;
const privateotpkey='myotpkey';


module.exports={


////////////////////////////////GET USER///////////////////////////////////////

    getAllUsers:

      async function(req){

        try{

            console.log("running get user");

            const id_details=await serv.admin.getAllUsers(req);

            return await serv.admin.getAllUsers(req);

      }catch(error){
         //console.log(error);
          throw(error);
       }
      }
      ,

/////////////////////////////LOGIN//////////////////////////////////////////////

     login:

      async function(payload){
      try{
           return await serv.admin.login(payload);

     }catch(error){
         throw(error);
      }
    },


////////////////////////////////GET ALL DRIVERS///////////////////////////////////////

        getAllDrivers:

          async function(req){

            try{

                console.log("running get user");

                const id_details=await serv.admin.getAllDrivers(req);

                return await serv.admin.getAllDrivers(req);

          }catch(error){
             //console.log(error);
              throw(error);
           }
          }
          ,

////////////////////////////////GET ALL BOOKINGS///////////////////////////////////////

                  getAllBookings:

                    async function(req){

                      try{

                          console.log("running get user");

                          const id_details=await serv.admin.getAllBookings(req);

                          return await serv.admin.getAllBookings(req);

                    }catch(error){
                       //console.log(error);
                        throw(error);
                     }
                }
              ,
////////////////////////////////////////////////////////////////////////////////
getPrettyBookings:

  async function(req){

    try{

        console.log("running get user");

        const id_details=await serv.admin.getPrettyBookings(req);

        return await serv.admin.getPrettyBookings(req);

  }catch(error){
     //console.log(error);
      throw(error);
   }
}
,

////////////////////////////////////////////////////////////////////////////////
assignDriversToBookings:

  async function(req){

    try{

        console.log("running get user");

        const id_details=await serv.admin.assignDriversToBookings(req);

        return await serv.admin.assignDriversToBookings(req);

  }catch(error){
     //console.log(error);
      throw(error);
   }
},

////////////////////////////////////////////////////////////////////////////////

                  getAllBookingsAndDrivers:

                    async function(req){

                      try{

                          console.log("running get user");

                          const id_details=await serv.admin.getAllBookingsAndDrivers(req);

                          return await serv.admin.getAllBookingsAndDrivers(req);

                    }catch(error){
                       //console.log(error);
                        throw(error);
                     }
                }





};
