## Running
Run `npx nx serve remote1`

## Module Federation with Dynamic Remote Loading

This workspace demonstrates an optimized Module Federation pattern where remote modules are loaded **on-demand** rather than eagerly at application startup.

### How Lazy Loading Works

The shell application (`apps/shell`) uses route-based lazy loading to defer loading of remote entry files until they are actually needed:

#### Traditional Approach (Eager Loading)

In a typical Module Federation setup, remotes are declared in `module-federation.config.ts`:

```typescript
const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['remote1', 'remote2'], // Loaded immediately at startup
};
```

This causes all `remoteEntry.js` files to be fetched when the shell application initializes, even if the user never navigates to those routes.

#### Optimized Approach (Dynamic Lazy Loading)

This workspace uses a different pattern found in `apps/shell/src/app/routes/`:

```typescript
// apps/shell/src/app/routes/remote1.wrapper.tsx
import { registerRemotes, loadRemote } from "@module-federation/enhanced/runtime"
import { useEffect, lazy, useState } from "react"
import { REMOTES_CONFIG } from "../config/config"

export const Remote1Wrapper = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Register the remote only when the component mounts
    registerRemotes([{
      name: 'remote1',
      entry: REMOTES_CONFIG['remote1']
    }]);

    // Lazy load the remote module
    Remote1Cmp = lazy(() => loadRemote('remote1/Module'));
    setLoaded(true);
  }, [])

  return loaded ? <Remote1Cmp /> : <p>Loading</p>
}
```

### Benefits of This Approach

1. **Reduced Initial Bundle Size**: The shell application doesn't download any `remoteEntry.js` files until the user navigates to a specific route
2. **Faster Time-to-Interactive**: Users see the home page faster because fewer network requests are made on initial load
3. **Bandwidth Optimization**: If a user never visits certain routes, those remote bundles are never downloaded
4. **Runtime Flexibility**: Remote URLs can be configured dynamically through the `REMOTES_CONFIG` object in `apps/shell/src/app/config/config.ts`

### Implementation Details

The routing setup in `apps/shell/src/app/app.tsx` connects these lazy-loaded wrappers to routes:

```typescript
<Routes>
  <Route path="/" element={<NxWelcome title="shell" />} />
  <Route path="/remote1" element={<Remote1Wrapper />} />
  <Route path="/remote2" element={<Remote2Wrapper />} />
</Routes>
```

When a user navigates to `/remote1`:
1. React Router renders the `Remote1Wrapper` component
2. The `useEffect` hook fires and calls `registerRemotes()` with the remote configuration
3. The `loadRemote()` function fetches the `remoteEntry.js` file and loads the module
4. React's `lazy()` handles code splitting and displays the loading fallback until ready
5. Once loaded, the remote component renders

This pattern is particularly beneficial for applications with many remotes or when remotes are large and not frequently accessed.

