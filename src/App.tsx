import { useEffect, useRef, useState } from 'react';
import useMediaRecorder from './hooks/useMediaRecorder';
import './App.css';
import PreviewVideo, { PreviewVideoRef } from './components/PreviewVideo';
import VideoCard, { Video } from './components/VideoCard';
import { Button, Grid, Stack } from '@mui/material';

function App() {
  const previewVideoRef = useRef<PreviewVideoRef>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [playingVideo, setPlayingVideo] = useState('');
  const {
    previewStream,
    isPermitted,
    isRecording,
    recordingStart,
    recordingStop,
  } = useMediaRecorder({
    onRecordingStop: (url) => {
      setVideos((prev) =>
        prev.concat({
          title: new Date().toISOString(),
          url,
        })
      );
    },
  });

  const isPlaying = playingVideo !== '';

  const handleVideoPlayClick = (url: string) => {
    setPlayingVideo(url);
  };

  const handleVideoDeleteClick = (url: string) => {
    setVideos((prev) => prev.filter((video) => video.url !== url));
  };

  useEffect(() => {
    if (isPermitted && previewStream) {
      previewVideoRef.current?.play();
    }
  }, [previewStream, isPermitted]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: '100vh',
      }}
    >
      <Grid
        item
        xs={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {isPlaying ? (
          <video src={playingVideo} autoPlay controls />
        ) : (
          <PreviewVideo ref={previewVideoRef} stream={previewStream} />
        )}
        {isRecording ? (
          <Button variant='contained' color='error' onClick={recordingStop}>
            녹화 중지
          </Button>
        ) : (
          <Button variant='contained' onClick={recordingStart}>
            녹화 시작
          </Button>
        )}
      </Grid>
      <Grid item xs={4}>
        <Stack
          spacing={2}
          sx={{
            backgroundColor: '#eee',
            height: '100%',
            padding: '2rem',
          }}
        >
          {videos.map((video) => (
            <li key={video.title}>
              <VideoCard
                video={video}
                onPlayClick={() => handleVideoPlayClick(video.url)}
                onDeleteClick={() => handleVideoDeleteClick(video.url)}
              />
            </li>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default App;
