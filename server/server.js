const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const Razorpay = require("razorpay");
const Inventory = require("./models/Inventory");
const inventoryRoutes = require("./routes/inventoryRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);

// Razorpay instance
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// payment route
app.post("/api/payment/create", async (req, res) => {
  try {
    const { base, sauce, cheese, veggies } = req.body;

    let amount = 0;

    // pricing logic
    if (base) amount += 100;
    if (sauce) amount += 50;
    if (cheese) amount += 80;
    if (veggies) amount += veggies.length * 30;

    const options = {
      amount: amount * 100, // in paise
      currency: "INR"
    };

    const order = await instance.orders.create(options);
    res.json(order);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 INVENTORY SEED FUNCTION
async function seedInventory() {
  const count = await Inventory.countDocuments();
  if (count > 0) return;

  await Inventory.insertMany([
    { name: "Thin", type: "base", quantity: 50 },
    { name: "Thick", type: "base", quantity: 50 },
    { name: "Tomato", type: "sauce", quantity: 50 },
    { name: "BBQ", type: "sauce", quantity: 50 },
    { name: "Mozzarella", type: "cheese", quantity: 50 },
    { name: "Cheddar", type: "cheese", quantity: 50 },
    { name: "Onion", type: "veggie", quantity: 50 },
    { name: "Capsicum", type: "veggie", quantity: 50 },
    { name: "Olives", type: "veggie", quantity: 50 }
  ]);

  console.log("Inventory seeded");
}

// 🔥 CONNECT DB + THEN SEED
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await seedInventory(); // ✅ correct place

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });

  })
  .catch(err => console.log(err));