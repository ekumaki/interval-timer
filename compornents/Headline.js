// import Image from 'next/image'
import styles from "../styles/Home.module.css";

export default function Headline() {
  return (
    <div>
      <h1 className={styles.title}>
        インターバルタイマー
      </h1>

      <p className={styles.description}>
        Get started by editing{" "}
        <code className={styles.code}>pages/index.js</code>
      </p>
    </div>
  );
}
