// import Image from 'next/image'
import { Headline } from "src/compornents/Headline";
import styles from "src/compornents/Main/Main.module.css";

export function Main() {
  let startTime;

  const countUp = () => {
    console.log(Date.now() - startTime); //スタートボタンを押した時間との差
    // const d = new Date(Date.now() - startTime);
    // const m = String(d.getMinutes()).padStart(2, "0");
    // const s = String(d.getSeconds()).padStart(2, "0");
    // const ms = String(d.getMinutes()).padStart(2, "0");
    // timer.textContent = `${m}:${s}:${ms}`;

    setTimeout(() => {
      countUp();
    }, 100);
  };

  const handleStart = () => {
    startTime = Date.now(); // スタートボタンを押した時刻を取得
    countUp();
  };

  return (
    <main className={styles.main}>
      <Headline />
      <div id="timer">00:00</div>
      <button id="start" onClick={handleStart}>
        Start
      </button>
      <button id="stop">Stop</button>
      <button id="reset">Reset</button>
    </main>
  );
}
