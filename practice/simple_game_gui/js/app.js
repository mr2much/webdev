// This would be the controller

const hpObservers = [];

let div = document.createElement("div");
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
      knight.hp--;
      notifyObservers();
      break;
    case 2:
      console.log("Right button pressed");
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
