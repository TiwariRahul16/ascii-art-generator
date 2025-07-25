# ASCII Art Generator

[![NPM Version](https://img.shields.io/npm/v/ascii-art-generator?style=flat-square)](https://www.npmjs.com/package/ascii-art-generator)
[![Downloads](https://img.shields.io/npm/dt/ascii-art-generator?style=flat-square)](https://www.npmjs.com/package/ascii-art-generator)
[![License: MIT](https://img.shields.io/npm/l/ascii-art-generator?style=flat-square)](./LICENSE)


**ASCII Art Generator** is a lightweight npm package that converts plain text and image into beautiful ASCII art using customizable fonts and image into ascii art.

---

## Features

- Generate ASCII art from text.
- Generate ASCII art from image.
- Support for multiple fonts.
- Graceful handling of unsupported characters.
- Extendable to add custom fonts.

---

## Installation

To install the package, run the following command:

```bash
npm install ascii-art-generator
```
## Usage

You can import the necessary functions from the package as shown below:

```bash
const { generateArt, convertImageToAscii } = require("ascii-art-generator");
```
## Generating ASCII Art of text

To generate ASCII art from a string of text using the default font:

```bash
const { generateArt} = require('ascii-art-generator');

// Text conversion

const art = generateArt(text, font);
console.log(art);
```
## Generating ASCII Art of image
 
To generate ASCII art of a image using local upload or link of image:

```bash
const { convertImageToAscii} = require('ascii-art-generator');

// Image conversion

const asciiImage = await convertImageToAscii(imagePath, 100);
console.log(asciiImage);
```

## Listing Available Fonts

You can list all available fonts in the package:

```bash
const fonts = listFonts();
console.log(fonts); // Output: ['default', 'dollar','hash','sign','star','rupee','percent']
```
## Using a Different Font

You can also use a different font for generating ASCII art:

```bash
const { generateArt} = require('ascii-art-generator');

// Text conversion

// const art = generateArt(text, font_name);
const art = generateArt(hello, dollar);
console.log(art);
```

## How to use in node.js app with ejs

### Backend in express
```bash
const express = require("express");
const {generateArt, convertImageToAscii } = require("asciiart");
const path = require("path");
const app = express();

// Serve static files (e.g., images) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Set view engine for dynamic HTML
app.set("views", path.join(__dirname, "views")); // Specify the folder containing templates
app.set("view engine", "ejs"); // Use EJS as the templating engine


// Route for the home page
app.get("/", async (req, res) => {
  try {
    // Convert the image to ASCII
    const imagePath = path.join(__dirname, "images", "img.jpg");
    const asciiArt = await convertImageToAscii(imagePath,100);
    const textArt = await generateArt("Hello");

    // Render the ASCII art in the browser
    res.render("index", { asciiArt,textArt });
  } catch (error) {
    res.status(500).send(`Error generating ASCII art: ${error.message}`);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

```

### Frontend using index.ejs

```bash
// views/index.ejs


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ASCII Art Viewer</title>
  <style>
    body {
      margin: 0;
      padding: 2rem;
      font-family: monospace;
      background: #f2f2f2;
      color: #000;
      text-align: center;
    }

    h1 {
      margin-bottom: 2rem;
    }

    .ascii-text {
      margin-top: 2rem;
      white-space: pre;
      font-size: 10px;
      line-height: 10px;
    }
  </style>
  <style>
  .ascii-profile {
    display: inline-block;
    font-family: monospace;
    font-size: 2px;     
   /* manage image using font-size and line-height like contain and cover we use in image*/
    line-height: 2px;
    width: 100px;
    height: 100px;
    color: #000;
    background-color: #fff;
    overflow: hidden;
    border-radius: 50%;
  }

  .ascii-profile pre {
    margin: 0;
  }
</style>

</head>
<body>
  <h1>ASCII Profile Pic</h1>

  <div class="ascii-profile">
    <pre><%= asciiArt %></pre>
  </div>

  <div class="ascii-text">
    <pre><%= textArt %></pre>
  </div>
</body>
</html>
```

## How to use in React with backend in express

### backend in express

```bash
// server.js

const express = require("express");
const {generateArt,convertImageToAscii} = require("ascii-art-generator");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// Route: Get ASCII text (with optional font)
app.get("/api/text", (req, res) => {
  const text = "Hello";
  const fontName = " rupee";

  try {
    const font = getFont(fontName); // Load the correct font
    const art = generateArt(text, font); // Generate ASCII art
    res.json({ art });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Get ASCII image
app.get("/api/image", async (req, res) => {
  try {
    const ascii = await convertImageToAscii(imagePath, 100); // Default width = 100
    res.json({ ascii });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`ASCII API is running at http://localhost:${PORT}`);
});


```
 #### Frontend in React

```bash
// app.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [asciiImage, setAsciiImage] = useState("");
  const [asciiText, setAsciiText] = useState("");

  useEffect(() => {
    // Fetch ASCII art
    axios.get("http://localhost:5000/api/image").then((res) => {
      setAsciiImage(res.data.ascii);
    });

    axios.get("http://localhost:5000/api/text?text=HELLO").then((res) => {
      setAsciiText(res.data.art);
    });
  }, []);

  return (
    <div className="App">
      <h1>ASCII Profile Viewer</h1>
      <div className="ascii-profile">
        <pre>{asciiImage}</pre>
      </div>
      <div className="ascii-text">
        <pre>{asciiText}</pre>
      </div>
    </div>
  );
}

export default App;

```


## How to use in next.js

#### First install dependency in nextjs root folder
```bash
npm install sharp
```
 #### Second step use this in next.config
 ```bash
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('sharp'); // prevent bundling native module
    }
    return config;
  },
  experimental: {
    serverActions: true, // optional, if you're using server actions
  },
};

