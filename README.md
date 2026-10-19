# Turbopack: lazy `import.meta.glob` entries are not code-split

`components/GlobLoader.tsx` loads `widgets/*.tsx` through a lazy (default) `import.meta.glob`.
`components/ImportLoader.tsx` loads an equivalent module, `control/WidgetC.tsx`, through a plain `import()`.

```bash
npm install
npm run build
npm run check
```

`check` reports whether each widget's code is in the page's entry scripts or only in an async chunk.
