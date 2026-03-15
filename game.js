const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const hudLevel = document.getElementById("hud-level");
const hudProgress = document.getElementById("hud-progress");
const hudTime = document.getElementById("hud-time");
const hudStreak = document.getElementById("hud-streak");

const messageBox = document.getElementById("message-box");
const messageTitle = document.getElementById("message-title");
const messageText = document.getElementById("message-text");
const messageBtn = document.getElementById("message-btn");

const questionModal = document.getElementById("question-modal");
const questionText = document.getElementById("question-text");
const optionsWrap = document.getElementById("options-wrap");
const questionFeedback = document.getElementById("question-feedback");
const questionClose = document.getElementById("question-close");

const endScreen = document.getElementById("end-screen");
const finalTime = document.getElementById("final-time");
const finalSummary = document.getElementById("final-summary");
const restartBtn = document.getElementById("restart-btn");

const touchInteract = document.getElementById("touch-interact");
const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");

const TILE = 32;
const MAP_W = 20;
const MAP_H = 15;

const LEVELS = [
  {
    role: "Desk Worker",
    officeName: "Intern Bay",
    playerPalette: { shirt: "#4ea991", tie: "#f4e3b4", hair: "#3a281f" },
    theme: { floor: "#c9b28a", wall: "#8b6b4d", desk: "#7f5130", accent: "#5f9ea0" },
    map: [
      "####################",
      "#....D....##....P..#",
      "#..................#",
      "#..P....####....D..#",
      "#..................#",
      "#....D.............#",
      "#.........PP.......#",
      "#...###............#",
      "#..................#",
      "#..D...........D...#",
      "#..................#",
      "#....P.....####....#",
      "#..................#",
      "#.........D........#",
      "####################"
    ],
    questions: [
      {
        q: "If demand rises while supply stays the same, what usually happens to price?",
        options: ["Price falls", "Price rises", "No change", "Price becomes zero"],
        answer: 1,
        explain: "Higher demand with unchanged supply pushes equilibrium price up."
      },
      {
        q: "Opportunity cost is best described as:",
        options: ["Money spent only", "Best alternative given up", "Total revenue", "A fixed cost"],
        answer: 1,
        explain: "It is the value of the next best option forgone."
      },
      {
        q: "Which objective is most common for a private sector business?",
        options: ["Profit maximization", "Tax collection", "Voting turnout", "Foreign policy"],
        answer: 0,
        explain: "Most private firms primarily seek long-term profit."
      },
      {
        q: "Revenue means:",
        options: ["Total cost", "Total sales income", "Profit after tax", "Cash in bank only"],
        answer: 1,
        explain: "Revenue is the money earned from sales."
      },
      {
        q: "A basic purpose of marketing is to:",
        options: ["Ignore customer needs", "Match products to customer needs", "Increase unemployment", "Reduce all prices forever"],
        answer: 1,
        explain: "Marketing identifies and satisfies customer wants."
      }
    ]
  },
  {
    role: "Manager",
    officeName: "Operations Floor",
    playerPalette: { shirt: "#3f6ea8", tie: "#ffd77a", hair: "#2f2019" },
    theme: { floor: "#b7c6d9", wall: "#5f6f84", desk: "#5b4a6a", accent: "#8da7be" },
    map: [
      "####################",
      "#..D....P....D.....#",
      "#....####..........#",
      "#..................#",
      "#..P..D....P....D..#",
      "#..................#",
      "#......######......#",
      "#..................#",
      "#..D..P......D.....#",
      "#..................#",
      "#....D....####..P..#",
      "#..................#",
      "#..P.........D.....#",
      "#.............D....#",
      "####################"
    ],
    questions: [
      {
        q: "If price is above equilibrium, what market pressure appears?",
        options: ["Excess demand", "Excess supply", "No output", "Nationalization"],
        answer: 1,
        explain: "A high price creates surplus (excess supply)."
      },
      {
        q: "Which is a variable cost for a bakery?",
        options: ["Monthly rent", "Flour used per loaf", "Insurance premium", "Factory mortgage"],
        answer: 1,
        explain: "Flour use rises as output rises, so it is variable."
      },
      {
        q: "Profit is calculated as:",
        options: ["Revenue - Total costs", "Revenue + Fixed costs", "Fixed costs - Revenue", "Sales volume / Price"],
        answer: 0,
        explain: "Profit equals total revenue minus total costs."
      },
      {
        q: "A strong USP in marketing helps a business mainly by:",
        options: ["Reducing legal ownership", "Differentiating from rivals", "Increasing inflation", "Removing demand"],
        answer: 1,
        explain: "USP gives customers a clear reason to choose that firm."
      },
      {
        q: "In sole proprietorships, one likely advantage is:",
        options: ["Unlimited liability", "Quick decision-making", "No startup risk", "Guaranteed high sales"],
        answer: 1,
        explain: "One owner can make decisions rapidly."
      }
    ]
  },
  {
    role: "Director",
    officeName: "Strategy Wing",
    playerPalette: { shirt: "#9a7dce", tie: "#f7e2a2", hair: "#2d1f18" },
    theme: { floor: "#b7b0c9", wall: "#5a4f70", desk: "#7c5a43", accent: "#a58fca" },
    map: [
      "####################",
      "#..P.....D.....P...#",
      "#......####........#",
      "#..D...........D...#",
      "#..................#",
      "#....P....D....P...#",
      "#..................#",
      "#...####....###....#",
      "#..................#",
      "#...D....P.....D...#",
      "#..................#",
      "#....####.....P....#",
      "#..P.......D.......#",
      "#..............D...#",
      "####################"
    ],
    questions: [
      {
        q: "In monopolistic competition, firms usually compete using:",
        options: ["Identical products only", "Product differentiation and branding", "Government wage laws", "No advertising"],
        answer: 1,
        explain: "Many firms use branding to stand out in monopolistic competition."
      },
      {
        q: "Which statement about economies of scale is correct?",
        options: ["Average cost rises as output increases", "Average cost can fall as output increases", "Only micro firms gain them", "They eliminate all risk"],
        answer: 1,
        explain: "Large-scale production can reduce average costs."
      },
      {
        q: "A business aiming for market share growth may choose to:",
        options: ["Set very high prices always", "Use competitive pricing and promotion", "Stop product development", "Ignore customer feedback"],
        answer: 1,
        explain: "Competitive pricing and promotion can boost share."
      },
      {
        q: "Contribution per unit is:",
        options: ["Selling price - Variable cost", "Fixed cost - Profit", "Total revenue / Workers", "Assets - Liabilities"],
        answer: 0,
        explain: "Contribution helps cover fixed costs and then profit."
      },
      {
        q: "An entrepreneur is typically characterized by:",
        options: ["Avoiding all uncertainty", "Organizing resources and taking risk", "Working only in public sector", "Never innovating"],
        answer: 1,
        explain: "Entrepreneurs combine resources and accept uncertainty."
      }
    ]
  },
  {
    role: "Executive",
    officeName: "Regional HQ",
    playerPalette: { shirt: "#c27d43", tie: "#e9f0ff", hair: "#241712" },
    theme: { floor: "#ceb5a4", wall: "#7a4f34", desk: "#4f3948", accent: "#d18655" },
    map: [
      "####################",
      "#...D....P.....D...#",
      "#..................#",
      "#..####......####..#",
      "#..................#",
      "#...P....D.....P...#",
      "#..................#",
      "#...D.####.#..D....#",
      "#..................#",
      "#...P....D.....P...#",
      "#..................#",
      "#..####......####..#",
      "#..................#",
      "#...D.........D....#",
      "####################"
    ],
    questions: [
      {
        q: "In an oligopoly, firms are interdependent because:",
        options: ["One firm's pricing affects rivals' decisions", "Government sets all output", "There is only one seller", "Products must be free"],
        answer: 0,
        explain: "Large firms monitor each other closely in oligopoly."
      },
      {
        q: "Break-even output is where:",
        options: ["Total revenue = Total costs", "Revenue is zero", "Profit is maximum", "Fixed costs are zero"],
        answer: 0,
        explain: "At break-even the business makes neither profit nor loss."
      },
      {
        q: "A social enterprise balances profit with:",
        options: ["No mission", "Social or environmental goals", "Monopoly pricing", "Lower product quality"],
        answer: 1,
        explain: "It operates commercially while meeting a social purpose."
      },
      {
        q: "Price elasticity of demand greater than 1 means demand is:",
        options: ["Inelastic", "Perfectly fixed", "Elastic", "Negative"],
        answer: 2,
        explain: "PED > 1 means quantity demanded responds strongly to price changes."
      },
      {
        q: "A business with high gearing has:",
        options: ["A high proportion of debt finance", "No long-term finance", "Only retained profits", "No liabilities"],
        answer: 0,
        explain: "High gearing indicates relatively high debt levels."
      }
    ]
  },
  {
    role: "CEO",
    officeName: "Executive Tower",
    playerPalette: { shirt: "#2f2f2f", tie: "#f8d16a", hair: "#f3e5b7" },
    theme: { floor: "#b9b39f", wall: "#2f2f2f", desk: "#6a5948", accent: "#e0c27b" },
    map: [
      "####################",
      "#..D....P.....D....#",
      "#..................#",
      "#..####....####....#",
      "#..................#",
      "#....P....D....P...#",
      "#..................#",
      "#...D..###.##..D...#",
      "#..................#",
      "#....P....D....P...#",
      "#..................#",
      "#..####....####....#",
      "#..................#",
      "#...D..........D...#",
      "####################"
    ],
    questions: [
      {
        q: "If marginal cost is below average cost, average cost will:",
        options: ["Rise", "Fall", "Stay unchanged", "Become zero"],
        answer: 1,
        explain: "A marginal value below average pulls the average down."
      },
      {
        q: "Predatory pricing risk is most associated with:",
        options: ["Perfect competition", "Natural monopoly only", "Dominant firms in concentrated markets", "Non-profit schools"],
        answer: 2,
        explain: "Powerful firms may price aggressively to weaken rivals."
      },
      {
        q: "Which is a likely long-run objective for a multinational?",
        options: ["Sustainable global growth and shareholder value", "Single-day sales spike only", "No reinvestment", "Minimize all product quality"],
        answer: 0,
        explain: "Long-run objectives often combine growth and value creation."
      },
      {
        q: "A rise in productivity means:",
        options: ["More output per unit of input", "Higher fixed costs only", "Lower revenue always", "More waste necessarily"],
        answer: 0,
        explain: "Productivity is output produced for each input unit."
      },
      {
        q: "Best example of opportunity cost for a CEO using capital is:",
        options: ["Past sunk cost", "Next best investment return forgone", "Annual depreciation only", "Nominal GDP change"],
        answer: 1,
        explain: "Choosing one investment means giving up the return of another."
      }
    ]
  }
];

