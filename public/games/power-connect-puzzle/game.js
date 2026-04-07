// ------------------------------------------------------------
// game.js - Core game logic for Power Connect Puzzle, as per the GDD.
// The game will not start until the user clicks "Start Game".
// ------------------------------------------------------------

// ----- AUDIO SETUP -----
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(frequency, duration) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = "square";
  oscillator.frequency.value = frequency;
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration / 1000);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration / 1000);
}

// ----- GLOBAL CONSTANTS & VARIABLES -----
const COLS = 10, ROWS = 20, CELL_SIZE = 30;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let grid = [];
for (let r = 0; r < ROWS; r++) {
  grid[r] = new Array(COLS).fill(null);
}

let score = 0;
let abilityPoints = 0;
let fallSpeed = 1000;
let lastFallTime = Date.now();
let fallingPiece = null;
let gameOver = false;

let floatingTexts = [];
const FLOATING_TEXT_DURATION = 1000;

const opposite = { top: "bottom", bottom: "top", left: "right", right: "left" };
const COLORS = {
  gridLine: "rgba(91, 113, 134, 0.45)",
  powerFill: "#ff5f8f",
  connectorFill: "#49d47d",
  slabBorder: "#081017",
  activeLine: "#f4fbff",
  poweredLine: "#ff66e8",
  abilityMark: "#fff1a6",
  floatingText: "#f3fbff",
};

const startMenu = document.getElementById("startMenu");
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function() {
  startMenu.style.display = "none";
  resetGame();
  initGame();
});

function resetGame() {
  score = 0;
  abilityPoints = 0;
  fallSpeed = 1000;
  lastFallTime = Date.now();
  gameOver = false;
  grid = [];
  for (let r = 0; r < ROWS; r++) {
    grid[r] = new Array(COLS).fill(null);
  }
}

function initGame() {
  fallingPiece = spawnFallingPiece();
  update();
}

let powerOption = { type: "power", configuration: null, orientation: 0 };
let lineOption  = { type: "connector", configuration: "line", orientation: 0 };
let lOption     = { type: "connector", configuration: "L", orientation: 0 };
let selectedAbility = powerOption;

const abilityPowerCanvas = document.getElementById("abilityPower");
const abilityLineCanvas  = document.getElementById("abilityLine");
const abilityLCanvas     = document.getElementById("abilityL");

function getActiveConnections(slab) {
  if (slab.type === "power") {
    const sides = ["top", "right", "bottom", "left"];
    return [sides[slab.orientation]];
  } else if (slab.type === "connector") {
    if (slab.configuration === "line") {
      return (slab.orientation % 2 === 0) ? ["top", "bottom"] : ["left", "right"];
    } else if (slab.configuration === "L") {
      if (slab.orientation === 0) return ["top", "right"];
      if (slab.orientation === 1) return ["right", "bottom"];
      if (slab.orientation === 2) return ["bottom", "left"];
      if (slab.orientation === 3) return ["left", "top"];
    }
  }
  return [];
}

function drawAbilityOption(canv, option) {
  const actx = canv.getContext("2d");
  const size = canv.width;
  actx.clearRect(0, 0, size, size);
  
  actx.fillStyle = (option.type === "power") ? COLORS.powerFill : COLORS.connectorFill;
  actx.fillRect(0, 0, size, size);
  
  actx.strokeStyle = COLORS.slabBorder;
  actx.lineWidth = 2;
  actx.strokeRect(0, 0, size, size);
  
  let connections = getActiveConnections(option);
  actx.strokeStyle = COLORS.activeLine;
  actx.lineWidth = 6;
  let centerX = size / 2;
  let centerY = size / 2;
  connections.forEach(con => {
    let targetX = centerX, targetY = centerY;
    if (con === "top") targetY = 0;
    else if (con === "bottom") targetY = size;
    else if (con === "left") targetX = 0;
    else if (con === "right") targetX = size;
    actx.beginPath();
    actx.moveTo(centerX, centerY);
    actx.lineTo(targetX, targetY);
    actx.stroke();
  });
}

function drawAllAbilityOptions() {
  drawAbilityOption(abilityPowerCanvas, powerOption);
  drawAbilityOption(abilityLineCanvas, lineOption);
  drawAbilityOption(abilityLCanvas, lOption);
}

