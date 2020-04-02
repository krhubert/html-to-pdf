'use strict';

const chromium = require('chrome-aws-lambda');

async function topdf(event) {
  let body = JSON.parse(event.body);
  if (!body.html) {
    return httpret(400, { error: 'missing html' })
  }

  let result = null;
  let browser = null;

  try {
    let browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    let page = await browser.newPage();
    await page.setContent(body.html);
    await page.evaluateHandle('document.fonts.ready');

    result = await page.pdf({ format: 'A4' });

  } catch (err) {
    return httpret(500, { error: 'cannot run puppeteer: ' + err })
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
  return httpret(200, { pdf: result.toString('base64') })
}

function httpret(code, body) {
  return {
    statusCode: code,
    body: JSON.stringify(body),
  };
}

module.exports.topdf = topdf;