const NPC_POSITIONS = [
  { x: 3, y: 2 },
  { x: 16, y: 2 },
  { x: 3, y: 7 },
  { x: 16, y: 7 },
  { x: 10, y: 12 }
];

const state = {
  levelIndex: 0,
  npcs: [],
  player: {
    x: 10 * TILE,
    y: 7 * TILE,
    speed: 135,
    facing: "down"
  },
  keys: {},
  joystick: { active: false, dx: 0, dy: 0 },
  activeNpc: null,
  modalOpen: false,
  gameOver: false,
  timerStarted: false,
  startTime: 0,
  elapsedMs: 0,
  streak: 0,
  questionsAnswered: 0
};

const audio = {
  ctx: null,
  enabled: false,
  loopId: null
};

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const sec = String(totalSec % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function tileBlocked(level, tx, ty) {
  if (tx < 0 || ty < 0 || tx >= MAP_W || ty >= MAP_H) {
    return true;
  }
  const c = level.map[ty][tx];
  return c === "#" || c === "D";
}

function createNpcSet(level) {
  return NPC_POSITIONS.map((pos, i) => ({
    id: i,
    x: pos.x * TILE,
    y: pos.y * TILE,
    completed: false,
    question: level.questions[i],
    attempts: 0
  }));
}

function showMessage(title, text, cb) {
  state.modalOpen = true;
  messageTitle.textContent = title;
  messageText.textContent = text;
  messageBox.classList.remove("hidden");

  const onClick = () => {
    messageBox.classList.add("hidden");
    messageBtn.removeEventListener("click", onClick);
    state.modalOpen = false;
    if (cb) cb();
  };

  messageBtn.addEventListener("click", onClick);
}

function showQuestion(npc) {
  state.modalOpen = true;
  state.activeNpc = npc;
  questionModal.classList.remove("hidden");
  questionText.textContent = npc.question.q;
  questionFeedback.textContent = "";
  questionFeedback.classList.remove("wrong");
  questionClose.classList.add("hidden");

  optionsWrap.innerHTML = "";
  npc.question.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "pixel-btn";
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;
    btn.addEventListener("click", () => handleAnswer(idx));
    optionsWrap.appendChild(btn);
  });
}

