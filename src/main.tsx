import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthForm from "./components/AuthForm.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import Dashboard from "./components/Dashboard.tsx";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error(
        `problem in query - queryKey: [${query.queryKey}] ${error.message}`,
      );
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error(`problem in mutation - ${error.message}`);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 3000,
      retry: 2,
    },
  },
});

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

const router = createBrowserRouter(
  [
    {
      element: <AuthProvider />,
      children: [
        {
          element: <PublicRoute />,
          children: [{ path: "/", element: <AuthForm /> }],
        },
        {
          element: <ProtectedRoute />,
          children: [{ path: "/dashboard", element: <Dashboard /> }],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
);
