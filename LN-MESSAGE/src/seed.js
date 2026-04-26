const prisma = require("./config/prisma");

async function main() {
  const msg = await prisma.message.create({
    data: {
      to: "+244900000000",
      message: "Teste inicial",
      status: "sent"
    }
  });

  console.log(msg);
}

main()
  .catch(console.error)
  .finally(() => process.exit());