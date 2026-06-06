import React, { useState, useRef, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import {
  getRecentSearches,
  removeRecentSearch,
  clearRecentSearches,
} from "../utils/localStorage";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch, loading }) => {
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const debouncedInput = useDebounce(input, 400);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setShowDropdown(false);
    onSearch(trimmed);
  };

  const handleSelectRecent = (username) => {
    setInput(username);
    setShowDropdown(false);
    onSearch(username);
  };

  const handleRemoveRecent = (e, username) => {
    e.stopPropagation();
    const updated = removeRecentSearch(username);
    setRecentSearches(updated);
  };

  const handleClearAll = (e) => {
    e.stopPropagation();
    const updated = clearRecentSearches();
    setRecentSearches(updated);
    setShowDropdown(false);
  };

  const handleFocus = () => {
    const recent = getRecentSearches();
    setRecentSearches(recent);
    if (recent.length > 0) setShowDropdown(true);
  };

  const filteredRecent = recentSearches.filter((u) =>
    input ? u.toLowerCase().includes(input.toLowerCase()) : true
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <span className={styles.icon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Enter a GitHub username..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={handleFocus}
            autoComplete="off"
            spellCheck="false"
            aria-label="GitHub username"
            disabled={loading}
          />
          {input && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => setInput("")}
              aria-label="Clear input"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <button
          type="submit"
          className={styles.searchBtn}
          disabled={loading || !input.trim()}
          aria-label="Search"
        >
          {loading ? (
            <span className={styles.spinner} />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {showDropdown && filteredRecent.length > 0 && (
        <div ref={dropdownRef} className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span className={styles.dropdownLabel}>Recent Searches</span>
            <button
              className={styles.clearAllBtn}
              onClick={handleClearAll}
              type="button"
            >
              Clear all
            </button>
          </div>
          {filteredRecent.map((username) => (
            <button
              key={username}
              className={styles.dropdownItem}
              onClick={() => handleSelectRecent(username)}
              type="button"
            >
              <span className={styles.recentIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span className={styles.recentUsername}>{username}</span>
              <button
                className={styles.removeBtn}
                onClick={(e) => handleRemoveRecent(e, username)}
                type="button"
                aria-label={`Remove ${username}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;