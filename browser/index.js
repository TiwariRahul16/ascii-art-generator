// browser/index.js
const { convertImageToAsciiBrowser } = require('../src/browser/core.js');
const { generateArt } = require('../src/textToAscii.js'); 

const fonts = {
  default: require("../src/fonts/default.json"),
  another: require("../src/fonts/another.json"),
  doller: require("../src/fonts/doller.json"),
  hash: require("../src/fonts/hashfont.json"),
  percent: require("../src/fonts/percent.json"),
  rupee: require("../src/fonts/rupee.json"),
  atsign: require("../src/fonts/signFont.json"),
  star: require("../src/fonts/starFont.json"),
  navbar: require("../src/fonts/navbar.json") // NEW FONT ADDED
};

function getFont(fontName) {
  return fonts[fontName?.toLowerCase()] || fonts.default;
}

async function renderAsciiImage({ elementId, src, width = 80, color = "#000" }) {
  const container = document.getElementById(elementId);
  if (!container) return;

  try {
    const ascii = await convertImageToAsciiBrowser(src, width);
    container.style.fontFamily = "monospace";
    container.style.whiteSpace = "pre";
    container.style.lineHeight = "1em";
    container.style.letterSpacing = "0";
    container.style.fontSize = "4px";
    container.style.color = color;
    container.style.overflow = "hidden";
    container.style.display = "inline-block";
    container.textContent = ascii;
  } catch (error) {
    console.error("AsciiArtGenerator: Failed to render image.", error);
    container.textContent = "Failed to load ASCII image";
  }
}

function renderAsciiText({ elementId, text, font = "default", color = "#000" }) {
  const container = document.getElementById(elementId);
  if (!container) return;

  try {
    const fontObj = getFont(font);
    const ascii = generateArt(text, fontObj, " ");
    container.style.fontFamily = "monospace";
    container.style.whiteSpace = "pre";
    container.style.lineHeight = "1"; // FIXED
    container.style.fontSize = "10px";
    container.style.color = color;
    container.style.display = "inline-block";
    container.textContent = ascii;
  } catch (error) {
    console.error("AsciiArtGenerator: Failed to render text.", error);
    container.textContent = "Font not found";
  }
}

module.exports = { renderAsciiImage, renderAsciiText };