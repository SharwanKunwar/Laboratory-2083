# Ngrok Setup Guide — Expose Local REST API to the Internet

> **Environment:** Kali Linux  
> **Use Case:** Share a locally running Spring Boot REST API via a public URL using Ngrok  
> **Goal:** Connect a Vercel-deployed frontend to a local backend through Ngrok tunnel

---

## Table of Contents

- [What is Ngrok?](#what-is-ngrok)
- [Prerequisites](#prerequisites)
- [Step 1 — Install Ngrok on Kali Linux](#step-1--install-ngrok-on-kali-linux)
- [Step 2 — Create a Free Ngrok Account](#step-2--create-a-free-ngrok-account)
- [Step 3 — What is an Authtoken?](#step-3--what-is-an-authtoken)
- [Step 4 — Configure Authtoken](#step-4--configure-authtoken)
- [Step 5 — Get Your Free Static Domain](#step-5--get-your-free-static-domain)
- [Step 6 — Start Your Local REST API](#step-6--start-your-local-rest-api)
- [Step 7 — Start Ngrok Tunnel](#step-7--start-ngrok-tunnel)
- [Step 8 — Test the Tunnel](#step-8--test-the-tunnel)
- [Step 9 — Fix CORS in Spring Boot](#step-9--fix-cors-in-spring-boot)
- [Step 10 — Use Ngrok URL in Vercel Frontend](#step-10--use-ngrok-url-in-vercel-frontend)
- [How to Turn Ngrok ON and OFF](#how-to-turn-ngrok-on-and-off)
- [Personal Cheatsheet](#personal-cheatsheet)
- [Common Errors and Fixes](#common-errors-and-fixes)
- [Important Limitations](#important-limitations)

---

## What is Ngrok?

Ngrok is a tool that creates a **secure tunnel** from the public internet to a server running on your local machine.

When your REST API is running on `localhost:8080`, it is only accessible on your own computer. Ngrok gives it a **public URL** (like `https://abc123.ngrok-free.app`) that anyone on the internet can reach — instantly, without any server deployment or DNS configuration.

```
User / Vercel App → Ngrok Servers → Encrypted Tunnel → Your localhost
```

---

## Prerequisites

- Kali Linux machine
- Spring Boot REST API running locally
- A free Ngrok account
- A Vercel-deployed frontend (optional)

---

## Step 1 — Install Ngrok on Kali Linux

### Method 1: Direct Download (Recommended)

```bash
# Download the latest ngrok for Linux amd64
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz

# Extract it
tar -xvzf ngrok-v3-stable-linux-amd64.tgz

# Move to /usr/local/bin so you can run it from anywhere
sudo mv ngrok /usr/local/bin/ngrok

# Verify installation
ngrok version
```

### Method 2: Snap

```bash
sudo apt install snapd -y
sudo snap install ngrok
```

### Fix: If ngrok command not found

```bash
export PATH=$PATH:/usr/local/bin

# Make it permanent
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc
source ~/.bashrc
```

---

## Step 2 — Create a Free Ngrok Account

1. Go to [https://ngrok.com](https://ngrok.com)
2. Click **Sign Up** (you can use Google)
3. After login, you will land on the Ngrok dashboard

---

## Step 3 — What is an Authtoken?

An **authtoken** is a unique key that links your Ngrok tunnel to your account.  
Without it, Ngrok won't know who you are and will block you from using features like static domains.

> Think of it like a password that says **"this Ngrok tunnel belongs to me"**.

### How to get your Authtoken

1. Go to: [https://dashboard.ngrok.com/get-started/your-authtoken](https://dashboard.ngrok.com/get-started/your-authtoken)
2. You will see a long token like:
   ```
   2abc3XYZsomeLongRandomString_anotherPart
   ```
3. Click the **Copy** button next to it

> ⚠️ **Treat your authtoken like a password. Never share it publicly.**  
> If accidentally shared, go to the dashboard and click **Regenerate** immediately.

---

## Step 4 — Configure Authtoken

Run this command once on your machine:

```bash
ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
```

You should see:

```
Authtoken saved to configuration file: /root/.config/ngrok/ngrok.yml
```

You only need to do this **once**. To verify it was saved:

```bash
cat ~/.config/ngrok/ngrok.yml
```

---

## Step 5 — Get Your Free Static Domain

A static domain gives you a **permanent URL that never changes** every time you restart Ngrok.

1. Go to: [https://dashboard.ngrok.com/cloud-edge/domains](https://dashboard.ngrok.com/cloud-edge/domains)
2. You will see a free domain already assigned, like:
   ```
   tushed-thunderingly-jenee.ngrok-free.dev
   ```
3. Copy it — you will use this every time you start the tunnel

> If you don't see any domain, click **"New Domain"** or **"Claim your free domain"** and it will auto-generate one.

---

## Step 6 — Start Your Local REST API

Make sure your backend is running before starting Ngrok.

```bash
# Spring Boot
./mvnw spring-boot:run
# Runs on http://localhost:8080
```

Verify it works locally:

```bash
curl http://localhost:8080/api/deathnote
```

---

## Step 7 — Start Ngrok Tunnel

```bash
ngrok http --domain=tushed-thunderingly-jenee.ngrok-free.dev 8080
```

> Replace `8080` with your actual port if different.

You should see output like:

```
Session Status    online
Account           yourname@email.com
Forwarding        https://tushed-thunderingly-jenee.ngrok-free.dev -> http://localhost:8080
Web Interface     http://127.0.0.1:4040
```

**Keep this terminal open.** Closing it will stop the tunnel.

---

## Step 8 — Test the Tunnel

Open a new terminal and run:

```bash
curl -H "ngrok-skip-browser-warning: true" \
     https://tushed-thunderingly-jenee.ngrok-free.dev/api/deathnote
```

Expected response — your actual API data:

```json
{"timestamp":"2026-05-31T05:57:01.433Z", ...}
```

> A `404 Not Found` at the root path `/` is **normal** — it means the tunnel is working but there is no endpoint at `/`.

### Inspect Requests in Real Time

Open this in your browser:

```
http://localhost:4040
```

You will see every request and response going through your tunnel live.

---

## Step 9 — Fix CORS in Spring Boot

Since your Vercel app (`https://your-app.vercel.app`) is calling your local API, you **must enable CORS** on your backend. Otherwise the browser will block the request.

### Option A — Per Controller (Quick)

```java
@CrossOrigin(origins = "*")
@RestController
public class DeathNoteController {
    // your endpoints
}
```

### Option B — Global Config (Recommended)

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("https://your-app.vercel.app")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
```

> Replace `https://your-app.vercel.app` with your actual Vercel URL.  
> Restart your Spring Boot app after adding CORS config.

---

## Step 10 — Use Ngrok URL in Vercel Frontend

Replace `http://localhost:8080` with your Ngrok URL wherever your frontend makes API calls.

### React with fetch

```js
const response = await fetch(
  "https://tushed-thunderingly-jenee.ngrok-free.dev/api/deathnote",
  {
    headers: {
      "ngrok-skip-browser-warning": "true"  // Required!
    }
  }
);
const data = await response.json();
```

### React with axios

```js
const response = await axios.get(
  "https://tushed-thunderingly-jenee.ngrok-free.dev/api/deathnote",
  {
    headers: {
      "ngrok-skip-browser-warning": "true"  // Required!
    }
  }
);
```

### Set as Environment Variable in Vercel

1. Go to your project on [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Settings → Environment Variables**
3. Add:
   ```
   Name:   VITE_API_URL
   Value:  https://tushed-thunderingly-jenee.ngrok-free.dev
   ```
4. Click **Save** and redeploy your Vercel app

> The `ngrok-skip-browser-warning: true` header is required. Without it, Ngrok returns an HTML warning page instead of your JSON data when called from code.

---

## How to Turn Ngrok ON and OFF

### Turn OFF

In the terminal where Ngrok is running, press:

```
Ctrl + C
```

The tunnel is immediately closed and your API is no longer public.

### Turn ON

Run this command anytime:

```bash
ngrok http --domain=tushed-thunderingly-jenee.ngrok-free.dev 8080
```

Since you have a static domain, the URL is always the same.

### Run Ngrok in Background (Optional)

```bash
# Start in background
nohup ngrok http --domain=tushed-thunderingly-jenee.ngrok-free.dev 8080 &

# Check if running
ps aux | grep ngrok

# Stop it
pkill ngrok
```

### Using tmux (Recommended for Background Use)

```bash
# Install tmux
sudo apt install tmux -y

# Start a named session
tmux new -s ngrok-session

# Run ngrok inside it
ngrok http --domain=tushed-thunderingly-jenee.ngrok-free.dev 8080

# Detach (keep it running in background)
# Press Ctrl+B, then D

# Reattach later
tmux attach -t ngrok-session
```

---

## Personal Cheatsheet

```bash
# ✅ START (always start Spring Boot first, then ngrok)
./mvnw spring-boot:run
ngrok http --domain=tushed-thunderingly-jenee.ngrok-free.dev 8080

# ✅ STOP
Ctrl + C

# ✅ TEST via curl
curl -H "ngrok-skip-browser-warning: true" \
     https://tushed-thunderingly-jenee.ngrok-free.dev/api/deathnote

# ✅ INSPECT requests live
open http://localhost:4040

# ✅ CHECK if ngrok is running in background
ps aux | grep ngrok

# ✅ FORCE STOP background ngrok
pkill ngrok
```

### Correct Startup Order

```
1. Start Spring Boot first
2. Then start Ngrok
3. When done — Ctrl+C Ngrok first, then stop Spring Boot
```

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| `ERR_NGROK_108` | Authtoken not configured | Re-run `ngrok config add-authtoken YOUR_TOKEN` |
| CORS error in browser | CORS not configured in backend | Add `@CrossOrigin` or global CORS config (Step 9) |
| 502 Bad Gateway | Local API is not running | Start Spring Boot first (Step 6) |
| 404 at root `/` | No endpoint at `/` — normal | Test your actual endpoint e.g. `/api/deathnote` |
| Ngrok returns HTML page | Missing header in request | Add `ngrok-skip-browser-warning: true` header |
| Old URL still used on Vercel | Env variable not updated | Update Vercel env variable and redeploy |
| Port already in use | Another process using the port | Run `sudo lsof -i :8080` then `sudo kill -9 <PID>` |

---

## Important Limitations

| Limitation | Detail |
|---|---|
| **Machine must stay on** | If you close your laptop or stop Ngrok, the API goes offline |
| **Not for production** | Ngrok is for development and testing only |
| **Free plan limits** | Request limits apply on the free tier |
| **Static domain** | Free accounts get one free static domain from the dashboard |

> For production, deploy your API to a service like **Railway**, **Render**, or a **VPS** instead of using Ngrok.

---

## Your Public API URL

```
https://tushed-thunderingly-jenee.ngrok-free.dev/api/deathnote
```

Share this URL with anyone — they can access your local API from anywhere in the world as long as your PC is on, your Spring Boot app is running, and your Ngrok terminal is open.

---

*Generated on 2026-05-31 | Environment: Kali Linux | Backend: Spring Boot*