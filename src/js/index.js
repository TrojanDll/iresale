// -------------------------------- Плавный переключатель ---------------------------------

class Switcher {
  constructor() {
    this.indicator = document.querySelector(".switcher-indicator");
    this.menuItems = document.querySelectorAll(".switcher button");
    this.menuItemWidth = 100 / this.menuItems.length + "%";
  }

  marker(e) {
    this.indicator.style.left = e.offsetLeft + "px";

    this.menuItems.forEach((item) => {
      if (item != e) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
  }

  init() {
    this.indicator.style.width = this.menuItemWidth;
    this.menuItems.forEach((item) => {
      item.style.width = this.menuItemWidth;
      item.addEventListener("click", (e) => {
        this.marker(e.target);
      });
    });
  }
}

new Switcher().init();

// -----------------------------------------------------------------

// -------------------------- Selects ------------------------------

const bindedSelects = [];

document.querySelectorAll(".select").forEach((item) => {
  bindedSelects.push(NiceSelect.bind(item));
});

// -----------------------------------------------------------------
