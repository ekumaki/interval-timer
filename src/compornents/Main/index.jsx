// import Image from 'next/image'
import { useState } from "react";
import { Headline } from "src/compornents/Headline";
import styles from "src/compornents/Main/Main.module.css";

export function Main() {
  const [timer, setTimer] = useState("00:00");
  const [timeoutId, setTimeoutId] = useState();
  let startTime;
  // let timeoutId;

  const countUp = () => {
    // console.log(Date.now() - startTime);
    //スタートボタンを押した時間との差
    const d = new Date(Date.now() - startTime);
    const m = String(d.getMinutes()).padStart(2, "0");
    const s = String(d.getSeconds()).padStart(2, "0");
    const ms = String(d.getMilliseconds()).padStart(2, "0");
    setTimer(`${m}:${s}:${ms}`);

    // ストップ用にsetTimeoutの返り値を取得
    setTimeoutId(
      setTimeout(() => {
        countUp();
      }, 10)
    );
  };

  // スタートボタンの処理
  const handleStart = () => {
    startTime = Date.now(); // スタートボタンを押した時刻を取得
    countUp();
  };

  // ストップボタンの処理
  const handleStop = () => {
    clearTimeout(timeoutId);
  };

  // リセットボタンの処理
  const handleReset = () => {
    setTimer("00:00");
  };

  return (
    <main className={styles.main}>
      <Headline />
      <div>{timer}</div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </main>
  );
}
