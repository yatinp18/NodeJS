const Hapi=require('hapi');
//const connect_db=require('./connection');
const Inert=require('inert');
//const server=new hapi.Server();
const routes = require('./routes');
const admin_services=require('./services');
const start_mongodb=require('./mongocon')


const options={
  info:{
    title:"cab_booking",
    version:"0.1"
  }
};

const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Joi=require('joi');
//const Pack = require('./package');

(async () => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 8080,
    });

    const swaggerOptions = {
        info: {
                title: 'Cab Booking Portal',
                //version: Pack.version,
            },
        };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    try{
        await server.start();
        console.log('Server running at:', server.info.uri);
        const con=require('./connection').con;
        start_mongodb();



    }catch(err){
        console.log(err);
        throw err;
      }

     await admin_services.admin.createTwoAdmins();

      server.route(routes);
      //server.route(routes.job);

})();
