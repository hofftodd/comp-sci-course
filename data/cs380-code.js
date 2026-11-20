/* Auto-graded programming problems for CS 380, by lesson. Generated from a Python spec, so every
   string is JSON. Every problem is defensive or educational: toy ciphers and keys are for learning only,
   and real systems must use vetted libraries. */
CSA.addCode("cs380", {
 "sc1": [
  {
   "id": "trust_boundaries",
   "title": "Flows across trust boundaries",
   "prompt": "<p>A threat model often starts from a data-flow diagram: components, the trust zone each sits in, and the flows of data between them. Every flow that crosses from one zone to another crosses a <em>trust boundary</em>, and is where an attacker is most likely to interfere. Write <code>boundary_findings(zones, flows)</code>.</p>\n<ul><li><code>zones</code> maps each component name to its zone name, such as <code>{\"browser\": \"internet\", \"web\": \"dmz\", \"db\": \"internal\"}</code>.</li>\n<li><code>flows</code> is a list of dicts with keys <code>\"src\"</code>, <code>\"dst\"</code>, <code>\"encrypted\"</code> (bool) and <code>\"authenticated\"</code> (bool: the receiver checks who sent it).</li></ul>\n<p>Return a sorted list of tuples <code>(src, dst, problem)</code>, one for each problem found:</p>\n<ul><li><code>\"unknown component\"</code> if <code>src</code> or <code>dst</code> isn't in <code>zones</code> (a diagram with a component nobody placed in a zone is itself a finding); report nothing else for that flow;</li>\n<li>for a flow between two different zones: <code>\"not encrypted\"</code> if it isn't encrypted, and <code>\"not authenticated\"</code> if it isn't authenticated (both, if both are missing).</li></ul>\n<p>Flows inside a single zone produce no findings here. Repeated identical findings appear once.</p>",
   "starter": "def boundary_findings(zones, flows):\n    pass\n",
   "hint": "<p>Collect findings in a set of tuples, so duplicates disappear, then return <code>sorted(...)</code> of it. Check for unknown components first and <code>continue</code>.</p>",
   "solution": "def boundary_findings(zones, flows):\n    found = set()\n    for f in flows:\n        s, d = f[\"src\"], f[\"dst\"]\n        if s not in zones or d not in zones:\n            found.add((s, d, \"unknown component\"))\n            continue\n        if zones[s] == zones[d]:\n            continue\n        if not f[\"encrypted\"]:\n            found.add((s, d, \"not encrypted\"))\n        if not f[\"authenticated\"]:\n            found.add((s, d, \"not authenticated\"))\n    return sorted(found)\n",
   "tests": [
    {
     "label": "A three-tier web app",
     "call": "boundary_findings({\"browser\": \"internet\", \"web\": \"dmz\", \"db\": \"internal\", \"cache\": \"internal\"}, [\n {\"src\": \"browser\", \"dst\": \"web\", \"encrypted\": True, \"authenticated\": False},\n {\"src\": \"web\", \"dst\": \"db\", \"encrypted\": False, \"authenticated\": True},\n {\"src\": \"db\", \"dst\": \"cache\", \"encrypted\": False, \"authenticated\": False}])",
     "expect": "[(\"browser\", \"web\", \"not authenticated\"), (\"web\", \"db\", \"not encrypted\")]"
    },
    {
     "label": "Both problems on one flow",
     "call": "boundary_findings({\"a\": \"x\", \"b\": \"y\"}, [{\"src\": \"a\", \"dst\": \"b\", \"encrypted\": False, \"authenticated\": False}])",
     "expect": "[(\"a\", \"b\", \"not authenticated\"), (\"a\", \"b\", \"not encrypted\")]"
    },
    {
     "label": "Unknown components and duplicates",
     "call": "boundary_findings({\"a\": \"x\", \"b\": \"y\"}, [\n {\"src\": \"a\", \"dst\": \"ghost\", \"encrypted\": False, \"authenticated\": False},\n {\"src\": \"a\", \"dst\": \"ghost\", \"encrypted\": True, \"authenticated\": True},\n {\"src\": \"b\", \"dst\": \"a\", \"encrypted\": True, \"authenticated\": True}])",
     "expect": "[(\"a\", \"ghost\", \"unknown component\")]"
    },
    {
     "label": "No flows, no findings",
     "call": "boundary_findings({}, [])",
     "expect": "[]"
    },
    {
     "label": "A larger diagram",
     "hidden": true,
     "call": "boundary_findings({\"u\": \"net\", \"lb\": \"dmz\", \"app\": \"app\", \"q\": \"app\", \"db\": \"data\", \"logs\": \"data\"}, [\n {\"src\": \"u\", \"dst\": \"lb\", \"encrypted\": True, \"authenticated\": True},\n {\"src\": \"lb\", \"dst\": \"app\", \"encrypted\": False, \"authenticated\": True},\n {\"src\": \"app\", \"dst\": \"q\", \"encrypted\": False, \"authenticated\": False},\n {\"src\": \"app\", \"dst\": \"db\", \"encrypted\": True, \"authenticated\": False},\n {\"src\": \"q\", \"dst\": \"logs\", \"encrypted\": False, \"authenticated\": False},\n {\"src\": \"lb\", \"dst\": \"app\", \"encrypted\": False, \"authenticated\": True},\n {\"src\": \"x\", \"dst\": \"y\", \"encrypted\": False, \"authenticated\": False}])",
     "expect": "[(\"app\", \"db\", \"not authenticated\"), (\"lb\", \"app\", \"not encrypted\"), (\"q\", \"logs\", \"not authenticated\"), (\"q\", \"logs\", \"not encrypted\"), (\"x\", \"y\", \"unknown component\")]"
    }
   ]
  },
  {
   "id": "reference_monitor",
   "title": "A reference monitor",
   "prompt": "<p>A <em>reference monitor</em> is the one place where every access request is checked (complete mediation). Write a class <code>Monitor</code>:</p>\n<ul><li><code>Monitor(rules)</code>: <code>rules</code> is a list of tuples <code>(effect, user, action, prefix)</code>. <code>effect</code> is <code>\"allow\"</code> or <code>\"deny\"</code>; <code>user</code> and <code>action</code> are exact names or <code>\"*\"</code>, which matches any; and a rule applies to a resource (a path string) when the path starts with <code>prefix</code>.</li>\n<li><code>check(user, action, resource)</code> returns <code>True</code> or <code>False</code>. If any applicable rule says <code>\"deny\"</code>, the answer is <code>False</code>, whatever else applies. Otherwise it is <code>True</code> if some applicable rule says <code>\"allow\"</code>. If no rule applies, the answer is <code>False</code> (fail-safe default). A rule with an effect other than <code>\"allow\"</code> or <code>\"deny\"</code> is a configuration error: the constructor raises <code>ValueError</code>.</li>\n<li>Every call to <code>check</code> appends <code>(user, action, resource, decision)</code> to the list <code>self.log</code>, which starts empty.</li></ul>",
   "starter": "class Monitor:\n    def __init__(self, rules):\n        self.rules = rules\n        self.log = []\n\n    def check(self, user, action, resource):\n        return True\n",
   "hint": "<p>Find the applicable rules with three tests (user matches or is <code>\"*\"</code>, action likewise, <code>resource.startswith(prefix)</code>). Then <code>any</code> of them deny gives <code>False</code>; else <code>any</code> allow gives <code>True</code>; else <code>False</code>.</p>",
   "solution": "class Monitor:\n    def __init__(self, rules):\n        for r in rules:\n            if r[0] not in (\"allow\", \"deny\"):\n                raise ValueError(\"bad effect: \" + repr(r[0]))\n        self.rules = list(rules)\n        self.log = []\n\n    def check(self, user, action, resource):\n        applies = [r for r in self.rules\n                   if r[1] in (\"*\", user) and r[2] in (\"*\", action) and resource.startswith(r[3])]\n        if any(r[0] == \"deny\" for r in applies):\n            ok = False\n        else:\n            ok = any(r[0] == \"allow\" for r in applies)\n        self.log.append((user, action, resource, ok))\n        return ok\n",
   "tests": [
    {
     "label": "Default deny",
     "call": "Monitor([]).check('ana', 'read', '/grades/1')",
     "expect": "False"
    },
    {
     "label": "Allow, and deny wins",
     "type": "assert",
     "code": "m = Monitor([(\"allow\", \"*\", \"read\", \"/public/\"), (\"allow\", \"ana\", \"*\", \"/grades/\"), (\"deny\", \"*\", \"write\", \"/grades/final/\")])\nassert m.check(\"bob\", \"read\", \"/public/a.txt\") is True\nassert m.check(\"bob\", \"write\", \"/public/a.txt\") is False\nassert m.check(\"ana\", \"write\", \"/grades/hw1\") is True\nassert m.check(\"ana\", \"write\", \"/grades/final/x\") is False, \"a deny rule must override an allow\"\nassert m.check(\"ana\", \"read\", \"/grades/final/x\") is True\n"
    },
    {
     "label": "Every decision is logged",
     "type": "assert",
     "code": "m = Monitor([(\"allow\", \"ana\", \"read\", \"/a\")])\nm.check(\"ana\", \"read\", \"/a/b\"); m.check(\"bob\", \"read\", \"/a/b\")\nassert m.log == [(\"ana\", \"read\", \"/a/b\", True), (\"bob\", \"read\", \"/a/b\", False)], m.log\n"
    },
    {
     "label": "A misspelled effect is rejected",
     "type": "raises",
     "call": "Monitor([('alow', '*', '*', '/')])",
     "error": "ValueError"
    },
    {
     "label": "Many requests",
     "hidden": true,
     "type": "assert",
     "code": "m = Monitor([(\"allow\", \"*\", \"*\", \"/\"), (\"deny\", \"eve\", \"*\", \"/\"), (\"deny\", \"*\", \"delete\", \"/etc\")])\nassert m.check(\"ana\", \"delete\", \"/home/x\") and not m.check(\"ana\", \"delete\", \"/etc/passwd\")\nassert not m.check(\"eve\", \"read\", \"/home/x\") and len(m.log) == 3\n"
    }
   ]
  }
 ],
 "sc2": [
  {
   "id": "two_time_pad",
   "title": "The two-time pad",
   "prompt": "<p>A one-time pad is safe only if the key is never reused. Show why. Write:</p>\n<ul><li><code>xor_bytes(a, b)</code>: the XOR of two byte strings, byte by byte, as <code>bytes</code>, as long as the shorter one.</li>\n<li><code>recover(c1, c2, m1)</code>: <code>c1</code> and <code>c2</code> were made by XORing two messages with the <em>same</em> key; given the first message <code>m1</code>, return the second message (as far as the shorter ciphertext and <code>m1</code> allow).</li>\n<li><code>crib_drag(c1, c2, crib)</code>: you don't know either message, but guess that a word <code>crib</code> (bytes) appears in one of them. For each position <em>i</em> from 0 to <code>min(len(c1), len(c2)) - len(crib)</code>, XOR the crib with the corresponding slice of <code>c1 ⊕ c2</code>. Return the list of pairs <code>(i, fragment)</code> where every byte of the fragment is a lowercase ASCII letter or a space: places where the other message plausibly contains that fragment.</li></ul>",
   "starter": "def xor_bytes(a, b):\n    pass\n\ndef recover(c1, c2, m1):\n    pass\n\ndef crib_drag(c1, c2, crib):\n    pass\n",
   "hint": "<p>c1 ⊕ c2 = (m1 ⊕ k) ⊕ (m2 ⊕ k) = m1 ⊕ m2, because k ⊕ k = 0. So m2 = c1 ⊕ c2 ⊕ m1. <code>bytes(x ^ y for x, y in zip(a, b))</code> XORs two byte strings. A fragment is acceptable when <code>all(b == 32 or 97 &lt;= b &lt;= 122 for b in frag)</code>.</p>",
   "solution": "def xor_bytes(a, b):\n    return bytes(x ^ y for x, y in zip(a, b))\n\ndef recover(c1, c2, m1):\n    return xor_bytes(xor_bytes(c1, c2), m1)\n\ndef crib_drag(c1, c2, crib):\n    d = xor_bytes(c1, c2)\n    out = []\n    for i in range(len(d) - len(crib) + 1):\n        frag = xor_bytes(d[i:i + len(crib)], crib)\n        if all(b == 32 or 97 <= b <= 122 for b in frag):\n            out.append((i, frag))\n    return out\n",
   "tests": [
    {
     "label": "XOR of bytes",
     "call": "xor_bytes(b'\\x0f\\xf0\\xaa', b'\\xff\\xff\\xff\\x00')",
     "expect": "b'\\xf0\\x0f\\x55'"
    },
    {
     "label": "A reused key reveals the second message",
     "type": "assert",
     "code": "import hashlib\nkey = hashlib.sha256(b\"pad\").digest()\nm1, m2 = b\"attack at dawn on the north gate\", b\"retreat to the river before noon\"\nc1 = bytes(a ^ b for a, b in zip(m1, key)); c2 = bytes(a ^ b for a, b in zip(m2, key))\nassert recover(c1, c2, m1) == m2\n"
    },
    {
     "label": "Crib dragging finds a word",
     "type": "assert",
     "code": "import hashlib\nkey = hashlib.sha256(b\"k2\").digest()\nm1, m2 = b\"meet me by the old mill at nine\", b\"bring the money and come alone\"\nc1 = bytes(a ^ b for a, b in zip(m1, key)); c2 = bytes(a ^ b for a, b in zip(m2, key))\nhits = crib_drag(c1, c2, b\" the \")\nassert (5, b\"me by\") in hits, hits\nassert (10, b\"money\") in hits, hits\nassert all(len(f) == 5 for _, f in hits)\n"
    },
    {
     "label": "Crib longer than the messages",
     "call": "crib_drag(b'ab', b'cd', b'abc')",
     "expect": "[]"
    },
    {
     "label": "Positions are in order",
     "hidden": true,
     "type": "assert",
     "code": "c1 = bytes(32); c2 = b\"ab cd\" + bytes([0]) * 3\nhits = crib_drag(c1, c2, bytes(2))\nassert hits == [(0, b\"ab\"), (1, b\"b \"), (2, b\" c\"), (3, b\"cd\")], hits\n"
    }
   ]
  },
  {
   "id": "ctr_and_ecb",
   "title": "CTR mode, and spotting ECB",
   "prompt": "<p>Build counter (CTR) mode on a toy pseudorandom function (PRF, defined in Lesson 2's block-ciphers section; CTR mode never inverts its block function, so a PRF is enough), then detect the leak that ECB mode causes. (A real system uses AES from a vetted library; SHA-256 here only stands in for a block cipher.)</p>\n<ul><li><code>prf(key, nonce, counter)</code>: the first 16 bytes of SHA-256 of <code>key + nonce + counter.to_bytes(8, \"big\")</code>.</li>\n<li><code>ctr_xcrypt(key, nonce, data)</code>: XOR <code>data</code> with the keystream <code>prf(key, nonce, 0) + prf(key, nonce, 1) + …</code>, cut to <code>len(data)</code>. The same function encrypts and decrypts.</li>\n<li><code>repeated_blocks(ct, size=16)</code>: split <code>ct</code> into <code>size</code>-byte blocks (ignore a final partial block) and return how many blocks are repeats of an earlier block. Under ECB, equal plaintext blocks give equal ciphertext blocks, so a high count betrays ECB; under CTR it should be 0.</li></ul>",
   "starter": "import hashlib\n\ndef prf(key, nonce, counter):\n    pass\n\ndef ctr_xcrypt(key, nonce, data):\n    pass\n\ndef repeated_blocks(ct, size=16):\n    pass\n",
   "hint": "<p>Build the keystream with a loop over <code>range((len(data) + 15) // 16)</code>. For the count, keep a set of blocks seen so far: the answer is the number of blocks minus the number of distinct blocks.</p>",
   "solution": "import hashlib\n\ndef prf(key, nonce, counter):\n    return hashlib.sha256(key + nonce + counter.to_bytes(8, \"big\")).digest()[:16]\n\ndef ctr_xcrypt(key, nonce, data):\n    stream = b\"\".join(prf(key, nonce, i) for i in range((len(data) + 15) // 16))\n    return bytes(a ^ b for a, b in zip(data, stream))\n\ndef repeated_blocks(ct, size=16):\n    blocks = [ct[i:i + size] for i in range(0, len(ct) - size + 1, size)]\n    return len(blocks) - len(set(blocks))\n",
   "tests": [
    {
     "label": "The PRF",
     "call": "prf(b'k', b'n', 1).hex()",
     "expect": "'46d7a8b66cdda78be58348b4ec550f9b'"
    },
    {
     "label": "Round trip and length",
     "type": "assert",
     "code": "msg = b\"The quick brown fox jumps over the lazy dog, twice over.\"\nc = ctr_xcrypt(b\"key\", b\"nonce-01\", msg)\nassert len(c) == len(msg) and c != msg\nassert ctr_xcrypt(b\"key\", b\"nonce-01\", c) == msg\nassert ctr_xcrypt(b\"key\", b\"nonce-02\", msg) != c, \"a different nonce must give a different ciphertext\"\nassert ctr_xcrypt(b\"key\", b\"n\", b\"\") == b\"\"\n"
    },
    {
     "label": "Keystream is the PRF blocks",
     "type": "assert",
     "code": "z = ctr_xcrypt(b\"k\", b\"n\", bytes(40))\nassert z == (prf(b\"k\", b\"n\", 0) + prf(b\"k\", b\"n\", 1) + prf(b\"k\", b\"n\", 2))[:40]\n"
    },
    {
     "label": "Counting repeated blocks",
     "type": "assert",
     "code": "a, b = b\"A\" * 16, b\"B\" * 16\nassert repeated_blocks(a + b + a + a + b\"xyz\") == 2\nassert repeated_blocks(b\"\") == 0\nassert repeated_blocks(a + a + a, size=8) == 5\n"
    },
    {
     "label": "CTR hides repeated plaintext",
     "type": "assert",
     "code": "pt = b\"YELLOW SUBMARINE\" * 8\nassert repeated_blocks(pt) == 7\nassert repeated_blocks(ctr_xcrypt(b\"key\", b\"nonce\", pt)) == 0\n"
    }
   ]
  }
 ],
 "sc3": [
  {
   "id": "hmac_from_hash",
   "title": "HMAC from a hash function",
   "prompt": "<p>Implement HMAC-SHA256 (RFC 2104) using only <code>hashlib</code>, as in the notes, without the <code>hmac</code> module.</p>\n<ul><li><code>my_hmac(key, msg)</code> returns the 32-byte tag. SHA-256's block size is 64 bytes. A key longer than 64 bytes is first replaced by its SHA-256 digest; then the key is padded with zero bytes to 64. The tag is H((K ⊕ opad) ‖ H((K ⊕ ipad) ‖ msg)), where ipad is 64 bytes of 0x36 and opad 64 bytes of 0x5c.</li>\n<li><code>verify(key, msg, tag)</code> returns whether <code>tag</code> is the right tag, comparing in constant time: look at every byte whatever happens, for example by OR-ing together the XORs of corresponding bytes. A tag of the wrong length is simply wrong.</li></ul>",
   "starter": "import hashlib\n\ndef my_hmac(key, msg):\n    return hashlib.sha256(key + msg).digest()\n\ndef verify(key, msg, tag):\n    return my_hmac(key, msg) == tag\n",
   "hint": "<p><code>bytes(b ^ 0x36 for b in k)</code> gives K ⊕ ipad once <code>k</code> is padded with <code>k + bytes(64 - len(k))</code>. For <code>verify</code>, start <code>diff = 0</code> and do <code>diff |= x ^ y</code> for each pair; the tags match when <code>diff == 0</code>.</p>",
   "solution": "import hashlib\n\ndef my_hmac(key, msg):\n    if len(key) > 64:\n        key = hashlib.sha256(key).digest()\n    key = key + bytes(64 - len(key))\n    inner = hashlib.sha256(bytes(b ^ 0x36 for b in key) + msg).digest()\n    return hashlib.sha256(bytes(b ^ 0x5c for b in key) + inner).digest()\n\ndef verify(key, msg, tag):\n    good = my_hmac(key, msg)\n    if len(tag) != len(good):\n        return False\n    diff = 0\n    for x, y in zip(good, tag):\n        diff |= x ^ y\n    return diff == 0\n",
   "tests": [
    {
     "label": "RFC 4231 test case 2",
     "call": "my_hmac(b'Jefe', b'what do ya want for nothing?').hex()",
     "expect": "'5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843'"
    },
    {
     "label": "Matches the hmac module, short and long keys",
     "type": "assert",
     "code": "import hmac, hashlib\nfor key in [b\"\", b\"k\", b\"x\" * 64, b\"y\" * 65, bytes(range(200))]:\n    for msg in [b\"\", b\"hello\", b\"m\" * 1000]:\n        assert my_hmac(key, msg) == hmac.new(key, msg, hashlib.sha256).digest(), (len(key), len(msg))\n"
    },
    {
     "label": "Verification",
     "type": "assert",
     "code": "t = my_hmac(b\"key\", b\"pay ana 10\")\nassert verify(b\"key\", b\"pay ana 10\", t)\nassert not verify(b\"key\", b\"pay ana 1000\", t)\nassert not verify(b\"key\", b\"pay ana 10\", t[:-1] + bytes([t[-1] ^ 1]))\nassert not verify(b\"key\", b\"pay ana 10\", t[:16])\n"
    },
    {
     "label": "Doesn't use the hmac module",
     "type": "source",
     "code": "assert \"import hmac\" not in __source__ and \"from hmac\" not in __source__, \"build HMAC yourself from hashlib\"\n"
    }
   ]
  },
  {
   "id": "password_store",
   "title": "Storing passwords",
   "prompt": "<p>The Python on this site, which runs in your browser, has no <code>hashlib.pbkdf2_hmac</code>, so build PBKDF2-HMAC-SHA256 from the <code>hmac</code> module, then use it to store passwords.</p>\n<ul><li><code>pbkdf2(password, salt, iterations, dklen=32)</code> (bytes in, bytes out). For block number <em>i</em> = 1, 2, …: U<sub>1</sub> = HMAC(password, salt ‖ <em>i</em> as 4 big-endian bytes), U<sub>j</sub> = HMAC(password, U<sub>j−1</sub>), and the block is U<sub>1</sub> ⊕ U<sub>2</sub> ⊕ … ⊕ U<sub>iterations</sub>. Concatenate blocks and keep the first <code>dklen</code> bytes. HMAC here is HMAC-SHA256 with the password as the key.</li>\n<li><code>hash_password(password, iterations=600_000)</code> takes a <code>str</code>, makes a fresh 16-byte salt with <code>secrets.token_bytes</code>, and returns the string <code>\"pbkdf2_sha256$&lt;iterations&gt;$&lt;salt hex&gt;$&lt;hash hex&gt;\"</code>, the password encoded as UTF-8. The default is the notes' recommended 600,000 iterations; the tests pass small counts so that this pure-Python PBKDF2 runs quickly.</li>\n<li><code>check_password(password, stored)</code> parses that string, recomputes with the stored salt and iteration count, and compares with <code>hmac.compare_digest</code>. It returns <code>False</code> (not an exception) for a stored string that doesn't have four <code>$</code>-separated fields starting with <code>pbkdf2_sha256</code>.</li></ul>",
   "starter": "import hmac, hashlib, secrets\n\ndef pbkdf2(password, salt, iterations, dklen=32):\n    pass\n\ndef hash_password(password, iterations=600_000):\n    pass\n\ndef check_password(password, stored):\n    pass\n",
   "hint": "<p>Make one keyed object and copy it: <code>base = hmac.new(password, digestmod=hashlib.sha256)</code>, then for each U, <code>h = base.copy(); h.update(u); u = h.digest()</code>. XOR running blocks as integers: <code>int.from_bytes(u, \"big\")</code>. Use <code>stored.split(\"$\")</code> and check the length before indexing.</p>",
   "solution": "import hmac, hashlib, secrets\n\ndef pbkdf2(password, salt, iterations, dklen=32):\n    base = hmac.new(password, digestmod=hashlib.sha256)\n    out = b\"\"\n    i = 1\n    while len(out) < dklen:\n        h = base.copy(); h.update(salt + i.to_bytes(4, \"big\")); u = h.digest()\n        acc = int.from_bytes(u, \"big\")\n        for _ in range(iterations - 1):\n            h = base.copy(); h.update(u); u = h.digest()\n            acc ^= int.from_bytes(u, \"big\")\n        out += acc.to_bytes(32, \"big\")\n        i += 1\n    return out[:dklen]\n\ndef hash_password(password, iterations=600_000):\n    salt = secrets.token_bytes(16)\n    dk = pbkdf2(password.encode(\"utf-8\"), salt, iterations)\n    return f\"pbkdf2_sha256${iterations}${salt.hex()}${dk.hex()}\"\n\ndef check_password(password, stored):\n    parts = stored.split(\"$\")\n    if len(parts) != 4 or parts[0] != \"pbkdf2_sha256\":\n        return False\n    try:\n        iterations, salt, want = int(parts[1]), bytes.fromhex(parts[2]), bytes.fromhex(parts[3])\n    except ValueError:\n        return False\n    got = pbkdf2(password.encode(\"utf-8\"), salt, iterations, len(want))\n    return hmac.compare_digest(got, want)\n",
   "tests": [
    {
     "label": "PBKDF2 test vector (1 iteration)",
     "call": "pbkdf2(b'password', b'salt', 1).hex()",
     "expect": "'120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b'"
    },
    {
     "label": "PBKDF2 with 2 and 4096 iterations, and 40 bytes",
     "type": "assert",
     "code": "assert pbkdf2(b\"password\", b\"salt\", 2).hex() == \"ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43\"\nassert pbkdf2(b\"password\", b\"salt\", 4096).hex() == \"c5e478d59288c841aa530db6845c4c8d962893a001ce4e11a4963873aa98134a\"\nassert pbkdf2(b\"passwordPASSWORDpassword\", b\"saltSALTsaltSALTsaltSALTsaltSALTsalt\", 10, 40).hex() == \"d554392e99ad21a603556fc79294d5326f60b138e5b5c3139a0e172fff5fce0fb60c6d0a50634cdf\"\n"
    },
    {
     "label": "Store and check",
     "type": "assert",
     "code": "s = hash_password(\"correct horse\", iterations=1000)\nparts = s.split(\"$\")\nassert len(parts) == 4 and parts[0] == \"pbkdf2_sha256\" and parts[1] == \"1000\", s\nassert len(parts[2]) == 32 and len(parts[3]) == 64, \"16-byte salt and 32-byte hash, in hex\"\nassert \"correct\" not in s\nassert check_password(\"correct horse\", s)\nassert not check_password(\"correct horsf\", s)\n"
    },
    {
     "label": "Each hash gets its own salt",
     "type": "assert",
     "code": "a, b = hash_password(\"same\", iterations=500), hash_password(\"same\", iterations=500)\nassert a != b, \"two users with the same password must get different stored strings\"\nassert check_password(\"same\", a) and check_password(\"same\", b)\n"
    },
    {
     "label": "Garbage stored strings fail closed",
     "type": "assert",
     "code": "for bad in [\"\", \"plaintext\", \"md5$1$00$00\", \"pbkdf2_sha256$x$00$00\", \"pbkdf2_sha256$1$zz$00\", \"pbkdf2_sha256$1$00\"]:\n    assert check_password(\"x\", bad) is False, bad\n"
    }
   ]
  }
 ],
 "sc4": [
  {
   "id": "toy_dh",
   "title": "Toy Diffie–Hellman",
   "prompt": "<p>Diffie–Hellman with numbers small enough to watch. (Real groups have 2048-bit primes or elliptic curves, and real code uses a vetted library.)</p>\n<ul><li><code>public_key(p, g, secret)</code> returns <em>g</em><sup>secret</sup> mod <em>p</em>.</li>\n<li><code>shared_key(p, their_public, my_secret)</code> first validates <code>their_public</code>: it must satisfy 2 ≤ <em>y</em> ≤ <em>p</em> − 2, or raise <code>ValueError</code> (0, 1 and <em>p</em> − 1 would force the shared secret into a tiny set of values). Then it returns the 32-byte SHA-256 digest of the shared secret <code>their_public ** my_secret mod p</code>, written as a decimal string encoded in ASCII. (Hashing turns the group element into a uniform-looking key.)</li>\n<li><code>discrete_log(p, g, y)</code> finds the smallest <em>x</em> ≥ 0 with <em>g</em><sup><em>x</em></sup> mod <em>p</em> = <em>y</em> by trying every <em>x</em> up to <em>p</em> − 2, or returns <code>None</code>. This is how an eavesdropper breaks DH with a small prime, and why primes must be huge.</li></ul>",
   "starter": "import hashlib\n\ndef public_key(p, g, secret):\n    pass\n\ndef shared_key(p, their_public, my_secret):\n    pass\n\ndef discrete_log(p, g, y):\n    pass\n",
   "hint": "<p>Use <code>pow(g, x, p)</code>. In <code>discrete_log</code>, keep a running value <code>v</code>, multiplying by <code>g</code> mod <code>p</code> each step, rather than calling <code>pow</code> each time. <code>str(s).encode()</code> turns the number into bytes.</p>",
   "solution": "import hashlib\n\ndef public_key(p, g, secret):\n    return pow(g, secret, p)\n\ndef shared_key(p, their_public, my_secret):\n    if not 2 <= their_public <= p - 2:\n        raise ValueError(\"invalid public value\")\n    s = pow(their_public, my_secret, p)\n    return hashlib.sha256(str(s).encode()).digest()\n\ndef discrete_log(p, g, y):\n    v = 1\n    for x in range(p - 1):\n        if v == y % p:\n            return x\n        v = v * g % p\n    return None\n",
   "tests": [
    {
     "label": "The notes' example",
     "call": "(public_key(23, 5, 6), public_key(23, 5, 15))",
     "expect": "(8, 19)"
    },
    {
     "label": "Both sides derive the same key",
     "type": "assert",
     "code": "import hashlib\np, g = 2_147_483_647, 7\na, b = 1_234_567, 7_654_321\nA, B = public_key(p, g, a), public_key(p, g, b)\nk1, k2 = shared_key(p, B, a), shared_key(p, A, b)\nassert k1 == k2 and len(k1) == 32\nassert k1 == hashlib.sha256(str(pow(g, a * b, p)).encode()).digest()\n"
    },
    {
     "label": "Bad public values are rejected",
     "type": "assert",
     "code": "for y in [0, 1, 22, 23, -5]:\n    try:\n        shared_key(23, y, 6)\n    except ValueError:\n        continue\n    raise AssertionError(f\"accepted public value {y}\")\n"
    },
    {
     "label": "An eavesdropper breaks a small prime",
     "type": "assert",
     "code": "assert discrete_log(23, 5, 8) == 6\nassert discrete_log(23, 5, 1) == 0\np, g = 10007, 5\nx = discrete_log(p, g, pow(g, 4321, p))\nassert pow(g, x, p) == pow(g, 4321, p)\nassert discrete_log(7, 2, 3) is None\n"
    }
   ]
  },
  {
   "id": "rsa_signatures",
   "title": "RSA signatures, toy-sized",
   "prompt": "<p>Sign and verify with RSA (MATH 121 Lesson 5), with primes small enough to check by hand. A real system uses 2048-bit keys, a padding scheme such as RSA-PSS, and a vetted library.</p>\n<ul><li><code>make_key(p, q, e)</code> returns <code>(n, d)</code>, where <em>n</em> = <em>pq</em> and <em>d</em> = <em>e</em><sup>−1</sup> mod (<em>p</em> − 1)(<em>q</em> − 1). Raise <code>ValueError</code> if that inverse doesn't exist.</li>\n<li><code>digest_int(msg, n)</code>: SHA-256 of the bytes <code>msg</code>, read as a big-endian integer, mod <em>n</em>. (With a real key, the hash is smaller than <em>n</em>; a toy <em>n</em> forces the reduction.)</li>\n<li><code>sign(msg, n, d)</code> returns <code>digest_int(msg, n) ** d mod n</code>; <code>verify(msg, sig, n, e)</code> returns whether <code>sig ** e mod n == digest_int(msg, n)</code>.</li>\n<li><code>textbook_forgery(s1, s2, n)</code>: with <em>textbook</em> RSA, where the signature on a number <em>m</em> is just <em>m</em><sup><em>d</em></sup> mod <em>n</em> with no hash, return a valid signature on <em>m</em><sub>1</sub><em>m</em><sub>2</sub> mod <em>n</em> made from the signatures <em>s</em><sub>1</sub> on <em>m</em><sub>1</sub> and <em>s</em><sub>2</sub> on <em>m</em><sub>2</sub>, without knowing <em>d</em>.</li></ul>",
   "starter": "import hashlib\n\ndef make_key(p, q, e):\n    pass\n\ndef digest_int(msg, n):\n    pass\n\ndef sign(msg, n, d):\n    pass\n\ndef verify(msg, sig, n, e):\n    pass\n\ndef textbook_forgery(s1, s2, n):\n    pass\n",
   "hint": "<p><code>pow(e, -1, phi)</code> raises <code>ValueError</code> by itself when no inverse exists. The forgery: (<em>m</em><sub>1</sub><em>m</em><sub>2</sub>)<sup><em>d</em></sup> = <em>m</em><sub>1</sub><sup><em>d</em></sup> <em>m</em><sub>2</sub><sup><em>d</em></sup>.</p>",
   "solution": "import hashlib\n\ndef make_key(p, q, e):\n    n, phi = p * q, (p - 1) * (q - 1)\n    return n, pow(e, -1, phi)\n\ndef digest_int(msg, n):\n    return int.from_bytes(hashlib.sha256(msg).digest(), \"big\") % n\n\ndef sign(msg, n, d):\n    return pow(digest_int(msg, n), d, n)\n\ndef verify(msg, sig, n, e):\n    return pow(sig, e, n) == digest_int(msg, n)\n\ndef textbook_forgery(s1, s2, n):\n    return s1 * s2 % n\n",
   "tests": [
    {
     "label": "MATH 121's key",
     "call": "make_key(61, 53, 17)",
     "expect": "(3233, 2753)"
    },
    {
     "label": "No inverse",
     "type": "raises",
     "call": "make_key(61, 53, 3 * 5)",
     "error": "ValueError"
    },
    {
     "label": "Sign and verify",
     "type": "assert",
     "code": "n, d = make_key(1009, 1013, 65537)\ns = sign(b\"transfer 10 to ana\", n, d)\nassert verify(b\"transfer 10 to ana\", s, n, 65537)\nassert not verify(b\"transfer 10 to ana\", (s + 1) % n, n, 65537)\nassert digest_int(b\"x\", n) == int.from_bytes(__import__(\"hashlib\").sha256(b\"x\").digest(), \"big\") % n\n"
    },
    {
     "label": "Textbook RSA is malleable",
     "type": "assert",
     "code": "n, e, d = 3233, 17, 2753\nm1, m2 = 12, 101\ns1, s2 = pow(m1, d, n), pow(m2, d, n)\nf = textbook_forgery(s1, s2, n)\nassert pow(f, e, n) == m1 * m2 % n, \"the forged signature should verify for m1*m2 under textbook RSA\"\n"
    },
    {
     "label": "Changing the message breaks the signature",
     "hidden": true,
     "type": "assert",
     "code": "n, d = make_key(104729, 1299709, 65537)\nmsgs = [b\"a\", b\"b\", b\"pay 1\", b\"pay 9\"]\nsigs = [sign(m, n, d) for m in msgs]\nfor i, m in enumerate(msgs):\n    for j, s in enumerate(sigs):\n        assert verify(m, s, n, 65537) == (i == j)\n"
    }
   ]
  }
 ],
 "sc5": [
  {
   "id": "stack_frame",
   "title": "A simulated stack frame",
   "prompt": "<p>Simulate a simplified version of the notes' frame for a C function with <code>char buf[16]</code>, leaving out the saved %rbp and the padding: 32 bytes of memory, where bytes 0–15 are <code>buf</code>, bytes 16–23 hold a canary and bytes 24–31 a return address (8 bytes, little-endian, as on x86-64). Write a class <code>Frame</code>:</p>\n<ul><li><code>Frame(canary, ret)</code>: <code>self.mem</code> is a <code>bytearray</code> of 32 bytes: zeros in <code>buf</code>, then <code>canary</code> (8 bytes) and <code>ret.to_bytes(8, \"little\")</code>.</li>\n<li><code>unsafe_copy(data)</code>: what <code>strcpy</code> or <code>gets</code> does: copy <code>data</code> followed by a 0 byte into memory starting at offset 0, with no length check, stopping only at the end of the 32 bytes (the simulation can't write beyond them).</li>\n<li><code>safe_copy(data)</code>: what <code>fgets(buf, 16, …)</code> does: copy at most 15 bytes of <code>data</code>, then a 0 byte; return the number of bytes of <code>data</code> copied.</li>\n<li><code>canary_ok()</code>: whether the canary bytes are unchanged; <code>return_address()</code>: the current return address, as an integer.</li>\n<li><code>ret_check()</code>: what the code the compiler adds before <code>ret</code> does: raise <code>RuntimeError(\"stack smashing detected\")</code> if the canary changed, else return <code>return_address()</code>.</li></ul>",
   "starter": "class Frame:\n    def __init__(self, canary, ret):\n        self.mem = bytearray(32)\n\n    def unsafe_copy(self, data):\n        pass\n\n    def safe_copy(self, data):\n        pass\n\n    def canary_ok(self):\n        return True\n\n    def return_address(self):\n        return 0\n\n    def ret_check(self):\n        return self.return_address()\n",
   "hint": "<p>Keep the original canary in an attribute. For <code>unsafe_copy</code>, build <code>src = data + b\"\\0\"</code> and copy <code>src[:32]</code> into <code>self.mem[0:len(...)]</code>. <code>int.from_bytes(self.mem[24:32], \"little\")</code> reads the return address.</p>",
   "solution": "class Frame:\n    def __init__(self, canary, ret):\n        self.canary = bytes(canary)\n        self.mem = bytearray(16) + bytearray(self.canary) + bytearray(ret.to_bytes(8, \"little\"))\n\n    def unsafe_copy(self, data):\n        src = (bytes(data) + b\"\\0\")[:32]\n        self.mem[0:len(src)] = src\n\n    def safe_copy(self, data):\n        n = min(len(data), 15)\n        self.mem[0:n + 1] = bytes(data[:n]) + b\"\\0\"\n        return n\n\n    def canary_ok(self):\n        return bytes(self.mem[16:24]) == self.canary\n\n    def return_address(self):\n        return int.from_bytes(self.mem[24:32], \"little\")\n\n    def ret_check(self):\n        if not self.canary_ok():\n            raise RuntimeError(\"stack smashing detected\")\n        return self.return_address()\n",
   "tests": [
    {
     "label": "Layout",
     "type": "assert",
     "code": "f = Frame(b\"\\x00\\xa1\\xb2\\xc3\\xd4\\xe5\\xf6\\x07\", 0x401136)\nassert len(f.mem) == 32 and f.mem[:16] == bytearray(16)\nassert f.mem[24:32] == bytearray(b\"\\x36\\x11\\x40\\x00\\x00\\x00\\x00\\x00\")\nassert f.canary_ok() and f.return_address() == 0x401136 and f.ret_check() == 0x401136\n"
    },
    {
     "label": "A short copy is harmless",
     "type": "assert",
     "code": "f = Frame(b\"CANARY!!\", 0x401136)\nf.unsafe_copy(b\"ana\")\nassert f.mem[:4] == bytearray(b\"ana\\0\") and f.canary_ok() and f.ret_check() == 0x401136\n"
    },
    {
     "label": "A long copy smashes the canary and the return address",
     "type": "assert",
     "code": "f = Frame(b\"CANARY!!\", 0x401136)\nf.unsafe_copy(b\"A\" * 31)\nassert not f.canary_ok()\nassert f.return_address() == 0x0041414141414141, hex(f.return_address())\ntry:\n    f.ret_check()\nexcept RuntimeError as e:\n    assert \"stack smashing\" in str(e)\nelse:\n    raise AssertionError(\"ret_check should detect the changed canary\")\n"
    },
    {
     "label": "Exactly 15 bytes fit; 16 reach the canary",
     "type": "assert",
     "code": "f = Frame(b\"\\x00CANARY!\", 7)\nf.unsafe_copy(b\"x\" * 15)\nassert f.canary_ok()\nf.unsafe_copy(b\"x\" * 16)\nassert f.canary_ok(), \"the terminator lands on the canary's first byte, which is 0 here\"\nf.unsafe_copy(b\"x\" * 17)\nassert not f.canary_ok()\n"
    },
    {
     "label": "fgets-style copy truncates",
     "type": "assert",
     "code": "f = Frame(b\"CANARY!!\", 0x401136)\nassert f.safe_copy(b\"B\" * 100) == 15\nassert f.mem[:16] == bytearray(b\"B\" * 15 + b\"\\0\") and f.canary_ok() and f.ret_check() == 0x401136\nassert f.safe_copy(b\"hi\") == 2 and f.mem[:3] == bytearray(b\"hi\\0\")\n"
    }
   ]
  },
  {
   "id": "checked_sizes",
   "title": "Integer overflow in size checks",
   "prompt": "<p>C code that computes a buffer size can overflow and pass a check it should fail (the notes' section on integer overflow). Simulate 32-bit unsigned arithmetic in Python and write safe versions.</p>\n<ul><li><code>u32(x)</code>: <code>x</code> wrapped to 32 bits (x mod 2<sup>32</sup>).</li>\n<li><code>naive_fits(length, header, limit)</code>: what the C check <code>if (length + header &lt;= limit)</code> computes when all three are <code>uint32_t</code>: wrap the sum, then compare.</li>\n<li><code>safe_fits(length, header, limit)</code>: the correct answer to \"is length + header at most limit?\", written as C would have to write it, without computing a sum that can overflow: compare <code>length</code> with <code>limit - header</code>, after checking <code>header &lt;= limit</code>.</li>\n<li><code>alloc_size(count, size)</code>: the number of bytes for <code>count</code> items of <code>size</code> bytes each, as <code>calloc</code> must compute it: raise <code>OverflowError</code> if the product doesn't fit in 32 bits (that is, is at least 2<sup>32</sup>), else return it. All arguments are integers from 0 to 2<sup>32</sup> − 1.</li></ul>",
   "starter": "def u32(x):\n    return x\n\ndef naive_fits(length, header, limit):\n    return length + header <= limit\n\ndef safe_fits(length, header, limit):\n    return length + header <= limit\n\ndef alloc_size(count, size):\n    return count * size\n",
   "hint": "<p><code>x &amp; 0xFFFFFFFF</code> or <code>x % 2**32</code> wraps. For <code>alloc_size</code>, C would test <code>size != 0 &amp;&amp; count &gt; UINT32_MAX / size</code>; in Python you may also just compare the exact product with 2<sup>32</sup>.</p>",
   "solution": "MASK = 0xFFFFFFFF\n\ndef u32(x):\n    return x & MASK\n\ndef naive_fits(length, header, limit):\n    return u32(length + header) <= limit\n\ndef safe_fits(length, header, limit):\n    return header <= limit and length <= limit - header\n\ndef alloc_size(count, size):\n    if size != 0 and count > MASK // size:\n        raise OverflowError(\"allocation size overflows 32 bits\")\n    return count * size\n",
   "tests": [
    {
     "label": "Wrapping",
     "call": "(u32(2**32), u32(2**32 + 5), u32(-1), u32(123))",
     "expect": "(0, 5, 4294967295, 123)"
    },
    {
     "label": "The naive check is fooled",
     "call": "(naive_fits(4294967290, 16, 4096), naive_fits(100, 16, 4096), naive_fits(5000, 16, 4096))",
     "expect": "(True, True, False)"
    },
    {
     "label": "The safe check is not",
     "call": "(safe_fits(4294967290, 16, 4096), safe_fits(100, 16, 4096), safe_fits(4080, 16, 4096), safe_fits(4081, 16, 4096), safe_fits(0, 5000, 4096))",
     "expect": "(False, True, True, False, False)"
    },
    {
     "label": "Allocation sizes",
     "call": "(alloc_size(1000, 4), alloc_size(0, 2**31), alloc_size(65536, 65535))",
     "expect": "(4000, 0, 4294901760)"
    },
    {
     "label": "Overflowing allocation",
     "type": "raises",
     "call": "alloc_size(65536, 65536)",
     "error": "OverflowError"
    },
    {
     "label": "Agrees with exact arithmetic",
     "hidden": true,
     "type": "assert",
     "code": "import random\nr = random.Random(5)\nfor _ in range(3000):\n    a, b, c = (r.choice([r.randrange(2**32), r.randrange(70000), 2**32 - 1 - r.randrange(100)]) for _ in range(3))\n    assert safe_fits(a, b, c) == (a + b <= c), (a, b, c)\n    try:\n        got = alloc_size(a, b)\n        assert a * b < 2**32 and got == a * b\n    except OverflowError:\n        assert a * b >= 2**32\n"
    }
   ]
  }
 ],
 "sc6": [
  {
   "id": "fix_injection",
   "title": "Fixing SQL injection",
   "prompt": "<p>An online shop has a table <code>products(id, name, price, hidden)</code> and a table <code>reviews(id, author, body)</code>. Its search was written like this:</p>\n<pre data-label=\"Vulnerable\"><code>def search(db, term, sort):\n    q = (\"SELECT id, name, price FROM products WHERE hidden = 0 AND name LIKE '%\" + term +\n         \"%' ORDER BY \" + sort)\n    return db.execute(q).fetchall()</code></pre>\n<p>Rewrite it, and add two review functions, so that no input can change any query's structure.</p>\n<ul><li><code>search(db, term, sort=\"name\")</code>: the visible products whose name contains <code>term</code> as a literal substring, case-insensitively as <code>LIKE</code> does, as <code>(id, name, price)</code> rows. <code>sort</code> is one of <code>\"name\"</code>, <code>\"price\"</code> or <code>\"-price\"</code> (highest first); anything else raises <code>ValueError</code>. Ties break by <code>id</code>. Because <code>%</code> and <code>_</code> are <code>LIKE</code> wildcards, escape them (and the escape character itself) in <code>term</code> and add <code>ESCAPE '\\'</code> to the query.</li>\n<li><code>add_review(db, author, body)</code> inserts a review; <code>reviews_by(db, author)</code> returns the bodies by that author, in insertion (id) order. Stored text is still untrusted when it's read back: <code>reviews_by</code> must also use a parameter.</li></ul>",
   "starter": "def search(db, term, sort=\"name\"):\n    q = (\"SELECT id, name, price FROM products WHERE hidden = 0 AND name LIKE '%\" + term +\n         \"%' ORDER BY \" + sort)\n    return db.execute(q).fetchall()\n\ndef add_review(db, author, body):\n    db.execute(\"INSERT INTO reviews (author, body) VALUES ('\" + author + \"', '\" + body + \"')\")\n\ndef reviews_by(db, author):\n    return [r[0] for r in db.execute(\"SELECT body FROM reviews WHERE author = '\" + author + \"' ORDER BY id\")]\n",
   "hint": "<p>Map each allowed <code>sort</code> to a fixed piece of SQL in a dict, such as <code>{\"price\": \"price, id\"}</code>. Escape with <code>term.replace(\"\\\\\", \"\\\\\\\\\").replace(\"%\", \"\\\\%\").replace(\"_\", \"\\\\_\")</code>, then pass <code>\"%\" + escaped + \"%\"</code> as the parameter.</p>",
   "solution": "ORDERS = {\"name\": \"name, id\", \"price\": \"price, id\", \"-price\": \"price DESC, id\"}\n\ndef search(db, term, sort=\"name\"):\n    if sort not in ORDERS:\n        raise ValueError(\"unknown sort order\")\n    esc = term.replace(\"\\\\\", \"\\\\\\\\\").replace(\"%\", \"\\\\%\").replace(\"_\", \"\\\\_\")\n    q = (\"SELECT id, name, price FROM products WHERE hidden = 0 AND name LIKE ? ESCAPE '\\\\' ORDER BY \"\n         + ORDERS[sort])\n    pattern = \"%\" + esc + \"%\"\n    return db.execute(q, (pattern,)).fetchall()\n\ndef add_review(db, author, body):\n    db.execute(\"INSERT INTO reviews (author, body) VALUES (?, ?)\", (author, body))\n\ndef reviews_by(db, author):\n    return [r[0] for r in db.execute(\"SELECT body FROM reviews WHERE author = ? ORDER BY id\", (author,))]\n",
   "tests": [
    {
     "label": "Ordinary searches",
     "type": "assert",
     "code": "import sqlite3\ndef _shop():\n    db = sqlite3.connect(\":memory:\")\n    db.executescript(\"\"\"\nCREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, hidden INTEGER);\nCREATE TABLE users (name TEXT PRIMARY KEY, pwhash TEXT);\nCREATE TABLE reviews (id INTEGER PRIMARY KEY, author TEXT, body TEXT);\n\"\"\")\n    db.executemany(\"INSERT INTO products VALUES (?, ?, ?, ?)\", [\n        (1, \"red pen\", 1.5, 0), (2, \"blue pen\", 1.25, 0), (3, \"100% cotton bag\", 9.0, 0),\n        (4, \"pen_holder\", 4.0, 0), (5, \"staff-only pen\", 0.0, 1), (6, \"notebook\", 3.0, 0)])\n    db.executemany(\"INSERT INTO users VALUES (?, ?)\", [(\"admin\", \"h-admin\"), (\"ana\", \"h-ana\")])\n    return db\n\ndb = _shop()\nassert search(db, \"pen\") == [(2, \"blue pen\", 1.25), (4, \"pen_holder\", 4.0), (1, \"red pen\", 1.5)], search(db, \"pen\")\nassert search(db, \"PEN\", \"price\") == [(2, \"blue pen\", 1.25), (1, \"red pen\", 1.5), (4, \"pen_holder\", 4.0)]\nassert search(db, \"\", \"-price\")[0] == (3, \"100% cotton bag\", 9.0)\n"
    },
    {
     "label": "Wildcards are literal",
     "type": "assert",
     "code": "import sqlite3\ndef _shop():\n    db = sqlite3.connect(\":memory:\")\n    db.executescript(\"\"\"\nCREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, hidden INTEGER);\nCREATE TABLE users (name TEXT PRIMARY KEY, pwhash TEXT);\nCREATE TABLE reviews (id INTEGER PRIMARY KEY, author TEXT, body TEXT);\n\"\"\")\n    db.executemany(\"INSERT INTO products VALUES (?, ?, ?, ?)\", [\n        (1, \"red pen\", 1.5, 0), (2, \"blue pen\", 1.25, 0), (3, \"100% cotton bag\", 9.0, 0),\n        (4, \"pen_holder\", 4.0, 0), (5, \"staff-only pen\", 0.0, 1), (6, \"notebook\", 3.0, 0)])\n    db.executemany(\"INSERT INTO users VALUES (?, ?)\", [(\"admin\", \"h-admin\"), (\"ana\", \"h-ana\")])\n    return db\n\ndb = _shop()\nassert search(db, \"%\") == [(3, \"100% cotton bag\", 9.0)], search(db, \"%\")\nassert search(db, \"_\") == [(4, \"pen_holder\", 4.0)], search(db, \"_\")\nassert search(db, \"\\\\\") == []\n"
    },
    {
     "label": "Injection attempts find nothing extra",
     "type": "assert",
     "code": "import sqlite3\ndef _shop():\n    db = sqlite3.connect(\":memory:\")\n    db.executescript(\"\"\"\nCREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, hidden INTEGER);\nCREATE TABLE users (name TEXT PRIMARY KEY, pwhash TEXT);\nCREATE TABLE reviews (id INTEGER PRIMARY KEY, author TEXT, body TEXT);\n\"\"\")\n    db.executemany(\"INSERT INTO products VALUES (?, ?, ?, ?)\", [\n        (1, \"red pen\", 1.5, 0), (2, \"blue pen\", 1.25, 0), (3, \"100% cotton bag\", 9.0, 0),\n        (4, \"pen_holder\", 4.0, 0), (5, \"staff-only pen\", 0.0, 1), (6, \"notebook\", 3.0, 0)])\n    db.executemany(\"INSERT INTO users VALUES (?, ?)\", [(\"admin\", \"h-admin\"), (\"ana\", \"h-ana\")])\n    return db\n\ndb = _shop()\nassert search(db, \"' OR 1=1 --\") == []\nassert search(db, \"x%' UNION SELECT 0, name, pwhash FROM users --\") == []\nassert all(r[0] != 5 for r in search(db, \"pen\"))\n"
    },
    {
     "label": "Sort order is checked",
     "type": "assert",
     "code": "import sqlite3\ndef _shop():\n    db = sqlite3.connect(\":memory:\")\n    db.executescript(\"\"\"\nCREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, hidden INTEGER);\nCREATE TABLE users (name TEXT PRIMARY KEY, pwhash TEXT);\nCREATE TABLE reviews (id INTEGER PRIMARY KEY, author TEXT, body TEXT);\n\"\"\")\n    db.executemany(\"INSERT INTO products VALUES (?, ?, ?, ?)\", [\n        (1, \"red pen\", 1.5, 0), (2, \"blue pen\", 1.25, 0), (3, \"100% cotton bag\", 9.0, 0),\n        (4, \"pen_holder\", 4.0, 0), (5, \"staff-only pen\", 0.0, 1), (6, \"notebook\", 3.0, 0)])\n    db.executemany(\"INSERT INTO users VALUES (?, ?)\", [(\"admin\", \"h-admin\"), (\"ana\", \"h-ana\")])\n    return db\n\ndb = _shop()\nfor bad in [\"id\", \"price; DROP TABLE products\", \"(SELECT pwhash FROM users)\", \"\"]:\n    try:\n        search(db, \"pen\", bad)\n    except ValueError:\n        continue\n    raise AssertionError(\"accepted sort \" + repr(bad))\nassert len(db.execute(\"SELECT * FROM products\").fetchall()) == 6\n"
    },
    {
     "label": "Reviews survive hostile text",
     "type": "assert",
     "code": "import sqlite3\ndef _shop():\n    db = sqlite3.connect(\":memory:\")\n    db.executescript(\"\"\"\nCREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, hidden INTEGER);\nCREATE TABLE users (name TEXT PRIMARY KEY, pwhash TEXT);\nCREATE TABLE reviews (id INTEGER PRIMARY KEY, author TEXT, body TEXT);\n\"\"\")\n    db.executemany(\"INSERT INTO products VALUES (?, ?, ?, ?)\", [\n        (1, \"red pen\", 1.5, 0), (2, \"blue pen\", 1.25, 0), (3, \"100% cotton bag\", 9.0, 0),\n        (4, \"pen_holder\", 4.0, 0), (5, \"staff-only pen\", 0.0, 1), (6, \"notebook\", 3.0, 0)])\n    db.executemany(\"INSERT INTO users VALUES (?, ?)\", [(\"admin\", \"h-admin\"), (\"ana\", \"h-ana\")])\n    return db\n\ndb = _shop()\nevil = \"x'); DELETE FROM users; --\"\nadd_review(db, \"O'Brien\", \"Great pen, it's 'fine'\")\nadd_review(db, evil, \"spam\")\nadd_review(db, \"O'Brien\", evil)\nassert reviews_by(db, \"O'Brien\") == [\"Great pen, it's 'fine'\", evil]\nassert reviews_by(db, evil) == [\"spam\"]\nassert reviews_by(db, \"' OR '1'='1\") == []\nassert len(db.execute(\"SELECT * FROM users\").fetchall()) == 2\n"
    },
    {
     "label": "No string-built queries",
     "type": "source",
     "code": "import re\nassert not re.search(r\"execute\\([^)]*\\+\\s*(term|author|body|esc)\", __source__), \"a user value is pasted into a query\"\nassert \"f\\\"SELECT\" not in __source__ and \"f'SELECT\" not in __source__ and \"f\\\"INSERT\" not in __source__, \"don't build queries with f-strings\"\n"
    }
   ]
  },
  {
   "id": "html_escape",
   "title": "Escaping output for HTML",
   "prompt": "<p>Write the output-encoding functions a template engine needs, without the <code>html</code> module.</p>\n<ul><li><code>escape(s)</code>: replace <code>&amp;</code> with <code>&amp;amp;</code>, <code>&lt;</code> with <code>&amp;lt;</code>, <code>&gt;</code> with <code>&amp;gt;</code>, <code>\"</code> with <code>&amp;quot;</code> and <code>'</code> with <code>&amp;#x27;</code>. The result is safe inside element text and inside a quoted attribute value.</li>\n<li><code>safe_url(url)</code>: links are a different context. Return <code>url</code> unchanged if, after stripping leading and trailing whitespace, it starts (case-insensitively) with <code>http://</code> or <code>https://</code>, or starts with <code>/</code> but not <code>//</code>; otherwise return <code>\"#\"</code>. This blocks <code>javascript:</code> and <code>data:</code> URLs.</li>\n<li><code>render_comment(author, text, homepage)</code> returns exactly <code>'&lt;p class=\"c\"&gt;&lt;a href=\"' + escape(safe_url(homepage)) + '\"&gt;' + escape(author) + '&lt;/a&gt;: ' + escape(text) + '&lt;/p&gt;'</code>.</li></ul>",
   "starter": "def escape(s):\n    return s\n\ndef safe_url(url):\n    return url\n\ndef render_comment(author, text, homepage):\n    return '<p class=\"c\"><a href=\"' + homepage + '\">' + author + '</a>: ' + text + '</p>'\n",
   "hint": "<p>Replace <code>&amp;</code> first; otherwise the <code>&amp;</code> in <code>&amp;lt;</code> gets escaped again. For <code>safe_url</code>, test <code>url.strip().lower()</code>.</p>",
   "solution": "def escape(s):\n    return (s.replace(\"&\", \"&amp;\").replace(\"<\", \"&lt;\").replace(\">\", \"&gt;\")\n             .replace('\"', \"&quot;\").replace(\"'\", \"&#x27;\"))\n\ndef safe_url(url):\n    u = url.strip().lower()\n    if u.startswith(\"http://\") or u.startswith(\"https://\") or (u.startswith(\"/\") and not u.startswith(\"//\")):\n        return url\n    return \"#\"\n\ndef render_comment(author, text, homepage):\n    return '<p class=\"c\"><a href=\"' + escape(safe_url(homepage)) + '\">' + escape(author) + '</a>: ' + escape(text) + '</p>'\n",
   "tests": [
    {
     "label": "Escaping",
     "call": "escape('<script>alert(\"x\") & \\'y\\'</script>')",
     "expect": "'&lt;script&gt;alert(&quot;x&quot;) &amp; &#x27;y&#x27;&lt;/script&gt;'"
    },
    {
     "label": "Ampersands aren't escaped twice",
     "call": "escape('&lt;')",
     "expect": "'&amp;lt;'"
    },
    {
     "label": "Matches html.escape",
     "type": "assert",
     "code": "import html, random\nr = random.Random(1)\nfor _ in range(300):\n    s = \"\".join(r.choice(\"ab<>&\\\"' é\\n\") for _ in range(r.randrange(20)))\n    assert escape(s) == html.escape(s), s\n"
    },
    {
     "label": "URL schemes",
     "type": "assert",
     "code": "ok = [\"https://example.com/a?b=1\", \"HTTP://x.org\", \"/profile/7\", \"  https://pad.example  \"]\nbad = [\"javascript:alert(1)\", \" JavaScript:alert(1)\", \"data:text/html,hi\", \"//evil.example/x\", \"vbscript:x\", \"\", \"ftp://x\"]\nfor u in ok: assert safe_url(u) == u, u\nfor u in bad: assert safe_url(u) == \"#\", u\n"
    },
    {
     "label": "Rendering a hostile comment",
     "type": "assert",
     "code": "got = render_comment(\"<b>eve</b>\", \"<img src=x onerror=alert(1)>\", 'javascript:alert(1)')\nassert got == '<p class=\"c\"><a href=\"#\">&lt;b&gt;eve&lt;/b&gt;</a>: &lt;img src=x onerror=alert(1)&gt;</p>', got\ngot = render_comment(\"ana\", \"hi\", 'https://a.example/?q=\"><script>')\nassert got == '<p class=\"c\"><a href=\"https://a.example/?q=&quot;&gt;&lt;script&gt;\">ana</a>: hi</p>', got\n"
    },
    {
     "label": "Doesn't use the html module",
     "type": "source",
     "code": "assert \"import html\" not in __source__ and \"from html\" not in __source__, \"write the escaping yourself\"\n"
    }
   ]
  }
 ],
 "sc7": [
  {
   "id": "unix_perms",
   "title": "Checking Unix permissions",
   "prompt": "<p>Implement the kernel's permission check (CS 310 Lessons 1 and 7) for a toy file system.</p>\n<ul><li><code>allowed(uid, gids, inode, want)</code>: <code>inode</code> is a dict with <code>\"uid\"</code>, <code>\"gid\"</code> and <code>\"mode\"</code> (an integer such as <code>0o640</code>); <code>want</code> is a string of letters from <code>\"rwx\"</code>. The rules: uid 0 (root) may always read and write, and may execute only if at least one of the three x bits is set. Otherwise choose exactly <em>one</em> class: owner if <code>uid == inode[\"uid\"]</code>, else group if <code>inode[\"gid\"]</code> is in <code>gids</code>, else other; and allow only if that class's bits include every wanted letter. (The owner of a file with mode <code>0o070</code> may not read it, even though the group may.)</li>\n<li><code>can_open(fs, path, uid, gids, want)</code>: <code>fs</code> maps absolute paths to inodes; directories have <code>\"dir\": True</code>. Opening <code>/a/b/f</code> needs x (search) on <code>/</code>, <code>/a</code> and <code>/a/b</code>, then <code>want</code> on <code>/a/b/f</code> itself. Return <code>False</code> if any of those paths is missing from <code>fs</code>.</li></ul>",
   "starter": "def allowed(uid, gids, inode, want):\n    return True\n\ndef can_open(fs, path, uid, gids, want):\n    return True\n",
   "hint": "<p>The owner's bits are <code>(mode &gt;&gt; 6) &amp; 7</code>, the group's <code>(mode &gt;&gt; 3) &amp; 7</code>, the others' <code>mode &amp; 7</code>; within a digit, r = 4, w = 2, x = 1. The directories on the way to <code>/a/b/f</code> are <code>/</code>, then <code>\"/\" + \"/\".join(parts[:i])</code> for each prefix of the path's parts.</p>",
   "solution": "BITS = {\"r\": 4, \"w\": 2, \"x\": 1}\n\ndef allowed(uid, gids, inode, want):\n    mode = inode[\"mode\"]\n    if uid == 0:\n        return \"x\" not in want or bool(mode & 0o111)\n    if uid == inode[\"uid\"]:\n        bits = (mode >> 6) & 7\n    elif inode[\"gid\"] in gids:\n        bits = (mode >> 3) & 7\n    else:\n        bits = mode & 7\n    return all(bits & BITS[c] for c in want)\n\ndef can_open(fs, path, uid, gids, want):\n    parts = [p for p in path.split(\"/\") if p]\n    dirs = [\"/\"] + [\"/\" + \"/\".join(parts[:i]) for i in range(1, len(parts))]\n    for d in dirs:\n        if d not in fs or not allowed(uid, gids, fs[d], \"x\"):\n            return False\n    return path in fs and allowed(uid, gids, fs[path], want)\n",
   "tests": [
    {
     "label": "Owner, group and other",
     "type": "assert",
     "code": "f = {\"uid\": 1000, \"gid\": 50, \"mode\": 0o640}\nassert allowed(1000, [1000], f, \"rw\") and not allowed(1000, [1000], f, \"x\")\nassert allowed(1001, [50], f, \"r\") and not allowed(1001, [50], f, \"w\")\nassert not allowed(1002, [60], f, \"r\")\n"
    },
    {
     "label": "Only one class applies",
     "type": "assert",
     "code": "f = {\"uid\": 1000, \"gid\": 50, \"mode\": 0o074}\nassert not allowed(1000, [50], f, \"r\"), \"the owner gets the owner bits only\"\nassert allowed(1001, [50], f, \"rwx\") and allowed(1002, [], f, \"r\")\n"
    },
    {
     "label": "Root",
     "type": "assert",
     "code": "assert allowed(0, [0], {\"uid\": 5, \"gid\": 5, \"mode\": 0o000}, \"rw\")\nassert not allowed(0, [0], {\"uid\": 5, \"gid\": 5, \"mode\": 0o666}, \"x\")\nassert allowed(0, [0], {\"uid\": 5, \"gid\": 5, \"mode\": 0o100}, \"x\")\n"
    },
    {
     "label": "Opening a path needs search on every directory",
     "type": "assert",
     "code": "fs = {\"/\": {\"uid\": 0, \"gid\": 0, \"mode\": 0o755, \"dir\": True},\n      \"/home\": {\"uid\": 0, \"gid\": 0, \"mode\": 0o755, \"dir\": True},\n      \"/home/ana\": {\"uid\": 1000, \"gid\": 1000, \"mode\": 0o700, \"dir\": True},\n      \"/home/ana/notes.txt\": {\"uid\": 1000, \"gid\": 1000, \"mode\": 0o644},\n      \"/tmp\": {\"uid\": 0, \"gid\": 0, \"mode\": 0o777, \"dir\": True},\n      \"/tmp/x\": {\"uid\": 1001, \"gid\": 1001, \"mode\": 0o600}}\nassert can_open(fs, \"/home/ana/notes.txt\", 1000, [1000], \"r\")\nassert not can_open(fs, \"/home/ana/notes.txt\", 1001, [1001], \"r\"), \"the file is 644 but /home/ana is 700\"\nassert can_open(fs, \"/home/ana/notes.txt\", 0, [0], \"w\")\nassert not can_open(fs, \"/home/ana/missing\", 1000, [1000], \"r\")\nassert can_open(fs, \"/tmp/x\", 1001, [1001], \"rw\") and not can_open(fs, \"/tmp/x\", 1000, [1000], \"r\")\nassert can_open(fs, \"/home\", 1001, [], \"r\")\n"
    }
   ]
  },
  {
   "id": "constant_time",
   "title": "Comparing secrets in constant time",
   "prompt": "<p>An ordinary comparison stops at the first differing byte, so its running time tells an attacker how much of a guess was right. Write:</p>\n<ul><li><code>leaky_equal(a, b)</code>: the ordinary early-exit comparison of two byte strings, returning <code>(result, steps)</code>, where <code>steps</code> counts the byte comparisons made (a length mismatch returns <code>(False, 0)</code>). <code>steps</code> stands in for running time.</li>\n<li><code>recover_secret(oracle, length)</code>: <code>oracle(guess)</code> returns the <code>steps</code> that <code>leaky_equal(secret, guess)</code> would take for a secret you can't see (or <code>None</code> once the guess is right). Find the secret, a byte string of the given length made of lowercase letters, one position at a time: for each position, try each letter and keep the one that makes the comparison go furthest. This shows the leak; it's the attack constant-time code defends against.</li>\n<li><code>ct_equal(a, b)</code>: a constant-time comparison: for equal-length inputs, read every byte of both whatever their contents, and decide only at the end. Different lengths return <code>False</code> (length isn't secret here). Don't use <code>hmac.compare_digest</code>: write what it does.</li></ul>",
   "starter": "def leaky_equal(a, b):\n    pass\n\ndef recover_secret(oracle, length):\n    pass\n\ndef ct_equal(a, b):\n    return a == b\n",
   "hint": "<p>In <code>recover_secret</code>, pad each guess to full length, e.g. <code>known + bytes([c]) + b\"a\" * (length - len(known) - 1)</code>. If the oracle returns <code>None</code>, the guess is the secret. In <code>ct_equal</code>, accumulate <code>diff |= x ^ y</code> over <code>zip(a, b)</code>.</p>",
   "solution": "import string\n\ndef leaky_equal(a, b):\n    if len(a) != len(b):\n        return False, 0\n    steps = 0\n    for x, y in zip(a, b):\n        steps += 1\n        if x != y:\n            return False, steps\n    return True, steps\n\ndef recover_secret(oracle, length):\n    known = b\"\"\n    letters = string.ascii_lowercase.encode()\n    for pos in range(length):\n        best, best_steps = None, -1\n        for c in letters:\n            guess = known + bytes([c]) + b\"a\" * (length - pos - 1)\n            s = oracle(guess)\n            if s is None:\n                return guess\n            if s > best_steps:\n                best, best_steps = c, s\n        known += bytes([best])\n    return known\n\ndef ct_equal(a, b):\n    if len(a) != len(b):\n        return False\n    diff = 0\n    for x, y in zip(a, b):\n        diff |= x ^ y\n    return diff == 0\n",
   "tests": [
    {
     "label": "Leaky comparison counts steps",
     "call": "(leaky_equal(b'abcd', b'abzz'), leaky_equal(b'abcd', b'abcd'), leaky_equal(b'ab', b'abc'), leaky_equal(b'xbcd', b'abcd'))",
     "expect": "((False, 3), (True, 4), (False, 0), (False, 1))"
    },
    {
     "label": "Timing reveals the secret",
     "type": "assert",
     "code": "calls = []\ndef make_oracle(secret):\n    def oracle(guess):\n        calls.append(guess)\n        same, steps = True, 0\n        for x, y in zip(secret, guess):\n            steps += 1\n            if x != y:\n                same = False\n                break\n        return None if same and len(guess) == len(secret) else steps\n    return oracle\nfor secret in [b\"hunter\", b\"zzzzzzzz\", b\"aaaa\", b\"qwertyuiop\"]:\n    calls.clear()\n    assert recover_secret(make_oracle(secret), len(secret)) == secret, secret\n    assert len(calls) <= 26 * len(secret), \"about 26 guesses per position, not 26 ** length\"\n"
    },
    {
     "label": "Constant-time comparison is correct",
     "type": "assert",
     "code": "assert ct_equal(b\"\", b\"\") and ct_equal(b\"secret\", b\"secret\")\nassert not ct_equal(b\"secret\", b\"secreT\") and not ct_equal(b\"secret\", b\"Secret\") and not ct_equal(b\"a\", b\"ab\")\n"
    },
    {
     "label": "It reads every byte, wherever the difference is",
     "type": "assert",
     "code": "class Counting(bytes):\n    reads = 0\n    def __getitem__(self, i):\n        Counting.reads += 1\n        return bytes.__getitem__(self, i)\n    def __iter__(self):\n        for i in range(len(self)):\n            Counting.reads += 1\n            yield bytes.__getitem__(self, i)\ncounts = []\nfor guess in [b\"Xbcdefgh\", b\"abcdXfgh\", b\"abcdefgX\", b\"abcdefgh\"]:\n    Counting.reads = 0\n    ct_equal(Counting(b\"abcdefgh\"), Counting(guess))\n    counts.append(Counting.reads)\nassert counts[0] > 0 and len(set(counts)) == 1, f\"bytes read depend on where the difference is: {counts}\"\n"
    },
    {
     "label": "Doesn't call compare_digest or compare whole strings",
     "type": "source",
     "code": "assert \"compare_digest\" not in __source__, \"write the comparison yourself\"\nimport ast\ntree = ast.parse(__source__)\nfn = [n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef) and n.name == \"ct_equal\"][0]\nfor n in ast.walk(fn):\n    if isinstance(n, ast.Compare) and all(isinstance(x, ast.Name) for x in [n.left] + n.comparators):\n        names = {n.left.id} | {c.id for c in n.comparators}\n        assert names != {\"a\", \"b\"}, \"a == b on the whole strings exits early\"\n"
    }
   ]
  }
 ],
 "sc8": [
  {
   "id": "firewall",
   "title": "A packet filter",
   "prompt": "<p>Write a stateless packet filter of the kind the notes describe, using the <code>ipaddress</code> module. It guards a single server, like the web server in Practice 1, so every packet's destination is that server and rules don't name one.</p>\n<ul><li>A rule is a tuple of four fields, <code>(action, proto, src, ports)</code>: <code>action</code> is <code>\"allow\"</code> or <code>\"deny\"</code>; <code>proto</code> is <code>\"tcp\"</code>, <code>\"udp\"</code> or <code>\"any\"</code>; <code>src</code> is a network in CIDR notation such as <code>\"10.0.0.0/8\"</code> (<code>\"0.0.0.0/0\"</code> matches every address); and <code>ports</code> is always a pair <code>(lo, hi)</code> of destination ports, inclusive, with <code>(0, 65535)</code> for every port. (If you are also taking CS 330, its stateful firewall problem uses a different, five-field rule format; the two are separate problems.)</li>\n<li><code>decide(rules, packet)</code>: <code>packet</code> is a dict with <code>\"proto\"</code>, <code>\"src\"</code> (an address string) and <code>\"port\"</code>. The first rule that matches decides; if none matches, return <code>\"deny\"</code> (default deny).</li>\n<li><code>shadowed(rules)</code>: the sorted list of indexes of rules that can never match any packet first because some single earlier rule covers them completely: its protocol is <code>\"any\"</code> or the same, its network contains the later rule's network, and its port range contains the later range. (Such rules are usually mistakes in a rule set.)</li></ul>",
   "starter": "import ipaddress\n\ndef decide(rules, packet):\n    return \"allow\"\n\ndef shadowed(rules):\n    return []\n",
   "hint": "<p><code>ipaddress.ip_address(s) in ipaddress.ip_network(net)</code> tests membership, and <code>net1.supernet_of(net2)</code> (true also when they're equal) tests containment.</p>",
   "solution": "import ipaddress\n\ndef _matches(rule, packet):\n    action, proto, src, (lo, hi) = rule\n    return ((proto == \"any\" or proto == packet[\"proto\"])\n            and ipaddress.ip_address(packet[\"src\"]) in ipaddress.ip_network(src)\n            and lo <= packet[\"port\"] <= hi)\n\ndef decide(rules, packet):\n    for rule in rules:\n        if _matches(rule, packet):\n            return rule[0]\n    return \"deny\"\n\ndef _covers(a, b):\n    return ((a[1] == \"any\" or a[1] == b[1])\n            and ipaddress.ip_network(a[2]).supernet_of(ipaddress.ip_network(b[2]))\n            and a[3][0] <= b[3][0] and b[3][1] <= a[3][1])\n\ndef shadowed(rules):\n    return [j for j in range(len(rules)) if any(_covers(rules[i], rules[j]) for i in range(j))]\n",
   "tests": [
    {
     "label": "First match and default deny",
     "type": "assert",
     "code": "rules = [(\"deny\", \"tcp\", \"203.0.113.0/24\", (0, 65535)),\n         (\"allow\", \"tcp\", \"0.0.0.0/0\", (443, 443)),\n         (\"allow\", \"tcp\", \"10.0.0.0/8\", (22, 22)),\n         (\"allow\", \"udp\", \"10.0.0.0/8\", (53, 53))]\nP = lambda proto, src, port: {\"proto\": proto, \"src\": src, \"port\": port}\nassert decide(rules, P(\"tcp\", \"198.51.100.7\", 443)) == \"allow\"\nassert decide(rules, P(\"tcp\", \"203.0.113.9\", 443)) == \"deny\"\nassert decide(rules, P(\"tcp\", \"10.1.2.3\", 22)) == \"allow\"\nassert decide(rules, P(\"tcp\", \"198.51.100.7\", 22)) == \"deny\"\nassert decide(rules, P(\"udp\", \"10.9.9.9\", 53)) == \"allow\" and decide(rules, P(\"tcp\", \"10.9.9.9\", 53)) == \"deny\"\nassert decide([], P(\"tcp\", \"10.0.0.1\", 80)) == \"deny\"\n"
    },
    {
     "label": "Port ranges and any",
     "type": "assert",
     "code": "rules = [(\"allow\", \"any\", \"192.168.1.0/24\", (1024, 2047))]\nassert decide(rules, {\"proto\": \"udp\", \"src\": \"192.168.1.200\", \"port\": 2047}) == \"allow\"\nassert decide(rules, {\"proto\": \"tcp\", \"src\": \"192.168.1.200\", \"port\": 2048}) == \"deny\"\nassert decide(rules, {\"proto\": \"tcp\", \"src\": \"192.168.2.1\", \"port\": 1500}) == \"deny\"\n"
    },
    {
     "label": "Shadowed rules",
     "type": "assert",
     "code": "rules = [(\"allow\", \"tcp\", \"10.0.0.0/8\", (0, 1023)),\n         (\"deny\", \"tcp\", \"10.1.0.0/16\", (22, 22)),\n         (\"deny\", \"udp\", \"10.1.0.0/16\", (22, 22)),\n         (\"allow\", \"any\", \"0.0.0.0/0\", (80, 80)),\n         (\"deny\", \"tcp\", \"10.0.0.0/8\", (80, 80)),\n         (\"deny\", \"tcp\", \"10.0.0.0/8\", (1000, 2000))]\nassert shadowed(rules) == [1, 4], shadowed(rules)\n"
    },
    {
     "label": "Identical rules shadow each other",
     "call": "shadowed([('allow', 'udp', '1.2.3.4/32', (5, 5)), ('deny', 'udp', '1.2.3.4/32', (5, 5))])",
     "expect": "[1]"
    }
   ]
  },
  {
   "id": "tiny_fuzzer",
   "title": "A tiny fuzzer",
   "prompt": "<p>Fuzzing feeds a program many mutated inputs and watches for crashes. Write:</p>\n<ul><li><code>mutate(data, rng)</code>: return a new <code>bytes</code> made by one random edit of <code>data</code>, chosen with <code>rng</code> (a <code>random.Random</code>): flip one bit of one byte, replace one byte with a random byte, insert a random byte at a random position, or delete one byte. If <code>data</code> is empty, insert.</li>\n<li><code>fuzz(target, seeds, trials, seed=0)</code>: make <code>rng = random.Random(seed)</code>. Keep a corpus, starting as a list of the seed inputs. Repeat <code>trials</code> times: pick an input from the corpus with <code>rng.choice</code>, mutate it, and call <code>target</code> on the result. If <code>target</code> raises <code>ValueError</code>, the input was rejected properly: carry on. If it raises any other exception, record a crash. If it returns normally, add the input to the corpus (it parsed, so it's a good base for more mutations). Return a dict mapping each crashing exception's type name (such as <code>\"IndexError\"</code>) to the first input that raised it.</li></ul>",
   "starter": "import random\n\ndef mutate(data, rng):\n    return data\n\ndef fuzz(target, seeds, trials, seed=0):\n    return {}\n",
   "hint": "<p>Pick the edit with <code>rng.randrange(4)</code> and a position with <code>rng.randrange(len(data))</code> (or <code>len(data) + 1</code> for insertion). Catch <code>ValueError</code> first, then <code>Exception as e</code>, and use <code>type(e).__name__</code>; <code>setdefault</code> keeps the first input.</p>",
   "solution": "import random\n\ndef mutate(data, rng):\n    data = bytearray(data)\n    op = rng.randrange(4) if data else 2\n    if op == 0:\n        i = rng.randrange(len(data)); data[i] ^= 1 << rng.randrange(8)\n    elif op == 1:\n        i = rng.randrange(len(data)); data[i] = rng.randrange(256)\n    elif op == 2:\n        data.insert(rng.randrange(len(data) + 1), rng.randrange(256))\n    else:\n        del data[rng.randrange(len(data))]\n    return bytes(data)\n\ndef fuzz(target, seeds, trials, seed=0):\n    rng = random.Random(seed)\n    corpus = list(seeds)\n    crashes = {}\n    for _ in range(trials):\n        x = mutate(rng.choice(corpus), rng)\n        try:\n            target(x)\n        except ValueError:\n            continue\n        except Exception as e:\n            crashes.setdefault(type(e).__name__, x)\n            continue\n        corpus.append(x)\n    return crashes\n",
   "tests": [
    {
     "label": "Mutations make one small edit",
     "type": "assert",
     "code": "import random\nr = random.Random(3)\ndata = b\"hello world\"\nkinds = set()\nfor _ in range(400):\n    m = mutate(data, r)\n    assert isinstance(m, bytes)\n    assert abs(len(m) - len(data)) <= 1\n    if len(m) == len(data):\n        assert sum(a != b for a, b in zip(m, data)) <= 1\n        kinds.add(\"same length\")\n    else:\n        kinds.add(\"longer\" if len(m) > len(data) else \"shorter\")\nassert kinds == {\"same length\", \"longer\", \"shorter\"}, kinds\nassert len(mutate(b\"\", r)) == 1\nassert data == b\"hello world\"\n"
    },
    {
     "label": "Finds a missing bounds check",
     "type": "assert",
     "code": "def parse_record(data):\n    # A length-prefixed record: one length byte, then that many bytes. The bug: no check that they exist.\n    if len(data) == 0:\n        raise ValueError(\"empty\")\n    n = data[0]\n    return bytes(data[1 + i] for i in range(n))\ncrashes = fuzz(parse_record, [b\"\\x03abc\"], 500)\nassert \"IndexError\" in crashes, crashes\nx = crashes[\"IndexError\"]\ntry:\n    parse_record(x)\nexcept IndexError:\n    pass\nelse:\n    raise AssertionError(\"the recorded input doesn't crash the target\")\n"
    },
    {
     "label": "Rejected inputs aren't crashes",
     "type": "assert",
     "code": "def strict(data):\n    if data != b\"ok\":\n        raise ValueError(\"bad\")\nassert fuzz(strict, [b\"ok\"], 300) == {}\n"
    },
    {
     "label": "Different bugs are reported separately",
     "type": "assert",
     "code": "def buggy(data):\n    if b\"!\" in data:\n        return 1 // 0\n    if len(data) > 6:\n        return {}[\"missing\"]\n    return len(data)\ncrashes = fuzz(buggy, [b\"abc\"], 5000, seed=1)\nassert set(crashes) == {\"ZeroDivisionError\", \"KeyError\"}, set(crashes)\nassert b\"!\" in crashes[\"ZeroDivisionError\"] and len(crashes[\"KeyError\"]) > 6\n"
    }
   ]
  }
 ]
});
