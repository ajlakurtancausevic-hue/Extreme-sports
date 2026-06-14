// =====================================================================
// PREVODI
// =====================================================================
const prevodi = {
  sr: {
    nav_home:           "HOMEPAGE",
    nav_aboutus:        "O NAMA",
    nav_login:          "LOGIN",
    nav_kontakt:        "KONTAKT",
    nav_signup:         "SIGN UP",
    lang_btn:           "🌐 EN",
    footer_opis:        "XSports je platforma koja te povezuje sa najboljim ekstremnim sportovima u Srbiji. Pronađi svoju avanturu i prijavi se danas!",
    footer_kontakt_naslov: "Kontakt",
    footer_rights:      "Sva prava zadržana.",
    kon_naslov:         "Kontaktirajte nas",
    kon_podnaslov:      "Tu smo za vas — bilo da imate pitanje, komentar ili jednostavno želite da kažete zdravo.",
    kon_tel_label:      "Telefon",
    kon_tel_napomena:   "Pon – Pet, 09:00 – 17:00",
    kon_email_napomena: "Odgovaramo u roku od 24h",
    kon_adr_label:      "Adresa",
    kon_adr_napomena:   "Novi Sad, Srbija",
    kon_pratite:        "Pratite nas",
    kon_mapa_tag:       "Naša lokacija",
    kon_mapa_naslov:    "Pronađite nas",
    kon_otvori_mapu:    "Otvori mapu",
    // Forma
    kon_forma_naslov:   "Pošaljite poruku",
    kon_ime_label:      "Ime i prezime",
    kon_ime_placeholder:"Npr. Ajla Kurtančaušević",
    kon_ime_hint:       "Unesite ime i prezime (min. 3 karaktera, samo slova)",
    kon_ime_greska:     "Ime i prezime nije ispravno uneseno!",
    kon_email_label:    "Email adresa",
    kon_email_placeholder: "Npr. ajla@xsports.rs",
    kon_email_hint:     "Unesite ispravnu email adresu (npr. ime@domen.rs)",
    kon_email_greska:   "Email adresa nije ispravna!",
    kon_poruka_label:   "Poruka",
    kon_poruka_placeholder: "Vaša poruka...",
    kon_poruka_hint:    "Unesite poruku (min. 10 karaktera)",
    kon_poruka_greska:  "Poruka mora imati najmanje 10 karaktera!",
    kon_posalji:        "Pošalji poruku",
    kon_success:        "Poruka je uspešno poslata! Kontaktiraćemo vas uskoro.",
  },
  en: {
    nav_home:           "HOMEPAGE",
    nav_aboutus:        "ABOUT US",
    nav_login:          "LOGIN",
    nav_kontakt:        "CONTACT",
    nav_signup:         "SIGN UP",
    lang_btn:           "🌐 SR",
    footer_opis:        "XSports is a platform that connects you with the best extreme sports in Serbia. Find your adventure and sign up today!",
    footer_kontakt_naslov: "Contact",
    footer_rights:      "All rights reserved.",
    kon_naslov:         "Contact us",
    kon_podnaslov:      "We're here for you — whether you have a question, a comment, or just want to say hello.",
    kon_tel_label:      "Phone",
    kon_tel_napomena:   "Mon – Fri, 09:00 – 17:00",
    kon_email_napomena: "We respond within 24 hours",
    kon_adr_label:      "Address",
    kon_adr_napomena:   "Novi Sad, Serbia",
    kon_pratite:        "Follow us",
    kon_mapa_tag:       "Our location",
    kon_mapa_naslov:    "Find us",
    kon_otvori_mapu:    "Open map",
    // Forma
    kon_forma_naslov:   "Send a message",
    kon_ime_label:      "Full name",
    kon_ime_placeholder:"E.g. John Smith",
    kon_ime_hint:       "Enter your full name (min. 3 characters, letters only)",
    kon_ime_greska:     "Full name is not valid!",
    kon_email_label:    "Email address",
    kon_email_placeholder: "E.g. ajla@xsports.rs",
    kon_email_hint:     "Enter a valid email address (e.g. name@domain.com)",
    kon_email_greska:   "Email address is not valid!",
    kon_poruka_label:   "Message",
    kon_poruka_placeholder: "Your message...",
    kon_poruka_hint:    "Enter your message (min. 10 characters)",
    kon_poruka_greska:  "Message must be at least 10 characters!",
    kon_posalji:        "Send message",
    kon_success:        "Message sent successfully! We will contact you soon.",
  }
};

