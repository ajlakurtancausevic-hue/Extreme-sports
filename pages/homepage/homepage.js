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
    stat_sports:    "Ekstremnih sportova",
    stat_users:     "Registrovanih korisnika",
    stat_cities:    "Gradova u Srbiji",
    stat_satisfied: "Zadovoljnih polaznika",
    home_h1:        "Izaberi sport i prijavi se!",
    home_sub:       "Ovo su naši najpopularniji sportovi ovog meseca",
    btn_more:       "VIDI JOŠ SPORTOVA",
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
    stat_sports:    "Extreme sports",
    stat_users:     "Registered users",
    stat_cities:    "Cities in Serbia",
    stat_satisfied: "Satisfied participants",
    home_h1:        "Choose a sport and sign up!",
    home_sub:       "These are our most popular sports this month",
    btn_more:       "SEE MORE SPORTS",
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
    { Naziv: "Bungee jumping",       Opis: "Skakanje sa visoke konstrukcije uz pomoć elastične trake vezane za noge.",         Slika: "../../images/bungee.jpg" },
    { Naziv: "Paraglajding",         Opis: "Letenje sa padobranom koji se koristi kao krilo.",                                   Slika: "../../images/paraglajding.jpg" },
    { Naziv: "Surfovanje",           Opis: "Jahanje na talasima koristeći dasku za surfovanje.",                                 Slika: "../../images/surfovanje.jpg" },
    { Naziv: "Skijanje na vodi",     Opis: "Skijanje po vodi koristeći skije i vuču brodom.",                                   Slika: "../../images/skijanje.jpg" },
    { Naziv: "Planinsko biciklizam", Opis: "Vožnja bicikla po neravnom terenu i planinskim stazama.",                           Slika: "../../images/planinski.jpg" },
    { Naziv: "Base jumping",         Opis: "Skakanje sa visokih objekata koristeći padobran.",                                  Slika: "../../images/base.jpg" },
    { Naziv: "Kitesurfing",          Opis: "Vožnja na dasci po vodi koristeći zmaja za vuču.",                                  Slika: "../../images/kite.jpg" },
    { Naziv: "Rafting",              Opis: "Spustanje niz reku u gumenom čamcu.",                                               Slika: "../../images/rafting.jpg" },
    { Naziv: "Skakanje padobranom",  Opis: "Skočiti iz aviona i otvoriti padobran tokom pada.",                                 Slika: "../../images/padobran.jpg" },
    { Naziv: "Wingsuit flying",      Opis: "Letenje koristeći specijalno odelo koje omogućava klizanje kroz vazduh.",           Slika: "../../images/wingsuit.jpg" }
  ],
  en: [
    { Naziv: "Bungee Jumping",       Opis: "Jumping from a tall structure with an elastic cord attached to your legs.",         Slika: "../../images/bungee.jpg" },
    { Naziv: "Paragliding",          Opis: "Flying with a parachute-style wing carried by wind and thermals.",                  Slika: "../../images/paraglajding.jpg" },
    { Naziv: "Surfing",              Opis: "Riding ocean waves using a surfboard.",                                              Slika: "../../images/surfovanje.jpg" },
    { Naziv: "Water Skiing",         Opis: "Skiing on water using skis and being towed by a boat.",                             Slika: "../../images/skijanje.jpg" },
    { Naziv: "Mountain Biking",      Opis: "Riding a bicycle off-road on rough terrain and mountain trails.",                   Slika: "../../images/planinski.jpg" },
    { Naziv: "Base Jumping",         Opis: "Jumping from fixed objects such as cliffs or buildings using a parachute.",         Slika: "../../images/base.jpg" },
    { Naziv: "Kitesurfing",          Opis: "Riding a board on water using a large kite for propulsion.",                        Slika: "../../images/kite.jpg" },
    { Naziv: "Rafting",              Opis: "Navigating a river in an inflatable raft through rapids.",                          Slika: "../../images/rafting.jpg" },
    { Naziv: "Skydiving",            Opis: "Jumping from an aircraft and deploying a parachute during freefall.",               Slika: "../../images/padobran.jpg" },
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

  const cHome = document.getElementById("sports-container-home");
  if (cHome) {
    cHome.innerHTML = "";
    sports[lang].slice(0, 3).forEach(s => cHome.appendChild(kreirajKarticu(s, lang)));
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
    if (localStorage.getItem("ulogovan")) {
      window.location.href = "../sportovi/sportovi.html";
    } else {
      localStorage.setItem("redirectNakon", "../sportovi/sportovi.html");
      window.location.href = "../login/login.html";
    }
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

  document.getElementById("homepage")?.addEventListener("click", () => window.location.href = "homepage.html");
  document.getElementById("aboutus")?.addEventListener("click",  () => window.location.href = "../aboutus/aboutus.html");
  document.getElementById("login")?.addEventListener("click",    () => window.location.href = "../login/login.html");
  document.getElementById("kontakt")?.addEventListener("click",  () => window.location.href = "../kontakt/kontakt.html");

  document.getElementById("hederdugme")?.addEventListener("click", () => window.location.href = "../login/login.html");

  document.getElementById("vidiJosDugme")?.addEventListener("click", () => {
    if (sessionStorage.getItem("ulogovan")) {
      window.location.href = "../sportovi/sportovi.html";
    } else {
      sessionStorage.setItem("redirectNakon", "../sportovi/sportovi.html");
      window.location.href = "../login/login.html";
    }
  });

  document.getElementById("heroCta")?.addEventListener("click", () => {
    document.getElementById("sports-container-home")?.scrollIntoView({ behavior: "smooth" });
  });

  const hamburger = document.getElementById('hamburger-menu');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('otvoren'));
  }

});