import React from "react";
import styles from "./Skeleton.module.css";

const RepoCardSkeleton = () => (
  <div className={styles.repoCard}>
    <div className={`${styles.shimmer} ${styles.repoTitle}`} />
    <div className={`${styles.shimmer} ${styles.repoDesc}`} />
    <div className={`${styles.shimmer} ${styles.repoDescShort}`} />
    <div className={styles.repoMeta}>
      <div className={`${styles.shimmer} ${styles.repoMetaItem}`} />
      <div className={`${styles.shimmer} ${styles.repoMetaItem}`} />
      <div className={`${styles.shimmer} ${styles.repoMetaItem}`} />
    </div>
  </div>
);

const RepoListSkeleton = ({ count = 5 }) => (
  <div className={styles.repoListWrapper}>
    {Array.from({ length: count }).map((_, i) => (
      <RepoCardSkeleton key={i} />
    ))}
  </div>
);

export default RepoListSkeleton;