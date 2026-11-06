"""Check every programming problem: the reference solution must pass every test,
and the starter code must fail at least one (otherwise the problem is already solved).

Usage (from the repository root):
    node scripts/export_problems.js > /tmp/problems.json
    python3 scripts/check_problems.py /tmp/problems.json
"""
import json
import os
import sys
import tempfile
import time

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "app"))
import harness  # noqa: E402

problems = json.load(open(sys.argv[1]))
os.chdir(tempfile.mkdtemp())   # tests may create files
bad = 0
for p in problems:
    slow = []
    for t in p["tests"]:
        start = time.perf_counter()
        r = json.loads(harness.check(p["solution"], json.dumps(t)))
        elapsed = time.perf_counter() - start
        if not r["ok"]:
            bad += 1
            print(f"SOLUTION FAILS {p['unit']}/{p['id']}: {t.get('label')}: {r['message']} {r.get('detail', '')}")
        if elapsed > t.get("limit", 5) / 3:
            slow.append(f"{t.get('label')} {elapsed:.2f}s")
    starter_fails = sum(not json.loads(harness.check(p["starter"], json.dumps(t)))["ok"] for t in p["tests"])
    if starter_fails == 0:
        bad += 1
        print(f"STARTER ALREADY PASSES {p['unit']}/{p['id']}")
    print(f"{p['unit']:6} {p['id']:16} tests {len(p['tests'])}  starter fails {starter_fails}" + (f"  SLOW: {slow}" if slow else ""))
print(f"\n{len(problems)} problems, {bad} problems found")
sys.exit(1 if bad else 0)
