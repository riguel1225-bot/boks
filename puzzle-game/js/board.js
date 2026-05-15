const boardElement = document.querySelector("#game-board");
const tryCountElement = document.querySelector("#try-count");
const matchCountElement = document.querySelector("#match-count");
const matchTotalElement = document.querySelector("#match-total");
const timeCountElement = document.querySelector("#time-count");
const messageElement = document.querySelector("#message");
const statusElement = document.querySelector(".status");

function renderBoard() {
  boardElement.innerHTML = "";
  boardElement.style.setProperty("--board-size", BOARD_SIZE);

  tryCountElement.textContent = state.tryCount;
  matchCountElement.textContent = state.matchCount;
  matchTotalElement.textContent = fruits.length;
  timeCountElement.textContent = state.elapsedSeconds;

  state.cards.forEach(function (card) {
    const cardButton = createCardElement(card);
    boardElement.appendChild(cardButton);
  });
}

function createCardElement(card) {
  const cardButton = document.createElement("button");
  cardButton.type = "button";
  cardButton.className = "card";
  cardButton.setAttribute("aria-label", "닫힌 과일 카드");

  if (card.isOpen || card.isMatched) {
    cardButton.classList.add("open");
    cardButton.setAttribute("aria-label", `${card.fruit.name} 카드`);
    cardButton.appendChild(createFruitImage(card.fruit));
  } else {
    cardButton.textContent = "?";
  }

  if (card.isMatched) {
    cardButton.classList.add("matched");
    cardButton.disabled = true;
  }

  cardButton.addEventListener("click", function () {
    selectCard(card.id);
  });

  return cardButton;
}

function createFruitImage(fruit) {
  const image = document.createElement("span");
  image.className = "fruit-image";
  image.style.setProperty("--fruit-color", fruit.color);
  image.style.setProperty("--fruit-accent", fruit.accent);
  image.textContent = fruit.name;
  return image;
}
