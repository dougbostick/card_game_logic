const deck = {
    hearts: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'],
    clubs: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'],
    diamonds: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'],
    spades: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace']
}

const draw = (deckObj) => {
    const suits = ['hearts', 'clubs', 'diamonds', 'spades'];
    const randomIdx = Math.floor(Math.random() * 13);
    const randomSuitNum = Math.floor(Math.random() * 4)
    const randomSuit = suits[randomSuitNum]
    const randomCard = deckObj[randomSuit][randomIdx]
    console.log(`${randomCard} of ${randomSuit}`)
    deckObj[randomSuit].splice(randomIdx, 1);
    // console.log(deckObj)
    let cardValue = 0;
    if(randomIdx === 12) {
        cardValue = 1;
    } else if(randomIdx >= 8 && randomIdx !== 12){
        cardValue = 10;
    } else {
        cardValue = randomIdx + 2;
    }
    return {cardName: `${randomCard} of ${randomSuit}`, cardVal: cardValue};
}

// const playerHand = [];
// const dealerhand = [];

const playerDraw = (deckObj, playerHand) => {
    const card = draw(deckObj)
    playerHand.push(card)
    console.log(playerHand)

}
// console.log(draw(deck))
console.log(playerDraw(deck, []));