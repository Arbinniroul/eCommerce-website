const express = require("express");

const {

  getAllOrdersofAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus
} = require("../../controllers/admin/orderController");

const router = express.Router();

router.get("/get", getAllOrdersofAllUsers);
router.get("/details /:userId", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

module.exports = router;