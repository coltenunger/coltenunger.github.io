// ENTER CODE
const enterBtn = document.getElementById("enter-btn");
const blurWall = document.getElementById("enter-overlay");

enterBtn.addEventListener("click", () => {
  blurWall.classList.add("hidden");

  setTimeout(() => {
    blurWall.style.display = "none";
  }, 800);
});

// MUSIC
const music = document.getElementById("bgm");

music.volume = 0.5;

document.addEventListener(
  "click",
  () => {
    music.play();
  },
  { once: true },
);
