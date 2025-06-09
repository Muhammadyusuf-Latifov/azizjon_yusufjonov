const headerEl = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 0) {
    headerEl.classList.add("shrink");
  } else {
    headerEl.classList.remove("shrink");
  }
});

// ================================================
// popup img ----------------------------------
// ---------------------------------------
const images = document.querySelectorAll(".gallery img");
const modal = document.getElementById("modal");
const modalImg = modal.querySelector("img");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

function openModal(index) {
  currentIndex = index;
  modalImg.src = images[currentIndex].src;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  modalImg.src = "";
  modalImg.classList.remove("zoomed"); // Reset zoom on close
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImg.src = images[currentIndex].src;
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  modalImg.src = images[currentIndex].src;
}

// Image click to open modal
images.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});

// Button events
closeBtn.addEventListener("click", closeModal);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

// Click outside image closes modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Toggle zoom on image click
modalImg.addEventListener("click", () => {
  modalImg.classList.toggle("zoomed");
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "ArrowLeft") showPrev();
    else if (e.key === "ArrowRight") showNext();
    else if (e.key === "Escape") closeModal();
  }
});
// preloader =======================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
// ======================================================= video trigger =====================================
const videoTrigger = document.getElementById("videoTrigger");
const videoOverlay = document.getElementById("videoOverlay");
const videoClose = document.getElementById("videoClose");
const videoElement = document.getElementById("videoElement");

videoTrigger.addEventListener("click", () => {
  videoOverlay.style.display = "flex";
  videoOverlay.setAttribute("aria-hidden", "false");
  videoElement.play();
});

videoClose.addEventListener("click", () => {
  videoOverlay.style.display = "none";
  videoOverlay.setAttribute("aria-hidden", "true");
  videoElement.pause();
  videoElement.currentTime = 0;
});

videoOverlay.addEventListener("click", (e) => {
  if (e.target === videoOverlay) {
    videoOverlay.style.display = "none";
    videoOverlay.setAttribute("aria-hidden", "true");
    videoElement.pause();
    videoElement.currentTime = 0;
  }
});
// toggle ======================================================
// toggle menu==================================
// ======================================
const backmenuEl = document.querySelector(".overlay");
const contentEl = document.querySelector(".content");
function openMenu() {
  backmenuEl.style.display = "flex";
  function popupLeft() {
    contentEl.classList.add("active");
  }
  popupLeft();
}

function closeMenu() {
  backmenuEl.style.display = "none";
  function closeLeft() {
    contentEl.classList.remove("active");
  }
  closeLeft();
}
// ====================================
// owl corusel ===========================================================≠================================================
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 2,

    nav: true,
    dots: true,
    autoplay: true, // 🔄 enables autoplay
    autoplayTimeout: 3000, // ⏱ 3 seconds per slide
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
  });
});
