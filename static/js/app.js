(() => {
  const saved = localStorage.getItem("maintenix-theme");
  if (saved === "dark") document.body.classList.add("dark");
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("maintenix-theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
  document.querySelectorAll("[data-confirm]").forEach(el => el.addEventListener("click", e => {
    if (!confirm(el.getAttribute("data-confirm") || "¿Confirmás esta acción?")) e.preventDefault();
  }));
})();
