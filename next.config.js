/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/(.*)",
                headers: [
                    // Allow for specific domains to have access or * for all
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    // Allows for specific methods accepted
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE",
                    },
                ],
            }
        ]
    },
    env: {
        MONGODB_URI: 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.kcdmkz2.mongodb.net/todo?retryWrites=true&w=majority',
        BASE_URL: "http://localhost:3000",
        NEXTAUTH_SECRET: 'todosecrets',
        NEXTAUTH_URL: 'http://localhost:3000'
    }
}

module.exports = nextConfig
