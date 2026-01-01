const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { chromium } = require("playwright");

const content = require("./content.json");

const versions = [
	{ template: "templates/color.ejs", html: "index.html", pdf: "cv-color.pdf" },
	{ template: "templates/bw.ejs", html: "index-bw.html", pdf: "cv-bw.pdf" },
	{
		template: "templates/ats.ejs",
		html: "index-bw-ats.html",
		pdf: "cv-bw-ats.pdf",
	},
];

(async () => {
	// 1. Render HTML files
	for (const v of versions) {
		const template = fs.readFileSync(v.template, "utf8");
		const html = ejs.render(template, { cv: content });
		fs.writeFileSync(v.html, html);
		console.log(`✓ HTML generated: ${v.html}`);
	}

	const A4_HEIGHT_PX = Math.ceil(21 * 96/2.54); // 21cm at 96 dpi (used by css)
	const A4_WIDTH_PX = Math.ceil(29.7 * 97/2.54); // 29.7cm at 96 dpi (used by css)

	async function validateLayout(page, versionName) {
		const result = await page.evaluate(() => {
			const pageEl = document.querySelector(".page");
			const pageRect = pageEl.getBoundingClientRect();

			const elements = Array.from(pageEl.querySelectorAll("*"));

			let overflowX = false;

			for (const el of elements) {
				const rect = el.getBoundingClientRect();

				if (
					rect.left < pageRect.left - 0.5 ||
					rect.right > pageRect.right + 0.5
				) {
					overflowX = true;
				}
			}

			return {
				overflowX,
			};
		});

		if (result.overflowX) {
			console.warn(
				`❌ ${versionName}: Horizontal overflow detected (content exceeds page width)`,
			);
		}
	}

	// 2. Export PDFs
	const browser = await chromium.launch();
	const page = await browser.newPage();

	for (const v of versions) {
		await page.goto(`file://${path.resolve(v.html)}`, {
			waitUntil: "networkidle",
		});

		await validateLayout(page, v.html);

		await page.pdf({
			path: v.pdf,
			format: "A4",
			printBackground: true,
			margin: {
				top: "0mm",
				right: "0mm",
				bottom: "0mm",
				left: "0mm",
			},
		});

		console.log(`✓ PDF exported: ${v.pdf}`);
	}

	await browser.close();
})();
