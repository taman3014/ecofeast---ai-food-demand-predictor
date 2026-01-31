# Backend scaffold for EcoFeast

Quick steps:

1. Change into the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Copy the example env and add your Gemini API key:

```bash
cp .env.example .env
# then edit .env
```

4. Run in development:

```bash
npm run dev
```

The server exposes `/health` and `/gemini-status` routes.
The server exposes `/records` (GET) and `/records` (POST) to store and fetch daily records in MongoDB.

MongoDB setup:

1. Set `MONGO_URI` in `backend/.env` (or `.env.local`) to your MongoDB connection string.
2. Optionally set `MONGO_DB_NAME` to select the DB name.

Example `.env` entries:

```text
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/your-db-name
MONGO_DB_NAME=ecofeast

Authentication:

1. Set `JWT_SECRET` in `backend/.env` to a secure random value (used to sign JWTs).

2. Endpoints:

 - `POST /auth/register` { username, password, email? } -> { token, user }
 - `POST /auth/login` { username, password } -> { token, user }

Include the token in requests that require auth (e.g. `POST /records`) as an `Authorization: Bearer <token>` header.

Example login flow (curl):

```bash
curl -X POST http://localhost:4000/auth/register \
	-H "Content-Type: application/json" \
	-d '{"username":"admin","password":"s3cret"}'

# then use token
curl -X POST http://localhost:4000/records \
	-H "Authorization: Bearer <token>" \
	-H "Content-Type: application/json" \
	-d '{ ... }'
```
```
