# Patient Notes

This repository contains a full stack solution for patient management and clinical notes, with support for text and audio notes (transcription + automatic summarization).

## Project structure

```text
.
|-- docker-compose.yml
|-- patient_notes_backend/
|-- patient_notes_frontend/
```

## Environment variables

Before starting the environment, create the `.env` files from the examples:

1. Root (Docker Compose / LocalStack auth):
   - Copy `.env.example` to `.env`
   - Set your own LocalStack auth token in `LOCALSTACK_AUTH_TOKEN`
2. Backend:
   - Copy `patient_notes_backend/.env.example` to `patient_notes_backend/.env`
3. Frontend:
   - Copy `patient_notes_frontend/.env.example` to `patient_notes_frontend/.env`

### Root (`.env`)

- `LOCALSTACK_AUTH_TOKEN`: your own LocalStack API/auth token. Do not commit this token.

### Backend (`patient_notes_backend/.env`)

- `PORT`: internal API port (default `4000`).
- `FRONTEND_URL`: CORS allowed origin (in Docker Compose this can be `http://localhost`).
- `DATABASE_CONNECTION_STRING`: PostgreSQL connection string (`postgres://postgres:postgres@postgres:5432/appdb`).
- `API_VERSION`: API version used as route prefix (example `v1`).
- `OPEN_ROUTER_KEY`: API key used to generate summaries.
- `SUMMARY_MODEL`: model used for summarization.
- `OPENAI_BASE_URL`: base URL for the OpenAI-compatible provider (OpenRouter).
- `DEEPGRAM_API_KEY`: API key used for audio transcription.
- `TRANSCRIPTION_MODEL`: transcription model.
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`: S3 credentials/region.
- `AUDIO_BUCKET_NAME`: bucket where audio files are uploaded.
- `AUDIO_FILE_PATH`: logical audio path prefix (currently informational).
- `AWS_ENDPOINT_URL`: S3 endpoint, in compose `http://localstack:4566`.

### Frontend (`patient_notes_frontend/.env`)

- `VITE_API_URL`: backend base URL exposed to the browser.
  - With Docker Compose: `http://localhost:4000/api/v1`

## Architecture guidelines

### Backend (Node.js + Express + Sequelize)

The backend follows a layered architecture:

1. **Routing** (`src/routes`)
   - Defines HTTP endpoints, request parsing, and response status handling.
   - Does not contain complex business logic.
2. **Services** (`src/services`)
   - Orchestrates use cases.
   - Integrates repositories, AI/transcription utilities, and S3 storage.
3. **Repository** (`src/repository`)
   - Encapsulates data access (Sequelize and S3).
   - Isolates persistence details from the rest of the application.
4. **Models** (`src/models`)
   - Defines ORM entities and relationships.
5. **Config** (`src/config`)
   - Centralizes environment config, DB, OpenAI/OpenRouter client, multer, and S3.
6. **Utils** (`src/utils`)
   - External infrastructure functions (AI summary and transcription).

#### Audio note flow

1. A multipart request enters through `POST /notes/audio/:patientId`.
2. `multer` keeps the file in memory.
3. The service transcribes audio with Deepgram.
4. The service generates a summary with OpenRouter.
5. The service uploads the audio to S3 (LocalStack in local).
6. The repository persists the note in PostgreSQL.

### Frontend (React + Vite + React Router + Axios)

The frontend is organized by feature modules and a shared layer:

1. **Shared layer** (`src/common`)
   - `api/`: Axios client and backend access functions.
   - `types/`: shared typed contracts.
   - `components/`: reusable layout and UI.
   - `utils/`: environment variable reading (`envs`).
2. **Feature modules** (`src/views`)
   - `Notes` and `Patients` have their own router and internal views.
   - Each view uses dedicated hooks to manage state, loading, and errors.
3. **Navigation**
   - The root router mounts `AppLayout` and delegates to feature routers.

#### Practical guidelines

- Keep network logic in `common/api`, not inside components.
- Keep view state in hooks (`useXxx`) for more declarative components.
- Respect feature-based separation to scale without tightly coupling modules.

## How to run everything together with Docker Compose

Requirements:

- Docker
- Docker Compose

Steps:

1. Create `.env` files from `.env.example` in root, backend, and frontend.
2. From the repository root, build and start services:

```bash
docker compose up --build
```

Services started:

- `frontend`: Nginx serving the React app at `http://localhost`
- `backend`: Express API at `http://localhost:4000`
- `postgres`: PostgreSQL database at `localhost:5432`
- `localstack`: S3 emulator at `localhost:4566`
- `s3-init`: initializes bucket `my-bucket` if it does not exist

To stop:

```bash
docker compose down
```

To stop and remove DB volumes:

```bash
docker compose down -v
```

## Base endpoints

With `API_VERSION=v1`, the backend base URL is:

- `http://localhost:4000/api/v1`

Available resources:

- `/patients`
- `/notes`
