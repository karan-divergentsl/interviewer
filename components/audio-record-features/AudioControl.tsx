// src/components/AudioControl.tsx
import { useState, useEffect, useRef } from 'react';
import { useMediaRecorder } from './hooks/useAudioRecorder';
import AudioVisualizer from './AudioVisualizer';
import { FiMic, FiSquare, FiPlay, FiPause, FiTrash2 } from 'react-icons/fi';
import { Card, CardContent, Typography, IconButton, Modal, Box, Button } from '@mui/material';

const AudioControl: React.FC = () => {
  const {
    mediaUrl,
    startRecording,
    stopRecording,
    deleteRecording,
    recordingState,
    analyser,
  } = useMediaRecorder();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    if (mediaUrl) {
      const audioElement = new Audio(mediaUrl);
      audioElement.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current = audioElement;
      return () => {
        audioElement.pause();
        audioElement.removeEventListener('ended', () => setIsPlaying(false));
        audioElement.src = '';
      };
    }
  }, [mediaUrl]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (audio) {
      if (!isPlaying) {
        audio.play().then(() => setIsPlaying(true)).catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleDeleteConfirm = () => {
    deleteRecording();
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setShowModal(false);
  };

  return (
    <div className="p-2.5">
      <Card role="region" aria-labelledby="audioControlHeading" sx={{ maxWidth: '100%', mx: 'auto', boxShadow: 3 }}>
      <CardContent>
        <Typography
          id="audioControlHeading"
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'text.primary' }}
        >
          Press the microphone to begin recording
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2}>
          {recordingState === 'idle' && (
            <IconButton
              id="start-recording"
              color="primary"
              onClick={startRecording}
              aria-label="Start recording"
              sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
            >
              <FiMic />
            </IconButton>
          )}
          {recordingState === 'recording' && (
            <IconButton
              id="stop-recording"
              color="error"
              onClick={stopRecording}
              aria-label="Stop recording"
              sx={{ backgroundColor: 'error.main', color: 'white', '&:hover': { backgroundColor: 'error.dark' } }}
            >
              <FiSquare />
            </IconButton>
          )}
          {mediaUrl && (
            <>
              <IconButton
                id="play-audio"
                color={isPlaying ? 'error' : 'primary'}
                onClick={togglePlayback}
                aria-label={isPlaying ? 'Pause playback' : 'Play recording'}
                sx={{
                  backgroundColor: isPlaying ? 'error.main' : 'primary.main',
                  color: 'white',
                  '&:hover': { backgroundColor: isPlaying ? 'error.dark' : 'primary.dark' },
                }}
              >
                {isPlaying ? <FiPause /> : <FiPlay />}
              </IconButton>
              <IconButton
                id="delete-audio"
                color="default"
                onClick={() => setShowModal(true)}
                aria-label="Delete recording"
                sx={{ backgroundColor: 'grey.500', color: 'white', '&:hover': { backgroundColor: 'grey.700' } }}
              >
                <FiTrash2 />
              </IconButton>
            </>
          )}
          {recordingState === 'recording' && analyser && (
            <AudioVisualizer analyser={analyser} isPlaying={false} mediaUrl={null} />
          )}
        </Box>
        {mediaUrl && (
          <Box mt={2} textAlign="center">
            <AudioVisualizer mediaUrl={mediaUrl} isPlaying={isPlaying} />
          </Box>
        )}
      </CardContent>

      {/* Delete Confirmation Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="deleteConfirmation"
        aria-describedby="deleteConfirmationDescription"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            width: 300,
          }}
        >
          <Typography id="deleteConfirmation" variant="h6" align="center">
            Delete Recording
          </Typography>
          <Typography id="deleteConfirmationDescription" align="center" sx={{ mt: 2 }}>
            Are you sure you want to delete this recording?
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mt={4}>
            <Button variant="outlined" color="primary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
    </div>
  );
};

export default AudioControl;
