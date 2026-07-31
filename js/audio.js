const blur = document.getElementById("blur-overlay");
const enter = document.getElementById("enter-btn");
const audio = document.getElementById("bgm");

const isReturning = localStorage.getItem("visited");

if (isReturning) {
  // audio.play().catch(() => console.log("Audio play failed"));
  blur.remove();
} else {
  enter.addEventListener("click", () => {
    localStorage.setItem("visited", "true");
    audio.play().catch(() => console.log("Audio play failed"));

    blur.classList.add("hidden");
    setTimeout(() => blur.remove(), 800);
  });
}