export default nextConfig;

 ```

#### How to write api..
```bash
// api/ascii/route.js

export const runtime = 'nodejs'; // 👈 Required 

import { generateArt, convertImageToAscii } from "ascii-art-generator";


export async function GET() {

  const nameAscii = generateArt("Rahul");

  const imageAscii = await convertImageToAscii(imagePath, 50);
}
```

 #### Complete api.

```bash
export const runtime = 'nodejs'; // 👈 Required 

import { generateArt, convertImageToAscii } from "ascii-art-generator";
import path from "path";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET() {
  const nameAscii = generateArt("Hello");

  const imagePath = path.join(process.cwd(), "public", "img.jpg");

  try {
    // Ensure file exists
    await fs.access(imagePath);

    const imageAscii = await convertImageToAscii(imagePath, 50);

    return NextResponse.json({
      name: nameAscii,
      image: imageAscii,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load image or convert to ASCII." },
      { status: 500 }
    );
  }
}

```
 #### How to display in browser by fatching api.

```bash
// page.js

"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [asciiText, setAsciiText] = useState("");
  const [asciiImage, setAsciiImage] = useState("");

  useEffect(() => {
    fetch("/api/ascii")
      .then((res) => res.json())
      .then((data) => {
        setAsciiText(data.name);
        setAsciiImage(data.image);
      });
  }, []);

  return (
    <div className="min-h-screen p-8 font-mono bg-white text-black">
      <h1 className="text-xl mb-6 text-white">ASCII Art Profile Preview</h1>

      <pre className="whitespace-pre-wrap text-sm mb-10">
        {asciiText || "Loading ASCII text..."}
      </pre>

      <pre className="whitespace-pre-wrap text-[6px] leading-[6px]">
        {asciiImage || "Loading ASCII image..."}
      </pre>
    </div>
  );
}

```
## API Documentation

```**generateArt(text: string, font: FontObject): string**```

Generates ASCII art from the provided text using the specified font.

- Parameters:
  - text (string): The text to convert into ASCII art.
  - font (object): The font object containing character definitions and height.
- Returns:
   - A string representing the ASCII art.

```listFonts(): string[]```

Lists all available fonts.

- Returns:
   - An array of font names (e.g., ["default", "another","rupee", "percent", "atsign", "star", "doller", "hash"]).

```getFont(fontName: string): FontObject```

Retrieves the font object by its name.

- Parameters:
  - **fontName (string)**: The name of the font.
- Returns:
   - The corresponding font object.

```**ConvertImageToAscii(image_path,100)**```
``` // 100 default width ```

Generates ASCII art from the provided image.

- Parameters:
  - image_path (string): The image to convert into ASCII art.
  - width: The width object to maintain character size.
- Returns:
   - A string representing the ASCII art.

```bash
npm install ascii-art-generator
```
## Fonts

The package includes the following fonts by default:

- default
- another
- rupee 
- percent 
- atsign 
- star 
- doller
- hash

```Note : In fonts another and atsisn are same font ```

You can add your own fonts by creating JSON files with character definitions. Each font file should have the following structure:

```bash
  "A": [
    "  A  ",
    " A A ",
    "AAAAA",
    "A   A",
    "A   A"
  ],
  .............

```
```bash
      "A": [
        "  @@@   ",
        " @   @  ",
        "@ @@@ @ ",
        "@     @ ",
        "@     @ "
      ],
  .............

```
```bash
      "A": [
        "  ₹₹₹  ",
        " ₹   ₹ ",
        "₹ ₹₹₹ ₹",
        "₹     ₹",
        "₹     ₹"
      ],
  .............

```
```bash
      "A": [
        "  %%%  ",
        " %   % ",
        "% %%% %",
        "%     %",
        "%     %"
      ],
  .............

```
```bash
    "A": [
      "  ***  ",
      " *   * ",
      "* *** *",
      "*     *",
      "*     *"
    ],
  .............

```
```bash
      "A": [
        "  $$$  ",
        " $   $ ",
        "$ $$$ $",
        "$     $",
        "$     $"
      ],
  .............

```
```bash
      "A": [
        "  ###  ",
        " #   # ",
        "# ### #",
        "#     #",
        "#     #"
      ],
  .............

```
## Error Handling

The package throws informative errors for:

- **Missing text input**: If no text is provided to generateArt(), it will throw an error.
- **Missing image input**: If no text is provided to generateArt(), it will throw an error.
- **Unsupported fonts**: If an unsupported font is used, it will throw an error.
- **Invalid font names**: If you pass a font name that does not exist, it will throw an error.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: git checkout -b feature/your-feature-name.
3. Commit your changes: git commit -m 'Add a new feature'.
4. Push to the branch: git push origin feature/your-feature-name.
5. Submit a pull request.

## License

This project is licensed under the MIT License.

## Feedback and Support

If you encounter any issues or have suggestions, feel free to open an issue on the GitHub repository or contact me at rahultiwari9168@gmail.com.

## Acknowledgments

Thanks to all contributors and users for your support!

```bash

### Notes:

- `https://github.com/TiwariRahul16/ascii-art-generator` 

- `rahultiwari9168@gmail.com`

## License

-This project is licensed under the [MIT License](./LICENSE). You are free to use, modify, and distribute this software in accordance with the terms of the license.

```
