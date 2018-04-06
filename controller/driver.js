const serv=require('../services');
const jwtDec=require('jwt-decode');
const exc= require('../excep').Message.type;
const privateotpkey='mydriverotpkey';


module.exports={


///////////////////////////////SIGNUP///////////////////////////////////////////

    signup:
     async function(payload){

       try{

       console.log('running control signup');


       let data=await serv.driver.checkDuplicateEmail(payload.email);
       if(data.length!=0){
         throw exc.emailExit;
       }


       let data1=await serv.driver.checkDuplicatePhone(payload.phone);

       if(data1.length!=0){
         throw exc.phoneExit;
       }


       return await serv.driver.signup(payload);


     }catch(error){
       throw(error);
       }
     }
    ,

////////////////////////////////GET USER///////////////////////////////////////

    getDriver:

      async function(token){

        //const object=await serv.user.login();
        try{

        //console.log("text ");
        console.log("running get user");
        console.log('TOKEN in get driver'+token);
        const id_details=await serv.driver.getIdFromToken(token);
        //console.log("id_details",id_details);
        return await serv.driver.getDriver(id_details);
        //console.log("ID in con =",id_details);
      //  return await serv.user.getUser(token);

      }catch(error){
         //console.log(error);
          throw(error);
       }
      }
      ,

////////////////////////////////GET ALL/////////////////////////////////////////
verifyOTP:
     async function(req){
       try
       {

          const id_otp=await serv.driver.getIdOtpFromToken(req.token);
          //console.log(id_otp.id);

          const is_verified=await serv.driver.isAlreadyVerified(id_otp.id);

          //console.log('looooooook',is_verified[0].is_verified);

          if(is_verified[0].is_verified){

            throw exc.OTPAlreadyVerfied;
          }

          return await serv.driver.verifyOTP(req.otp,id_otp);
       }
 catch(error){
   throw(error);
   }
 }
,
/////////////////////////////UPDATE USER////////////////////////////////////////

     putUser:
          async function(req){
            try
            {

                  try
                  {
                       const t=jwtDec(req.headers.token);
                       if(!serv.driver.isAlreadyVerified(t.id)){
                             throw exc.customerNotVerified;
                       }
                  }catch(error){
                    throw error;
                  }

               return await serv.driver.putUser(req);
            }
      catch(error){
        throw(error);
        }
      }
    ,
/////////////////////////////LOGIN//////////////////////////////////////////////

     login:

      async function(payload){
      try{

        //const decoded_token=jwtDec(payload.token,privateotpkey);

        console.log('login control running');

        const is_verified=await serv.driver.isAlreadyVerifiedByMail(payload.email);

        //console.log("is verified at control",is_verified[0].is_verified);

        if(!is_verified.is_verified){
              throw exc.driverNotVerified;
        }

        let emailCheck=await serv.driver.checkDuplicateEmail(payload.email);

        if(emailCheck.length=0){
          throw exc.noEmailExit;
        }

           return await serv.driver.login(payload);



     }catch(error){
         throw(error);
      }
    }


////////////////////////////////////////////////////////////////////////////////

};
