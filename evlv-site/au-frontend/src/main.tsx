import { createRoot } from 'react-dom/client';
import './index.css';

const rootEl = document.getElementById('root');
let fatalShown = false;

/**
 * If anything fails before or during the first render, the app used to leave a
 * completely blank page behind, which is impossible to diagnose. This paints a
 * readable message into the page instead so the failure is visible.
 */
function showFatal(message: string) {
  if (!rootEl || fatalShown) return;
  fatalShown = true;

  rootEl.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className =
    'min-h-screen w-full flex items-center justify-center bg-background-50 px-6 py-16';

  const card = document.createElement('div');
  card.className =
    'w-full max-w-xl rounded-2xl border border-background-200 bg-background-100 p-8 text-center';

  const title = document.createElement('p');
  title.className = 'font-heading text-xl font-semibold text-foreground-950';
  title.textContent = 'This page could not load';

  const body = document.createElement('p');
  body.className = 'mt-3 text-sm leading-relaxed text-foreground-700';
  body.textContent =
    'Something went wrong while starting the page. The technical detail is below.';

  const detail = document.createElement('pre');
  detail.className =
    'mt-5 max-h-64 overflow-auto rounded-xl bg-background-50 p-4 text-left text-xs leading-relaxed text-foreground-800 whitespace-pre-wrap break-words';
  detail.textContent = message;

  const retry = document.createElement('button');
  retry.type = 'button';
  retry.className =
    'mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-secondary-950 cursor-pointer hover:bg-primary-400';
  retry.textContent = 'Reload the page';
  retry.addEventListener('click', () => window.location.reload());

  card.appendChild(title);
  card.appendChild(body);
  card.appendChild(detail);
  card.appendChild(retry);
  wrap.appendChild(card);
  rootEl.appendChild(wrap);
}

function describe(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }
  if (typeof error === 'string') return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

// Catches uncaught runtime errors (including React render failures) as well as
// failed dynamic imports. Resource loading errors are ignored on purpose.
window.addEventListener('error', (event) => {
  const target = event.target as unknown;
  if (target && target !== window) return;
  const errEvent = event as ErrorEvent;
  const message = errEvent.message || 'Unknown script error';
  if (message.toLowerCase().includes('resizeobserver loop')) return;
  showFatal(message);
});

window.addEventListener('unhandledrejection', (event) => {
  showFatal(describe(event.reason ?? 'Unhandled promise rejection'));
});

async function boot() {
  try {
    const [reactModule, appModule] = await Promise.all([
      import('react'),
      import('./App.tsx'),
    ]);
    await import('./i18n');

    if (!rootEl) {
      showFatal('The root element (#root) was not found in the page.');
      return;
    }

    const { StrictMode } = reactModule;
    const App = appModule.default;

    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    showFatal(describe(error));
  }
}

boot();