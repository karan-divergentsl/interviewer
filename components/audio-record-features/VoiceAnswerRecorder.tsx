import { useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { WaveAnimationStart, WaveAnimationStop} from "@/components/ui/WaveAnimation";

interface VoiceAnswerRecorderProps {
  submitAudio: (audioData: any) => void;
  handleNextQuestion: () => void;
}

export default function VoiceAnswerRecorder({
  submitAudio,
  handleNextQuestion,
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
    setCurrentState("Record again");
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-lg text-indigo-200 mb-4">Record your answer here</h2>
      {audioUrl && !isRecording && (
        <audio
          controls
          controlsList="nodownload"
          src={audioUrl}
          className="w-full max-w-[400px] mx-auto mb-4"
        />
      )}
      {isRecording && !isPaused && (
        <div className="flex justify-center align-middle h-100">
          <WaveAnimationStart />
        </div>
      )}
      {isRecording && isPaused && 
      <div className="flex justify-center align-middle h-100">
          <WaveAnimationStop />
        </div>
      }
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
            setCurrentState("Start")
            setAudioUrl("");
          }}
          disabled={!audioUrl || isRecording}
          className="btn bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
        >
          Submit
        </button>
        <button
        onClick={() => {
          handleNextQuestion()
        }}
        className="ms-5 btn bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
