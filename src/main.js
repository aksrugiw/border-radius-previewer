const DEFAULT_BORDER_RADIUS = "6";

const box = document.querySelector(".border-box");
const inputTopLeft = document.getElementById("input-top-left");
const inputTopRight = document.getElementById("input-top-right");
const inputBottomRight = document.getElementById("input-bottom-right");
const inputBottomLeft = document.getElementById("input-bottom-left");
const inputs = document.querySelectorAll("input");
const buttons = document.querySelectorAll(".apply-all");
const clipboardButton = document.querySelector(".clipboard");

function setBorderRadius(radius, corner = "all") {
  if (corner === "all") {
    box.style.borderRadius = `${radius}px`;
  }

  const convertedCorner = convertToPascalCase(corner);
  box.style[`border${convertedCorner}Radius`] = `${radius}px`;
  generateCSS(radius, corner);
}

function convertToPascalCase(str) {
  return str
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.substr(1))
    .join("");
}

function updateBorderRadius(evt) {
  const corner = evt.target.id.split("input-")[1];
  const radius = evt.target.value;
  setBorderRadius(radius, corner);
}

function applyToAllCorners(evt) {
  const targetInput = evt.target.previousElementSibling || evt.target.parentElement.previousElementSibling;
  const radius = targetInput.value;
  setBorderRadius(radius, "all");
  updateInputsValue(radius);
}

function updateInputsValue(value) {
  inputs.forEach((input) => (input.value = value));
}

function generateCSS(radius, corner) {
  const container = document.querySelector(".container");
  container.innerHTML = `
  <pre>-webkit-border-radius: ${box.style.borderRadius};
  -moz-border-radius: ${box.style.borderRadius};
  border-radius: ${box.style.borderRadius};</pre>
  `;
}

function copyToClipboard(evt) {
  const content = document.querySelector(".container pre");
  const defaultBtnText = evt.target.innerHTML;

  navigator.clipboard
    .writeText(content.innerHTML)
    .then(() => {
      evt.target.innerHTML = "Copied!";

      setTimeout(() => {
        evt.target.innerHTML = defaultBtnText;
      }, 1000);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
}

inputs.forEach((input) => (input.value = DEFAULT_BORDER_RADIUS));
inputs.forEach((input) => input.addEventListener("input", updateBorderRadius));
buttons.forEach((button) => button.addEventListener("click", applyToAllCorners));
clipboardButton.addEventListener("click", copyToClipboard);

setBorderRadius(DEFAULT_BORDER_RADIUS);
