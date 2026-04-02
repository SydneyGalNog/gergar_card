const passwordCorrecto = "nivel33";

let enemyHP = 100;
let playerHP = 100;

const dialogos = [
  "Hace 33 años... nació un entrenador diferente...",
  "No era común... tenía algo especial...",
  "Superó retos... evolucionó y nunca se rindió...",
  "Sigue evolucionando... y luchando por sus sueños...",
  "Hace 33 años... la edad de jesucristo ajajajja...",
  "Hoy ha llegado a un nuevo nivel...",
  "Un nivel que sera mejor... donde debe seguir entrenando...",
  "El entrenador no estara solo... tiene a su gente que lo respaldara siempre...",
  "El entrenador es muy amado por toda su pokefamilia...",
  "Enhorabuena...",
  "👻😈 ¡Nivel 33 desbloqueado!",
  "Pero aún queda una última batalla..."
];

let dialogIndex = 0;
let writing = false;

/* IR A HISTORIA */
function startStory() {
  changeScreen("storyScreen");
  dialogIndex = 0;
  showDialog();
}

/* EFECTO ESCRITURA */
function showDialog() {
  const textEl = document.getElementById("dialogText");
  const texto = dialogos[dialogIndex];

  textEl.textContent = "";
  writing = true;

  let i = 0;

  const interval = setInterval(() => {
    textEl.textContent += texto.charAt(i);
    i++;

    if (i >= texto.length) {
      clearInterval(interval);
      writing = false;
    }
  }, 40);
}

/* SIGUIENTE DIÁLOGO */
function nextDialog() {
  if (writing) return;

  dialogIndex++;

  if (dialogIndex < dialogos.length) {
    showDialog();
  } else {
    changeScreen("battleScreen");
  }
}

/* =========================
   INICIO (INTRO)
========================= */
window.onload = () => {
  setTimeout(() => {
    changeScreen("startScreen");
  }, 3000);

  startCounter();
};

/* =========================
   CAMBIO DE PANTALLAS
========================= */
function changeScreen(showId) {
  const screens = document.querySelectorAll(".screen");

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(showId);
  if (target) {
    target.classList.add("active");
  }
}

/* =========================
   START → PASSWORD
========================= */
function goToPassword() {
  changeScreen("passwordScreen");
}

/* =========================
   PASSWORD
========================= */
function checkPassword() {
  const input = document.getElementById("password");
  if (!input) return;

  const val = input.value;

  if (val === passwordCorrecto) {
    changeScreen("letterSection");
  } else {
    alert("❌ Clave Incorrecta, no te dije esa");
  }
}

/* =========================
   CARTA
========================= */
function openLetter() {
  const env = document.querySelector(".envelope");
  if (!env) return;

  env.classList.add("open");

  setTimeout(() => {
    changeScreen("finalContent");
    startRain();
  }, 2000);
}

/* =========================
   CONTADOR
========================= */
function startCounter() {
  const birthYear = 1993;

  setInterval(() => {
    const el = document.getElementById("counter");
    if (!el) return;

    const now = new Date();
    el.innerText =
      (now.getFullYear() - birthYear) + " años siendo leyenda";
  }, 2000);
}

/* =========================
   LLUVIA DE FOTOS
========================= */
const fotos = [
  "assets/gengar1.png",
  "assets/gengar2.png",
  "assets/gengar3.png"
];

function startRain() {
  const container = document.getElementById("rainContainer");
  if (!container) return;

  setInterval(() => {
    const img = document.createElement("img");

    img.src = fotos[Math.floor(Math.random() * fotos.length)];
    img.className = "rain-img";

    img.style.left = Math.random() * 100 + "vw";
    img.style.animationDuration = (4 + Math.random() * 4) + "s";

    container.appendChild(img);

    setTimeout(() => img.remove(), 8000);
  }, 400);
}

/* =========================
   IR A BATALLA
========================= */
function finalSurprise() {
  //changeScreen("battleScreen");
    startStory();
}

/* =========================
   ATAQUE (BATALLA)
========================= */
function attack() {
  if (enemyHP <= 0) return;

  const damage = Math.floor(Math.random() * 20) + 10;
  enemyHP -= damage;

  if (enemyHP < 0) enemyHP = 0;

  document.getElementById("enemyHP").style.width = enemyHP + "%";

  // Mostrar ataque tipo Pokémon
  showBattleText(`🟣⚫ Genaro usó Bola Sombra! (-${damage} HP)`);

  // Animación
  const pika = document.getElementById("pikachuBattle");
  pika.style.transform = "translateX(30px)";
  setTimeout(() => pika.style.transform = "translateX(0)", 200);

  if (enemyHP === 0) {
    setTimeout(showVictory, 1000);
  }
}
function showBattleText(texto) {
  const div = document.createElement("div");

  div.innerText = texto;
  div.style.position = "absolute";
  div.style.bottom = "10px";
  div.style.background = "white";
  div.style.color = "black";
  div.style.padding = "10px";
  div.style.borderRadius = "10px";

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 2000);
}
function showVictory() {
 changeScreen("victoria-screen");
  
}
function showCarrusel()
 {
  changeScreen("carruselScreen");
 
  
}

// ------------ carrusel
const track = document.getElementById('carouselTrack');
const items = Array.from(track.querySelectorAll('.gengar-carousel-item'));

// 1. CLONACIÓN (Igual que antes para el infinito)
items.forEach(item => track.appendChild(item.cloneNode(true)));
items.reverse().forEach(item => track.insertBefore(item.cloneNode(true), track.firstChild));

// Posición inicial
track.scrollLeft = track.offsetWidth;

// 2. LÓGICA DE MOVIMIENTO AUTOMÁTICO
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        // Calculamos cuánto mide una tarjeta para mover exactamente esa distancia
        const itemWidth = track.querySelector('.gengar-carousel-item').offsetWidth;
        track.scrollBy({ left: itemWidth, behavior: 'smooth' });
    }, 2000); // 3000ms = 3 segundos por foto
}

// 3. DETENER AL TOCAR (Opcional: para que el usuario pueda ver una foto tranquilo)
track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
track.addEventListener('mouseleave', startAutoPlay);

// 4. REUTILIZAMOS LA LÓGICA DE INFINITO Y RESALTADO
function handleScroll() {
    const trackWidth = track.offsetWidth;
    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - trackWidth;

    // Reset Infinito
    if (scrollLeft <= 0) {
        track.scrollLeft = maxScroll / 2;
    } else if (scrollLeft >= maxScroll - 1) {
        track.scrollLeft = trackWidth;
    }

    // Resaltar el centro (Efecto Gengar)
    const allItems = track.querySelectorAll('.gengar-carousel-item');
    allItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const trackCenter = track.getBoundingClientRect().left + trackWidth / 2;

        if (Math.abs(center - trackCenter) < 100) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

track.addEventListener('scroll', handleScroll);
startAutoPlay(); // Iniciar al cargar