function updateAbilitySelectionDisplay() {
  abilityPowerCanvas.classList.remove("selected");
  abilityLineCanvas.classList.remove("selected");
  abilityLCanvas.classList.remove("selected");
  if (selectedAbility === powerOption) {
    abilityPowerCanvas.classList.add("selected");
  } else if (selectedAbility === lineOption) {
    abilityLineCanvas.classList.add("selected");
  } else if (selectedAbility === lOption) {
    abilityLCanvas.classList.add("selected");
  }
}

drawAllAbilityOptions();
updateAbilitySelectionDisplay();

abilityPowerCanvas.addEventListener("click", function() {
  if (selectedAbility === powerOption) {
    powerOption.orientation = (powerOption.orientation + 1) % 4;
  } else {
    selectedAbility = powerOption;
  }
  drawAllAbilityOptions();
  updateAbilitySelectionDisplay();
});

abilityLineCanvas.addEventListener("click", function() {
  if (selectedAbility === lineOption) {
    lineOption.orientation = (lineOption.orientation + 1) % 4;
  } else {
    selectedAbility = lineOption;
  }
  drawAllAbilityOptions();
  updateAbilitySelectionDisplay();
});

abilityLCanvas.addEventListener("click", function() {
  if (selectedAbility === lOption) {
    lOption.orientation = (lOption.orientation + 1) % 4;
  } else {
    selectedAbility = lOption;
  }
  drawAllAbilityOptions();
  updateAbilitySelectionDisplay();
});

function Slab(type, configuration, orientation, hasAbility) {
  this.type = type;
  this.configuration = configuration;
  this.orientation = orientation;
  this.hasAbility = hasAbility || false;
}

function getActiveConnectionsForGame(slab) {
  if (slab.type === "power") {
    const sides = ["top", "right", "bottom", "left"];
    return [sides[slab.orientation]];
  } else if (slab.type === "connector") {
    if (slab.configuration === "line") {
      return (slab.orientation % 2 === 0) ? ["top", "bottom"] : ["left", "right"];
    } else if (slab.configuration === "L") {
      if (slab.orientation === 0) return ["top", "right"];
      if (slab.orientation === 1) return ["right", "bottom"];
      if (slab.orientation === 2) return ["bottom", "left"];
      if (slab.orientation === 3) return ["left", "top"];
    }
  }
  return [];
}

function spawnFallingPiece() {
  let type;
  if (Math.random() < 0.2) {
    type = "power";
  } else {
    type = "connector";
  }
  let configuration = null;
  if (type === "connector") {
    configuration = (Math.random() < 0.5) ? "line" : "L";
  }
  const orientation = Math.floor(Math.random() * 4);
  const hasAbility = (type === "connector" && Math.random() < 0.2);
  return {
    slab: new Slab(type, configuration, orientation, hasAbility),
    x: Math.floor(COLS / 2),
    y: 0
  };
}
fallingPiece = spawnFallingPiece();

document.addEventListener("keydown", function(e) {
  if (gameOver || !fallingPiece) return;
  switch (e.key) {
    case "ArrowLeft":
      e.preventDefault();
      if (canMove(fallingPiece, -1, 0)) { fallingPiece.x--; }
      break;
    case "ArrowRight":
      e.preventDefault();
      if (canMove(fallingPiece, 1, 0)) { fallingPiece.x++; }
      break;
    case "s":
    case "S":
      if (canMove(fallingPiece, 0, 1)) { fallingPiece.y++; }
      else { lockFallingPiece(); }
      break;
    case " ":
      e.preventDefault();
      fallingPiece.slab.orientation = (fallingPiece.slab.orientation + 1) % 4;
      if (!canMove(fallingPiece, 0, 0)) {
        fallingPiece.slab.orientation = (fallingPiece.slab.orientation + 3) % 4;
      }
      break;
  }
});

