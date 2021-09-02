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

    this.id = `${char.name}`;

    const hpBar = document.createElement("div");
    hpBar.classList.add("hp_bar");

    hpBar.innerHTML = hpBarTemplate(char);

    const shadow = this.attachShadow({ mode: "open" });

    const self = this;
    this._char = new Proxy(char, {
      set(target, property, value) {
        console.log("Changing", property, "to", value);
        target[property] = value;
        hpBar.innerHTML = self.updateView(char);
        return true;
      },
    });

    shadow.appendChild(hpBar);
  }

  updateView(char) {
    return hpBarTemplate(char);
  }
}

customElements.define("hp-bar", HPBar);
