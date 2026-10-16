"use strict";

const memories = [
`Le week-end où on a commencé à se parler, on se parlait tellement tout le temps que ma mère m’a demandé à qui je parlais pour sourire autant à mon téléphone. J'aimais trop parler de toi et d’à quel point tu me faisais rire.`,
`Le soir après le barathon, quand on t’a ramené avec Mélyna, on rentre dans ma voiture et là une ODEUR... INFECTE. Mélyna qui sort : “Oh Nina t’abuses, ça pu là”. Moi hyper mal à l’aise parce qu’on n'est même pas encore ensemble, et que j’ai absolument aucune façon de me justifier que c’est pas moi. Quand tu pars l’odeur reste, bien sûr. C’est que le lendemain, en prenant ma voiture pour te rejoindre que je vois cet énorme truc sur mon tapis de voiture... Encore à ce jour, je n’en ai toujours pas racheté.`,
`Ta première expérience de fromage de la boîte de Christiane... comment dire que tu n’en as pas beaucoup mangé ahahah !! Surtout le champignon au fromage !!! Mon objectif c’est que tu aimes tous les fromages français un jour. Et j’y arriverai, je préviens.`,
`Le même jour, tu m’as sortie une belle connerie tel un québécois qui n’a jamais mangé de vrai fromage. Et la voici : “Comment on appelle quelqu’un qui fait du fromage déjà ? Un menuisier ?”. Exactement, c’est pas ça du tout.`,
`Une fois on se voit à la sortie de mes cours, et comme d’habitude, tu viens me chercher en bas de ton bâtiment. Ce jour-là, tu m’attendais avec une dégaine, comment dire... Description oblige : un chandail de l’udem jaune, un short de pyjama rouge avec des motifs, tes chaussures plates noires, pas de chaussettes sinon c’est pas drôle et supplément suçon dans le cou. La sudiste en moi a quand même eu honte, je l’admets.`,
`En planifiant notre avenir et comment on allait se retrouver plus tard, tu me dis que tu aimerais chercher un travail en France. Mais finalement t’as préféré ouvrir un commerce... tu voulais d’après tes dires “chercher un CBD”. Ok ma foi, si c’est ce que tu désires...`,
`Dans la catégorie “Andrei utilise la langue française à sa guise sans tenir compte de l’académie française” nous avons :\n\n- J'ai changé DRAMATIQUEMENT d’idée (au lieu de drastiquement)\n- J'ai pas été téméraire (au lieu de careless)\n- Ouais feck c’est ça que elle parle de (au lieu de... je sais pas là c’est illisible)`,
`En témoignage de ton amour pour moi, tu ferais tout et je trouve ça absolument adorable. Mais aller nous chercher de l’eau en pleine nuit en bas de l’hôtel en pyjama parce que je t’ai persuadé que l’eau du robinet n’étais pas potable, ça c’est une vraie preuve d’amour. Merci ma vie princesse. Et comme on dit “Eat pizza, make love”.`,
`Quand tu es revenu en France en mai, on est parti en Savoie tous les deux. On avait besoin de course pour nos repas du séjour, on fait donc le tour du magasin et puis on regarde nos mains : on a 3 beers et 1 putain de saucisson... On continue notre chemin et on s’est fait attraper par le vendeur de couscous qui nous a parlé 30 min sans nous lâcher, pour au final, qu’il nous remplisse notre tupperware de couscous pour finir son stock.`,
`Je crois qu’on n'a jamais autant rigolé que le jour de notre date à la crêperie de Gordes. Déjà on est arrivé comme des malades mentaux en faisant que rire, donc on n'arrive même pas à choisir notre plat. Les serveuses nous voyaient et riait avec nous. On a fait ça tout le repas. Et après en partant, tu montres ton t-shirt, la serveuse te prend en photo pour son chef. Et enfin, notre avis google qui compte aujourd’hui plus de 10 000 vues... “On vient souvent à la crêperie de Cordes et à chaque fois c’est délicieux !! Les madames sont vraiment très gentilles !! Un grand merci et à demain :)"`,
`Je me rappelle encore la tête de tes potes quand on leur a chanté notre rap... on même pas pu finir, ils nous ont dit d’arrêter, les gens derrière nous nous regardaient trop bizarrement.`,
`Le jour où on a visité le village d’antan québécois, il y avait eu une averse comme jamais, on était tellement trempé. Et après sur la route, on voit tous les panneaux point d’interrogation (supplément “chaise roulante + point d’interrogation” à Québec). En rentrant à l’airbnb (perdu dans la forêt), on était déjà congelé et puis on doit en plus aller au douche/toilettes à 40 km de la chambre.`
];

