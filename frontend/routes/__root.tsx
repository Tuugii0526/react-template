import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: () => <div style={{ padding: 24 }}>404 — Not found</div>,
});

function RootComponent() {
	return (
		<>
			<nav style={{ display: "flex", gap: 12, padding: 12 }}>
				<Link to="/">Home</Link>
				<Link to="/hello">Query demo</Link>
			</nav>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}
