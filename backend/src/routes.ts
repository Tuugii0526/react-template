import helloRoutes from "@api/modules/hello/routes";
import { OpenAPIHono } from "@hono/zod-openapi";

const routes = new OpenAPIHono().basePath("/api").route("/hello", helloRoutes);

export default routes;
