import { useEffect, useRef, useState } from 'react';
import VideoContainer, { VideoContainerRef } from './VideoContainer';

const MediaRecorderContainer = () => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<VideoContainerRef | null>(null);

  const [constraints, setConstraints] = useState<MediaStreamConstraints>({
    audio: false,
    video: true,
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isPermitted, setIsPermitted] = useState(false);

  const [recordedVideoUrl, setRecordedVideoUrl] = useState('');

  const handleRecordingStart = () => {
    mediaRecorder.current?.start(1000);
    console.log(mediaRecorder.current?.state);
    setIsRecording(true);
  };

  const handleRecordingStop = () => {
    mediaRecorder.current?.stop();
    console.log(mediaRecorder.current?.state);
    setIsRecording(false);
  };

  useEffect(() => {
    let chunks: Blob[] = [];

    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setIsPermitted(true);

      videoRef.current?.play(stream);

      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.addEventListener('dataavailable', (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      });

      mediaRecorder.current.addEventListener('stop', () => {
        const blob = new Blob(chunks, {
          type: 'video/webm',
        });
        chunks = [];
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
      });
    })();
  }, [constraints]);

  return (
    <div>
      <VideoContainer ref={videoRef} isPermitted={isPermitted} />
      {isRecording ? (
        <button onClick={handleRecordingStop}>녹화 중지</button>
      ) : (
        <button onClick={handleRecordingStart}>녹화 시작</button>
      )}
    </div>
  );
};

export default MediaRecorderContainer;
