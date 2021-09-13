// import Image from 'next/image'
import { useState } from "react";
import { Headline } from "src/compornents/Headline";
import styles from "src/compornents/Main/Main.module.css";

export function Main() {
  // const [startTime, setStartTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timeoutId, setTimeoutId] = useState();
  const [buttonState, setButtonState] = useState("initial");
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

  // ストップボタンの処理
  const handleStart = () => {
    // 計測時はボタン無効化
    if (buttonState === "running") {
      return;
    }
    setButtonState("running"); //計測状態に変更

    setTimeoutId(
      setInterval(() => {
        setTimer((prevTimer) => {
          prevTimer += 10;
          return prevTimer;
        });
      }, 10)
    );
  };

  // ストップボタンの処理
  const handleStop = () => {
    // 初期状態時と停止時はボタン無効化
    if (buttonState === "initial") {
      return;
    }
    if (buttonState === "stopped") {
      return;
    }
    setButtonState("stopped"); //停止状態に変更
    clearTimeout(timeoutId);
    // elapsedTime = Date.now() - startTime;
    // setElapsedTime(Date.now() - startTime);
  };

  // リセットボタンの処理
  const handleReset = () => {
    // 初期状態時と計測時はボタン無効化
    if (buttonState === "initial") {
      return;
    }
    if (buttonState === "running") {
      return;
    }
    setButtonState("initial"); //初期状態に変更

    setTimer(0); //タイマーを０にする
  };

  console.log(buttonState);

  return (
    <main className={styles.main}>
      <Headline />
      <div>{timer}</div>
      <div>{Math.floor((timer / 1000) % 60)}s</div>
      <div>{(timer / 10) % 1000}ms</div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </main>
  );
}
