let questions = [];
let currentIndex = 0;
let userAnswers = {};

const DUREE_CHRONO = 40;
let tempsRestant = DUREE_CHRONO;
let timerInterval = null;

let lifelines = {
  fiftFifty: false,
  public: false,
  friend: false
};

const ladderPoints = [
  "1 000 PTS", "2 000 PTS", "5 000 PTS", "12 000 PTS", "24 000 PTS",
  "48 000 PTS", "100 000 PTS", "250 000 PTS", "500 000 PTS", "1 000 000 PTS"
];

// =========================================================================
// MOTEUR AUDIO ROBUSTE (NE BLOQUE JAMAIS L'INTERACTION)
// =========================================================================
let audioCtx = null;
let ambientInterval = null;
let musicChordIndex = 0;

function safeGetAudioContext() {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
  } catch (e) {
    console.warn("Audio indisponible :", e);
  }
  return audioCtx;
}

function startAmbientMusic() {
  stopAmbientMusic();
  const ctx = safeGetAudioContext();
  if (!ctx) return;

  const progressions = [
    [130.81, 196.00, 261.63, 311.13],
    [116.54, 174.61, 233.08, 293.66],
    [103.83, 155.56, 207.65, 261.63],
    [116.54, 155.56, 196.00, 261.63]
  ];

  musicChordIndex = 0;

  function playChord() {
    try {
      if (!audioCtx || audioCtx.state !== "running") return;
      const now = audioCtx.currentTime;
      const chord = progressions[musicChordIndex % progressions.length];
      musicChordIndex++;

      chord.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.1 / (idx + 1), now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 2.5);
      });
    } catch (e) {}
  }

  playChord();
  ambientInterval = setInterval(playChord, 2400);
}

function stopAmbientMusic() {
  if (ambientInterval) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
}

function playAcousticSound(type) {
  try {
    const ctx = safeGetAudioContext();
    if (!ctx || ctx.state !== "running") return;
    const now = ctx.currentTime;

    if (type === "tick") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);

    } else if (type === "urgent") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(587.33, now + 0.06);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);

    } else if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.09);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);

    } else if (type === "lock") {
      [220, 440, 554.37].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.35 / (i + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.6);
      });

    } else if (type === "joker") {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.3, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });

    } else if (type === "timeout") {
      [260, 196].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);
        gain.gain.setValueAtTime(0.3, now + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 0.5);
      });

    } else if (type === "victory") {
      [261.63, 329.63, 392.00, 523.25, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.35, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.8);
      });
    }
  } catch (err) {}
}

// =========================================================================
// INTERFACE & ACTIONS JOUEUR
// =========================================================================
const screenHome = document.getElementById("screen-home");
const screenQuiz = document.getElementById("screen-quiz");
const screenResults = document.getElementById("screen-results");

const categorySelect = document.getElementById("category-select");
const btnTestSound = document.getElementById("btn-test-sound");
const btnStart = document.getElementById("btn-start");
const btnNext = document.getElementById("btn-next");
const btnRestart = document.getElementById("btn-restart");

const questionTitle = document.getElementById("question-title");
const currentBadgeCat = document.getElementById("current-badge-cat");
const optionsContainer = document.getElementById("options-container");
const ladderTiers = document.querySelectorAll(".ladder-tier");

const timerBadge = document.getElementById("timer-badge");
const timerCount = document.getElementById("timer-count");
const timerFill = document.getElementById("timer-fill");

const btnLifeline5050 = document.getElementById("btn-lifeline-5050");
const btnLifelinePublic = document.getElementById("btn-lifeline-public");
const btnLifelineAmi = document.getElementById("btn-lifeline-ami");

const lifelineModal = document.getElementById("lifeline-modal");
const lifelineModalTitle = document.getElementById("lifeline-modal-title");
const lifelineModalContent = document.getElementById("lifeline-modal-content");
const btnCloseModal = document.getElementById("btn-close-modal");

window.addEventListener("DOMContentLoaded", () => {
  chargerCategories();
  initLifelines();

  if (btnTestSound) {
    btnTestSound.addEventListener("click", () => {
      safeGetAudioContext();
      playAcousticSound("lock");
      btnTestSound.textContent = "🔊 SON ACTIF";
      setTimeout(() => { btnTestSound.textContent = "🔊 TESTER LE SON"; }, 1500);
    });
  }

  if (btnStart) btnStart.addEventListener("click", demarrerSession);
  if (btnRestart) btnRestart.addEventListener("click", demarrerSession);
  if (btnNext) btnNext.addEventListener("click", passerEchelon);
});

async function chargerCategories() {
  try {
    const res = await fetch("/api/categories");
    if (!res.ok) throw new Error();
    const data = await res.json();
    
    categorySelect.innerHTML = "";
    data.categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat.id;
      opt.textContent = cat.nom;
      categorySelect.appendChild(opt);
    });
  } catch (e) {
    categorySelect.innerHTML = '<option value="toutes">🌐 Défi Intégral (Tous thèmes)</option>';
  }
}

