const {
  fetchUser,
  fetchRepos,
  fetchLanguages,
} = require("../services/githubService");

const getUser = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await fetchUser(username);

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

const getRepos = async (req, res) => {
  try {
    const username = req.params.username;

    const repos = await fetchRepos(username);

    res.json(repos);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch repos",
    });
  }
};

const getLanguages = async (req, res) => {
  try {
    const username = req.params.username;

    const languages = await fetchLanguages(username);

    res.json(languages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch languages",
    });
  }
};

module.exports = {
  getUser,
  getRepos,
  getLanguages,
};