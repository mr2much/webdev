// This would be the controller

const hpObservers = [];

let div = document.createElement("div");
div.setAttribute("oncontextmenu", "return false;");
// let barraVida = new HPBar(knight);
// let charAvatar = new CharAvatar(knight);

// hpObservers.push(barraVida);
// hpObservers.push(charAvatar);

// div.appendChild(charAvatar);
// div.appendChild(barraVida);

const charGUI = new CharGUI(knight);

hpObservers.push(charGUI);

div.appendChild(charGUI);

document.body.appendChild(div);

div.addEventListener("mouseup", (e) => {
  switch (e.button) {
    case 0:
      if (knight.hp > 0) {
        knight.hp--;
      }

      notifyObservers();
      break;
    case 2:
      if (knight.hp < knight.maxHP) {
        knight.hp++;
      }

      notifyObservers();
      break;
  }
  // this technically notifies the observer, which is barraVida
  // TODO: find a better way of doing this

  console.log(knight.hp);
});

// div.addEventListener("mouseup", (e) => {
//   console.log(e.button);
// });

function notifyObservers() {
  for (let i = 0; i < hpObservers.length; i++) {
    hpObservers[i]._char.hp = knight.hp;
  }
}
