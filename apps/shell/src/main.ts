
import { REMOTES_CONFIG } from './app/config/config';


const REMOTES = {
  "remote1": "http://localhost:4201/mf-manifest.json",
  "remote2": "http://localhost:4202/mf-manifest.json"
}

Object.entries(REMOTES).map(([name, entry]) => {
  REMOTES_CONFIG[name] = entry;
});
    
import('./bootstrap').catch((err) => console.error(err));
