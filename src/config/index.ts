import merge from "lodash.merge";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";

let envConfig: {
  port?: number;
  stage?: string;
  env?: string;
  secrets?: { JWt: string; dbUrl: string };
};

if (stage == "production") {
  envConfig = require("./prod").default;
} else if (stage == "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}
export default merge(
  {
    port: 3000,
    stage,
    env: process.env.NODE_ENV,
    secrets: {
      JWT: process.env.JWTSECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
);
