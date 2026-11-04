import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig(({ command }) => ({
  define: { __BASE_PATH__: JSON.stringify(command === "build" ? "/" : "/") },
  plugins: [
    react(),
    AutoImport({
      imports: [
        {
          react: [
            ["default", "React"],
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
            "useCallback",
            "useMemo",
            "useRef",
            "useImperativeHandle",
            "useLayoutEffect",
            "useDebugValue",
            "useDeferredValue",
            "useId",
            "useInsertionEffect",
            "useSyncExternalStore",
            "useTransition",
            "startTransition",
            "lazy",
            "memo",
            "forwardRef",
            "createContext",
            "createElement",
            "cloneElement",
            "isValidElement",
          ],
        },
        {
          "react-router-dom": [
            "useNavigate",
            "useLocation",
            "useParams",
            "useSearchParams",
            "Link",
            "NavLink",
            "Navigate",
            "Outlet",
          ],
        },
        // React i18n
        {
          "react-i18next": ["useTranslation", "Trans"],
        },
      ],
      dts: true,
    }),
  ],
  base: command === "build" ? "/au-app/" : "/",
  build: {
    sourcemap: true,
    outDir: '../public/au-app',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3020,
    host: "127.0.0.1",
    proxy: {
      '/api': 'http://127.0.0.1:3010',
      '/images': 'http://127.0.0.1:3010',
      '/logo': 'http://127.0.0.1:3010',
    },
  },
}));
