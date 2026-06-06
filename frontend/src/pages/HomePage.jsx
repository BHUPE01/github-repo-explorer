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
            <rect width="32" height="32" rx="8" fill="#58a6ff" />
            <path
              fill="#0a0c10"
              d="M16 5.5A10.5 10.5 0 0 0 5.5 16c0 4.64 3.01 8.58 7.19 9.97.53.1.72-.23.72-.51 0-.25-.01-.91-.01-1.79-2.93.64-3.55-1.41-3.55-1.41-.48-1.22-1.17-1.54-1.17-1.54-.96-.65.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.62 2.47 1.15 3.07.88.1-.69.37-1.15.67-1.42-2.34-.27-4.8-1.17-4.8-5.21 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.88 1.07a9.98 9.98 0 0 1 2.63-.35c.89 0 1.79.12 2.63.35 2-1.35 2.88-1.07 2.88-1.07.57 1.45.21 2.52.1 2.79.67.74 1.08 1.68 1.08 2.83 0 4.05-2.47 4.94-4.82 5.2.38.33.71.97.71 1.96 0 1.42-.01 2.56-.01 2.91 0 .28.19.61.73.51A10.5 10.5 0 0 0 26.5 16 10.5 10.5 0 0 0 16 5.5z"
            />
          </svg>
          <span>RepoExplorer</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.badge}>Open Source Intelligence</div>
          <h1 className={styles.title}>
            Explore GitHub
            <br />
            <span className={styles.accent}>Profiles & Repos</span>
          </h1>
          <p className={styles.subtitle}>
            Search any GitHub username to instantly view their profile, repositories,
            language distribution, and contribution history — all in one place.
          </p>

          <div className={styles.searchWrapper}>
            <SearchBar onSearch={onSearch} loading={loading} />
          </div>

          <div className={styles.featured}>
            <span className={styles.featuredLabel}>Try:</span>
            {FEATURED.map((u) => (
              <button
                key={u}
                className={styles.featuredChip}
                onClick={() => onSearch(u)}
                disabled={loading}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.features}>
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              ),
              title: "Full Profile View",
              desc: "Avatar, bio, follower counts, and all public metadata at a glance.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h6l6 18h6" /><path d="M14 13h7" />
                </svg>
              ),
              title: "Language Chart",
              desc: "Visualize the language distribution across all public repositories.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ),
              title: "Sort & Filter Repos",
              desc: "Sort by stars, name, or last updated. Load more with one click.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              ),
              title: "Recent Searches",
              desc: "Your search history is saved locally so you can jump back instantly.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{icon}</div>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Built with React + Vite · Powered by GitHub API</p>
      </footer>
    </div>
  );
};

export default HomePage;