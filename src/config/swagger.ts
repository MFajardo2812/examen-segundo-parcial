import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users Microservice API",
      version: "1.0.0",
      description: "API para gestión de usuarios médicos (pacientes y doctores)",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);
export { swaggerUi };
