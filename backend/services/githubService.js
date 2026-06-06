const githubClient = require("../config/github");
const cache = require("../config/cache");

const fetchUser = async (username) => {
  const cacheKey = `user:${username}`;

  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const response = await githubClient.get(`/users/${username}`);

  const user = {
    login: response.data.login,
    name: response.data.name,
    bio: response.data.bio,
    avatar_url: response.data.avatar_url,
    followers: response.data.followers,
    following: response.data.following,
    public_repos: response.data.public_repos,
    html_url: response.data.html_url,
  };

  cache.set(cacheKey, user);

  return user;
};

const fetchRepos = async (username) => {
  const cacheKey = `repos:${username}`;

  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const response = await githubClient.get(
    `/users/${username}/repos`
  );

  const repos = response.data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    updated_at: repo.updated_at,
    html_url: repo.html_url,
    open_issues: repo.open_issues_count,
    default_branch: repo.default_branch,
  }));

  cache.set(cacheKey, repos);

  return repos;
};

const fetchLanguages = async (username) => {
  const repos = await fetchRepos(username);

  const languages = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] =
        (languages[repo.language] || 0) + 1;
    }
  });

  return languages;
};

module.exports = {
  fetchUser,
  fetchRepos,
  fetchLanguages,
};