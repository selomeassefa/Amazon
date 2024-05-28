import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const __dirname = path.resolve();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.post("/payments/create", async (req, res) => {
  console.log("First");
  const total = parseInt(req.query.total);
  console.log("one");
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log("Two");
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(400).send("Invalid total amount");
  }
});

app.listen(5000, () => console.log("Server is running on port 5000"));
