require("dotenv").config();
const { MONGO_URI } = process.env;
const express = require("express");
const productRoutes = require("./routes");
const mongoose = require("mongoose");

const PORT = 5000;

const app = express();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);

module.exports = app;
