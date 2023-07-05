import { useEffect, useRef, useState } from 'react';
import video from '../constants/video';

type MediaRecorderHookOption = {
  onRecordingStart?: () => void;
  onRecordingStop: (videoUrl: string) => void;
};

const useMediaRecorder = ({
  onRecordingStart,
  onRecordingStop,
}: MediaRecorderHookOption): {
  isRecording: boolean;
  isPermitted: boolean;
  recordingStart: () => void;
  recordingStop: () => void;
  changeConstraints: (constraints: MediaStreamConstraints) => void;
  previewStream: MediaStream;
} => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);

  const [isPermitted, setIsPermitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [constraints, setConstraints] = useState<MediaStreamConstraints>({
    audio: true,
    video: {
      width: video.WIDTH,
      height: video.HEIGHT,
    },
  });

  const videoTracks = mediaStream.current?.getVideoTracks() || [];
  const previewStream = new MediaStream(videoTracks);

  const recordingStart = () => {
    mediaRecorder.current?.start(1000);
    setIsRecording(true);
    if (onRecordingStart) {
      onRecordingStart();
    }
  };

  const recordingStop = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  const changeConstraints = (constraints: MediaStreamConstraints) => {
    setConstraints(constraints);
  };

  const getMediaStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    mediaStream.current = stream;
    return stream;
  };

  useEffect(() => {
    let chunks: Blob[] = [];

    (async () => {
      const stream = await getMediaStream();
      setIsPermitted(true);
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.addEventListener(
        'dataavailable',
        (e: BlobEvent) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        }
      );
      mediaRecorder.current.addEventListener('stop', () => {
        const blob = new Blob(chunks, {
          type: 'video/webm',
        });
        chunks = [];
        const url = URL.createObjectURL(blob);
        onRecordingStop(url);
      });
    })();
  }, [constraints]);

  return {
    previewStream,
    isRecording,
    isPermitted,
    changeConstraints,
    recordingStart,
    recordingStop,
  };
};

export default useMediaRecorder;
