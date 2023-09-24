import {AuthProvider} from './Providers'
import './globals.css'

export const metadata = {
    title: 'List Loom',
    description: 'A todo app'
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    )
}
