const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const Category = require("./routes/category");
const Product = require("./routes/products");

app.use("/api", Category);
app.use("/api", Product);

module.exports = app;
