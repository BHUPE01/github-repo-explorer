import { useState, useCallback } from "react";
import { getUser, getRepos, getLanguages } from "../services/api";
import { addRecentSearch } from "../utils/localStorage";

const REPOS_PER_PAGE = 10;

const useGithub = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUsername, setCurrentUsername] = useState("");

  const search = useCallback(async (username) => {
    const trimmed = username.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setLanguages({});
    setCurrentPage(1);
    setCurrentUsername(trimmed);

    try {
      const [userData, reposData] = await Promise.all([
        getUser(trimmed),
        getRepos(trimmed, 1, REPOS_PER_PAGE),
      ]);

      setUser(userData);

      // reposData is already an array
      setRepos(reposData);

      addRecentSearch(trimmed);

      getLanguages(trimmed)
        .then((langsData) => setLanguages(langsData))
        .catch(() => {});
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!currentUsername || loadMoreLoading) return;

    setLoadMoreLoading(true);

    try {
      const nextPage = currentPage + 1;

      const reposData = await getRepos(
        currentUsername,
        nextPage,
        REPOS_PER_PAGE
      );

      setRepos((prev) => [...prev, ...reposData]);
      setCurrentPage(nextPage);
    } catch (err) {
      setError(err);
    } finally {
      setLoadMoreLoading(false);
    }
  }, [currentUsername, currentPage, loadMoreLoading]);

  const reset = useCallback(() => {
    setUser(null);
    setRepos([]);
    setLanguages({});
    setError(null);
    setCurrentPage(1);
    setCurrentUsername("");
  }, []);

  return {
    user,
    repos,
    languages,
    loading,
    loadMoreLoading,
    error,
    currentUsername,
    search,
    loadMore,
    reset,
  };
};

export default useGithub;