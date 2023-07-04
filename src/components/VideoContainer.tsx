import { Ref, forwardRef, useImperativeHandle, useRef } from 'react';
import { styled } from 'styled-components';

type VideoContainerProps = {
  isPermitted?: boolean;
};

export type VideoContainerRef = {
  play: (stream: MediaStream) => void;
};

const VideoContainer = forwardRef(
  (props: VideoContainerProps, ref: Ref<VideoContainerRef>) => {
    const { isPermitted = false } = props;
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useImperativeHandle(ref, () => ({
      play: (stream: MediaStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current?.play();
          });
        }
      },
    }));

    return isPermitted ? <Video ref={videoRef} /> : <EmptyVideoContainer />;
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
