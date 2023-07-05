import { Ref, forwardRef, useImperativeHandle, useRef } from 'react';
import { styled } from 'styled-components';
import video from '../constants/video';

type PreviewVideoProps = {
  stream: MediaStream;
};

export type PreviewVideoRef = {
  play: () => void;
};

const PreviewVideo = forwardRef(
  (props: PreviewVideoProps, ref: Ref<PreviewVideoRef>) => {
    const { stream } = props;
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current?.play();
          });
        }
      },
    }));

    return (
      <VideoWrapper>
        <video ref={videoRef} />
      </VideoWrapper>
    );
  }
);

const VideoWrapper = styled.div`
  width: ${video.WIDTH}px;
  height: ${video.HEIGHT}px;
  position: relative;
  background-color: #000;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default PreviewVideo;
