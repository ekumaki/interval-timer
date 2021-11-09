import { useRef } from "react";

export const usePlaySound = () => {
  const soundCountdown = useRef(null);

  const handlePlay = () => {
    const { current } = soundCountdown;
    current.play();
  };

  return { soundCountdown, handlePlay };
};
