document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("gameBoard");
  const restartBtn = document.getElementById("restartBtn");

  const symbols = ["🍎", "🍌", "🍇", "🍒", "🍋", "🥝", "🍉", "🍍"];
  let cards = [];
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createBoard() {
    gameBoard.innerHTML = "";
    const doubledSymbols = [...symbols, ...symbols];
    shuffle(doubledSymbols);
    doubledSymbols.forEach(symbol => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-face card-front"></div>
          <div class="card-face card-back">${symbol}</div>
        </div>
      `;
      card.dataset.symbol = symbol;
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
    });
  }

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    checkMatch();
  }

  function checkMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }

  restartBtn.addEventListener("click", () => {
    createBoard();
    resetBoard();
  });

  createBoard();
});
