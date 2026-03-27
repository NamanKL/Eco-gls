const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const hudLevel = document.getElementById("hud-level");
const hudProgress = document.getElementById("hud-progress");
const hudTime = document.getElementById("hud-time");
const hudStreak = document.getElementById("hud-streak");
const hudLives = document.getElementById("hud-lives");
const hudHints = document.getElementById("hud-hints");

const messageBox = document.getElementById("message-box");
const messageTitle = document.getElementById("message-title");
const messageText = document.getElementById("message-text");
const messageBtn = document.getElementById("message-btn");

const questionModal = document.getElementById("question-modal");
const questionText = document.getElementById("question-text");
const optionsWrap = document.getElementById("options-wrap");
const questionFeedback = document.getElementById("question-feedback");
const questionClose = document.getElementById("question-close");
const hintBtn = document.getElementById("hint-btn");

const endScreen = document.getElementById("end-screen");
const endTitle = document.getElementById("end-title");
const endLead = document.getElementById("end-lead");
const finalTime = document.getElementById("final-time");
const finalSummary = document.getElementById("final-summary");
const leaderboard = document.getElementById("leaderboard");
const restartBtn = document.getElementById("restart-btn");

const touchInteract = document.getElementById("touch-interact");
const touchHint = document.getElementById("touch-hint");
const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");
const gameShell = document.querySelector(".game-shell");
const startScreen = document.getElementById("start-screen");
const playerNameInput = document.getElementById("player-name");
const difficultyButtons = [...document.querySelectorAll(".difficulty-btn")];

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
      "#..####............#",
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
      "#..P......D........#",
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
      "#..######....#######",
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
      "#..D..####....D....#",
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
      "#..D...###.###..D..#",
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

const SECONDARY_QUESTION_BANK = LEVELS.map((level) =>
  level.questions.map((q) => ({ ...q, options: [...q.options] }))
);

