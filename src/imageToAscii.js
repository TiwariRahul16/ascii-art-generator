const sharp = require("sharp");

// Optimized ASCII characters sorted by visual density (dark to light)
const ASCII_CHARS = [
  "@", "#", "S", "%", "8", "B", "&", "W", "M", "Z", "0", "Q", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "z", "x", "c", "u", "v", "r", "j", "n", "t", "y", "L", "Y", "f", "i", "l", "I", "T", "1", "/", "|", "(", ")", "{", "}", "[", "]", "?", "-", "+", "~", "<", ">", "!", "=", ";", ":", "^", ",", ".", " "
];

/**
 * Converts an image to high-quality ASCII art.
 * @param {string} imagePath - Path to the input image.
 * @param {number} width - Desired width of the ASCII output.
 * @returns {Promise<string>} - ASCII art as a string.
 */
async function convertImageToAscii(imagePath, width = 100) {
  try {
    // Load the image and get metadata
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    const { height, width: originalWidth } = metadata;

    // Calculate aspect ratio correction for ASCII characters
    const aspectRatio = height / originalWidth;
    const adjustedHeight = Math.floor(width * aspectRatio * 0.55); // Adjust height for ASCII proportions

    // Resize and preprocess the image with edge detection and advanced preprocessing
    const resizedImage = await image
      .resize({ width, height: adjustedHeight, fit: "cover" }) // Ensure the entire image is preserved
      .greyscale() // Convert to grayscale
      .normalise() // Improve contrast
      .modulate({ brightness: 1.2 }) // Adjust brightness for better clarity
      .convolve({
        width: 3,
        height: 3,
        kernel: [
          -1, -1, -1,
          -1,  8, -1,
          -1, -1, -1
        ] // Edge detection kernel
      })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = resizedImage;
    const asciiArt = [];

    // Map each pixel's brightness to an ASCII character
    for (let i = 0; i < data.length; i++) {
      const pixelIntensity = data[i]; // Grayscale value (0-255)
      const charIndex = Math.floor((pixelIntensity / 255) * (ASCII_CHARS.length - 1));
      const char = ASCII_CHARS[charIndex];
      asciiArt.push(char);

      // Add a newline at the end of each row
      if ((i + 1) % info.width === 0) {
        asciiArt.push("\n");
      }
    }

    return asciiArt.join("");
  } catch (error) {
    throw new Error(`Failed to convert image to ASCII: ${error.message}`);
  }
}

module.exports = { convertImageToAscii };
