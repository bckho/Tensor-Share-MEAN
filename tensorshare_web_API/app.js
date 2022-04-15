const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const config = require("./utils/config.js");
const apiv1 = require("./routes/apiv1");
const auth = require("./routes/auth");

// Initialize express.js app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Index page
app.get("", (req, res) => {
  res.status(200).json({ response: "Tensor Share API V1.0" });
});

// CORS
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Swagger UI
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Middleware: logging for all requests
app.all("*", (req, res, next) => {
  console.log(`${new Date().toUTCString()} | ${req.hostname} | ${req.method} | ${req.url}`);
  next();
});

// ROUTES
app.use("/api/v1", apiv1);
app.use("/auth", auth);

// CONNECT TO DB
mongoose.connect(
  config.dbConnectionStringProd,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("MongoDB Connection Error!");
      console.log(err);
      process.exit(1);
    } else {
      console.log("Connected to DB!");
    }
  }
);

// ERROR HANDLER
// function errorHandler(err, req, res) {
//   console.log(err);
//   res.status(500).json(err);
// }

// app.use(errorHandler);

// RUN SERVER
const port = process.env.PORT || 6060;

const server = app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running on port ${server.address().port}`);
  }
});

module.exports = app;
