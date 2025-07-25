const path = require("path");
const { generateArt, convertImageToAscii, listFonts, getFont } = require("../index");

(async () => {
  const text = "HELLO";
  const fonts = listFonts();

  console.log("=== ASCII Art for Text with Different Fonts ===\n");

  fonts.forEach((fontName) => {
    try {
      const font = getFont(fontName);
      const art = generateArt(text, font);
      console.log(`--- Font: ${fontName} ---\n${art}\n`);
    } catch (err) {
      console.error(`Error using font "${fontName}":`, err.message);
    }
  });

  console.log("=== ASCII Art for Image ===");
  const imagePath = path.join(__dirname, "img.jpg");

  try {
    const asciiImage = await convertImageToAscii(imagePath, 100);
    console.log(asciiImage);
  } catch (err) {
    console.error("Image ASCII Art Error:", err.message);
  }
})();
