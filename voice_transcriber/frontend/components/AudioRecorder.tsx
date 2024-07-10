"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [transcription, setTranscription] = useState('');
  const [isBrowser, setIsBrowser] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    // Check if running in the browser and if getUserMedia is supported
    setIsBrowser(typeof window !== 'undefined' && typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia);
  }, []);

  const startRecording = async () => {
    if (!isBrowser) {
      alert('Your browser does not support audio recording.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event:any) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        sendAudio(audioBlob);
        audioChunks.current = [];
      };
      mediaRecorder.current.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing getUserMedia:', error);
      alert('Failed to start recording. Please check your microphone permissions.');
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  const sendAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
    // const response = await axios.get('https://77.237.241.186:9443/');
    // console.log(response);
    
    const response = await axios.post('https://77.237.241.186:9443/transcribe', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response)
    setTranscription(response.data.transcription);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Voice Transcriber</h1>
      {isBrowser ? (
        <>
          <button
            onClick={recording ? stopRecording : startRecording}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {recording ? 'Stop Recording' : 'Start Recording'}
          </button>
          {audioURL && <audio src={audioURL} controls className="mt-4"></audio>}
          {transcription && <p className="mt-4 bg-gray-100 p-2 rounded">{transcription}</p>}
        </>
      ) : (
        <p>Your browser does not support audio recording.</p>
      )}
    </div>
  );
};

export default AudioRecorder;
