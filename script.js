const TEXT = {
  ru: {
    subtitle: "QR-меню вьетнамской кухни",
    search: "Поиск по меню",
    spicy: "🌶️ острое",
    hit: "⭐ хит продаж",
    empty: "Ничего не найдено",
    qr: "Отсканируйте QR-код, чтобы открыть меню на телефоне",
    install: "Установить",
    weightUnknown: "граммовка уточняется"
  },
  en: {
    subtitle: "Vietnamese QR menu",
    search: "Search menu",
    spicy: "🌶️ spicy",
    hit: "⭐ best seller",
    empty: "Nothing found",
    qr: "Scan the QR code to open the menu on your phone",
    install: "Install",
    weightUnknown: "weight to be confirmed"
  },
  vn: {
    subtitle: "Thực đơn QR món Việt",
    search: "Tìm món",
    spicy: "🌶️ cay",
    hit: "⭐ bán chạy",
    empty: "Không tìm thấy",
    qr: "Quét mã QR để mở thực đơn trên điện thoại",
    install: "Cài đặt",
    weightUnknown: "khối lượng đang cập nhật"
  },
  zh: {
    subtitle: "越南菜二维码菜单",
    search: "搜索菜单",
    spicy: "🌶️ 辣",
    hit: "⭐ 热卖",
    empty: "未找到",
    qr: "扫描二维码在手机上打开菜单",
    install: "安装",
    weightUnknown: "重量待确认"
  }
};

let currentLang = localStorage.getItem("phoniks-lang") || "ru";
let currentCategory = "all";
let searchValue = "";
let deferredPrompt = null;

const grid = document.getElementById("menuGrid");
const template = document.getElementById("dishTemplate");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const chips = document.getElementById("categoryChips");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const installBtn = document.getElementById("installBtn");

function safeText(dish) {
  return dish[currentLang] || dish.ru || dish.en || dish.vn || dish.zh;
}

