// 1. Déclenchement de l'animation d'arrivée de la question
  function loadQuestion() {
    if (currentIndex >= activeQuestions.length) {
      endGame(true);
      return;
    }

    canSelect = true;
    updateLadder(currentIndex + 1);
    if (modalJoker) modalJoker.classList.add("hidden");

    const data = activeQuestions[currentIndex];
    
    // Animation de réapparition du cartouche de question
    questionTitle.classList.remove("question-anim");
    void questionTitle.offsetWidth; // Force le reflow CSS
    questionTitle.classList.add("question-anim");
    questionTitle.textContent = `${currentIndex + 1}. ${data.q}`;

    optionsContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];

    data.options.forEach((optText, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-hex";
      btn.innerHTML = `
        <span class="option-letter">${letters[index]} :</span>
        <span class="option-text">${optText}</span>
      `;
      btn.addEventListener("click", () => handleAnswer(index, btn, data));
      optionsContainer.appendChild(btn);
    });

    startTimer();
  }

  // 2. Secousse visuelle en cas de mauvaise réponse
  // (Dans handleAnswer, à l'endroit où isCorrect est faux) :
  if (!isCorrect) {
    clickedBtn.classList.add("wrong");
    SFX.wrong();
    
    // Secoue le plateau complet
    screenQuiz.classList.add("shake-screen");
    setTimeout(() => screenQuiz.classList.remove("shake-screen"), 450);

    if (buttons[data.correctIdx]) {
      buttons[data.correctIdx].classList.add("correct");
    }
    sessionHistory.push({ 
      q: data.q, 
      success: false, 
      text: `Réponse correcte : ${data.correctText}. ${data.anecdote}` 
    });
  }