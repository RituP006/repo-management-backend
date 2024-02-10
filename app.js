const express = require("express");
const cors = require("cors");

const { getData } = require("./middleware/repo");
const { notFound, errorHandler } = require("./middleware/error");

const PORT = 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/data", getData);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log("Server is running"));
