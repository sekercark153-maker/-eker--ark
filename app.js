
const games = [
  {name:"Şans Çarkı",emoji:"🎡",desc:"Renkli çarkı keşfet",page:"wheel"},
  {name:"Kazı Kazan",emoji:"🎟️",desc:"Demo kartını aç",page:"scratch"},
  {name:"Günlük Hediye",emoji:"🎁",desc:"Sürpriz kutunu gör",page:"gift"},
  {name:"Hafıza Oyunu",emoji:"🧩",desc:"Yakında burada",page:"games"}
];

const titles = {
  home:"Ana Sayfa",
  wallet:"Bakiye",
  deposit:"Para Yükleme",
  withdraw:"Para Çekme",
  support:"Canlı Destek",
  gift:"Günlük Hediye",
  profile:"Kullanıcı Profili",
  games:"Oyunlar",
  wheel:"Çark",
  scratch:"Kazı Kazan",
  auth:"Giriş / Kayıt",
  admin:"Admin Yönetici Paneli"
};

let demoBalance = 0;
let rotation = 0;
let authMode = "login";

const fmt = n => Number(n).toLocaleString("tr-TR", {
  minimumFractionDigits:2,
  maximumFractionDigits:2
});

function updateBalance() {
  document.getElementById("headerBalance").textContent = fmt(demoBalance);
  document.getElementById("walletBalance").textContent = fmt(demoBalance);
}

function showPage(name) {
  if (!titles[name]) name = "home";

  document.querySelectorAll(".page").forEach(p =>
    p.classList.remove("active")
  );

  document.getElementById("page-" + name).classList.add("active");

  document.querySelectorAll("nav a").forEach(a =>
    a.classList.toggle("active", a.dataset.page === name)
  );

  document.getElementById("pageHeading").textContent = titles[name];

  document.getElementById("sideNav").classList.remove("open");

  history.replaceState(null, "", "#" + name);
  window.scrollTo(0, 0);
}

function renderGames(target) {
  document.getElementById(target).innerHTML = games.map(g => `
    <button class="game-card" data-go="${g.page}">
      <span class="game-icon">${g.emoji}</span>
      <b>${g.name}</b>
      <small>${g.desc}</small>
    </button>
  `).join("");
}

function navigate() {
  const page = location.hash.replace("#", "") || "home";
  showPage(page);
}

document.addEventListener("click", e => {
  const go = e.target.closest("[data-go]");

  if (go) {
    showPage(go.dataset.go);
    return;
  }

  const amount = e.target.closest("[data-amount]");

  if (amount) {
    document.getElementById("depositAmount").value =
      amount.dataset.amount;
  }
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("sideNav").classList.toggle("open");
});

window.addEventListener("hashchange", navigate);

// Demo para yükleme ekranı
document.getElementById("depositBtn").addEventListener("click", () => {
  const value = Number(
    document.getElementById("depositAmount").value
  );

  document.getElementById("depositMsg").textContent =
    value > 0
      ? `₺${fmt(value)} tutarı için demo önizlemesi. Gerçek ödeme alınmadı.`
      : "Lütfen geçerli bir demo tutarı girin.";
});

// Günlük hediye
document.getElementById("giftBtn").addEventListener("click", () => {
  document.getElementById("giftResult").textContent =
    "🎉 Tebrikler! Demo sürprizini açtın. Parasal değeri yoktur.";

  document.getElementById("giftBtn").disabled = true;
});

// Çark
document.getElementById("spinBtn").addEventListener("click", () => {
  const button = document.getElementById("spinBtn");

  button.disabled = true;

  rotation += 1440 + Math.floor(Math.random() * 360);

  document.getElementById("wheel").style.transform =
    `rotate(${rotation}deg)`;

  document.getElementById("wheelResult").textContent =
    "Çark dönüyor…";

  setTimeout(() => {
    document.getElementById("wheelResult").textContent =
      "✨ Eğlenceli demo turu tamamlandı!";

    button.disabled = false;
  }, 3100);
});

// Kazı kazan
document.getElementById("scratchBtn").addEventListener("click", () => {
  const prizes = [
    "✨ SÜRPRİZ",
    "🌈 HARİKA",
    "⭐ YILDIZ",
    "🎈 TEBRİKLER"
  ];

  const prize = prizes[
    Math.floor(Math.random() * prizes.length)
  ];

  document.getElementById("scratchPrize").textContent = prize;

  document.getElementById("scratchResult").textContent =
    "Kart açıldı! Parasal ödül yoktur.";

  document.getElementById("scratchBtn").disabled = true;
});

// Canlı destek demo sohbeti
document.getElementById("chatForm").addEventListener("submit", e => {
  e.preventDefault();

  const input = document.getElementById("chatInput");

  if (!input.value.trim()) return;

  const message = document.createElement("div");

  message.className = "bubble user";
  message.textContent = input.value;

  document.getElementById("chatMessages").append(message);

  input.value = "";

  document.getElementById("chatMessages").scrollTop = 9999;
});

// Profil
document.getElementById("saveProfile").addEventListener("click", () => {
  document.getElementById("profileMsg").textContent =
    "Profil bilgileri demo oturumunda görüntülendi; sunucuya kaydedilmedi.";
});

// Giriş ve kayıt sekmeleri
document.querySelectorAll("[data-auth]").forEach(button => {
  button.addEventListener("click", () => {
    authMode = button.dataset.auth;

    document.querySelectorAll("[data-auth]").forEach(item => {
      item.classList.toggle("selected", item === button);
    });

    document.querySelector(".auth-card h1").textContent =
      authMode === "login" ? "Hoş geldin!" : "Aramıza katıl!";

    document.getElementById("authDemo").textContent =
      authMode === "login"
        ? "Demo olarak devam et"
        : "Kayıt görünümünü tamamla";
  });
});

document.getElementById("authDemo").addEventListener("click", () => {
  showPage("home");
});

// Admin panelinden demo oyun ekleme
document.getElementById("addGame").addEventListener("click", () => {
  const name = document.getElementById("newGameName").value.trim();

  const emoji =
    document.getElementById("newGameEmoji").value.trim() || "🎮";

  if (!name) {
    document.getElementById("adminMsg").textContent =
      "Önce oyun adı girin.";
    return;
  }

  games.push({
    name,
    emoji,
    desc:"Yeni eklenen demo oyunu",
    page:"games"
  });

  renderGames("homeGames");
  renderGames("allGames");

  document.getElementById("gameCount").textContent = games.length;

  document.getElementById("adminMsg").textContent =
    name + " demo oyun listesine eklendi.";

  document.getElementById("newGameName").value = "";
  document.getElementById("newGameEmoji").value = "";
});

// Başlangıç
renderGames("homeGames");
renderGames("allGames");
updateBalance();
navigate();
