import * as dotenv from "dotenv";
dotenv.config();
import app from "./server";

app.listen(3000, () => console.log("server running on http://127.0.0.1:3000"));
