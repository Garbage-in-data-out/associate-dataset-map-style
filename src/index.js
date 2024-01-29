import "dotenv/config";

// Libraries
import functions from "@google-cloud/functions-framework";

// Internal Imports
import { httpPostAsync } from "./utils/httpUtils.js";
import * as program from "./program.js";

/**
 * Responds to an HTTP request using data from the request body parsed according
 * to the "content-type" header.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
functions.http("associateDatasetMapStyle", async (req, res) => {
  const browser = await program.setUpBrowserAsync();

  const datasetId = req.body.datasetId;
  if (!datasetId) {
    res.status(400).send("Incorrect data! Dataset Id is invalid!");
  }

  await httpPostAsync(req, res, () =>
    program.associateDatasetMapStyleAsync(browser, datasetId)
  );
});
