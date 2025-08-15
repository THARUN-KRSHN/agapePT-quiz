# Agape Quiz: Personality Development Test App

This is a full-stack Personality Development Test Application built with Next.js 14 (App Router) and designed for single-app deployment on Vercel.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Email Configuration](#email-configuration)
- [Project Structure](#project-structure)

## Features

- **Frontend:**
  - Next.js 14 (App Router)
  - Material UI for modern and responsive UI.
  - Framer Motion for smooth animations and transitions.
  - Responsive design for mobile, tablet, and desktop.
  - Previous and Next buttons for quiz navigation.
  - Progress tracker for quiz completion.
  - Motivational messages and engaging elements between questions.
- **Backend:**
  - Next.js API routes for all logic.
  - SQLite with Prisma ORM for data storage.
  - Dynamic fetching and shuffling of quiz questions.
  - Logic for calculating personality insights based on responses.
  - Server-side PDF generation for personalized results.
  - Email notification for new quiz submissions.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Material UI, Framer Motion
- **Backend:** Next.js API Routes, Prisma ORM, SQLite
- **PDF Generation:** pdfkit
- **Email Sending:** Nodemailer

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18.x or higher)
- npm (v8.x or higher)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd agapequiz
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This command will also run the Prisma migrations and seed the database with initial questions.

### Environment Variables

Create a `.env` file in the root of your project and add the following environment variables. Replace the placeholder values with your actual configuration.

```env
DATABASE_URL="file:./dev.db"

# Email Configuration for Nodemailer
EMAIL_HOST="your_email_host"       # e.g., smtp.gmail.com
EMAIL_PORT="your_email_port"       # e.g., 587 (for TLS) or 465 (for SSL)
EMAIL_USER="your_email_user"       # Your email address
EMAIL_PASS="your_email_password"   # Your email password or app-specific password
EMAIL_TO="recipient_email@example.com" # The email address to send submission logs to
```

**Note on EMAIL_PASS:** If you are using Gmail, you may need to generate an \"App password\" instead of using your regular Gmail password, especially if you have 2-Factor Authentication enabled. Refer to your email provider's documentation for generating app-specific passwords.

### Running Locally

To start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Database Management (Optional)

To open Prisma Studio and view your database:

```bash
npx prisma studio
```

## Deployment

This application is configured for single-app deployment on Vercel.

1.  **Install Vercel CLI (if not already installed):**
    ```bash
    npm install -g vercel
    ```

2.  **Login to Vercel:**
    ```bash
    vercel login
    ```

3.  **Deploy your project:**
    ```bash
    vercel deploy
    ```
    Follow the prompts to configure your project. Remember to add your environment variables (especially email configuration) in the Vercel project settings under "Environment Variables".

4.  **For production deployments, use:**
    ```bash
    vercel --prod
    ```

## Email Configuration Guide

The application uses Nodemailer to send submission logs to a specified email address. Ensure your `.env` file (and Vercel environment variables for deployment) are correctly configured.

-   **EMAIL_HOST:** Your SMTP server host (e.g., `smtp.gmail.com`, `smtp.mail.yahoo.com`).
-   **EMAIL_PORT:** The port for your SMTP server. Common ports are `587` for TLS (recommended) or `465` for SSL.
-   **EMAIL_USER:** The email address you want to send emails from.
-   **EMAIL_PASS:** The password for the `EMAIL_USER`. If using Gmail with 2FA, use an App Password.
-   **EMAIL_TO:** The recipient email address where submission logs will be sent.

## Project Structure

```
agapequiz/
├── app/
│   ├── api/
│   │   ├── questions/          # API route for fetching quiz questions
│   │   │   └── route.ts
│   │   ├── submission/         # API route for fetching single submission
│   │   │   └── route.ts
│   │   └── submit/             # API route for submitting quiz responses
│   │       └── route.ts
│   │   └── pdf/                # API route for generating PDF results
│   │       └── route.ts
│   ├── components/           # React components for the frontend
│   │   ├── LandingPage.tsx
│   │   ├── NameAgeCollection.tsx
│   │   ├── QuizLayout.tsx
│   │   └── ResultPage.tsx
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout for Next.js app
│   ├── page.tsx                # Main application page managing quiz flow
│   └── theme.ts                # Material UI custom theme definitions
├── prisma/
│   ├── migrations/             # Database migration files
│   │   └── ...
│   ├── schema.prisma           # Prisma schema definition
│   └── seed.ts                 # Script to seed the database with questions
├── public/                     # Static assets
├── .env.example                # Example environment variables file (create .env from this)
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md                   # Project README
└── tsconfig.json
```
