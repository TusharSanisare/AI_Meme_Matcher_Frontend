document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const selectedImage = document.getElementById("selectedImage");
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        selectedImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// const api_url = "{{API_URL}}";
const api_url = "https://meme-matcher.onrender.com/match";

document.getElementById("uploadButton").addEventListener("click", function () {
  const fileInput = document.getElementById("fileInput");
  const matchedMeme = document.getElementById("matchedMeme");

  if (fileInput.files.length === 0) {
    alert("Please select an image file.");
    return;
  }

  const slideshowImages = 54;

  let currentSlide = 1;
  let slideshowInterval;

  slideshowInterval = setInterval(() => {
    matchedMeme.src = `memes/${currentSlide}.png`;
    currentSlide = (currentSlide + 1) % slideshowImages;
  }, 100);

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  fetch(api_url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      clearInterval(slideshowInterval);

      if (data.matched_meme) {
        confettiFun();
        matchedMeme.src = `memes/${data.matched_meme}`;
      } else if (data.error) {
        alert(data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
      clearInterval(slideshowInterval);
    });
});

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const fileNameDisplay = document.getElementById("file-name");
    const file = event.target.files[0];

    const memeBtn = document.querySelector("#uploadButton");
    const uplaodBtn = document.querySelector(".file-upload");

    uplaodBtn.style.display = "none";
    memeBtn.style.display = "";
  });

const confettiFun = () => {
  var scalar = 2;
  var unicorn = confetti.shapeFromText({ text: "😂", scalar });

  var defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.96,
    startVelocity: 15,
    shapes: [unicorn],
    scalar,
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30,
    });

    confetti({
      ...defaults,
      particleCount: 5,
      flat: true,
    });

    confetti({
      ...defaults,
      particleCount: 15,
      scalar: scalar / 2,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 300);
  setTimeout(shoot, 500);
};
