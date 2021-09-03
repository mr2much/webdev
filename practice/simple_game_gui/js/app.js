// This would be the controller

const hpObservers = [];

let div = document.createElement("div");
let barraVida = new HPBar(knight);

hpObservers.push(barraVida);

div.appendChild(barraVida);
document.body.appendChild(div);

div.addEventListener("click", () => {
  knight.hp--;
  
  notifyObservers();
  console.log(knight.hp);
});

function notifyObservers() {
  for(let i = 0; i < hpObservers.length; i++) {
    hpObservers[i]._char.hp = knight.hp;
  }
}
