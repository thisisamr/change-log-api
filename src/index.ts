import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./server";
app.listen(config.port, () =>
  console.log(`server running on http://127.0.0.1:${config.port}`)
);
