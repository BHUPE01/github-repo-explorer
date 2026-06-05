const express = require("express");
const router = express.Router();


const getUser = require("../controllers/githubController");
 const getRepos = require("../controllers/githubController");
const getLanguages  = require("../controllers/githubController");

router.get("/users/:username", getUser);
router.get("/users/:username/repos", getRepos);
router.get("/users/:username/languages", getLanguages);

module.exports = router;