// =====================================================================
// REGEX VALIDACIJA
// =====================================================================
const regex = {
  ime:    /^[A-Za-zČčĆćŠšŽžĐđА-Яа-яЉљЊњЏџ\s]{3,}$/,
  email:  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  poruka: /^[\s\S]{10,}$/
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

  // Placeholder prevodi
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const k = el.getAttribute("data-i18n-placeholder");
    if (t[k] !== undefined) el.placeholder = t[k];
  });

  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = t.lang_btn;

  localStorage.setItem("jezik", lang);
  document.documentElement.lang = lang;
}

function prikaziGresku(inputId, tooltipId, greskId, greskaTekst) {
  const input = document.getElementById(inputId);
  const tooltip = document.getElementById(tooltipId);
  const greska = document.getElementById(greskId);
  input.classList.remove("input-ok");
  input.classList.add("input-greska");
  tooltip.classList.remove("vidljiv");
  greska.textContent = greskaTekst;
  greska.classList.add("vidljiva");
}

function prikaziOk(inputId, greskId) {
  const input = document.getElementById(inputId);
  const greska = document.getElementById(greskId);
  input.classList.remove("input-greska");
  input.classList.add("input-ok");
  greska.classList.remove("vidljiva");
}

function validirajFormu() {
  const lang = trenutniJezik();
  const t = prevodi[lang];
  let ispravna = true;

  const ime = document.getElementById("ime").value.trim();
  const email = document.getElementById("email-forma").value.trim();
  const poruka = document.getElementById("poruka").value.trim();

  if (!regex.ime.test(ime)) {
    prikaziGresku("ime", "tooltip-ime", "greska-ime", t.kon_ime_greska);
    ispravna = false;
  } else {
    prikaziOk("ime", "greska-ime");
  }

  if (!regex.email.test(email)) {
    prikaziGresku("email-forma", "tooltip-email", "greska-email", t.kon_email_greska);
    ispravna = false;
  } else {
    prikaziOk("email-forma", "greska-email");
  }

  if (!regex.poruka.test(poruka)) {
    prikaziGresku("poruka", "tooltip-poruka", "greska-poruka", t.kon_poruka_greska);
    ispravna = false;
  } else {
    prikaziOk("poruka", "greska-poruka");
  }

  return ispravna;
}

// =====================================================================
// DOM READY
// =====================================================================
document.addEventListener("DOMContentLoaded", function () {

  primenijezik(trenutniJezik());

  // Lang toggle
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      primenijezik(trenutniJezik() === "sr" ? "en" : "sr");
    });
  }

  // Navigacija
  document.getElementById("homepage")?.addEventListener("click", () => window.location.href = "../homepage/homepage.html");
  document.getElementById("aboutus")?.addEventListener("click",  () => window.location.href = "../aboutus/aboutus.html");
  document.getElementById("login")?.addEventListener("click",    () => window.location.href = "../login/login.html");
  document.getElementById("kontakt")?.addEventListener("click",  () => window.location.href = "kontakt.html");
  document.getElementById("hederdugme")?.addEventListener("click", () => window.location.href = "../login/login.html");

  // =====================================================================
  // TOOLTIP — pojavljuje se pri fokusu na polje
  // =====================================================================
  const polja = [
    { inputId: "ime",         tooltipId: "tooltip-ime" },
    { inputId: "email-forma", tooltipId: "tooltip-email" },
    { inputId: "poruka",      tooltipId: "tooltip-poruka" },
  ];

  polja.forEach(({ inputId, tooltipId }) => {
    const input   = document.getElementById(inputId);
    const tooltip = document.getElementById(tooltipId);
    if (!input || !tooltip) return;

    input.addEventListener("focus", () => {
      // Prikaži tooltip samo ako nema greške
      if (!input.classList.contains("input-greska")) {
        tooltip.classList.add("vidljiv");
      }
    });
    input.addEventListener("blur", () => {
      tooltip.classList.remove("vidljiv");
    });
  });

  // =====================================================================
  // SUBMIT FORMA
  // =====================================================================
  const submitBtn = document.getElementById("forma-submit");
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const ispravna = validirajFormu();
      if (ispravna) {
        // Sakrij formu, prikaži success
        document.getElementById("forma-success").style.display = "flex";
        document.getElementById("ime").value = "";
        document.getElementById("email-forma").value = "";
        document.getElementById("poruka").value = "";
        ["ime", "email-forma", "poruka"].forEach(id => {
          const el = document.getElementById(id);
          el.classList.remove("input-ok", "input-greska");
        });
        // Sakrij success posle 5 sekundi
        setTimeout(() => {
          document.getElementById("forma-success").style.display = "none";
        }, 5000);
      }
    });
  }

  const hamburger = document.getElementById('hamburger-menu');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('otvoren'));
  }

});