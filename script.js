// Small utilities
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// Theme toggle with sun/moon + spin animation
const themeToggle = $("#themeToggle");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");
const sunIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" />
</svg>`;
const moonIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.5" fill="none"/>
</svg>`;

const applyTheme = (t) => {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
  // icon + accessible label
  themeToggle.innerHTML = t === "dark" ? sunIcon : moonIcon;
  themeToggle.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
};
const initTheme = () => applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
const toggleTheme = () => applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");

// Hamburger
const hamburger = $("#hamburger");
const nav = $("#nav");
hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("open");
});

// Init
initTheme();
themeToggle.addEventListener("click", () => {
  // restart spin animation each click
  themeToggle.classList.remove("spin-once");
  void themeToggle.offsetWidth; // reflow
  themeToggle.classList.add("spin-once");
  toggleTheme();
});
$("#year").textContent = new Date().getFullYear();

// Link placeholders (update these once you know your URLs)
const LINKS = {
  linkedin: "https://www.linkedin.com/in/karl-nicholson/",
  github: "https://github.com/KarlNichlsn",
  email: "mailto:you@example.com"
};
$("#linkedinAbout").href = LINKS.linkedin;
$("#githubAbout").href = LINKS.github;
$("#linkedinContact").href = LINKS.linkedin;
$("#emailContact").href = LINKS.email;

// Timeline: load from experiences.json
async function loadExperiences() {
  try {
    const res = await fetch("experiences.json");
    const items = await res.json();
    const list = $("#timeline");
    list.innerHTML = "";
    items.sort((a, b) => new Date(b.start || "1900-01-01") - new Date(a.start || "1900-01-01"));
    items.forEach(x => {
      const li = document.createElement("li");
      const when = x.end ? `${x.start} — ${x.end}` : `${x.start} — present`;
      li.innerHTML = `<div class="when">${when}</div>
        <div class="what">${x.title}</div>
        <div class="where">${x.org}</div>
        <p>${x.desc || ""}</p>`;
      list.appendChild(li);
    });
  } catch (e) {
    console.error(e);
    $("#timeline").innerHTML = "<li>Could not load experiences.json</li>";
  }
}
loadExperiences();

// Posts: load & render
let allPosts = [];
let activeTags = new Set();
const postsEl = $("#posts");
const searchInput = $("#searchInput");
const tagChips = $("#tagChips");
const sortSelect = $("#sortSelect");

async function loadPosts() {
  try {
    const res = await fetch("posts.json");
    const posts = await res.json();
    allPosts = posts.map(p => ({...p, date: new Date(p.date)}));
    renderTags();
    renderPosts();
  } catch(e) {
    console.error(e);
    postsEl.innerHTML = "<p>Could not load posts.json</p>";
  }
}

function renderTags() {
  const tags = new Set();
  allPosts.forEach(p => (p.tags || []).forEach(t => tags.add(t)));
  tagChips.innerHTML = "";
  [...tags].sort().forEach(t => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = t;
    chip.addEventListener("click", () => {
      if (activeTags.has(t)) activeTags.delete(t); else activeTags.add(t);
      chip.classList.toggle("active");
      renderPosts();
    });
    tagChips.appendChild(chip);
  });
}

function renderPosts() {
  const q = searchInput.value?.trim().toLowerCase();
  let filtered = allPosts.filter(p => {
    const matchQ = !q || p.title.toLowerCase().includes(q) || (p.excerpt||"").toLowerCase().includes(q);
    const matchTags = activeTags.size === 0 || (p.tags||[]).some(t => activeTags.has(t));
    return matchQ && matchTags;
  });
  filtered.sort((a,b) => sortSelect.value === "newest" ? (b.date - a.date) : (a.date - b.date));

  postsEl.innerHTML = "";
  filtered.forEach(p => {
    const div = document.createElement("article");
    div.className = "post";
    const dateStr = p.date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    div.innerHTML = `
      <h3>${p.title}</h3>
      <div class="meta">${dateStr}</div>
      <p>${p.excerpt || ""}</p>
      <div class="tags">${(p.tags||[]).map(t => `<span class="tag">${t}</span>`).join(" ")}</div>
      <div style="margin-top: .4rem">
        ${p.url ? `<a class="btn btn-outline" href="${p.url}" target="_blank" rel="noopener">Read →</a>` : ""}
      </div>
    `;
    postsEl.appendChild(div);
  });
}

searchInput.addEventListener("input", renderPosts);
sortSelect.addEventListener("change", renderPosts);
loadPosts();

// Map: add pins that link to posts
const pinsEl = $("#pins");
const mapImg = $("#worldMap");

function loadStoredPins() {
  try {
    const data = JSON.parse(localStorage.getItem("mapPins") || "[]");
    data.forEach(addPinElement);
  } catch {}
}

function savePins() {
  const pins = $$(".pin", pinsEl).map(el => ({
    top: parseFloat(el.style.top),
    left: parseFloat(el.style.left),
    label: el.dataset.label,
    url: el.dataset.url
  }));
  localStorage.setItem("mapPins", JSON.stringify(pins));
}

function addPinElement(pin) {
  const btn = document.createElement("button");
  btn.className = "pin";
  btn.style.top = `${pin.top}%`;
  btn.style.left = `${pin.left}%`;
  btn.textContent = pin.label || "•";
  btn.dataset.label = pin.label || "";
  btn.dataset.url = pin.url || "";
  btn.title = pin.label || "Open post";
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (btn.dataset.url) window.open(btn.dataset.url, "_blank", "noopener");
  });
  pinsEl.appendChild(btn);
}

mapImg.addEventListener("click", (e) => {
  const rect = mapImg.getBoundingClientRect();
  const left = ((e.clientX - rect.left) / rect.width) * 100;
  const top = ((e.clientY - rect.top) / rect.height) * 100;
  const label = prompt("Label for this pin? (e.g., City / Post title)");
  if (label === null) return;
  const url = prompt("URL for the post (optional). Paste the post URL or leave blank.");
  addPinElement({ top, left, label, url });
  savePins();
});

$("#clearPins").addEventListener("click", () => {
  if (confirm("Remove all pins? This only affects your browser.")) {
    pinsEl.innerHTML = "";
    localStorage.removeItem("mapPins");
  }
});

loadStoredPins();
