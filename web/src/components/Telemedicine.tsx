import React, { useRef, useState } from 'react';

const Telemedicine = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [cameraActive, setCameraActive] = useState(false);
	const [micActive, setMicActive] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const startCameraAndMic = async () => {
		setError(null);
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			if (videoRef.current) videoRef.current.srcObject = stream;
			setCameraActive(true);
			setMicActive(true);
		} catch (err) {
			setError('Camera or microphone access denied or unavailable.');
		}
	};

	return (
		<div className="container">
			<h2>Telemedicine Video Call</h2>
			<button onClick={startCameraAndMic} disabled={cameraActive && micActive}>
				{cameraActive && micActive ? 'Camera & Microphone Enabled' : 'Enable Camera & Microphone'}
			</button>
			<video ref={videoRef} autoPlay playsInline style={{ width: 320, marginTop: 16, borderRadius: 8, background: '#000' }} />
			{error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
			<p style={{ marginTop: 16 }}>
				This is a local video preview. For real telemedicine, integrate with a signaling server (WebRTC, Jitsi, etc.) for peer-to-peer video calls.
			</p>
		</div>
	);
};

export default Telemedicine;
