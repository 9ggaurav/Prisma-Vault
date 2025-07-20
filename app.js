const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@drive.io',
      password: 'hashedpassword', // Normally this would be hashed
    },
  });

  // Create root folder for user
  const rootFolder = await prisma.storage.create({
    data: {
      name: 'My Drive',
      type: 'folder',
      userId: user.id,
    },
  });

  // Create a subfolder inside root
  const appsFolder = await prisma.storage.create({
    data: {
      name: 'Apps',
      type: 'folder',
      userId: user.id,
      parentId: rootFolder.id,
    },
  });

  // Create a file inside the Apps folder
  const file = await prisma.storage.create({
    data: {
      name: 'resume.pdf',
      type: 'file',
      file_url: 'uploads/alice/resume.pdf',
      userId: user.id,
      parentId: appsFolder.id,
    },
  });

  // Fetch and display everything
  const fullTree = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      storage: {
        include: {
          children: {
            include: {
              children: true,
            },
          },
        },
      },
    },
  });

  console.dir(fullTree, { depth: null });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
