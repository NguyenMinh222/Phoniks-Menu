const TEXT = {
  ru: {
    subtitle: "QR-меню вьетнамской кухни",
    search: "Поиск по меню",
    spicy: "🌶️ острое",
    hit: "⭐ хит продаж",
    empty: "Ничего не найдено",
    qr: "Отсканируйте QR-код, чтобы открыть меню на телефоне",
    install: "Установить",
    weightUnknown: "граммовка уточняется",
    photoNote: "Некоторые блюда ещё не имеют своего портрета",
    searchOpen: "Открыть поиск",
    searchClose: "Закрыть поиск"
  },
  en: {
    subtitle: "Vietnamese QR menu",
    search: "Search menu",
    spicy: "🌶️ spicy",
    hit: "⭐ best seller",
    empty: "Nothing found",
    qr: "Scan the QR code to open the menu on your phone",
    install: "Install",
    weightUnknown: "weight to be confirmed",
    photoNote: "Some dishes do not have their own photo yet",
    searchOpen: "Open search",
    searchClose: "Close search"
  },
  vn: {
    subtitle: "Thực đơn QR món Việt",
    search: "Tìm món",
    spicy: "🌶️ cay",
    hit: "⭐ bán chạy",
    empty: "Không tìm thấy",
    qr: "Quét mã QR để mở thực đơn trên điện thoại",
    install: "Cài đặt",
    weightUnknown: "khối lượng đang cập nhật",
    photoNote: "Một số món chưa có ảnh riêng",
    searchOpen: "Mở tìm kiếm",
    searchClose: "Đóng tìm kiếm"
  },
  zh: {
    subtitle: "越南菜二维码菜单",
    search: "搜索菜单",
    spicy: "🌶️ 辣",
    hit: "⭐ 热卖",
    empty: "未找到",
    qr: "扫描二维码在手机上打开菜单",
    install: "安装",
    weightUnknown: "重量待确认",
    photoNote: "部分菜品暂时还没有专属照片",
    searchOpen: "打开搜索",
    searchClose: "关闭搜索"
  }
};

let currentLang = "ru";
let currentCategory = "all";
let searchValue = "";
let deferredPrompt = null;
let isSearchMode = false;
let ticking = false;
let lastRenderToken = 0;

const grid = document.getElementById("menuGrid");
const template = document.getElementById("dishTemplate");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const chips = document.getElementById("categoryChips");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const installBtn = document.getElementById("installBtn");
const siteHeader = document.getElementById("siteHeader");
const searchToggle = document.getElementById("searchToggle");
const searchClose = document.getElementById("searchClose");

function safeText(dish) {
  return dish[currentLang] || dish.ru || dish.en || dish.vn || dish.zh || { name: "", description: "" };
}

function dishCategories(dish) {
  if (Array.isArray(dish.categories)) return dish.categories;
  if (Array.isArray(dish.category)) return dish.category;
  return [dish.category].filter(Boolean);
}

function getWeightText(dish) {
  const weight = dish.weight;
  if (!weight) return "";
  if (typeof weight === "object") return weight[currentLang] || weight.ru || weight.en || weight.vn || weight.zh || "";
  const raw = String(weight).trim();
  if (!raw) return "";
  if (raw.toLowerCase() === "уточняется") return TEXT[currentLang].weightUnknown;
  if (currentLang === "ru") return raw;
  if (currentLang === "zh") {
    return raw
      .replace(/\bрис\b/gi, "米饭")
      .replace(/\bсоус\b/gi, "酱汁")
      .replace(/\bбульон\b/gi, "汤")
      .replace(/кг/gi, "千克")
      .replace(/гр|г/gi, "克")
      .replace(/мл/gi, "毫升");
  }
  return raw
    .replace(/\bрис\b/gi, currentLang === "vn" ? "cơm" : "rice")
    .replace(/\bсоус\b/gi, currentLang === "vn" ? "sốt" : "sauce")
    .replace(/\bбульон\b/gi, currentLang === "vn" ? "nước dùng" : "broth")
    .replace(/кг/gi, "kg")
    .replace(/гр|г/gi, "g")
    .replace(/мл/gi, "ml");
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
  document.querySelector("[data-i18n='subtitle']").textContent = TEXT[lang].subtitle;
  searchInput.placeholder = TEXT[lang].search;
  searchToggle.setAttribute("aria-label", TEXT[lang].searchOpen);
  searchClose.setAttribute("aria-label", TEXT[lang].searchClose);
  emptyState.textContent = TEXT[lang].empty;
  document.getElementById("qrHint").textContent = TEXT[lang].qr;
  installBtn.textContent = TEXT[lang].install;
  renderCategories();
  renderMenu();
}

function renderCategories() {
  const fragment = document.createDocumentFragment();
  Object.entries(CATEGORIES).forEach(([key, label]) => {
    const btn = document.createElement("button");
    btn.className = "chip" + (currentCategory === key ? " active" : "");
    btn.textContent = label[currentLang] || label.ru;
    btn.type = "button";
    btn.onclick = () => {
      currentCategory = key;
      closeSearchMode(false);
      searchValue = "";
      searchInput.value = "";
      renderCategories();
      renderMenu();
      scrollMenuToStart();
    };
    fragment.appendChild(btn);
  });
  chips.replaceChildren(fragment);
}

