const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getAllOrders, updateStatus } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);

router.get("/all", getAllOrders);
router.put("/update/:id", updateStatus);

module.exports = router;