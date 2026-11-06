"""Run each lesson's Python blocks in order (shared namespace), and compare what each commented line
actually produces with the value its comment claims.

A line is checked if it's a top-level print(...) call or a bare expression with a trailing "# ..." comment
whose first token looks like a value (a number, quote, bracket, True/False/None). Practice answers run
after the lesson's notes so they can use its functions. Prints suspected mismatches for manual review:
expect a few formatting-only differences (e.g. a set printed in another order) and false alarms where a
class is built up from method fragments the runner can't assemble.

Usage (from the repository root):
    node scripts/extract_lesson_code.js . > /tmp/blocks.json && python3 scripts/check_lesson_code.py /tmp/blocks.json
"""
import ast, io, json, re, sys, contextlib, signal, math, random, textwrap

blocks = json.load(open(sys.argv[1]))
sys.stdin = io.StringIO("")   # programs that call input() stop with EOFError instead of waiting
import os, tempfile
os.chdir(tempfile.mkdtemp(prefix="lesson-code-"))   # lesson code writes files (todo.txt, settings.json); keep them out of the repo
VALUE = re.compile(r"^\s*(about |approximately |≈ ?|roughly )?([-+]?[\d.]+(e[-+]?\d+)?|'[^']*'|\"[^\"]*\"|\[.*|\(.*|\{.*|True|False|None)")

class Timeout(Exception): pass
def on_alarm(*_): raise Timeout()
signal.signal(signal.SIGALRM, on_alarm)

def norm(s):
    return re.sub(r"\s+", " ", s.strip())

def matches(actual, claim):
    """Loose comparison: numbers compared to the precision the comment shows; text compared by prefix."""
    claim = claim.strip()
    claim = re.sub(r"^(about|approximately|roughly|≈)\s*", "", claim)
    a = norm(actual)
    nums_c = re.findall(r"[-+]?\d+(?:\.\d+)?(?:e[-+]?\d+)?", claim.replace(",", ""))
    nums_a = re.findall(r"[-+]?\d+(?:\.\d+)?(?:e[-+]?\d+)?", a.replace(",", ""))
    if nums_c and nums_a:
        # compare the first few numbers, to the number of significant digits shown in the comment
        for c, x in zip(nums_c[:3], nums_a[:3]):
            try:
                cv, xv = float(c), float(x)
            except ValueError:
                continue
            digits = len(re.sub(r"[^0-9]", "", c.split("e")[0]).lstrip("0")) or 1
            tol = abs(cv) * 10 ** (-(digits - 1)) * 0.6 + 1e-12 if "." in c or "e" in c else 0.5
            if claim.rstrip().endswith("...") or "…" in claim:
                tol = max(tol, abs(cv) * 10 ** (-(digits - 1)))
            if abs(cv - xv) > tol and not str(x).startswith(c.rstrip(".")):
                return False
        return True
    c = norm(claim).rstrip(".…")
    return a.startswith(c[: max(3, len(c) // 2)]) or c.startswith(a[:20])

def run_unit(seq):
    ns = {"__name__": "__main__", "math": math, "random": random}
    random.seed(0)
    report = []
    for b in seq:
        code = textwrap.dedent(b["code"])
        try:
            tree = ast.parse(code)
        except SyntaxError:
            continue
        lines = code.split("\n")
        for node in tree.body:
            src_line = lines[node.lineno - 1] if node.lineno - 1 < len(lines) else ""
            comment = src_line.split("#", 1)[1] if "#" in src_line and not src_line.strip().startswith("#") else None
            check = comment is not None and VALUE.match(comment) and node.end_lineno == node.lineno
            buf = io.StringIO()
            try:
                signal.alarm(10)
                with contextlib.redirect_stdout(buf):
                    if check and isinstance(node, ast.Expr) and not (isinstance(node.value, ast.Call) and getattr(node.value.func, "id", "") == "print"):
                        val = eval(compile(ast.Expression(node.value), "<b>", "eval"), ns)
                        out = repr(val)
                    else:
                        exec(compile(ast.Module([node], []), "<b>", "exec"), ns)
                        out = buf.getvalue()
                signal.alarm(0)
            except Timeout:
                report.append((b, src_line.strip(), "TIMEOUT"))
                break
            except BaseException as e:
                signal.alarm(0)
                if check and type(e).__name__ in comment:
                    continue  # the comment says this line raises that error
                break  # a fragment that depends on something not shown; stop this block
            if check and out.strip() and not matches(out, comment):
                report.append((b, src_line.strip(), out.strip()[:120]))
    return report

groups = {}
for b in blocks:
    groups.setdefault((b["course"], b["unit"]), []).append(b)
total = 0
for (course, unit), seq in groups.items():
    notes = [b for b in seq if b["where"] == "notes" or b["where"].startswith("aside")]
    for rep in [run_unit(notes)] + [run_unit(notes + [p]) for p in seq if p["where"].startswith("P")]:
        for b, line, actual in rep:
            if b["where"].startswith("P") or b in notes:
                total += 1
                print(f"{course}/{unit}/{b['where']}#{b['n']}: {line}\n      actual: {actual}")
print(f"\n{total} suspected mismatches")
