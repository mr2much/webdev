// This would be the controller

const hpObservers = [];

let div = document.createElement("div");
let barraVida = new HPBar(knight);
let charAvatar = new CharAvatar(knight);

hpObservers.push(barraVida);
hpObservers.push(charAvatar);

div.appendChild(charAvatar);
div.appendChild(barraVida);
document.body.appendChild(div);

div.addEventListener("click", () => {
  knight.hp--;

  // this technically notifies the observer, which is barraVida
  // TODO: find a better way of doing this
  notifyObservers();

  console.log(knight.hp);
});

function notifyObservers() {
  for (let i = 0; i < hpObservers.length; i++) {
    hpObservers[i]._char.hp = knight.hp;
  }
}
