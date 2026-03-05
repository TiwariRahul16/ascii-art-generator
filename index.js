// index.js

// Import the default font
const defaultFont = require("./src/fonts/default.json");

// Import other available fonts
const anotherFont = require("./src/fonts/another.json");
const dollerFont = require("./src/fonts/doller.json");
const hashFont = require("./src/fonts/hashfont.json");
const percentFont = require("./src/fonts/percent.json");
const rupeeFont = require("./src/fonts/rupee.json");
const signFont = require("./src/fonts/signFont.json");
const starFont = require("./src/fonts/starFont.json");
const navbarFont = require("./src/fonts/navbar.json"); // NEW FONT ADDED

const { generateArt: generateArts } = require("./src/textToAscii");
const { convertImageToAscii } = require("./src/imageToAscii");

function generateArt(text, font = defaultFont) {
  if (!text) throw new Error("Text is required to generate ASCII art!");

  const lines = Array.from({ length: font.height }, () => "");

  for (const char of text.toUpperCase()) {
    const charData = font.chars[char] || font.chars["?"];

    charData.forEach((line, index) => {
      lines[index] += line + " "; 
    });
  }

  return lines.join("\n");
}

function listFonts() {
  return ["default", "another", "rupee", "percent", "atsign", "star", "doller", "hash", "navbar"];
}

function getFont(fontName) {
  switch (fontName?.toLowerCase()) {
    case "default": return defaultFont;
    case "another": return anotherFont;
    case "rupee": return rupeeFont;
    case "percent": return percentFont;
    case "atsign": return signFont;
    case "star": return starFont;
    case "doller": return dollerFont;
    case "hash": return hashFont;
    case "navbar": return navbarFont; // NEW FONT ADDED
    default:
      throw new Error(`Font "${fontName}" is not available. Use listFonts() to see available fonts.`);
  }
}

module.exports = {
  generateArt,
  listFonts,
  getFont,
  generateArts,
  convertImageToAscii
};