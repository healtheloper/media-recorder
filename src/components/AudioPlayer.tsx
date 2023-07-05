import { ComponentPropsWithoutRef } from 'react';

type AudioProps = ComponentPropsWithoutRef<'audio'>;

const AudioPlayer = (props: AudioProps) => {
  return <audio controls autoPlay {...props} />;
};

export default AudioPlayer;