function getWeightText(dish) {
  const weight = dish.weight;

  if (!weight) return "";

  // Лучший вариант для точного перевода:
  // weight: { ru: "450 г", en: "450 g", vn: "450 g", zh: "450克" }
  if (typeof weight === "object") {
    return weight[currentLang] || weight.ru || weight.en || weight.vn || weight.zh || "";
  }

  const raw = String(weight).trim();

  if (!raw) return "";

  // Если в menu-data.js стоит weight: "уточняется"
  if (raw.toLowerCase() === "уточняется") {
    return TEXT[currentLang].weightUnknown;
  }

  // Автоматический перевод единиц, если ты пишешь по-русски: "450 г + рис 120 г"
  if (currentLang === "ru") return raw;
  if (currentLang === "zh") {
    return raw
      .replace(/\bрис\b/gi, "米饭")
      .replace(/\bсоус\b/gi, "酱汁")
      .replace(/\bбульон\b/gi, "汤")
      .replace(/кг/gi, "千克")
      .replace(/г/gi, "克")
      .replace(/мл/gi, "毫升");
  }

  return raw
    .replace(/\bрис\b/gi, "rice")
    .replace(/\bсоус\b/gi, "sauce")
    .replace(/\bбульон\b/gi, "broth")
    .replace(/кг/gi, "kg")
    .replace(/г/gi, "g")
    .replace(/мл/gi, "ml");
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("phoniks-lang", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
  document.querySelector("[data-i18n='subtitle']").textContent = TEXT[lang].subtitle;
  searchInput.placeholder = TEXT[lang].search;
  emptyState.textContent = TEXT[lang].empty;
  document.getElementById("qrHint").textContent = TEXT[lang].qr;
  installBtn.textContent = TEXT[lang].install;
  renderCategories();
  renderMenu();
}

function renderCategories() {
  chips.innerHTML = "";
  Object.entries(CATEGORIES).forEach(([key, label]) => {
    const btn = document.createElement("button");
    btn.className = "chip" + (currentCategory === key ? " active" : "");
    btn.textContent = label[currentLang] || label.ru;
    btn.onclick = () => { currentCategory = key; renderCategories(); renderMenu(); };
    chips.appendChild(btn);
  });
}

function renderMenu() {
  const query = searchValue.trim().toLowerCase();
  const filtered = MENU.filter(dish => {
    const t = safeText(dish);
    const categoryOk = currentCategory === "all" || dish.category === currentCategory;
    const haystack = [t.name, t.description, dish.id, CATEGORIES[dish.category]?.[currentLang]].join(" ").toLowerCase();
    return categoryOk && haystack.includes(query);
  });

  grid.innerHTML = "";
  emptyState.hidden = filtered.length > 0;

  filtered.forEach(dish => {
    const t = safeText(dish);
    const node = template.content.cloneNode(true);
    const img = node.querySelector(".dish-image");
    img.src = dish.image || makePlaceholder(t.name);
    img.alt = t.name;

    // Если PNG/фото отсутствует, карточка не ломается.
    img.onerror = () => {
      img.src = makePlaceholder(t.name);
      img.alt = `${t.name} — photo placeholder`;
    };

    node.querySelector(".dish-name").textContent = t.name;

    const weightEl = node.querySelector(".dish-weight");
    const weightText = getWeightText(dish);
    if (weightText) {
      weightEl.textContent = weightText;
      weightEl.hidden = false;
    } else {
      weightEl.hidden = true;
    }

    const priceEl = node.querySelector(".dish-price");
    if (dish.price !== null && dish.price !== undefined && dish.price !== "") {
      priceEl.textContent = `${dish.price} BYN`;
      priceEl.hidden = false;
    } else {
      priceEl.hidden = true;
    }

    node.querySelector(".dish-desc").textContent = t.description || "";

    const badges = node.querySelector(".badges");
    if (dish.spicy) badges.appendChild(makeBadge(TEXT[currentLang].spicy));
    if (dish.hit) badges.appendChild(makeBadge(TEXT[currentLang].hit));

    node.querySelector(".dish-image-btn").onclick = () => openLightbox(img.src, t.name);
    grid.appendChild(node);
  });
}

function makeBadge(text) {
  const span = document.createElement("span");
  span.className = "badge";
  span.textContent = text;
  return span;
}

function openLightbox(src, title) {
  lightboxImg.src = src;
  lightboxTitle.textContent = title;
  lightbox.hidden = false;
}

function closeLightbox() { lightbox.hidden = true; }

document.getElementById("closeLightbox").onclick = closeLightbox;
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

document.querySelectorAll(".lang").forEach(btn => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));
searchInput.addEventListener("input", e => { searchValue = e.target.value; renderMenu(); });

function makePlaceholder(title) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='675' viewBox='0 0 900 675'><rect width='900' height='675' fill='#171717'/><circle cx='710' cy='115' r='180' fill='#ff3b1f' opacity='.22'/><text x='50%' y='46%' text-anchor='middle' fill='#f7f0e8' font-family='Arial' font-size='54' font-weight='800'>PHONIKS</text><text x='50%' y='56%' text-anchor='middle' fill='#ffb000' font-family='Arial' font-size='32'>${escapeSvg(title)}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function escapeSvg(str) { return String(str).replace(/[&<>'"]/g, s => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}[s])); }

function renderQr() {
  const url = window.location.href.split("#")[0];
  document.getElementById("qrUrl").textContent = url;
  const img = document.createElement("img");
  img.alt = "QR code";
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(url)}`;
  document.getElementById("qrCode").appendChild(img);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(() => {}));
}
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault(); deferredPrompt = e; installBtn.hidden = false;
});
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null; installBtn.hidden = true;
});


const lunchBanner = document.getElementById("lunchBanner");

window.addEventListener(
  "scroll",
  () => {

    if (!lunchBanner) return;

    if (window.scrollY > 140) {
      lunchBanner.classList.add(
        "lunch-banner-collapsed"
      );
    } else {
      lunchBanner.classList.remove(
        "lunch-banner-collapsed"
      );
    }

  },
  { passive: true }
);


setLanguage(currentLang);
renderQr();
