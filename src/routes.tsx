import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import MainLayout from "./layout/MainLayout";
import Base from "./pages/Home/base";

// Define the root route with MainLayout
export const rootRoute = createRootRoute({
  component: MainLayout,
});

// Define child routes
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Base,
});

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => <div className="p-4">Dashboard Page</div>,
});

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => <div className="p-4">Profile Page</div>,
});

// Define the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  profileRoute,
]);

// Create and export the router
export const router = createRouter({
  routeTree,
});

// Register the router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
