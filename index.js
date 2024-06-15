import express from 'express';
import { connected } from './DB/db.js';
import { AuthRoutes } from './Routers/Auth.Routes.js';
import { bookRoutes } from './Routers/Book.Routes.js';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";


const app = express();

app.use(express.json());
app.use("/users",AuthRoutes);
app.use("/books",bookRoutes);

app.get('/',(req,res)=>{
    res.json({msg:"heyyy!"})
})


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
      title: 'Book Management API',
      description: 'API Documentation',
      version: '1.0.0',
      contact: {
          email: 'hksalaudeen@gmail.com'
      }
  },
  servers: [
    {
        url: 'http://localhost:8080',
        description: 'Local server'
    },
    {
        url: 'https://book-management-2.onrender.com/',
        description: 'Deployed server'
    }
],
  components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          }
      }
  },
  security: [{
      bearerAuth: []
  }]
};
if (process.env.NODE_ENV !== 'test') {
  const swaggerSpec = swaggerJsdoc({ swaggerDefinition, apis: ['./Routers/*.js'] });

  
  app.get('/swagger.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
  });

  
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}


app.listen(8080,async ()=>{
    try {
        console.log("server is connected");
        await connected;
        console.log('db is connected')
    } catch (error) {
        console.log(error);
    }
})