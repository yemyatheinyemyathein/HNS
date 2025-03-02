import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MantineProvider } from "@mantine/core";
import App from './App.tsx'
import "./i18n.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </StrictMode>,
)
