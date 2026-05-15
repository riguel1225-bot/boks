const state = {
  cards: [],
  selectedCards: [],
  tryCount: 0,
  matchCount: 0,
  elapsedSeconds: 0,
  timerId: null,
  isChecking: false,
  isGameCleared: false,
};

function startGame() {
  stopTimer();

  state.cards = createCards();
  state.selectedCards = [];
  state.tryCount = 0;
  state.matchCount = 0;
  state.elapsedSeconds = 0;
  state.isChecking = false;
  state.isGameCleared = false;

  messageElement.textContent = "카드 2장을 선택하세요.";
  statusElement.classList.remove("win");

  renderBoard();
  startTimer();
}

function selectCard(cardId) {
  const card = state.cards.find(function (item) {
    return item.id === cardId;
  });

  if (shouldIgnoreClick(card)) {
    return;
  }

  card.isOpen = true;
  state.selectedCards.push(card);
  renderBoard();

  if (state.selectedCards.length === MATCH_SIZE) {
    state.tryCount += 1;
    state.isChecking = true;
    checkSelectedCards();
  }
}

function shouldIgnoreClick(card) {
  return (
    state.isChecking ||
    state.isGameCleared ||
    !card ||
    card.isOpen ||
    card.isMatched
  );
}

function checkSelectedCards() {
  const firstCard = state.selectedCards[0];
  const secondCard = state.selectedCards[1];

  if (firstCard.fruit.key === secondCard.fruit.key) {
    markSelectedCardsAsMatched();
    return;
  }

  closeSelectedCardsAfterDelay();
}

function markSelectedCardsAsMatched() {
  state.selectedCards.forEach(function (card) {
    card.isMatched = true;
  });

  state.matchCount += 1;
  state.selectedCards = [];
  state.isChecking = false;
  messageElement.textContent = "짝을 찾았습니다.";

  renderBoard();
  checkClear();
}

function closeSelectedCardsAfterDelay() {
  messageElement.textContent = "다른 과일입니다. 다시 선택해보세요.";

  setTimeout(function () {
    state.selectedCards.forEach(function (card) {
      card.isOpen = false;
    });

    state.selectedCards = [];
    state.isChecking = false;
    renderBoard();
  }, FLIP_BACK_DELAY);
}

function checkClear() {
  if (state.matchCount !== fruits.length) {
    return;
  }

  state.isGameCleared = true;
  stopTimer();
  messageElement.textContent = `클리어! ${state.tryCount}번, ${state.elapsedSeconds}초 만에 성공했습니다.`;
  statusElement.classList.add("win");
}

function startTimer() {
  state.timerId = setInterval(function () {
    state.elapsedSeconds += 1;
    timeCountElement.textContent = state.elapsedSeconds;
  }, 1000);
}

function stopTimer() {
  if (state.timerId !== null) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}
