import React from "react";
import SearchBar from "../components/SearchBar";
import styles from "./HomePage.module.css";

const FEATURED = ["torvalds", "gaearon", "sindresorhus", "yyx990803", "tj"];

const HomePage = ({ onSearch, loading }) => {
  return (
    <div className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#000000" />
            <path
              fill="#000000"
              d="M16 5.5A10.5 10.5 0 0 0 5.5 16c0 4.64 3.01 8.58 7.19 9.97.53.1.72-.23.72-.51 0-.25-.01-.91-.01-1.79-2.93.64-3.55-1.41-3.55-1.41-.48-1.22-1.17-1.54-1.17-1.54-.96-.65.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.62 2.47 1.15 3.07.88.1-.69.37-1.15.67-1.42-2.34-.27-4.8-1.17-4.8-5.21 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.88 1.07a9.98 9.98 0 0 1 2.63-.35c.89 0 1.79.12 2.63.35 2-1.35 2.88-1.07 2.88-1.07.57 1.45.21 2.52.1 2.79.67.74 1.08 1.68 1.08 2.83 0 4.05-2.47 4.94-4.82 5.2.38.33.71.97.71 1.96 0 1.42-.01 2.56-.01 2.91 0 .28.19.61.73.51A10.5 10.5 0 0 0 26.5 16 10.5 10.5 0 0 0 16 5.5z"
            />
          </svg>
          <span>RepoExplorer</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          
          <h1
  style={{
    fontSize: "6rem",
    fontWeight: "500",
    color: "#ffffff",
    letterSpacing: "-3px",
   
  }}
>
  Explore GitHub
</h1>
          

          <div className={styles.searchWrapper}>
            <SearchBar onSearch={onSearch} loading={loading} />
          </div>
          <p className={styles.subtitle}>
            Search any GitHub username to instantly view their profile, repositories,
            language distribution, and contribution history
          </p>
          
        </div>

        
      </main>

      <footer className={styles.footer}>
        <p>BHUPENDRA SINGH PUNDIR</p>
      </footer>
    </div>
  );
};

export default HomePage;