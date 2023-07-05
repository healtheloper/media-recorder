import { useEffect, useRef, useState } from 'react';
import useMediaRecorder from './hooks/useMediaRecorder';
import PreviewVideo, { PreviewVideoRef } from './components/PreviewVideo';
import { Button, Grid, Stack, Switch } from '@mui/material';
import VideoPlayer from './components/VideoPlayer';
import MediaCard from './components/MediaCard';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import video from './constants/video';

type MediaType = 'video' | 'audio';

type Media = {
  type: MediaType;
  title: string;
  url: string;
};

function App() {
  const previewVideoRef = useRef<PreviewVideoRef>(null);
  const [medias, setMedias] = useState<Media[]>([]);
  const [playingMedia, setPlayingMedia] = useState<Omit<Media, 'title'> | null>(
    null
  );
  const {
    previewStream,
    isPermitted,
    isRecording,
    recordingStart,
    recordingStop,
    changeConstraints,
  } = useMediaRecorder({
    onRecordingStart: () => {
      setPlayingMedia(null);
    },
    onRecordingStop: (type, url) => {
      setMedias((prev) =>
        prev.concat({
          type,
          title: new Date().toISOString(),
          url,
        })
      );
    },
  });

  const isPlaying = playingMedia !== null;

  const handleMediaPlayClick = (type: MediaType, url: string) => {
    setPlayingMedia({ type, url });
  };

  const handleMediaDeleteClick = (url: string) => {
    setMedias((prev) => prev.filter((media) => media.url !== url));
  };

  const handleVideoRecordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const videoConstraints = checked
      ? { width: video.WIDTH, height: video.HEIGHT }
      : false;
    changeConstraints({
      audio: true,
      video: videoConstraints,
    });
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
          playingMedia.type === 'video' ? (
            <VideoPlayer src={playingMedia.url} />
          ) : (
            <AudioPlayer src={playingMedia.url} />
          )
        ) : (
          <PreviewVideo ref={previewVideoRef} stream={previewStream} />
        )}
        <Stack direction='row' spacing={3}>
          {isRecording ? (
            <Button variant='contained' color='error' onClick={recordingStop}>
              녹화 중지
            </Button>
          ) : (
            <Button variant='contained' onClick={recordingStart}>
              녹화 시작
            </Button>
          )}
          <Switch onChange={handleVideoRecordCheck} defaultChecked />
        </Stack>
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
          {medias.map((media) => (
            <li key={media.title}>
              <MediaCard
                title={media.title}
                onPlayClick={() => handleMediaPlayClick(media.type, media.url)}
                onDeleteClick={() => handleMediaDeleteClick(media.url)}
              />
            </li>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default App;
