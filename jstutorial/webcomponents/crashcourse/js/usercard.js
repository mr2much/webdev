const template = document.createElement("template");

template.innerHTML = `
  <style>
    h3 {
      color: blue;
    }

    .user-card {
      display: flex;
      align-items: center;
      background: #999;
      border-radius: 0.35em;
      margin-bottom: 0.75rem;
      width: 500px;
    }

    .user-card img {
      width: auto;
      height: 100px;
    }
  </style>

  <div class="user-card">
    <img />
    <div>
      <h3></h3>
      <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>        
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({mode:"open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector(".info");
    const btnToggle = this.shadowRoot.querySelector("#toggle-info");


    if(this.showInfo) {
      info.style.display = "block";
      btnToggle.textContent = "Hide Info";
    } else {
      info.style.display = "none";
      btnToggle.textContent = "Show Info";
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector("#toggle-info").addEventListener("click", () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#toggle-info").removeEventListener();
  }

}

window.customElements.define("user-card", UserCard);