// import Image from 'next/image'
import { Headline } from "src/compornents/Headline";
import styles from "src/compornents/Main/Main.module.css";

export function Main() {
  return (
    <main className={styles.main}>
      <Headline />
    </main>
  );
}
