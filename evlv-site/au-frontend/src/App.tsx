import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import ScrollToTop from "@/components/base/ScrollToTop";
import { useEffect, useState } from "react";
import { hydrateShopProducts } from "@/lib/liveCatalog";


function App() {
  const [catalogReady, setCatalogReady] = useState(false);

  useEffect(() => {
    hydrateShopProducts().finally(() => setCatalogReady(true));
  }, []);

  if (!catalogReady) {
    return (
      <div className="min-h-screen bg-background-50 text-foreground-950 grid place-items-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-primary-200 border-t-primary-700" />
          <p className="mt-4 text-sm text-foreground-500">Loading the Australian catalogue…</p>
        </div>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