async function demarrerSession() {
  safeGetAudioContext();
  playAcousticSound("click");
  startAmbientMusic();

  const chosenCategory = (categorySelect && categorySelect.value) ? categorySelect.value : "toutes";
  btnStart.disabled = true;
  btnStart.textContent = "CHARGEMENT DU PLATEAU...";

  lifelines = { fiftFifty: false, public: false, friend: false };
  if (btnLifeline5050) btnLifeline5050.disabled = false;
  if (btnLifelinePublic) btnLifelinePublic.disabled = false;
  if (btnLifelineAmi) btnLifelineAmi.disabled = false;
  if (lifelineModal) lifelineModal.classList.add("hidden");

  try {
    const res = await fetch(`/api/nouvelle-partie?cat=${encodeURIComponent(chosenCategory)}`);
    if (!res.ok) throw new Error("Erreur serveur");
    const data = await res.json();

    questions = data.questions;
    currentIndex = 0;
    userAnswers = {};

    screenHome.classList.add("hidden");
    screenResults.classList.add("hidden");
    screenQuiz.classList.remove("hidden");

    afficherQuestion();
  } catch (err) {
    alert("Impossible de joindre le serveur. Vérifiez que 'python app.py' tourne bien dans le terminal.");
    stopAmbientMusic();
  } finally {
    btnStart.disabled = false;
    btnStart.textContent = "PRENDRE PLACE SUR LE FAUTEUIL";
  }
}

function actualiserEchelle() {
  ladderTiers.forEach(tier => {
    const lvl = parseInt(tier.dataset.level);
    tier.classList.remove("current", "banked");

    if (lvl === currentIndex + 1) {
      tier.classList.add("current");
    } else if (lvl < currentIndex + 1) {
      tier.classList.add("banked");
    }
  });
}

function demarrerChrono() {
  clearInterval(timerInterval);
  tempsRestant = DUREE_CHRONO;
  timerCount.textContent = tempsRestant;
  timerBadge.classList.remove("urgent");
  timerFill.classList.remove("urgent");
  timerFill.style.width = "100%";

  timerInterval = setInterval(() => {
    tempsRestant--;
    timerCount.textContent = tempsRestant;
    timerFill.style.width = `${(tempsRestant / DUREE_CHRONO) * 100}%`;

    if (tempsRestant <= 5 && tempsRestant > 0) {
      timerBadge.classList.add("urgent");
      timerFill.classList.add("urgent");
      playAcousticSound("urgent");
    } else if (tempsRestant > 5) {
      playAcousticSound("tick");
    }

    if (tempsRestant <= 0) {
      clearInterval(timerInterval);
      tempsEcoule();
    }
  }, 1000);
}

function tempsEcoule() {
  playAcousticSound("timeout");
  const q = questions[currentIndex];
  userAnswers[q.id] = null;

  const allBtns = optionsContainer.querySelectorAll(".option-hex");
  allBtns.forEach(b => {
    b.disabled = true;
    b.classList.add("time-out");
  });

  btnNext.classList.remove("hidden");
  btnNext.textContent = "TEMPS ÉCOULÉ ! CONTINUER ➔";
}

function afficherQuestion() {
  const q = questions[currentIndex];
  btnNext.classList.add("hidden");
  if (lifelineModal) lifelineModal.classList.add("hidden");
  actualiserEchelle();
  demarrerChrono();

  currentBadgeCat.textContent = q.categorie ? q.categorie.toUpperCase() : "CULTURE";
  questionTitle.textContent = q.question;
  optionsContainer.innerHTML = "";

  const lettres = ["A", "B", "C", "D"];

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-hex";
    btn.dataset.index = idx;
    btn.innerHTML = `<span class="option-letter">${lettres[idx]}:</span> <span>${opt}</span>`;
    
    // Événement direct sur le bouton de réponse
    btn.addEventListener("click", () => verrouillerReponse(q.id, idx, btn));
    optionsContainer.appendChild(btn);
  });
}

function verrouillerReponse(questionId, optionIndex, clickedBtn) {
  clearInterval(timerInterval);
  playAcousticSound("lock");

  userAnswers[questionId] = optionIndex;

  const allBtns = optionsContainer.querySelectorAll(".option-hex");
  allBtns.forEach(b => {
    b.disabled = true;
    b.classList.remove("locked");
  });

  clickedBtn.classList.add("locked");

  btnNext.classList.remove("hidden");
  if (currentIndex === questions.length - 1) {
    btnNext.textContent = "C'EST MON DERNIER MOT POUR LE MILLION 🏆";
  } else {
    btnNext.textContent = "C'EST MON DERNIER MOT ➔";
  }
}

