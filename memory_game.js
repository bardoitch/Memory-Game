
 let matches = 0;
 let moves = 0;
 let hasFlippedCard = false;
 let towFlippedCards = false;
 let lockBoard = false;
 let firstCard, secondCard, thirdCard;
  
  
function new_game(){
 const cards = document.querySelectorAll('.memory-card');

  matches = 0;
  moves = 0;
  hasFlippedCard = false;
  towFlippedCards = false;
  lockBoard = false;
  firstCard, secondCard, thirdCard;
  
   shuffle(cards);
   cards.forEach(card => card.addEventListener('click', flipCard));
 
  document.getElementById('new_game_click').onclick = restart;
  
}
 
  function flipCard() {
   if (lockBoard) return;
   if(this == firstCard) return;
   if(this == secondCard) return;
   
    this.classList.add('flip');
	
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
	
	if(!towFlippedCards ) {
		secondCard = this;
		towFlippedCards = true;
		
		moves++;    
        document.getElementById("moves_counter").innerHTML = moves;
		
		if(matches!==14)
		 return;
	}
	
    thirdCard = this;
    
	towFlippedCards = false;

    checkForMatch();
    
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matches++;
    document.getElementById("matches_counter").innerHTML = matches;

    firstCard = thirdCard;
    if(matches === 15)
    setTimeout(game_over, 300);
}


  function unflipCards() {
     lockBoard = true;
	 
	 firstCard.classList.remove('flip');
     secondCard.classList.remove('flip');
	 
	 resetBoard();
  }
 
  function resetBoard() {
   [towFlippedCards, lockBoard] = [false,false];
   firstCard = thirdCard;
   [secondCard , thirdCard] = [null , null];
 }
 
 function shuffle(cards) {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 30);
     card.style.order = ramdomPos;
   });
 }


function restart(){
  const cards = document.querySelectorAll('.memory-card');
  
  cards.forEach(card=>{
   card.classList.remove('flip');  
  });
 
  document.getElementById("moves_counter").innerHTML = 0;
  document.getElementById("matches_counter").innerHTML = 0;
  new_game();
};

  function game_over() {
     window.alert("Congratulations! The Game Is Finished, Please Click New Game To Start Over");
   };