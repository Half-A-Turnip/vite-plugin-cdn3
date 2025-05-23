## 1.3.0
更新兼容vite版本

## 1.2.0
- 修复部分依赖包导入问题
  
## 1.1.0

### Features

- Expose resolve.

## 1.0.0

A stable version.

## 0.15.4

### Patches

- Fix vite's preprocess.

## 0.15.3

### Patches

- Fix missing sourcemap when transform cjs.

## 0.15.2

### Patches

- Fix tag generator.

## 0.15.1

### Patches

- Fix error condit.
- Remove log.

## 0.15.0

### Features

- Add `rs-module-lexer` wasm bindings.

## 0.14.1

### Patches

- Fix `tryScanGlobalName` can't work with some libs.
- Fix `transformWithBabel` can't anonymous function.

## 0.14.0

### Features

- Upgrade `rs-module-lexer`
- `ExportDefaultDeclaration` should be process.
- `external` plugin support aliases.

## 0.13.0

### Features

- Expose `external` plugin.

### Patches

- Fix can't work at monorepo.

## 0.12.4

### Patches

- Fix code gen.

## 0.12.3

### Improve

- `relativeModule` option first. (#22)

### Patches

- Fix node gen. (#23)

## 0.12.2

### Improves

- Perf type DX (#19 #20)

### Patches

- Fix `server` mode can't work with some libs.

### Credits

@mengdaoshizhongxinyang @nonzzz

## 0.12.1

### Patches

- Fix `server` mode can't process dependencies.

## 0.12.0

### Improve & Features

- Drop `happy-dom`. (Reduce installer size)
- Using `ast scanner` replace vm.

## 0.11.3

### Minor

- `transformIndexHtml` now return HTMLDescriptor (After happy-dom v9 It can't disabled warning logic)

## 0.11.2

### Minor

- Bump `happy-dom` version. (Reduce unnecessary installation size).
- Remove `@types/estree`

## 0.11.1

### Patches

- Fix `eraseDuplicatedVariableDeclaration` use error node selector.

## 0.11.0

### Feature & Improves

- Exports fields willn't be pre-processed.
- Add `apply` option.
- Plugin now return an array.

### Patches

- Fix `node_modules` can't processed.

## 0.10.0

### Feaature & Improves

- Support load submodule and join analyze. (Package.json "exports" module)

Why we need it? Because more and more packages provide the exports fileld.So we should
support it. In past we can't process like "import ReactDOM from 'react-dom/client'". But now
we can do it.

## 0.9.3

### Patches

- Fix "require.resolve" should work with “type:module”.

## 0.9.2

### Patches

- Fix "type:module" can't use this package.

## 0.9.0

### Feature & Improves

- Make firendly types
- Add `resolve` option for custom all url.

## 0.8.0

### Features & Improves

- modules add new attribute `resolve` & `relativeModule`

## 0.7.0

### Features & Improves

- node set extra info.

## 0.6.0

# Background

### Features & Improves

- Supprot `export * from 'module'`
- Using `babel` replace magic str

## 0.3.3

# Background

### Patches

- Fix transform generator final link attribute missing space.

## 0.3.2

# Background

### Patches

- Fix es module pacakge can't load.
  In past we only use require to load module. But the `esm` is more and more popular. So that support load `esm` package is necessary.

## 0.3.1

# Background

### Patches

- Fix transform hook can't work.
