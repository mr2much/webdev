const equipmentTemplate = ({ weapon }) => `
<div class="equipment">
    <figure class="${weapon.type}">
    <figcaption>${weapon.type}</figcaption>
    <img
        src="${weapon.src}"
        alt="${weapon.alt}"
    />
    </figure>
    <figure class="armor">
    <figcaption>Armor</figcaption>
    <img
        src="./res/img/spiked_armor.png"
        alt="The armor equipped by the character"
    />
    </figure>
    <figure class="shield">
    <figcaption>Shield</figcaption>
    <img
        src="./res/img/shield.jpeg"
        alt="The weapon equipped by the character"
    />
    </figure>
</div>
`;

const showHPBar = (char) => `    
    <div class="hp_bar">
        <img
        src="./res/img/heart.jpeg"
        alt="Heart representing the life of the character"
        />
        ${char.hp}/${char.maxHP}
    </div>    
`;

const charIdentity = (char) => `
    <h2>${char.name}</h2>
    <div class="details">
        <img src="${char.src}" atl="${char.alt}" />
    </div>
`;

// const showHPBar = (char) => `
// <h2>${char.name}</h2>
// <div class="details">
// <img src="${char.src}" atl="${char.alt}" />
// <div id="char_info">
//     <div>
//         <div class="hp_bar">
//             <img
//             src="./res/img/heart.jpeg"
//             alt="Heart representing the life of the character"
//             />
//             ${char.hp}/${char.maxHP}
//         </div>
//         <div class="equipment">
//             <figure class="weapon">
//             <figcaption>Weapon</figcaption>
//             <img
//                 src="./res/img/gauntlets.jpeg"
//                 alt="The weapon equipped by the character"
//             />
//             </figure>
//             <figure class="armor">
//             <figcaption>Armor</figcaption>
//             <img
//                 src="./res/img/spiked_armor.png"
//                 alt="The armor equipped by the character"
//             />
//             </figure>
//             <figure class="shield">
//             <figcaption>Shield</figcaption>
//             <img
//                 src="./res/img/shield.jpeg"
//                 alt="The weapon equipped by the character"
//             />
//             </figure>
//         </div>
//         </div>
//     </div>
// </div>
// `;

class CharGUI extends HTMLElement {
  constructor() {
    super();

    console.log("Hello");

    const shadow = this.attachShadow({ mode: "open" });
    const section = document.createElement("section");
    section.id = "char_gui";

    const charDetails = document.createElement("div");
    charDetails.classList.add("details");

    const charInfo = document.createElement("div");
    charInfo.id = "char_info";

    const innerDiv = document.createElement("div");
    innerDiv.innerHTML = showHPBar(knight);

    charInfo.appendChild(innerDiv);

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./res/css/app.css");

    section.innerHTML = charIdentity(knight);
    section.appendChild(charInfo);

    shadow.appendChild(section);
    shadow.appendChild(link);
  }

  connectedCallback() {
    console.log(knight.name);
  }
}

customElements.define("char-gui", CharGUI);
