import { Router } from "express";
import { Paystack } from "paystack-api";
import Order from "../models/Order.js"; // Adjust the path as needed
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

// Existing order creation route
router.post("/", async (req, res) => {
  try {
    const { items, total, paymentMethod, userId } = req.body;

    const order = new Order({
      user: userId,
      items,
      total,
      paymentMethod,
      status: "pending",
    });

    await order.save();

    let paymentUrl;
    if (paymentMethod === "paypal") {
      // Your existing PayPal logic here
      // paymentUrl = ...
    } else if (paymentMethod === "paystack") {
      const response = await paystack.transaction.initialize({
        amount: order.total * 100, // Amount in kobo
        email: req.user.email, // Assuming you have user info in the request
        reference: `order_${order._id}_${Date.now()}`,
        callback_url: `${process.env.CLIENT_URL}/order-confirmation/${order._id}`,
      });
      paymentUrl = response.data.authorization_url;
    } else {
      throw new Error("Invalid payment method");
    }

    res.json({ orderId: order._id, paymentUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// New route to handle Paystack webhook
router.post("/paystack-webhook", async (req, res) => {
  try {
    const event = req.body;
    if (event.event === "charge.success") {
      const reference = event.data.reference;
      const orderId = reference.split("_")[1];

      const order = await Order.findById(orderId);
      if (order) {
        order.status = "paid";
        await order.save();
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Paystack webhook error:", error);
    res.sendStatus(500);
  }
});

// New route for admin to mark order as delivered
router.put("/:orderId/deliver", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.status !== "paid") {
      return res.status(400).json({ error: "Order is not paid yet" });
    }
    order.status = "delivered";
    await order.save();
    res.json({ message: "Order marked as delivered", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
