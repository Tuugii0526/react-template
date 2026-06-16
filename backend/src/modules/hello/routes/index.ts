import { OpenAPIHono } from "@hono/zod-openapi";
import getAll from "./getAll";
import getByName from "./getByName";

const route = new OpenAPIHono().route("/", getAll).route("/", getByName);

export default route;
