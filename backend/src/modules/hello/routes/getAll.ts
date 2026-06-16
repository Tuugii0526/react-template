import { OpenApiTags } from "@api/constants";
import { createRouteWithDefaults } from "@api/utils/hono/openapi/createRoute";
import { OpenAPIHono, z } from "@hono/zod-openapi";

const openAPIDefinition = createRouteWithDefaults({
	path: "/",
	method: "get",
	summary: "returns a hello message",
	responses: {
		200: {
			description: "Hello message",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
						method: z.string(),
					}),
				},
			},
		},
	},
	tags: [OpenApiTags.HELLO],
});

const route = new OpenAPIHono().openapi(openAPIDefinition, (c) => {
	return c.json({ message: "Hello, world!", method: "GET" }, 200);
});

export default route;
