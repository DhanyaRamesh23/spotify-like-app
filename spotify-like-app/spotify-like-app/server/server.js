// Loading environment varaibles
require("dotenv").config();

// Express
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/public", express.static("public"));

// Database

//Router
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

app.use("/", routes);
