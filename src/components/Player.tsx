import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import video from '../constants/video';

export type MediaType = 'video' | 'audio';

type PlayerProps<T extends MediaType> = {
  type?: T;
} & ComponentPropsWithoutRef<T>;

const Player = <T extends MediaType = 'video'>(props: PlayerProps<T>) => {
  const { type, ...restProps } = props;
  return (
    <PlayerWrapper>
      {(() => {
        switch (type) {
          case 'video':
            return <VideoPlayer {...restProps} />;
          case 'audio':
            return <AudioPlayer {...restProps} />;
          default:
            return null;
        }
      })()}
    </PlayerWrapper>
  );
};

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: ${video.WIDTH}px;
  height: ${video.HEIGHT}px;
  background-color: #4c4949;

  audio {
    position: absolute;
    bottom: 2rem;
  }
`;

export default Player;
