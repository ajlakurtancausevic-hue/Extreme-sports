// =====================================================================
// ZASTITA — preusmeri na login ako nije ulogovan
// =====================================================================
if (!sessionStorage.getItem("ulogovan")) {
  sessionStorage.setItem("redirectNakon", "../sportovi/sportovi.html");
  window.location.href = "../login/login.html";
}

// =====================================================================
// PREVODI
// =====================================================================
const prevodi = {
  sr: {
    nav_home:       "HOMEPAGE",
    nav_aboutus:    "O NAMA",
    nav_login:      "LOGIN",
    nav_kontakt:    "KONTAKT",
    nav_signup:     "SIGN UP",
    lang_btn:       "🌐 EN",
    sports_h1:      "Svi ekstremni sportovi",
    sports_sub:     "Pronađi sport koji ti odgovara i prijavi se!",
    sports_tag:     "Istraži sve sportove",
    btn_signup_card:"PRIJAVI SE",
    footer_opis:    "XSports je platforma koja te povezuje sa najboljim ekstremnim sportovima u Srbiji. Pronađi svoju avanturu i prijavi se danas!",
    footer_kontakt_naslov: "Kontakt",
    footer_rights:  "Sva prava zadržana.",
  },
  en: {
    nav_home:       "HOMEPAGE",
    nav_aboutus:    "ABOUT US",
    nav_login:      "LOGIN",
    nav_kontakt:    "CONTACT",
    nav_signup:     "SIGN UP",
    lang_btn:       "🌐 SR",
    sports_h1:      "All extreme sports",
    sports_sub:     "Find the sport that suits you and sign up!",
    sports_tag:     "Explore all sports",
    btn_signup_card:"SIGN UP",
    footer_opis:    "XSports is a platform that connects you with the best extreme sports in Serbia. Find your adventure and sign up today!",
    footer_kontakt_naslov: "Contact",
    footer_rights:  "All rights reserved.",
  }
};

// =====================================================================
// SPORTS PODACI
// =====================================================================
const sports = {
  sr: [
    { Naziv: "Bungee jumping",       Opis: "Skakanje sa visoke konstrukcije uz pomoć elastične trake vezane za noge.",       Slika: "../../images/bungee.jpg" },
    { Naziv: "Paraglajding",         Opis: "Letenje sa padobranom koji se koristi kao krilo.",                                Slika: "../../images/paraglajding.jpg" },
    { Naziv: "Surfovanje",           Opis: "Jahanje na talasima koristeći dasku za surfovanje.",                              Slika: "../../images/surfovanje.jpg" },
    { Naziv: "Skijanje na vodi",     Opis: "Skijanje po vodi koristeći skije i vuču brodom.",                                Slika: "../../images/skateboard.png" },
    { Naziv: "Planinsko biciklizam", Opis: "Vožnja bicikla po neravnom terenu i planinskim stazama.",                        Slika: "../../images/penjanje.jpg" },
    { Naziv: "Base jumping",         Opis: "Skakanje sa visokih objekata koristeći padobran.",                               Slika: "../../images/bungi.jpg" },
    { Naziv: "Kitesurfing",          Opis: "Vožnja na dasci po vodi koristeći zmaja za vuču.",                               Slika: "../../images/kite.jpg" },
    { Naziv: "Rafting",              Opis: "Spustanje niz reku u gumenom čamcu.",                                            Slika: "../../images/surfovanje.jpg" },
    { Naziv: "Skakanje padobranom",  Opis: "Skočiti iz aviona i otvoriti padobran tokom pada.",                              Slika: "../../images/padobranstvo.jpg" },
    { Naziv: "Wingsuit flying",      Opis: "Letenje koristeći specijalno odelo koje omogućava klizanje kroz vazduh.",        Slika: "../../images/wingsuit.jpg" }
  ],
  en: [
    { Naziv: "Bungee Jumping",       Opis: "Jumping from a tall structure with an elastic cord attached to your legs.",      Slika: "../../images/bungee.jpg" },
    { Naziv: "Paragliding",          Opis: "Flying with a parachute-style wing carried by wind and thermals.",               Slika: "../../images/paraglajding.jpg" },
    { Naziv: "Surfing",              Opis: "Riding ocean waves using a surfboard.",                                           Slika: "../../images/surfovanje.jpg" },
    { Naziv: "Water Skiing",         Opis: "Skiing on water using skis and being towed by a boat.",                          Slika: "../../images/skateboard.png" },
    { Naziv: "Mountain Biking",      Opis: "Riding a bicycle off-road on rough terrain and mountain trails.",                Slika: "../../images/penjanje.jpg" },
    { Naziv: "Base Jumping",         Opis: "Jumping from fixed objects such as cliffs or buildings using a parachute.",      Slika: "../../images/bungi.jpg" },
    { Naziv: "Kitesurfing",          Opis: "Riding a board on water using a large kite for propulsion.",                     Slika: "../../images/kite.jpg" },
    { Naziv: "Rafting",              Opis: "Navigating a river in an inflatable raft through rapids.",                       Slika: "../../images/surfovanje.jpg" },
    { Naziv: "Skydiving",            Opis: "Jumping from an aircraft and deploying a parachute during freefall.",            Slika: "../../images/padobranstvo.jpg" },
    { Naziv: "Wingsuit Flying",      Opis: "Flying through the air using a special suit that adds surface area between limbs.", Slika: "../../images/wingsuit.jpg" }
  ]
};

