const mongoose = require("mongoose");
require("dotenv").config();
// Connect to MongoDB database
 const connection = mongoose.connect(process.env.MONGODB_URL);

// Create a schema for the Order model
const orderSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  payment_status: { type: String, required: true },
  transaction_id: { type: String, required: true },
  customer_email: { type: String, required: true },
});

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order,
  connection
};
