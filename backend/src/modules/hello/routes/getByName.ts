import { OpenApiTags } from "@api/constants";
import { createRouteWithDefaults } from "@api/utils/hono/openapi/createRoute";
import { OpenAPIHono, z } from "@hono/zod-openapi";

const openAPIDefinition = createRouteWithDefaults({
	path: "/{name}",
	method: "get",
	summary: "returns a personalized hello message",
	request: {
		params: z.object({
			name: z.string().openapi({
				param: {
					name: "name",
					in: "path",
				},
				example: "world",
			}),
		}),
	},
	responses: {
		200: {
			description: "Personalized hello message",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
					}),
				},
			},
		},
	},
	tags: [OpenApiTags.HELLO],
});

const route = new OpenAPIHono().openapi(openAPIDefinition, (c) => {
	const { name } = c.req.valid("param");
	return c.json({ message: `Hello, ${name}!` }, 200);
});

export default route;
