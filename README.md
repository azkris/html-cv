# HTML CV Template

A print-first, single-source-of-truth CV generator that produces multiple A4-accurate HTML and PDF versions (color, black & white, ATS-friendly) from structured data.

Designed for developers who want full control over layout, typography, and export quality.

## Usage

1. Clone the repository
   ```bash
   git clone <repo-url>
   cd html-cv-template
   ```
2. Install dependencies

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
