// app/api/processAudio/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    // Read the audio data from the request body
    const audioBlob = await request.blob();
    
    // Process the audioBlob here if necessary
    // For example, you might send it to another service for processing or analysis

    // Simulate a response with some information
    const responseData = {
        allQuestion: [
            { question: "What is you town ?"},
            { question: "What is you profession ?"},
            { question: "What is you nickname ?"},
            { question: "What is you favorite color ?"},
        ],
        length: audioBlob.size,
        timestamp: new Date().toISOString(),
    };

    return NextResponse.json(responseData);
}
