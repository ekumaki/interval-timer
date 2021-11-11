import { useRef } from "react";

export const usePlaySound = () => {
  const soundCountdown = useRef(null);

  const handleSoundPlay = () => {
    const { current } = soundCountdown;
    current.play();
  };

  const handleSoundStop = () => {
    const { current } = soundCountdown;
    current.pause();
  };

  // return { soundCountdown, handleSoundPlay };
  return { soundCountdown, handleSoundPlay, handleSoundStop };
};
