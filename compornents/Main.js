// import Image from 'next/image'
import { Headline } from "./Headline";
import styles from "./Main.module.css";

export function Main() {
  return (
    <main className={styles.main}>
      <Headline />
    </main>
  );
}
