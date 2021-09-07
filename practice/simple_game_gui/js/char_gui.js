const guiStylesTemplate = () => `  
  section {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }  

  #char_gui .details {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

class CharGUI extends HTMLElement {
  constructor(char) {
    super();

    const styles = document.createElement("style");
    styles.textContent = guiStylesTemplate();

    const shadow = this.attachShadow({ mode: "open" });
    const charName = document.createElement("h2");

    charName.innerHTML = `${char.name}`;

    const section = document.createElement("section");
    section.id = "char_gui";
    const details = document.createElement("div");
    details.classList.add("details");

    const charInfo = document.createElement("div");
    charInfo.id = "char_info";

    const hpBar = new HPBar(char);
    const charAvatar = new CharAvatar(char);

    // detect changes in the values of the char
    this._char = new Proxy(char, {
      set(target, property, value) {
        hpBar._char.hp = value;
        charAvatar._char.hp = value;

        return true;
      },
    });

    charInfo.appendChild(hpBar);
    details.appendChild(charAvatar);
    details.appendChild(charInfo);
    section.appendChild(charName);
    section.appendChild(details);
    shadow.appendChild(section);
    shadow.appendChild(styles);
  }

  connectedCallback() {
    console.log(knight.name);
  }
}

customElements.define("char-gui", CharGUI);
