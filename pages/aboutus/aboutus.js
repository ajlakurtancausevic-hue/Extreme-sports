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
    footer_opis:    "XSports je platforma koja te povezuje sa najboljim ekstremnim sportovima u Srbiji. Pronađi svoju avanturu i prijavi se danas!",
    footer_kontakt_naslov: "Kontakt",
    footer_rights:  "Sva prava zadržana.",
    about_tag:      "Ko smo mi",
    about_naslov:   "Adrenalin je\nnaš jezik.",
    about_ekstremni:"Ekstremni Sportovi",
    about_opis:     "Posvećeni smo tome da svakome pružimo pristup najuzbudljivijim ekstremnim sportovima u Srbiji. Naš tim iskusnih instruktora je tu da te provede kroz svaki korak avanture.",
    vred1_naslov:   "Sigurnost na prvom mestu",
    vred1_tekst:    "Svaki sport i instruktor prošli su strogu proveru kako bi tvoja avantura bila bezbedan i nezaboravan doživljaj.",
    vred2_naslov:   "Iskusni instruktori",
    vred2_tekst:    "Naši instruktori su sertifikovani profesionalci sa godinama iskustva u ekstremnim sportovima širom sveta.",
    vred3_naslov:   "Provereni sportovi",
    vred3_tekst:    "Biramo samo sportove i lokacije koje su prošle naše standarde kako bi svaki polaznik imao iskustvo koje pamti ceo život.",
    instr_tag:      "Upoznaj tim",
    instr_feel:     "Feel the excitement",
    instr_naslov:   "Naši Instruktori",
    instr1_opis:    "Iskusni rafting instruktor koji te vodi kroz najuzbudljivije reke i brze vode širom Balkana.",
    instr2_sport:   "Planinarenje & Penjanje",
    instr2_opis:    "Instruktor planinarenja i penjanja, uvek spreman da pokaže put do najviših vrhova.",
    instr3_opis:    "Stručnjak za paraglajding koji ti otvara nebo i pruža nezaboravno iskustvo letenja.",
  },
  en: {
    nav_home:       "HOMEPAGE",
    nav_aboutus:    "ABOUT US",
    nav_login:      "LOGIN",
    nav_kontakt:    "CONTACT",
    nav_signup:     "SIGN UP",
    lang_btn:       "🌐 SR",
    footer_opis:    "XSports is a platform that connects you with the best extreme sports in Serbia. Find your adventure and sign up today!",
    footer_kontakt_naslov: "Contact",
    footer_rights:  "All rights reserved.",
    about_tag:      "Who we are",
    about_naslov:   "Adrenaline is\nour language.",
    about_ekstremni:"Extreme Sports",
    about_opis:     "We are dedicated to giving everyone access to the most thrilling extreme sports in Serbia. Our team of experienced instructors is here to guide you through every step of the adventure.",
    vred1_naslov:   "Safety first",
    vred1_tekst:    "Every sport and instructor has passed strict verification to ensure your adventure is a safe and unforgettable experience.",
    vred2_naslov:   "Experienced instructors",
    vred2_tekst:    "Our instructors are certified professionals with years of experience in extreme sports around the world.",
    vred3_naslov:   "Verified sports",
    vred3_tekst:    "We only select sports and locations that have met our standards so every participant has an experience they'll remember for life.",
    instr_tag:      "Meet the team",
    instr_feel:     "Feel the excitement",
    instr_naslov:   "Our Instructors",
    instr1_opis:    "Experienced rafting instructor who guides you through the most thrilling rivers and rapids across the Balkans.",
    instr2_sport:   "Hiking & Climbing",
    instr2_opis:    "Hiking and climbing instructor, always ready to show the way to the highest peaks.",
    instr3_opis:    "Paragliding expert who opens up the sky and gives you an unforgettable flying experience.",
  }
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

  localStorage.setItem("jezik", lang);
  document.documentElement.lang = lang;
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

  // Navigacija
  document.getElementById("homepage")?.addEventListener("click", () => window.location.href = "../homepage/homepage.html");
  document.getElementById("aboutus")?.addEventListener("click",  () => window.location.href = "aboutus.html");
  document.getElementById("login")?.addEventListener("click",    () => window.location.href = "../login/login.html");
  document.getElementById("kontakt")?.addEventListener("click",  () => window.location.href = "../kontakt/kontakt.html");

  document.getElementById("hederdugme")?.addEventListener("click", () => window.location.href = "../login/login.html");

  const hamburger = document.getElementById('hamburger-menu');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('otvoren'));
  }

});