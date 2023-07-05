import { ComponentPropsWithoutRef } from 'react';
import { styled } from 'styled-components';
import video from '../constants/video';

type VideoProps = ComponentPropsWithoutRef<'video'>;

const VideoPlayer = (props: VideoProps) => {
  return <StyledVideo controls autoPlay {...props} />;
};

const StyledVideo = styled.video`
  width: ${video.WIDTH}px;
  height: ${video.HEIGHT}px;
`;

export default VideoPlayer;
