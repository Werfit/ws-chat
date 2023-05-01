import http from "http";

import { Server } from "socket.io";

import { env } from "./src/config/env";
import { logger } from "./src/utils/logger";

import { run } from "./src/app";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: env.server.corsOrigin,
  },
});

run(io);

server.listen(env.server.port, () =>
  logger.info(`Server is running on port ${env.server.port}`)
);
