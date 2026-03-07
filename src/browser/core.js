// src/browser/core.js

// A beautifully balanced 10-character map for smooth skin gradients
const ASCII_CHARS = ["@", "W", "#", "8", "*", "+", "-", ":", ".", " "];

function convertImageToAsciiBrowser(src, width = 80) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        const aspectRatio = img.height / img.width;
        const height = Math.floor(width * aspectRatio * 0.55);

        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // This can throw a SecurityError if the image source strictly blocks CORS
        const imgData = ctx.getImageData(0, 0, width, height).data;
        
        const totalPixels = width * height;
        const grayData = new Float32Array(totalPixels);
        
        // Step 1: Convert to Grayscale
        for (let i = 0; i < totalPixels; i++) {
          const r = imgData[i * 4];
          const g = imgData[i * 4 + 1];
          const b = imgData[i * 4 + 2];
          const a = imgData[i * 4 + 3];

          // If transparent, treat as pure white
          if (a === 0) {
            grayData[i] = 255; 
          } else {
            grayData[i] = (r * 0.299 + g * 0.587 + b * 0.114);
          }
        }

        // Step 2: Gentle Sharpening Convolution
        const sharpenedData = new Float32Array(totalPixels);
        let minBrightness = 255;
        let maxBrightness = 0;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = y * width + x;
            
            // Edge pixels bypass sharpening to prevent artifacts
            if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
              sharpenedData[idx] = grayData[idx];
            } else {
              // OPTIMIZATION: Faster array index lookups
              const top = grayData[idx - width];
              const bottom = grayData[idx + width];
              const left = grayData[idx - 1];
              const right = grayData[idx + 1];
              const center = grayData[idx];
              
              // Softened 4.5x multiplier to reduce "noise" on the skin
              let sharpenedPixel = (center * 4.5) - ((top + bottom + left + right) * 0.875);
              
              sharpenedData[idx] = Math.max(0, Math.min(255, sharpenedPixel));
            }

            // Track min and max for accurate normalization
            const val = sharpenedData[idx];
            if (val < minBrightness) minBrightness = val;
            if (val > maxBrightness) maxBrightness = val;
          }
        }

        // Prevent division by zero on solid color images
        if (maxBrightness === minBrightness) {
          minBrightness = 0; 
          maxBrightness = 255;
        }

        // Step 3: Normalize, Apply GAMMA, and Map to ASCII
        let ascii = "";
        const GAMMA = 1.4; // Sweet spot for human faces
        const numChars = ASCII_CHARS.length;
        const brightnessRange = maxBrightness - minBrightness;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const pixel = sharpenedData[y * width + x];
            
            // Normalize to a 0.0 to 1.0 scale
            let normalized = (pixel - minBrightness) / brightnessRange;
            
            // Apply Gamma Correction Curve to enhance facial shadows
            normalized = Math.pow(normalized, GAMMA);
            
            // FIX: Perfect uniform distribution across the array buckets
            let charIndex = Math.floor(normalized * numChars);
            
            // Safety check in case normalized is exactly 1.0
            if (charIndex >= numChars) {
              charIndex = numChars - 1;
            }
            
            ascii += ASCII_CHARS[charIndex];
          }
          ascii += "\n";
        }
        resolve(ascii);

      } catch (err) {
        reject(new Error("Failed to process image data. This is likely due to strict CORS policies on the image URL."));
      }
    };
    
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

module.exports = { convertImageToAsciiBrowser };