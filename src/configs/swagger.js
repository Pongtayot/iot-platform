const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Iot Platform manager",
      version: "v1",
      description: "A Iot manager",
      termsOfService: "https://github.com/Pongtayot",
      contact: {
        name: "Pongtayot",
        url: "https://github.com/Pongtayot",
        email: "pongtayot101@gmail.com",
      },
      license: {
        name: "Use under MIT",
        url: "https://github.com/Pongtayot",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/controllers/*.js"], // files containing annotations as above
};

module.exports = swaggerJsdoc(options);
