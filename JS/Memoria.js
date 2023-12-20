class Memoria {
  
  constructor() {

  this.elements = [
    {
      element: "HTML5",
      source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"
    },
    {
      element: "CSS3",
      source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
    },
    {
      element: "JS",
      source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"
    },
    {
      element: "PHP",
      source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
    },
    {
      element: "SVG",
      source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
    },
    {
      element: "W3C",
      source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg"
    },
    {
      element: "HTML5",
      source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"
    },
    {
      element: "CSS3",
      source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
    },
    {
      element: "JS",
      source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"
    },
    {
      element: "PHP",
      source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
    },
    {
      element: "SVG",
      source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
    },
    {
      element: "W3C",
      source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg"
    }
  ];

    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.firstCard = null;
    this.secondCard = null;
    this.shuffleElements();
    this.createElements();
    this.addEventListeners();
  }

  shuffleElements() {
    for (let i = this.elements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
    }
  }

  unflipCards() {
    this.lockBoard = true;
    setTimeout(() => {
      this.firstCard.dataset.state = '';
      this.secondCard.dataset.state = '';
      this.firstCard.title = "";
      this.secondCard.title = "";
      this.resetBoard();
    }, 1000); // Cambia este valor para ajustar el tiempo de espera
  }

  resetBoard() {
    this.firstCard = null;
    this.secondCard = null;
    this.hasFlippedCard = false;
    this.lockBoard = false;
  }

  checkForMatch() {
    this.firstCard.dataset.element === this.secondCard.dataset.element ? this.disableCards() : this.unflipCards();
  }

  disableCards() {
    this.firstCard.dataset.state = 'revealed';
    this.secondCard.dataset.state = 'revealed';
    this.resetBoard();
  }

  createElements() {
    const game = document.querySelector('main section');
    this.elements.forEach(card => {
      const cardElement = document.createElement('article');
      cardElement.dataset.element = card.element;
      const h3Element = document.createElement('h3');
      h3Element.textContent = 'Tarjeta de Memoria';
      const imgElement = document.createElement('img');
      imgElement.src = card.source;
      imgElement.alt = card.element;
      cardElement.appendChild(h3Element);
      cardElement.appendChild(imgElement);
      game.appendChild(cardElement);
    });
  }

  addEventListeners() {
    const tarjetas = document.querySelectorAll('main section article');
    tarjetas.forEach(tarjeta => {
      tarjeta.addEventListener('click', this.flipCard.bind(tarjeta, this));
    });
  }

  flipCard(game) {
    if (this.dataset.state === 'revealed') return; 
    if (game.lockBoard) return; 
    if (this === game.firstCard) return; 
    
    this.title = 'flip';
    this.dataset.state = 'flip'; // gira la tarjeta

    if (!game.hasFlippedCard) {
      game.hasFlippedCard = true;
      game.firstCard = this;
    } else {
      game.secondCard = this;
      game.checkForMatch();
    }
  }
}
