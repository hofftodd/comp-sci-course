"""Grading harness for First Principles CS programming problems.

Runs a student's program in a fresh namespace with input() fed from a list
and print output captured, then checks it against one test at a time.
The same file runs in the browser (Pyodide, inside app/pyworker.js) and on a
student's own computer (the exported check script), so it uses only the
standard library.

Test kinds (a dict per test):
  io     {"stdin": [...], "expect": "..."}            run the whole program, compare printed output
  call   {"call": "f(1)", "expect": "2"}              call a function, compare the result
  raises {"call": "f([])", "error": "ValueError"}     the call must raise that exception
  assert {"code": "assert ..."}                       run Python with the student's names in scope
  source {"code": "assert ... __source__ ..."}        check the program's text without running it
Optional on any test: "setup" (Python run first, e.g. to create files).
"""
import builtins
import io
import json
import math
import sys
import traceback

MAX_OUTPUT = 20000
FILENAME = "main.py"


class _Feeder:
    """Stands in for input(): returns the given lines one at a time."""

    def __init__(self, lines, transcript):
        self.lines = [str(x) for x in lines]
        self.transcript = transcript

    def __call__(self, prompt=""):
        self.transcript.write(str(prompt))
        if not self.lines:
            raise EOFError("the program asked for more input than was provided")
        line = self.lines.pop(0)
        self.transcript.write(line + "\n")
        return line


class _Capture:
    """Patches stdout and input() while student code runs."""

    def __init__(self, stdin):
        self.out = io.StringIO()          # printed output only
        self.transcript = io.StringIO()   # prompts, typed input and output, as a person would see it
        self.stdin = stdin

    def __enter__(self):
        capture = self

        class _Tee:
            def write(self, s):
                capture.out.write(s)
                capture.transcript.write(s)
                return len(s)

            def flush(self):
                pass

        self._old = (sys.stdout, builtins.input)
        sys.stdout = _Tee()
        builtins.input = _Feeder(self.stdin, self.transcript)
        return self

    def __exit__(self, *exc):
        sys.stdout, builtins.input = self._old
        return False


def _format_error(exc):
    """A traceback showing only the student's own lines."""
    frames = [f for f in traceback.extract_tb(exc.__traceback__) if f.filename == FILENAME]
    lines = []
    if frames:
        lines.append("Traceback (most recent call last):")
        for f in frames:
            lines.append(f'  File "{FILENAME}", line {f.lineno}, in {f.name}')
            if f.line:
                lines.append("    " + f.line.strip())
    lines.extend(s.rstrip("\n") for s in traceback.format_exception_only(type(exc), exc))
    return "\n".join(lines)


def _load(code, stdin, name):
    """Run the student's code. Returns (namespace, capture, error text or None)."""
    ns = {"__name__": name, "__builtins__": builtins, "__source__": code}
    cap = _Capture(stdin)
    err = None
    with cap:
        try:
            exec(compile(code, FILENAME, "exec"), ns)
        except SystemExit:
            pass
        except BaseException as e:  # report every error, including RecursionError
            err = _format_error(e)
    return ns, cap, err


def _norm(text):
    return "\n".join(line.rstrip() for line in str(text).strip("\n").splitlines())


def _equal(a, b):
    if isinstance(a, bool) or isinstance(b, bool):
        return a is b if isinstance(a, bool) and isinstance(b, bool) else False
    if isinstance(a, (int, float)) and isinstance(b, (int, float)):
        if isinstance(a, float) or isinstance(b, float):
            return math.isclose(a, b, rel_tol=1e-9, abs_tol=1e-9)
        return a == b
    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):
        return type(a) is type(b) and len(a) == len(b) and all(_equal(x, y) for x, y in zip(a, b))
    if isinstance(a, dict) and isinstance(b, dict):
        return a.keys() == b.keys() and all(_equal(a[k], b[k]) for k in a)
    return a == b


def _short(value, limit=300):
    text = repr(value)
    return text if len(text) <= limit else text[:limit] + "…"


