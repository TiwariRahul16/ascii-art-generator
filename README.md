# ASCII Art Generator

[![NPM Version](https://img.shields.io/npm/v/ascii-art-generator?style=flat-square)](https://www.npmjs.com/package/ascii-art-generator)
[![Downloads](https://img.shields.io/npm/dt/ascii-art-generator?style=flat-square)](https://www.npmjs.com/package/ascii-art-generator)
[![License: MIT](https://img.shields.io/npm/l/ascii-art-generator?style=flat-square)](./LICENSE)

# ASCII Art Generator 🎨

**ASCII Art Generator** is a powerful, lightweight npm package that converts plain text and images into beautiful, customizable ASCII art. 

**🎉 NEW IN VERSION 2.0.0:** Full **React** and **Browser** support! You can now generate image-to-ASCII art directly on the client-side using HTML5 Canvas—**zero backend required!** We also added new text design variants (Gradient & Glow) and a sleek new `navbar` font.

---

## ✨ Features

- **React & Next.js Components:** Plug-and-play `<AsciiImage />` and `<AsciiText />`.
- **Browser Native:** Process images instantly on the client side. No `sharp` or backend API needed!
- **High-Quality Facial Recognition:** Advanced adaptive contrast and gamma correction ensure human faces look crisp, even at small resolutions (perfect for profile pictures).
- **Advanced Text Designs:** Support for custom letter spacing, CSS gradients, and cyberpunk neon glows.
- **Node.js Backend Support:** Still includes the classic high-performance Node.js logic using `sharp`.
- **Multiple Custom Fonts:** Includes block-fonts, classic terminal fonts, and currency-styled fonts.

---

## 📦 Installation

```bash
npm install ascii-art-generator
```
(Note: sharp is still installed for backend users, but the browser and React exports will automatically bypass it to prevent bundling errors).

---
## Usage
You can import the necessary functions from the package as shown below:

```bash
import { AsciiText, AsciiImage } from "ascii-art-generator/react";
```
---
## Generating ASCII Art of text

To generate ASCII art from a string of text using the any font:

```bash
//just import and use.

import { AsciiText} from "ascii-art-generator/react";

// Text conversion
  
      <AsciiText 
        text="PRO" 
        font="rupee" 
        color="#0070f3" 
        variant="gradient"
        letterSpacing="" 
      />
```

---
## Generating ASCII Art of image
 
To generate ASCII art of a image using local upload or link of image:

```bash
//just import and use.

import {AsciiImage } from "ascii-art-generator/react";

// Image conversion

      <AsciiImage 
        src="https://avatars.githubusercontent.com/u/9919?v=4" 
        width={100} 
        color="#333"
        style={{ borderRadius: "50%" }}
      />
```
## 1. Usage: React & Next.js (Modern Frontend)

(Note for Next.js App Router users: Ensure you add "use client" at the top of your file since this uses the browser Canvas).


```bash
"use client";
import { AsciiText, AsciiImage } from "ascii-art-generator/react";

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      
      {/* 1. Profile Picture (Image to ASCII) */}
      <AsciiImage 
        src="https://avatars.githubusercontent.com/u/9919?v=4" 
        width={100} 
        color="#333"
        style={{ borderRadius: "50%" }}
      />
      
      {/* 2. Cyberpunk Neon Username */}
      <AsciiText 
        text="HACKER" 
        font="navbar" 
        color="#00ff00" 
        variant="glow" 
      />
      
      {/* 3. Gradient Text with custom spacing */}
      <AsciiText 
        text="PRO" 
        font="rupee" 
        color="#0070f3" 
        variant="gradient"
        letterSpacing="" 
      />
      
    </div>
  );
};
```
---
## 2. Usage: Vanilla JavaScript & HTML

If you are using Vite, Webpack, or plain HTML/JS, you can render ASCII art directly into any DOM element.

```bash
// In html file like index.html

<div id="profile-pic" style="border-radius: 50%; border: 2px solid black;"></div>
<div id="username"></div>

//In javascript file like main.js without script tag

<script type="module">
  import { renderAsciiImage, renderAsciiText } from "ascii-art-generator/browser";

  // Replaces the element with ASCII Image Art
  renderAsciiImage({
    elementId: "profile-pic",
    src: "https://your-image-url.com/photo.jpg",
    width: 100,
    color: "#000"
  });

  // Replaces the element with ASCII Text Art
  renderAsciiText({
    elementId: "username",
    text: "Rahul",
    font: "navbar",
    color: "#ff0080"
  });
</script>
```

---
## 3. Usage: Node.js (Classic Backend / CLI)

If you are using Node.js on a server, you can import the core functions to generate ASCII strings directly in the terminal or your backend.

```bash
const { generateArt, convertImageToAscii, listFonts } = require("ascii-art-generator");

async function run() {
  // 1. Generate Text (Optional 3rd parameter for letter spacing)
  const textArt = generateArt("HELLO", "star", "  ");
  console.log(textArt);

  // 2. Generate Image (Requires local path or URL)
  const imageArt = await convertImageToAscii("./local-photo.jpg", 100);
  console.log(imageArt);
  
  // 3. List available fonts
  console.log(listFonts()); 
}

run();
```

---

# ⚙️ Advanced Backend Guides (Express & Next.js Server)

---

<details>
<summary><b>Click to expand: How to use with Express.js & EJS</b></summary>

### 📁 Backend (`server.js`)

```js
const express = require("express");
const { generateArt, convertImageToAscii } = require("ascii-art-generator");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const imagePath = path.join(__dirname, "public", "img.jpg");
    const asciiArt = await convertImageToAscii(imagePath, 100);
    const textArt = generateArt("Hello", "star");

    res.render("index", { asciiArt, textArt });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

### 🖥️ Frontend (`views/index.ejs`)

```html
<style>
  .ascii-profile {
    display: inline-block;
    font-family: monospace;
    font-size: 2px;
    line-height: 2px;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
  }
</style>

<div class="ascii-profile">
  <pre><%= asciiArt %></pre>
</div>

<pre><%= textArt %></pre>
```

</details>

---

<details>
<summary><b>Click to expand: How to use as a Next.js Server API Route</b></summary>

### ⚠️ Important: Update `next.config.js`

If your API route uses `sharp` internally, configure Webpack to externalize it:

```js
const nextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("sharp");
    }
    return config;
  },
};

export default nextConfig;
```

---

### 📁 API Route (`app/api/ascii/route.js`)

```js
export const runtime = "nodejs";

import { generateArt, convertImageToAscii } from "ascii-art-generator";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const nameAscii = generateArt("Hello");
  const imagePath = path.join(process.cwd(), "public", "img.jpg");

  try {
    const imageAscii = await convertImageToAscii(imagePath, 50);

    return NextResponse.json({
      name: nameAscii,
      image: imageAscii,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to convert" },
      { status: 500 }
    );
  }
}
```

</details>

---
## API Reference

### React Components (`ascii-art-generator/react`)

---

### `<AsciiImage />` Props

| Prop       | Type   | Default | Description |
|------------|--------|----------|-------------|
| `src`      | string | **Required** | The URL or base64 path of the image. |
| `width`    | number | `80` | The character width of the generated art. |
| `color`    | string | `"#000"` | The text color of the ASCII characters. |
| `style`    | object | `{}` | Standard React style object (e.g. `borderRadius`). |
| `className`| string | `""` | Optional CSS class. |

---

## `<AsciiText />` Props

| Prop            | Type   | Default     | Description |
|-----------------|--------|-------------|-------------|
| `text`          | string | **Required** | The string to convert to ASCII. |
| `font`          | string | `"default"` | The name of the font to use. |
| `variant`       | string | `"normal"`  | Design style: `"normal"`, `"gradient"`, or `"glow"`. |
| `letterSpacing` | string | `" "`       | Space added between characters. |

---
## 🔠 Available Text Fonts

You can pass these string values into the `font` prop:

| Font Name | Description |
|-----------|------------|
| `navbar` | **NEW!** Sleek 3-line block font perfect for UI elements |
| `default` | Classic 5-line terminal font |
| `rupee` | Constructed using ₹ symbols |
| `dollar` | Constructed using $ symbols |
| `percent` | Constructed using % symbols |
| `star` | Constructed using * symbols |
| `hash` | Constructed using # symbols |
| `atsign` | Constructed using @ symbols |
| `another` | Constructed using @ symbols |

---

```Note : In fonts another and atsign are same font ```

---

## 🚨 Error Handling

The package gracefully handles errors to prevent your application from crashing.

### 🖼️ Client-Side Image Failures

If an image URL strictly blocks CORS, the `<AsciiImage />` component will safely render:

```
Failed to load ASCII image
```

This prevents React from crashing and keeps your UI stable.

---

### 🧾 Missing Inputs

Node.js functions will throw informative errors if required parameters are missing.

Examples:

- No text provided to `generateArt()`
- No image path or URL provided to `convertImageToAscii()`

This ensures developers immediately understand what went wrong.

---

### 🔤 Invalid Fonts

If an unrecognized font string is passed:

- The package will either safely fall back to a default font  
**or**
- Throw a clear, descriptive error message

This prevents silent failures and makes debugging easy.

---
## 🤝 Contributing

Contributions are welcome and greatly appreciated!

### How to Contribute

1. **Fork** the repository  
2. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes**

   ```bash
   git commit -m "Add a new feature"
   ```

4. **Push to your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Submit a Pull Request**

---

### 💡 Guidelines

- Write clean, readable code
- Follow existing project structure
- Add comments where necessary
- Update documentation if your change affects usage
- Test your changes before submitting

Thank you for helping improve **ASCII Art Generator** 🎨

---

## License

This project is licensed under the MIT License.

---
## Feedback and Support

If you encounter any issues or have suggestions, feel free to open an issue on the GitHub repository or contact me at https://github.com/TiwariRahul16/

---
## Acknowledgments

Thanks to all contributors and users for your support!

### Notes:

- `https://github.com/TiwariRahul16/ascii-art-generator`

## License

- This project is licensed under the [MIT License](./LICENSE). You are free to use, modify, and distribute this software in accordance with the terms of the license.

---