// =====================================================================
// SHA-256 HASH FUNKCIJA
// =====================================================================
async function hashPassword(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// =====================================================================
// KORISNICI — SHA-256 heshovi
// admin    / admin
// korisnik / password
// =====================================================================
const users = [
  { username: "admin",    password: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918" },
  { username: "korisnik", password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" }
];

// =====================================================================
// DOM READY
// =====================================================================
document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("submit").addEventListener("click", async function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    sakrijiGresku();

    if (!username || !password) {
      prikaziGresku("Unesite korisničko ime i lozinku!");
      return;
    }

    const hashed = await hashPassword(password);
    const korisnik = users.find(u => u.username === username && u.password === hashed);

    if (korisnik) {
      sessionStorage.setItem("ulogovan", "true");
      const redirect = localStorage.getItem("redirectNakon") || "../sportovi/sportovi.html";      localStorage.removeItem("redirectNakon");
      window.location.href = redirect;
    } else {
      prikaziGresku("Pogrešno korisničko ime ili lozinka!");
    }
  });

  document.getElementById("password").addEventListener("keydown", function (e) {
    if (e.key === "Enter") document.getElementById("submit").click();
  });
  document.getElementById("username").addEventListener("keydown", function (e) {
    if (e.key === "Enter") document.getElementById("submit").click();
  });

});

function prikaziGresku(tekst) {
  document.getElementById("login-greska-tekst").textContent = tekst;
  document.getElementById("login-greska").classList.add("vidljiva");
}

function sakrijiGresku() {
  document.getElementById("login-greska").classList.remove("vidljiva");
}