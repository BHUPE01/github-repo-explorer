const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.path}:`, err.message);

  if (err.response) {
    const status = err.response.status;
    const headers = err.response.headers;

    if (status === 404) {
      return res.status(404).json({
        error: "User not found",
        message: "The GitHub username you entered does not exist.",
        code: "USER_NOT_FOUND",
      });
    }

    if (status === 403) {
      const rateLimitRemaining = headers["x-ratelimit-remaining"];
      const rateLimitReset = headers["x-ratelimit-reset"];
      const resetTime = rateLimitReset
        ? new Date(rateLimitReset * 1000).toISOString()
        : null;

      return res.status(429).json({
        error: "GitHub API rate limit exceeded",
        message:
          "You have hit GitHub's API rate limit. Please try again later or add a GitHub token.",
        code: "RATE_LIMIT_EXCEEDED",
        resetTime,
        remaining: rateLimitRemaining,
      });
    }

    if (status === 401) {
      return res.status(401).json({
        error: "GitHub API authentication failed",
        message: "Invalid or expired GitHub token configured on the server.",
        code: "AUTH_FAILED",
      });
    }

    return res.status(status).json({
      error: "GitHub API error",
      message: err.response.data?.message || "An unexpected error occurred.",
      code: "GITHUB_ERROR",
    });
  }

  if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
    return res.status(504).json({
      error: "Request timeout",
      message: "The GitHub API took too long to respond. Please try again.",
      code: "TIMEOUT",
    });
  }

  if (err.code === "ENOTFOUND" || err.code === "ECONNREFUSED") {
    return res.status(503).json({
      error: "Network error",
      message: "Unable to reach GitHub API. Please check your connection.",
      code: "NETWORK_ERROR",
    });
  }

  return res.status(500).json({
    error: "Internal server error",
    message: "Something went wrong on the server.",
    code: "INTERNAL_ERROR",
  });
};

module.exports = errorHandler;