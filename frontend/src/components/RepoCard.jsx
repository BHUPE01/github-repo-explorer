import React, { useState } from "react";
import { formatCount, formatDate, getLanguageColor } from "../utils/formatters";
import styles from "./RepoCard.module.css";

const Badge = ({ children, color }) => (
  <span className={styles.badge} style={{ "--badge-color": color }}>
    {children}
  </span>
);

const StatChip = ({ icon, value, label }) => (
  <div className={styles.statChip} title={label}>
    <span className={styles.statIcon}>{icon}</span>
    <span>{formatCount(value)}</span>
  </div>
);

const RepoCard = ({ repo, index }) => {
  const [expanded, setExpanded] = useState(false);
  const langColor = repo.language ? getLanguageColor(repo.language) : null;

  return (
    <div
      className={`${styles.card} ${expanded ? styles.expanded : ""}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.titleRow}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.name}
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.repoIcon}>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              {repo.name}
            </a>

            {repo.archived && <Badge color="#d29922">Archived</Badge>}
            {repo.fork && <Badge color="#8b949e">Fork</Badge>}
            {repo.visibility && (
              <Badge color="#58a6ff">{repo.visibility}</Badge>
            )}
          </div>

          <button
            className={styles.expandBtn}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`${styles.chevron} ${expanded ? styles.chevronUp : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {repo.description && (
          <p className={styles.description}>{repo.description}</p>
        )}

        {repo.topics && repo.topics.length > 0 && (
          <div className={styles.topics}>
            {repo.topics.slice(0, 5).map((topic) => (
              <span key={topic} className={styles.topic}>
                {topic}
              </span>
            ))}
            {repo.topics.length > 5 && (
              <span className={styles.topicMore}>+{repo.topics.length - 5}</span>
            )}
          </div>
        )}

        <div className={styles.meta}>
          {repo.language && (
            <div className={styles.langBadge}>
              <span className={styles.langDot} style={{ background: langColor }} />
              <span>{repo.language}</span>
            </div>
          )}

          <StatChip
            icon={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            }
            value={repo.stargazers_count}
            label="Stars"
          />

          <StatChip
            icon={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <circle cx="18" cy="6" r="3" />
                <path d="M18 9a9 9 0 0 1-9 9M6 9a9 9 0 0 0 9 9" />
              </svg>
            }
            value={repo.forks_count}
            label="Forks"
          />

          <div className={styles.updatedAt}>
            Updated {formatDate(repo.updated_at)}
          </div>
        </div>
      </div>

      {expanded && (
        <div className={styles.details}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Open Issues</span>
              <span className={styles.detailValue}>
                {formatCount(repo.open_issues_count)}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Watchers</span>
              <span className={styles.detailValue}>
                {formatCount(repo.watchers_count)}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Default Branch</span>
              <span className={styles.detailValue}>{repo.default_branch}</span>
            </div>
            {repo.license && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>License</span>
                <span className={styles.detailValue}>{repo.license}</span>
              </div>
            )}
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Created</span>
              <span className={styles.detailValue}>{formatDate(repo.created_at)}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Visibility</span>
              <span className={styles.detailValue}>{repo.visibility}</span>
            </div>
          </div>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewOnGithub}
          >
            View on GitHub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default RepoCard;