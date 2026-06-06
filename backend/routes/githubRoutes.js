const express = require("express");
const router = express.Router();

const {
  getUser,
  getRepos,
  getLanguages,
} = require("../controllers/githubController");

router.get("/users/:username", getUser);
router.get("/users/:username/repos", getRepos);
router.get("/users/:username/languages", getLanguages);

module.exports = router;