function hideQuestion() {
  questionModal.classList.add("hidden");
  state.modalOpen = false;
  state.activeNpc = null;
}

function handleAnswer(choice) {
  const npc = state.activeNpc;
  if (!npc || npc.completed) {
    return;
  }

  npc.attempts += 1;
  if (choice === npc.question.answer) {
    npc.completed = true;
    state.questionsAnswered += 1;
    if (npc.attempts === 1) {
      state.streak += 1;
    } else {
      state.streak = 0;
    }
    sfx("correct");
    questionFeedback.classList.remove("wrong");
    questionFeedback.textContent = `Correct! ${npc.question.explain}`;
    questionClose.classList.remove("hidden");
    updateHUD();
  } else {
    state.streak = 0;
    sfx("wrong");
    questionFeedback.classList.add("wrong");
    questionFeedback.textContent = "Not quite. Try again and think like a strategist.";
    updateHUD();
  }
}

questionClose.addEventListener("click", () => {
  hideQuestion();
  checkLevelCompletion();
});

function checkLevelCompletion() {
  const allDone = state.npcs.every((npc) => npc.completed);
  if (!allDone) {
    return;
  }

  sfx("levelup");
  if (state.levelIndex < LEVELS.length - 1) {
    state.levelIndex += 1;
    loadLevel(state.levelIndex);
    showMessage(
      "Promotion Unlocked",
      `You are now ${LEVELS[state.levelIndex].role}. Welcome to ${LEVELS[state.levelIndex].officeName}.`
    );
  } else {
    finishGame();
  }
}

