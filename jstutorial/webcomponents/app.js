class MyCounter extends HTMLElement {
  constructor() {
    super();
    // encapsulated part of the web component, so that the styles of the component don't affect stuff outside of it
    this.shadow = this.attachShadow({mode: "open"}); // always want the mode: open

  
  }

  get count() {
    return this.getAttribute("count");
  }

  set count(val) {
    this.setAttribute("count", val);
  }

  // It's static because all instances of this element will call it
  static get observedAttributes() {
    return ["count"];
  }

  // Another lifecycle method, it gets called when an attribute of the element changes}
  // Prop = name of the property
  // oldVal = Old value
  // newVal = New value
  attributeChangedCallback(prop, oldVal, newVal) {
    if(prop === "count") {
      this.render();
      // We repeat this bit of code here to avoid creating a whole new set of innerHTML on our call to
      // render each time we update the counter on connectedCallback()
      let btn = this.shadow.querySelector("#btn");
      btn.addEventListener("click", this.inc.bind(this));
    }
  }

  inc () {
    this.count++;
  }

  // first life cycle event, will fire when the element gets added
  connectedCallback() {
    this.render();
    let btn = this.shadow.querySelector("#btn");
    btn.addEventListener("click", this.inc.bind(this));
  }

  render() {
    // Using .innerHTML causes problems with the event handlers
    this.shadow.innerHTML = `
    <h1>Counter</h1>
    ${this.count}
    <button id="btn">Increment</button>
    `;
  }
}

// Allows the custom element tag to be used in our HTML
customElements.define("my-counter", MyCounter);