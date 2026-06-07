# Studium Frontend

Studium is a study tracking web app frontend built with React and Vite. It gives users a place to sign up, log in, manage study subjects, review study session history, and view progress summaries through dashboard stats and charts.

This repository contains the browser client for Studium. It talks to a backend API for authentication, subject data, session history, and analytics.

## Features

- User login, registration, logout, and cookie-based session handling.
- Automatic access-token refresh through an Axios response interceptor.
- Dashboard overview with streak, recent session, daily and weekly session stats, completion rate, and paginated session history.
- Subject management screen with subject cards, summary totals, pagination, create/edit/delete modal components, and subject-specific history support.
- Chart components for monthly completed sessions and subject distribution.
- Timer screen and analytics placeholder components for future or in-progress workflows.

## Tech Stack

- React 19
- Vite 7
- React Router
- Axios
- Chart.js, React Chart.js 2, and Recharts
- ESLint

## Getting Started

### Prerequisites

- Node.js
- npm
- A running Studium backend API

### Install Dependencies

```bash
npm install
```

### Configure Environment

Copy the example environment file and update the backend API URL if needed:

```bash
cp .env.example .env.local
```

The frontend reads this value:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

If `VITE_API_BASE_URL` is not set, the app defaults to `http://localhost:8080`.

### Run Locally

```bash
npm run dev
```

Vite will print the local development URL in the terminal, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build in `dist`.

```bash
npm run preview
```

Serves the production build locally for previewing.

```bash
npm run lint
```

Runs ESLint across the project.

## Project Structure

```text
src/
  api/          API client, authentication calls, data queries, and mutations
  assets/       Static images used by the app
  components/   Reusable UI components such as charts, modals, cards, sidebar, and loading states
  context/      Shared loader context
  hooks/        Page and feature-specific React hooks
  pages/        Route-level screens such as login, signup, dashboard, subjects, timer, and analytics
  utils/        Small helpers for formatting and configuration
```

## Routes

The currently registered application routes are:

- `/` - login
- `/signup` - account registration
- `/dashboard` - study progress dashboard
- `/subjects` - subject management

## Backend API

The app expects the backend to expose endpoints under `/api/v1`, including authentication, dashboard data, subject data, session history, and analytics endpoints. Requests are configured with `withCredentials: true`, so the backend should support credentialed browser requests and the correct CORS configuration for local development.
