// import Image from 'next/image'
import { useEffect, useState } from "react";
import { useCallback } from "react/cjs/react.development";
import { Headline } from "src/compornents/Headline";
import styles from "src/compornents/Main/Main.module.css";

export function Main() {
  const defaultWorkoutValue = 4000;
  const defaultRestValue = 3000;
  const [workoutTime, setWorkoutTime] = useState(defaultWorkoutValue);
  const [restTime, setRestTime] = useState(defaultRestValue);
  const [timeoutId, setTimeoutId] = useState();
  const [buttonState, setButtonState] = useState("initial");
  const [toggle, setToggle] = useState(true);

  // test用
  const [flag, setFlag] = useState(0);
  const [countA, setCountA] = useState(1);
  const [countB, setCountB] = useState(1);

  const countUp = useCallback((setcount) => {
    setcount((prevCount) => prevCount + 1);
  }, []);

  const handleClick = useCallback(() => {
    toggle ? countUp(setCountA) : countUp(setCountB);
  }, [toggle]);
  // console.log(toggle ? "workout" : "rest");
  // ここまでtest

  // スタートボタンの処理
  const countDown = useCallback((settimer) => {
    settimer((prevTime) => prevTime - 10);
  }, []);

  const handleStart = useCallback(() => {
    // 計測時はボタン無効化
    if (buttonState === "running") {
      return;
    }
    setButtonState("running"); //計測状態に変更
    setTimeoutId(
      setInterval(() => {
        toggle ? countDown(setWorkoutTime) : countDown(setRestTime);
      }, 10)
    );
  }, [buttonState, toggle, countDown]);

  // ストップボタンの処理
  const handleStop = useCallback(() => {
    // 初期状態時と停止時はボタン無効化
    if (buttonState === "initial" || buttonState === "stopped") {
      return;
    }
    setButtonState("stopped"); //停止状態に変更
    clearTimeout(timeoutId);
  }, [buttonState, timeoutId]);

  // タイマーの初期化
  const initialization = () => {
    // toggle
    //   ? setWorkoutTime(defaultWorkoutValue)
    //   : setRestTime(defaultRestValue);
    setWorkoutTime(defaultWorkoutValue);
    setRestTime(defaultRestValue);
  };

  // リセットボタンの処理
  const handleReset = () => {
    // 初期状態時と計測時はボタン無効化
    if (buttonState === "initial" || buttonState === "running") {
      return;
    }
    setButtonState("initial"); //初期状態に変更
    initialization();
    setToggle(true);
  };

  // 0になったらタイマーをストップ（useEffectを使用したほうが良い？）
  if (workoutTime === 0 || restTime === 0) {
    handleStop();
    initialization();
    setToggle(!toggle);
    setFlag(1);
  }

  useEffect(() => {
    if (flag === 1) {
      handleStart();
      setFlag(0);
    }
  }, [flag]);

  console.log(buttonState);

  return (
    <main className={styles.main}>
      <Headline />
      <div>{toggle ? "workout" : "rest"}</div>
      <div>{toggle ? workoutTime : restTime}</div>
      {/* <div>{Math.floor((workoutTime / 1000) % 60)}s</div> */}
      <div>運動時間{Math.ceil((workoutTime / 1000) % 60)}秒</div>
      <div>休憩時間{Math.ceil((restTime / 1000) % 60)}秒</div>
      {/* <div>{(workout / 10) % 1000}ms</div> */}

      {/* <ShowTimer timer={timer} /> */}
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>

      <p>{buttonState}</p>

      <div>A{countA}</div>
      <div>B{countB}</div>
      <button onClick={handleClick}>カウント</button>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        切り替え
      </button>
    </main>
  );
}
