# Medi.AI Complete Deployment Guide

## 1. Prerequisites
- Node.js 18+
- Railway, Vercel, or Render accounts
- OAuth credentials (Google, Microsoft, Apple)

## 2. Local Setup
```sh
cp .env.example .env
npm install
npm --workspace server run dev # Backend
npm --workspace web run dev    # Frontend
```

## 3. GitHub & CI/CD
- Push code to GitHub
- Use provided workflows in `.github/workflows/`

## 4. Railway (Backend)
- Connect repo, set env vars, deploy

## 5. Vercel (Frontend)
- Connect repo, set env vars, deploy

## 6. Render (Full-stack)
- Use `render.yaml` for configuration

## 7. Environment Variables
- See `.env.example`

## 8. Troubleshooting
- See logs in Railway/Vercel/Render dashboards

## 9. Support
- Contact: support@medi-ai.com
