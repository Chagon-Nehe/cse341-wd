import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts'
  },
    host: 'localhost:8080',
    schemes: ['http', 'https'],
    definitions: {
        swagger: '2.0.',
    }
};

const outputFile = './swagger.json';
const routes = ['./api/routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ ignore: ['./swagger.json'] })(outputFile, routes, doc);


export default doc;