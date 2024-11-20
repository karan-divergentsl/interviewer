// app/api/getNextData/route.js
import { NextResponse } from 'next/server';

const questions = [
    { question: "What is your town?" },
    { question: "What is your profession?" },
    { question: "What is your nickname?" },
    { question: "What is your favorite color?" },
];

export async function POST(request) {
    const formData = await request.formData();

    // Get the audio file and index from the formData
    const audioFile = formData.get("audioFile");
    const index = parseInt(formData.get("index"), 10) || 0;

    // Handle the audio file if needed (e.g., saving, processing)
    if (audioFile) {
        // Here you can process the audio file if necessary
        console.log("Received audio file:", audioFile);
    }

    // Check if the index is within the questions array
    if (index < questions.length) {
        // Return the current question and the next index
        const responseData = {
            question: questions[index],
            nextIndex: index + 1, // Increment index for the next question
        };
        return NextResponse.json(responseData);
    } else {
        // If all questions are completed, return a "thank you" message
        return NextResponse.json({ message: "Thank you for completing the questions!" });
    }
}
