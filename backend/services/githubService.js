const githubClient = require("../config/github");
const cache = require("../config/cache");

const CACHE_KEYS = {
  user: (username) => `user:${username.toLowerCase()}`,
  repos: (username, page, perPage) =>
    `repos:${username.toLowerCase()}:${page}:${perPage}`,
};

const fetchUser = async (username) => {
  const cacheKey = CACHE_KEYS.user(username);
  const cached = cache.get(cacheKey);
  if (cached) return { data: cached, fromCache: true };

  const response = await githubClient.get(`/users/${username}`);
  const user = {
    login: response.data.login,
    name: response.data.name,
    bio: response.data.bio,
    avatar_url: response.data.avatar_url,
    html_url: response.data.html_url,
    followers: response.data.followers,
    following: response.data.following,
    public_repos: response.data.public_repos,
    location: response.data.location,
    blog: response.data.blog,
    company: response.data.company,
    twitter_username: response.data.twitter_username,
    created_at: response.data.created_at,
  };

  cache.set(cacheKey, user);
  return { data: user, fromCache: false };
};

const fetchRepos = async (username, page = 1, perPage = 10) => {
  const cacheKey = CACHE_KEYS.repos(username, page, perPage);
  const cached = cache.get(cacheKey);
  if (cached) return { data: cached, fromCache: true };

  const response = await githubClient.get(`/users/${username}/repos`, {
    params: {
      per_page: perPage,
      page,
      sort: "updated",
      type: "public",
    },
  });

  const linkHeader = response.headers["link"] || "";
  const hasNextPage = linkHeader.includes('rel="next"');
  const totalCountHeader = response.headers["x-total-count"];

  const repos = response.data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    description: repo.description,
    html_url: repo.html_url,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    open_issues_count: repo.open_issues_count,
    watchers_count: repo.watchers_count,
    default_branch: repo.default_branch,
    updated_at: repo.updated_at,
    created_at: repo.created_at,
    topics: repo.topics || [],
    visibility: repo.visibility,
    fork: repo.fork,
    archived: repo.archived,
    license: repo.license ? repo.license.spdx_id : null,
  }));

  const result = { repos, hasNextPage, page, perPage };
  cache.set(cacheKey, result);
  return { data: result, fromCache: false };
};

const fetchAllRepoLanguages = async (username) => {
  const cacheKey = `langs:${username.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) return { data: cached, fromCache: true };

  let allRepos = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= 10) {
    const response = await githubClient.get(`/users/${username}/repos`, {
      params: { per_page: 100, page, type: "public" },
    });
    allRepos = allRepos.concat(response.data);
    const linkHeader = response.headers["link"] || "";
    hasMore = linkHeader.includes('rel="next"');
    page++;
  }

  const languageCounts = {};
  allRepos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] =
        (languageCounts[repo.language] || 0) + 1;
    }
  });

  cache.set(cacheKey, languageCounts);
  return { data: languageCounts, fromCache: false };
};

module.exports = { fetchUser, fetchRepos, fetchAllRepoLanguages };