canvas.addEventListener("click", function(e) {
  if (gameOver || !fallingPiece) return;
  if (!selectedAbility) return;
  if (abilityPoints <= 0) return;
  
  let rect = canvas.getBoundingClientRect();
  let mx = e.clientX - rect.left;
  let my = e.clientY - rect.top;
  let col = Math.floor(mx / CELL_SIZE);
  let row = Math.floor(my / CELL_SIZE);
  
  if (row >= 0 && row < ROWS && col >= 0 && col < COLS && grid[row][col]) {
    let slab = grid[row][col];
    slab.type = selectedAbility.type;
    slab.configuration = selectedAbility.configuration;
    slab.orientation = selectedAbility.orientation;
    slab.hasAbility = false;
    abilityPoints--;
    updateHUD();
    checkConnections();
    applyGravity();
    render();
    return;
  }
  
  if (fallingPiece && fallingPiece.x === col && fallingPiece.y === row) {
    fallingPiece.slab.type = selectedAbility.type;
    fallingPiece.slab.configuration = selectedAbility.configuration;
    fallingPiece.slab.orientation = selectedAbility.orientation;
    fallingPiece.slab.hasAbility = false;
    abilityPoints--;
    updateHUD();
    lockFallingPiece();
    return;
  }
});

function canMove(piece, dx, dy) {
  let newX = piece.x + dx;
  let newY = piece.y + dy;
  if (newX < 0 || newX >= COLS || newY < 0 || newY >= ROWS) return false;
  if (grid[newY][newX] !== null) return false;
  return true;
}

function lockFallingPiece() {
  grid[fallingPiece.y][fallingPiece.x] = fallingPiece.slab;
  playSound(300, 100);
  checkConnections();
  applyGravity();
  fallingPiece = spawnFallingPiece();
  if (!canMove(fallingPiece, 0, 0)) {
    gameOver = true;
    showStartMenu();
  }
}

function checkConnections() {
  let visited = Array.from({ length: ROWS }, () => new Array(COLS).fill(false));
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] && !visited[r][c]) {
        let group = [];
        dfs(c, r, visited, group);
        let powerCount = group.filter(item => item.slab.type === "power").length;
        if (powerCount >= 2) {
          let multiplier = 1;
          if (group.length >= 6) {
            multiplier = 3;
          } else if (group.length >= 4) {
            multiplier = 2;
          }
          playSound(200 + group.length * 20, 150);
          group.forEach(item => {
            let { x, y, slab } = item;
            if (slab.type === "connector" && slab.hasAbility) {
              abilityPoints++;
            }
            grid[y][x] = null;
          });
          score += group.length * multiplier;
          
          let sumX = 0, sumY = 0;
          group.forEach(item => { sumX += item.x; sumY += item.y; });
          let avgX = (sumX / group.length) * CELL_SIZE + CELL_SIZE / 2;
          let avgY = (sumY / group.length) * CELL_SIZE + CELL_SIZE / 2;
          
          floatingTexts.push({ x: avgX, y: avgY, text: "x" + multiplier, startTime: Date.now() });
        }
      }
    }
  }
}

function dfs(x, y, visited, group) {
  visited[y][x] = true;
  group.push({ x, y, slab: grid[y][x] });
  let active = getActiveConnectionsForGame(grid[y][x]);
  const dirs = [
    { dx: 0, dy: -1, dir: "top" },
    { dx: 1, dy: 0, dir: "right" },
    { dx: 0, dy: 1, dir: "bottom" },
    { dx: -1, dy: 0, dir: "left" }
  ];
  for (let d of dirs) {
    let nx = x + d.dx, ny = y + d.dy;
    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) continue;
    if (grid[ny][nx] && !visited[ny][nx]) {
      let neighborActive = getActiveConnectionsForGame(grid[ny][nx]);
      if (active.includes(d.dir) && neighborActive.includes(opposite[d.dir])) {
        dfs(nx, ny, visited, group);
      }
    }
  }
}

function computeGroups() {
  let groupIds = Array.from({ length: ROWS }, () => new Array(COLS).fill(null));
  let groupData = {};
  let visited = Array.from({ length: ROWS }, () => new Array(COLS).fill(false));
  let groupId = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] && !visited[r][c]) {
        let group = [];
        dfsGroup(c, r, visited, group);
        let hasPower = group.some(item => item.slab.type === "power");
        group.forEach(item => { groupIds[item.y][item.x] = groupId; });
        groupData[groupId] = { hasPower };
        groupId++;
      }
    }
  }
  return { groupIds, groupData };
}

