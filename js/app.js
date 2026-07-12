const DATA_URL = "data/gourmet.json";

const listEl = document.getElementById("gourmet-list");
const emptyMessageEl = document.getElementById("empty-message");
const resultCountEl = document.getElementById("result-count");
const searchInputEl = document.getElementById("search-input");
const categorySelectEl = document.getElementById("category-select");
const areaSelectEl = document.getElementById("area-select");

let gourmetItems = [];

function populateSelect(selectEl, values) {
  [...values].sort().forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectEl.appendChild(option);
  });
}

function createCard(item) {
  const card = document.createElement("article");
  card.className = "gourmet-card";

  if (item.imageUrl) {
    const img = document.createElement("img");
    img.className = "gourmet-card__image";
    img.src = item.imageUrl;
    img.alt = item.gourmetName || "";
    img.addEventListener("error", () => img.remove());
    card.appendChild(img);
  }

  const name = document.createElement("h2");
  name.className = "gourmet-card__name";
  name.textContent = item.gourmetName || "";
  card.appendChild(name);

  const shop = document.createElement("p");
  shop.className = "gourmet-card__shop";
  shop.textContent = `${item.shopName || ""}（${item.area || ""}）`;
  card.appendChild(shop);

  if (Array.isArray(item.tags) && item.tags.length > 0) {
    const tagList = document.createElement("ul");
    tagList.className = "gourmet-card__tags";
    item.tags.forEach((tag) => {
      const tagItem = document.createElement("li");
      tagItem.textContent = tag;
      tagList.appendChild(tagItem);
    });
    card.appendChild(tagList);
  }

  const description = document.createElement("p");
  description.className = "gourmet-card__description";
  description.textContent = item.description || "";
  card.appendChild(description);

  const price = item.priceRange || {};
  const meta = document.createElement("p");
  meta.className = "gourmet-card__meta";
  meta.textContent = `ランチ: ${price.lunch || "-"} / ディナー: ${price.dinner || "-"}`;
  card.appendChild(meta);

  if (item.access) {
    const access = document.createElement("p");
    access.className = "gourmet-card__meta";
    access.textContent = item.access;
    card.appendChild(access);
  }

  return card;
}

function render(items) {
  listEl.innerHTML = "";
  items.forEach((item) => listEl.appendChild(createCard(item)));

  emptyMessageEl.hidden = items.length !== 0;
  resultCountEl.textContent = `${items.length}件表示中`;
}

function applyFilters() {
  const keyword = searchInputEl.value.trim().toLowerCase();
  const category = categorySelectEl.value;
  const area = areaSelectEl.value;

  const filtered = gourmetItems.filter((item) => {
    const matchesKeyword =
      !keyword ||
      (item.gourmetName || "").toLowerCase().includes(keyword) ||
      (item.shopName || "").toLowerCase().includes(keyword);
    const matchesCategory = !category || item.category === category;
    const matchesArea = !area || item.area === area;
    return matchesKeyword && matchesCategory && matchesArea;
  });

  render(filtered);
}

async function init() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    gourmetItems = await response.json();
  } catch (error) {
    listEl.innerHTML = "";
    emptyMessageEl.hidden = false;
    emptyMessageEl.textContent = "データの読み込みに失敗しました。";
    resultCountEl.textContent = "";
    return;
  }

  populateSelect(categorySelectEl, new Set(gourmetItems.map((item) => item.category).filter(Boolean)));
  populateSelect(areaSelectEl, new Set(gourmetItems.map((item) => item.area).filter(Boolean)));

  searchInputEl.addEventListener("input", applyFilters);
  categorySelectEl.addEventListener("change", applyFilters);
  areaSelectEl.addEventListener("change", applyFilters);

  render(gourmetItems);
}

document.addEventListener("DOMContentLoaded", init);
