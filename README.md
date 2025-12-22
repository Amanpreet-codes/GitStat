# 🚀 Git Stat (DevTracker)

A modern GitHub analytics dashboard that visualizes developer activity with commit trends, streak tracking, repository insights, and time-based statistics.

Built using **Next.js App Router**, **TypeScript**, and **Tailwind CSS**, with a focus on clean UX, server-first data fetching, and production-grade architecture.

---

## ✨ Features

- 🔐 **GitHub OAuth Authentication**
  - Secure login via GitHub using NextAuth - Separate OAuth apps for development and production

- 📊 **Dashboard Analytics**
  - Total repositories overview
  - Commit counts with configurable time windows
  - Per-repository commit breakdown
  - Commit streak tracking

- 📈 **Commit Trends**
  - Interactive line chart for commits over time
  - Fully responsive and dark-mode aware

- ⏱ **Time-Based Filtering**
  - activity for last 1 day, 3 days, week, month, or year
  - Client-side updates backed by server data

- 🌗 **Light / Dark Theme**
  - System-aware theme switching
  - Powered by `next-themes` + Tailwind CSS v4

- ⚡ **PerViewformance & UX**
  - Server Components for data fetching
  - Client Components only where required
  - Loading states and graceful fallbacks

---

## 🧠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Authentication:** NextAuth.js (GitHub Provider)
- **Charts:** Recharts
- **Theming:** next-themes
- **Deployment:** Vercel

---

## 🏗 Architecture Highlights

- Server-side data fetching using async Server Components
- Clear Server ↔ Client boundaries
- Client-only Providers for theming and interactivity
- Deterministic analytics (no unreliable AI summaries)
- Modular, reusable dashboard components

---

## 📂 Project Structure (Simplified)

```text
app/
    globals.css
    layout.tsx
    page.tsx
    api/
        auth/
            [...nextauth]/
                route.ts
        commit-counts/
            route.ts
    dashboard/
        page.tsx
        components/
            CommitsLineChart.tsx
            CommitsStatCard.tsx
            ProfileCard.tsx
            StatsCard.tsx
            StreaksCard.tsx
            TotalRepo.tsx
components/
    Header.tsx
    Footer.tsx
    Providers.tsx
lib/
    authOptions.ts
    chart.ts
    github.ts
    streaks.ts
types/
    next-auth.d.ts
```

---

## 🛠 Environment Variables

Create a `.env.local` file:

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

> ⚠️ Use **separate GitHub OAuth apps and secrets** for development and production.

---

## ▶️ Running Locally

```bash
npm install
npm run dev
```

Visit: `http://localhost:3000`

---

## 🚀 Deployment

Deployed on **Vercel** with:

- Environment-specific secrets
- GitHub OAuth production callback URL
- Optimized server-side rendering

---

## 🧩 Future Improvements

- Weekly activity summaries
- Language usage breakdown
- Repository-level drill-down views
- Exportable activity reports

---
