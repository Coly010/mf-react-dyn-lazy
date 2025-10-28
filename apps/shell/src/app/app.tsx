import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import {Remote1Wrapper} from './routes/remote1.wrapper'
import {Remote2Wrapper} from './routes/remote2.wrapper'

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/remote1">Remote1</Link>
        </li>
        <li>
          <Link to="/remote2">Remote2</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />
        <Route path="/remote1" element={<Remote1Wrapper />} />
        <Route path="/remote2" element={<Remote2Wrapper />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
