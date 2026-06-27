# ~/link-shortener (Frontend)

A clean, minimal React interface for generating secure short URLs.

This repository contains the client-side code, automatically deployed via Vercel. It communicates with a dedicated Node.js/Express REST API.

## Features

* **Real-Time Generation:** Asynchronous link shortening with instant UI feedback and loading states.
* **One-Click Copy:** Built-in clipboard API integration with visual success indicators.
* **Graceful Error Handling:** Catches and displays invalid URL formats and server-side errors directly in the UI.

## Tech Stack

* **Framework:** React.js (via Vite)
* **API Integration:** Native `fetch` API
* **State Management:** React Hooks (`useState`)
* **Deployment:** Vercel (Automated CI/CD Pipeline)