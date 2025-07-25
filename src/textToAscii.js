const defaultFont = require("./fonts/default.json");

function generateArt(text, font = defaultFont) {
  if (!text) throw new Error("Text is required to generate ASCII art!");

  // Prepare lines for ASCII art based on font height
  const lines = Array.from({ length: font.height }, () => "");

  for (const char of text.toUpperCase()) {
    const charData = font.chars[char] || font.chars["?"]; // Fallback to "?" for unsupported chars

    charData.forEach((line, index) => {
      lines[index] += line + " "; // Append ASCII art for each character
    });
  }

  return lines.join("\n"); // Combine all lines with newline
}

module.exports = { generateArt };
