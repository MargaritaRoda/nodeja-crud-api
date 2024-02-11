import { ServerResponse } from "node:http";

export const badRequestResponse = (res: ServerResponse, message: string) => {
  res.statusCode = 400;
  res.setHeader("Content-Type", "Application/json");
  res.write(
    JSON.stringify({
      message,
    })
  );
  res.end();
};

export const notFoundRequestResponse = (
  res: ServerResponse,
  message: string
) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "Application/json");
  res.write({ message });
  res.end();
};
export const requestWasSucceed = (
  res: ServerResponse,
  data: unknown,
  statusCode = 200
) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(data));
  res.end();
};
