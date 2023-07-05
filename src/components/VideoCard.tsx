import { Button, Paper } from '@mui/material';
import { ComponentPropsWithoutRef } from 'react';

export type Video = {
  title: string;
  url: string;
};

type VideoCardProps = {
  video: Video;
  onPlayClick: () => void;
} & ComponentPropsWithoutRef<typeof Paper>;

const VideoCard = (props: VideoCardProps) => {
  const { video, onPlayClick } = props;

  const handlePlayClick = () => {
    onPlayClick();
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <span>{video.title}</span>
      <Button variant='outlined' onClick={handlePlayClick}>
        Play
      </Button>
    </Paper>
  );
};

export default VideoCard;