const $ = (id) => document.getElementById(id);
const welcome = $("welcome");
const memoriesView = $("memories");
const ending = $("ending");
const envelope = $("envelope");
const paper = $("memory-paper");
let current = 0;
let busy = false;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function showView(view) {
  [welcome, memoriesView, ending].forEach((item) => { item.hidden = item !== view; });
}

function renderMemory() {
  $("memory-number").textContent = `SOUVENIR Nº ${String(current + 1).padStart(2, "0")}`;
  const copy = $("memory-copy");
  copy.replaceChildren();
  memories[current].split("\n").forEach((line, index) => {
    if (index) copy.append(document.createElement("br"));
    if (line.startsWith("- ")) {
      const bullet = document.createElement("span");
      bullet.className = "memory-bullet";
      bullet.textContent = line;
      copy.append(bullet);
    } else if (line) copy.append(document.createTextNode(line));
  });
  $("counter").textContent = `${current + 1} / 12`;
  $("progress-fill").style.width = `${((current + 1) / 12) * 100}%`;
  $("prev").disabled = current === 0 || busy;
  $("next").disabled = busy;
}

function openEnvelope() {
  if (busy || !welcome.classList.contains("view")) return;
  busy = true;
  envelope.classList.add("opening");
  document.querySelector(".paper-burst").classList.add("bursting");
  window.setTimeout(() => {
    current = 0;
    renderMemory();
    showView(memoriesView);
    memoriesView.classList.add("entering");
    window.setTimeout(() => { memoriesView.classList.remove("entering"); busy = false; }, reduceMotion.matches ? 0 : 600);
  }, reduceMotion.matches ? 0 : 1450);
}

function turnPage(direction) {
  if (busy) return;
  const target = current + direction;
  if (target < 0) return;
  if (target >= memories.length) {
    busy = true;
    paper.classList.add("turn-away");
    window.setTimeout(() => { showView(ending); ending.classList.add("entering"); paper.classList.remove("turn-away"); busy = false; }, reduceMotion.matches ? 0 : 520);
    return;
  }
  busy = true;
  paper.classList.toggle("turn-back", direction < 0);
  paper.classList.add("turning");
  window.setTimeout(() => {
    current = target;
    renderMemory();
    paper.classList.remove("turning", "turn-back");
    paper.classList.add("page-arrive");
    window.setTimeout(() => { paper.classList.remove("page-arrive"); busy = false; renderMemory(); }, reduceMotion.matches ? 0 : 420);
  }, reduceMotion.matches ? 0 : 310);
}

$("open-letter").addEventListener("click", openEnvelope);
paper.addEventListener("click", () => turnPage(1));
paper.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); turnPage(1); }
  if (event.key === "ArrowLeft") turnPage(-1);
  if (event.key === "ArrowRight") turnPage(1);
});
$("prev").addEventListener("click", () => turnPage(-1));
$("next").addEventListener("click", () => turnPage(1));
$("reread").addEventListener("click", () => { current = 0; renderMemory(); showView(memoriesView); });
$("restart").addEventListener("click", () => {
  envelope.classList.remove("opening");
  document.querySelector(".paper-burst").classList.remove("bursting");
  current = 0;
  showView(welcome);
});

document.addEventListener("keydown", (event) => {
  if (memoriesView.hidden || event.target === paper) return;
  if (event.key === "ArrowLeft") turnPage(-1);
  if (event.key === "ArrowRight") turnPage(1);
});

const chickPositions = [
  [7,16,-7,0],[91,21,8,1],[5,48,5,2],[94,52,-5,3],[10,81,8,0],[87,83,-8,1],[24,8,3,2],[77,9,-4,3],[18,92,-2,1],[81,94,4,2]
];
const faces = ["•ᴗ•","•‿•","•ө•","•ᴗ•","•ᵕ•","•‿•","•ᴗ•","•ө•","•ᵕ•","•ᴗ•"];
const chicks = $("chicks");
chickPositions.forEach(([x, y, tilt, mood], index) => {
  const chick = document.createElement("span");
  chick.className = `chick chick-${mood}`;
  chick.style.setProperty("--x", `${x}%`);
  chick.style.setProperty("--y", `${y}%`);
  chick.style.setProperty("--tilt", `${tilt}deg`);
  chick.style.setProperty("--delay", `${index * -0.8}s`);
  chick.innerHTML = `<i class="wing"></i><span class="face">${faces[index]}</span><i class="beak"></i><i class="feet">⌁</i>`;
  chicks.append(chick);
});
