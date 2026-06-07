export const formatCount = (num) => {
  if (num === null || num === undefined) return "0";
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "Unknown";

  const date = new Date(dateStr);
  const now = new Date();

  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

  return `${Math.floor(diffDays / 365)} years ago`;
};

export const formatFullDate = (dateStr) => {
  if (!dateStr) return "Unknown";

  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const sortRepos = (repos = [], sortBy = "updated") => {
  if (!Array.isArray(repos)) {
    return [];
  }

  const sorted = [...repos];

  switch (sortBy) {
    case "stars":
      return sorted.sort((a, b) => (b.stars || 0) - (a.stars || 0));

    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "forks":
      return sorted.sort((a, b) => (b.forks || 0) - (a.forks || 0));

    case "updated":
    default:
      return sorted.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
  }
};

export const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export const getLanguageColor = (language) =>
  LANGUAGE_COLORS[language] || "#8b949e";