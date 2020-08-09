const DEFAULT_BORDER_RADIUS = "6";
const box = document.querySelector(".border-box");
const inputTopLeft = document.getElementById("input-top-left");
const inputTopRight = document.getElementById("input-top-right");
const inputBottomRight = document.getElementById("input-bottom-right");
const inputBottomLeft = document.getElementById("input-bottom-left");
const inputs = [inputTopLeft, inputTopRight, inputBottomLeft, inputBottomRight];

function setBorderRadius(radius, corner = "all") {
  if (corner === "all") {
    box.style.borderRadius = `${radius}px`;
  }

  const convertedCorner = convertToPascalCase(corner);
  box.style[`border${convertedCorner}Radius`] = `${radius}px`;
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

inputs.forEach((input) => (input.value = DEFAULT_BORDER_RADIUS));
inputs.forEach((input) => input.addEventListener("input", updateBorderRadius));

setBorderRadius(DEFAULT_BORDER_RADIUS);
