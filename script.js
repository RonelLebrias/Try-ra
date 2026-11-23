const stepName = document.getElementById("step-name");
const stepQuestion = document.getElementById("step-question");
const stepResult = document.getElementById("step-result");
const nameInput = document.getElementById("name-input");
const nextBtn = document.getElementById("next-btn");
const question = document.getElementById("question");
const result = document.getElementById("result");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const heartsBox = document.getElementById("hearts");

let userName = "";
let yesScale = 1;

// Step 1 -> Step 2
function goNext() {
  const value = nameInput.value.trim();
  if (!value) {
    nameInput.focus();
    nameInput.placeholder = "Ayaw ig-skip, type una imong name 😅";
    return;
  }
  userName = value;
  question.textContent = userName + ", crush mo ko? 👀";
  stepName.classList.add("hidden");
  stepQuestion.classList.remove("hidden");
}
nextBtn.addEventListener("click", goNext);
nameInput.addEventListener("keydown", (e) => { if (e.key === "Enter") goNext(); });

// "No" button: likay bisan pila ka beses
function dodge(e) {
  if (e) e.preventDefault();
  const pad = 10;
  const maxX = window.innerWidth - noBtn.offsetWidth - pad;
  const maxY = window.innerHeight - noBtn.offsetHeight - pad;
  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "5";
  noBtn.style.left = Math.max(pad, Math.random() * maxX) + "px";
  noBtn.style.top = Math.max(pad, Math.random() * maxY) + "px";

  // mas dako ang Yes sa matag likay
  yesScale = Math.min(yesScale + 0.12, 2);
  yesBtn.style.transform = "scale(" + yesScale + ")";
}
noBtn.addEventListener("mouseover", dodge);
noBtn.addEventListener("touchstart", dodge, { passive: false });
noBtn.addEventListener("click", dodge); // backup kung ma-click gihapon

// "Yes" button
yesBtn.addEventListener("click", () => {
  result.textContent = "I know you have a crush on me, " + userName + " 😏💖";
  stepQuestion.classList.add("hidden");
  stepResult.classList.remove("hidden");
  noBtn.style.display = "none";
  for (let i = 0; i < 40; i++) setTimeout(spawnHeart, i * 80);
});

// floating hearts
function spawnHeart() {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = ["💖", "💘", "💗", "💕", "❤️"][Math.floor(Math.random() * 5)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 18 + Math.random() * 28 + "px";
  h.style.animationDuration = 4 + Math.random() * 4 + "s";
  heartsBox.appendChild(h);
  setTimeout(() => h.remove(), 8000);
}
setInterval(spawnHeart, 700);
