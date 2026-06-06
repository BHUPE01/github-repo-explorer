import React from "react";
import styles from "./SortControls.module.css";

const SORT_OPTIONS = [
  { value: "updated", label: "Updated" },
  { value: "stars", label: "Stars" },
  { value: "name", label: "Name" },
  { value: "forks", label: "Forks" },
];

const SortControls = ({ sortBy, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Sort:</span>
      <div className={styles.controls}>
        {SORT_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            className={`${styles.btn} ${sortBy === value ? styles.active : ""}`}
            onClick={() => onChange(value)}
            aria-pressed={sortBy === value}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortControls;