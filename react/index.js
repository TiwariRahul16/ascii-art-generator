// react/index.js
const React = require('react');
const { useEffect, useState, useMemo } = React;
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

function AsciiImage({ src, width = 80, color = "#000", style = {}, className = "" }) {
  const [art, setArt] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;
    setError(false);
    convertImageToAsciiBrowser(src, width)
      .then(setArt)
      .catch((err) => {
        console.error("AsciiImage Error:", err);
        setError(true);
      });
  }, [src, width]);

  if (error) {
    return React.createElement('div', { style: { color: 'red', fontSize: '10px' } }, "Failed to load ASCII image");
  }

  return React.createElement('div', {
    className: className,
    style: {
      fontFamily: 'monospace',
      whiteSpace: 'pre',
      fontWeight: 'bold', // <--- ADD THIS
      lineHeight: '1',        // FIXED: Back to 1 to work perfectly with canvas 0.55 height ratio
      letterSpacing: '0',
      fontSize: '4px',
      color: color,
      overflow: 'hidden',
      display: 'inline-block',
      ...style
    }
  }, art);
}

// Add this inside react/index.js (replacing the old AsciiText function)

function AsciiText({ 
  text, 
  font = "default", 
  color = "#000", 
  variant = "normal", 
  letterSpacing = " ", 
  style = {}, 
  className = "" 
}) {
  const art = useMemo(() => {
    if (!text) return "";
    try {
      const fontObj = getFont(font);
      return generateArt(text, fontObj, letterSpacing);
    } catch (err) {
      console.error("AsciiText Error:", err);
      return "Font not found";
    }
  }, [text, font, letterSpacing]);

  let designStyles = { color: color };

  if (variant === "gradient") {
    designStyles = {
      backgroundImage: `linear-gradient(45deg, ${color}, #ff0080)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent"
    };
  } else if (variant === "glow") {
    designStyles = {
      color: color,
      textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}`
    };
  }

  return React.createElement('div', {
    className: className,
    style: {
      fontFamily: 'monospace',
      whiteSpace: 'pre',
      lineHeight: '1',     // FIXED: Changed to 1 so the pixel blocks connect!
      fontSize: '10px',
      display: 'inline-block',
      ...designStyles,
      ...style
    }
  }, art);
}

module.exports = { AsciiImage, AsciiText };