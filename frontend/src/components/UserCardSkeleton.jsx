import React from "react";
import styles from "./Skeleton.module.css";

const UserCardSkeleton = () => (
  <div className={styles.userCard}>
    <div className={`${styles.shimmer} ${styles.avatar}`} />
    <div className={styles.lines}>
      <div className={`${styles.shimmer} ${styles.line} ${styles.lineLg}`} />
      <div className={`${styles.shimmer} ${styles.line} ${styles.lineMd}`} />
      <div className={`${styles.shimmer} ${styles.line} ${styles.lineSm}`} />
    </div>
    <div className={styles.statsRow}>
      <div className={`${styles.shimmer} ${styles.statBox}`} />
      <div className={`${styles.shimmer} ${styles.statBox}`} />
      <div className={`${styles.shimmer} ${styles.statBox}`} />
    </div>
    <div className={styles.metaLines}>
      <div className={`${styles.shimmer} ${styles.line} ${styles.lineMd}`} />
      <div className={`${styles.shimmer} ${styles.line} ${styles.lineSm}`} />
    </div>
  </div>
);

export default UserCardSkeleton;