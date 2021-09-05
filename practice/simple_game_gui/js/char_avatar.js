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

    // detect changes in the values of the char
    this._char = new Proxy(char, {
      set(target, property, value) {
        console.log("Changing", property, "to", value);
        if (value < 0) {
          value = 0;
        }

        target[property] = value;

        imgHolder.classList.remove("shake");

        void imgHolder.offsetWidth;

        imgHolder.classList.add("shake");

        return true;
      },
    });

    shadow.appendChild(style);
    shadow.appendChild(imgHolder);
  }
}

customElements.define("char-avatar", CharAvatar);
