import React from 'react';


import { useRef, useState } from 'react';

const AIAgent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert('Camera access denied or unavailable.');
    }
  };

  // Start microphone
  const startMic = async () => {
    setMicError(null);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicActive(true);
    } catch (err) {
      setMicError('Microphone access denied or unavailable.');
    }
  };

  return (
    <div>
      <h2>Omnichannel AI Agent</h2>
      <p>Chat, voice, and patient portal coming soon. (Integrate with Whisper, ElevenLabs, Azure TTS, Twilio, WhatsApp, etc.)</p>
      <div style={{ margin: '1rem 0' }}>
        <button onClick={startCamera}>Enable Camera</button>
        <video ref={videoRef} autoPlay style={{ width: 240, display: 'block', marginTop: 8 }} />
      </div>
      <div style={{ margin: '1rem 0' }}>
        <button onClick={startMic}>Enable Microphone</button>
        {micActive && <span style={{ color: 'green', marginLeft: 8 }}>Microphone active</span>}
        {micError && <span style={{ color: 'red', marginLeft: 8 }}>{micError}</span>}
      </div>
    </div>
  );
};

export default AIAgent;
