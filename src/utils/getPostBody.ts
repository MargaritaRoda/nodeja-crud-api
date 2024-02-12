import { IncomingMessage } from "node:http";

export const getPostBody = (
  req: IncomingMessage
): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });
    req.on("error", (err) => {
      reject(err);
    });
    req.on("end", () => {
      const parsedBody = JSON.parse(body);
      if (typeof parsedBody === "object") {
        resolve(parsedBody);
        return;
      }
      reject(new Error("invalid body type"));
    });
  });
};