function dfsGroup(x, y, visited, group) {
  visited[y][x] = true;
  group.push({ x, y, slab: grid[y][x] });
  let active = getActiveConnectionsForGame(grid[y][x]);
  const dirs = [
    { dx: 0, dy: -1, dir: "top" },
    { dx: 1, dy: 0, dir: "right" },
    { dx: 0, dy: 1, dir: "bottom" },
    { dx: -1, dy: 0, dir: "left" }
  ];
  for (let d of dirs) {
    let nx = x + d.dx, ny = y + d.dy;
    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) continue;
    if (grid[ny][nx] && !visited[ny][nx]) {
      let neighborActive = getActiveConnectionsForGame(grid[ny][nx]);
      if (active.includes(d.dir) && neighborActive.includes(opposite[d.dir])) {
        dfsGroup(nx, ny, visited, group);
      }
    }
  }
}

function applyGravity() {
  for (let c = 0; c < COLS; c++) {
    let stack = [];
    for (let r = 0; r < ROWS; r++) {
      if (grid[r][c]) { 
        stack.push(grid[r][c]); 
        grid[r][c] = null; 
      }
    }
    let row = ROWS - 1;
    while (stack.length > 0) {
      grid[row][c] = stack.pop();
      row--;
    }
  }
}

function update() {
  if (gameOver) return;
  let now = Date.now();
  if (now - lastFallTime > fallSpeed) {
    if (canMove(fallingPiece, 0, 1)) { fallingPiece.y++; }
    else { lockFallingPiece(); }
    lastFallTime = now;
    fallSpeed = Math.max(200, 1000 - score * 5);
    updateHUD();
  }
  render();
  requestAnimationFrame(update);
}

function updateHUD() {
  document.getElementById("score").innerText = score;
  document.getElementById("ability").innerText = abilityPoints;
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let groups = computeGroups();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      ctx.strokeStyle = "#444";
      ctx.strokeStyle = COLORS.gridLine;
      ctx.strokeRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      if (grid[r][c]) {
        let groupId = groups.groupIds[r][c];
        let lineColor = COLORS.activeLine;
        if (groupId !== null && groups.groupData[groupId].hasPower) { 
          lineColor = COLORS.poweredLine; 
        }
        drawSlab(grid[r][c], c, r, lineColor);
      }
    }
  }
  if (fallingPiece) {
    let fallingColor =
      fallingPiece.slab.type === "power" ? COLORS.poweredLine : COLORS.activeLine;
    drawSlab(fallingPiece.slab, fallingPiece.x, fallingPiece.y, fallingColor);
  }
  
  let currentTime = Date.now();
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    let ft = floatingTexts[i];
    let elapsed = currentTime - ft.startTime;
    if (elapsed > FLOATING_TEXT_DURATION) {
      floatingTexts.splice(i, 1);
      continue;
    }
    let alpha = 1 - elapsed / FLOATING_TEXT_DURATION;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = COLORS.floatingText;
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(ft.text, ft.x, ft.y);
    ctx.restore();
  }
}

function drawSlab(slab, gridX, gridY, lineColor) {
  let x = gridX * CELL_SIZE;
  let y = gridY * CELL_SIZE;
  ctx.fillStyle = slab.type === "power" ? COLORS.powerFill : COLORS.connectorFill;
  ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
  ctx.strokeStyle = COLORS.slabBorder;
  ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
  
  let connections = getActiveConnectionsForGame(slab);
  ctx.lineWidth = 2;
  ctx.strokeStyle = lineColor;
  connections.forEach(con => {
    let centerX = x + CELL_SIZE / 2;
    let centerY = y + CELL_SIZE / 2;
    let targetX = centerX, targetY = centerY;
    if (con === "top") targetY = y;
    else if (con === "bottom") targetY = y + CELL_SIZE;
    else if (con === "left") targetX = x;
    else if (con === "right") targetX = x + CELL_SIZE;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(targetX, targetY);
    ctx.stroke();
  });
  
  if (slab.type === "connector" && slab.hasAbility) {
    ctx.fillStyle = COLORS.abilityMark;
    ctx.font = "12px sans-serif";
    ctx.fillText("A", x + CELL_SIZE / 2 - 4, y + CELL_SIZE / 2 + 4);
  }
}

function showStartMenu() {
  startMenu.style.display = "flex";
  startMenu.innerHTML = `
    <h1>Game Over</h1>
    <p>Final Score: ${score}</p>
    <button id="startButton">Restart Game</button>
  `;
  document.getElementById("startButton").addEventListener("click", function() {
    startMenu.style.display = "none";
    resetGame();
    initGame();
  });
}
