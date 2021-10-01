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
  const defaultPreTime = 5000;
  const [preTime, setPreTime] = useState(defaultPreTime);
  const [defaultRepeat, setDefaultRepeat] = useState(1);
  const [repeat, setRepeat] = useState(0);
  const [timeoutId, setTimeoutId] = useState(); // 通常のタイマー停止用
  const [preTimeoutId, setPreTimeoutId] = useState(); // 準備時間停止用
  const [buttonState, setButtonState] = useState("initial");
  const [toggle, setToggle] = useState(true); // 運動と休憩の切替用
  const [flag, setFlag] = useState(false); // タイマーの切替用
  const limit = 600; // 秒数の上限

  // test用
  // const [countA, setCountA] = useState(1);
  // const [countB, setCountB] = useState(1);

  // const handleClick = useCallback(() => {
  //   toggle ? adjustTime(setCountA, 1) : adjustTime(setCountB, 2);
  // }, [toggle]);
  // ここまでtest

  // 秒数・セット数の設定用
  const adjustTime = useCallback((setTimer, seconds) => {
    setTimer((prevCount) => prevCount + seconds);
  }, []);

  // 秒数の設定
  const handleAdjust = useCallback(
    // category: workoutとrestの区分
    // count: 増やす（減らす）秒数
    (category, seconds) => {
      // 計測時と停止時はボタン無効化
      if (buttonState === "running" || buttonState === "stopped") {
        return;
      }
      if (category === "workout") {
        adjustTime(setWorkoutTime, seconds * 1000);
        adjustTime(setDefaultWorkout, seconds * 1000);
      } else if (category === "rest") {
        adjustTime(setRestTime, seconds * 1000);
        adjustTime(setDefaultRest, seconds * 1000);
      }
    },
    [adjustTime, buttonState]
  );

  // 複数秒（+10秒など）のプラス
  const handleAdjustPlus = useCallback(
    (category, timer, setTimer, setDefault, seconds) => {
      if (timer >= limit * 1000) {
        // 上限を超えた後にボタンを押した場合はメッセージを表示
        alert(`${limit / 60}分（${limit}秒）以上に設定することはできません。`);
      } else if (limit * 1000 - timer < seconds * 1000) {
        // 上限を超える場合は秒数を上限に設定
        setTimer(limit * 1000);
        setDefault(limit * 1000);
      } else {
        // 上限に達しない場合は秒数をプラス
        handleAdjust(category, seconds);
      }
    },
    [handleAdjust]
  );

  // 複数秒（-10秒など）のマイナス
  const handleAdjustMinus = useCallback(
    (category, timer, setTimer, setDefault, seconds) => {
      if (timer <= 1000) {
        // 秒数が１秒以下でボタンを押した場合はメッセージを表示
        alert("１秒未満に設定することはできません。");
      } else if (timer + seconds * 1000 < 1000) {
        // １秒未満になる場合は秒数を１秒に設定
        setTimer(1000);
        setDefault(1000);
      } else {
        // 上記以外の場合は秒数をマイナス
        handleAdjust(category, seconds);
      }
    },
    [handleAdjust]
  );

  // タイマーを減らす処理
  const countDown = useCallback((setTimer) => {
    setTimer((prevTime) => prevTime - 10);
  }, []);

  // 準備時間の処理
  const handlePreStart = useCallback(() => {
    setButtonState("preparing");
    setPreTimeoutId(
      setInterval(() => {
        countDown(setPreTime);
      }, 10)
    );
  }, [countDown]);

  // スタートボタンの処理
  const handleStart = useCallback(() => {
    console.log(buttonState);
    console.log("test");

    // 計測時はボタン無効化
    if (buttonState === "preparing" || buttonState === "running") {
      return;
    }
    setButtonState("running"); //計測状態に変更
    setTimeoutId(
      setInterval(() => {
        toggle ? countDown(setWorkoutTime) : countDown(setRestTime);
      }, 10)
    );
  }, [buttonState, toggle, countDown]);

  // 準備時間が０になったらタイマーをスタートさせる
  useEffect(() => {
    if (preTime === 0) {
      setButtonState("standby");
      clearInterval(preTimeoutId);
      setPreTime(defaultPreTime);
    }
  }, [handleStart, preTime, preTimeoutId]);

  useEffect(() => {
    if (buttonState == "standby") {
      handleStart();
    }
  }, [buttonState, handleStart]);

  // ストップボタンの処理
  const handleStop = useCallback(() => {
    // 初期状態時と停止時はボタン無効化
    if (
      buttonState === "initial" ||
      buttonState === "preparing" ||
      buttonState === "stopped"
    ) {
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
    if (
      buttonState === "initial" ||
      buttonState === "preparing" ||
      buttonState === "running"
    ) {
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
      // setRepeat((prevCount) => prevCount + 1);
      adjustTime(setRepeat, 1);
      handleStop();
      initialization();

      if (!(repeat + 1 === defaultRepeat * 2)) {
        setToggle(!toggle);
        setFlag(true);
      }
    }
  }, [
    adjustTime,
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
      <div>運動時間{Math.ceil(workoutTime / 1000)}秒</div>
      <div>休憩時間{Math.ceil(restTime / 1000)}秒</div>
      {/* <div>{(workout / 10) % 1000}ms</div> */}

      {/* <button onClick={handleStart}>Start</button> */}
      <button
        onClick={() => {
          buttonState === "initial" ? handlePreStart() : handleStart();
        }}
      >
        Start
      </button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      {/* <button onClick={handlePreStart}>PreStart-test</button> */}

      <br />
      <div>準備時間{Math.ceil(preTime / 1000)}秒</div>
      <p>{buttonState}</p>

      <button
        onClick={() => {
          // 20回を上限とする
          !(defaultRepeat === 100)
            ? adjustTime(setDefaultRepeat, 1)
            : alert("100回以上に設定することはできません。");
        }}
      >
        セット+1回
      </button>

      <button
        onClick={() => {
          // 0回にならないように制御する
          !(defaultRepeat === 1)
            ? adjustTime(setDefaultRepeat, -1)
            : alert("1回未満に設定することはできません。");
        }}
      >
        セット-1回
      </button>

      <p>
        セット数 {Math.floor(repeat / 2) + 1}/{defaultRepeat}回
      </p>
      <p>確認用 セット数{repeat}回</p>

      <button
        onClick={() => {
          handleAdjustPlus(
            "workout",
            workoutTime,
            setWorkoutTime,
            setDefaultWorkout,
            100
          );
        }}
      >
        運動+100秒
      </button>

      <button
        onClick={() => {
          handleAdjustMinus(
            "workout",
            workoutTime,
            setWorkoutTime,
            setDefaultWorkout,
            -100
          );
        }}
      >
        運動-100秒
      </button>

      <button
        onClick={() => {
          // 上限を10分とする
          !(workoutTime >= limit * 1000)
            ? handleAdjust("workout", 1)
            : alert("10分（600秒）以上に設定することはできません。");
        }}
      >
        運動+1秒
      </button>

      <button
        onClick={() => {
          // 0秒にならないように制御する
          !(workoutTime <= 1000)
            ? handleAdjust("workout", -1)
            : alert("1秒未満に設定することはできません。");
        }}
      >
        運動-1秒
      </button>

      <button
        onClick={() => {
          handleAdjustPlus("rest", restTime, setRestTime, setDefaultRest, 100);
        }}
      >
        休憩+100秒
      </button>

      <button
        onClick={() => {
          handleAdjustMinus(
            "rest",
            restTime,
            setRestTime,
            setDefaultRest,
            -100
          );
        }}
      >
        休憩-100秒
      </button>

      <button
        onClick={() => {
          // 上限を10分とする
          !(restTime >= limit * 1000)
            ? handleAdjust("rest", 1)
            : alert("10分（600秒）以上に設定することはできません。");
        }}
      >
        休憩+1秒
      </button>

      <button
        onClick={() => {
          // 0秒にならないように制御する
          !(restTime <= 1000)
            ? handleAdjust("rest", -1)
            : alert("1秒未満に設定することはできません。");
        }}
      >
        休憩-1秒
      </button>

      {/* <p>※終了状態を作成する（後でOK）</p> */}
    </main>
  );
}
