let styleTemplate = (value) => `
    .health-bar {
        width: 200px;
        height: 60px;
        display: flex;        
        align-items: center;
        justify-content: center;
    }    
    
    .health-bar img {
        height: 100%;
    }

    .hp-bar {
      position: relative;
      width: 100%;
      height: 20px;
      border-radius: 5px;
      border: 1px solid black;
    }

    .health-bar-fill {
      width: ${value}%;
      height: 100%;
      background: linear-gradient(90deg, red, orange, yellow, green);
      background-size: 1000%;
      background-position: ${value}%;
      transition: width 0.75s, background-position 0.75s;
    }

    .health-bar-value {
      position: absolute;
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
    }
`;

export class HPBar extends HTMLElement {
  constructor(char) {
    super();

    let rootPath = window.location.href.match(/^.*\/[dark]\w+/)[0];

    // set styling
    let style = document.createElement("style");

    const healthBar = document.createElement("div");
    healthBar.classList.add("health-bar");

    const img = document.createElement("img");
    img.src = `${rootPath}/res/img/heart.jpeg`;
    img.alt = "Heart representing the life of the character";

    const valueElement = document.createElement("div");
    valueElement.classList.add("health-bar-value");

    const fillElement = document.createElement("div");
    fillElement.classList.add("health-bar-fill");

    this._styleElement = style;
    this._valueElement = valueElement;
    this._fillElement = fillElement;

    // set hpBar
    const hpBar = document.createElement("div");
    hpBar.classList.add("hp-bar");

    this.setHealthValue(char.hp, char.maxHP);

    const shadow = this.attachShadow({ mode: "open" });

    // detect changes in the values of the char
    const self = this;
    this._char = new Proxy(char, {
      set(target, property, value) {
        console.log("Changing", property, "to", value);

        target[property] = value;
        self.setHealthValue(value, char.maxHP);
        return true;
      },
    });

    hpBar.appendChild(valueElement);
    hpBar.appendChild(fillElement);
    healthBar.appendChild(img);
    healthBar.appendChild(hpBar);
    shadow.appendChild(style);
    shadow.appendChild(healthBar);
  }

  setHealthValue(hp, maxHP) {
    if (hp < 0) {
      hp = 0;
    }

    if (hp > maxHP) {
      hp = maxHP;
    }

    this.updateView(hp, maxHP);
  }

  updateView(hp, maxHP) {
    console.log("Updating View");
    let percentage = Math.round((hp / maxHP) * 100);
    console.log("Percentage: ", percentage);
    this._styleElement.textContent = styleTemplate(percentage);
    this._valueElement.textContent = `${hp}/${maxHP}`;
  }
}

customElements.define("hp-bar", HPBar);
