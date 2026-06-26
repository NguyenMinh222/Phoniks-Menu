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
    photoNote: "Некоторые блюда пока могут быть показаны без своего портрета"
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
    photoNote: "Some dishes may still be shown without their own portrait"
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
    photoNote: "Một số món có thể chưa có ảnh riêng"
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
    photoNote: "部分菜品暂时可能没有专属图片"
  }
};

let currentLang = "ru";
let currentCategory = "all";
let searchValue = "";
let deferredPrompt = null;
let compactHeader = false;
let ticking = false;

const grid = document.getElementById("menuGrid");
const template = document.getElementById("dishTemplate");
const searchInput = document.getElementById("searchInput");
const searchWrap = document.getElementById("searchWrap");
const searchToggle = document.getElementById("searchToggle");
const searchClose = document.getElementById("searchClose");
const emptyState = document.getElementById("emptyState");
const chips = document.getElementById("categoryChips");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const installBtn = document.getElementById("installBtn");
const photoNote = document.getElementById("photoNote");

function safeText(dish) {
  return dish[currentLang] || dish.ru || dish.en || dish.vn || dish.zh || { name: dish.id, description: "" };
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[ё]/g, "е")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getDishCategories(dish) {
  if (Array.isArray(dish.categories)) return dish.categories;
  if (dish.category) return [dish.category];
  return [];
}

function getWeightText(dish) {
  const weight = dish.weight;
  if (!weight) return "";
  if (typeof weight === "object") {
    return weight[currentLang] || weight.ru || weight.en || weight.vn || weight.zh || "";
  }

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
      .replace(/г/gi, "克")
      .replace(/мл/gi, "毫升");
  }

  return raw
    .replace(/\bрис\b/gi, currentLang === "vn" ? "cơm" : "rice")
    .replace(/\bсоус\b/gi, currentLang === "vn" ? "sốt" : "sauce")
    .replace(/\bбульон\b/gi, currentLang === "vn" ? "nước dùng" : "broth")
    .replace(/кг/gi, "kg")
    .replace(/г/gi, "g")
    .replace(/мл/gi, "ml");
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
  document.querySelector("[data-i18n='subtitle']").textContent = TEXT[lang].subtitle;
  searchInput.placeholder = TEXT[lang].search;
  emptyState.textContent = TEXT[lang].empty;
  document.getElementById("qrHint").textContent = TEXT[lang].qr;
  installBtn.textContent = TEXT[lang].install;
  if (photoNote) photoNote.textContent = TEXT[lang].photoNote;
  renderCategories();
  renderMenu();
}

function renderCategories() {
  const fragment = document.createDocumentFragment();
  Object.entries(CATEGORIES).forEach(([key, label]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip" + (currentCategory === key ? " active" : "");
    btn.textContent = label[currentLang] || label.ru;
    btn.onclick = () => {
      currentCategory = key;
      closeSearch({ keepText: false });
      renderCategories();
      renderMenu();
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    };
    fragment.appendChild(btn);
  });
  chips.replaceChildren(fragment);
}

function dishSearchText(dish) {
  const values = [dish.id, dish.search, dish.tags];
  ["ru", "en", "vn", "zh"].forEach(lang => {
    if (dish[lang]) {
      values.push(dish[lang].name, dish[lang].description);
    }
  });
  return normalizeText(values.flat().filter(Boolean).join(" "));
}

function matchesSearch(dish, rawQuery) {
  if (!rawQuery) return true;
  if (rawQuery.length > 0 && rawQuery.trim() === "") return false;

  const normalizedQuery = normalizeText(rawQuery);
  if (!normalizedQuery) return false;

  const tokens = normalizedQuery.split(" ").filter(Boolean);
  if (!tokens.length) return false;

  const haystack = dishSearchText(dish);
  return tokens.every(token => haystack.includes(token));
}

function renderMenu() {
  const rawQuery = searchValue;
  const filtered = MENU.filter(dish => {
    const categoryOk = currentCategory === "all" || getDishCategories(dish).includes(currentCategory);
    return categoryOk && matchesSearch(dish, rawQuery);
  });

  const fragment = document.createDocumentFragment();
  emptyState.hidden = filtered.length > 0;

  filtered.forEach((dish, index) => {
    const t = safeText(dish);
    const node = template.content.cloneNode(true);
    const img = node.querySelector(".dish-image");

    img.src = dish.image || makePlaceholder(t.name);
    img.alt = t.name;
    img.loading = index < 4 ? "eager" : "lazy";
    img.fetchPriority = index < 4 ? "high" : "low";

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

    node.querySelector(".dish-image-btn").onclick = () => openLightbox(img.currentSrc || img.src, t.name);
    fragment.appendChild(node);
  });

  grid.replaceChildren(fragment);
}

function makeBadge(text) {
  const span = document.createElement("span");
  span.className = "badge";
  span.textContent = text;
  return span;
}

function openSearch() {
  document.body.classList.add("search-active");
  searchWrap.classList.add("is-open");
  searchWrap.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => searchInput.focus({ preventScroll: true }));
}

function closeSearch(options = {}) {
  const { keepText = false } = options;
  document.body.classList.remove("search-active");
  searchWrap.classList.remove("is-open");
  searchWrap.setAttribute("aria-hidden", "true");
  searchInput.blur();
  if (!keepText && searchValue) {
    searchValue = "";
    searchInput.value = "";
    renderMenu();
  }
}

function openLightbox(src, title) {
  lightboxImg.src = src;
  lightboxTitle.textContent = title;
  lightbox.hidden = false;
}

function closeLightbox() { lightbox.hidden = true; }

function makePlaceholder(title) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='675' viewBox='0 0 900 675'><rect width='900' height='675' fill='#171717'/><circle cx='710' cy='115' r='180' fill='#ff3b1f' opacity='.22'/><text x='50%' y='43%' text-anchor='middle' fill='#f7f0e8' font-family='Arial' font-size='54' font-weight='800'>PHONIKS</text><text x='50%' y='54%' text-anchor='middle' fill='#ffb000' font-family='Arial' font-size='28'>${escapeSvg(title)}</text><text x='50%' y='64%' text-anchor='middle' fill='#a8a8a8' font-family='Arial' font-size='22'>photo coming soon</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeSvg(str) {
  return String(str).replace(/[&<>'"]/g, s => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}[s]));
}

function renderQr() {
  const url = window.location.href.split("#")[0];
  document.getElementById("qrUrl").textContent = url;
  const img = document.createElement("img");
  img.alt = "QR code";
  img.loading = "lazy";
  img.decoding = "async";
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(url)}`;
  document.getElementById("qrCode").replaceChildren(img);
}

function handleScroll() {
  ticking = false;
  const y = window.scrollY || 0;

  if (!compactHeader && y > 130) {
    compactHeader = true;
    document.body.classList.add("is-compact");
  } else if (compactHeader && y < 48) {
    compactHeader = false;
    document.body.classList.remove("is-compact");
  }
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(handleScroll);
  }
}

document.getElementById("closeLightbox").onclick = closeLightbox;
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.querySelectorAll(".lang").forEach(btn => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));
searchToggle.addEventListener("click", openSearch);
searchClose.addEventListener("click", () => closeSearch({ keepText: false }));
searchInput.addEventListener("input", e => {
  searchValue = e.target.value;
  renderMenu();
});
searchInput.addEventListener("keydown", e => {
  if (e.key === "Escape") closeSearch({ keepText: false });
});
window.addEventListener("scroll", onScroll, { passive: true });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});

setLanguage(currentLang);
renderQr();
