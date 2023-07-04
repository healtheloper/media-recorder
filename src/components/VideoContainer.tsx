import { Ref, forwardRef, useImperativeHandle, useRef } from 'react';
import { styled } from 'styled-components';

type VideoContainerProps = {
  isPermitted?: boolean;
};

export type VideoContainerRef = {
  play: (stream: MediaStream) => void;
  getThumbnail: () => string;
};

const VideoContainer = forwardRef(
  (props: VideoContainerProps, ref: Ref<VideoContainerRef>) => {
    const { isPermitted = false } = props;
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useImperativeHandle(ref, () => ({
      play: (stream: MediaStream) => {
        if (videoRef.current) {
          const videoTracks = stream.getVideoTracks();
          const mutedVideoStream = new MediaStream(videoTracks);

          videoRef.current.srcObject = mutedVideoStream;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current?.play();
          });
        }
      },
      getThumbnail: () => {
        if (videoRef.current) {
          const canvas = canvasRef.current;

          canvas
            ?.getContext('2d')
            ?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        }
        return canvasRef.current?.toDataURL() || '';
      },
    }));

    return isPermitted ? (
      <VideoWrapper>
        <video ref={videoRef} />
        <canvas ref={canvasRef}></canvas>
      </VideoWrapper>
    ) : (
      <EmptyVideoContainer />
    );
  }
);

const VideoWrapper = styled.div`
  width: 720px;
  height: 480px;
  position: relative;

  canvas {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
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
