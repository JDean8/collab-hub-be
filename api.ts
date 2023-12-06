import { Response } from "express-serve-static-core";

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
