import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

import App from "./App";
const client = new QueryClient()
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={client}>
    <App />
    </QueryClientProvider>
  </StrictMode>
  
);