function finishGame() {
  state.gameOver = true;
  if (state.timerStarted) {
    state.elapsedMs = Date.now() - state.startTime;
  }

  endScreen.classList.remove("hidden");
  finalTime.textContent = formatTime(state.elapsedMs);
  finalSummary.textContent = `Questions solved: ${state.questionsAnswered}/25 | Best current streak: x${state.streak}`;
}

function loadLevel(index) {
  const level = LEVELS[index];
  state.npcs = createNpcSet(level);

  state.player.x = 10 * TILE;
  state.player.y = 7 * TILE;
  updateHUD();
}

function nearestNpc() {
  let pick = null;
  let best = 999999;
  state.npcs.forEach((npc) => {
    if (npc.completed) return;
    const dx = npc.x - state.player.x;
    const dy = npc.y - state.player.y;
    const d2 = dx * dx + dy * dy;
    if (d2 < best) {
      best = d2;
      pick = npc;
    }
  });
  if (best <= (TILE * 1.5) ** 2) {
    return pick;
  }
  return null;
}

function interact() {
  if (state.modalOpen || state.gameOver) return;
  maybeStartTimer();
  enableAudio();
  const npc = nearestNpc();
  if (!npc) {
    sfx("bump");
    showMessage("No One Nearby", "Walk closer to a colleague and press INTERACT.");
    return;
  }
  sfx("interact");
  showQuestion(npc);
}

function updateHUD() {
  const done = state.npcs.filter((n) => n.completed).length;
  hudLevel.textContent = LEVELS[state.levelIndex].role;
  hudProgress.textContent = `${done}/5`;
  hudStreak.textContent = `x${state.streak}`;
}

