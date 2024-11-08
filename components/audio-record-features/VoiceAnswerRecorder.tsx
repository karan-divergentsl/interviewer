import { useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import WaveAnimation from "../ui/waveAnimation";

interface VoiceAnswerRecorderProps {
  submitAudio: (audioData: any) => void;
}

export default function VoiceAnswerRecorder({
  submitAudio,
}: VoiceAnswerRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [currentState, setCurrentState] = useState("Start");
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Start recording
  const startRecording = async () => {
    setCurrentState("Recording");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
      const audioBlobData = new Blob(audioChunks.current, {
        type: "audio/wav",
      });
      setAudioBlob(audioBlobData); // Store Blob for backend
      setAudioUrl(URL.createObjectURL(audioBlobData)); // For audio playback
    };

    mediaRecorder.current.start();
    setIsRecording(true);
    setIsPaused(false);
  };

  // Pause recording
  const pauseRecording = () => {
    setCurrentState("Paused");
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.pause();
      setIsPaused(true);
    }
  };

  // Resume recording
  const resumeRecording = () => {
    setCurrentState("Recording");
    if (mediaRecorder.current && mediaRecorder.current.state === "paused") {
      mediaRecorder.current.resume();
      setIsPaused(false);
    }
  };

  // Stop recording
  const stopRecording = () => {
    setCurrentState("Start");
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  console.log("WaveAnimation");

  return (
    <div className="text-center">
      <h2 className="text-lg text-indigo-200 mb-4">Record your answer here</h2>
      {audioUrl ? (
        <audio
          controls
          src={audioUrl}
          className="w-full max-w-[400px] mx-auto mb-4"
        />
      ) : (
        <div className="flex justify-center align-middle h-100">
          <svg
            id="wave"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 38.05"
          >
            <title>Audio Wave</title>
            <path
              id="Line_1"
              data-name="Line 1"
              d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"
            />
            <path
              id="Line_2"
              data-name="Line 2"
              d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"
            />
            <path
              id="Line_3"
              data-name="Line 3"
              d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"
            />
            <path
              id="Line_4"
              data-name="Line 4"
              d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"
            />
            <path
              id="Line_5"
              data-name="Line 5"
              d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"
            />
            <path
              id="Line_6"
              data-name="Line 6"
              d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"
            />
            <path
              id="Line_7"
              data-name="Line 7"
              d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"
            />
            <path
              id="Line_8"
              data-name="Line 8"
              d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"
            />
            <path
              id="Line_9"
              data-name="Line 9"
              d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z"
            />
          </svg>
        </div>
      )}
      <div className="flex justify-center gap-4 mt-4">
        {!isRecording && (
          <button
            onClick={startRecording}
            className="w-14 h-14 text-xl font-bold bg-gradient-to-b from-pink-start to-pink-end rounded-full text-white border-none cursor-pointer m-1.5"
          >
            <FaMicrophone className="m-auto" />
          </button>
        )}
        {isRecording && !isPaused && (
          <button
            onClick={pauseRecording}
            className="w-14 h-14 text-xl font-bold bg-gradient-to-b from-yellow-start to-yellow-end rounded-full text-white border-none cursor-pointer m-1.5"
          >
            <FaPlay className="m-auto" />
          </button>
        )}
        {isRecording && isPaused && (
          <button
            onClick={resumeRecording}
            className="w-14 h-14 text-xl font-bold bg-gradient-to-b from-yellow-start to-yellow-end rounded-full text-white border-none cursor-pointer m-1.5"
          >
            <FaPause className="m-auto" />
          </button>
        )}
        {isRecording && (
          <button
            onClick={stopRecording}
            className="w-14 h-14 text-xl font-bold bg-gradient-to-b from-blue-start to-blue-end rounded-full text-white border-none cursor-pointer m-1.5"
          >
            <FaStop className="m-auto" />
          </button>
        )}
      </div>
      <div className="my-3">
        <h1>{currentState}</h1>
      </div>
      <div className="mt-6">
        <button
          onClick={() => {
            submitAudio(audioBlob);
            setAudioUrl("");
          }}
          className="btn bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
