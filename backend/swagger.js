// backend/swagger.js
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Real-Time Food Delivery API",
    description: "API documentation for your food delivery app",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"]; 

swaggerAutogen(outputFile, endpointsFiles, doc);
