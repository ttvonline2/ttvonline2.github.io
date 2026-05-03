# Agent Instructions – ttvonline2.github.io

## Owner Background
**Truong Tan Vang** — Software Engineer specializing in **Android Automotive OS (AAOS)** and embedded in-vehicle infotainment (IVI) systems.

**Domain expertise:**
- Android System-level development: AIDL, Binder IPC, SELinux/SEPolicy, CarService, VHAL
- Embedded automotive protocols: SOME/IP, CAN, APIX, QNX PPS, POSIX MQ
- Android architecture patterns: MVVM, Dagger/Hilt, Kotlin Coroutines/Flow
- Cross-OS IPC: LCPBus (JNI/C++), Protocol Buffers, WebOS Container integration
- Projects: AIVI (Nissan & Renault), HKMC (Hyundai Kia), PIVI (Land Rover Range Rover)

**Purpose of this repo:** A personal portfolio website to showcase professional skills, experience, and projects to potential employers.

---

## Language Rules (ALWAYS apply these first)

1. **Correct the user's English typos and grammar** before executing any request. Show the corrected version briefly (one line), then proceed.
2. **Use intermediate vocabulary (B1–B2 level):** prefer clear, common words over advanced or academic language. Avoid jargon unless it is technical (programming/engineering terms are fine).
3. The user may write notes or internal content in Vietnamese — this is expected.

---

## Project Overview

| Item | Detail |
|------|--------|
| Type | Static portfolio website |
| Tech | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Build | **No build step.** Open `index.html` directly in browser. |
| Deployment | GitHub Pages (`ttvonline2.github.io`) |
| Dependencies | Font Awesome 6.4 (CDN), jsPDF 2.5 (CDN) |

---

## Folder Structure

```
index.html          # Single-page portfolio (main entry point)
styles.css          # All styling — layout, themes, animations
script.js           # Interactivity — nav, scroll, theme toggle, PDF export
CV/                 # PDF resume file
images/             # Profile photo, certificate images
Experience/         # Markdown docs describing each work project (Vietnamese)
  AIVI – Nissan & Renault (Automotive).md
  HKMC.md
  PIVI – Land Rover (Automotive).md
  FodService/       # HTML detail pages for AIVI FOD module
  GvmSystemUI/      # HTML detail pages for AIVI GVM System UI module
  PIVI/             # HTML detail pages for PIVI modules
  WebosProjection/  # HTML detail pages for HKMC WebOS Projection module
QA pool/            # Interview Q&A practice notes
```

---

## Key Conventions

- **Detail pages** under `Experience/*/` follow the pattern established in [Experience/GvmSystemUI/detail-style.css](Experience/GvmSystemUI/detail-style.css) — use this shared CSS for any new detail page.
- **Single-page app:** all sections live in `index.html`. Do not create new top-level HTML pages unless the user explicitly requests it.
- **Theme toggle:** dark/light theme is managed via a CSS class on `<body>` in `script.js`. Keep theme variables in `styles.css` CSS custom properties.
- **No framework:** keep additions in Vanilla JS/CSS. Do not introduce npm, bundlers, or frameworks unless explicitly asked.

---

## Suggested Next Steps for the Agent

- When updating content in `index.html`, check `styles.css` for existing class names before adding new ones.
- When adding a new experience detail page, copy the structure of an existing page (e.g., [Experience/GvmSystemUI/01-multi-theme-screen.html](Experience/GvmSystemUI/01-multi-theme-screen.html)) and apply [detail-style.css](Experience/GvmSystemUI/detail-style.css).
- The owner's automotive background means technical questions about AAOS, Binder, AIDL, SEPolicy, and QNX are within normal scope.
