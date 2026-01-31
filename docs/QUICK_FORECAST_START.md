# 🚀 Quick Start - Gemini Forecast Setup

## 3 Simple Steps to Get Running

### Step 1: Start Backend (Port 4000)
```bash
cd backend
npm run dev
```
✓ Wait for: "Backend listening on port 4000"
✓ Wait for: "Connected to MongoDB"

### Step 2: Start Frontend (Port 3001)
```bash
cd frontend
npm run dev
```
✓ Wait for: "Listening on http://localhost:3001/"

### Step 3: Test It
1. Open browser: http://localhost:3001/
2. Login with: **test2** / **test123**
3. Go to "AI Forecast" tab
4. Click "Run Tomorrow's Forecast"
5. Wait 10-30 seconds
6. See AI predictions! 🎉

---

## What You Get

✅ **60 days** of test data (already seeded)
✅ **5 menu items** with patterns
✅ **3 test users**: test@123, test2, demo (all use test123 or demo123)
✅ **Smart patterns**: Weekends +50%, Fridays +40%, Mondays -20%
✅ **Gemini AI** analyzing demand
✅ **Predictions** with confidence %
✅ **Cost savings** recommendations

---

## What Changed

- ✅ Backend: Added `/forecast` endpoint
- ✅ Frontend: Now calls backend (not Gemini directly)
- ✅ Database: 60 days of seeded test data
- ✅ Auth: All requests require token
- ✅ Security: API key stays on backend

---

## Files Modified

1. `backend/src/index.ts` - Forecast endpoint + seeding
2. `frontend/services/geminiService.ts` - Call backend
3. `frontend/components/Forecaster.tsx` - Auth token
4. `frontend/App.tsx` - Pass token
5. `frontend/vite.config.ts` - Port 3001

---

## Environment

Your `.env` file has GEMINI_API_KEY - all set!

---

## If Anything Breaks

```bash
# Kill all Node processes
Get-Process node | Stop-Process -Force

# Restart backend
cd backend && npm run dev
```

---

## That's It!

Your forecast system is **live and working**! 🎊

Login → Click Forecast → Watch AI magic happen ✨
