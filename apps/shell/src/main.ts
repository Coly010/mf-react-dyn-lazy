
import {REMOTES_CONFIG} from './app/config/config';

fetch('/assets/module-federation.manifest.json')
  .then((res) => res.json())
  .then((remotes: Record<string, string>) =>
    Object.entries(remotes).map(([name, entry]) => {
      REMOTES_CONFIG[name] = entry;
    })
  )
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
