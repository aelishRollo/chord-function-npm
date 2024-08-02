
<img src="https://i.imgur.com/MHsfol1.jpg" width="100%">
<p align="center">
  <a href="https://rollison.dev" target="_blank">
    <img src="https://img.shields.io/static/v1?label=|&message=WEBSITE&color=23555f&style=plastic&logo=react&logo-color=white"/>
  </a>
  <a href="https://www.linkedin.com/in/alec-rollison-dev" target="_blank">
    <img src="https://img.shields.io/static/v1?label=|&message=LINKED-IN&color=cdf998&style=plastic&logo=linkedin&logo-color=white"/>
  </a>
  <a href="https://x.com/RollisonDev" target="_blank">
    <img src="https://img.shields.io/static/v1?label=|&message=TWITTER&color=23555f&style=plastic&logo=twitter&logo-color=white"/>
  </a>
</p>
I've loved solving complex problems since I was a child. This love grew through my studies in Electrical Engineering, and now, as a full-stack developer, I enjoy creating and maintaining intuitive applications for music composition software.

See my website for more information!

<h1 align="center">Chord Function Calculator (NPM Package)</h1>

Chord Function Calculator is a powerful and intuitive npm package designed for musicians, composers, and developers working with music theory. This package enables users to effortlessly determine the chord function based on the key center, chord root, and chord quality.

<h2>Key Features</h2>
<ul>
  <li><strong>Accurate Chord Function Calculation</strong>: Determine the chord function from the key center, chord root, and chord quality.</li>
  <li><strong>Wide Compatibility</strong>: Supports various chord qualities, including Major, Minor, Augmented, Diminished, and extended chords like Major7 and Minor7.</li>
  <li><strong>Easy Integration</strong>: Seamlessly integrate into any JavaScript or Node.js project with a simple installation process.</li>
  <li><strong>Robust Testing</strong>: Developed with a test-driven approach to ensure reliability and stability.</li>
</ul>

<h2>Installation</h2>

```bash
npm install chord-function-calculator
```

<h2>Usage</h2>

1. **Import the package**:
   First, you need to import the `getChordFunctionFromName` function from the package in your JavaScript file.

   ```javascript
   const { getChordFunctionFromName } = require('chord-function-calculator');
   ```

2. **Use the function**:
   You can use the `getChordFunctionFromName` function by passing the key center, chord root, and chord quality as arguments.

   ```javascript
   const keyCenter = 'C';
   const chordRoot = 'G';
   const quality = 'Major7';

   const chordFunction = getChordFunctionFromName(keyCenter, chordRoot, quality);
   console.log(chordFunction); // Outputs: VIMajor7
   ```

3. **Example in a Node.js script**:
   Here is a full example of how to use the package in a Node.js script.

   ```javascript
   const { getChordFunctionFromName } = require('chord-function-calculator');

   const keyCenter = 'C';
   const chordRoot = 'G';
   const quality = 'Major7';

   const chordFunction = getChordFunctionFromName(keyCenter, chordRoot, quality);
   console.log(`The chord function for ${chordRoot}${quality} in the key of ${keyCenter} is: ${chordFunction}`);
   ```

<h2>Optimizations</h2>

I've implemented unit tests for chord calculations and input validation, integration tests for different inputs and error responses.

Next I will improve error messages to make them more descriptive. 

<h2>Lessons Learned</h2>

I saw firsthand the value of test-driven-development! It greatly increased my development velocity as well as my confidence in the stability of my code. 

I've also had fun contributing to the NPM universe. I love NPM and am so happy to make a package that others can use.

<h2 align="center">Connect</h2>
<p align="center">
  <a href="https://rollison.dev" target="_blank">
    <img src="https://img.shields.io/static/v1?label=|&message=WEBSITE&color=23555f&style=plastic&logo=react&logo-color=white"/>
  </a>
  <a href="https://www.linkedin.com/in/alec-rollison-dev" target="_blank">
    <img src="https://img.shields.io/static/v1?label=|&message=LINKED-IN&color=cdf998&style=plastic&logo=linkedin&logo-color=white"/>
  </a>
  <a href="https://x.com/RollisonDev" target="_blank">
    <img src="https://img.shields.io/static/v1?label=|&message=TWITTER&color=23555f&style=plastic&logo=twitter&logo-color=white"/>
  </a>
</p>
