import { NextResponse } from 'next/server';

export async function GET(request) {
    const data = {
        question: 'What is you name ?',
    };

    return NextResponse.json(data);
}