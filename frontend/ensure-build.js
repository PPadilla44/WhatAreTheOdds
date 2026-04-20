// Ensures the Expo web bundle exists before the static server boots.
// Idempotent: if dist/index.html is already present, does nothing besides patch.
const { existsSync } = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

const distIndex = path.join('/app', 'dist', 'index.html');

if (!existsSync(distIndex)) {
    console.log('[ensure-build] /app/dist not found — running `expo export --platform web`...');
    const res = spawnSync('npx', ['expo', 'export', '--platform', 'web'], {
        cwd: '/app',
        stdio: 'inherit',
        env: { ...process.env, CI: '1' },
    });
    if (res.status !== 0) {
        process.exit(res.status ?? 1);
    }
} else {
    console.log('[ensure-build] /app/dist already exists — skipping export.');
}

// Always run HTML patch (idempotent)
require('./patch-web-html.js');
