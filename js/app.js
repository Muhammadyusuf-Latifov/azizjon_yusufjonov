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
// === YOUTUBE VIDEO AUTO LOADER ===
// Urolog Azizjon Yusufjonov kanalidan yangi videolarni avtomatik chiqarish

 const API_KEY = "AIzaSyC8Q9BboFiiAWVyHnalUb8UOVgMd-6RZdA";
  const CHANNEL_ID = "UCE-MiQcDnTNz-7b4rKZn7mA";
  const MAX_RESULTS = 1000; // maksimal 100 ta video

  async function loadLatestVideos() {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
      );
      const data = await res.json();
      const container = document.getElementById("videoContainer");
      if (!container) return;
      container.innerHTML = "";

      const videoIds = data.items
        .filter((item) => item.id.kind === "youtube#video")
        .map((item) => item.id.videoId)
        .join(",");

      if (!videoIds) {
        container.innerHTML = `<p class="yoqq">Hech qanday video topilmadi ❌</p>`;
        return;
      }

      // 🔹 Videolar uzunligini olish
      const detailsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${API_KEY}`
      );
      const detailsData = await detailsRes.json();

      // 🔹 Faqat 30 soniyadan UZUN videolarni chiqaramiz
      const normalVideos = detailsData.items.filter((video) => {
        const duration = video.contentDetails.duration; // masalan PT15S yoki PT3M22S
        const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
        const minutes = parseInt(match?.[1] || 0);
        const seconds = parseInt(match?.[2] || 0);
        const totalSeconds = minutes * 60 + seconds;
        return totalSeconds >= 30; // ✅ faqat 30 soniyadan uzunlar
      });

      // 🔹 Saytda chiqarish
      if (normalVideos.length > 0) {
        normalVideos.forEach((video) => {
          const videoId = video.id;
          const title = video.snippet.title;

          const videoBox = document.createElement("div");
          videoBox.classList.add("video-boxx");
          videoBox.innerHTML = `
            <iframe
              class="video-iframe-you"
              src="https://www.youtube.com/embed/${videoId}"
              frameborder="0"
              allowfullscreen
              loading="lazy">
            </iframe>
            <h3 class="titleyou">${title}</h3>
          `;
          container.appendChild(videoBox);
        });
      } else {
        container.innerHTML = `<p class="yoqq">30 soniyadan uzun video topilmadi ❌</p>`;
      }
    } catch (err) {
      console.error("YouTube ma'lumotini olishda xatolik:", err);
      document.getElementById("videoContainer").innerHTML =
        "<p>Videolarni yuklab bo‘lmadi 😔</p>";
    }
  }

  document.addEventListener("DOMContentLoaded", loadLatestVideos);
  setInterval(loadLatestVideos, 5 * 60 * 1000); // har 5 daqiqada yangilash