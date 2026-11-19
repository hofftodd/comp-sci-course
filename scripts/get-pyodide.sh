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
# sqlite3 is a separate Pyodide package (CS 340 uses it). It isn't in the npm package, so fetch it
# from the CDN, check it against the lock file's hash, and store it under a .wasm name for the same
# reason as above; app/pyworker.js loads it on first import.
SQ="sqlite3-1.0.0.zip"
curl -fsSL "https://cdn.jsdelivr.net/pyodide/v$VERSION/full/$SQ" -o "$TMP/$SQ"
WANT="$(python3 -c "import json,sys; print(json.load(open('$DEST/pyodide-lock.json'))['packages']['sqlite3']['sha256'])")"
GOT="$(sha256sum "$TMP/$SQ" | cut -d' ' -f1)"
[ "$WANT" = "$GOT" ] || { echo "sqlite3 package hash mismatch" >&2; exit 1; }
cp "$TMP/$SQ" "$DEST/$SQ.wasm"
echo "Pyodide $VERSION installed in $DEST"
