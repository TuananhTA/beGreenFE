// ./src/app/test/page.js
'use client'; // Bật chế độ client cho component

import { useSearchParams } from 'next/navigation';

export default function Home() {
    const searchParams = useSearchParams();
    const allParams = Object.fromEntries(searchParams.entries());

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Toàn bộ parameter từ URL</h1>
            <pre>{JSON.stringify(allParams, null, 2)}</pre>
        </div>
    );
}
