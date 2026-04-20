// Injects a small <style> block into /app/dist/index.html that removes browser
// default focus outlines & tap-highlights on Pressables/buttons. Idempotent —
// running multiple times only injects once.
const fs = require('fs');
const path = require('path');

const INDEX = path.join('/app', 'dist', 'index.html');
const MARKER = '<!-- emergent-web-patch -->';

const CSS = `${MARKER}
<style id="emergent-web-patch">
  html, body, #root { background-color: #0B1120; }
  /* Remove default focus rings / tap highlights on RN-web clickables */
  *[role="button"],
  button,
  [data-focusable="true"],
  div[tabindex] {
    outline: none !important;
    -webkit-tap-highlight-color: transparent !important;
  }
  *:focus, *:focus-visible { outline: none !important; }
  /* Remove native button chrome that react-native-gesture-handler sometimes leaves */
  button { border: 0; background: transparent; }
</style>`;

function run() {
  if (!fs.existsSync(INDEX)) {
    console.log('[patch-web-html] dist/index.html not found — skipping.');
    return;
  }

  let html = fs.readFileSync(INDEX, 'utf8');
  if (html.includes(MARKER)) {
    console.log('[patch-web-html] CSS already injected — nothing to do.');
    return;
  }

  // Inject right before </head>
  html = html.replace('</head>', `${CSS}\n</head>`);
  fs.writeFileSync(INDEX, html, 'utf8');
  console.log('[patch-web-html] Injected focus-outline reset into dist/index.html');
}

run();