const PYP_QUESTION_BANK = [
  [
    {
      q: "Demand goes up and supply stays the same. Price will usually:",
      options: ["Go down", "Go up", "Stay the same", "Be zero"],
      answer: 1,
      explain: "When more people want the product, sellers can charge a higher price."
    },
    {
      q: "Opportunity cost means:",
      options: ["Only money spent", "The next best choice you gave up", "All business costs", "A fixed payment"],
      answer: 1,
      explain: "It is what you miss out on when picking one option over another."
    },
    {
      q: "Most private businesses mainly try to:",
      options: ["Make profit", "Collect taxes", "Run elections", "Write laws"],
      answer: 0,
      explain: "Private businesses usually aim to earn profit over time."
    },
    {
      q: "Revenue is:",
      options: ["Total cost", "Money from sales", "Only profit", "Only cash at bank"],
      answer: 1,
      explain: "Revenue is the total sales income."
    },
    {
      q: "Marketing helps a business to:",
      options: ["Ignore customers", "Meet customer needs", "Stop all competition", "Raise all prices forever"],
      answer: 1,
      explain: "Good marketing finds out what customers want and serves them."
    }
  ],
  [
    {
      q: "If price is above equilibrium, the market has:",
      options: ["Shortage", "Surplus", "No goods", "No buyers"],
      answer: 1,
      explain: "High prices often leave unsold goods, which is a surplus."
    },
    {
      q: "Which is a variable cost for a bakery?",
      options: ["Rent", "Flour per loaf", "Insurance", "Building loan"],
      answer: 1,
      explain: "Flour use changes with output."
    },
    {
      q: "Profit =",
      options: ["Revenue - total costs", "Revenue + costs", "Costs - revenue", "Price ÷ quantity"],
      answer: 0,
      explain: "Profit is what remains after all costs are subtracted."
    },
    {
      q: "A USP is mainly used to:",
      options: ["Copy rivals", "Stand out from rivals", "Close the business", "Reduce demand"],
      answer: 1,
      explain: "USP makes the business different and memorable."
    },
    {
      q: "A common advantage of sole trader businesses is:",
      options: ["Unlimited liability", "Fast decisions", "No risk", "Guaranteed profit"],
      answer: 1,
      explain: "One owner can usually decide quickly."
    }
  ],
  [
    {
      q: "In monopolistic competition, firms often compete by:",
      options: ["Selling identical products only", "Branding and product differences", "Stopping advertising", "Government control"],
      answer: 1,
      explain: "They try to look different to attract customers."
    },
    {
      q: "Economies of scale mean average costs can:",
      options: ["Go up with output", "Go down with output", "Never change", "Always be zero"],
      answer: 1,
      explain: "Larger production can spread costs and lower average cost."
    },
    {
      q: "To grow market share, a business may:",
      options: ["Never promote", "Use competitive pricing and promotion", "Ignore customers", "Stop improving products"],
      answer: 1,
      explain: "Pricing and promotion can attract more buyers."
    },
    {
      q: "Contribution per unit =",
      options: ["Selling price - variable cost", "Fixed cost - profit", "Revenue ÷ workers", "Assets - liabilities"],
      answer: 0,
      explain: "Contribution helps cover fixed costs first."
    },
    {
      q: "An entrepreneur usually:",
      options: ["Avoids all risk", "Organizes resources and takes risk", "Never innovates", "Only works for government"],
      answer: 1,
      explain: "Entrepreneurs bring ideas together and accept uncertainty."
    }
  ],
  [
    {
      q: "In an oligopoly, firms are interdependent because:",
      options: ["One firm's actions affect rivals", "Only one seller exists", "Government sets all prices", "Products are always free"],
      answer: 0,
      explain: "Big firms watch each other closely and respond."
    },
    {
      q: "Break-even is when:",
      options: ["Total revenue = total cost", "Revenue is zero", "Profit is highest", "Fixed costs are zero"],
      answer: 0,
      explain: "At break-even, profit is zero."
    },
    {
      q: "A social enterprise aims for profit and:",
      options: ["No mission", "Social/environment goals", "Monopoly power only", "Lower quality only"],
      answer: 1,
      explain: "It balances money goals with positive impact."
    },
    {
      q: "If PED is greater than 1, demand is:",
      options: ["Inelastic", "Perfectly fixed", "Elastic", "Always negative"],
      answer: 2,
      explain: "Elastic demand changes a lot when price changes."
    },
    {
      q: "High gearing means:",
      options: ["High debt compared with equity", "No long-term finance", "Only retained profit", "No liabilities"],
      answer: 0,
      explain: "Gearing measures how much debt finance is used."
    }
  ],
  [
    {
      q: "If marginal cost is below average cost, average cost will:",
      options: ["Rise", "Fall", "Stay the same", "Become zero"],
      answer: 1,
      explain: "A lower marginal value pulls the average down."
    },
    {
      q: "Predatory pricing is most linked with:",
      options: ["Perfect competition", "Dominant firms", "Charities only", "Small local markets only"],
      answer: 1,
      explain: "Powerful firms can undercut rivals to push them out."
    },
    {
      q: "A likely long-run objective for a multinational is:",
      options: ["Sustainable growth and value", "One-day sales only", "No reinvestment", "Lower quality always"],
      answer: 0,
      explain: "Large firms usually focus on long-term growth and returns."
    },
    {
      q: "Higher productivity means:",
      options: ["More output per input", "Only higher fixed cost", "Always lower sales", "More waste"],
      answer: 0,
      explain: "Productivity is how efficiently inputs create output."
    },
    {
      q: "Opportunity cost of using capital is the:",
      options: ["Past sunk cost", "Next best return given up", "Depreciation only", "GDP growth rate"],
      answer: 1,
      explain: "Choosing one investment means giving up another return."
    }
  ]
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
  playerName: "",
  difficulty: "Secondary",
  npcs: [],
  player: {
    x: 10 * TILE,
    y: 7 * TILE,
    speed: 135,
    facing: "down"
  },
  keys: {},
  joystick: { active: false, dx: 0, dy: 0, pointerId: null, touchId: null, sx: 0, sy: 0 },
  activeNpc: null,
  modalOpen: false,
  gameOver: false,
  timerStarted: false,
  startTime: 0,
  elapsedMs: 0,
  streak: 0,
  questionsAnswered: 0,
  lives: 3,
  hintsLeft: 2,
  hintsUsed: 0,
  gameStarted: false,
  gameOverReason: "",
  optionsState: null
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

function getQuestionBank(levelIndex) {
  return state.difficulty === "PYP" ? PYP_QUESTION_BANK[levelIndex] : SECONDARY_QUESTION_BANK[levelIndex];
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
  const shuffled = npc.question.options.map((opt, idx) => ({ opt, idx }));
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  state.optionsState = shuffled.map(({ opt, idx }) => ({ opt, idx, eliminated: false }));
  renderOptions();
  updateHintButtons();
}

function renderOptions() {
  optionsWrap.innerHTML = "";
  if (!state.optionsState) return;
  state.optionsState.forEach(({ opt, idx, eliminated }, displayIdx) => {
    const btn = document.createElement("button");
    btn.className = "pixel-btn";
    btn.textContent = `${String.fromCharCode(65 + displayIdx)}. ${opt}`;
    if (eliminated) {
      btn.disabled = true;
      btn.style.opacity = "0.55";
    } else {
      btn.addEventListener("click", () => handleAnswer(idx));
    }
    optionsWrap.appendChild(btn);
  });
}

function useHint() {
  const npc = state.activeNpc;
  if (!npc || npc.completed || state.hintsLeft <= 0 || !state.optionsState) return;

  const wrongIndexes = [];
  state.optionsState.forEach((item, i) => {
    if (!item.eliminated && item.idx !== npc.question.answer) wrongIndexes.push(i);
  });
  if (!wrongIndexes.length) return;

  state.hintsLeft -= 1;
  state.hintsUsed += 1;

  for (let removed = 0; removed < 2 && wrongIndexes.length > 0; removed += 1) {
    const pick = Math.floor(Math.random() * wrongIndexes.length);
    const optionIndex = wrongIndexes.splice(pick, 1)[0];
    state.optionsState[optionIndex].eliminated = true;
  }

  questionFeedback.classList.remove("wrong");
  questionFeedback.textContent = "Hint used: two wrong options removed.";
  renderOptions();
  updateHUD();
  updateHintButtons();
}

function updateHintButtons() {
  const disabled = state.hintsLeft <= 0 || !state.modalOpen || !state.activeNpc || state.activeNpc.completed;
  if (hintBtn) {
    hintBtn.disabled = disabled;
    hintBtn.textContent = disabled ? "No Hints Left" : `Use Hint (${state.hintsLeft} left)`;
  }
  if (touchHint) {
    touchHint.disabled = disabled;
    touchHint.textContent = disabled ? "NO HINTS" : `HINT (${state.hintsLeft})`;
  }
}

function endGameWithLoss() {
  state.gameOver = true;
  state.gameOverReason = "loss";
  if (state.timerStarted) {
    state.elapsedMs = Date.now() - state.startTime;
  }

  endTitle.textContent = "Game Over";
  endLead.textContent = "You ran out of lives. Restart and try the climb again.";
  finalTime.textContent = formatTime(state.elapsedMs);
  const livesUsed = Math.max(0, 3 - state.lives);
  finalSummary.textContent = `${state.playerName || "Player"} | Difficulty: ${state.difficulty} | Lives used: ${livesUsed}/3`;
  if (leaderboard) {
    leaderboard.innerHTML = "";
  }
  endScreen.classList.remove("hidden");
}

function saveResultEntry() {
  const entry = {
    name: state.playerName || "Player",
    difficulty: state.difficulty,
    timeMs: state.elapsedMs,
    livesUsed: Math.max(0, 3 - state.lives),
    date: new Date().toISOString()
  };
  const key = "ecoQuestLeaderboard";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  const next = [...existing, entry]
    .sort((a, b) => a.timeMs - b.timeMs)
    .slice(0, 10);
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}

function drawLeaderboard(entries) {
  if (!leaderboard) return;
  if (!entries.length) {
    leaderboard.innerHTML = "<p>No leaderboard entries yet.</p>";
    return;
  }
  leaderboard.innerHTML = entries
    .map(
      (entry, i) =>
        `<p>${i + 1}. ${entry.name} (${entry.difficulty}) - ${formatTime(entry.timeMs)} | Lives used: ${entry.livesUsed}</p>`
    )
    .join("");
}

function startSession(playerName, difficulty) {
  state.playerName = playerName.trim() || "Player";
  state.difficulty = difficulty;
  state.gameStarted = true;
  startScreen.classList.add("hidden");
  resetGame();
  showMessage(
    "Welcome to Eco Quest",
    `${state.playerName}, begin as Desk Worker (${state.difficulty}). Solve all 5 questions to earn each promotion.`
  );
}

function clearQuestionState() {
  state.optionsState = null;
  updateHintButtons();
}

hintBtn.addEventListener("click", useHint);
if (touchHint) {
  touchHint.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    useHint();
  });
  touchHint.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      useHint();
    },
    { passive: false }
  );
}

difficultyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const difficulty = btn.dataset.difficulty || "Secondary";
    startSession(playerNameInput.value, difficulty);
  });
});

function hideQuestion() {
  questionModal.classList.add("hidden");
  state.modalOpen = false;
  state.activeNpc = null;
  clearQuestionState();
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
    updateHintButtons();
    updateHUD();
  } else {
    state.streak = 0;
    state.lives = Math.max(0, state.lives - 1);
    sfx("wrong");
    questionFeedback.classList.add("wrong");
    questionFeedback.textContent = `Not quite. Lives left: ${state.lives}. Try again and think like a strategist.`;
    if (state.lives === 0) {
      hideQuestion();
      endGameWithLoss();
      return;
    }
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
  state.gameOverReason = "win";
  if (state.timerStarted) {
    state.elapsedMs = Date.now() - state.startTime;
  }

  const entries = saveResultEntry();
  endScreen.classList.remove("hidden");
  endTitle.textContent = "Promotion Complete";
  endLead.textContent = "You reached CEO and mastered the office ladder.";
  finalTime.textContent = formatTime(state.elapsedMs);
  const livesUsed = Math.max(0, 3 - state.lives);
  finalSummary.textContent = `${state.playerName || "Player"} | Difficulty: ${state.difficulty} | Questions solved: ${state.questionsAnswered}/25 | Lives used: ${livesUsed}/3 | Hints used: ${state.hintsUsed}`;
  drawLeaderboard(entries);
}

