# GitHub Repo Explorer

## Brief Description

This project is a full-stack GitHub Repository Explorer built as part of the Studio Graphene Full Stack Engineer assignment. The application allows users to search for any GitHub username and view profile information, public repositories, repository statistics, language usage, and additional repository details. The application includes server-side caching, pagination, loading states, error handling, recently searched users, repository sorting, and language visualization.

---

## Live Demo Links

Link : https://vercel.com/bhupe01s-projects/github-repo-explorer

---

## Tech Stack

### Frontend

* React.js

  * Component-based UI development.
* Vite

  * Fast development server and optimized builds.
* Axios

  * API communication.
* CSS Modules

  * Scoped component styling.
* Chart.js

  * Repository language visualization.

### Backend

* Node.js

  * JavaScript runtime.
* Express.js

  * REST API development.
* Axios

  * Communication with GitHub API.
* Node-Cache

  * In-memory caching with 60-second TTL.
* CORS

  * Cross-origin communication between frontend and backend.

### External APIs

* GitHub REST API

---

## Features

### Core Features

* Search GitHub users
* View profile information
* View public repositories
* Repository sorting:
  * By Name
  * By Stars
  * By Last Updated
* Error handling for invalid users
* Loading states and skeleton screens
* Responsive design

### Additional Features

* Server-side caching (60 seconds)
* Load More pagination
* Expand repository details
* Recently searched users (localStorage)
* Language usage chart
* Debounced search

---

## How To Run Locally

### Clone Repository

```bash
git clone https://github.com/BHUPE01/github-repo-explorer
cd github-repo-explorer
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
GITHUB_TOKEN=YOUR_GITHUB_TOKEN
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api/github
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Documentation

### Health Check

#### GET

```http
/health
```

Response:

```json
{
  "status": "ok",
  "timestamp": "2026-06-07T12:00:00.000Z"
}
```

---

### Get User Profile

#### GET

```http
/api/github/users/:username
```

Example:

```http
/api/github/users/BHUPE01
```

Response:

```json
{
  "login": "BHUPE01",
  "name": "BHUPE01",
  "bio": null,
  "avatar_url": "...",
  "followers": 3,
  "following": 18,
  "public_repos": 26,
  "html_url": "{https://github.com/BHUPE01}"
}
```

---

### Get Repositories

#### GET

```http
/api/github/users/:username/repos
```

Example:

```http
/api/github/users/BHUPE01/repos
```

Response:

```json
[
  {
    "id": 123,
    "name": "esg-platform",
    "description": "",
    "language": "Python",
    "stars": 0,
    "updated_at": "2026-06-01T00:00:00Z",
    "html_url": "[https://github.com/BHUPE01/esg-platform]"
  }
]
```

---

### Get Repository Languages

#### GET

```http
/api/github/users/:username/languages
```

Example:

```http
/api/github/users/HUPE01/languages
```

Response:

```json
{
  "Go": 6,
  "Python": 3
}
```

---

## Project Structure

```text
github-repo-explorer
│
├── backend
│   ├── config
│   │   ├── cache.js
│   │   └── github.js
│   │
│   ├── controllers
│   │   └── githubController.js
│   │
│   ├── middleware
│   │   ├── errorHandler.js
│   │   └── requestLogger.js
│   │
│   ├── routes
│   │   └── githubRoutes.js
│   │
│   ├── services
│   │   └── githubService.js
│   │
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   └── utils
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

## Caching Strategy

The backend uses Node-Cache with a 60-second TTL.

When the same username is requested again within 60 seconds:

* Data is returned from memory.
* No GitHub API request is made.
* Response time is reduced.
* GitHub rate limits are preserved.

---

## Error Handling

The application handles:

* Invalid usernames
* Non-existent GitHub users
* GitHub API failures
* Network failures
* GitHub rate limiting
* Unexpected server errors

---

## Next Steps

If given more time, I would add:

* Automated testing (Jest + React Testing Library)
* Repository search and filtering
* Infinite scrolling
* User profile sharing links
* Docker support
* Redis caching
* GitHub authentication (OAuth)
* Improved accessibility support
* Dark/light theme switching

---

## Author

Bhupendra Singh Pundir
