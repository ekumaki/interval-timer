import { useRef, useState } from "react";

export const usePlaySound = () => {
  const soundCountdown = useRef(null);
  const [soundState, setSoundState] = useState(false);

  // 音声再生
  const handleSoundPlay = () => {
    const { current } = soundCountdown;
    current.play();
  };

  // 音声ストップ
  const handleSoundStop = () => {
    const { current } = soundCountdown;
    current.pause();
  };

  // ミュート機能
  const handleMuted = () => {
    const { current } = soundCountdown;
    current.muted = !current.muted;

    // ミュート状態の切替
    setSoundState(!soundState);
  };

  return {
    soundCountdown,
    handleSoundPlay,
    handleSoundStop,
    handleMuted,
    soundState,
  };
};
