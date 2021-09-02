const styleTemplate = `
    .hp_bar {
        display: flex;
        align-items: center;
        justify-content: space-between;            
    }
    
    .hp_bar img {
        height: 50px;
    }
`;

const hpBarTemplate = (char) => `    
    <img
    src="./res/img/heart.jpeg"
    alt="Heart representing the life of the character"
    />
    <progress id="${char.name}" max="${char.maxHP}" value="${char.hp}"></progress>
    <div>  
        ${char.hp}/${char.maxHP}
    </div>    
`;

class HPBar extends HTMLElement {
  constructor(char) {
    super();

    this.id = `${char.name}`;

    // set styling
    let style = document.createElement("style");
    style.textContent = styleTemplate;

    // set hpBar
    const hpBar = document.createElement("div");
    hpBar.classList.add("hp_bar");
    hpBar.innerHTML = this.updateView(char);

    const shadow = this.attachShadow({ mode: "open" });

    // detect changes in the values of the char
    const self = this;
    this._char = new Proxy(char, {
      set(target, property, value) {
        console.log("Changing", property, "to", value);
        if (value < 0) {
          value = 0;
        }

        target[property] = value;
        hpBar.innerHTML = self.updateView(char);
        return true;
      },
    });

    shadow.appendChild(style);
    shadow.appendChild(hpBar);
  }

  updateView(char) {
    return hpBarTemplate(char);
  }
}

customElements.define("hp-bar", HPBar);
