

require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Order } = require("../db");

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, items, customer_email } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    // Save order details in the database
    const order = new Order({
      items,
      payment_status: "paid",
      transaction_id: paymentIntent.id,
      customer_email,
    });
    await order.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret, order });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Failed to create PaymentIntent" });
  }
};

module.exports = {
  createPaymentIntent,
};
