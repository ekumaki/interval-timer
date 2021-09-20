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
  const [defaultRepeat, setDefaultRepeat] = useState(1);
  const [repeat, setRepeat] = useState(0);

  // test用
  const [countA, setCountA] = useState(1);
  const [countB, setCountB] = useState(1);

  const handleClick = useCallback(() => {
    toggle ? adjustTime(setCountA, 1) : adjustTime(setCountB, 2);
  }, [toggle]);
  // ここまでtest

  // セット（繰り返し）数の設定
  const handleRepeat = () => {
    setDefaultRepeat((prevCount) => prevCount + 1);
    // setRepeat((prevCount) => prevCount + 1);
  };

  // 秒数の設定
  const adjustTime = useCallback((setcount, count) => {
    setcount((prevCount) => prevCount + count);
  }, []);

  const handleAdjust = useCallback(
    // category: workoutかrestか
    // count: 増やす（減らす）秒数
    (category, count) => {
      // 計測時と停止時はボタン無効化
      if (buttonState === "running" || buttonState === "stopped") {
        return;
      }
      if (category === "workout") {
        adjustTime(setWorkoutTime, count);
        adjustTime(setDefaultWorkout, count);
      } else if (category === "rest") {
        adjustTime(setRestTime, count);
        adjustTime(setDefaultRest, count);
      }
    },
    [adjustTime, buttonState]
  );

  // console.log(defaultWorkout);
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
  const initialization = useCallback(() => {
    setWorkoutTime(defaultWorkout);
    setRestTime(defaultRest);
  }, [defaultWorkout, defaultRest]);

  // リセットボタンの処理
  const handleReset = useCallback(() => {
    // 初期状態時と計測時はボタン無効化
    if (buttonState === "initial" || buttonState === "running") {
      return;
    }
    setButtonState("initial"); //初期状態に変更
    initialization();
    setRepeat(0);
    setToggle(true); // workoutを初期状態とする
  }, [buttonState, initialization]);

  // セット回数分が終わったときの処理
  if (repeat === defaultRepeat * 2) {
    // console.log("end");
    handleReset();
  }

  // 0になったらタイマーをストップしフラグを立てる
  useEffect(() => {
    if (workoutTime === 0 || restTime === 0) {
      setRepeat((prevCount) => prevCount + 1);
      handleStop();
      initialization();

      if (!(repeat + 1 === defaultRepeat * 2)) {
        setToggle(!toggle);
        setFlag(true);
      }
    }
  }, [
    toggle,
    flag,
    repeat,
    defaultRepeat,
    workoutTime,
    restTime,
    handleStop,
    initialization,
  ]);

  // フラグが立った場合にもう一方のタイマーを開始
  useEffect(() => {
    if (flag) {
      handleStart();
      setFlag(false);
    }
  }, [flag, handleStart]);

  // console.log(buttonState);

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

      <button onClick={handleRepeat}>セット+1回</button>
      <p>
        セット数 {Math.floor(repeat / 2) + 1}/{defaultRepeat}回
      </p>
      <p>確認用 セット数{repeat}回</p>
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
