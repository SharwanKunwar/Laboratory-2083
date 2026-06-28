# 🚫 GitHub Push Protection (GH013) – Secret Scanning Error

## Problem

While pushing a local repository to GitHub, the following error appeared:

```text
remote: error: GH013: Repository rule violations found for refs/heads/main.

remote:
remote: - GITHUB PUSH PROTECTION
remote:     Push cannot contain secrets
```

GitHub also reported that the following secrets were detected:

* Google OAuth Client ID
* Google OAuth Client Secret

Example:

```text
BackendPracticeApplications/LoginExample/target/classes/application.properties

BackendPracticeApplications/QuoteShare/target/classes/application.properties
```

---

# Why does this happen?

GitHub automatically scans every commit that is pushed to a repository.

If a commit contains sensitive information such as:

* API Keys
* OAuth Client IDs
* OAuth Client Secrets
* AWS Keys
* Database Passwords
* Access Tokens

GitHub blocks the push to protect your account and your project.

In this case, the secrets were accidentally committed inside:

```
target/classes/application.properties
```

The `target/` directory is a generated build folder created by Maven and should never be committed to Git.

---

# Why deleting the files did NOT solve the problem?

Many developers think:

> "I deleted the files, so GitHub should allow the push."

Unfortunately, Git does not work that way.

GitHub checks **every commit** being pushed.

Example history:

```
Commit A
↓

Commit B   ← contains Google Client Secret ❌

↓

Commit C   ← deletes the file
```

Even though Commit C deletes the file, Commit B still exists in Git history.

GitHub scans Commit B and blocks the push.

---

# How to resolve the problem

The secret must be removed from the Git history.

Simply deleting the file is **not enough**.

You need to rewrite your Git history so that the commit containing the secret no longer exists.

---

# Step-by-Step Solution

## Step 1 — Check your commit history

```bash
git log --oneline --graph --decorate --all
```

Example:

```
d2601a2 Remove backend practice applications
2ae7ba7 ...
71d2c1f added login demo test and removed id, secret
```

Look for the commit that contains the secret.

---

## Step 2 — Abort any unfinished rebase (if necessary)

```bash
git rebase --abort
```

---

## Step 3 — Remove the bad commit

If the commit is not needed:

```bash
git reset --hard <safe_commit_hash>
```

Example:

```bash
git reset --hard 2ae7ba7
```

This moves your branch back to a clean commit.

---

## Step 4 — Reapply only the changes you actually want

Example:

```bash
rm -rf BackendPracticeApplications

git add .

git commit -m "Remove backend practice applications"
```

---

## Step 5 — Verify history

```bash
git log --oneline --graph --decorate --all
```

The commit containing the secret should no longer appear.

---

## Step 6 — Push again

```bash
git push
```

Expected output:

```text
Everything up-to-date
```

or

```text
Enumerating objects...
Writing objects...
To github.com:user/repository.git
```

No GH013 error should appear.

---

# Prevent this problem in the future

## Ignore build folders

Create or update `.gitignore`:

```gitignore
target/
.idea/
.env
```

---

## Never store secrets inside Git

Instead of writing:

```properties
spring.security.oauth2.client.registration.google.client-secret=YOUR_SECRET
```

Use environment variables:

```properties
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}
```

---

## Rotate exposed secrets

If a Client Secret was committed—even if GitHub blocked the push—it is good security practice to generate a new Client Secret from the Google Cloud Console.

---

# Key Lessons Learned

* GitHub Push Protection scans every commit, not just the latest files.
* Deleting a file does not remove it from Git history.
* Secrets must be removed from the commit history.
* Never commit `target/`, `.env`, or generated files.
* Always use environment variables for API keys and OAuth credentials.
* Add important generated directories to `.gitignore` before committing.

---

# Useful Git Commands

Check status:

```bash
git status
```

View commit history:

```bash
git log --oneline --graph --decorate --all
```

Abort an unfinished rebase:

```bash
git rebase --abort
```

Reset to a safe commit:

```bash
git reset --hard <commit_hash>
```

Force push (only if rewriting history intentionally):

```bash
git push --force-with-lease
```

Normal push:

```bash
git push
```
