// Small utilities
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// Theme toggle with sun/moon + spin animation
const themeToggle = $("#themeToggle");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");
// SVG icons use currentColor so they inherit the button color.
const sunIcon = `<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none">
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </g>
  <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.95" />
</svg>`;
const moonIcon = `<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.5" fill="none"/>
</svg>`;

const applyTheme = (t) => {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
  // icon + accessible label: when in dark mode, show sun (as action to switch to light), and vice versa.
  themeToggle.innerHTML = t === "dark" ? sunIcon : moonIcon;
  themeToggle.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
  // ensure the icon color matches contrast text by forcing color to --ink
  themeToggle.style.color = getComputedStyle(document.documentElement).getPropertyValue('--ink') || '';
};
const initTheme = () => applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
const toggleTheme = () => applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");

// Hamburger & favicon-home
const hamburger = $("#hamburger");
const nav = $("#nav");
const homeBtn = $("#homeBtn");
hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("open");
});
homeBtn && homeBtn.addEventListener("click", () => { window.scrollTo({top:0, behavior: 'smooth'}); });

// Init
initTheme();
themeToggle.addEventListener("click", () => {
  // restart spin animation each click and then toggle theme
  themeToggle.classList.remove("spin-once");
  void themeToggle.offsetWidth; // reflow
  themeToggle.classList.add("spin-once");
  // small timeout so the spin is noticeable before the theme switches
  setTimeout(() => { toggleTheme(); }, 120);
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
    // sort newest first (we will map positions from timelineEnd -> timelineStart)
    items.sort((a, b) => new Date(b.start || '1900-01-01') - new Date(a.start || '1900-01-01'));
    renderHighlights(items);

  // Fixed timeline range: from start of 2014 up to end of 2026 (reverse-chronological)
    const parse = s => { if (!s) return null; const p = s.split('-'); if (p.length === 1) return new Date(Number(p[0]), 0, 1); return new Date(Number(p[0]), Number(p[1]) - 1, 1); };
  const timelineStart = new Date(2016,0,1);
  const timelineEnd = new Date(2026,11,31);
    const monthsBetween = (a,b) => (b.getFullYear()-a.getFullYear())*12 + (b.getMonth()-a.getMonth());
    const totalMonths = Math.max(1, monthsBetween(timelineStart, timelineEnd));
    const pxPerMonth = 12; // scale, smaller to keep length manageable
    const totalHeight = Math.max(800, Math.min(2200, totalMonths * pxPerMonth));

    const container = document.getElementById('timelineContainer');
    container.style.height = totalHeight + 'px';

    // place year markers along central line (keep only boxed year labels).
    // Reserve space through timelineEnd but do not render a label for the final year (e.g., 2026).
    for (let y = timelineStart.getFullYear(); y <= timelineEnd.getFullYear(); y++) {
      const yearEl = document.createElement('div');
      yearEl.className = 'timeline-year';
      const yearDate = new Date(y,0,1);
      // compute inverted position so newest (2026) appears near the top
      const pos = monthsBetween(timelineStart, yearDate) / totalMonths;
      yearEl.style.top = Math.round((1 - pos) * totalHeight) + 'px';
      // render the year label for every year (including the final year)
      yearEl.innerHTML = `<div class="year-label">${y}</div>`;
      container.appendChild(yearEl);
    }

    const eduIds = new Set(['exp-1','exp-2','exp-3']);
  const uniformCardHeight = 140; // px for non-edu cards (slightly taller)
    const minEduHeight = 90; const maxEduHeight = 420;

    // keep placed rects per side to avoid overlap
    const placedLeft = [];
    const placedRight = [];

    // helper to render description: detect simple bullet lists starting with - or *
    const renderDescHtml = (text) => {
      if (!text) return '';
      const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
      const isBullets = lines.length > 0 && lines.every(l => /^[-*]\s+/.test(l) || /^\d+\.\s+/.test(l));
      if (isBullets) {
        const itemsHtml = lines.map(l => {
          const cleaned = l.replace(/^([-*]|\d+\.)\s+/, '');
          return `<li>${escapeHtml(cleaned)}</li>`;
        }).join('');
        return `<div class="desc"><ul>${itemsHtml}</ul></div>`;
      }
      return `<div class="desc"><p>${escapeHtml(text)}</p></div>`;
    };

    items.forEach((x, idx) => {
      const li = document.createElement('li');
      const id = x.id || `i-${idx}`;
  const sDate = parse(x.start) || timelineStart;
  const eDate = x.end ? parse(x.end) : timelineEnd;
    // clamp dates inside timeline range; nudge pre-range starts a couple months forward
    // so items that began earlier (e.g. STMC) don't sit flush at the very bottom.
    const endDate = eDate > timelineEnd ? timelineEnd : eDate;
    let startDate = sDate < timelineStart ? new Date(timelineStart.getFullYear(), timelineStart.getMonth() + 2, 1) : sDate;
  const startMonths = monthsBetween(timelineStart, startDate);
  const endMonths = monthsBetween(timelineStart, endDate);
  const spanMonths = Math.max(1, monthsBetween(startDate, endDate));
  // compute visual positions (inverted so later dates are nearer to top)
  const startPosPx = Math.round((1 - (startMonths / totalMonths)) * totalHeight);
  const endPosPx = Math.round((1 - (endMonths / totalMonths)) * totalHeight);

  let cardHeight;
  let side;
  let cardTop;
      if (eduIds.has(id)) {
        side = 'left';
        // education: anchor top at end date and bottom at start date exactly
        const rawHeight = startPosPx - endPosPx;
        cardHeight = Math.max(2, Math.round(rawHeight)); // allow small spans but keep visible
        cardTop = endPosPx;
        // keep exact date mapping for education items
        placedLeft.push({ top: cardTop, bottom: cardTop + cardHeight });
      } else {
        side = 'right';
        // non-edu: uniform height, bottom anchored at start date; allow nudging to avoid overlaps
        cardHeight = uniformCardHeight;
        cardTop = startPosPx - cardHeight;
        if (cardTop < 8) cardTop = 8;
        const placed = placedRight;
        const intersects = (r1, r2) => !(r1.bottom <= r2.top || r1.top >= r2.bottom);
        let attempts = 0;
        while (placed.some(r => !(cardTop + cardHeight <= r.top || cardTop >= r.bottom)) && attempts < 200) {
          cardTop += 12; attempts++;
        }
        placed.push({ top: cardTop, bottom: cardTop + cardHeight });
      }
      li.className = side === 'left' ? 'left' : 'right';
      const when = formatWhen(x.start, x.end);
      const card = document.createElement('div');
      card.className = 'card' + (eduIds.has(id) ? ' edu' : '');
      card.setAttribute('role','button');
      card.setAttribute('tabindex','0');
      card.dataset.id = id;
      // include a data-rich area for education cards (allow fuller HTML)
      card.innerHTML = `<div class="when">${when}</div>
        <div class="what">${escapeHtml(x.title)}</div>
        <div class="where">${escapeHtml(x.org)}</div>
        ${renderDescHtml(x.desc || '')}`;
      card.style.height = cardHeight + 'px';
      li.style.top = cardTop + 'px';
      li.appendChild(card);

      // click/keyboard open
      card.addEventListener('click', () => { window.location = `experience.html?id=${id}`; });
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') window.location = `experience.html?id=${id}`; });
      list.appendChild(li);
    });
  } catch (e) {
    console.error(e);
    $("#timeline").innerHTML = "<li>Could not load experiences.json</li>";
  }
}
loadExperiences();

