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

  return page;
}

async function associateDatasetMapStyleAsync(page, datasetId) {
  async function clickButtonWhenVisibleAsync(selector) {
    await page.waitForSelector(selector, { visible: true });
    await page.click(selector);
  }

  const url = `https://console.cloud.google.com/google/maps-apis/datasets/${datasetId}?project=bins-to-owners-332bc`;

  await page.goto(url);

  const previewButtonSelector = turnXPathToValidSelector(
    "//span[text()='Preview']"
  );
  await clickButtonWhenVisibleAsync(previewButtonSelector);

  setTimeout(() => {}, 1000);

  const addMapStyleButtonSelector = turnXPathToValidSelector(
    "//button[.//span[text()='Add Map Style']]"
  );
  await clickButtonWhenVisibleAsync(addMapStyleButtonSelector);

  const mapStyleCardSelector = "map-style-card";
  await clickButtonWhenVisibleAsync(mapStyleCardSelector);

  const saveButtonSelector = turnXPathToValidSelector(
    "//button[.//span[text()='Save']]"
  );
  await clickButtonWhenVisibleAsync(saveButtonSelector);

  return "Done!";
}

export { setUpBrowserAsync, associateDatasetMapStyleAsync };
