/***********************
 * Toggle Zoom Feature *
 ***********************/
const toggleBtn = document.querySelector("button.zoom-toggle");
const toggleBtnPath = toggleBtn.querySelector("button svg path");
const htmlElement = document.documentElement;

// toggle zoom paths
const zoomInPath =
  "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6";
const zoomOutPath =
  "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6";
toggleBtnPath.setAttribute("d", zoomOutPath);

const toggleZoom = () => {
  // Get the current font-size of the HTML element
  const currentFontSize = parseFloat(
    window.getComputedStyle(htmlElement).getPropertyValue("font-size")
  );
  if (currentFontSize <= 6) {
    htmlElement.style.fontSize = "62.5%";
    toggleBtnPath.setAttribute("d", zoomOutPath);
    return;
  }

  toggleBtnPath.setAttribute("d", zoomInPath);
  htmlElement.style.fontSize = "28.5%";
};

toggleBtn.addEventListener("click", toggleZoom);

// Display current year at the footer copyright
document.querySelector(".year").textContent = new Date().getFullYear();

// Make mobile navigation
const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
const html = document.querySelector("html");
html.style.overflowY = "scroll";

const navHeight = header.getBoundingClientRect().height;

function toggleScrolling() {
  html.style.overflowY =
    html.style.overflowY === "scroll" ? "hidden" : "scroll";
}

btnNav.addEventListener("click", function () {
  const close = document.querySelector('.icon-mobile-nav[name="close-outline"');
  const closeVisible = window.getComputedStyle(close).display === "block";
  if (closeVisible) close.parentNode.blur();
  if (screen.orientation.angle === 0) toggleScrolling();
  header.classList.toggle("nav-open");
});

// smooth scrolling animation

function scrollToTarget(el) {
  const offsetPosition =
    el.getBoundingClientRect().top + window.scrollY - navHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (href.startsWith("#")) {
      const section = document.querySelector(href);
      //section.scrollIntoView({ behavior: "smooth" });
      scrollToTarget(section);
    }

    if (
      window.getComputedStyle(document.querySelector(".main-nav")).position ===
        "absolute" &&
      (link.classList.contains("main-nav-link") ||
        link.classList.contains("nav-cta"))
    ) {
      if (screen.orientation.angle === 0) toggleScrolling();
      header.classList.toggle("nav-open");
    }
  })
);

screen.orientation.onchange = function () {
  html.style.overflowY = "scroll";
};

/*********************
 * Sticky navigation *
 *********************/

const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    // make sticky nav a little taller than original to avoid flickering
    /*
    console.log(navHeight); // 76.79px
    console.log(header.getBoundingClientRect().height); // changes to 80px when returning to top
    */

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);
observer.observe(document.querySelector(".section-hero"));
