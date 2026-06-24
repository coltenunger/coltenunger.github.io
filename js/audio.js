const blurWall = document.getElementById("blur-wall");
const enterBtn = document.getElementById("enter-btn");
const audio = document.getElementById("bgm");
audio.volume = 0.5;

// Check if this is a returning visitor
const visited = localStorage.getItem("visited");

// Returning visitor
if (visited) {
  blurWall.style.display = "none";
  blurWall.remove();

  audio.play().catch(() => {
    throw new Error("Audio will not play because of browser restrictions.");
  });
} else {
  // First visit
  enterBtn.addEventListener("click", () => {
    // Remember the visitor
    localStorage.setItem("visited", "true");

    audio.play();

    blurWall.classList.add("hidden");

    setTimeout(() => {
      blurWall.style.display = "none";
    }, 800);
  });
}
