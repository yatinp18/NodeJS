const model=require('./model');
module.exports=function start_con(){
        const MongoClient = require('mongodb').MongoClient;
        //const assert = require('assert');

      // Connection URL
        const url = 'mongodb://localhost:27017';

      // Database Name
        const dbName = 'myproject2';

      // Use connect method to connect to the server
        MongoClient.connect(url,function(err, db) {

        if(err)throw err;
        //const dbo = db.db(dbname);
        const dbo=db.db(dbName);
        global.db=dbo;
        //model.creatColl(dbo);
        model.history.collection();
        //assert.equal(null, err);
        console.log("Database started");

        // db.close();
      });
}
