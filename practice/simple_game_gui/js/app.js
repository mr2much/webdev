let div = document.createElement("div");
let barraVida = new HPBar(knight);

div.appendChild(barraVida);
document.body.appendChild(div);

div.addEventListener("click", () => {
  knight.hp--;

  // this technically notifies the observer, which is barraVida
  // TODO: find a better way of doing this
  barraVida._char.hp = knight.hp;

  console.log(knight.hp);
});
