
module.exports={
collection:()=>{
db.createCollection("history", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         properties: {
            booking_id: {
               bsonType: "int",
               description: "must be a string and is required"
            },
            driver_id: {
               bsonType: "int",
               description: "must be a string and is required"
            },
            user_id: {
               bsonType: "int",
               description: "must be a srting and is required"
            },
            created_at:{
              bsonType: "date",
              description: "must be a srting and is required"
            },
            modified_at: {
               bsonType: "date",
               description: "must be a string and is required"
            }
         }
      }
   },
   validationLevel:'off',
   validationAction:'error'
});
console.log('History Collection created');
}
}