function loadLevel(index) {
  const level = LEVELS[index];
  state.npcs = createNpcSet(level);
  const levelQuestions = getQuestionBank(index);
  state.npcs.forEach((npc, i) => {
    npc.question = levelQuestions[i];
  });

  state.player.x = 10 * TILE;
  state.player.y = 7 * TILE;
  state.hintsLeft = 2;
  updateHUD();
  updateHintButtons();
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
  if (state.modalOpen || state.gameOver || !state.gameStarted) return;
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
  hudLives.textContent = String(state.lives);
  hudHints.textContent = String(state.hintsLeft);
}

function maybeStartTimer() {
  if (!state.timerStarted) {
    state.timerStarted = true;
    state.startTime = Date.now();
  }
}

function movePlayer(dt) {
  if (state.modalOpen || state.gameOver || !state.gameStarted) {
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
let lastRenderedSecond = -1;
function loop(now) {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;

  movePlayer(dt);
  if (state.timerStarted && !state.gameOver) {
    state.elapsedMs = Date.now() - state.startTime;
  }
  const currentSecond = Math.floor(state.elapsedMs / 1000);
  if (currentSecond !== lastRenderedSecond) {
    hudTime.textContent = formatTime(state.elapsedMs);
    lastRenderedSecond = currentSecond;
  }

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
  state.lives = 3;
  state.hintsLeft = 2;
  state.hintsUsed = 0;
  state.gameOverReason = "";
  state.player.facing = "down";
  clearQuestionState();

  endScreen.classList.add("hidden");
  questionModal.classList.add("hidden");
  messageBox.classList.add("hidden");

  loadLevel(0);
  if (state.gameStarted) {
    showMessage("Career Start", "Desk Worker role: solve all 5 questions to earn promotion.");
  }
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

touchInteract.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    interact();
  },
  { passive: false }
);

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

  state.joystick.sx = sx;
  state.joystick.sy = sy;
  stick.style.transform = `translate(calc(-50% + ${sx}px), calc(-50% + ${sy}px))`;

  state.joystick.dx = sx / max;
  state.joystick.dy = sy / max;
}

