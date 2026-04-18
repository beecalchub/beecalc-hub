# BeeCalc Hub - Setup & Deployment Guide

A plain-English, step-by-step guide for people who don't do this every day.
No jargon without explanation. Every step is spelled out.

---

## Table of Contents

1. [What you need before you start](#part-1-what-you-need-before-you-start)
2. [Install Node.js on your computer](#part-2-install-nodejs-on-your-computer)
3. [Get the project files onto your computer](#part-3-get-the-project-files-onto-your-computer)
4. [Install the project and run it locally](#part-4-install-the-project-and-run-it-locally)
5. [Test it and make sure everything works](#part-5-test-it-and-make-sure-everything-works)
6. [Deploy to production (make it live on the internet)](#part-6-deploy-to-production)
7. [Connect a custom domain name](#part-7-connect-a-custom-domain)
8. [Ongoing maintenance](#part-8-ongoing-maintenance)
9. [Troubleshooting common problems](#part-9-troubleshooting)

---

## Part 1: What You Need Before You Start

You need three things:

1. **A computer** - Windows, Mac, or Linux all work fine
2. **An internet connection** - needed for the initial setup and for deployment
3. **About 30 minutes** - the first time takes longest; after that it's quick

You do NOT need:
- A web server (we'll use a free hosting service)
- A database (the site stores everything in users' browsers)
- Programming experience (you're following exact steps)

---

## Part 2: Install Node.js on Your Computer

Node.js is a program that runs the website on your computer for testing.
Think of it like installing Microsoft Office before you can open a Word document.

### On Windows:

1. Open your web browser and go to: **https://nodejs.org**
2. You'll see two big green download buttons. Click the one that says **"LTS"**
   (LTS means "Long Term Support" - it's the stable, reliable version)
3. A file like `node-v20.x.x-x64.msi` will download
4. Double-click that file to run the installer
5. Click **Next** through each screen, accepting the defaults
6. On the "Tools for Native Modules" screen, check the box if asked (not critical)
7. Click **Install**, then **Finish**

### On Mac:

1. Open your web browser and go to: **https://nodejs.org**
2. Click the **LTS** download button
3. A `.pkg` file will download
4. Double-click it and follow the installer steps
5. Click **Continue** → **Continue** → **Agree** → **Install**
6. Enter your Mac password when asked, then click **Close**

### Verify it worked:

1. **Open a terminal:**
   - **Windows:** Press the Windows key, type `cmd`, and press Enter
   - **Mac:** Press Cmd+Space, type `Terminal`, and press Enter
2. Type this and press Enter:
   ```
   node --version
   ```
3. You should see something like `v20.12.0` (the exact number doesn't matter,
   as long as it starts with v18, v20, or v22)
4. Also type this and press Enter:
   ```
   npm --version
   ```
5. You should see a number like `10.5.0`

If both commands show version numbers, you're ready. If you see "not recognized"
or "command not found," restart your computer and try again.

---

## Part 3: Get the Project Files Onto Your Computer

You received a file called `beecalc-hub.tar.gz`. This is a compressed folder
containing the entire website - like a .zip file.

### Option A: Extract using your file manager

**Windows:**
- You may need 7-Zip (free, download from https://7-zip.org)
- Right-click `beecalc-hub.tar.gz` → 7-Zip → Extract Here
- This creates a folder called `beecalc-hub`

**Mac:**
- Double-click `beecalc-hub.tar.gz` in Finder
- It will automatically extract to a folder called `beecalc-hub`

### Option B: Extract using the terminal

1. Open a terminal (see Part 2 for how)
2. Navigate to where you downloaded the file. For example, if it's in Downloads:
   ```
   cd Downloads
   ```
3. Extract it:
   ```
   tar xzf beecalc-hub.tar.gz
   ```
4. This creates a folder called `beecalc-hub`

### Move the folder somewhere convenient

Put the `beecalc-hub` folder somewhere you'll remember. Good places:
- Your Desktop
- A "Projects" folder in your Documents
- Anywhere that makes sense to you

---

## Part 4: Install the Project and Run It Locally

Now we'll install the project's dependencies (other code libraries it needs)
and start it on your computer.

### Step 1: Open a terminal in the project folder

**Windows:**
1. Open File Explorer and navigate to the `beecalc-hub` folder
2. Click in the address bar at the top (where it shows the folder path)
3. Type `cmd` and press Enter - this opens a terminal already inside the folder

**Mac:**
1. Open Terminal (Cmd+Space, type Terminal)
2. Type `cd ` (with a space after it), then drag the `beecalc-hub` folder
   from Finder into the Terminal window - it will paste the path
3. Press Enter

**Either system - alternative method:**
```
cd path/to/beecalc-hub
```
Replace `path/to/` with the actual location. For example:
```
cd Desktop/beecalc-hub
```

### Step 2: Install dependencies

Type this command and press Enter:
```
npm install
```

**What's happening:** This downloads all the code libraries the project needs.
It will take 1–3 minutes and will show a progress bar. You'll see lots of text
scrolling - that's normal.

**When it's done,** you'll see something like:
```
added 350 packages in 45s
```

If you see "npm warn" messages, those are fine - warnings are not errors.
If you see "npm ERR!" in red, something went wrong (see Troubleshooting below).

### Step 3: Start the development server

Type this and press Enter:
```
npm run dev
```

**What's happening:** This starts the website on your computer. After a few
seconds, you'll see:
```
  ▲ Next.js 14.2.x
  - Local: http://localhost:3000
```

### Step 4: Open it in your browser

1. Open your web browser (Chrome, Firefox, Safari, Edge - any will work)
2. In the address bar, type: **http://localhost:3000**
3. Press Enter

**You should see the BeeCalc Hub homepage** with the hero section, featured
calculators, and category overview.

### Step 5: Try it out

- Click on any calculator (like "Sugar Syrup Mixing")
- Enter some numbers - you should see results appear
- Try the Imperial/Metric toggle
- Try the star (favorite) button
- Try the Copy button
- Try searching on the "All Calculators" page

### Step 6: Stop the server when you're done

Go back to the terminal and press **Ctrl+C** (hold Control and press C).
This stops the local server. The website will no longer load at localhost:3000.

You can restart it anytime by running `npm run dev` again.

---

## Part 5: Test It and Make Sure Everything Works

### Run the automated tests

With the terminal open in the `beecalc-hub` folder, type:
```
npm test
```

You should see:
```
Test Suites: 25 passed, 25 total
Tests:       148 passed, 148 total
```

All green means everything is working correctly.

### Manual testing checklist

Open the site at http://localhost:3000 and walk through this:

- [ ] Homepage loads with bee imagery and calculator cards
- [ ] Click "All Calculators" - the listing page loads
- [ ] Type "syrup" in the search box - Sugar Syrup appears
- [ ] Click a category like "Feeding & Nutrition" - only feeding calculators show
- [ ] Open Sugar Syrup calculator - enter 5 liters, select 2:1 - see results
- [ ] Toggle Imperial/Metric - units change in the results
- [ ] Click the star icon - it turns gold (favorited)
- [ ] Go to All Calculators → "Favorites" tab - your favorited calculator appears
- [ ] Click Copy - paste in a text file - results are formatted nicely
- [ ] Click Reset - inputs go back to defaults
- [ ] Open Queen Rearing Timeline - click "Export to iCal" - a .ics file downloads
- [ ] Open a Coming Soon calculator - see the placeholder with related links
- [ ] Test on your phone by going to http://YOUR_COMPUTER_IP:3000
      (you can find your IP in your Wi-Fi settings)

### Build the production version

This creates the optimized version that will go to your hosting:
```
npm run build
```

You should see:
```
✓ Generating static pages (165/165)
```

This means all 165 pages built successfully.

---

## Part 6: Deploy to Production

"Deploy" means putting the website on the internet so anyone can visit it.
Here are three options, from easiest to most flexible.

---

### Option A: Vercel (Recommended - Easiest)

Vercel is the company that makes Next.js. Their hosting is free for personal
projects and handles everything automatically.

**Step 1: Create a Vercel account**
1. Go to **https://vercel.com**
2. Click **Sign Up**
3. Sign up with your email or GitHub account
4. Verify your email if asked

**Step 2: Install the Vercel command-line tool**

In your terminal (inside the `beecalc-hub` folder):
```
npm install -g vercel
```

**Step 3: Deploy**
```
vercel
```

The first time, it will ask you several questions:
```
? Set up and deploy? → Yes
? Which scope? → Select your account
? Link to existing project? → No
? What's your project's name? → beecalc-hub (or press Enter for default)
? In which directory is your code located? → ./ (press Enter)
? Want to modify these settings? → No
```

**Step 4: Wait about 2 minutes**

Vercel will upload your code, build it on their servers, and give you a URL like:
```
✓ Production: https://beecalc-hub.vercel.app
```

**That's it. Your site is live.** Open that URL in any browser to see it.

**To update after making changes:**
```
vercel --prod
```

---

### Option B: Netlify (Also Easy - Static Export)

Netlify is another popular free hosting service. It works great for static sites.

**Step 1: Change one setting**

Open the file `next.config.js` in a text editor (Notepad, TextEdit, or VS Code)
and change it to:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

module.exports = nextConfig;
```

**Step 2: Build the static version**
```
npm run build
```

This creates a folder called `out` with all your website files as plain HTML.

**Step 3: Create a Netlify account**
1. Go to **https://www.netlify.com**
2. Click **Sign up** and create an account

**Step 4: Deploy by drag-and-drop**
1. Log into Netlify
2. You'll see a section that says "Drag and drop your site output folder here"
3. Open your File Explorer / Finder
4. Navigate to `beecalc-hub/out`
5. Drag the entire `out` folder onto the Netlify drop zone

**Step 5: Wait about 1 minute**

Netlify will give you a URL like:
```
https://amazing-babbage-a1b2c3.netlify.app
```

Your site is live.

**To update after making changes:**
- Run `npm run build` again
- Drag the new `out` folder to Netlify again (it will replace the old version)

---

### Option C: Traditional Web Hosting (cPanel, Hostinger, etc.)

If you already pay for web hosting (like GoDaddy, Hostinger, SiteGround, Bluehost),
you can upload the static files there.

**Step 1: Change the config to static export** (same as Netlify Step 1 above)

**Step 2: Build**
```
npm run build
```

**Step 3: Upload the `out` folder**

1. Log into your hosting control panel (usually cPanel)
2. Open the **File Manager**
3. Navigate to your website's root directory (usually `public_html`)
4. Upload ALL the files from inside the `beecalc-hub/out` folder
   - Not the `out` folder itself - the files INSIDE it
5. Make sure `index.html` is at the root level of `public_html`

**Alternative: Use FTP**
1. Download FileZilla (free): https://filezilla-project.org
2. Connect to your hosting using the FTP credentials from your hosting provider
3. Upload the contents of the `out` folder to your `public_html` directory

---

## Part 7: Connect a Custom Domain

Once your site is live, you'll want it at a real address like `beecalchub.com`
instead of `beecalc-hub.vercel.app`.

### Step 1: Buy a domain name

Go to a domain registrar and purchase your domain. Good options:
- **Namecheap** (https://namecheap.com) - affordable, easy
- **Cloudflare Registrar** (https://dash.cloudflare.com) - cheapest, slightly technical
- **Google Domains** (now via Squarespace)

A `.com` domain typically costs $10–15 per year.

### Step 2: Point the domain to your hosting

**If using Vercel:**
1. In your Vercel dashboard, click on your project
2. Go to **Settings** → **Domains**
3. Type your domain (e.g., `beecalchub.com`) and click **Add**
4. Vercel will show you DNS records to add. It will look like:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
5. Log into your domain registrar (Namecheap, etc.)
6. Find **DNS Settings** or **Advanced DNS**
7. Add the records Vercel showed you
8. Wait 10–60 minutes for it to take effect (sometimes up to 24 hours)

**If using Netlify:**
1. In your Netlify dashboard, go to **Domain settings**
2. Click **Add custom domain**
3. Follow their step-by-step instructions - they show you exactly what DNS records to set

**If using traditional hosting:**
- Your hosting provider will have instructions for pointing a domain to your account
- Usually it means changing your domain's **nameservers** to the ones your host provides
- Your host's support team can help with this

### Step 3: Enable HTTPS (the padlock icon)

**Vercel and Netlify:** This is automatic. They set up HTTPS for you within minutes.

**Traditional hosting:** Look for "SSL Certificate" in your cPanel. Most hosts
offer free SSL through Let's Encrypt. Click the button to enable it.

---

## Part 8: Ongoing Maintenance

### Making changes to the site

1. Edit the files in the `beecalc-hub` folder on your computer
2. Test locally with `npm run dev`
3. Re-deploy:
   - **Vercel:** Run `vercel --prod`
   - **Netlify/traditional:** Run `npm run build` and re-upload the `out` folder

### Keeping things updated

Every few months, you can update the underlying libraries:
```
npm update
```
Then test (`npm test`) and re-deploy.

### Backups

Keep a copy of the `beecalc-hub` folder somewhere safe:
- An external hard drive
- Google Drive or Dropbox
- A USB stick

The entire project (without `node_modules`) is very small - under 200 KB.

---

## Part 9: Troubleshooting

### "npm: command not found" or "node: command not found"

Node.js wasn't installed properly. Restart your computer and try again.
If it still doesn't work, uninstall Node.js and reinstall from https://nodejs.org.

### "npm ERR!" during `npm install`

- Make sure you're inside the `beecalc-hub` folder (not a parent or sub-folder)
- Try deleting the `node_modules` folder and `package-lock.json`, then run `npm install` again:
  ```
  rm -rf node_modules package-lock.json
  npm install
  ```
- On Windows, use:
  ```
  rmdir /s /q node_modules
  del package-lock.json
  npm install
  ```

### The site looks broken or shows errors

- Make sure you ran `npm install` before `npm run dev`
- Try stopping the server (Ctrl+C) and starting it again
- Clear your browser cache (Ctrl+Shift+Delete in most browsers)

### "Port 3000 is already in use"

Something else is already using port 3000. Either:
- Close the other program using it
- Or start on a different port:
  ```
  npm run dev -- -p 3001
  ```
  Then open http://localhost:3001 instead

### Changes I made aren't showing up

- Make sure you saved the file
- The development server auto-refreshes, but sometimes you need to do a hard
  refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- If deploying, make sure you ran the deploy command after building

### The site works locally but not on Vercel

- Check the Vercel dashboard for build errors (they show a log)
- Make sure all your files are saved
- Try running `npm run build` locally first to catch errors before deploying

### I need help

- **Vercel support:** https://vercel.com/help
- **Netlify support:** https://docs.netlify.com
- **Node.js help:** https://nodejs.org/en/docs
- **Next.js help:** https://nextjs.org/docs

---

## Quick Reference Card

| Task | Command |
|---|---|
| Install dependencies | `npm install` |
| Start locally | `npm run dev` |
| Open in browser | http://localhost:3000 |
| Stop the server | Ctrl+C in the terminal |
| Run tests | `npm test` |
| Build for production | `npm run build` |
| Deploy to Vercel | `vercel --prod` |
| Update libraries | `npm update` |

---

You're all set. Your beekeeping calculator site is ready for the world. 🐝
