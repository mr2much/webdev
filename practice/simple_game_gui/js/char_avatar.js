const avatarStyleTemplate = () => `

  .portrait img {     
    height: 150px;
    width: auto;      
  }
  
  .shake {
    animation: shake .82s cubic-bezier(.36,07,.19,.97) both;
    transform: translate3d(0,0,0);
    backface-visibility: hidden;
    perspective: 1px;
    transform-style: preserve-3d;
  }
  
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
      transform: translate3d(-2px, 0, 0);
    }
    40%, 60% {
      transform: translate3d(3px, 0, 0);
    }
  }

  .glow {
    position: relative;        
  }

  .glow::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 100%;
    width: 100%;
    height: 100%;
    border-radius: 70%;
    animation: glow 900ms ease-in-out;    
  }

  @keyframes glow {
    0% {
      background: rgba(0, 255, 0, 0.5);
    }

    100% {
      background: rgba(0, 255, 0, 0)
    }
  }
`;

const avatarTemplate = (char) => `
  <img src="${char.src}" alt="${char.alt}" />
`;

class CharAvatar extends HTMLElement {
  constructor(char) {
    super();

    let style = document.createElement("style");
    style.textContent = avatarStyleTemplate();

    const imgHolder = document.createElement("div");
    imgHolder.classList.add("portrait");

    const shadow = this.attachShadow({ mode: "open" });

    imgHolder.innerHTML = avatarTemplate(char);

    let previousValue = char.hp;

    // detect changes in the values of the char
    this._char = new Proxy(char, {
      set(target, property, value) {
        if (value < previousValue) {
          imgHolder.classList.remove("shake");

          void imgHolder.offsetWidth;

          imgHolder.classList.add("shake");
        } else {
          console.log("HP increased");
          if (previousValue >= char.maxHP) {
            value = char.maxHP;
          } else {
            if (value !== 0) {
              imgHolder.classList.remove("glow");

              void imgHolder.offsetWidth;

              imgHolder.classList.add("glow");
            }
          }
        }

        previousValue = value;

        return true;
      },
    });

    shadow.appendChild(style);
    shadow.appendChild(imgHolder);
  }
}

customElements.define("char-avatar", CharAvatar);
