import type { InferResponseType } from "@api/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import api from "@/lib/api";

type Hello = InferResponseType<typeof api.hello.$get>;

export const Route = createFileRoute("/hello")({
	component: HelloRoute,
});

function HelloRoute() {
	// Demonstrates TanStack Query fetching the Hono API through the type-safe
	// RPC client (proxied via Vite /api in dev).
	const { data, isPending, error } = useQuery({
		queryKey: ["hello"],
		queryFn: async (): Promise<Hello> => {
			const res = await api.hello.$get();
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
