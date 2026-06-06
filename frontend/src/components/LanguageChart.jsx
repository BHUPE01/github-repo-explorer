import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getLanguageColor } from "../utils/formatters";
import styles from "./LanguageChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageChart = ({ languages }) => {
  const sorted = useMemo(() => {
    return Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);
  }, [languages]);

  const total = sorted.reduce((sum, [, count]) => sum + count, 0);

  const data = useMemo(() => ({
    labels: sorted.map(([lang]) => lang),
    datasets: [
      {
        data: sorted.map(([, count]) => count),
        backgroundColor: sorted.map(([lang]) => getLanguageColor(lang)),
        borderColor: "#161b22",
        borderWidth: 3,
        hoverBorderWidth: 3,
        hoverOffset: 6,
      },
    ],
  }), [sorted]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1c2230",
        borderColor: "#21262d",
        borderWidth: 1,
        titleColor: "#e6edf3",
        bodyColor: "#8b949e",
        padding: 10,
        callbacks: {
          label: (ctx) => {
            const pct = ((ctx.parsed / total) * 100).toFixed(1);
            return ` ${ctx.parsed} repos (${pct}%)`;
          },
        },
      },
    },
  }), [total]);

  if (sorted.length === 0) return null;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Languages</h3>

      <div className={styles.chartWrapper}>
        <Doughnut data={data} options={options} />
        <div className={styles.centerLabel}>
          <span className={styles.centerCount}>{total}</span>
          <span className={styles.centerText}>repos</span>
        </div>
      </div>

      <div className={styles.legend}>
        {sorted.map(([lang, count]) => {
          const pct = ((count / total) * 100).toFixed(1);
          return (
            <div key={lang} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ background: getLanguageColor(lang) }}
              />
              <span className={styles.legendLang}>{lang}</span>
              <div className={styles.legendBar}>
                <div
                  className={styles.legendBarFill}
                  style={{
                    width: `${pct}%`,
                    background: getLanguageColor(lang),
                  }}
                />
              </div>
              <span className={styles.legendPct}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageChart;