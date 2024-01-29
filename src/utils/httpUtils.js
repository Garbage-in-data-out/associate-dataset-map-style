async function httpPostAsync(req, res, functionalityExecutor) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Max-Age", "3600");

  if (req.method === "POST") {
    try {
      const result = await functionalityExecutor();
      res.status(200).send(JSON.stringify(result));
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
    return;
  }

  res.status(204).send("It needs to be POST!");
}

export { httpPostAsync };
