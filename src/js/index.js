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

// ------------------------- Accordions ----------------------------

document.querySelectorAll(".faq__accordion-item").forEach((el) => {
  const summary = el.querySelector(".faq__accordion-header");
  const content = el.querySelector(".faq__accordion-content");

  summary.addEventListener("click", (e) => {
    e.preventDefault();
    el.classList.toggle("faq__accordion-content_opened");

    if (el.open) {
      slideUp(content, () => {
        el.open = false;
      });
    } else {
      el.open = true;
      slideDown(content);
    }
  });
});

function slideUp(element, callback) {
  const height = element.offsetHeight;
  element.style.height = height + "px";
  element.offsetHeight; // Force reflow
  element.style.height = "0";
  element.addEventListener("transitionend", function handler() {
    element.removeEventListener("transitionend", handler);
    callback();
  });
}

function slideDown(element) {
  element.style.height = "0";
  element.offsetHeight; // Force reflow
  const height = element.scrollHeight;
  element.style.height = height + "px";
  element.addEventListener("transitionend", function handler() {
    element.removeEventListener("transitionend", handler);
    element.style.height = "auto";
  });
}

// --------------------------------------------------------------------
