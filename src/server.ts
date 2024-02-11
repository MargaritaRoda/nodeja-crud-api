import * as http from "node:http";
import { IncomingMessage } from "node:http";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  addNewUser,
  updateUserProperty,
} from "./controllers/usersController";
import { ServerResponse } from "http";
import * as dotenv from "dotenv";

dotenv.config();
process.env.PORT = process.env.PORT || "8080";
// re = regular expression
const routes = [
  { re: /^\/api\/users$/, method: "GET", handler: getAllUsers },
  { re: /^\/api\/users$/, method: "POST", handler: addNewUser },
  {
    re: /^\/api\/users\/(?<user_id>\w+)$/,
    method: "GET",
    handler: getUserById,
  },
  {
    re: /^\/api\/users\/(?<user_id>\w+)$/,
    method: "PUT",
    handler: updateUserProperty,
  },
  {
    re: /^\/api\/users\/(?<user_id>\w+)$/,
    method: "DELETE",
    handler: deleteUserById,
  },
];

const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    for (const { re, method, handler } of routes) {
      if (req.method !== method) {
        continue;
      }
      const match = re.exec(req.url || "");
      if (match) {
        try {
          return await handler(req, res, match.groups || {});
        } catch (err) {
          console.log(err);
          let message_1 = "internal error";
          if (err instanceof Error) {
            message_1 = err.message;
          }
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/json");
          res.write(
            JSON.stringify({
              message: "Internal Server Error",
            })
          );
          res.end();
        }
      }
    }
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/json");
    res.write(
      JSON.stringify({
        message: "endpoint does not exist",
      })
    );
    res.end();
  }
);
//const HOST = 'localhost'
server.listen(process.env.PORT, () => {
  console.log(
    `The server start listening the port ${process.env.PORT} and running in ${process.env.NODE_ENV} mode`
  );
});
