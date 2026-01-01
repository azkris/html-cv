# HTML CV Template

A print-first, single-source-of-truth CV generator that produces multiple A4-accurate HTML and PDF versions (color, black & white, single column ATS-friendly) from structured data.

View different versions here:
- Color: https://azkris.github.io/html-cv/  
- BW: https://azkris.github.io/html-cv/index-bw.html  
- ATS: https://azkris.github.io/html-cv/index-bw-ats.html  

Designed for developers who want full control over layout, typography, and export quality.

## Usage

1. Clone or download this repository
  
2. Install dependencies with __NodeJS__ (`v24.11.1` or higher) and __NPM__ (`11.6.2` or higher)

   ```bash
   npm install  
   npx playwright install chromium
   ```

3. Edit CV contents

   - Update `content.json` with your data,
   - (optional) edit template files.

4. Generate HTML and PDFs  
   `node render.js`

5. Output files  
   HTML: index.html, index-bw.html, index-bw-ats.html  
   PDF: cv-color.pdf, cv-bw.pdf, cv-bw-ats.pdf
