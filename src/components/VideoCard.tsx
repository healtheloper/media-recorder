import { Button, Paper, Stack } from '@mui/material';

export type Video = {
  title: string;
  url: string;
};

type VideoCardProps = {
  video: Video;
  onPlayClick: () => void;
  onDeleteClick: () => void;
};

const VideoCard = (props: VideoCardProps) => {
  const { video, onPlayClick, onDeleteClick } = props;

  const handlePlayClick = () => {
    onPlayClick();
  };

  const handleDeleteClick = () => {
    onDeleteClick();
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
      <Stack direction='row' spacing={1}>
        <Button variant='outlined' onClick={handlePlayClick}>
          Play
        </Button>
        <Button variant='outlined' color='error' onClick={handleDeleteClick}>
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};

export default VideoCard;
