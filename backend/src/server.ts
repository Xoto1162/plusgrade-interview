import http from "http";
import app from "./app";
import "reflect-metadata";

const port = process.env.PORT || 3001;

const server = http.createServer(app.instance);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
