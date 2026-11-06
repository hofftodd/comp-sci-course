#!/usr/bin/env bash
# Download the Pyodide runtime (CPython compiled to WebAssembly) into vendor/pyodide/.
# The programming problems run student code with it, in the browser.
# Needs npm. Run from the repository root:  bash scripts/get-pyodide.sh
set -euo pipefail
VERSION="0.26.4"
DEST="vendor/pyodide"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
(cd "$TMP" && npm pack "pyodide@$VERSION" --silent >/dev/null && tar xzf "pyodide-$VERSION.tgz")
mkdir -p "$DEST"
for f in pyodide.js pyodide.asm.js pyodide.asm.wasm pyodide-lock.json; do
  cp "$TMP/package/$f" "$DEST/$f"
done
# The standard library archive gets a .wasm name because some hosts (claude.ai artifacts) won't
# serve .zip files. The bytes are unchanged; app/pyworker.js passes this name to Pyodide.
cp "$TMP/package/python_stdlib.zip" "$DEST/python_stdlib.zip.wasm"
echo "Pyodide $VERSION installed in $DEST"
