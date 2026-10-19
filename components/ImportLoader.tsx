'use client';

import { Suspense, lazy, useState } from 'react';

// Control: a plain dynamic import of an equivalent module.
const Control = lazy(() => import('../control/WidgetC'));

export function ImportLoader() {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <button onClick={() => setOpen(true)}>import()</button>
      <Suspense fallback="loading">{open && <Control />}</Suspense>
    </section>
  );
}