// Header hide on scroll: hide when scrolling down, show when slight scroll up
const header = $("#siteHeader");
let lastScroll = window.scrollY; let ticking = false;
const onScroll = () => {
  const y = window.scrollY;
  if (Math.abs(y - lastScroll) < 6) return; // ignore tiny deltas
  if (y > lastScroll && y > 80) { // scrolling down
    header.classList.add('hide'); header.classList.remove('show');
  } else { // scrolling up
    header.classList.remove('hide'); header.classList.add('show');
  }
  lastScroll = y;
};
window.addEventListener('scroll', () => { if (!ticking) { window.requestAnimationFrame(() => { onScroll(); ticking=false; }); ticking=true; } });

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

// Helpers for experiences
function formatWhen(start, end){
  const fmt = (s) => {
    if (!s) return '';
    // accept YYYY or YYYY-MM
    const parts = s.split('-');
    if (parts.length === 1) return parts[0];
    const [y,m] = parts;
    try { return new Date(`${y}-${m}-01`).toLocaleString(undefined, {month: 'short', year: 'numeric'}); } catch { return s; }
  };
  const startStr = fmt(start);
  const endStr = end ? fmt(end) : 'present';
  return `${startStr} — ${endStr}`;
}

function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

function renderHighlights(items){
  const container = $('#highlights');
  if (!container) return;
  container.innerHTML = '';
  // pick up to 3 most recent items with titles
  const picks = items.filter(i => i.title).slice(0,3);
  picks.forEach(i => {
    const a = document.createElement('div');
    a.className = 'highlight';
    const id = i.id || '';
    a.innerHTML = `<a href="experience.html?id=${id}">${escapeHtml(i.title)} — <span class="muted">${escapeHtml(i.org)}</span></a>`;
    container.appendChild(a);
  });
}
