// import Image from 'next/image'
import { useEffect, useState } from "react";
import { useCallback } from "react/cjs/react.development";
import { Headline } from "src/compornents/Headline";
import styles from "src/compornents/Main/Main.module.css";

export function Main() {
  const [defaultWorkout, setDefaultWorkout] = useState(4000);
  const [defaultRest, setDefaultRest] = useState(3000);
  const [workoutTime, setWorkoutTime] = useState(defaultWorkout);
  const [restTime, setRestTime] = useState(defaultRest);
  const [timeoutId, setTimeoutId] = useState();
  const [buttonState, setButtonState] = useState("initial");
  const [toggle, setToggle] = useState(true);
  const [flag, setFlag] = useState(false);

  // test用
  const [countA, setCountA] = useState(1);
  const [countB, setCountB] = useState(1);

  const handleClick = useCallback(() => {
    toggle ? adjustTime(setCountA, 1) : adjustTime(setCountB, 2);
  }, [toggle]);
  // ここまでtest

  // 秒数の設定
  const adjustTime = useCallback((setcount, count) => {
    setcount((prevCount) => prevCount + count);
  }, []);

  const handleAdjust = useCallback(
    (category, count) => {
      if (category === "workout") {
        adjustTime(setWorkoutTime, count);
        adjustTime(setDefaultWorkout, count);
      } else if (category === "rest") {
        adjustTime(setRestTime, count);
        adjustTime(setDefaultRest, count);
      }
    },
    [adjustTime]
  );

  console.log(defaultWorkout);
  // console.log(workoutTime);

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
    setWorkoutTime(defaultWorkout);
    setRestTime(defaultRest);
  };

  // リセットボタンの処理
  const handleReset = () => {
    // 初期状態時と計測時はボタン無効化
    if (buttonState === "initial" || buttonState === "running") {
      return;
    }
    setButtonState("initial"); //初期状態に変更
    initialization();
    setToggle(true); // workoutを初期状態とする
  };

  // 0になったらタイマーをストップしフラグを立てる
  if (workoutTime === 0 || restTime === 0) {
    handleStop();
    initialization();
    setToggle(!toggle);
    setFlag(true);
  }

  // フラグが立った場合にもう一方のタイマーを開始
  useEffect(() => {
    if (flag) {
      handleStart();
      setFlag(false);
    }
  }, [flag, handleStart]);

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

      <button
        onClick={() => {
          handleAdjust("workout", 1000);
        }}
      >
        運動+1秒
      </button>
      <button
        onClick={() => {
          handleAdjust("workout", -1000);
        }}
      >
        運動-1秒
      </button>
      <button
        onClick={() => {
          handleAdjust("rest", 1000);
        }}
      >
        休憩+1秒
      </button>
      <button
        onClick={() => {
          handleAdjust("rest", -1000);
        }}
      >
        休憩-1秒
      </button>

      <div>運動時間{countA}</div>
      <div>休憩時間{countB}</div>
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
