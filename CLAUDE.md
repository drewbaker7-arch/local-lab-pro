# CLAUDE.md — Frontend Website Rules
## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.
## Screenshot Workflow
- Puppeteer is installed at /Users/drewbaker/Website Projects/local-lab-pro/node_modules/puppeteer/. Chrome cache is at ~/.cache/puppeteer/chrome/mac_arm-145.0.7632.77/
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing
##Coding Rules
When you implement the plan remember you are the orchestrator, you do not code you use subagents to to parts of the task, use multiple agents and when possible run tasks at the same time.
Always using at least 2 code review agents and all code should be well documented with notes.
