import { useEffect, useRef, useState } from 'react';
import useMediaRecorder from './hooks/useMediaRecorder';
import './App.css';
import PreviewVideo, { PreviewVideoRef } from './components/PreviewVideo';

type Video = {
  title: string;
  url: string;
};

function App() {
  const previewVideoRef = useRef<PreviewVideoRef>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const { previewStream, isRecording, recordingStart, recordingStop } =
    useMediaRecorder({
      onRecordingStop: (url) => {
        setVideos((prev) =>
          prev.concat({
            title: new Date().toISOString(),
            url,
          })
        );
      },
    });

  useEffect(() => {
    if (previewStream) {
      previewVideoRef.current?.play();
    }
  }, [previewStream]);

  return (
    <div>
      <h1>hello</h1>
      <PreviewVideo ref={previewVideoRef} stream={previewStream} />
      {isRecording ? (
        <button onClick={recordingStop}>녹화 중지</button>
      ) : (
        <button onClick={recordingStart}>녹화 시작</button>
      )}
      <ul>
        {videos.map((video) => (
          <li key={video.title}>
            <span>{video.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
