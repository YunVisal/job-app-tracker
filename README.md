# Job Application Tracker

A web app for tracking job applications from "applied" through to "offer" —
so you always know where you stand and what needs a follow-up.

**Live demo:** [job-app-tracker-delta.vercel.app](https://job-app-tracker-delta.vercel.app)

## Features
- Add applications with company, role, and the date you applied
- Track status as it moves: applied → interviewing → offer / rejected
- Keep notes per application (recruiter name, salary range, interview prep)
- Edit and delete entries

## Tech stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** PostgreSQL
- **Hosting:** Vercel

## Why I built it
I was running my own job search across spreadsheets and browser tabs and kept
losing track of which applications needed a follow-up. This is the tool I wanted.

## Status
Currently single-user. Multi-user accounts with authentication are next.

## Running locally
```bash
git clone https://github.com/YunVisal/job-app-tracker.git
cd job-app-tracker
npm install
cp .env.example .env   # add your database URL
npm run dev
```