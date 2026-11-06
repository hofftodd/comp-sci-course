/* Auto-graded programming problems for CS 101, by lesson.
   Each problem: id, title, prompt (HTML), starter, hint, solution, tests.
   Test kinds are documented in app/harness.py. "limit" is a per-test time limit in seconds. */
CSA.addCode("cs101", {
  u0: [
    {
      id: "hello",
      title: "Hello, world",
      prompt: `<p>Write a program that prints exactly these two lines:</p><pre data-label="Output"><code>Hello, world!
I am learning Python.</code></pre>`,
      starter: `# Print the two lines here\n`,
      hint: `<p>Use one <code>print</code> call per line, with the text in quotes. Spelling, capitals and punctuation must match exactly.</p>`,
      solution: `print("Hello, world!")\nprint("I am learning Python.")\n`,
      tests: [
        { label: "Prints the two lines", type: "io", stdin: [], expect: "Hello, world!\nI am learning Python." }
      ]
    },
    {
      id: "minutes_week",
      title: "Minutes in a week",
      prompt: `<p>Write a program that <strong>calculates</strong> the number of minutes in a week (don't type the answer in) and prints it with this label:</p><pre data-label="Output"><code>Minutes in a week: 10080</code></pre>`,
      starter: `# Calculate 7 days x 24 hours x 60 minutes and print it with the label\n`,
      hint: `<p><code>print</code> can take several values separated by commas, and puts a space between them: <code>print("Label:", 2 + 3)</code>.</p>`,
      solution: `print("Minutes in a week:", 7 * 24 * 60)\n`,
      tests: [
        { label: "Prints the labeled result", type: "io", stdin: [], expect: "Minutes in a week: 10080" },
        { label: "Calculates rather than typing the number", type: "source", code: `assert "10080" not in __source__, "Let Python do the arithmetic: don't type 10080 into your program."` }
      ]
    }
  ],
  u1: [
    {
      id: "hms",
      title: "Seconds to hours, minutes and seconds",
      prompt: `<p>Read a whole number of seconds with <code>input()</code> and print it as hours, minutes and seconds, in exactly this format:</p><pre data-label="Example"><code>Seconds: 3725
1 h 2 min 5 s</code></pre><p>The first line is the prompt and what the user typed; your program prints only the second line. Any prompt text is fine.</p>`,
      starter: `total = int(input("Seconds: "))\n# Work out hours, minutes and seconds with // and %\n`,
      hint: `<p><code>total // 3600</code> is the number of whole hours. <code>total % 3600</code> is what's left over, which you can split into minutes and seconds the same way with 60.</p>`,
      solution: `total = int(input("Seconds: "))\nhours = total // 3600\nremaining = total % 3600\nminutes = remaining // 60\nseconds = remaining % 60\nprint(f"{hours} h {minutes} min {seconds} s")\n`,
      tests: [
        { label: "3725 seconds", type: "io", stdin: ["3725"], expect: "1 h 2 min 5 s" },
        { label: "Less than a minute", type: "io", stdin: ["59"], expect: "0 h 0 min 59 s" },
        { label: "Exactly one hour", type: "io", stdin: ["3600"], expect: "1 h 0 min 0 s" },
        { label: "One second before midnight", type: "io", stdin: ["86399"], expect: "23 h 59 min 59 s", hidden: true }
      ]
    },
    {
      id: "tip",
      title: "Tip calculator",
      prompt: `<p>Read a bill amount and a tip percentage (two inputs, in that order), then print the tip and the total with exactly two decimal places:</p><pre data-label="Example"><code>Bill: 48.50
Tip percent: 18
Tip: $8.73
Total: $57.23</code></pre>`,
      starter: `bill = float(input("Bill: "))\npercent = float(input("Tip percent: "))\n# Calculate and print the tip and the total\n`,
      hint: `<p>The tip is <code>bill * percent / 100</code>. In an f-string, <code>{value:.2f}</code> shows exactly two decimal places, and a dollar sign before the braces is printed as-is.</p>`,
      solution: `bill = float(input("Bill: "))\npercent = float(input("Tip percent: "))\ntip = bill * percent / 100\nprint(f"Tip: \${tip:.2f}")\nprint(f"Total: \${bill + tip:.2f}")\n`,
      tests: [
        { label: "48.50 with 18%", type: "io", stdin: ["48.50", "18"], expect: "Tip: $8.73\nTotal: $57.23" },
        { label: "Round numbers still show cents", type: "io", stdin: ["100", "20"], expect: "Tip: $20.00\nTotal: $120.00" },
        { label: "A small bill", type: "io", stdin: ["10", "15"], expect: "Tip: $1.50\nTotal: $11.50" }
      ]
    },
    {
      id: "dozens",
      title: "Dozens and leftovers",
      prompt: `<p>Read a number of eggs and print how many full dozens that makes and how many are left over:</p><pre data-label="Example"><code>Eggs: 50
4 dozen and 2 left over</code></pre>`,
      starter: `eggs = int(input("Eggs: "))\n`,
      hint: `<p>This is a job for <code>//</code> and <code>%</code> with 12.</p>`,
      solution: `eggs = int(input("Eggs: "))\nprint(f"{eggs // 12} dozen and {eggs % 12} left over")\n`,
      tests: [
        { label: "50 eggs", type: "io", stdin: ["50"], expect: "4 dozen and 2 left over" },
        { label: "Exactly one dozen", type: "io", stdin: ["12"], expect: "1 dozen and 0 left over" },
        { label: "Fewer than twelve", type: "io", stdin: ["7"], expect: "0 dozen and 7 left over" }
      ]
    }
  ],
  u2: [
    {
      id: "fizzbuzz",
      title: "FizzBuzz",
      prompt: `<p>Read a number <em>n</em>, then print the numbers from 1 to <em>n</em>, one per line, except: print <code>Fizz</code> for multiples of 3, <code>Buzz</code> for multiples of 5, and <code>FizzBuzz</code> for multiples of both.</p>`,
      starter: `n = int(input("n: "))\nfor i in range(1, n + 1):\n    # decide what to print for i\n    print(i)\n`,
      hint: `<p>Check the "both" case first. If you check <code>i % 3 == 0</code> first, 15 will print Fizz.</p>`,
      solution: `n = int(input("n: "))\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)\n`,
      tests: [
        { label: "n = 15", type: "io", stdin: ["15"], expect: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" },
        { label: "n = 1", type: "io", stdin: ["1"], expect: "1" },
        { label: "n = 5", type: "io", stdin: ["5"], expect: "1\n2\nFizz\n4\nBuzz", hidden: true }
      ]
    },
    {
      id: "digit_sum",
      title: "Sum of digits",
      prompt: `<p>Read a non-negative whole number and print the sum of its digits. For <code>4096</code>, print <code>19</code>. Use <code>%</code> and <code>//</code> in a loop, not strings.</p>`,
      starter: `n = int(input("Number: "))\ntotal = 0\n# loop while there are digits left\nprint(total)\n`,
      hint: `<p><code>n % 10</code> is the last digit, and <code>n // 10</code> removes it. Keep going while <code>n &gt; 0</code>.</p>`,
      solution: `n = int(input("Number: "))\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint(total)\n`,
      tests: [
        { label: "4096", type: "io", stdin: ["4096"], expect: "19" },
        { label: "0", type: "io", stdin: ["0"], expect: "0" },
        { label: "A single digit", type: "io", stdin: ["7"], expect: "7" },
        { label: "999999", type: "io", stdin: ["999999"], expect: "54", hidden: true },
        { label: "Uses arithmetic, not strings", type: "source", code: `assert "str(" not in __source__, "Solve this one with % and //, without converting the number to a string."` }
      ]
    },
    {
      id: "collatz",
      title: "Collatz steps",
      prompt: `<p>Read a positive whole number <em>n</em>. Repeatedly halve it if it's even, or replace it with 3<em>n</em> + 1 if it's odd, until it reaches 1. Print how many steps that took. Starting from 6 the sequence is 6, 3, 10, 5, 16, 8, 4, 2, 1, which is <code>8</code> steps.</p>`,
      starter: `n = int(input("n: "))\nsteps = 0\n# repeat until n is 1\nprint(steps)\n`,
      hint: `<p>Use <code>while n != 1:</code>, and inside the loop change <code>n</code> and add one to <code>steps</code>. Use <code>//</code> to halve, so <code>n</code> stays an integer.</p>`,
      solution: `n = int(input("n: "))\nsteps = 0\nwhile n != 1:\n    if n % 2 == 0:\n        n //= 2\n    else:\n        n = 3 * n + 1\n    steps += 1\nprint(steps)\n`,
      tests: [
        { label: "Starting at 6", type: "io", stdin: ["6"], expect: "8" },
        { label: "Starting at 1 takes no steps", type: "io", stdin: ["1"], expect: "0" },
        { label: "Starting at 27", type: "io", stdin: ["27"], expect: "111" }
      ]
    }
  ],
  u3: [
    {
      id: "leap_year",
      title: "Leap years",
      prompt: `<p>Write a function <code>is_leap_year(year)</code> that returns <code>True</code> if <code>year</code> is a leap year and <code>False</code> otherwise. Years divisible by 4 are leap years, except years divisible by 100, except years divisible by 400.</p>`,
      starter: `def is_leap_year(year):\n    """Return True if year is a leap year in the Gregorian calendar."""\n    pass\n`,
      hint: `<p>Check the most specific rule first: divisible by 400, then by 100, then by 4. <code>return</code> as soon as you know the answer.</p>`,
      solution: `def is_leap_year(year):\n    """Return True if year is a leap year in the Gregorian calendar."""\n    if year % 400 == 0:\n        return True\n    if year % 100 == 0:\n        return False\n    return year % 4 == 0\n`,
      tests: [
        { label: "2024 is a leap year", call: "is_leap_year(2024)", expect: "True" },
        { label: "2023 is not", call: "is_leap_year(2023)", expect: "False" },
        { label: "1900 is not (divisible by 100)", call: "is_leap_year(1900)", expect: "False" },
        { label: "2000 is (divisible by 400)", call: "is_leap_year(2000)", expect: "True" },
        { label: "2100 is not", call: "is_leap_year(2100)", expect: "False", hidden: true }
      ]
    },
    {
      id: "days_in_month",
      title: "Days in a month",
      prompt: `<p>Write <code>days_in_month(month, year)</code>, where <code>month</code> is 1 to 12. Use your <code>is_leap_year</code> function for February: include both functions in your answer.</p>`,
      starter: `def is_leap_year(year):\n    pass\n\ndef days_in_month(month, year):\n    pass\n`,
      hint: `<p>April, June, September and November (4, 6, 9, 11) have 30 days. <code>month in (4, 6, 9, 11)</code> checks all four at once.</p>`,
      solution: `def is_leap_year(year):\n    if year % 400 == 0:\n        return True\n    if year % 100 == 0:\n        return False\n    return year % 4 == 0\n\ndef days_in_month(month, year):\n    if month == 2:\n        return 29 if is_leap_year(year) else 28\n    if month in (4, 6, 9, 11):\n        return 30\n    return 31\n`,
      tests: [
        { label: "February 2024", call: "days_in_month(2, 2024)", expect: "29" },
        { label: "February 2023", call: "days_in_month(2, 2023)", expect: "28" },
        { label: "April", call: "days_in_month(4, 2023)", expect: "30" },
        { label: "December", call: "days_in_month(12, 2023)", expect: "31" },
        { label: "February 1900", call: "days_in_month(2, 1900)", expect: "28", hidden: true },
        { label: "A whole year adds up to 365", type: "assert", code: `assert sum(days_in_month(m, 2023) for m in range(1, 13)) == 365, "The months of 2023 should add up to 365 days."` }
      ]
    },
    {
      id: "max_of_three",
      title: "Largest of three",
      prompt: `<p>Write <code>max_of_three(a, b, c)</code> that returns the largest of three numbers, <strong>without</strong> using the built-in <code>max</code> or <code>sorted</code>.</p>`,
      starter: `def max_of_three(a, b, c):\n    pass\n`,
      hint: `<p>Start with <code>biggest = a</code>, then compare it with <code>b</code> and with <code>c</code>.</p>`,
      solution: `def max_of_three(a, b, c):\n    biggest = a\n    if b > biggest:\n        biggest = b\n    if c > biggest:\n        biggest = c\n    return biggest\n`,
      tests: [
        { label: "Largest last", call: "max_of_three(1, 2, 3)", expect: "3" },
        { label: "Largest first", call: "max_of_three(3, 2, 1)", expect: "3" },
        { label: "Largest in the middle", call: "max_of_three(2, 3, 1)", expect: "3" },
        { label: "A tie", call: "max_of_three(5, 5, 1)", expect: "5" },
        { label: "All negative", call: "max_of_three(-7, -2, -9)", expect: "-2" },
        { label: "Doesn't use max or sorted", type: "source", code: `assert "max(" not in __source__ and "sorted(" not in __source__, "Solve this without the built-in max or sorted."` }
      ]
    }
  ],
  str: [
    {
      id: "initials",
      title: "Initials",
      prompt: `<p>Write <code>initials(full_name)</code> that returns the capitalized first letters of each word: <code>initials("grace brewster hopper")</code> returns <code>"GBH"</code>. Extra spaces between words shouldn't matter.</p>`,
      starter: `def initials(full_name):\n    pass\n`,
      hint: `<p><code>full_name.split()</code> gives a list of words and ignores extra spaces. <code>word[0].upper()</code> is a word's capitalized first letter.</p>`,
      solution: `def initials(full_name):\n    result = ""\n    for word in full_name.split():\n        result += word[0].upper()\n    return result\n`,
      tests: [
        { label: "Three names", call: "initials('grace brewster hopper')", expect: "'GBH'" },
        { label: "Extra spaces", call: "initials('  ada   lovelace ')", expect: "'AL'" },
        { label: "One name", call: "initials('linus')", expect: "'L'" },
        { label: "Empty string", call: "initials('')", expect: "''", hidden: true }
      ]
    },
    {
      id: "palindrome",
      title: "Palindromes",
      prompt: `<p>Write <code>is_palindrome(text)</code> that returns <code>True</code> if <code>text</code> reads the same backward and forward, ignoring case, spaces and punctuation (consider only letters and digits).</p>`,
      starter: `def is_palindrome(text):\n    pass\n`,
      hint: `<p>First build a cleaned string containing only <code>ch.lower()</code> for characters where <code>ch.isalnum()</code> is true. Then compare it with its reverse, <code>cleaned[::-1]</code>.</p>`,
      solution: `def is_palindrome(text):\n    cleaned = "".join(ch.lower() for ch in text if ch.isalnum())\n    return cleaned == cleaned[::-1]\n`,
      tests: [
        { label: "A famous one", call: "is_palindrome('A man, a plan, a canal: Panama')", expect: "True" },
        { label: "Not a palindrome", call: "is_palindrome('Python')", expect: "False" },
        { label: "Empty string", call: "is_palindrome('')", expect: "True" },
        { label: "Mixed case and quotes", call: "is_palindrome(\"No 'x' in Nixon\")", expect: "True" },
        { label: "Two different letters", call: "is_palindrome('ab')", expect: "False", hidden: true }
      ]
    },
    {
      id: "compress",
      title: "Run-length encoding",
      prompt: `<p>Write <code>compress(s)</code> that replaces each run of a repeated character with the character and the run's length: <code>"aaabccdddd"</code> becomes <code>"a3b1c2d4"</code>.</p>`,
      starter: `def compress(s):\n    pass\n`,
      hint: `<p>Keep track of the current character and how many times you've seen it in a row. When the character changes, add the finished run to the result. Don't forget the last run, after the loop ends.</p>`,
      solution: `def compress(s):\n    if s == "":\n        return ""\n    result = ""\n    current = s[0]\n    count = 1\n    for ch in s[1:]:\n        if ch == current:\n            count += 1\n        else:\n            result += current + str(count)\n            current = ch\n            count = 1\n    return result + current + str(count)\n`,
      tests: [
        { label: "The example", call: "compress('aaabccdddd')", expect: "'a3b1c2d4'" },
        { label: "Empty string", call: "compress('')", expect: "''" },
        { label: "One character", call: "compress('x')", expect: "'x1'" },
        { label: "No repeats", call: "compress('abc')", expect: "'a1b1c1'" },
        { label: "A run longer than 9", call: "compress('z' * 12)", expect: "'z12'", hidden: true }
      ]
    },
    {
      id: "caesar",
      title: "Caesar cipher",
      prompt: `<p>Write <code>caesar(text, shift)</code> that shifts each <strong>lowercase</strong> letter <code>shift</code> places through the alphabet, wrapping from z back to a. Leave every other character unchanged. The shift can be negative.</p>`,
      starter: `def caesar(text, shift):\n    pass\n`,
      hint: `<p>For a lowercase letter, its position in the alphabet is <code>ord(ch) - ord("a")</code>. Add the shift, take <code>% 26</code> to wrap around, and convert back with <code>chr</code>.</p>`,
      solution: `def caesar(text, shift):\n    result = ""\n    for ch in text:\n        if "a" <= ch <= "z":\n            offset = (ord(ch) - ord("a") + shift) % 26\n            result += chr(ord("a") + offset)\n        else:\n            result += ch\n    return result\n`,
      tests: [
        { label: "Shift by 3", call: "caesar('hello, world', 3)", expect: "'khoor, zruog'" },
        { label: "Wrapping past z", call: "caesar('xyz', 3)", expect: "'abc'" },
        { label: "Negative shift", call: "caesar('abc', -1)", expect: "'zab'" },
        { label: "Uppercase is unchanged", call: "caesar('Hello', 1)", expect: "'Hfmmp'" },
        { label: "Shifting by 26 changes nothing", call: "caesar('python', 26)", expect: "'python'", hidden: true }
      ]
    }
  ],
  u5: [
    {
      id: "dedupe",
      title: "Remove duplicates, keep order",
      prompt: `<p>Write <code>dedupe(xs)</code> that returns a <strong>new</strong> list with duplicates removed, keeping the first occurrence of each item in its original order: <code>[3, 1, 3, 2, 1]</code> gives <code>[3, 1, 2]</code>. Don't change the list you were given.</p>`,
      starter: `def dedupe(xs):\n    pass\n`,
      hint: `<p>Use a set to remember what you've already seen (fast "is it in here?" checks) and a list for the result, in order.</p>`,
      solution: `def dedupe(xs):\n    seen = set()\n    result = []\n    for x in xs:\n        if x not in seen:\n            seen.add(x)\n            result.append(x)\n    return result\n`,
      tests: [
        { label: "The example", call: "dedupe([3, 1, 3, 2, 1])", expect: "[3, 1, 2]" },
        { label: "Empty list", call: "dedupe([])", expect: "[]" },
        { label: "Strings", call: "dedupe(['b', 'a', 'b'])", expect: "['b', 'a']" },
        { label: "Doesn't change the original list", type: "assert", code: `xs = [1, 1, 2]\ndedupe(xs)\nassert xs == [1, 1, 2], "dedupe changed the list it was given. Build a new list instead."` },
        { label: "Fast on 100,000 items", type: "assert", code: `big = list(range(50000)) * 2\nassert dedupe(big) == list(range(50000)), "Wrong result on a large list."`, limit: 4, hidden: true }
      ]
    },
    {
      id: "word_counts",
      title: "Word counts",
      prompt: `<p>Write <code>word_counts(text)</code> that returns a dictionary mapping each word (lowercased) to how many times it appears. Split on whitespace; don't worry about punctuation.</p>`,
      starter: `def word_counts(text):\n    pass\n`,
      hint: `<p><code>counts.get(word, 0) + 1</code> is the new count for a word whether or not you've seen it before.</p>`,
      solution: `def word_counts(text):\n    counts = {}\n    for word in text.lower().split():\n        counts[word] = counts.get(word, 0) + 1\n    return counts\n`,
      tests: [
        { label: "The example", call: "word_counts('the cat and the hat')", expect: "{'the': 2, 'cat': 1, 'and': 1, 'hat': 1}" },
        { label: "Empty text", call: "word_counts('')", expect: "{}" },
        { label: "Mixed case", call: "word_counts('A a A')", expect: "{'a': 3}" }
      ]
    },
    {
      id: "stats",
      title: "Smallest, largest and mean",
      prompt: `<p>Write <code>stats(xs)</code> that returns a tuple <code>(smallest, largest, mean)</code> for a non-empty list of numbers, using one loop and <strong>without</strong> <code>min</code>, <code>max</code> or <code>sum</code>.</p>`,
      starter: `def stats(xs):\n    pass\n`,
      hint: `<p>Start <code>smallest</code> and <code>largest</code> at <code>xs[0]</code>, and a running total at 0. Return all three values separated by commas to make a tuple.</p>`,
      solution: `def stats(xs):\n    smallest = largest = xs[0]\n    total = 0\n    for x in xs:\n        if x < smallest:\n            smallest = x\n        if x > largest:\n            largest = x\n        total += x\n    return smallest, largest, total / len(xs)\n`,
      tests: [
        { label: "The example", call: "stats([4, 8, 1, 7])", expect: "(1, 8, 5.0)" },
        { label: "One item", call: "stats([5])", expect: "(5, 5, 5.0)" },
        { label: "Negative numbers", call: "stats([-2, 2])", expect: "(-2, 2, 0.0)" },
        { label: "Doesn't use min, max or sum", type: "source", code: `assert not any(f + "(" in __source__ for f in ("min", "max", "sum")), "Solve this with one loop, without min, max or sum."` }
      ]
    },
    {
      id: "top_words",
      title: "Most common words",
      prompt: `<p>Write <code>top_words(text, n)</code> that returns a list of the <code>n</code> most common words as <code>(word, count)</code> tuples, most common first. Break ties alphabetically. Lowercase the words; split on whitespace. ("Sorting by two things at once" in this lesson shows how to sort by count and break ties.)</p>`,
      starter: `def top_words(text, n):\n    pass\n`,
      hint: `<p>Count first (as in Word counts). Then <code>sorted(counts.items(), key=lambda pair: (-pair[1], pair[0]))</code> sorts by count, largest first, and then alphabetically.</p>`,
      solution: `def top_words(text, n):\n    counts = {}\n    for word in text.lower().split():\n        counts[word] = counts.get(word, 0) + 1\n    ranked = sorted(counts.items(), key=lambda pair: (-pair[1], pair[0]))\n    return ranked[:n]\n`,
      tests: [
        { label: "Clear winners", call: "top_words('b a b c a b', 2)", expect: "[('b', 3), ('a', 2)]" },
        { label: "Ties break alphabetically", call: "top_words('y x', 2)", expect: "[('x', 1), ('y', 1)]" },
        { label: "Asking for more words than exist", call: "top_words('hi', 5)", expect: "[('hi', 1)]" }
      ]
    }
  ],
  u4: [
    {
      id: "sum_digits_rec",
      title: "Sum of digits, recursively",
      prompt: `<p>Write a <strong>recursive</strong> function <code>sum_digits(n)</code> that returns the sum of the digits of a non-negative integer, with no loops.</p>`,
      starter: `def sum_digits(n):\n    pass\n`,
      hint: `<p>Base case: a one-digit number is its own digit sum. Recursive case: the last digit plus the digit sum of the rest.</p>`,
      solution: `def sum_digits(n):\n    if n < 10:\n        return n\n    return n % 10 + sum_digits(n // 10)\n`,
      tests: [
        { label: "4096", call: "sum_digits(4096)", expect: "19" },
        { label: "0", call: "sum_digits(0)", expect: "0" },
        { label: "A single digit", call: "sum_digits(9)", expect: "9" },
        { label: "Uses recursion, not loops", type: "source", code: `assert "for " not in __source__ and "while " not in __source__, "Solve this one recursively, without for or while loops."` }
      ]
    },
    {
      id: "binary",
      title: "Binary representation",
      prompt: `<p>Write a recursive function <code>binary(n)</code> that returns the binary representation of a non-negative integer as a string: <code>binary(13)</code> returns <code>"1101"</code>. Don't use <code>bin</code> or <code>format</code>. (Binary numbers, and how to turn 13 into 1101 by hand, are explained in <a href="#c-cs101-u1">Lesson 2, Binary numbers, bits and bytes</a>.)</p>`,
      starter: `def binary(n):\n    pass\n`,
      hint: `<p>The last binary digit is <code>n % 2</code>. The digits before it are <code>binary(n // 2)</code>. Numbers below 2 are their own binary representation.</p>`,
      solution: `def binary(n):\n    if n < 2:\n        return str(n)\n    return binary(n // 2) + str(n % 2)\n`,
      tests: [
        { label: "13", call: "binary(13)", expect: "'1101'" },
        { label: "0", call: "binary(0)", expect: "'0'" },
        { label: "1", call: "binary(1)", expect: "'1'" },
        { label: "255", call: "binary(255)", expect: "'11111111'" },
        { label: "Matches Python for 0 to 300", type: "assert", code: `for k in range(301):\n    assert binary(k) == format(k, "b"), f"binary({k}) returned {binary(k)!r}"`, hidden: true },
        { label: "Doesn't use bin or format", type: "source", code: `assert "bin(" not in __source__ and "format(" not in __source__, "Build the string yourself, without bin or format."` }
      ]
    },
    {
      id: "flatten",
      title: "Flatten a nested list",
      prompt: `<p>Write <code>flatten(items)</code> that returns a flat list of all the non-list items in a nested list, in order: <code>flatten([1, [2, [3, 4]], 5])</code> returns <code>[1, 2, 3, 4, 5]</code>.</p>`,
      starter: `def flatten(items):\n    pass\n`,
      hint: `<p>Loop over the items. If <code>isinstance(x, list)</code>, extend the result with <code>flatten(x)</code>; otherwise append <code>x</code>.</p>`,
      solution: `def flatten(items):\n    out = []\n    for x in items:\n        if isinstance(x, list):\n            out.extend(flatten(x))\n        else:\n            out.append(x)\n    return out\n`,
      tests: [
        { label: "The example", call: "flatten([1, [2, [3, 4]], 5])", expect: "[1, 2, 3, 4, 5]" },
        { label: "Empty list", call: "flatten([])", expect: "[]" },
        { label: "Only empty lists", call: "flatten([[[]], []])", expect: "[]" },
        { label: "Deep nesting", call: "flatten([[[[['deep']]]], 'shallow'])", expect: "['deep', 'shallow']" }
      ]
    },
    {
      id: "hanoi",
      title: "Towers of Hanoi",
      prompt: `<p>Write <code>hanoi(n, source, spare, target)</code> that returns the list of moves that solves the Towers of Hanoi with <code>n</code> disks, each move a tuple <code>(from_peg, to_peg)</code>. For <code>hanoi(2, "A", "B", "C")</code> one correct answer is <code>[("A", "B"), ("A", "C"), ("B", "C")]</code>. The tests replay your moves and check every one is legal.</p>`,
      starter: `def hanoi(n, source, spare, target):\n    pass\n`,
      hint: `<p>Moves to shift <em>n</em> disks: the moves for <em>n</em> − 1 disks from source to spare, then one move from source to target, then the moves for <em>n</em> − 1 disks from spare to target. With 0 disks there are no moves.</p>`,
      solution: `def hanoi(n, source, spare, target):\n    if n == 0:\n        return []\n    return (hanoi(n - 1, source, target, spare)\n            + [(source, target)]\n            + hanoi(n - 1, spare, source, target))\n`,
      tests: [
        { label: "No disks, no moves", call: "hanoi(0, 'A', 'B', 'C')", expect: "[]" },
        { label: "3 disks take 7 moves", type: "assert", code: `moves = hanoi(3, "A", "B", "C")\nassert len(moves) == 7, f"Expected 7 moves for 3 disks, got {len(moves)}."` },
        { label: "Every move is legal and the puzzle is solved (5 disks)", type: "assert", code: `pegs = {"A": [5, 4, 3, 2, 1], "B": [], "C": []}\nfor i, (a, b) in enumerate(hanoi(5, "A", "B", "C"), 1):\n    assert pegs[a], f"Move {i} takes a disk from empty peg {a}."\n    disk = pegs[a].pop()\n    assert not pegs[b] or pegs[b][-1] > disk, f"Move {i} puts disk {disk} on a smaller disk."\n    pegs[b].append(disk)\nassert pegs["C"] == [5, 4, 3, 2, 1], "The disks didn't all end up on peg C."` }
      ]
    }
  ],
  u6: [
    {
      id: "mean",
      title: "A mean that rejects empty lists",
      prompt: `<p>Write <code>mean(xs)</code> that returns the average of a list of numbers, and raises <code>ValueError</code> with a helpful message if the list is empty.</p>`,
      starter: `def mean(xs):\n    pass\n`,
      hint: `<p><code>if not xs: raise ValueError("mean() of an empty list")</code> handles the empty case before you divide.</p>`,
      solution: `def mean(xs):\n    if not xs:\n        raise ValueError("mean() of an empty list")\n    return sum(xs) / len(xs)\n`,
      tests: [
        { label: "Typical list", call: "mean([1, 2, 3])", expect: "2" },
        { label: "One item", call: "mean([5])", expect: "5" },
        { label: "Negative numbers", call: "mean([-2, 2])", expect: "0" },
        { label: "Empty list raises ValueError", type: "raises", call: "mean([])", error: "ValueError" }
      ]
    },
    {
      id: "parse_int",
      title: "Safe integer parsing",
      prompt: `<p>Write <code>parse_int(text)</code> that returns the integer in <code>text</code> (ignoring surrounding spaces), or <code>None</code> if <code>text</code> isn't a whole number. It should never raise an exception.</p>`,
      starter: `def parse_int(text):\n    pass\n`,
      hint: `<p>Try <code>int(text)</code> inside <code>try</code>, and <code>return None</code> in an <code>except ValueError:</code> block. (<code>int</code> already ignores surrounding spaces.)</p>`,
      solution: `def parse_int(text):\n    try:\n        return int(text)\n    except ValueError:\n        return None\n`,
      tests: [
        { label: "A number", call: "parse_int('42')", expect: "42" },
        { label: "Spaces and a sign", call: "parse_int('  -7 ')", expect: "-7" },
        { label: "A decimal isn't a whole number", call: "parse_int('4.5')", expect: "None" },
        { label: "Words", call: "parse_int('thirty')", expect: "None" },
        { label: "Empty string", call: "parse_int('')", expect: "None" },
        { label: "Catches only the expected error", type: "source", code: `assert "except:" not in __source__.replace(" ", ""), "Catch ValueError specifically, not every exception."` }
      ]
    },
    {
      id: "last_n",
      title: "Fix the off-by-one bug",
      prompt: `<p>This function, already in the editor, should return the last <code>n</code> items of a list, but it has a bug (it's the one from Practice 5 of this lesson):</p><pre><code>def last_n(xs, n):
    return xs[len(xs) - n - 1:]</code></pre><p>Press <strong>Check</strong> to run the four tests. They call <code>last_n([1, 2, 3, 4], 2)</code>, which should give <code>[3, 4]</code>; <code>last_n([1, 2, 3], 0)</code>, which should give <code>[]</code>; <code>last_n([1, 2, 3], 3)</code>, which should give <code>[1, 2, 3]</code>; and <code>last_n([1, 2], 5)</code>, which should give the whole list <code>[1, 2]</code>. Use the failing tests to find the bug, then fix it so that all four pass.</p>`,
      starter: `def last_n(xs, n):\n    return xs[len(xs) - n - 1:]\n`,
      hint: `<p>Trace <code>last_n([1, 2, 3, 4], 2)</code> by hand: what is the start index? Also, watch out: <code>xs[-0:]</code> is the whole list, not an empty one.</p>`,
      solution: `def last_n(xs, n):\n    if n <= 0:\n        return []\n    return xs[max(len(xs) - n, 0):]\n`,
      tests: [
        { label: "Last two", call: "last_n([1, 2, 3, 4], 2)", expect: "[3, 4]" },
        { label: "Last zero", call: "last_n([1, 2, 3], 0)", expect: "[]" },
        { label: "All of them", call: "last_n([1, 2, 3], 3)", expect: "[1, 2, 3]" },
        { label: "More than there are", call: "last_n([1, 2], 5)", expect: "[1, 2]" }
      ]
    }
  ],
  files: [
    {
      id: "file_stats",
      title: "Lines, words and characters",
      prompt: `<p>Write <code>file_stats(path)</code> that returns a tuple <code>(lines, words, characters)</code> for the text file at <code>path</code>, like the Unix <code>wc</code> command. Characters include new-line characters. The tests create the files for you.</p>`,
      starter: `def file_stats(path):\n    pass\n`,
      hint: `<p>Open the file with <code>with open(path, encoding="utf-8") as f:</code> and loop over its lines, adding up the counts.</p>`,
      solution: `def file_stats(path):\n    lines = words = chars = 0\n    with open(path, encoding="utf-8") as f:\n        for line in f:\n            lines += 1\n            words += len(line.split())\n            chars += len(line)\n    return lines, words, chars\n`,
      tests: [
        { label: "A short poem", setup: `open("poem.txt", "w", encoding="utf-8").write("one two\\nthree\\n")`, call: "file_stats('poem.txt')", expect: "(2, 3, 14)" },
        { label: "An empty file", setup: `open("empty.txt", "w", encoding="utf-8").close()`, call: "file_stats('empty.txt')", expect: "(0, 0, 0)" },
        { label: "No final new line", setup: `open("tail.txt", "w", encoding="utf-8").write("a b c")`, call: "file_stats('tail.txt')", expect: "(1, 3, 5)" }
      ]
    },
    {
      id: "csv_averages",
      title: "Averages from a CSV file",
      prompt: `<p>Write <code>averages(path)</code> that reads a CSV file whose first row is a header (<code>name</code> followed by any number of score columns) and returns a dictionary mapping each name to that student's average score as a float.</p><pre data-label="grades.csv"><code>name,quiz1,quiz2,quiz3
Ada,88,92,95
Alan,79,85,91</code></pre><p>gives <code>{"Ada": 91.666…, "Alan": 85.0}</code>.</p>`,
      starter: `import csv\n\ndef averages(path):\n    pass\n`,
      hint: `<p>Use <code>csv.reader</code> (shown in the Files and modules lesson, just after <code>DictReader</code>): take the first row as the header with <code>next(reader)</code>, then for each row convert <code>row[1:]</code> to numbers with <code>float</code>.</p>`,
      solution: `import csv\n\ndef averages(path):\n    result = {}\n    with open(path, newline="", encoding="utf-8") as f:\n        reader = csv.reader(f)\n        next(reader)\n        for row in reader:\n            scores = [float(x) for x in row[1:]]\n            result[row[0]] = sum(scores) / len(scores)\n    return result\n`,
      tests: [
        { label: "Three quizzes", setup: `open("grades.csv", "w", encoding="utf-8").write("name,quiz1,quiz2,quiz3\\nAda,88,92,95\\nAlan,79,85,91\\n")`, call: "averages('grades.csv')", expect: "{'Ada': 275 / 3, 'Alan': 85.0}" },
        { label: "A different number of columns", setup: `open("two.csv", "w", encoding="utf-8").write("name,a,b\\nGrace,100,90\\n")`, call: "averages('two.csv')", expect: "{'Grace': 95.0}" },
        { label: "Header only", setup: `open("none.csv", "w", encoding="utf-8").write("name,q1\\n")`, call: "averages('none.csv')", expect: "{}" }
      ]
    }
  ],
  algo: [
    {
      id: "binary_search",
      title: "Binary search",
      prompt: `<p>Write <code>binary_search(xs, target)</code> that returns the index of <code>target</code> in the <strong>sorted</strong> list <code>xs</code>, or <code>-1</code> if it isn't there. It must take O(log <em>n</em>) time: one test searches a list of a million items many times, and a linear search will run out of time.</p>`,
      starter: `def binary_search(xs, target):\n    low, high = 0, len(xs) - 1\n    # keep halving the range\n    return -1\n`,
      hint: `<p>While <code>low &lt;= high</code>: look at <code>mid = (low + high) // 2</code>. If <code>xs[mid]</code> is too small, move <code>low</code> to <code>mid + 1</code>; if too big, move <code>high</code> to <code>mid - 1</code>.</p>`,
      solution: `def binary_search(xs, target):\n    low, high = 0, len(xs) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if xs[mid] == target:\n            return mid\n        if xs[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n`,
      tests: [
        { label: "Found in the middle", call: "binary_search([2, 5, 8, 12, 16, 23, 38], 12)", expect: "3" },
        { label: "Found at the ends", type: "assert", code: `xs = [2, 5, 8, 12]\nassert binary_search(xs, 2) == 0 and binary_search(xs, 12) == 3, "Check the first and last positions."` },
        { label: "Not there", call: "binary_search([1, 3, 5, 7], 4)", expect: "-1" },
        { label: "Empty list", call: "binary_search([], 1)", expect: "-1" },
        { label: "Fast: 2,000 searches in a million items", type: "assert", code: `big = list(range(0, 2_000_000, 2))\nfor t in range(0, 2_000_000, 1000):\n    assert binary_search(big, t) == t // 2\nassert binary_search(big, 7) == -1`, limit: 5 }
      ]
    },
    {
      id: "two_sum",
      title: "Two-sum in linear time",
      prompt: `<p>Write <code>two_sum(xs, target)</code> that returns <code>True</code> if two items at different positions add up to <code>target</code>. It must run in O(<em>n</em>) time: a test uses 60,000 items, and nested loops will run out of time.</p>`,
      starter: `def two_sum(xs, target):\n    pass\n`,
      hint: `<p>For each <code>x</code>, the partner you need is <code>target - x</code>. Keep a set of the numbers you've already passed, and check it before adding <code>x</code>.</p>`,
      solution: `def two_sum(xs, target):\n    seen = set()\n    for x in xs:\n        if target - x in seen:\n            return True\n        seen.add(x)\n    return False\n`,
      tests: [
        { label: "A pair exists", call: "two_sum([3, 9, 14, 5], 19)", expect: "True" },
        { label: "No pair", call: "two_sum([3, 9, 14, 5], 4)", expect: "False" },
        { label: "Can't use the same item twice", call: "two_sum([5], 10)", expect: "False" },
        { label: "The same value at two positions counts", call: "two_sum([5, 5], 10)", expect: "True" },
        { label: "Fast on 60,000 items", type: "assert", code: `xs = list(range(1, 120_000, 2))\nassert two_sum(xs, 4) is True\nassert two_sum(xs, 3) is False`, limit: 4 }
      ]
    },
    {
      id: "merge",
      title: "Merge two sorted lists",
      prompt: `<p>Write <code>merge(left, right)</code> that combines two sorted lists into one sorted list, the step at the heart of merge sort. Don't use <code>sorted</code> or <code>.sort()</code>: walk through both lists at once.</p>`,
      starter: `def merge(left, right):\n    result = []\n    i = j = 0\n    # take the smaller front item each time\n    return result\n`,
      hint: `<p>While both <code>i &lt; len(left)</code> and <code>j &lt; len(right)</code>, append the smaller of <code>left[i]</code> and <code>right[j]</code> and advance that index. Afterwards, add whatever remains: <code>left[i:] + right[j:]</code>.</p>`,
      solution: `def merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    return result + left[i:] + right[j:]\n`,
      tests: [
        { label: "Interleaved", call: "merge([1, 4, 9], [2, 3, 10])", expect: "[1, 2, 3, 4, 9, 10]" },
        { label: "One list empty", call: "merge([], [1, 2])", expect: "[1, 2]" },
        { label: "Both empty", call: "merge([], [])", expect: "[]" },
        { label: "Duplicates", call: "merge([1, 2, 2], [2, 3])", expect: "[1, 2, 2, 2, 3]" },
        { label: "Doesn't use sorting", type: "source", code: `assert "sorted(" not in __source__ and ".sort(" not in __source__, "Merge by walking through both lists, without sorting."` }
      ]
    }
  ]
});
