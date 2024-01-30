import puppeteer from "puppeteer";

function turnXPathToValidSelector(xpath) {
  return `::-p-xpath(${xpath})`;
}

async function setUpBrowserAsync() {
  async function setUpAuthenticationFormPartAsync(page, inputSelector, value) {
    // Type into input field
    await page.waitForSelector(inputSelector, { visible: true });
    await page.type(inputSelector, value);

    // Wait and click on first result
    const nextButtonSelector = turnXPathToValidSelector(
      "//button[.//span[text()='Next']]"
    );
    await Promise.all([
      page.waitForNavigation(),
      page.click(nextButtonSelector),
    ]);
  }

  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
  );

  await page.goto("https://accounts.google.com/", {
    waitUntil: "networkidle0",
  });

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

  return page;
}

async function associateDatasetMapStyleAsync(page, datasetId) {
  async function clickButtonWhenVisibleAsync(selector) {
    await page.waitForSelector(selector, { visible: true });
    await page.click(selector);
  }

  const url = `https://console.cloud.google.com/google/maps-apis/datasets/${datasetId}?project=bins-to-owners-332bc`;

  await page.goto(url, { waitUntil: "networkidle0" });

  const previewButtonSelector = turnXPathToValidSelector(
    "//span[text()='Preview']"
  );
  await clickButtonWhenVisibleAsync(previewButtonSelector);

  const addMapStyleButtonSelector =
    "button[data-test-id='add-associated-styles-button']";
  await clickButtonWhenVisibleAsync(addMapStyleButtonSelector);

  await page.waitForSelector("h1 ::-p-text(All map styles)");
  const mapStyleCardSelector = "map-style-card";
  await clickButtonWhenVisibleAsync(mapStyleCardSelector);

  const saveButtonSelector = "button[data-test-id='submit-associated-styles']";
  await clickButtonWhenVisibleAsync(saveButtonSelector);

  return "Done!";
}

export { setUpBrowserAsync, associateDatasetMapStyleAsync };
