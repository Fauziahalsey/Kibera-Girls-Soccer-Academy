Deploying to cPanel (step-by-step)

1. Build the project locally:

```bash
npm ci
npm run build
```

2. Compress the `dist/` folder to a zip (already created as `deploy-dist.zip` in the repo root):

```bash
# optional - if you didn't create deploy-dist.zip
zip -r deploy-dist.zip dist
```

3. Log in to cPanel -> File Manager -> navigate to the document root for your domain (usually `public_html/` for primary domain).

4. Upload `deploy-dist.zip` and extract it. Make sure the extracted contents include `index.html`, `.htaccess`, and `assets/`.

5. Ensure file permissions are correct:

- Files: 644
- Folders: 755

6. If the site is in a subfolder (e.g., public_html/project/), make sure you visit the correct URL: `https://yourdomain.com/project/`.

7. If you get 404 on client-side routes, ensure `.htaccess` exists and contains the SPA rewrite rules. If `.htaccess` appears ignored, contact your host to ensure `AllowOverride` is enabled.


Troubleshooting tips:

- If assets or index.html 404: you uploaded into the wrong folder (e.g., `public_html/dist/` instead of `public_html/`). Move files up one level.
- If `.htaccess` is ignored: host may have disabled overrides. Contact support or use server settings to allow rewrites.
- Check browser DevTools Network tab for the exact 404 path.
