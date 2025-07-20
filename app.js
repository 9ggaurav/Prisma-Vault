// getting environment varibles form .evn
require("dotenv").config();

// require("./config/passport")

// Importing necessary packages
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
// const { pool } = require("./config/pool");
const flash = require("connect-flash");

// Importing routes
const publicRouter = require("./routes/publicRouter");
const authRouter = require("./routes/authRouter");
const privateRouter = require("./routes/privateRouter");

// Required Environment Variables
const PORT = process.env.PORT || 3000;
// const SESSION_SECRET = process.env.SESSION_SECRET;

// initializing Express app
const app = express();

// configuring ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares -------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));


app.use("/", publicRouter);
app.use("/auth", authRouter);
app.use("/user", privateRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(400).send(err);
})

app.listen(PORT, () => {
    console.log(`Express server on port ${PORT}`);
})




// const { PrismaClient } = require("./generated/prisma");
// const prisma = new PrismaClient();

// async function main() {
//   // Create a user
//   const user = await prisma.user.create({
//     data: {
//       name: 'Alice',
//       email: 'alice@drive.io',
//       password: 'hashedpassword', // Normally this would be hashed
//     },
//   });

//   // Create root folder for user
//   const rootFolder = await prisma.storage.create({
//     data: {
//       name: 'My Drive',
//       type: 'folder',
//       userId: user.id,
//     },
//   });

//   // Create a subfolder inside root
//   const appsFolder = await prisma.storage.create({
//     data: {
//       name: 'Apps',
//       type: 'folder',
//       userId: user.id,
//       parentId: rootFolder.id,
//     },
//   });

//   // Create a file inside the Apps folder
//   const file = await prisma.storage.create({
//     data: {
//       name: 'resume.pdf',
//       type: 'file',
//       file_url: 'uploads/alice/resume.pdf',
//       userId: user.id,
//       parentId: appsFolder.id,
//     },
//   });

//   // Fetch and display everything
//   const fullTree = await prisma.user.findUnique({
//     where: { id: user.id },
//     include: {
//       storage: {
//         include: {
//           children: {
//             include: {
//               children: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   console.dir(fullTree, { depth: null });
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
