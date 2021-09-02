// knight = new Proxy(knight, {
//   set(target, property, value) {
//     console.log("Knight properties changed");
//     target[property] = value;
//     return true;
//   },
// });

let div = document.createElement("div");
let barraVida = new HPBar(knight);
// const hpBar = barraVida.querySelector(`#${knight.name}`);

div.appendChild(barraVida);
document.body.appendChild(div);

div.addEventListener("click", () => {
  knight.hp--;

  barraVida._char.hp = knight.hp;

  console.log(knight.hp);
});
