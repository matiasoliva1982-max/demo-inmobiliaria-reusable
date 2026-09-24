import { spawn } from 'node:child_process';

const command = process.platform === 'win32'
  ? '.\\node_modules\\.bin\\astro.CMD'
  : './node_modules/.bin/astro';

const child = spawn(command, ['preview', '--host', '127.0.0.1', '--port', '4321'], {
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: '1',
    CI: 'true',
  },
  shell: true,
  stdio: 'inherit',
});

child.once('exit', (code) => {
  process.exit(code ?? 0);
});

function stopServer() {
  child.kill();
  process.exit(0);
}

process.once('SIGINT', stopServer);
process.once('SIGTERM', stopServer);
