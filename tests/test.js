// src/tests/test.js
const path = require("path");
// Adjusted path to correctly point to the package root
const { generateArt, convertImageToAscii, listFonts, getFont } = require("../../index");

(async () => {
  const text = "HELLO";
  const fonts = listFonts();

  console.log("=== ASCII Art for Text with Different Fonts ===\n");

  // 1. Test all available fonts (This will automatically include the new 'navbar' font)
  fonts.forEach((fontName) => {
    try {
      const font = getFont(fontName);
      // Testing with the default 1-space letter spacing
      const art = generateArt(text, font);
      console.log(`--- Font: ${fontName} ---\n${art}\n`);
    } catch (err) {
      console.error(`Error using font "${fontName}":`, err.message);
    }
  });

  // 2. Test the new Custom Letter Spacing feature
  console.log("=== ASCII Art with Custom Letter Spacing ===\n");
  try {
    const navbarFont = getFont("navbar");
    
    // Test tight spacing (0 spaces)
    const tightArt = generateArt("HACKER", navbarFont, "");
    console.log(`--- Font: navbar (Tight Spacing) ---\n${tightArt}\n`);

    // Test wide spacing (4 spaces)
    const wideArt = generateArt("HACKER", navbarFont, "    ");
    console.log(`--- Font: navbar (Wide Spacing) ---\n${wideArt}\n`);
  } catch (err) {
    console.error("Error testing custom letter spacing:", err.message);
  }

  // 3. Test Image to ASCII Conversion
  console.log("=== ASCII Art for Image ===");
  // Assuming img.jpg is located in the same src/tests/ folder
  const imagePath = path.join(__dirname, "img.jpg");

  try {
    const asciiImage = await convertImageToAscii(imagePath, 100);
    console.log(asciiImage);
  } catch (err) {
    console.error("Image ASCII Art Error. Ensure 'img.jpg' exists in the tests folder:\n", err.message);
  }
})();