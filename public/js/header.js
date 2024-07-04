console.log("JS header aalinkeado correctamente");

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-button");
  const nav = document.querySelector(".nav-bar");

  menuBtn.addEventListener("click", function () {
    console.log("se hizo click");
    nav.classList.toggle("show");
  });
});
