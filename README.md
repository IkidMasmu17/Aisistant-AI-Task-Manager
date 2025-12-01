# Aisistant

A personal task manager application with AI integration using Google Gemini and Firebase.

## Features

- **AI Task Suggestions**: Get intelligent task breakdowns and suggestions using Gemini API.
- **Task Management**: Create, read, update, and delete tasks.
- **Categories**: Organize tasks by categories.
- **Due Dates & Reminders**: Keep track of deadlines.
- **Analytics**: Visualize your productivity.
- **Dark/Light Mode**: Fully supported theming.

## Getting Started

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Copy `.env.local.example` to `.env.local` and fill in your keys:
    ```bash
    cp .env.local.example .env.local
    ```
    - Get Firebase config from your Firebase Console.
    - Get Gemini API key from Google AI Studio.

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Firebase (Firestore, Auth)
- Google Generative AI SDK
