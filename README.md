# 🎬 NetflixGPT — AI-Powered Movie Discovery Platform

<p align="center">
  <img
    src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
    width="180"
    alt="NetflixGPT"
  />
</p>

<p align="center">
  <strong>A Netflix-inspired movie discovery platform powered by React, Redux, Firebase, TMDB and Google Gemini AI.</strong>
</p>

<p align="center">
  <a href="https://netflix-grnsjnu02-arpitsinhs-projects.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo"/>
  </a>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Redux%20Toolkit-State%20Management-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux"/>
  <img src="https://img.shields.io/badge/Tailwind%20CSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TMDB-API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" alt="TMDB"/>
  <img src="https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini"/>
  <img src="https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel" alt="Vercel"/>
</p>

---

## 🌐 Live Application

### 🚀 [Open NetflixGPT](https://netflix-gpt-peach-kappa.vercel.app/)

The application is deployed on Vercel and provides a responsive Netflix-style movie browsing experience with AI-powered movie recommendations.

---

# 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Application Preview](#-application-preview)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Application Flow](#-application-flow)
- [Authentication](#-authentication)
- [Movie Data](#-movie-data)
- [AI Movie Recommendation](#-ai-movie-recommendation)
- [State Management](#-state-management)
- [API Architecture](#-api-architecture)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Local Development](#-local-development)
- [Production Deployment](#-production-deployment)
- [Security](#-security)
- [Performance](#-performance)
- [Error Handling](#-error-handling)
- [Known Limitations](#-known-limitations)
- [Future Roadmap](#-future-roadmap)
- [Learning Outcomes](#-learning-outcomes)
- [Contributing](#-contributing)
- [License](#-license)
- [Disclaimer](#-disclaimer)
- [Author](#-author)

---

# 🎯 Overview

**NetflixGPT** is a full-stack movie discovery application inspired by the Netflix user experience.

The project combines a modern React frontend with third-party movie data, Firebase authentication and generative AI to provide users with a personalized movie discovery experience.

Unlike a traditional movie search application, NetflixGPT allows users to describe what they want to watch using natural language.

For example:

> "I want a mind-bending science-fiction movie."

or:

> "Suggest some movies like Interstellar."

The application sends the request to **Google Gemini**, receives movie recommendations, and then searches those recommendations through **The Movie Database (TMDB)** to retrieve real movie information and posters.

---

# ✨ Key Features

## 🔐 Authentication

- Firebase Authentication
- User login and registration
- Persistent authentication state
- Automatic route handling
- User profile information
- Profile image support
- Secure logout
- Authentication state synchronized with Redux

---

## 🎬 Movie Discovery

The main browsing interface provides multiple movie categories.

Examples include:

- Now Playing
- Popular Movies
- Top Rated
- Upcoming Movies
- Movie Recommendations

Each category is displayed as a horizontally scrollable movie carousel.

---

## 🎥 Movie Trailers

Movie trailer information is fetched from TMDB.

The application:

1. Identifies the selected movie.
2. Requests available videos.
3. Filters the available videos.
4. Selects a trailer when available.
5. Displays the trailer through an embedded video player.

---

## 🤖 AI-Powered Movie Search

The GPT Search feature is one of the main components of the project.

Users can enter natural-language requests such as:

```text
Movies like Inception