function scrollMenuToStart() {
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function normalizeQuery(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function renderMenu() {
  const token = ++lastRenderToken;
  const rawSearch = searchValue;
  const hasOnlySpaces = rawSearch.length > 0 && rawSearch.trim().length === 0;
  const query = normalizeQuery(rawSearch);

  const filtered = hasOnlySpaces ? [] : MENU.filter(dish => {
    const t = safeText(dish);
    const categories = dishCategories(dish);
    const categoryOk = currentCategory === "all" || categories.includes(currentCategory);
    const categoryText = categories.map(cat => CATEGORIES[cat]?.[currentLang] || CATEGORIES[cat]?.ru || cat).join(" ");
    const haystack = normalizeQuery([t.name, t.description, dish.id, categoryText].join(" "));
    return categoryOk && (!query || haystack.includes(query));
  });

  grid.innerHTML = "";
  emptyState.hidden = filtered.length > 0;

  const fragment = document.createDocumentFragment();
  const firstBatch = filtered.slice(0, 8);
  firstBatch.forEach((dish, index) => fragment.appendChild(createDishNode(dish, index)));
  grid.appendChild(fragment);
  preloadFirstImages(firstBatch);

  if (filtered.length > 8) {
    let index = 8;
    const renderChunk = () => {
      if (token !== lastRenderToken) return;
      const chunk = document.createDocumentFragment();
      const end = Math.min(index + 10, filtered.length);
      for (; index < end; index++) chunk.appendChild(createDishNode(filtered[index], index));
      grid.appendChild(chunk);
      if (index < filtered.length) requestAnimationFrame(renderChunk);
    };
    requestAnimationFrame(renderChunk);
  }
}

function createDishNode(dish, index) {
  const t = safeText(dish);
  const node = template.content.cloneNode(true);
  const img = node.querySelector(".dish-image");
  const note = node.querySelector(".photo-note");
  const src = dish.image || "";

  if (index < 4) {
    img.loading = "eager";
    img.fetchPriority = "high";
  } else {
    img.loading = "lazy";
    img.fetchPriority = "low";
  }

  img.alt = t.name;
  img.onload = () => img.classList.add("loaded");
  img.onerror = () => showPhotoPlaceholder(img, note, t.name);

  if (src) img.src = src;
  else showPhotoPlaceholder(img, note, t.name);

  node.querySelector(".dish-name").textContent = t.name;

  const weightEl = node.querySelector(".dish-weight");
  const weightText = getWeightText(dish);
  weightEl.hidden = !weightText;
  weightEl.textContent = weightText;

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
  return node;
}

function showPhotoPlaceholder(img, note, title) {
  img.src = makePlaceholder(title);
  img.alt = `${title} — photo placeholder`;
  img.classList.add("loaded");
  if (note) {
    note.textContent = TEXT[currentLang].photoNote;
    note.hidden = false;
  }
}

function preloadFirstImages(items) {
  items.slice(0, 4).forEach(item => {
    if (!item.image) return;
    const preload = new Image();
    preload.decoding = "async";
    preload.src = item.image;
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

let searchTimer = null;
searchInput.addEventListener("input", e => {
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(() => {
    searchValue = e.target.value;
    renderMenu();
  }, 80);
});

searchInput.addEventListener("focus", () => openSearchMode());
searchToggle.addEventListener("click", () => openSearchMode(true));
searchClose.addEventListener("click", () => {
  searchValue = "";
  searchInput.value = "";
  closeSearchMode(true);
  renderMenu();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && isSearchMode) {
    searchValue = "";
    searchInput.value = "";
    closeSearchMode(true);
    renderMenu();
  }
});

function openSearchMode(focus = false) {
  if (isSearchMode) {
    if (focus) searchInput.focus();
    return;
  }
  isSearchMode = true;
  siteHeader.classList.add("search-mode");
  siteHeader.classList.remove("is-compact");
  if (focus) setTimeout(() => searchInput.focus(), 50);
}

function closeSearchMode(blur = true) {
  if (!isSearchMode) return;
  isSearchMode = false;
  siteHeader.classList.remove("search-mode");
  if (blur) searchInput.blur();
  updateHeaderCompact();
}

function makePlaceholder(title) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='675' viewBox='0 0 900 675'><rect width='900' height='675' fill='#171717'/><circle cx='710' cy='115' r='180' fill='#ff3b1f' opacity='.22'/><text x='50%' y='43%' text-anchor='middle' fill='#f7f0e8' font-family='Arial' font-size='54' font-weight='800'>PHONIKS</text><text x='50%' y='53%' text-anchor='middle' fill='#ffb000' font-family='Arial' font-size='28'>${escapeSvg(title)}</text><text x='50%' y='62%' text-anchor='middle' fill='#f7f0e8' opacity='.7' font-family='Arial' font-size='22'>${escapeSvg(TEXT[currentLang].photoNote)}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function escapeSvg(str) { return String(str).replace(/[&<>'"]/g, s => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}[s])); }

function renderQr() {
  const url = window.location.href.split("#")[0];
  document.getElementById("qrUrl").textContent = url;
  const qrHolder = document.getElementById("qrCode");
  qrHolder.innerHTML = "";
  const img = document.createElement("img");
  img.alt = "QR code";
  img.loading = "lazy";
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(url)}`;
  qrHolder.appendChild(img);
}

function updateHeaderCompact() {
  if (isSearchMode) return;
  siteHeader.classList.toggle("is-compact", window.scrollY > 84);
}

window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateHeaderCompact();
    ticking = false;
  });
}, { passive: true });

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

setLanguage("ru");
renderQr();
updateHeaderCompact();
