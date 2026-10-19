'use client';

import { Suspense, lazy, useState } from 'react';
import type { ComponentType } from 'react';

// Lazy (default) import.meta.glob: each value is a thunk returning a promise for the module.
const modules = import.meta.glob<{ default: ComponentType }>('../widgets/*.tsx');
const widgets = Object.entries(modules).map(([key, load]) => ({ key, Widget: lazy(load) }));

export function GlobLoader() {
  const [open, setOpen] = useState<string | null>(null);
  const selected = widgets.find((w) => w.key === open);
  return (
    <section>
      {widgets.map((w) => (
        <button key={w.key} onClick={() => setOpen(w.key)}>
          glob {w.key}
        </button>
      ))}
      <Suspense fallback="loading">{selected && <selected.Widget />}</Suspense>
    </section>
  );
}
