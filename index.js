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

const { generateArts } = require("./src/textToAscii");
const { convertImageToAscii } = require("./src/imageToAscii");

/**
 * Generate ASCII art for the given text using the specified font.
 * 
 * @param {string} text - The text to convert to ASCII art.
 * @param {object} font - The font object containing character mappings and height.
 * @returns {string} - The ASCII art as a string.
 */
function generateArt(text, font = defaultFont) {
  if (!text) throw new Error("Text is required to generate ASCII art!");

  const lines = Array.from({ length: font.height }, () => ""); // Initialize empty lines

  for (const char of text.toUpperCase()) {
    const charData = font.chars[char] || font.chars["?"]; // Fallback to '?' if char is unsupported

    charData.forEach((line, index) => {
      lines[index] += line + " "; // Append each line of the character to the result
    });
  }

  return lines.join("\n"); // Combine all lines with newlines
}

/**
 * List available fonts in the package.
 * 
 * @returns {string[]} - An array of font names.
 */
function listFonts() {
  return ["default", "another","rupee", "percent", "atsign", "star", "doller", "hash"];
}

/**
 * Get a font by its name.
 * 
 * @param {string} fontName - The name of the font.
 * @returns {object} - The font object.
 */
function getFont(fontName) {
  switch (fontName.toLowerCase()) {
    case "default":
      return defaultFont;
    case "another":
      return anotherFont;
    case "rupee":
      return rupeeFont;
    case "percent":
      return percentFont;
    case "atsign":
      return signFont;
    case "star":
      return starFont;
    case "doller":
      return dollerFont;
    case "hash":
      return hashFont;
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
