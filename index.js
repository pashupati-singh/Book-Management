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


// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Book Management Documantation",
//       version: "1.0.0",
//       description: "API Documentation",
//     },
//     servers: [
//       {
//         url: "http://localhost:8080",
//       },
//     ],
//   },
//   apis: ["./Routers/*.js"], 
// };

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
      // Add more server options if needed
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

  // Expose swagger.json
  app.get('/swagger.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
  });

  // Setup Swagger UI
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// const specs = swaggerJsdoc(options);

// app.use('/docs',swaggerUi.serve,swaggerUi.setup(specs))


app.listen(8080,async ()=>{
    try {
        console.log("server is connected");
        await connected;
        console.log('db is connected')
    } catch (error) {
        console.log(error);
    }
})