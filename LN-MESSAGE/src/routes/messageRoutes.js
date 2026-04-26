const express = require("express");
const router = express.Router();

const apiKey = require("../middleware/apiKey");
const {
  sendMessage,
  getUserMessages,
  getStats
} = require("../controllers/messageController");

router.post("/send", apiKey, sendMessage);

router.get("/", apiKey, getUserMessages);

router.get("/stats", apiKey, getStats);

module.exports = router;