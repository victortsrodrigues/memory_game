let cardNumber = 0;

const baseCards = [
  { image: "assets/bobrossparrot.gif", status: "closed" },
  { image: "assets/explodyparrot.gif", status: "closed" },
  { image: "assets/fiestaparrot.gif", status: "closed" },
  { image: "assets/metalparrot.gif", status: "closed" },
  { image: "assets/revertitparrot.gif", status: "closed" },
  { image: "assets/tripletsparrot.gif", status: "closed" },
  { image: "assets/unicornparrot.gif", status: "closed" }
];

let gameCards = [];
let possibleCards = [];

function numberOfCards() {
  do {
    cardNumber = Number(prompt("Com quantas cartas quer jogar?"));
  }
  while (cardNumber % 2 !== 0 || cardNumber < 4 || cardNumber > 14);

  baseCards.sort(comparador);

  for (let i = 0; i < cardNumber / 2; i++) {
    possibleCards[i] = baseCards[i];
  }

  for (let i = 0; i < possibleCards.length; i++) {
    gameCards.push({ image: possibleCards[i].image, status: "closed" });
  }
  for (let i = 0; i < possibleCards.length; i++) {
    gameCards.push({ image: possibleCards[i].image, status: "closed" });
  }

  gameCards.sort(comparador);

  printCards();
}

function printCards() {
  for (let i = 0; i < cardNumber; i++) {
    document.querySelector("main").innerHTML += `
      <div onclick="rotate(this)" class="card">
        <div class="front-face face">
          <img src="assets/back.png">
        </div>
        <div class="back-face face">
          <img src="${gameCards[i].image}">
        </div>
        <p class="closed">${i}</p>
      </div>
    `;
  }
}

let clicks = 0;
function rotate(card) {
  clicks++;
  card.classList.add('rotate-card');
  if (document.querySelector('.rotate-card .closed').classList.contains("open") === false) {
    document.querySelector('.rotate-card .closed').classList.add('open');
    document.querySelector('.rotate-card .closed').classList.add('temp');
    gameCards[Number(document.querySelector('.temp').innerHTML)].status = 'open'
    document.querySelector('.rotate-card .closed').classList.remove('closed');
    document.querySelector('.rotate-card .temp').classList.remove('temp');
  }
  
  checkCardStatus();

  checkVictory();

}

function checkCardStatus(){
  let openCards = 0;
  let indexOpenCard = [];
  for (let i = 0; i < cardNumber; i++) {
    if (gameCards[i].status === 'open') {
      openCards++;
      indexOpenCard.push(i);
    }
    if (openCards === 2 && gameCards[indexOpenCard[0]].image === gameCards[indexOpenCard[1]].image) {
      gameCards[indexOpenCard[0]].status = 'complete';
      gameCards[indexOpenCard[1]].status = 'complete';
      const opensToRemove = document.querySelectorAll('.open');
      opensToRemove.forEach(function (element) {
        element.classList.remove('open');
      });
    }
    else if (openCards === 2 && gameCards[indexOpenCard[0]].image !== gameCards[indexOpenCard[1]].image) {
      setTimeout(closeWrongCards, 1000);
      gameCards[indexOpenCard[0]].status = 'closed';
      gameCards[indexOpenCard[1]].status = 'closed';
    }
  }
}

function closeWrongCards() {
  const opensToRemove = document.querySelectorAll('.open');
  opensToRemove.forEach(function (element) {
    element.parentNode.classList.remove('rotate-card');
    element.classList.remove('open');
    element.classList.add('closed');
  });
}

function checkVictory() {
  let numberOfComplete = 0;
  for (let i = 0; i < cardNumber; i++) {
    if (gameCards[i].status === "complete") {
      numberOfComplete++;
    }
  }
  if (numberOfComplete === cardNumber) {
    alert(`Você ganhou em ${clicks} jogadas!`);
  }
}

function comparador() {
  return Math.random() - 0.5;
}

numberOfCards();