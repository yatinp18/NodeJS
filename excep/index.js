const Boom = require('boom');

module.exports = {


    Message: {
        type: {
            emailExit: Boom.conflict("Email Already exists"),
            noEmailExit: Boom.conflict("No user registered through this Email"),
            passwordEncryptFailed: Boom.expectationFailed("Password encryption failed."),
            invalidCredentials: Boom.unauthorized("Invalid Credentials"),
            userNotFound: Boom.notFound("User Not found"),
            invalidToken: Boom.conflict("Token is invalid"),
            OtpExpired: Boom.conflict("Sorry, your otp is expired"),
            cannotReset: Boom.conflict("Sorry your password cannot be reset now, try later"),
            unableTosendSms: Boom.conflict("Unable To Send Sms please retry"),
            wrongPhoneno: Boom.conflict("Phone Number provided was wrong"),
            contactAlreadyVerified: Boom.conflict("This contact is already verified"),
            fetchExit:Boom.expectationFailed("Could not get user details"),
            phoneExit:Boom.conflict("Contact Already exists"),
            invalidFirstName: Boom.conflict("First Name is invalid"),
            invalidLastName: Boom.conflict("Last Name  is invalid"),
            invalidEmail:Boom.conflict("Invalid Email"),
            invalidPassword: Boom.conflict("Invalid Password"),
            invalidPhoneNumber: Boom.conflict("Invalid Phone Number"),
            invalidOTP: Boom.conflict("Invalid OTP"),
            invalidLocation:Boom.conflict("Invalid Location"),
            invalidBookingID:Boom.conflict("Invalid Booking ID"),
            OTPAlreadyVerfied: Boom.conflict("OTP already verified"),
            customerNotVerified:Boom.conflict("Customer NOT Verified"),
            driverNotVerified:Boom.conflict("Driver NOT Verified"),
            errorDecodingToken:Boom.conflict("Error Decoding Token")


        }
   },
   MessageSuccess:{
     type1:{
       status:200,
       message:"SUCCESS"
     },
     type2:{
       status:200,
       message:"SUCCESS OTP VERIFIED"
     },
     type3:{
       status:200,
       message:"SUCCESS DRIVER ASSIGNED TO BOOKING"
     }
   }
}
