import React from "react";
import RepoCard from "./RepoCard";
import styles from "./RepoList.module.css";

const RepoList = ({ repos }) => {
  return (
    <div className={styles.list}>
      {repos.map((repo, i) => (
        <RepoCard key={repo.id} repo={repo} index={i} />
      ))}
    </div>
  );
};

export default RepoList;