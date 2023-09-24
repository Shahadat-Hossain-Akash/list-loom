/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI:'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.kcdmkz2.mongodb.net/todo?retryWrites=true&w=majority',
        BASE_URL:"http://localhost:3000",
        NEXTAUTH_SECRET: 'todosecrets',
        NEXTAUTH_URL: 'http://localhost:3000'
    }
}

module.exports = nextConfig
