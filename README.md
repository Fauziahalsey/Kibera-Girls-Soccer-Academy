# Welcome to KGSA project

## Project info


## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Environment variables

This app uses Paystack and Flutterwave for credit card donations. Create a `.env` file for the backend and use the sample values in `.env.example`.

- `PAYSTACK_SECRET_KEY` — your Paystack secret key (backend only)
- `FLUTTERWAVE_SECRET_KEY` — your Flutterwave secret key (backend only)
- `FRONTEND_URL` — e.g. `http://localhost:8080`
- `VITE_PAYSTACK_PUBLIC_KEY` — your Paystack public key for the frontend
- `VITE_FLUTTERWAVE_PUBLIC_KEY` — your Flutterwave public key for the frontend
- `VITE_API_BASE_URL` — the backend API URL, e.g. `http://localhost:3000`

Make sure the backend is running separately on the configured API URL when testing card payments.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit them.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?



To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

# Kibera-Girls-Soccer-Academy

## Performance checks (Lighthouse)

You can run Lighthouse CI locally or via GitHub Actions which is included in `.github/workflows/lhci.yml`.

Run locally:

```bash
npm ci
npm run perf
```

This will run Lighthouse against `http://localhost:8080` by starting the dev server or serving `dist/` depending on configuration.

## Deploy to cPanel (static build)

1. Build:

```bash
npm run build
```

2. Upload the contents of `dist/` to your cPanel document root (e.g., `public_html/`), and ensure `.htaccess` and `index.html` are present.