function passerEchelon() {
  playAcousticSound("click");
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    afficherQuestion();
  } else {
    conclureManche();
  }
}

function initLifelines() {
  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", () => {
      lifelineModal.classList.add("hidden");
      playAcousticSound("click");
    });
  }

  // 50/50
  if (btnLifeline5050) {
    btnLifeline5050.addEventListener("click", () => {
      if (lifelines.fiftFifty) return;
      lifelines.fiftFifty = true;
      btnLifeline5050.disabled = true;
      playAcousticSound("joker");

      const buttons = Array.from(optionsContainer.querySelectorAll(".option-hex"));
      const indicesToKeep = [0, 1, 2, 3].sort(() => Math.random() - 0.5).slice(0, 2);
      buttons.forEach((btn, idx) => {
        if (!indicesToKeep.includes(idx)) {
          btn.classList.add("eliminated");
        }
      });
    });
  }

  // Public
  if (btnLifelinePublic) {
    btnLifelinePublic.addEventListener("click", () => {
      if (lifelines.public) return;
      lifelines.public = true;
      btnLifelinePublic.disabled = true;
      playAcousticSound("joker");

      const letters = ["A", "B", "C", "D"];
      let raw = [Math.random() * 20, Math.random() * 20, Math.random() * 20, Math.random() * 20];
      const leader = Math.floor(Math.random() * 4);
      raw[leader] += 40;

      const sum = raw.reduce((a, b) => a + b, 0);
      const pcts = raw.map(v => Math.round((v / sum) * 100));

      lifelineModalTitle.textContent = "📊 RÉSULTAT DU VOTE DU PUBLIC";
      let html = "<div style='display:flex; flex-direction:column; gap:8px;'>";
      letters.forEach((l, i) => {
        html += `
          <div class="public-chart-row">
            <span class="public-chart-lbl">${l}</span>
            <div class="public-chart-bar-bg">
              <div class="public-chart-bar-fill" style="width: ${pcts[i]}%;"></div>
            </div>
            <span class="public-chart-pct">${pcts[i]}%</span>
          </div>
        `;
      });
      html += "</div>";

      lifelineModalContent.innerHTML = html;
      lifelineModal.classList.remove("hidden");
    });
  }

  // Expert
  if (btnLifelineAmi) {
    btnLifelineAmi.addEventListener("click", () => {
      if (lifelines.friend) return;
      lifelines.friend = true;
      btnLifelineAmi.disabled = true;
      playAcousticSound("joker");

      const lettres = ["A", "B", "C", "D"];
      const suggestionLettre = lettres[Math.floor(Math.random() * 4)];
      const q = questions[currentIndex];

      lifelineModalTitle.textContent = "📞 ANALYSE DE L'EXPERT DU PLATEAU";
      lifelineModalContent.innerHTML = `
        <div style="font-size: 0.9rem; line-height: 1.5; color: #e2e8f0;">
          <p style="margin-bottom:6px;">« D'après mes recherches en <strong>${q.categorie ? q.categorie.toUpperCase() : "CULTURE"}</strong>, j'écarte deux propositions.</p>
          <p>Je te conseille d'opter avec confiance pour la <strong>lettre ${suggestionLettre}</strong>. C'est mon analyse ! »</p>
        </div>
      `;
      lifelineModal.classList.remove("hidden");
    });
  }
}

async function conclureManche() {
  btnNext.disabled = true;
  btnNext.textContent = "VALIDATION FINALE...";
  stopAmbientMusic();

  try {
    const res = await fetch("/api/valider", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userAnswers)
    });
    const result = await res.json();
    afficherBilan(result);
  } catch (err) {
    alert("Erreur lors de la validation.");
  } finally {
    btnNext.disabled = false;
  }
}

function afficherBilan(res) {
  screenQuiz.classList.add("hidden");
  screenResults.classList.remove("hidden");

  let gain = "0 PTS";
  if (res.score > 0) {
    gain = ladderPoints[res.score - 1];
  }

  if (res.score >= 8) {
    playAcousticSound("victory");
  }

  document.getElementById("final-cash").textContent = gain;
  document.getElementById("final-rank").textContent = `${res.rang} (${res.score}/${res.total})`;

  const container = document.getElementById("anecdotes-container");
  container.innerHTML = "";

  res.details.forEach(item => {
    const slot = document.createElement("div");
    slot.className = `anecdote-slot ${item.est_correct ? "correct" : ""}`;
    slot.innerHTML = `
      <div><strong>${item.est_correct ? "✅ Validé" : "❌ Erreur"} :</strong> ${item.question}</div>
      <div style="margin: 3px 0;"><strong>Réponse officielle :</strong> ${item.bonne_reponse_texte}</div>
      <div style="color: #cbd5e1;">💡 ${item.anecdote}</div>
    `;
    container.appendChild(slot);
  });
}