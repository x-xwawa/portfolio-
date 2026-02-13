const overlay = document.getElementById("overlay");
const mainScreen = document.getElementById("main-screen");
const blackout = document.getElementById("blackout");
const loading = document.getElementById("loading");

const okBtn = document.querySelector(".ok-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const miniBtn = document.querySelector(".mini-btn");
const closeBtn = document.querySelector(".close-btn");
const backBtn = document.getElementById("back-btn");

const BOOT_KEY = "portfolio_booted";

const isIndexPage =
  overlay && mainScreen && blackout && loading &&
  okBtn && cancelBtn && miniBtn && closeBtn && backBtn;

function showMainScreen() {
  overlay.style.display = "none";
  overlay.style.opacity = "0";
  mainScreen.style.display = "block";
}

function showOverlay() {
  mainScreen.style.display = "none";
  overlay.style.display = "flex";
  overlay.style.opacity = "1";
}

if (isIndexPage) {
  if (sessionStorage.getItem(BOOT_KEY) === "1") {
    showMainScreen();
  } else {
    showOverlay();
  }

  okBtn.addEventListener("click", () => {
    sessionStorage.setItem(BOOT_KEY, "1");
    overlay.style.opacity = "0";
    setTimeout(() => {
      showMainScreen();
    }, 300);
  });

  function fakeLoad() {
    blackout.style.opacity = "1";
    setTimeout(() => (loading.style.display = "flex"), 300);
    setTimeout(() => {
      loading.style.display = "none";
      blackout.style.opacity = "0";
    }, 2300);
  }

  cancelBtn.addEventListener("click", fakeLoad);
  miniBtn.addEventListener("click", fakeLoad);
  closeBtn.addEventListener("click", fakeLoad);
}

/* 全ページ共通：data-back は「統一した戻る」 */
document.querySelectorAll("[data-back]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();

    // indexページにいる場合：起動画面へ戻る
    const onIndex = document.getElementById("overlay") && document.getElementById("main-screen");
    if (onIndex) {
      sessionStorage.removeItem(BOOT_KEY);
      const overlayEl = document.getElementById("overlay");
      const mainEl = document.getElementById("main-screen");
      overlayEl.style.display = "flex";
      overlayEl.style.opacity = "1";
      mainEl.style.display = "none";
      return;
    }

    // 作品ページにいる場合：indexに戻るが、起動画面は出さずメインへ直帰
    sessionStorage.setItem(BOOT_KEY, "1");
    const fallback = el.getAttribute("href") || "index.html";
    window.location.href = fallback;
  });
});
