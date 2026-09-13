# LLD Practice Platform

A focused 2-day MVP for practicing Low-Level Design.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express.js
- Database: MongoDB (optional; the prototype runs with in-memory storage when MongoDB is unavailable)
- Evaluation: Rule-based evaluator + optional LLM adapter

## Run

### Backend
```bash
cd backend
npm install
npm run dev
```
Backend: http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

The frontend expects `VITE_API_URL=http://localhost:5000/api`.

## Optional MongoDB
Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/lld_practice
LLM_API_KEY=
```

Without MongoDB, the backend uses an in-memory repository, so the complete practice flow can still be demonstrated.

## Core flow
Choose problem -> Start attempt -> Design -> Submit -> Evaluate -> Feedback -> History -> Try again
