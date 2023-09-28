'use client'
import React from 'react'
import { HashLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <HashLoader color="#3979FF" />
        </div>
    )
}
