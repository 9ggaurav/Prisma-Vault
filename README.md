# Prisma Vault

# Prisma Vault

**Prisma Vault** is a lightweight, stripped-down version of a cloud storage platform inspired by Google Drive. Built with Node.js, Express, PostgreSQL, and Prisma ORM, it currently supports user authentication, session management, and file uploads.

> ⚠️ This project is still under active development. Features like file management, access control, and sharing are in progress.

---

## 🚀 Features (Current)

- 🔐 User authentication (signup & login)
- 📦 Session-based access control
- ⬆️ File upload support
- 📁 File metadata stored in PostgreSQL via Prisma

---

## 🧠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: Sessions with cookies
- **File Handling**: Multer (or relevant library you're using)
- **Frontend**: *(Optional — mention EJS, React, etc. if applicable)*

---

## 📂 Folder Structure

```bash
prisma-vault/
├── config/             # config for Passportjs and db
├── controllers/        # Controller Login
├── prisma/             # Prisma schema and migrations
├── routes/             # Auth and file routes
├── services/           # prisma queries
├── utils/              # passportjs Authentication and other extra features
├── views/              # Templating (EJS)
├── public/             # Static assets (CSS, JS)
├── app.js              # Main Express app
├── .env                # Environment variables
└── README.md