function maybeStartTimer() {
  if (!state.timerStarted) {
    state.timerStarted = true;
    state.startTime = Date.now();
  }
}

function movePlayer(dt) {
  if (state.modalOpen || state.gameOver) {
    return;
  }

  let dx = 0;
  let dy = 0;

  if (state.keys.ArrowLeft || state.keys.a) dx -= 1;
  if (state.keys.ArrowRight || state.keys.d) dx += 1;
  if (state.keys.ArrowUp || state.keys.w) dy -= 1;
  if (state.keys.ArrowDown || state.keys.s) dy += 1;

  dx += state.joystick.dx;
  dy += state.joystick.dy;

  const mag = Math.hypot(dx, dy);
  if (mag > 0.01) {
    maybeStartTimer();
    enableAudio();
    dx /= mag;
    dy /= mag;

    if (Math.abs(dx) > Math.abs(dy)) {
      state.player.facing = dx > 0 ? "right" : "left";
    } else {
      state.player.facing = dy > 0 ? "down" : "up";
    }

    const nextX = state.player.x + dx * state.player.speed * dt;
    const nextY = state.player.y + dy * state.player.speed * dt;

    tryMove(nextX, state.player.y, "x");
    tryMove(state.player.x, nextY, "y");
  }
}

function playerRect(x, y) {
  return {
    left: x + 6,
    right: x + TILE - 6,
    top: y + 6,
    bottom: y + TILE - 4
  };
}

function rectHitsNpc(rect) {
  return state.npcs.some((npc) => {
    const nRect = { left: npc.x + 6, right: npc.x + TILE - 6, top: npc.y + 6, bottom: npc.y + TILE - 4 };
    return !(rect.right < nRect.left || rect.left > nRect.right || rect.bottom < nRect.top || rect.top > nRect.bottom);
  });
}

function tryMove(nx, ny) {
  const r = playerRect(nx, ny);
  const level = LEVELS[state.levelIndex];

  const points = [
    [r.left, r.top],
    [r.right, r.top],
    [r.left, r.bottom],
    [r.right, r.bottom]
  ];

  for (const p of points) {
    const tx = Math.floor(p[0] / TILE);
    const ty = Math.floor(p[1] / TILE);
    if (tileBlocked(level, tx, ty)) {
      return;
    }
  }

  if (rectHitsNpc(r)) {
    return;
  }

  state.player.x = Math.max(0, Math.min(nx, canvas.width - TILE));
  state.player.y = Math.max(0, Math.min(ny, canvas.height - TILE));
}

function drawLevel() {
  const level = LEVELS[state.levelIndex];
  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) {
      const c = level.map[y][x];
      const px = x * TILE;
      const py = y * TILE;

      if (c === "#") {
        drawTile(px, py, level.theme.wall, shade(level.theme.wall, -20));
      } else if (c === "D") {
        drawTile(px, py, level.theme.desk, shade(level.theme.desk, -15));
        ctx.fillStyle = shade(level.theme.desk, 20);
        ctx.fillRect(px + 6, py + 8, 20, 4);
      } else if (c === "P") {
        drawTile(px, py, level.theme.floor, shade(level.theme.floor, -8));
        ctx.fillStyle = "#2f8648";
        ctx.fillRect(px + 11, py + 9, 10, 10);
        ctx.fillStyle = "#4f3423";
        ctx.fillRect(px + 14, py + 19, 4, 8);
      } else {
        drawTile(px, py, level.theme.floor, shade(level.theme.floor, 9));
        if ((x + y) % 5 === 0) {
          ctx.fillStyle = "rgba(255,255,255,0.06)";
          ctx.fillRect(px, py, TILE, 1);
        }
      }
    }
  }

  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0, 0, canvas.width, 24);
  ctx.fillStyle = "#f9e8b4";
  ctx.font = "16px 'Press Start 2P'";
  ctx.fillText(`${level.role} - ${level.officeName}`, 12, 17);
}

function drawTile(x, y, c1, c2) {
  ctx.fillStyle = c1;
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = c2;
  ctx.fillRect(x, y, TILE, 3);
  ctx.fillRect(x, y, 3, TILE);
}

