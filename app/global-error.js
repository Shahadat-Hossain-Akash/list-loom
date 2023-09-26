'use client'

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ fontFamily: 'acid', fontSize: '2rem' }}>Something went wrong!</p>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    )
}