# Recipe: Rails API + Vite React

This project is now split into:

- Rails backend API in this repository root.
- React frontend in `frontend/` powered by Vite.

## Run With Docker Compose

```bash
docker compose up --build
```

Services:

- Rails API: `http://localhost:3000`
- React frontend: `http://localhost:5173`
- Postgres: `localhost:5432`

Health endpoint from backend:

- `GET http://localhost:3000/api/v1/health`

The frontend container proxies `/api/*` calls to the Rails container.
Frontend dependencies are baked into `frontend/Dockerfile` and cached by image/layer.

## Run Without Docker

Backend:

1. Install gems:
   ```bash
   bundle install
   ```
2. Set up the database:
   ```bash
   bin/rails db:prepare
   ```
3. Start Rails API:
   ```bash
   bin/rails server
   ```

Frontend:

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start Vite:
   ```bash
   npm run dev
   ```