function drawNpc(npc, idx) {
  const done = npc.completed;
  const shirt = done ? "#7fcf9f" : "#6da5e6";
  const hair = "#2b1c13";

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(npc.x + 6, npc.y + 25, 20, 5);

  ctx.fillStyle = hair;
  ctx.fillRect(npc.x + 10, npc.y + 4, 12, 6);
  ctx.fillStyle = "#f3d9a5";
  ctx.fillRect(npc.x + 10, npc.y + 9, 12, 8);
  ctx.fillStyle = shirt;
  ctx.fillRect(npc.x + 8, npc.y + 17, 16, 10);
  ctx.fillStyle = done ? "#f6e37f" : "#f9fbff";
  ctx.fillRect(npc.x + 13, npc.y + 19, 6, 6);

  const mark = done ? "OK" : `${idx + 1}`;
  ctx.fillStyle = done ? "#e6ff9a" : "#fff5be";
  ctx.fillRect(npc.x + 8, npc.y - 9, 16, 8);
  ctx.fillStyle = "#2c241f";
  ctx.font = "8px 'Press Start 2P'";
  ctx.fillText(mark, npc.x + 10, npc.y - 2);
}

function drawPlayer() {
  const p = state.player;
  const pal = LEVELS[state.levelIndex].playerPalette;

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(p.x + 6, p.y + 25, 20, 5);

  ctx.fillStyle = pal.hair;
  ctx.fillRect(p.x + 9, p.y + 4, 14, 6);
  ctx.fillStyle = "#f5deb0";
  ctx.fillRect(p.x + 9, p.y + 10, 14, 8);
  ctx.fillStyle = pal.shirt;
  ctx.fillRect(p.x + 7, p.y + 18, 18, 10);
  ctx.fillStyle = pal.tie;
  ctx.fillRect(p.x + 14, p.y + 18, 4, 8);

  ctx.fillStyle = "#211715";
  if (p.facing === "left") {
    ctx.fillRect(p.x + 10, p.y + 13, 2, 2);
  } else if (p.facing === "right") {
    ctx.fillRect(p.x + 20, p.y + 13, 2, 2);
  } else {
    ctx.fillRect(p.x + 12, p.y + 13, 2, 2);
    ctx.fillRect(p.x + 18, p.y + 13, 2, 2);
  }
}

function drawPrompt() {
  if (state.modalOpen || state.gameOver) return;
  const npc = nearestNpc();
  if (!npc) return;

  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.fillRect(170, 435, 300, 28);
  ctx.fillStyle = "#ffe8a3";
  ctx.font = "10px 'Press Start 2P'";
  ctx.fillText("Press E / INTERACT", 188, 454);
}

function render() {
  drawLevel();
  state.npcs.forEach((npc, idx) => drawNpc(npc, idx));
  drawPlayer();
  drawPrompt();
}

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;

  movePlayer(dt);
  if (state.timerStarted && !state.gameOver) {
    state.elapsedMs = Date.now() - state.startTime;
  }
  hudTime.textContent = formatTime(state.elapsedMs);

  render();
  requestAnimationFrame(loop);
}

function shade(hex, amt) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amt));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amt));
  return `rgb(${r}, ${g}, ${b})`;
}

function enableAudio() {
  if (audio.enabled) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  audio.ctx = new Ctx();
  audio.enabled = true;
  startMusic();
}

