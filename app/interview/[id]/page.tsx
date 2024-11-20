"use client";

import React, { useEffect, useState } from "react";
import VoiceAnswerRecorder from "@/components/audio-record-features/VoiceAnswerRecorder";
import { useParams  } from 'next/navigation';
import { CircularProgress } from "@mui/material";
import axios from "axios";

// interface Data {
//   id: number;
//   question: string;
//   completed: boolean;
// }

function Interview() {
  const params = useParams();
  const id  = params?.id; 
  // const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  // const [answer, setAnswer] = useState("");


    useEffect(() => {
      if (id) {
        fetchFirstData(id);
      }
    }, [id]);

    const fetchFirstData = async () => {
      try{
        setLoading(true);
        const response = await fetch('/api/getFirstData');
        const data = await response.json();
        setQuestion(data.question);
      }
      catch(err){
        console.log("Api error",err)
      }
      finally{
        setLoading(false);
      }
    };
  
    if (loading) {
      return(
        <div className="h-72 x-full flex justify-center items-center">
          <CircularProgress />
        </div>
      );
    }

  const submitAnswer = async (audioBlob: Blob) => {
    if (!audioBlob) return;
    const formData = new FormData();
    formData.append("audio_file", audioBlob, "recording.mp3");
    console.log("step 1")
    // try{
      const response = await axios.post("http://173.208.138.26:8000/transcribe",formData).then((data) =>{
        // var result = data;
        console.log("audio",data);
      },
      (error) => {
          console.log(error);
      })
      // if (response.ok) {
      //   const result = await response.json();
      //   console.log(result)
      //   // setData(result.allQuestion)
      // } else {
      //     console.error("Failed to send audio to backend");
      // }
      // } 
      // catch (error) {
      //     console.error("Error sending audio:", error);
      // }
      // finally{

      // }
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
                <VoiceAnswerRecorder submitAnswer={submitAnswer} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Interview;
