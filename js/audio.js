const blur = document.getElementById("blur-overlay");
const enter = document.getElementById("enter-btn");
const audio = document.getElementById("bgm");

if (localStorage.getItem("visited")) {
  // audio.play().catch(console.error);
  blur.remove();
} else {
  enter.addEventListener("click", () => {
    localStorage.setItem("visited", "true");
    audio.play().catch(console.error);
    blur.classList.add("hidden");

    setTimeout(() => blur.remove(), 800);
  });
}
