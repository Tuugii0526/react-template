import createClient from "@api/lib/rpc";

// In development '/' is proxied to the backend server by the Vite proxy.
// In production the frontend is served from the backend server itself.
export default createClient("/").api;
