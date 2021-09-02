let div = document.createElement("div");
let barraVida = new HPBar(knight);

div.appendChild(barraVida);
document.body.appendChild(div);

div.addEventListener("click", () => {
  knight.hp--;

  barraVida._char.hp = knight.hp;
  console.log(knight.hp);
});
