# Project Roadmap

## Phase 1: Database Infrastructure and Initial Configuration
- [ ] Task 1.1: Install PostgreSQL client (`pg`, `@types/pg`) and remove `better-sqlite3`. Update `package.json`.
- [ ] Task 1.2: Update `.env.example` and create a connection string placeholder for PostgreSQL.
- [ ] Task 1.3: Refactor `backend/src/db/index.ts` to initialize and export a PostgreSQL connection pool (`pg.Pool`), and update the initialization schema.

## Phase 2: Refactor DB Seeding
- [ ] Task 2.1: Update `backend/src/db/seed.ts` to use async PostgreSQL queries instead of synchronous SQLite queries, adjusting the parameterized SQL bindings.

## Phase 3: Data Access Layer Refactor - Routes
- [ ] Task 3.1: Refactor `backend/src/routes/auth.ts` to use `pg` async queries.
- [ ] Task 3.2: Refactor `backend/src/routes/sessions.ts` to use `pg` async queries.
- [ ] Task 3.3: Refactor `backend/src/routes/cards.ts` to use `pg` async queries.
- [ ] Task 3.4: Refactor `backend/src/routes/assessments.ts` to use `pg` async queries.
- [ ] Task 3.5: Refactor `backend/src/routes/analytics.ts` to use `pg` async queries.
- [ ] Task 3.6: Refactor `backend/src/routes/ai.ts` to use `pg` async queries.

## Phase 4: Data Access Layer Refactor - Sockets and Game Loop
- [ ] Task 4.1: Refactor `backend/src/socket/gameHandler.ts` to use `pg` async queries for game events (turn completions, score updates, etc.).

## Phase 5: Verification and Finalization
- [ ] Task 5.1: Run the backend and ensure all endpoints respond successfully using Postman/curl and that WebSocket events emit properly.
