# Algo Arena — Coding Interview Practice

A coding interview practice platform: a curated roadmap of classic algorithm problems with a real judge that runs your code.

- **150 curated problems** across **18 categories** (Arrays & Hash Tables → Bit Manipulation)
- **Library archive**: every problem from a public open-source archive of classic problems (2,786 problems, 1 → 3,623). **1,752 of them are fully solvable** — auto-generated, judge-validated tests with a workspace in Python, JavaScript and TypeScript (the rest are view-only: tree/linked-list/design problems whose solutions can't be auto-tested)
- **Real judge** that compiles and runs your code in **Python, JavaScript, TypeScript, Java, and C++** (local subprocesses — no external service)
- **Monaco editor** (VS Code's editor) with syntax highlighting, served fully offline from `/public/vs`
- **Run / Submit** with per-test results: expected vs. actual output, runtime errors, timeouts, and compile errors
- **Editorial solutions** with approach explanations and time/space complexity for every problem
- **Progress tracking** (solved/attempted, submissions history, streak) — per-account, stored as one JSON file per user (guests fall back to `localStorage`)
- **Dark / light mode**, shadcn UI components, fully responsive

![Homepage with stats, daily problem, and category overview](public/screenshots/home.png?v=2)

## Getting started

**Check these first — a plain clone needs more than `npm install`:**

1. **Node.js ≥ 24.** The server uses the built-in `node:sqlite` module; on older
   Node versions it fails to start. Verify with `node -v`.
2. **Judge runtimes.** The judge compiles your submissions with your *local*
   toolchain — nothing is bundled:

   | Submission language | Runtime you need |
   | --- | --- |
   | Python | `python3` |
   | JavaScript / TypeScript | `deno` (Node alone is not enough) |
   | Java | `javac` + `java` (a JDK) |
   | C++ | `g++` |

   On **Windows**, Python accepts `python3`, `py`, or `python`, and C++ needs
   a MinGW `g++` on PATH. If a runtime is missing natively, the judge falls
   back to running submissions inside **WSL2** (default distro), so a Windows
   machine with WSL2 and the runtimes installed there works too.

   Missing runtimes don't stop the app — that language's submissions just
   report a compile error in the workspace console.

**Zero-config option (recommended):** the Docker image bakes in Node 24 **and**
every judge runtime, so all 5 languages work out of the box:

```bash
docker compose up -d --build
```

**Run from a clone (one command does it all):**

```bash
git clone <repo-url>
cd algo-arena
npm run setup
```

`npm run setup` checks your Node version, installs dependencies, starts the dev
server, prints which judge languages are ready, and opens your browser.
Alternatives:

```bash
npm run setup:prod      # build once, then serve (production mode)
npm run setup:docker    # Docker image — every judge runtime included
```

Or do it by hand: `npm install && npm run dev`, then open
[http://localhost:3000](http://localhost:3000). Either way, the server prints a
banner at startup listing which judge languages are ready, so you can see at a
glance what's installed and what isn't.

## Self-hosting / deployment

The whole app — judge included — runs in a single container, so you can put it on any VPS or Docker host and users can practice without cloning anything.

```bash
docker compose up -d --build
```

- Serves on `http://<your-host>:3000`.
- The `Dockerfile` bakes in every judge runtime (Python, Deno for JS/TS, Java, C++), so all 5 languages work out of the box.
- Accounts (login only) live in a SQLite database at `./data/app.db` (mounted as a volume, so it survives rebuilds).
- **User progress is never kept in a unified database**: each account gets its own JSON file at `data/progress/<userId>.json` — the same file their Export/Import moves around.
- **Back up the `data/` directory** — it's the only state you have.
- Put a reverse proxy (Caddy, Nginx, Traefik) in front for HTTPS and a real domain.
- Node ≥ 24 is required at runtime (the app uses the built-in `node:sqlite` module).

### Security model

- **Judge submissions run as an unprivileged `judge` user** (uid/gid 1001), never as root, so malicious code can't read `/app/data` (accounts DB + every user's progress file) or the host. Each submission gets its own temp dir owned by that user (mode 770), so concurrent submissions can't read each other's files either. Set `JUDGE_UID`/`JUDGE_GID` to disable this in local dev; the compose file already does.
- **`/api/judge`, signup, signin, and verify-password are rate-limited** per IP (in-memory fixed window — fine for a single instance).
- **Code size is capped** (50 KB per submission).
- **`/api/audit` and `/api/debug` are dev-only tools and return 404 in production.**
- Passwords are **scrypt-hashed** (per-user salt); sessions are opaque random tokens in `httpOnly` cookies.
- **Known limits**: judge processes have wall-clock timeouts but no hard memory/CPU caps or network egress blocking — fine for a friendly community site, but if you expect hostile multi-tenant use, put the judge behind a real sandbox (gVisor, nsjail, or separate containers) or an external judging service.
- Rate-limit state is in-memory; scaling to multiple app instances needs a shared store (Redis) instead.

### Local development with accounts

```bash
npm install
npm run dev
```

Sign up from the navbar — progress is saved per account to `data/progress/<userId>.json`. Visitors who don't sign up keep their progress in `localStorage` only; it merges into their account the first time they sign in.

### Portable progress (export / import)

Users own their data. On the **Stats** page, signed-in users can **Export data** to download their solved problems, attempts and submissions, and anyone can **Import data** on this or any other instance to restore or merge it.

- **Exports are encrypted with the account password** (PBKDF2-SHA256 + AES-256-GCM, done client-side with the browser's Web Crypto — no keys stored anywhere). The same password unlocks the file on any machine, so a backup can't be read or imported without it.
- The inner payload includes the account email (never a plaintext password). Importing an encrypted backup asks for the unlock password first; the progress lands only after decryption (and, for signed-out users, sign-in) succeeds. Legacy unencrypted backups still import.
- Progress moves between machines without touching the database, so users can take their data with them and plug it into their own copy of the app.

## Pages

| Route | Description |
| --- | --- |
| `/` | Homepage with stats, daily problem, and category overview |
| `/problems` | Searchable, filterable list of all problems with status icons |
| `/library` | Complete archive (2,786 problems) with search and difficulty filter |
| `/library/[slug]` | Archive problem — judged ones open the full workspace (editor, Run/Submit, Solutions), the rest show the JS solution |
| `/roadmap` | Category roadmap: 18 categories with per-category progress |
| `/problems/[slug]` | Workspace: description, editor, console, Solutions & Submissions tabs |
| `/profile` | Stats page: difficulty breakdown, streak, category progress |

![Searchable problem list](public/screenshots/problems.png?v=2) ![2,786-problem library archive](public/screenshots/library.png?v=2) ![Category roadmap with progress](public/screenshots/roadmap.png?v=2)

## Architecture

```
src/
  app/
    api/judge/    POST judge endpoint (run/submit)
    api/audit/    dev-only: validates every problem's tests against its editorial solution
    problems/     list + workspace pages
  lib/
    judge/        harness.ts (per-language code generation), judge.ts (orchestration),
                  runner.ts (subprocess execution), compare.ts (output comparison)
    data/         problems/ (one file per category), categories.ts
    progress.tsx  progress context (auth, per-user storage keys, export/import)
    progress-store.ts  server-side per-user JSON files (data/progress/<userId>.json)
    db.ts         SQLite: accounts only (users + sessions)
    types.ts      shared types (Problem, InputType, JudgeOutcome, ...)
```

## How the judge works

`/api/judge` takes `{ slug, lang, code, mode }`. The harness generates a `Main` program per language that constructs each test case from literals, calls your `Solution`/function, serializes results as `@@RESULT` / `@@ERROR` markers, and runs it in an isolated subprocess (as the unprivileged `judge` user in Docker, with wall-clock timeouts). The judge parses those markers, compares outputs (with special handling for trees, graphs, linked lists, multi-answer any-order, and in-place `void` mutations), and returns a per-test verdict.

![Problem workspace: description, editor, console](public/screenshots/workspace.png?v=2)

## Data model

Each problem defines visible + hidden tests, per-language starter code and editorials, input types (`int[]`, `tree`, `graph`, `linked`, class specs for Tries, ...), and an output comparator. Hidden tests are validated automatically by `/api/audit`, which runs every editorial solution through the real judge.

## Welcome, students! 🎓

This project is **free and open for anyone to practice on** — no account, no sign-up, no paywall. Clone it, run it locally, and start grinding — you'll need **Node ≥ 24**
(`node -v`) and the language runtimes the judge compiles with (`python3`, `deno`
for JS/TS, `javac`/`java`, `g++`). Or skip all of that with
`npm run setup:docker`, which ships everything:

```bash
git clone <repo-url>
cd algo-arena
npm run setup
```

- **2,936 problems** to practice with: a curated 150-problem interview roadmap plus a 2,786-problem archive
- **5 languages** supported by the judge: Python, JavaScript, TypeScript, Java, and C++
- Every problem has editorial solutions with approach explanations and time/space complexity
- Your progress (solved, attempts, streak) is saved per account — or export it as a JSON file from the Stats page and import it anywhere

## Contributing

We'd love your help, whether you're a first-time open-source contributor or a seasoned dev. Good first contributions:

- **Add a problem** — drop a new file in `src/lib/data/problems/` with tests, starter code, and an editorial
- **Extend the judge** — support a new language in `src/lib/judge/`, or a new input type / output comparator
- **Improve the UI** — the workspace, library, roadmap, or profile pages (shadcn + Tailwind)
- **Fix a bug or a flaky test** — run `npm run build` and `npm run lint` before opening a PR
- **Write docs** — better README, category guides, or per-problem hints

### Getting started as a contributor

1. Fork the repo and clone your fork
2. Create a branch: `git checkout -b my-change`
3. Make your changes, then verify with `npm run build` and `npm run lint`
4. Open a pull request describing what you changed and why

> The judge runs code locally via subprocesses, so you'll need `python3`, `node`, `tsx`, `javac`/`java`, and `g++` installed to test those languages.

Happy coding! 🚀