// =====================================================================
// POMOCNE FUNKCIJE
// =====================================================================
function trenutniJezik() {
  return localStorage.getItem("jezik") || "sr";
}

function primenijezik(lang) {
  const t = prevodi[lang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (t[k] !== undefined) el.textContent = t[k];
  });

  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = t.lang_btn;

  const cSport = document.getElementById("sports-container");
  if (cSport) {
    cSport.innerHTML = "";
    sports[lang].forEach(s => cSport.appendChild(kreirajKarticu(s, lang)));
    pokreniObserver();
  }

  localStorage.setItem("jezik", lang);
  document.documentElement.lang = lang;
}

function kreirajKarticu(sport, lang) {
  const t = prevodi[lang || trenutniJezik()];
  const el = document.createElement("div");
  el.classList.add("kartica");
  el.innerHTML = `
    <img src="${sport.Slika}" alt="${sport.Naziv}">
    <div class="kartica-body">
      <div class="kartica-naziv">${sport.Naziv}</div>
      <div class="kartica-opis">${sport.Opis}</div>
    </div>
    <div class="kartica-footer">
      <span class="prijavi-se-btn">${t.btn_signup_card}</span>
    </div>
  `;
  el.querySelector('.prijavi-se-btn').addEventListener("click", () => {
    window.location.href = "../login/login.html";
  });
  return el;
}

function pokreniObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => e.target.classList.toggle('show', e.isIntersecting));
  }, { threshold: 0.15 });
  document.querySelectorAll('.kartica').forEach(k => observer.observe(k));
}

// =====================================================================
// DOM READY
// =====================================================================
document.addEventListener("DOMContentLoaded", function () {

  primenijezik(trenutniJezik());

  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      primenijezik(trenutniJezik() === "sr" ? "en" : "sr");
    });
  }

  document.getElementById("homepage")?.addEventListener("click", () => window.location.href = "../homepage/homepage.html");
  document.getElementById("aboutus")?.addEventListener("click",  () => window.location.href = "../aboutus/aboutus.html");
  document.getElementById("login")?.addEventListener("click",    () => window.location.href = "../login/login.html");
  document.getElementById("kontakt")?.addEventListener("click",  () => window.location.href = "../kontakt/kontakt.html");

  document.getElementById("hederdugme")?.addEventListener("click", () => window.location.href = "../login/login.html");

  const hamburger = document.getElementById('hamburger-menu');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('otvoren'));
  }

});