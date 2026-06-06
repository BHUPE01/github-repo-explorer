import React from "react";
import styles from "./ErrorMessage.module.css";

const ERROR_META = {
  USER_NOT_FOUND: {
    icon: "👤",
    title: "User Not Found",
    hint: "Double-check the spelling and try again.",
  },
  RATE_LIMIT_EXCEEDED: {
    icon: "⏳",
    title: "API Rate Limit Reached",
    hint: "GitHub limits unauthenticated requests. Try again in a minute.",
  },
  INVALID_USERNAME: {
    icon: "⚠️",
    title: "Invalid Username",
    hint: "GitHub usernames can only contain letters, numbers, and hyphens.",
  },
  TIMEOUT: {
    icon: "🕐",
    title: "Request Timed Out",
    hint: "The server took too long to respond. Please try again.",
  },
  NETWORK_ERROR: {
    icon: "📡",
    title: "Connection Error",
    hint: "Make sure the backend server is running and reachable.",
  },
  AUTH_FAILED: {
    icon: "🔑",
    title: "Authentication Error",
    hint: "The server's GitHub token is invalid or expired.",
  },
};

const ErrorMessage = ({ error, onRetry }) => {
  const code = error?.code || "UNKNOWN_ERROR";
  const meta = ERROR_META[code] || {
    icon: "❌",
    title: "Something Went Wrong",
    hint: error?.message || "An unexpected error occurred.",
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon}>{meta.icon}</div>
        <h2 className={styles.title}>{meta.title}</h2>
        <p className={styles.message}>{error?.message || meta.hint}</p>
        {meta.hint && error?.message && (
          <p className={styles.hint}>{meta.hint}</p>
        )}
        {error?.resetTime && (
          <p className={styles.resetTime}>
            Rate limit resets at:{" "}
            <strong>
              {new Date(error.resetTime).toLocaleTimeString()}
            </strong>
          </p>
        )}
        {onRetry && (
          <button className={styles.retryBtn} onClick={onRetry}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;