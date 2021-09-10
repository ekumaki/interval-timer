// import Image from 'next/image'
import { useState } from "react";
import { Headline } from "src/compornents/Headline";
import styles from "src/compornents/Main/Main.module.css";

export function Main() {
  // const [startTime, setStartTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timeoutId, setTimeoutId] = useState();
  // const [elapsedTime, setElapsedTime] = useState(0); // 経過時間
  // let startTime;
  // let elapsedTime = 0;

  // const countUp = () => {
  //   //スタートボタンを押した時間との差
  //   // const d = new Date(Date.now() - startTime + elapsedTime);
  //   // const d = new Date(Date.now() - startTime);
  //   // const m = String(d.getMinutes()).padStart(2, "0");
  //   // const s = String(d.getSeconds()).padStart(2, "0");
  //   // const ms = String(d.getMilliseconds()).padStart(2, "0");
  //   // setTimer(`${m}:${s}:${ms}`);

  //   setTimer(startTime);

  //   // ストップ用にsetTimeoutの返り値を取得
  //   setTimeoutId(
  //     setTimeout(() => {
  //       countUp();
  //     }, 10)
  //   );
  // };

  const handleStart = () => {
    setTimeoutId(
      setInterval(() => {
        setTimer((prevTimer) => {
          prevTimer++;
          return prevTimer;
        });
      }, 1000)
    );
  };

  // ストップボタンの処理
  const handleStop = () => {
    clearTimeout(timeoutId);
    // elapsedTime = Date.now() - startTime;
    // setElapsedTime(Date.now() - startTime);
  };

  // リセットボタンの処理
  const handleReset = () => {
    setTimer(0);
  };

  // console.log(elapsedTime);
  // console.log({newStartTime});

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
