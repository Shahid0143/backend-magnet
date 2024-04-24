
const express = require("express");
const stripeRoutes = require("./routes/stripeRoutes");
const { connection } = require('./db');
require("dotenv").config()
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/stripe", stripeRoutes);

app.get('/',((req,res)=>{
  res.send("HELLO WORLD")
}))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connection
    .then(() => {
      console.log("Connected to MongoDB database")
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB:", error)
    });
});