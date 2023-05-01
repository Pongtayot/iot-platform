const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const port = process.env.PORT || 8085;
const env = process.env.NODE_ENV || "development";

const app = express();

if (env !== "production" && env !== "staging") {
  const swaggerUi = require("swagger-ui-express");
  const swaggerDocument = require("./src/configs/swagger");
  app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(cors());

app.use(express.json());

app.use(require("./src/routes/routes"));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  console.log(`ENV on : ${env}`);
  console.log("Press Ctrl + C to quit.");
});
