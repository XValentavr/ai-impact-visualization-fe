# AI Impact Visualization

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [npm](https://www.npmjs.com/)
- (Optional) [Docker](https://docs.docker.com/get-docker/) and 
[Docker Compose](https://docs.docker.com/compose/install/)

## Running Locally (Without Docker)

1. Ensure you have Node.js and npm installed on your **host machine**.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Running Locally (With Docker)

### 1. Using Docker Compose

1. **Install** Docker and Docker Compose if not already installed.

2. In the project root, run:
   ```bash
   docker-compose up --build
   ```
   This:
    - Builds the Docker image defined in the `Dockerfile`
    - Mounts your code (`.:/app`) into the container for hot reloading

---

## Production Build

For a production-optimized build (e.g., to host static files on a CDN or in a container), run:

```bash
npm run build
```

This outputs compiled files to the `dist/` folder.

If you’re using Docker, you can modify Dockerfile for multi-stage builds (one stage to build, another to serve via
Nginx). Or simply serve `dist/` with your preferred web server.