joystick.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  joystick.setPointerCapture(e.pointerId);
  state.joystick.active = true;
  state.joystick.pointerId = e.pointerId;
  updateStick(e.clientX, e.clientY);
});

joystick.addEventListener("pointermove", (e) => {
  if (!state.joystick.active || state.joystick.pointerId !== e.pointerId) return;
  updateStick(e.clientX, e.clientY);
});

function resetStick() {
  state.joystick.active = false;
  state.joystick.pointerId = null;
  state.joystick.touchId = null;
  state.joystick.dx = 0;
  state.joystick.dy = 0;
  state.joystick.sx = 0;
  state.joystick.sy = 0;
  stick.style.transform = "translate(-50%, -50%)";
}

joystick.addEventListener("pointerup", (e) => {
  if (state.joystick.pointerId !== e.pointerId) return;
  resetStick();
});
joystick.addEventListener("pointercancel", (e) => {
  if (state.joystick.pointerId !== e.pointerId) return;
  resetStick();
});
joystick.addEventListener("pointerleave", (e) => {
  if (state.joystick.pointerId !== e.pointerId) return;
  resetStick();
});

joystick.addEventListener(
  "touchstart",
  (e) => {
    if (!e.changedTouches.length || state.joystick.active) return;
    e.preventDefault();
    const touch = e.changedTouches[0];
    state.joystick.active = true;
    state.joystick.touchId = touch.identifier;
    updateStick(touch.clientX, touch.clientY);
  },
  { passive: false }
);

joystick.addEventListener(
  "touchmove",
  (e) => {
    if (!state.joystick.active || state.joystick.touchId === null) return;
    const touch = [...e.changedTouches].find((t) => t.identifier === state.joystick.touchId);
    if (!touch) return;
    e.preventDefault();
    updateStick(touch.clientX, touch.clientY);
  },
  { passive: false }
);

joystick.addEventListener(
  "touchend",
  (e) => {
    if (!state.joystick.active || state.joystick.touchId === null) return;
    const ended = [...e.changedTouches].some((t) => t.identifier === state.joystick.touchId);
    if (!ended) return;
    e.preventDefault();
    resetStick();
  },
  { passive: false }
);

joystick.addEventListener(
  "touchcancel",
  (e) => {
    if (!state.joystick.active || state.joystick.touchId === null) return;
    const canceled = [...e.changedTouches].some((t) => t.identifier === state.joystick.touchId);
    if (!canceled) return;
    resetStick();
  },
  { passive: false }
);

messageBtn.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    messageBox.classList.add("hidden");
    state.modalOpen = false;
  }
});

restartBtn.addEventListener("click", () => resetGame());

const fsBtn = document.getElementById("fs-btn");
function updateViewportHeight() {
  const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${viewportHeight * 0.01}px`);
}

function preventTouchScroll(e) {
  if (!gameShell || !gameShell.contains(e.target)) {
    return;
  }
  if (e.target.closest("#question-modal")) {
    return;
  }
  e.preventDefault();
}

if (fsBtn) {
  fsBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  });
  document.addEventListener("fullscreenchange", () => {
    fsBtn.textContent = document.fullscreenElement ? "⛶ EXIT" : "⛶ FULL";
    updateViewportHeight();
  });
}

window.addEventListener("resize", updateViewportHeight);
window.addEventListener("orientationchange", updateViewportHeight);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", updateViewportHeight);
}
document.addEventListener("touchmove", preventTouchScroll, { passive: false });
document.addEventListener("gesturestart", preventTouchScroll, { passive: false });
updateViewportHeight();

loadLevel(0);
updateHintButtons();
requestAnimationFrame(loop);
