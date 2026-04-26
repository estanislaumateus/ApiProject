const prisma = require("../config/prisma");

module.exports = async (req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key) {
    return res.status(401).json({ error: "Missing API key" });
  }

  const user = await prisma.user.findUnique({
    where: { apiKey: key }
  });

  if (!user) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  req.user = user;
  next();
};