// src/textToAscii.js
const defaultFont = require("./fonts/default.json");

/**
 * Generate ASCII art for the given text using the specified font.
 * * @param {string} text - The text to convert to ASCII art.
 * @param {object} font - The font object containing character mappings and height.
 * @param {string} letterSpacing - The space added between each character (default is 1 space).
 * @returns {string} - The ASCII art as a string.
 */
function generateArt(text, font = defaultFont, letterSpacing = " ") {
  if (!text) throw new Error("Text is required to generate ASCII art!");

  // Prepare lines for ASCII art based on font height
  const lines = Array.from({ length: font.height }, () => "");

  for (const char of text.toUpperCase()) {
    const charData = font.chars[char] || font.chars["?"]; 

    charData.forEach((line, index) => {
      // We use the customizable letterSpacing instead of a hardcoded " "
      lines[index] += line + letterSpacing; 
    });
  }

  return lines.join("\n"); 
}

module.exports = { generateArt };