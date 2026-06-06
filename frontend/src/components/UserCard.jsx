import React from "react";
import { formatCount, formatFullDate } from "../utils/formatters";
import styles from "./UserCard.module.css";

const StatItem = ({ label, value }) => (
  <div className={styles.stat}>
    <span className={styles.statValue}>{formatCount(value)}</span>
    <span className={styles.statLabel}>{label}</span>
  </div>
);

const MetaItem = ({ icon, children }) => (
  <div className={styles.metaItem}>
    <span className={styles.metaIcon}>{icon}</span>
    <span>{children}</span>
  </div>
);

const UserCard = ({ user }) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className={styles.avatar}
          loading="lazy"
        />
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
          aria-label="View on GitHub"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      <div className={styles.identity}>
        {user.name && <h2 className={styles.name}>{user.name}</h2>}
        <p className={styles.login}>@{user.login}</p>
      </div>

      {user.bio && <p className={styles.bio}>{user.bio}</p>}

      <div className={styles.stats}>
        <StatItem label="Repos" value={user.public_repos} />
        <div className={styles.statDivider} />
        <StatItem label="Followers" value={user.followers} />
        <div className={styles.statDivider} />
        <StatItem label="Following" value={user.following} />
      </div>

      <div className={styles.meta}>
        {user.location && (
          <MetaItem
            icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
          >
            {user.location}
          </MetaItem>
        )}
        {user.company && (
          <MetaItem
            icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            }
          >
            {user.company}
          </MetaItem>
        )}
        {user.blog && (
          <MetaItem
            icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
          >
            <a
              href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.blog.replace(/^https?:\/\//, "")}
            </a>
          </MetaItem>
        )}
        {user.twitter_username && (
          <MetaItem
            icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 5.882 5.45-5.882zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            }
          >
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{user.twitter_username}
            </a>
          </MetaItem>
        )}
        {user.created_at && (
          <MetaItem
            icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
          >
            Joined {formatFullDate(user.created_at)}
          </MetaItem>
        )}
      </div>
    </div>
  );
};

export default UserCard;