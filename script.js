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
    photoMissing: "фото блюда скоро появится",
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
    photoMissing: "dish photo coming soon",
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
    photoMissing: "ảnh món sẽ sớm có",
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
    photoMissing: "菜品照片即将上线",
    searchOpen: "打开搜索",
    searchClose: "关闭搜索"
  }
};

// Бизнес-логика: при новом открытии QR-меню всегда стартуем с главной страницы.
let currentLang = "ru";
let currentCategory = "all";
let searchValue = "";
let deferredPrompt = null;
let searchMode = false;
let lastScrollY = 0;
let ticking = false;

const grid = document.getElementById("menuGrid");
const template = document.getElementById("dishTemplate");
const searchInput = document.getElementById("searchInput");
const searchWrap = document.getElementById("searchWrap");
const searchToggle = document.getElementById("searchToggle");
const emptyState = document.getElementById("emptyState");
const chips = document.getElementById("categoryChips");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const installBtn = document.getElementById("installBtn");
const siteHeader = document.getElementById("siteHeader");

function safeText(dish) {
  return dish[currentLang] || dish.ru || dish.en || dish.vn || dish.zh || { name: "", description: "" };
}

function getDishCategories(dish) {
  if (Array.isArray(dish.category)) return dish.category;
  if (typeof dish.category === "string") return [dish.category];
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

  if (raw.toLowerCase() === "уточняется") {
    return TEXT[currentLang].weightUnknown;
  }

  if (currentLang === "ru") return raw;

  if (currentLang === "zh") {
    return raw
      .replace(/\bрис\b/gi, "米饭")
      .replace(/\bсоус\b/gi, "酱汁")
      .replace(/\bбульон\b/gi, "汤")
      .replace(/кг/gi, "千克")
      .replace(/гр/gi, "克")
      .replace(/г/gi, "克")
      .replace(/мл/gi, "毫升");
  }

  return raw
    .replace(/\bрис\b/gi, "rice")
    .replace(/\bсоус\b/gi, "sauce")
    .replace(/\bбульон\b/gi, "broth")
    .replace(/кг/gi, "kg")
    .replace(/гр/gi, "g")
    .replace(/г/gi, "g")
    .replace(/мл/gi, "ml");
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll(".lang").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.lang === lang)
  );

  document.querySelector("[data-i18n='subtitle']").textContent = TEXT[lang].subtitle;
  searchInput.placeholder = TEXT[lang].search;
  emptyState.textContent = TEXT[lang].empty;
  document.getElementById("qrHint").textContent = TEXT[lang].qr;
  installBtn.textContent = TEXT[lang].install;
  searchToggle.setAttribute("aria-label", searchMode ? TEXT[lang].searchClose : TEXT[lang].searchOpen);

  renderCategories();
  renderMenu();
}

function renderCategories() {
  chips.innerHTML = "";

  Object.entries(CATEGORIES).forEach(([key, label]) => {
    const btn = document.createElement("button");
    btn.className = "chip" + (currentCategory === key ? " active" : "");
    btn.textContent = label[currentLang] || label.ru;

    btn.onclick = () => {
      currentCategory = key;
      renderCategories();
      renderMenu();
      closeSearchMode(false);
      scrollToMenuStart();
    };

    chips.appendChild(btn);
  });
}

