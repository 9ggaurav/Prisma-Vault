const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const getUserByEmail = async(email) => {
    return prisma.user.findUnique({
        where: { email }
    })
}

const insertNewUser = async(name, email, password) => {
    return prisma.user.create({
        data: {
            name,
            email,
            password,
        }
    })
}

module.exports = {
    getUserByEmail,
    insertNewUser
}