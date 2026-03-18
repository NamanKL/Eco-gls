# Eco-gls — Eco Quest 8-Bit: IGCSE Career Climb

**Eco Quest 8-Bit** is a browser-based retro RPG educational game that teaches **IGCSE Economics and Business** concepts through interactive gameplay. Players work their way up a corporate career ladder by correctly answering economics questions posed by colleagues in progressively challenging office environments.

## What is this project?

This is a **zero-dependency static web application** — no frameworks, no build step, no server required. It runs entirely in the browser using plain HTML, CSS, and JavaScript.

### Who it's for

- Students studying **IGCSE Economics** or **IGCSE Business Studies**
- Teachers looking for an engaging in-class or homework activity
- Anyone who wants to test their knowledge of fundamental economics and business concepts

### Educational content

The game covers 25 multiple-choice questions across five difficulty tiers:

| Level | Role | Office | Topics |
|-------|------|--------|--------|
| 1 | Desk Worker | Intern Bay | Supply & demand, opportunity cost, revenue, marketing basics, business objectives |
| 2 | Manager | Operations Floor | Equilibrium price, variable costs, profit, USP, sole proprietorships |
| 3 | Director | Strategy Wing | Monopolistic competition, economies of scale, market share, contribution, entrepreneurship |
| 4 | Executive | Regional HQ | Oligopoly, break-even analysis, social enterprise, price elasticity, gearing |
| 5 | CEO | Executive Tower | Marginal vs average cost, predatory pricing, multinational objectives, productivity, opportunity cost |

Each answer includes an explanation to reinforce understanding, whether the player answers correctly or not.

## Gameplay

1. **Move** your character around a top-down, tile-based office map.
2. **Find and approach** one of the 5 NPC colleagues placed around the room.
3. **Interact** to receive a multiple-choice economics question.
4. **Answer correctly** to mark that NPC as complete. Wrong answers prompt a retry.
5. **Complete all 5 NPCs** on a level to earn a promotion and advance to the next office.
6. Reach **CEO** to finish the game and see your total time.

A live HUD tracks your current role, NPCs completed, elapsed time, and answer streak.

## Features

- 5 career progression levels: Desk Worker → Manager → Director → Executive → CEO
- Fixed single-screen, top-down, tile-based office maps (no scrolling)
- 8-bit pixel visuals and Ruby-era handheld RPG atmosphere
- 5 NPCs per level, each with one multiple-choice question and an answer explanation
- Retry-on-wrong-answer flow and per-NPC completion tracking
- Progressive difficulty across 25 total questions
- Timer from game start to CEO completion with a final results screen
- Keyboard controls and iPad-friendly touch controls (on-screen joystick + interact button)
- Retro synthesized sound effects and looping chiptune background music

## Run locally

This is a static web app with no build step.

1. Open [index.html](index.html) directly in a browser, **or**
2. Serve it with a local server (recommended to avoid any browser security restrictions):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Controls

| Input | Action |
|-------|--------|
| Arrow Keys or WASD | Move character |
| E or Enter | Interact with nearby NPC |
| On-screen joystick | Move (touch / iPad) |
| INTERACT button | Talk to NPC (touch / iPad) |

## File overview

| File | Purpose |
|------|---------|
| [index.html](index.html) | Game structure, HUD, question modal, and touch control elements |
| [style.css](style.css) | Retro 8-bit visual theme, responsive layout, and iPad-friendly styles |
| [game.js](game.js) | Game loop, tile rendering, collision detection, NPC Q&A logic, level progression, timer, and audio |

## Technology

- **Vanilla JavaScript** — no frameworks or libraries
- **HTML5 Canvas** — for tile map and character rendering
- **Web Audio API** — for chiptune music and sound effects
- **Google Fonts** — Press Start 2P and VT323 for the retro pixel look