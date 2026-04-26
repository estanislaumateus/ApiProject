const prisma = require("../config/prisma");
const { sendSMS } = require("../services/twilioService");

//  enviar mensagem
exports.sendMessage = async (req, res) => {
  const { to, message } = req.body;
  const user = req.user;

  if (!to || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (user.credits <= 0) {
    return res.status(403).json({ error: "No credits left" });
  }

  try {
    const response = await sendSMS(to, message);

    const saved = await prisma.message.create({
      data: {
        to,
        message,
        status: "sent",
        userId: user.id
      }
    });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        credits: {
          decrement: 1
        }
      }
    });

    return res.json({
      success: true,
      messageId: saved.id,
      creditsLeft: updatedUser.credits,
      status: response?.status || "sent"
    });

  } catch (err) {
    return res.status(500).json({
      error: "Failed to send message",
      details: err.message
    });
  }
};

// mensagens do usuário (dashboard)
exports.getUserMessages = async (req, res) => {
  const user = req.user;

  const messages = await prisma.message.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  res.json(messages);
};

// stats gerais (dashboard)
exports.getStats = async (req, res) => {
  const user = req.user;

  const [total, sent, failed] = await Promise.all([
    prisma.message.count({ where: { userId: user.id } }),
    prisma.message.count({ where: { userId: user.id, status: "sent" } }),
    prisma.message.count({ where: { userId: user.id, status: "failed" } })
  ]);

  res.json({
    credits: user.credits,
    totalMessages: total,
    sent,
    failed
  });
};