function sfx(type) {
  if (!audio.enabled || !audio.ctx) return;
  const t = audio.ctx.currentTime;
  const o = audio.ctx.createOscillator();
  const g = audio.ctx.createGain();

  o.type = "square";
  if (type === "correct") {
    o.frequency.setValueAtTime(660, t);
    o.frequency.exponentialRampToValueAtTime(990, t + 0.12);
  } else if (type === "wrong") {
    o.frequency.setValueAtTime(220, t);
    o.frequency.exponentialRampToValueAtTime(160, t + 0.2);
  } else if (type === "levelup") {
    o.frequency.setValueAtTime(440, t);
    o.frequency.setValueAtTime(660, t + 0.1);
    o.frequency.setValueAtTime(880, t + 0.2);
  } else if (type === "interact") {
    o.frequency.setValueAtTime(520, t);
    o.frequency.exponentialRampToValueAtTime(680, t + 0.08);
  } else {
    o.frequency.setValueAtTime(160, t);
  }

  g.gain.setValueAtTime(0.001, t);
  g.gain.exponentialRampToValueAtTime(0.08, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

  o.connect(g).connect(audio.ctx.destination);
  o.start(t);
  o.stop(t + 0.24);
}

function startMusic() {
  if (!audio.ctx || audio.loopId) return;
  const notes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 293.66, 329.63];
  let i = 0;

  audio.loopId = setInterval(() => {
    if (!audio.ctx || state.gameOver) return;
    const t = audio.ctx.currentTime;

    const o = audio.ctx.createOscillator();
    const g = audio.ctx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(notes[i % notes.length], t);
    g.gain.setValueAtTime(0.001, t);
    g.gain.exponentialRampToValueAtTime(0.03, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.21);
    o.connect(g).connect(audio.ctx.destination);
    o.start(t);
    o.stop(t + 0.22);

    const bass = audio.ctx.createOscillator();
    const bg = audio.ctx.createGain();
    bass.type = "triangle";
    bass.frequency.setValueAtTime(notes[(i + 4) % notes.length] / 2, t);
    bg.gain.setValueAtTime(0.001, t);
    bg.gain.exponentialRampToValueAtTime(0.02, t + 0.03);
    bg.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    bass.connect(bg).connect(audio.ctx.destination);
    bass.start(t);
    bass.stop(t + 0.22);

    i += 1;
  }, 250);
}

function stopMusic() {
  if (audio.loopId) {
    clearInterval(audio.loopId);
    audio.loopId = null;
  }
}

function resetGame() {
  stopMusic();
  state.levelIndex = 0;
  state.activeNpc = null;
  state.modalOpen = false;
  state.gameOver = false;
  state.timerStarted = false;
  state.startTime = 0;
  state.elapsedMs = 0;
  state.streak = 0;
  state.questionsAnswered = 0;
  state.player.facing = "down";

  endScreen.classList.add("hidden");
  questionModal.classList.add("hidden");
  messageBox.classList.add("hidden");

  loadLevel(0);
  showMessage("Career Start", "Desk Worker role: solve all 5 questions to earn promotion.");
}

window.addEventListener("keydown", (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  state.keys[key] = true;

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
    e.preventDefault();
  }

  if (e.key === "e" || e.key === "E" || e.key === "Enter") {
    interact();
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  state.keys[key] = false;
});

touchInteract.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  interact();
});

function updateStick(clientX, clientY) {
  const rect = joystick.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = clientX - cx;
  const dy = clientY - cy;
  const max = rect.width * 0.32;
  const dist = Math.hypot(dx, dy);
  const clamped = dist > max ? max / dist : 1;

  const sx = dx * clamped;
  const sy = dy * clamped;

  stick.style.left = `${31 + (sx / max) * 31}%`;
  stick.style.top = `${31 + (sy / max) * 31}%`;

  state.joystick.dx = sx / max;
  state.joystick.dy = sy / max;
}

joystick.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  joystick.setPointerCapture(e.pointerId);
  state.joystick.active = true;
  updateStick(e.clientX, e.clientY);
});

joystick.addEventListener("pointermove", (e) => {
  if (!state.joystick.active) return;
  updateStick(e.clientX, e.clientY);
});

function resetStick() {
  state.joystick.active = false;
  state.joystick.dx = 0;
  state.joystick.dy = 0;
  stick.style.left = "31%";
  stick.style.top = "31%";
}

joystick.addEventListener("pointerup", resetStick);
joystick.addEventListener("pointercancel", resetStick);

messageBtn.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    messageBox.classList.add("hidden");
    state.modalOpen = false;
  }
});

restartBtn.addEventListener("click", resetGame);

loadLevel(0);
showMessage(
  "Welcome to Eco Quest",
  "Move to each colleague, press INTERACT, answer correctly, and climb from Desk Worker to CEO."
);
requestAnimationFrame(loop);
