const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

function setMenu(open) {
  if (!menuBtn || !menu) return;
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
}

menuBtn?.addEventListener("click", () => {
  const isOpen = menu.classList.contains("open");
  setMenu(!isOpen);
});

document.addEventListener("click", (e) => {
  if (!menu || !menuBtn) return;
  const target = e.target;
  if (menu.contains(target) || menuBtn.contains(target)) return;
  setMenu(false);
});

menu?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => setMenu(false));
});

function openWhatsApp(extraText = "") {
  const wa = window.__WA || { phone: "", msg: "" };
  const msg = (wa.msg || "") + (extraText ? "\n\n" + extraText : "");
  const url = `https://wa.me/${wa.phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
}

document.getElementById("btnAgende")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp();
});

document.querySelectorAll('[data-wa="1"]').forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp();
  });
});

document.getElementById("miniForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const data = new FormData(form);

  const nome = (data.get("nome") || "").toString().trim();
  const servico = (data.get("servico") || "").toString().trim();
  const dataHora = (data.get("data") || "").toString().trim();

  const parts = [];
  if (nome) parts.push(`Nome: ${nome}`);
  if (servico) parts.push(`Serviço: ${servico}`);
  if (dataHora) parts.push(`Preferência: ${dataHora}`);

  openWhatsApp(parts.join("\n"));
});
