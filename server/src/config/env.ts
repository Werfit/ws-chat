import dotenv from "dotenv";
dotenv.config();

import { getOsEnv } from "../utils/os-env";

const env = {
  server: {
    port: Number(getOsEnv("port")),
    corsOrigin: getOsEnv("corsOrigin"),
  },
} as const;

export { env };
