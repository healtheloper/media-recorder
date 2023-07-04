import { Ref, forwardRef } from 'react';
import { styled } from 'styled-components';

type VideoContainerProps = {
  videoUrl?: string;
};

const VideoContainer = forwardRef(
  (props: VideoContainerProps, ref: Ref<HTMLVideoElement>) => {
    const { videoUrl } = props;

    return videoUrl ? (
      <Video ref={ref} src={videoUrl} controls />
    ) : (
      <EmptyVideoContainer />
    );
  }
);

const Video = styled.video`
  width: 720px;
  height: 480px;
  display: flex;
`;

const EmptyVideoContainer = styled.div`
  width: 720px;
  height: 480px;
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default VideoContainer;
