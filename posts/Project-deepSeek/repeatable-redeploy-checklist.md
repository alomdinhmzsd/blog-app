---

**clean, repeatable redeploy checklist** for both backend and frontend:

---

## 🔁 **Backend (Render) Redeploy Process**

After making backend changes (like updating CORS):

```bash
# Step 1: Stage changes
git add .

# Step 2: Commit with a clear message
git commit -m "Update CORS config for Netlify and Vite dev"

# Step 3: Push to GitHub
git push origin main
```

> 🔁 Render will automatically redeploy the backend when it detects a new commit on the linked GitHub repo (usually `main`).

✅ Done.

---

## 🎨 **Frontend (Vite + React) Redeploy to Netlify**

After any frontend changes (UI, routes, etc.):

```bash
# Step 1: Build fresh production bundle
npm run build
```

This generates a new `dist/` folder.

### Then:

- Go to [Netlify Deploys](https://app.netlify.com)
- Drag-and-drop the **`dist/` folder** into the **Deploy area**
- Netlify will deploy the latest static frontend

✅ Done.

---

### 🧼 Optional Cleanup Before `npm run build`:

You can delete the old `dist/` just to be sure:

```bash
rm -rf dist
npm run build
```

---
