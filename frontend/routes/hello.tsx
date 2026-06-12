import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

type Hello = { message: string; method: string };

export const Route = createFileRoute("/hello")({
	component: HelloRoute,
});

function HelloRoute() {
	// Demonstrates TanStack Query fetching the Bun API (proxied via Vite /api).
	const { data, isPending, error } = useQuery({
		queryKey: ["hello"],
		queryFn: async (): Promise<Hello> => {
			const res = await fetch("/api/hello");
			if (!res.ok) {
				throw new Error(`Request failed: ${res.status}`);
			}
			return res.json();
		},
	});

	return (
		<div style={{ padding: 24 }}>
			<h2>TanStack Query demo</h2>
			{isPending && <p>Loading…</p>}
			{error && <p>Error: {error.message}</p>}
			{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
		</div>
	);
}
