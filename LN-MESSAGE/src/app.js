require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// CORS (frontend pode acessar a API)
app.use(cors());

// JSON parser
app.use(express.json());

// routes
const messageRoutes = require("./routes/messageRoutes");
app.use("/messages", messageRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`API rodando na porta ${process.env.PORT}`);
});