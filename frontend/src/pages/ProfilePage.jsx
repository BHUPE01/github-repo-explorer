
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import UserCardSkeleton from "../components/UserCardSkeleton";
import RepoList from "../components/RepoList";
import RepoListSkeleton from "../components/RepoListSkeleton";
import LanguageChart from "../components/LanguageChart";
import ErrorMessage from "../components/ErrorMessage";
import SortControls from "../components/SortControls";
import { sortRepos } from "../utils/formatters";
import styles from "./ProfilePage.module.css";

const ProfilePage = ({
  user,
  repos,
  languages,
  loading,
  loadMoreLoading,
  error,
  hasNextPage,
  currentUsername,
  onSearch,
  onBack,
  loadMore,
}) => {
  const [sortBy, setSortBy] = useState("updated");

  const sortedRepos = sortRepos(repos, sortBy);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Go back to home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Home</span>
        </button>

        <div className={styles.logo}>
          <svg width="22" height="22" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#58a6ff" />
            <path
              fill="#0a0c10"
              d="M16 5.5A10.5 10.5 0 0 0 5.5 16c0 4.64 3.01 8.58 7.19 9.97.53.1.72-.23.72-.51 0-.25-.01-.91-.01-1.79-2.93.64-3.55-1.41-3.55-1.41-.48-1.22-1.17-1.54-1.17-1.54-.96-.65.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.62 2.47 1.15 3.07.88.1-.69.37-1.15.67-1.42-2.34-.27-4.8-1.17-4.8-5.21 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.88 1.07a9.98 9.98 0 0 1 2.63-.35c.89 0 1.79.12 2.63.35 2-1.35 2.88-1.07 2.88-1.07.57 1.45.21 2.52.1 2.79.67.74 1.08 1.68 1.08 2.83 0 4.05-2.47 4.94-4.82 5.2.38.33.71.97.71 1.96 0 1.42-.01 2.56-.01 2.91 0 .28.19.61.73.51A10.5 10.5 0 0 0 26.5 16 10.5 10.5 0 0 0 16 5.5z"
            />
          </svg>
          <span className={styles.logoText}>RepoExplorer</span>
        </div>

        <div className={styles.searchBarWrapper}>
          <SearchBar onSearch={onSearch} loading={loading} />
        </div>
      </header>

      <main className={styles.main}>
        {error && !loading && (
          <ErrorMessage error={error} onRetry={() => onSearch(currentUsername)} />
        )}

        {loading && (
          <>
            <UserCardSkeleton />
            <RepoListSkeleton />
          </>
        )}

        {!loading && !error && user && (
          <div className={styles.content}>
            <div className={styles.sidebar}>
              <UserCard user={user} />
              {Object.keys(languages).length > 0 && (
                <LanguageChart languages={languages} />
              )}
            </div>

            <div className={styles.repoSection}>
              <div className={styles.repoHeader}>
                <h2 className={styles.repoHeading}>
                  Repositories
                  <span className={styles.repoCount}>{user.public_repos}</span>
                </h2>
                <SortControls sortBy={sortBy} onChange={setSortBy} />
              </div>

              {sortedRepos.length === 0 ? (
                <div className={styles.emptyRepos}>
                  <p>No public repositories found.</p>
                </div>
              ) : (
                <>
                  <RepoList repos={sortedRepos} />
                  {hasNextPage && (
                    <div className={styles.loadMoreWrapper}>
                      <button
                        className={styles.loadMoreBtn}
                        onClick={loadMore}
                        disabled={loadMoreLoading}
                      >
                        {loadMoreLoading ? (
                          <>
                            <span className={styles.spinner} />
                            Loading…
                          </>
                        ) : (
                          "Load More Repositories"
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;