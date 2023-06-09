const dealerDrawBtn = document.querySelector("#dealer_draw");
const hitMeBtn = document.querySelector("#hit_me");
const playerHandDiv = document.querySelector("#playerCards");
const dealerHandDiv = document.querySelector("#dealerCards");
const playerVal = document.querySelector("#playerValue");
const dealerVal = document.querySelector("#dealerValue");
const gameStatusElm = document.querySelector("#gameStatus");
const newGameBtn = document.querySelector("#newGame");

const deck = {
  hearts: [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"],
  clubs: [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"],
  diamonds: [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"],
  spades: [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"],
};

const findSuit = () => Math.floor(Math.random() * 4);

const findIdx = () => Math.floor(Math.random() * 13);

const draw = (deckObj) => {
  const suits = ["hearts", "clubs", "diamonds", "spades"];
  let randomIdx = findIdx();
  let randomSuitNum = findSuit();
  const randomSuit = suits[randomSuitNum];
  let randomCard = deckObj[randomSuit][randomIdx];
  while (!randomCard) {
    randomIdx = findIdx();
    randomSuitNum = findSuit();
    randomCard = deckObj[randomSuit][randomIdx];
  }
//   console.log(`${randomCard} of ${randomSuit}`);
  deckObj[randomSuit].splice(randomIdx, 1);
  let cardValue = 0;
  if (randomIdx === 12) {
    cardValue = 1;
  } else if (randomIdx >= 8 && randomIdx !== 12) {
    cardValue = 10;
  } else {
    cardValue = randomIdx + 2;
  }
  return { cardName: `${randomCard} of ${randomSuit}`, cardVal: cardValue };
};

let playerHand = [];
let dealerHand = [];
let gameResult = "";

const playerDraw = () => {
//   console.log("player draw");
  const card = draw(deck);
  playerHand.push(card);
  const cardElm = document.createElement("div");
  cardElm.classList.add("playerCard");
  cardElm.innerText = `${card.cardName}`;
  playerHandDiv.append(cardElm);
  const cardVal = playerHand.reduce((a, c) => {
    a += c.cardVal;
    return a;
  }, 0);
  playerVal.innerText = cardVal;
  if (cardVal > 21) {
    hitMeBtn.disabled = true;
    dealerDrawBtn.disabled = true;

    gameResult = "You went over 21! You lose!";
    gameStatusElm.innerText = gameResult;
  }
};

const dealerDraw = () => {
//   console.log("dealer draw");
  const card = draw(deck);
  dealerHand.push(card);
  const cardElm = document.createElement("div");
  cardElm.classList.add("dealererCard");
  cardElm.innerText = `${card.cardName}`;
  dealerHandDiv.append(cardElm);
  const cardVal = dealerHand.reduce((a, c) => {
    a += c.cardVal;
    return a;
  }, 0);
  dealerVal.innerText = cardVal;
  if (cardVal > 21) {
    dealerDrawBtn.disabled = true;
    hitMeBtn.disabled = true;
    gameResult = "Dealer went over 21! You win!";
    gameStatusElm.innerText = gameResult;
  }
};

hitMeBtn.addEventListener("click", () => playerDraw());

dealerDrawBtn.addEventListener("click", () => dealerDraw());

newGameBtn.addEventListener("click", () => {
    playerHand = [];
    dealerHand = [];
    while(playerHandDiv.firstChild){
        playerHandDiv.firstChild.remove();
    }
    while(dealerHandDiv.firstChild){
        dealerHandDiv.firstChild.remove();
    }
    gameStatusElm.innerText = '';
    hitMeBtn.disabled = false;
    dealerDrawBtn.disabled = false;
    startGame()
});

const startGame = () => {
  dealerDraw();
  playerDraw();
  dealerDraw();
  playerDraw();
};

startGame();
// console.log(draw(deck))
// console.log(playerDraw());
