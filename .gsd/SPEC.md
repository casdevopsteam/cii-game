# Specification: Database Migration to PostgreSQL

## Objective
Migrate the "CII CWL Inclusive Tycoon" backend from the synchronous, file-based `better-sqlite3` database to a robust, asynchronous `PostgreSQL` database to allow for better scalability and concurrent multiplayer performance.

## Status: FINALIZED

## Scope of Work
1. **Infrastructure & Configuration**:
   - Update `backend/package.json` to remove `better-sqlite3` and install PostgreSQL client dependencies (`pg` and `@types/pg`).
   - Add a `DATABASE_URL` or equivalent environment variables to `.env` for connection configuration.
2. **Database Initialization Layer**:
   - Refactor `backend/src/db/index.ts` to connect to PostgreSQL.
   - Refactor the table creation schemas to be PostgreSQL-compliant (e.g., changing `INTEGER` to `INT`, `DATETIME` to `TIMESTAMP`, etc., although Postgres accepts standard SQL).
3. **Seeding Script**:
   - Refactor `backend/src/db/seed.ts` to run asynchronous SQL queries using the new pg client.
4. **Data Access Layers (Routes & Sockets)**:
   - Identify all usages of the synchronous `db.prepare(...).get()`, `.all()`, or `.run()` across all files in `backend/src/routes/` and `backend/src/socket/`.
   - Convert all these usages to asynchronous `await db.query(...)` calls.
   - Ensure parameterized queries use `$1, $2` syntax (or parameterized inputs based on the library) instead of SQLite's `?` or `@param` syntax.

## Technical Constraints
- The schema structure and business logic must remain exactly the same.
- No changes will be made to the frontend architecture or logic; the REST API and WebSocket payloads must remain strictly identical.
- The GSD methodology (atomic commits per task) must be followed during execution.
