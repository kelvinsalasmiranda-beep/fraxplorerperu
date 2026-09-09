/** Mata procesos que ocupan puertos 3000–3002 (dev Next.js colgado) */
const { execSync } = require('child_process');

const PORTS = [3000, 3001, 3002];

function pidsOnPort(port) {
  try {
    const out = execSync(`netstat -ano | findstr ":${port} "`, { encoding: 'utf8' });
    const pids = new Set();
    for (const line of out.split('\n')) {
      if (!line.includes('LISTENING')) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (/^\d+$/.test(pid)) pids.add(pid);
    }
    return [...pids];
  } catch {
    return [];
  }
}

let killed = 0;
for (const port of PORTS) {
  for (const pid of pidsOnPort(port)) {
    try {
      execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
      console.log(`✓ Puerto ${port}: proceso ${pid} terminado`);
      killed++;
    } catch {
      /* already gone */
    }
  }
}

if (!killed) console.log('✓ Puertos 3000–3002 libres');
