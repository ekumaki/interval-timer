// import Image from 'next/image'
import styles from "src/compornents/Header/Header.module.css";

export function Header() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Interval Timer</h1>
    </div>
  );
}