function normalizeSearch(str) {
  return String(str || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function searchableText(dish) {
  const t = safeText(dish);
  const categoryLabels = getDishCategories(dish)
    .map(key => CATEGORIES[key]?.[currentLang] || CATEGORIES[key]?.ru || key)
    .join(" ");

  return [
    t.name,
    t.description,
    dish.id,
    categoryLabels,
    dish.ru?.name,
    dish.en?.name,
    dish.vn?.name,
    dish.zh?.name
  ].filter(Boolean).join(" ").toLowerCase();
}

function renderMenu() {
  const rawSearch = searchValue;
  const query = normalizeSearch(rawSearch);
  const onlySpaces = rawSearch.length > 0 && query.length === 0;

  const filtered = onlySpaces ? [] : MENU.filter(dish => {
    const categories = getDishCategories(dish);
    const categoryOk = currentCategory === "all" || categories.includes(currentCategory);
    const searchOk = query.length === 0 || searchableText(dish).includes(query);
    return categoryOk && searchOk;
  });

  grid.innerHTML = "";
  emptyState.hidden = filtered.length > 0;

  filtered.forEach(dish => {
    const t = safeText(dish);
    const node = template.content.cloneNode(true);
    const img = node.querySelector(".dish-image");
    const photoNote = node.querySelector(".photo-note");

    const markNoPhoto = () => {
      img.src = makePlaceholder(t.name);
      img.alt = `${t.name} — photo placeholder`;
      photoNote.textContent = TEXT[currentLang].photoMissing;
      photoNote.hidden = false;
    };

    if (dish.image) {
      img.src = dish.image;
      img.alt = t.name;
      photoNote.hidden = true;
    } else {
      markNoPhoto();
    }

    img.onerror = markNoPhoto;

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

function closeLightbox() {
  lightbox.hidden = true;
}

function scrollToMenuStart() {
  const y = Math.max(0, document.querySelector("main").offsetTop - siteHeader.offsetHeight - 8);
  window.scrollTo({ top: y, behavior: "smooth" });
}

function openSearchMode(focus = true) {
  searchMode = true;
  document.body.classList.add("search-mode");
  searchToggle.textContent = "×";
  searchToggle.setAttribute("aria-label", TEXT[currentLang].searchClose);
  if (focus) {
    requestAnimationFrame(() => searchInput.focus());
  }
}

function closeSearchMode(clear = false) {
  searchMode = false;
  document.body.classList.remove("search-mode");
  searchToggle.textContent = "🔎";
  searchToggle.setAttribute("aria-label", TEXT[currentLang].searchOpen);

  if (clear) {
    searchValue = "";
    searchInput.value = "";
    renderMenu();
  }

  searchInput.blur();
}

function updateHeaderOnScroll() {
  const y = window.scrollY || 0;
  const isScrolled = y > 90;

  document.body.classList.toggle("header-compact", isScrolled && !searchMode);

  // Если пользователь листает с активным поиском — оставляем только поиск сверху.
  if (document.activeElement === searchInput && y > 30) {
    openSearchMode(false);
  }

  lastScrollY = y;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateHeaderOnScroll);
    ticking = true;
  }
}, { passive: true });

searchToggle.addEventListener("click", () => {
  if (searchMode) {
    closeSearchMode(false);
  } else {
    openSearchMode(true);
  }
});

searchInput.addEventListener("focus", () => openSearchMode(false));

searchInput.addEventListener("input", e => {
  searchValue = e.target.value;
  renderMenu();
});

searchInput.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeSearchMode(true);
  }
});

document.getElementById("closeLightbox").onclick = closeLightbox;
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

document.querySelectorAll(".lang").forEach(btn =>
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang))
);

function makePlaceholder(title) {
  const note = TEXT[currentLang]?.photoMissing || "photo coming soon";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='675' viewBox='0 0 900 675'><rect width='900' height='675' fill='#171717'/><circle cx='720' cy='110' r='190' fill='#ff3b1f' opacity='.22'/><text x='50%' y='42%' text-anchor='middle' fill='#f7f0e8' font-family='Arial' font-size='56' font-weight='800'>PHONIKS</text><text x='50%' y='53%' text-anchor='middle' fill='#ffb000' font-family='Arial' font-size='34' font-weight='700'>${escapeSvg(title)}</text><text x='50%' y='63%' text-anchor='middle' fill='#a8a8a8' font-family='Arial' font-size='25'>${escapeSvg(note)}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeSvg(str) {
  return String(str).replace(/[&<>'"]/g, s => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&apos;",
    '"': "&quot;"
  }[s]));
}

function renderQr() {
  const url = window.location.href.split("#")[0];
  document.getElementById("qrUrl").textContent = url;

  const qrCode = document.getElementById("qrCode");
  qrCode.innerHTML = "";

  const img = document.createElement("img");
  img.alt = "QR code";
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(url)}`;
  qrCode.appendChild(img);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("service-worker.js").catch(() => {})
  );
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
updateHeaderOnScroll();
