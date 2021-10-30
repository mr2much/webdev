import { CharAvatar } from "./char_avatar.js";
import { HPBar } from "./hp_bar.js";

const guiStylesTemplate = () => `  
  section {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }  

  .char-gui .details {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

export class CharGUI extends HTMLElement {
  constructor(char) {
    super();

    const styles = document.createElement("style");
    styles.textContent = guiStylesTemplate();

    const shadow = this.attachShadow({ mode: "open" });
    const charName = document.createElement("h2");

    charName.innerHTML = `${char.name}`;

    if (char.uid) {
      charName.innerHTML += `${char.uid}`;
    }

    const section = document.createElement("section");
    section.id = `"${char.id}"`;
    section.classList.add("char-gui");
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

  _notify(o) {
    if (this._char.id === o.id) {
      if (this._char.uid === o.uid) {
        this._char.hp = o.hp;
      }
    }
  }

  connectedCallback() {
    console.log(this._char.name);
  }
}

customElements.define("char-gui", CharGUI);
