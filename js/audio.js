const blurWall = document.getElementById("blur-wall");
const enterBtn = document.getElementById("enter-btn");
const audio = document.getElementById("bgm");
// audio.volume = 0.5;

// Check if this is a returning visitor
const visited = localStorage.getItem("visited");

// Returning visitor — skip the blur wall and never play audio
if (visited) {
  blurWall.style.display = "none";
  blurWall.remove();
} else {
  // First visit — show blur wall, play audio only on click
  enterBtn.addEventListener("click", () => {
    // Remember the visitor so audio never plays again
    localStorage.setItem("visited", "true");

    audio.play().catch(() => {
      throw new Error();
    });

    blurWall.classList.add("hidden");

    setTimeout(() => {
      blurWall.style.display = "none";
    }, 800);
  });
}