def _check(code, t):
    kind = t.get("type", "call")
    if t.get("setup"):
        exec(t["setup"], {"__name__": "setup"})

    if kind == "io":
        ns, cap, err = _load(code, t.get("stdin", []), "__main__")
        if err:
            return {"ok": False, "message": "Your program stopped with an error.", "detail": err}
        got, want = _norm(cap.out.getvalue()), _norm(t["expect"])
        if got == want:
            return {"ok": True}
        return {"ok": False, "message": "The printed output doesn't match.",
                "detail": "Expected:\n" + want[:MAX_OUTPUT] + "\n\nYour program printed:\n" + (got[:MAX_OUTPUT] or "(nothing)")}

    if kind == "source":
        # A check on the program's text only (e.g. "doesn't use max"); the code isn't run.
        try:
            exec(t["code"], {"__source__": code})
        except AssertionError as e:
            return {"ok": False, "message": str(e) or "A check on your code failed."}
        return {"ok": True}

    ns, cap, err = _load(code, [], "solution")
    if err:
        return {"ok": False, "message": "Your code stopped with an error before the test could run.", "detail": err}

    with _Capture([]):
        if kind == "call":
            try:
                value = eval(t["call"], ns)
            except BaseException as e:
                return {"ok": False, "message": f"{t['call']} raised an error.", "detail": _format_error(e)}
            expected = eval(t["expect"], {"math": math})
            if _equal(value, expected):
                return {"ok": True}
            return {"ok": False, "message": f"{t['call']} returned {_short(value)}, but the expected result is {_short(expected)}."}

        if kind == "raises":
            try:
                value = eval(t["call"], ns)
            except BaseException as e:
                if type(e).__name__ == t["error"]:
                    return {"ok": True}
                return {"ok": False, "message": f"{t['call']} raised {type(e).__name__}, but it should raise {t['error']}.",
                        "detail": _format_error(e)}
            return {"ok": False, "message": f"{t['call']} returned {_short(value)}, but it should raise {t['error']}."}

        if kind == "assert":
            try:
                exec(t["code"], ns)
            except AssertionError as e:
                return {"ok": False, "message": str(e) or t.get("fail") or "A check failed."}
            except BaseException as e:
                return {"ok": False, "message": "Your code raised an error during this test.", "detail": _format_error(e)}
            return {"ok": True}

    return {"ok": False, "message": f"Unknown test type: {kind}"}


def run(code, stdin_json="[]"):
    """Run a program the way a person would, returning the transcript and any error, as JSON."""
    ns, cap, err = _load(code, json.loads(stdin_json), "__main__")
    return json.dumps({"transcript": cap.transcript.getvalue()[:MAX_OUTPUT], "error": err})


def check(code, test_json):
    """Check code against one test, returning {"ok", "message", "detail"} as JSON."""
    try:
        return json.dumps(_check(code, json.loads(test_json)))
    except BaseException as e:
        return json.dumps({"ok": False, "message": "The checker itself failed. Please report this problem.", "detail": repr(e)})


def check_all(code, tests):
    """Used by the exported check script: run every test and print a report."""
    import time
    passed = 0
    for i, t in enumerate(tests, 1):
        start = time.perf_counter()
        result = json.loads(check(code, json.dumps(t)))
        elapsed = time.perf_counter() - start
        limit = t.get("limit", 5)
        if result["ok"] and elapsed > limit:
            result = {"ok": False, "message": f"Correct, but it took {elapsed:.1f} seconds; the limit is {limit} seconds. Look for a faster approach."}
        label = t.get("label", f"Test {i}")
        if result["ok"]:
            passed += 1
            print(f"PASS  {label}")
        else:
            print(f"FAIL  {label}\n      {result['message']}")
            if result.get("detail") and not t.get("hidden"):
                print("      " + result["detail"].replace("\n", "\n      "))
    print(f"\n{passed} of {len(tests)} tests passed.")
    return passed == len(tests)
