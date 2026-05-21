const Order = require("../models/Order");
const Inventory = require("../models/Inventory");

// 🔥 CREATE ORDER (UPDATED WITH INVENTORY)
exports.createOrder = async (req, res) => {
  try {
    const { base, sauce, cheese, veggies } = req.body;

    // ✅ REDUCE STOCK
    await Inventory.findOneAndUpdate(
      { name: base },
      { $inc: { quantity: -1 } }
    );

    await Inventory.findOneAndUpdate(
      { name: sauce },
      { $inc: { quantity: -1 } }
    );

    await Inventory.findOneAndUpdate(
      { name: cheese },
      { $inc: { quantity: -1 } }
    );

    for (let veg of veggies) {
      await Inventory.findOneAndUpdate(
        { name: veg },
        { $inc: { quantity: -1 } }
      );
    }

    // ✅ CREATE ORDER
    const order = await Order.create({
      userId: req.user.id,
      base,
      sauce,
      cheese,
      veggies
    });

    // 🔥 CHECK LOW STOCK
    await checkLowStock();

    res.json(order);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔥 LOW STOCK ALERT FUNCTION
async function checkLowStock() {
  const items = await Inventory.find();

  items.forEach(item => {
    if (item.quantity < 49) {
      console.log(`⚠️ LOW STOCK ALERT: ${item.name} is below threshold`);
    }
  });
}

// GET USER ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE STATUS (ADMIN)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};