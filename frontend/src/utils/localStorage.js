const STORAGE_KEY = "gre_recent_searches";
const MAX_ITEMS = 8;

export const getRecentSearches = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addRecentSearch = (username) => {
  try {
    const current = getRecentSearches();
    const filtered = current.filter(
      (u) => u.toLowerCase() !== username.toLowerCase()
    );
    const updated = [username, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const removeRecentSearch = (username) => {
  try {
    const current = getRecentSearches();
    const updated = current.filter(
      (u) => u.toLowerCase() !== username.toLowerCase()
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const clearRecentSearches = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch {
    return [];
  }
};