# Eco-gls

Eco Quest 8-Bit is a web-based retro RPG-style educational game that teaches IGCSE Economics and Business concepts.

## What is included

- 5 career progression levels: Desk Worker, Manager, Director, Executive, CEO
- Fixed single-screen, top-down, tile-based office maps (no scrolling)
- 8-bit inspired pixel visuals and Ruby-era handheld RPG atmosphere
- 5 NPCs per level, each with one multiple-choice economics/business question
- Retry-on-wrong-answer flow and completion tracking per NPC
- Progressive difficulty across 25 total questions
- Difficulty selection at start (PYP or Secondary question banks)
- Player profile start flow (name input) with local leaderboard (fastest times)
- Lives system (3 lives) with game-over restart flow
- Hint system (2 hints per level) that removes wrong options
- Timer from game start to CEO completion
- Final completion screen with name, total time, lives used, and leaderboard
- Keyboard and iPad-friendly touch controls (on-screen joystick + interact button)
- Retro synthesized sound effects and looping chiptune background music

## Run locally

This is a static web app.

1. Open [index.html](index.html) directly in a browser.
2. Or run a tiny local server from this folder, then open the shown URL.

```bash
python3 -m http.server 8000
```

## Controls

- Move: Arrow Keys or WASD
- Interact with NPC: E or Enter
- Touch devices: left joystick to move, INTERACT button to talk
- In questions: use HINT button to remove two wrong options (limited per level)

## File overview

- [index.html](index.html): game structure and UI overlays
- [style.css](style.css): retro visual theme and responsive iPad-friendly layout
- [game.js](game.js): game loop, rendering, collisions, NPC Q&A logic, level progression, timer, and audio
