import { Button, Paper, Stack } from '@mui/material';

type MediaCardProps = {
  title: string;
  onPlayClick: () => void;
  onDeleteClick: () => void;
};

const MediaCard = (props: MediaCardProps) => {
  const { title, onPlayClick, onDeleteClick } = props;

  const handlePlayClick = () => {
    onPlayClick();
  };

  const handleDeleteClick = () => {
    onDeleteClick();
  };

  return (
    <Paper
      sx={{
        padding: '1rem',
      }}
    >
      <Stack spacing={2}>
        <span>{title}</span>
        <Stack direction='row' spacing={1}>
          <Button variant='outlined' onClick={handlePlayClick}>
            Play
          </Button>
          <Button variant='outlined' color='error' onClick={handleDeleteClick}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default MediaCard;
