import { z } from "zod";

const Env = z.object({
	PORT: z
		.string()
		.regex(/^\d+$/, "Port must be a numeric string")
		.default("3000")
		.transform(Number),
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
});

const result = Env.safeParse(process.env);
if (!result.success) {
	console.error(
		"Invalid environment configuration. The following variables are missing or invalid:",
	);
	for (const issue of result.error.issues) {
		console.error(`  - ${issue.path.join(".") || "(root)"}: ${issue.message}`);
	}
	process.exit(1);
}

export const env = result.data;
