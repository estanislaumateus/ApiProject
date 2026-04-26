const prisma = require("./config/prisma");

async function main() {
const user = await prisma.user.upsert({
  where: { email: "test@test.com" },
  update: {},
  create: {
    email: "test@test.com",
    apiKey: "123456",
    credits: 100
  }
});

  console.log("User criado:", user);
}

main()
  .catch(console.error)
  .finally(() => process.exit());