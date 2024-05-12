function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}
document.addEventListener("DOMContentLoaded", function () {
  var navbarToggle = document.querySelector(".navbar-toggler");

  navbarToggle.addEventListener("click", function () {
    var isExpanded = navbarToggle.getAttribute("aria-expanded") === "true";

    navbarToggle.setAttribute("aria-expanded", !isExpanded);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.querySelector(".dark-mode input");

  const isDarkMode = localStorage.getItem("darkMode") === "enabled";

  darkModeToggle.checked = isDarkMode;

  darkModeToggle.addEventListener("change", function () {
    if (darkModeToggle.checked) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });

  if (isDarkMode) {
    enableDarkMode();
  }

  function enableDarkMode() {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("darkMode", "enabled");
  }

  function disableDarkMode() {
    document.body.removeAttribute("data-theme");
    localStorage.setItem("darkMode", null);
  }
});

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 130 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  var css = document.createElement("style");
  css.type = "text/css";

  function calculateResponsiveBorderColor(bgColor) {
    const invertedColor = bgColor.replace(
      /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/,
      (match, r, g, b) => {
        return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
      }
    );
    return invertedColor;
  }

  function setBorderColor() {
    const backgroundColor = getComputedStyle(document.body).getPropertyValue(
      "background-color"
    );
    const responsiveBorderColor =
      calculateResponsiveBorderColor(backgroundColor);
    css.innerHTML = `.typewrite > .wrap { border-right: 0.08em solid ${responsiveBorderColor}}`;
  }

  setBorderColor();

  const darkModeToggle = document.querySelector(".dark-mode input");
  darkModeToggle.addEventListener("change", function () {
    setBorderColor();
  });

  document.body.appendChild(css);
};

// Menggunakan JavaScript untuk menambahkan atribut oncontextmenu
var images = document.getElementsByClassName("no-contextmenu");
for (var i = 0; i < images.length; i++) {
  images[i].setAttribute("oncontextmenu", "return false;");
}

document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = document.querySelectorAll(".lazy-load-image");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy-load-image");
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function (img) {
      observer.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(function (img) {
      img.src = img.dataset.src;
      img.classList.remove("lazy-load-image");
    });
  }
});

window.alert = function () {};
