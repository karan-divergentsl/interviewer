"use client";

import React, { useEffect, useState } from "react";
import VoiceAnswerRecorder from "@/components/audio-record-features/VoiceAnswerRecorder";
import {getFirstQustion, nextQuestion} from "../api/getData"



function Interview() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
//   const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const firstQustion = getFirstQustion();
    setQuestion(firstQustion)
  },[])

  // Handler for submitting answer and moving to the next question
//   const handleNextQuestion = () => {
//     setAnswer(""); // Clear answer field
//     const nextIndex = questionIndex + 1;
//     if (nextIndex < questions.length) {
//       setQuestion(questions[nextIndex]);
//       setQuestionIndex(nextIndex);
//     } else {
//       setQuestion("Thank you for answering all questions!");
//     }
//   };

  const submitAudio = async (audioBlob: Blob) => {
    if (!audioBlob) return;

    // const formData = new FormData();
    // formData.append("audioFile", audioBlob, "answer.wav");

    // const response = await fetch("https://your-backend-url.com/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    console.log(audioBlob)
  };

  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-16">
            <div className="pb-12 text-center">
              <div className="text-center">
                <h2 className="text-2xl font-medium text-indigo-200 px-5 py-2.5 bg-[#0F1725] rounded-lg max-w-[700px] mx-auto mb-5">
                  Question. {question}
                </h2>
                <VoiceAnswerRecorder submitAudio={submitAudio} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Interview;
