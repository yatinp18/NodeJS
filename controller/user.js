const serv=require('../services');
const jwtDec=require('jwt-decode');
const exc= require('../excep').Message.type;
const privateotpkey='myotpkey';


module.exports={


///////////////////////////////SIGNUP///////////////////////////////////////////

    signup:
     async function(payload){

       try{
       console.log('running control signup');


       let data=await serv.user.checkDuplicateEmail(payload.email);
       if(data.length!=0){
         throw exc.emailExit;
       }


       let data1=await serv.user.checkDuplicatePhone(payload.phone);
       if(data1.length!=0){
         throw exc.phoneExit;
       }


       return await serv.user.signup(payload);


     }catch(error){
       throw(error);
       }
     }
    ,

////////////////////////////////GET USER///////////////////////////////////////

    getUser:

      async function(token){
        //const object=await serv.user.login();
        try{

        //console.log("text ");
        console.log("running get user");

        const id_details=await serv.user.getIdFromToken(token);
        //console.log("id_details",id_details);
        return await serv.user.getUser(id_details);
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

          const id_otp=await serv.user.getIdOtpFromToken(req.token);
          const is_verified=await serv.user.isAlreadyVerified(id_otp.id);
          //console.log("is verified in control",is_verified.is_verified);

          if(is_verified.is_verified){
            throw exc.OTPAlreadyVerfied;
          }

          return await serv.user.verifyOTP(req.otp,id_otp);
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
                       if(!serv.user.isAlreadyVerified(t.id)){
                             throw exc.customerNotVerified;
                       }
                  }catch(error){
                    throw error;
                  }

               return await serv.user.putUser(req);
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

        const is_verified=await serv.user.isAlreadyVerifiedByMail(payload.email);

        //console.log('isver',is_verified);

        //console.log("is verified at control",is_verified[0].is_verified);

        if(!is_verified.is_verified){
              throw exc.customerNotVerified;
        }

        let emailCheck=await serv.user.checkDuplicateEmail(payload.email);

        if(emailCheck.length=0){
          throw exc.noEmailExit;
        }

           return await serv.user.login(payload);



     }catch(error){
         throw(error);
      }
    }

};
