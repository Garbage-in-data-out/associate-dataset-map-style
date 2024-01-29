import puppeteer from "puppeteer";

async function setUpBrowserAsync() {
  async function setUpAuthenticationFormPartAsync(page, inputSelector, value) {
    // Type into input field
    await page.waitForSelector(inputSelector, { visible: true });
    await page.type(inputSelector, value);

    // Wait and click on first result
    const nextButtonXPath = "::-p-xpath(//button[.//span[text()='Next']])";
    await Promise.all([page.waitForNavigation(), page.click(nextButtonXPath)]);
  }

  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.setViewport({ width: 1080, height: 1024 });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
  );

  await page.goto("https://accounts.google.com/");

  await setUpAuthenticationFormPartAsync(
    page,
    "#identifierId",
    process.env.GOOGLE_USERNAME
  );

  await setUpAuthenticationFormPartAsync(
    page,
    "input[type=password]",
    process.env.GOOGLE_PASSWORD
  );

  return browser;
}

async function associateDatasetMapStyleAsync(page, datasetId) {
  return "Done!";
}

export { setUpBrowserAsync, associateDatasetMapStyleAsync };
