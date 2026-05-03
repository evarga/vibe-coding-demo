import styles from './Loader.module.css';

export default function Loader({ fullPage }) {
  if (fullPage) {
    return (
      <div className={styles.fullPageContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
}
