const hpBarTemplate = (char) => `
    <style>
        .hp_bar {
            display: flex;
            align-items: center;
            justify-content: space-between;            
        }
      
        .hp_bar img {
            height: 50px;
        }
    </style>

    
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

    const hpBar = document.createElement("div");
    hpBar.classList.add("hp_bar");

    hpBar.innerHTML = hpBarTemplate(char);

    const self = this;
    char = new Proxy(char, {
      set(target, property, value) {
        console.log("Changing", property, "to", value);
        target[property] = value;
        hpBar.innerHTML = self.updateView(char);
        return true;
      },
    });

    this._char = char;

    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(hpBar);
  }

  updateView(char) {
    return hpBarTemplate(char);
  }

  connectedCallback() {
    let char = this._char;
    char = new Proxy(char, {
      set(target, property, value) {
        console.log("A property has changed");
        target[property] = value;
        return true;
      },
    });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log("Something changed: ", name);
  }

  static get observedAttributes() {
    return ["char"];
  }

  set char(value) {
    console.log("Value set");
    this._char = value;
  }

  get char() {
    return this._char;
  }
}

customElements.define("hp-bar", HPBar);
