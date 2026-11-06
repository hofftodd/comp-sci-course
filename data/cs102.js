CSA.addCourse({
  id: "cs102",
  code: "CS 102",
  title: "Programming II",
  credits: 4,
  kind: "required",
  term: "y1s",
  summary: "From writing programs to designing them: classes and objects, data abstraction, inheritance and composition, iterators and generators, test-driven development, and the linked structures that underlie every data structure library.",
  prereqs: ["CS 101 Programming I"],
  outcomes: [
    "Design classes with clear responsibilities, invariants and interfaces",
    "Use special methods to make objects behave like built-in types",
    "Choose between inheritance and composition, and use polymorphism",
    "Write and use iterators, generators, closures and decorators",
    "Develop code test-first with pytest, and refactor safely",
    "Implement stacks, queues, linked lists and binary search trees, and reason about their costs"
  ],
  rubric: {
    criteriaFor: "problem sets and projects",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Weekly problem sets", weight: 30, desc: "The lesson's programming problems plus one larger design exercise each week, submitted with your tests." },
      { name: "Projects", weight: 25, desc: "Two projects: a simulation built from cooperating classes (week 6), and a small data-structure library with a full test suite (week 13). Each ends with a code review where a classmate reads your code and you answer their questions." },
      { name: "Midterm exam", weight: 15, desc: "Reading, tracing and writing classes; special methods; inheritance (lessons 1–4)." },
      { name: "Final exam", weight: 15, desc: "Cumulative, with emphasis on generators, testing and linked structures (lessons 5–8)." },
      { name: "Code review participation", weight: 5, desc: "Thoughtful, specific and kind reviews of classmates' projects." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does it work?", levels: [
        "Correct for typical, edge and error cases; invariants always hold.",
        "Correct for typical cases; one or two edge cases missed.",
        "Works only for some typical cases.",
        "Does not run, or mostly wrong." ] },
      { name: "Design and abstraction", desc: "Are the classes well designed?", levels: [
        "Each class has one clear responsibility and a small public interface; internals are hidden; composition and inheritance are used where each fits.",
        "Sound overall; a class does too much or exposes internals.",
        "Classes are bags of data with logic scattered elsewhere, or inheritance is misused.",
        "No meaningful design." ] },
      { name: "Readability", desc: "Can another person follow it?", levels: [
        "Clear names, type hints and docstrings on public methods; consistent style.",
        "Mostly clear; some missing docstrings or unclear names.",
        "Hard to follow without the author's help.",
        "Very difficult to read." ] },
      { name: "Testing", desc: "Is it tested well?", levels: [
        "Tests written alongside the code cover behavior, edge cases and invariants; all pass.",
        "Good tests for the main behavior; some edge cases untested.",
        "A few tests, mostly of the happy path.",
        "No tests." ] },
      { name: "Explanation", desc: "Can you explain and defend your choices?", levels: [
        "Explains every design decision and the alternatives considered.",
        "Explains the code clearly but not the trade-offs.",
        "Explains the main idea with gaps.",
        "Cannot explain the code." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> discuss designs freely; write your own code, and name anyone who helped with a specific problem.",
      "<b>AI assistants:</b> allowed for explanations, hints and reviewing your code. Say how you used one. You must be able to explain every line; the project code reviews check this.",
      "<b>Late work:</b> three late days for the term on problem sets; projects are accepted up to two days late at 10% off per day.",
      "<b>Regrades:</b> within one week, in writing, naming the criterion you think was misjudged."
    ]
  }
});

CSA.addUnits("cs102", [
  {
    id: "c1",
    title: "Classes and objects",
    minutes: 90,
    summary: "Bundle data and the operations on it into your own types: classes, instances, attributes and methods, self, invariants, and how objects behave in memory.",
    notes: `
<p>In CS 101 you used many types that Python provides: <code>str</code>, <code>list</code>, <code>dict</code>. Each bundles <strong>data</strong> (the characters, the items) with <strong>operations</strong> on that data (<code>upper</code>, <code>append</code>, <code>get</code>). A <strong>class</strong> lets you define your own types the same way. This is the foundation of <strong>object-oriented programming</strong>, and of most large programs you'll read or write.</p>

<h3>Why define your own types?</h3>
<p>Suppose a program tracks bank accounts. Without classes, you might keep each account's owner and balance in a dictionary, and write functions that take that dictionary. That works, but nothing stops some other part of the program from setting <code>account["balance"] = -1000000</code>, and nothing groups the functions with the data they're for. A class does both: it keeps the data and the rules about it in one place.</p>

<h3>Defining a class</h3>
<pre><code>class BankAccount:
    """A bank account with an owner and a balance that never goes negative."""

    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount &lt;= 0:
            raise ValueError("deposit must be positive")
        self.balance += amount

    def withdraw(self, amount):
        if amount &gt; self.balance:
            raise ValueError("insufficient funds")
        self.balance -= amount</code></pre>
<ul>
  <li><code>class BankAccount:</code> defines a new type. Class names use CapitalizedWords by convention.</li>
  <li><code>__init__</code> is the <strong>constructor</strong>: Python calls it automatically when you create an object, to set up its starting state.</li>
  <li>Functions defined inside a class are <strong>methods</strong>. Their first parameter, always called <code>self</code>, is the object the method was called on.</li>
  <li><code>self.owner = owner</code> creates an <strong>attribute</strong>: a name stored on that particular object.</li>
</ul>

<h3>Creating and using objects</h3>
<pre><code>a = BankAccount("Ada", 100)    # calls __init__(a, "Ada", 100)
b = BankAccount("Alan")        # balance defaults to 0
a.deposit(50)                  # Python turns this into BankAccount.deposit(a, 50)
print(a.balance)               # 150
print(b.balance)               # 0
a.withdraw(500)                # ValueError: insufficient funds</code></pre>
<p>Each object created from a class is an <strong>instance</strong> with its own attributes: depositing into <code>a</code> doesn't affect <code>b</code>. The key to understanding <code>self</code> is the comment on the third line: <code>a.deposit(50)</code> is shorthand for calling the class's function with <code>a</code> as the first argument. Inside <code>deposit</code>, <code>self</code> <em>is</em> <code>a</code>.</p>

<h3>Invariants: rules an object always keeps</h3>
<p>An <strong>invariant</strong> is a condition that is true for every object of a class, at every moment between method calls: for our account, "the balance is never negative". The constructor must establish it, and every method must preserve it. Because only the class's own methods change the balance, you can check the rule in one place and trust it everywhere. That's the payoff of <strong>encapsulation</strong>: keeping an object's data behind its methods.</p>
<p>Python doesn't strictly prevent outside code from writing <code>a.balance = -5</code>. By convention, an attribute that outside code shouldn't touch starts with an underscore, like <code>self._balance</code>, which signals "internal; use the methods". The underscore is only a label, though: Python would run <code>a._balance = -5</code> without complaint. Here is the same problem with our class as written, which stores the public name <code>balance</code>:</p>
<pre><code>acct = BankAccount("Ada", 100)
acct.balance = -5             # no error: the invariant is now broken
acct.withdraw(1)              # ValueError: insufficient funds, from an account opened with 100</code></pre>
<p>Nothing fails at the moment of the bad assignment. The trouble shows up later, somewhere else, in code that trusted the invariant, and that makes the bug hard to trace back. The underscore protects against accidents by people who read it; it can't stop someone who ignores it. The next lesson shows <em>properties</em>, which go one step further: they let the <em>public</em> name <code>a.balance</code> run a check on every assignment, so the obvious way to change the balance is also the safe one and a bad value is rejected immediately.</p>

<h3>Objects in memory</h3>
<p>Objects follow the same rules as lists in <a href="#c-cs101-u5">CS 101's lesson on lists and dictionaries</a>: variables are names that refer to objects, and assignment never copies.</p>
<pre><code>c = a          # c and a are the same account
c.deposit(10)
print(a.balance)   # 160: there's only one object</code></pre>
<p>When you pass an object to a function, the function can call its methods and change it, exactly as it could append to a list it was given.</p>

<h3>Class attributes</h3>
<p>Attributes assigned on <code>self</code> belong to one instance. Attributes assigned in the class body belong to the class itself and are shared by every instance:</p>
<pre><code>class BankAccount:
    interest_rate = 0.02          # shared by all accounts
    accounts_opened = 0

    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        BankAccount.accounts_opened += 1

    def add_interest(self):
        self.balance += self.balance * self.interest_rate</code></pre>
<p>Reading <code>self.interest_rate</code> looks for the name on the instance first and then on the class. Writing is different: assigning to <code>self.something</code> always creates or changes an attribute <em>on the instance</em>. That's why the constructor updates the counter through the class, <code>BankAccount.accounts_opened += 1</code>. If it said <code>self.accounts_opened += 1</code>, Python would read the class's 0, add 1, and store the 1 as a new instance attribute that hides the class one. The shared counter would stay at 0 forever, with no error:</p>
<pre><code>class Counted:
    accounts_opened = 0
    def __init__(self):
        self.accounts_opened += 1      # bug: creates an instance attribute

x, y = Counted(), Counted()
print(Counted.accounts_opened)         # 0
print(x.accounts_opened, y.accounts_opened)   # 1 1</code></pre>
<p>The rule: read class attributes through <code>self</code> if you like, but change them through the class name. Use class attributes for constants and shared counters, never for per-object data. A common bug is a class attribute holding a list, like <code>transactions = []</code> in the class body: every account would share one list.</p>

<h3>A first special method: making len() work</h3>
<p>Built-in functions can work on your own objects too. When you write <code>len(x)</code>, Python actually calls the method <code>x.__len__()</code> and returns whatever it returns. So to make <code>len</code> work on your class, define a method with exactly that name (two underscores on each side) that returns a whole number:</p>
<pre><code>class Playlist:
    def __init__(self):
        self._songs = []

    def add(self, song):
        self._songs.append(song)

    def __len__(self):
        return len(self._songs)

p = Playlist()
p.add("Blue in Green"); p.add("So What")
print(len(p))      # 2: Python called p.__len__()</code></pre>
<p>(The semicolon in <code>p.add("Blue in Green"); p.add("So What")</code> just puts two statements on one line; it means exactly the same as writing them on two lines. This course uses it only to keep short examples short.)</p>
<p>You never call <code>p.__len__()</code> yourself; you write <code>len(p)</code> and Python finds the method. Methods with these double-underscore names are called <strong>special methods</strong>, and <code>__init__</code> is one too. <a href="#c-cs102-c2">Lesson 2</a> is all about them: printing, comparing and adding your own objects work the same way.</p>

<h3>Designing a class</h3>
<p>A good way to start a design is to describe the thing in a sentence and look at the words. Nouns suggest classes and attributes; verbs suggest methods. "A <em>library</em> lends <em>books</em> to <em>members</em>; a member can borrow up to five books and must return them within three weeks." That suggests classes <code>Library</code>, <code>Book</code> and <code>Member</code>, methods like <code>borrow</code> and <code>return_book</code>, and invariants like "a member never has more than five books".</p>
<p>Keep each class focused on one responsibility. If you can't describe what a class is for in one sentence without "and", it's probably two classes.</p>
`,
    terms: [
      ["Class", "A user-defined type: a blueprint describing the data and methods its objects have."],
      ["Instance (object)", "One value created from a class, with its own attributes."],
      ["Attribute", "A named value stored on an object (or on a class)."],
      ["Method", "A function defined in a class; its first parameter self is the object it was called on."],
      ["Constructor", "The __init__ method, which sets up a new object's starting state."],
      ["Invariant", "A condition that holds for every object of a class between method calls."],
      ["Encapsulation", "Keeping an object's data behind its methods, so the class controls how it changes."]
    ],
    quiz: [
      { q: "Inside <code>a.deposit(50)</code>, what is <code>self</code>?", choices: ["The BankAccount class", "The object a", "The number 50", "A new copy of a"], answer: 1, why: "a.deposit(50) means BankAccount.deposit(a, 50), so self is a itself." },
      { q: "After <code>a = BankAccount(\"Ada\", 100)</code>, <code>c = a</code>, <code>c.deposit(10)</code>, what is <code>a.balance</code>?", choices: ["100", "110", "10", "An error"], answer: 1, why: "c and a refer to the same object; there is only one account." },
      { q: "Which is a good invariant for a <code>Rectangle</code> class?", choices: ["Its area is 10", "Its width and height are always positive", "It has a draw method", "It is a subclass of Shape"], answer: 1, why: "An invariant is a condition every instance satisfies at all times between method calls." },
      { q: "Why is <code>transactions = []</code> in a class body (not in __init__) usually a bug?", choices: ["Lists can't be attributes", "Every instance shares the same list", "It raises a SyntaxError", "It makes the class immutable"], answer: 1, why: "Class attributes belong to the class, so all accounts would append to one shared list. Create the list in __init__ instead." },
      { q: "What does a leading underscore on an attribute, like <code>self._balance</code>, mean in Python?", choices: ["It is truly private and can't be accessed", "It's a convention: internal, use the methods instead", "It is a class attribute", "It is constant"], answer: 1, why: "Python doesn't enforce privacy; the underscore tells other programmers not to touch it directly." }
    ],
    practice: [
      { q: `<p>Write a class <code>Counter</code> with a method <code>click()</code> that adds one, <code>reset()</code> that sets the count back to 0, and an attribute <code>count</code> that starts at 0. Create two counters and show they count independently.</p>`, a: `<pre><code>class Counter:
    def __init__(self):
        self.count = 0

    def click(self):
        self.count += 1

    def reset(self):
        self.count = 0

a, b = Counter(), Counter()
a.click(); a.click(); b.click()
print(a.count, b.count)   # 2 1</code></pre>` },
      { q: `<p>Add a <code>transfer(self, other, amount)</code> method to <code>BankAccount</code> that moves money from this account to <code>other</code>. Make sure that if the withdrawal fails, neither balance changes.</p>`, a: `<pre><code>    def transfer(self, other, amount):
        self.withdraw(amount)    # raises ValueError if funds are short
        other.deposit(amount)</code></pre><p>Withdrawing first is what keeps both balances unchanged on failure: if <code>withdraw</code> raises, <code>deposit</code> never runs. (If <code>deposit</code> could also fail, you'd need to undo the withdrawal. Real banking systems use <em>transactions</em> for exactly this: a transaction is a group of changes that is treated as one unit, so either all of them happen or none do. If any step fails, the system <em>rolls back</em> the steps already done. You'll meet transactions properly in the Databases course.)</p>` },
      { q: `<p>Find the bug: every <code>Student</code> ends up with every course.</p><pre><code>class Student:
    courses = []
    def __init__(self, name):
        self.name = name
    def enroll(self, course):
        self.courses.append(course)</code></pre>`, a: `<p><code>courses</code> is a class attribute, shared by every instance, so <code>append</code> adds to one list that all students see. Create a separate list per student in the constructor: <code>self.courses = []</code> inside <code>__init__</code>, and remove the class-level line.</p>` },
      { q: `<p>Design (on paper) classes for this description: "A playlist has a name and an ordered list of songs. Each song has a title, an artist and a length in seconds. You can add songs, remove a song by title, and get the playlist's total length." What are the classes, attributes, methods, and one invariant?</p>`, a: `<p>Classes <code>Song</code> (attributes <code>title</code>, <code>artist</code>, <code>seconds</code>) and <code>Playlist</code> (attributes <code>name</code>, <code>_songs</code>, a list). Methods on <code>Playlist</code>: <code>add(song)</code>, <code>remove(title)</code>, <code>total_seconds()</code>. Invariants: every song's length is positive (checked in <code>Song.__init__</code>); a playlist only contains <code>Song</code> objects. A design question to decide: what should <code>remove</code> do if the title isn't there, or appears twice?</p>` },
      { q: `<p>Write a class <code>Temperature</code> that stores a temperature in Celsius and has methods <code>to_fahrenheit()</code> and <code>to_kelvin()</code>. Its invariant: the temperature is never below absolute zero (−273.15 °C); the constructor should raise <code>ValueError</code> otherwise.</p>`, a: `<pre><code>class Temperature:
    def __init__(self, celsius):
        if celsius &lt; -273.15:
            raise ValueError("below absolute zero")
        self.celsius = celsius

    def to_fahrenheit(self):
        return self.celsius * 9 / 5 + 32

    def to_kelvin(self):
        return self.celsius + 273.15</code></pre>` }
    ],
    sources: ["thinkpython", "pytutorial", "mit6100l"]
  },
  {
    id: "c2",
    title: "Special methods and data abstraction",
    minutes: 90,
    summary: "Make your objects behave like built-in types with special methods such as __repr__, __eq__, __lt__ and __add__; control attribute access with properties; and use dataclasses and immutability.",
    notes: `
<p>Built-in types work smoothly with Python's syntax: you can print them, compare them with <code>==</code>, sort them, add them with <code>+</code>. Your own classes can do all of that too. Python looks for specially named methods, called <strong>special methods</strong> or "dunder" methods (for the <strong>d</strong>ouble <strong>under</strong>scores), and calls them when you use the matching syntax.</p>

<h3>A worked example: fractions</h3>
<p>We'll build a <code>Fraction</code> class step by step. Its invariant: the fraction is always stored in <em>lowest terms</em>, with a positive denominator. So 2/4 is stored as 1/2, and 3/−6 as −1/2.</p>
<pre><code>from math import gcd

class Fraction:
    def __init__(self, num, den=1):
        if den == 0:
            raise ZeroDivisionError("denominator is zero")
        if den &lt; 0:                   # keep the sign in the numerator
            num, den = -num, -den
        g = gcd(num, den)
        self.num = num // g
        self.den = den // g</code></pre>
<p>Why does the sign come out right? <code>math.gcd</code> always returns a number that is zero or positive, whatever the signs of its inputs: <code>gcd(-3, 6)</code> is 3, and <code>gcd(0, 5)</code> is 5. Trace <code>Fraction(3, -6)</code>: the denominator is negative, so both signs flip to give <code>num = -3</code>, <code>den = 6</code>; then <code>g = gcd(-3, 6) = 3</code>, and dividing gives <code>-3 // 3 = -1</code> and <code>6 // 3 = 2</code>, that is −1/2. Dividing by a positive <code>g</code> never changes a sign, so the denominator stays positive. (Zero works too: <code>Fraction(0, 5)</code> becomes 0/1.)</p>
<p>Because the constructor always normalizes, two fractions are equal exactly when their numerators and denominators are equal. Choosing a representation that makes later operations simple is a recurring theme in design.</p>

<h3>Printing: __repr__ and __str__</h3>
<p>Printing an object of a new class shows something like <code>&lt;__main__.Fraction object at 0x10e3...&gt;</code>. Define <code>__repr__</code> to give a precise representation for programmers (ideally one that looks like code to recreate the object), and optionally <code>__str__</code> for a friendly version that <code>print</code> uses:</p>
<pre><code>    def __repr__(self):
        return f"Fraction({self.num}, {self.den})"

    def __str__(self):
        return f"{self.num}/{self.den}"</code></pre>
<pre data-label="Python console"><code>&gt;&gt;&gt; Fraction(2, 4)
Fraction(1, 2)
&gt;&gt;&gt; print(Fraction(2, 4))
1/2</code></pre>
<p>Always write <code>__repr__</code>: it's what you see in the console, in lists of objects, and in error messages, so it makes debugging far easier. Write <code>__str__</code> as well only when there is a natural human-friendly form that differs from the code-like one: <code>1/2</code> for a fraction, <code>$12.05</code> for money, <code>2026-03-14</code> for a date. If a class has no <code>__str__</code>, <code>print</code> and <code>str()</code> fall back to <code>__repr__</code>, so for most classes one method is enough.</p>
<p>When an attribute is a string, the repr should show its quotes, the way Python does: <code>Person('Ada')</code>, not <code>Person(Ada)</code>. In an f-string, <code>!r</code> after a value inserts its <em>repr</em> instead of its plain text, and the repr of a string includes the quotes:</p>
<pre><code>name = "Ada"
print(f"{name}")      # Ada
print(f"{name!r}")    # 'Ada'

class Person:
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"Person({self.name!r})"

print(repr(Person("Ada")))   # Person('Ada')</code></pre>
<p>For numbers <code>!r</code> makes no difference, which is why the <code>Fraction</code> repr above doesn't need it.</p>

<h3>Comparison: __eq__ and __lt__</h3>
<p>By default, <code>==</code> on objects checks whether they are the <em>same object</em>, so <code>Fraction(1, 2) == Fraction(2, 4)</code> would be <code>False</code>. Define <code>__eq__</code> to compare values:</p>
<pre><code>    def __eq__(self, other):
        if not isinstance(other, Fraction):
            return NotImplemented
        return self.num == other.num and self.den == other.den

    def __lt__(self, other):
        return self.num * other.den &lt; other.num * self.den

    def __hash__(self):
        return hash((self.num, self.den))</code></pre>
<p>The built-in <code>isinstance(x, C)</code> returns <code>True</code> if <code>x</code> is an instance of the class <code>C</code> (or of a subclass of <code>C</code>, <a href="#c-cs102-c3">Lesson 3</a>) and <code>False</code> otherwise; <code>isinstance(3, int)</code> is <code>True</code>. Returning <code>NotImplemented</code> (a special value, not an error) tells Python "I don't know how to compare with that type". Python then gives the other object a chance to answer, and if neither knows, <code>==</code> falls back to checking identity. So <code>Fraction(1, 2) == "hello"</code> gives <code>False</code> instead of crashing. With <code>__lt__</code> defined, <code>sorted</code> works on a list of fractions.</p>
<p>Don't confuse <code>NotImplemented</code> with <code>NotImplementedError</code>, which you'll see in Lesson 3. They do different jobs:</p>
<ul>
  <li><code>NotImplemented</code> is a <em>value</em> that you <code>return</code> from an operator method such as <code>__eq__</code> or <code>__add__</code>. It means "not with this kind of operand; Python, try something else". It is not an error, and the program carries on.</li>
  <li><code>NotImplementedError</code> is an <em>exception</em> that you <code>raise</code>, usually in a base-class method that subclasses are supposed to replace. It means "this method was never written for this class", and it stops the program unless caught.</li>
</ul>

<h3>What is a hash, and why must equal objects have equal hashes?</h3>
<p>You've used sets and dictionaries since CS 101. They find items quickly by not searching through everything. A <strong>hash</strong> is an integer computed from a value by the built-in function <code>hash</code>; for example <code>hash((1, 2))</code> is some fixed integer. A set keeps its items in many numbered slots, called <em>buckets</em>, and puts each item in the bucket chosen by its hash (roughly <code>hash(item) % number_of_buckets</code>). To answer <code>x in s</code>, the set computes <code>hash(x)</code>, goes straight to that one bucket, and uses <code>==</code> to compare <code>x</code> only with the few items stored there. That's why lookups take about the same time whether the set holds ten items or ten million.</p>
<p>Now you can see the rule. Suppose <code>Fraction(1, 2)</code> is in a set and you ask whether <code>Fraction(2, 4)</code> is. They are equal, but if their hashes differed, the set would look in the wrong bucket, never compare them, and answer <code>False</code>. So <strong>if <code>a == b</code>, then <code>hash(a)</code> must equal <code>hash(b)</code></strong>. (The reverse isn't required: unequal objects may share a hash, which only costs a little time.) Our <code>__hash__</code> keeps the rule by hashing the tuple <code>(num, den)</code>, which is identical for equal fractions because both are stored in lowest terms:</p>
<pre><code>s = {Fraction(1, 2)}
print(Fraction(2, 4) in s)    # True: same hash, then == confirms</code></pre>
<p>Because the rule is so important, Python enforces part of it: a class that defines <code>__eq__</code> but not <code>__hash__</code> can't be put in a set at all (<code>TypeError: unhashable type</code>). The second rule is to <strong>hash only data that never changes</strong>. If an object's attributes changed after it went into a set, its hash would change too, and the set, still holding it in the old bucket, would look in the new one and fail to find it.</p>

<h3>Arithmetic: __add__, __mul__ and friends</h3>
<pre><code>    def __add__(self, other):
        return Fraction(self.num * other.den + other.num * self.den,
                        self.den * other.den)

    def __mul__(self, other):
        return Fraction(self.num * other.num, self.den * other.den)</code></pre>
<p>Now <code>Fraction(1, 2) + Fraction(1, 3)</code> gives <code>Fraction(5, 6)</code>. Notice the methods return <em>new</em> fractions instead of changing <code>self</code>, the way <code>3 + 4</code> doesn't change 3. Each new fraction goes through <code>__init__</code>, so the lowest-terms invariant is kept automatically.</p>
<table>
  <thead><tr><th>Syntax</th><th>Calls</th><th>Syntax</th><th>Calls</th></tr></thead>
  <tbody>
    <tr><td><code>a + b</code></td><td><code>a.__add__(b)</code></td><td><code>len(a)</code></td><td><code>a.__len__()</code></td></tr>
    <tr><td><code>a - b</code></td><td><code>a.__sub__(b)</code></td><td><code>x in a</code></td><td><code>a.__contains__(x)</code></td></tr>
    <tr><td><code>a * b</code></td><td><code>a.__mul__(b)</code></td><td><code>a[i]</code></td><td><code>a.__getitem__(i)</code></td></tr>
    <tr><td><code>a == b</code></td><td><code>a.__eq__(b)</code></td><td><code>abs(a)</code></td><td><code>a.__abs__()</code></td></tr>
    <tr><td><code>a &lt; b</code></td><td><code>a.__lt__(b)</code></td><td><code>for x in a</code></td><td><code>a.__iter__()</code></td></tr>
  </tbody>
</table>
<h4>Mixing types: Fraction(1, 2) + 1</h4>
<p>With the code above, <code>Fraction(1, 2) + 1</code> crashes with <code>AttributeError: 'int' object has no attribute 'den'</code>, because <code>__add__</code> assumes <code>other</code> is a fraction. It would be reasonable for it to work, since 1 is the fraction 1/1. Two changes make it work: convert integers, and add <code>__radd__</code>, the "reflected" add.</p>
<pre><code>    def __add__(self, other):
        if isinstance(other, int):
            other = Fraction(other)          # 1 becomes Fraction(1, 1)
        if not isinstance(other, Fraction):
            return NotImplemented            # let Python try other.__radd__
        return Fraction(self.num * other.den + other.num * self.den,
                        self.den * other.den)

    __radd__ = __add__                       # adding is symmetric</code></pre>
<p>For <code>1 + Fraction(1, 2)</code>, Python first tries <code>(1).__add__(Fraction(1, 2))</code>. The <code>int</code> type doesn't know about fractions and returns <code>NotImplemented</code>, so Python tries the right operand's <code>__radd__</code>, which we've made the same as <code>__add__</code>. Now <code>Fraction(1, 2) + 1</code> and <code>1 + Fraction(1, 2)</code> both give <code>Fraction(3, 2)</code>, and adding a string still fails with a clear <code>TypeError</code>.</p>
<p>Implementing the right special methods lets your type plug into the whole language: <code>max</code> works if <code>__lt__</code> does (<code>max</code> asks whether each item is <code>&gt;</code> the largest so far, and for a class with no <code>__gt__</code>, Python answers <code>a &gt; b</code> by asking <code>b &lt; a</code>), <code>for</code> works if <code>__iter__</code> does (Lesson 5), and <code>sum</code> works if <code>__add__</code> and <code>__radd__</code> do. (<code>sum</code> starts from the integer 0, so its first step is <code>0 + Fraction(...)</code>, which needs <code>__radd__</code>. Without it, use <code>sum(fractions, Fraction(0))</code> to start from a fraction instead.)</p>

<h3>Data abstraction</h3>
<p>Code that <em>uses</em> <code>Fraction</code> only needs to know its interface: you can make fractions, add, multiply, compare and print them. It doesn't need to know they're stored in lowest terms, or even that there are attributes called <code>num</code> and <code>den</code>. This separation between <em>what a type does</em> and <em>how it's represented</em> is <strong>data abstraction</strong>, and the boundary between the two is the <strong>abstraction barrier</strong>. If you later change the representation, say to cache a decimal value, code on the other side of the barrier keeps working unchanged.</p>

<h3>Properties: controlled attributes</h3>
<p>Sometimes you want something that looks like an attribute but runs code. The <code>@property</code> decorator does that:</p>
<pre><code>class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius        # goes through the setter below

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value &lt; -273.15:
            raise ValueError("below absolute zero")
        self._celsius = value

    @property
    def fahrenheit(self):             # computed, read-only
        return self._celsius * 9 / 5 + 32</code></pre>
<p>Callers write <code>t.celsius = 25</code> and <code>t.fahrenheit</code> as if they were plain attributes, but every assignment is checked, so the invariant can't be broken from outside. <code>fahrenheit</code> has no setter, so assigning to it raises an error.</p>
<p>How the setter syntax works, step by step. A decorator replaces the function below it with whatever the decorator returns (Lesson 5 shows this in detail). So after <code>@property</code>, the name <code>celsius</code> in the class no longer refers to a plain function: it refers to a <em>property object</em> holding that function as its "getter". Property objects have a method called <code>setter</code>. Writing <code>@celsius.setter</code> above the second function calls that method, which returns a new property object holding the old getter plus this function as the setter. The second function must also be named <code>celsius</code> so that the new, complete property replaces the old one under the same name; with a different name you'd end up with two separate properties. The whole thing is shorthand for <code>celsius = property(get_celsius, set_celsius)</code> with two ordinary methods.</p>

<h3>Dataclasses</h3>
<p>Many classes are mostly data: a point, a student record, a configuration. Writing <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code> for each is tedious, so the standard library generates them:</p>
<pre><code>from dataclasses import dataclass

@dataclass(frozen=True)
class Point:
    x: float
    y: float

    def distance_to(self, other):
        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5

p = Point(3, 4)
print(p)                       # Point(x=3, y=4)
print(p == Point(3, 4))        # True
print(p.distance_to(Point(0, 0)))   # 5.0</code></pre>
<p>The <code>x: float</code> lines are <strong>type hints</strong>, which Lesson 4 covers fully. For now, read <code>x: float</code> as "this class has a field named <code>x</code>, which is meant to hold a float". Python doesn't check the type when the program runs (<code>Point("a", "b")</code> would be accepted), but the <code>@dataclass</code> decorator reads these lines to learn the names and order of the fields, and generates <code>__init__(self, x, y)</code> from them. <code>frozen=True</code> makes instances <strong>immutable</strong>: assigning <code>p.x = 5</code> raises an error. Immutable objects are easier to reason about, safe to share, and can be hashed, so frozen dataclasses work as dictionary keys and set members automatically.</p>
<p>You can still write methods in a dataclass body, as <code>distance_to</code> shows, and that includes special methods. <code>@dataclass</code> only generates a method if the class doesn't already define one with that name, so a <code>__repr__</code> you write yourself is kept:</p>
<pre><code>@dataclass(frozen=True)
class Point:
    x: float
    y: float

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

print(Point(3, 4))    # Point(3, 4), not Point(x=3, y=4)</code></pre>
`,
    terms: [
      ["Special method", "A method with a double-underscore name that Python calls for built-in syntax, such as __add__ for +."],
      ["__repr__", "Returns an unambiguous string for programmers; shown in the console and in error messages."],
      ["NotImplemented", "A value a special method returns to say it can't handle that operand type. Not to be confused with the exception NotImplementedError."],
      ["Hash", "An integer computed from a value, used by sets and dicts to choose the bucket where the value is stored; equal objects must have equal hashes."],
      ["__radd__", "The reflected add, called for x + obj when x's own __add__ returns NotImplemented."],
      ["Data abstraction", "Separating what a type does (its interface) from how it is represented."],
      ["Property", "A method that is accessed like an attribute, letting a class validate or compute values."],
      ["Dataclass", "A class whose __init__, __repr__ and __eq__ are generated from declared fields."],
      ["Immutable object", "An object that can't be changed after creation."]
    ],
    quiz: [
      { q: "Without defining <code>__eq__</code>, what does <code>Fraction(1, 2) == Fraction(1, 2)</code> return?", choices: ["True", "False", "An error", "NotImplemented"], answer: 1, why: "The default == checks identity: these are two different objects." },
      { q: "Which special method makes <code>len(obj)</code> work?", choices: ["__size__", "__len__", "__count__", "__length__"], answer: 1, why: "len(obj) calls obj.__len__()." },
      { q: "Why do <code>__add__</code> methods usually return a new object rather than modifying <code>self</code>?", choices: ["It's faster", "So that a + b doesn't change a, matching how numbers behave", "Python requires it", "To avoid recursion"], answer: 1, why: "Users expect + to produce a new value and leave the operands alone." },
      { q: "A class defines <code>__eq__</code> to compare values. What else does it need to be used in a set?", choices: ["__lt__", "__hash__, with equal objects having equal hashes", "__repr__", "__len__"], answer: 1, why: "Sets find items by hash first, so equal objects must hash equally." },
      { q: "What does <code>@dataclass(frozen=True)</code> add?", choices: ["Faster attribute access", "Generated __init__, __repr__ and __eq__, plus immutability", "Automatic type checking at run time", "Serialization to JSON"], answer: 1, why: "Dataclasses generate the boilerplate methods; frozen makes instances immutable (and hashable)." }
    ],
    practice: [
      { q: `<p>Add <code>__sub__</code> and <code>__truediv__</code> (for <code>/</code>) to <code>Fraction</code>. What should division by a zero fraction do?</p>`, a: `<pre><code>    def __sub__(self, other):
        return Fraction(self.num * other.den - other.num * self.den, self.den * other.den)

    def __truediv__(self, other):
        return Fraction(self.num * other.den, self.den * other.num)</code></pre><p>Dividing by <code>Fraction(0, 1)</code> creates a fraction with denominator 0, and the constructor raises <code>ZeroDivisionError</code>. The invariant check in one place handles the error case for free.</p>` },
      { q: `<p>Write a class <code>Money</code> with <code>dollars</code> and <code>cents</code>, stored internally as a whole number of cents. Give it <code>__add__</code>, <code>__eq__</code>, <code>__lt__</code> and a <code>__repr__</code> like <code>Money(12, 5)</code>, and a <code>__str__</code> like <code>$12.05</code>. Why store cents as an integer rather than dollars as a float?</p>`, a: `<pre><code>class Money:
    def __init__(self, dollars, cents=0):
        self._cents = dollars * 100 + cents

    def __add__(self, other):
        return Money(0, self._cents + other._cents)

    def __eq__(self, other):
        return isinstance(other, Money) and self._cents == other._cents

    def __lt__(self, other):
        return self._cents &lt; other._cents

    def __hash__(self):
        return hash(self._cents)

    def __repr__(self):
        return f"Money({self._cents // 100}, {self._cents % 100})"

    def __str__(self):
        return f"\${self._cents // 100}.{self._cents % 100:02d}"</code></pre><p>Floats can't represent most cent amounts exactly, so totals drift (0.1 + 0.2 ≠ 0.3). Integer cents are exact. Notice the representation is hidden behind the interface.</p>` },
      { q: `<p>Explain why this class can't be used reliably as a set member, and fix it.</p><pre><code>class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)
    def __hash__(self):
        return hash((self.x, self.y))</code></pre>`, a: `<p>The hash depends on <code>x</code> and <code>y</code>, but they can be changed after the point is added to a set. The set stored the point in the bucket chosen by its <em>old</em> hash. Changing a coordinate changes the hash, so a later lookup goes to a different bucket and can no longer find the point, even though it is still in the set:</p><pre><code>p = Point(1, 2)
pts = {p}
p.x = 10
print(p in pts)            # False
print(Point(1, 2) in pts)  # False: right bucket, but the point there is now (10, 2)</code></pre><p>The fix is to make points immutable: use <code>@dataclass(frozen=True)</code>, or remove the ability to change coordinates (store them in underscore attributes with read-only properties).</p>` },
      { q: `<p>Give <code>BankAccount</code> a read-only <code>balance</code> property, so callers can see the balance but can only change it through <code>deposit</code> and <code>withdraw</code>.</p>`, a: `<pre><code>class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount &lt;= 0:
            raise ValueError("deposit must be positive")
        self._balance += amount</code></pre><p>With no setter, <code>account.balance = 10</code> raises <code>AttributeError</code>.</p>` },
      { q: `<p>Use a frozen dataclass to represent a playing card with a rank (2 to 14) and a suit. Then sort a list of cards by rank, and put cards in a set. Why does the set work?</p>`, hint: `<p>Sort with a <code>key</code> function, as in <a href="#c-cs101-u5">CS 101's lists lesson</a> ("Sorting with a key"): <code>key=lambda c: c.rank</code> sorts the cards by their rank.</p>`, a: `<pre><code>from dataclasses import dataclass

@dataclass(frozen=True)
class Card:
    rank: int
    suit: str

hand = [Card(12, "hearts"), Card(3, "spades"), Card(12, "hearts")]
print(sorted(hand, key=lambda c: c.rank))
print(len(set(hand)))   # 2</code></pre><p>Frozen dataclasses get <code>__eq__</code> and <code>__hash__</code> based on their fields, so the two queens of hearts are equal and the set keeps one.</p>` }
    ],
    sources: ["pytutorial", "thinkpython"]
  },
  {
    id: "c3",
    title: "Inheritance, composition and polymorphism",
    minutes: 90,
    summary: "Reuse and extend classes: subclasses and super(), overriding methods, polymorphism through shared interfaces, abstract base classes, and why composition is often the better choice.",
    notes: `
<p>As programs grow, many classes turn out to be variations on a theme: different kinds of shapes, accounts, employees, or game characters. Object-oriented languages offer two ways to build classes from other classes: <strong>inheritance</strong> ("is a") and <strong>composition</strong> ("has a"). Using each where it fits is one of the core skills of design.</p>

<h3>Inheritance</h3>
<p>A <strong>subclass</strong> inherits all the attributes and methods of its <strong>superclass</strong> (or base class), and can add new ones or replace existing ones.</p>
<pre><code>class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def withdraw(self, amount):
        if amount &gt; self.balance:
            raise ValueError("insufficient funds")
        self.balance -= amount

class SavingsAccount(Account):
    def __init__(self, owner, balance=0, rate=0.03):
        super().__init__(owner, balance)   # let Account set up its part
        self.rate = rate

    def add_interest(self):
        self.balance += self.balance * self.rate

class CheckingAccount(Account):
    fee = 1

    def withdraw(self, amount):            # override: same name, new behavior
        super().withdraw(amount + self.fee)</code></pre>
<ul>
  <li><code>class SavingsAccount(Account):</code> declares the superclass in parentheses.</li>
  <li><code>super().__init__(...)</code> calls the superclass's version of a method, here so <code>Account</code> sets up <code>owner</code> and <code>balance</code> before the subclass adds its own attribute. <code>super()</code> needs no arguments because Python fills them in: it knows which class the method was written in (<code>SavingsAccount</code>) and which object it was called on (<code>self</code>), and it starts looking for the method in the class after <code>SavingsAccount</code> in the inheritance chain, which here is <code>Account</code>. The long form, <code>super(SavingsAccount, self).__init__(owner, balance)</code>, means the same and appears in older code.</li>
  <li>Defining <code>withdraw</code> in <code>CheckingAccount</code> <strong>overrides</strong> the inherited one. It still uses the parent's logic through <code>super()</code>, adding the fee.</li>
</ul>
<p>When you call <code>acct.withdraw(10)</code>, Python looks for <code>withdraw</code> on the object's own class first, then on its superclass, and so on up the chain. <code>isinstance(acct, Account)</code> is <code>True</code> for an instance of any subclass of <code>Account</code>.</p>

<h3>Polymorphism</h3>
<p><strong>Polymorphism</strong> ("many forms") means code written against a shared interface works with any object that provides it:</p>
<pre><code>import math

class Shape:
    def area(self):
        raise NotImplementedError

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h
    def area(self):
        return self.w * self.h

class Circle(Shape):
    def __init__(self, r):
        self.r = r
    def area(self):
        return math.pi * self.r ** 2

def total_area(shapes):
    return sum(s.area() for s in shapes)

total_area([Rectangle(2, 3), Circle(1)])   # 6 + π ≈ 9.14</code></pre>
<p>Read <code>sum(s.area() for s in shapes)</code> as "the sum of <code>s.area()</code> for every <code>s</code> in <code>shapes</code>". It is like the list comprehension <code>sum([s.area() for s in shapes])</code> without the square brackets, which saves building the list. This form is a <em>generator expression</em>, which you met in <a href="#c-cs101-str">CS 101, Strings</a> (the one-line <code>clean</code>); <a href="#c-cs102-c5">Lesson 5</a> shows how it works. When it is the only argument of a call, the call's own parentheses are enough.</p>
<p><code>total_area</code> doesn't know or care what kinds of shapes it gets. Adding a <code>Triangle</code> class later requires no change to <code>total_area</code>. Compare the alternative, a function full of <code>if isinstance(s, Rectangle): … elif isinstance(s, Circle): …</code>, which must be edited for every new shape. Polymorphism lets you extend a program by adding code rather than changing it.</p>
<p>Python is <strong>duck typed</strong> ("if it walks like a duck and quacks like a duck…"): <code>total_area</code> works with <em>any</em> object that has an <code>area</code> method, even one that doesn't inherit from <code>Shape</code>. The shared base class mainly documents the intended interface.</p>

<h3>Abstract base classes</h3>
<p>The <code>raise NotImplementedError</code> above only complains when someone calls <code>area</code> on a shape that forgot to define it. The <code>abc</code> module catches the mistake earlier:</p>
<pre><code>from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        """Return the area of the shape."""

class Blob(Shape):
    pass

Blob()   # TypeError: Can't instantiate abstract class Blob ...</code></pre>
<p>An <strong>abstract class</strong> can't be instantiated; it exists only to define an interface that subclasses must fill in.</p>
<p>Is a docstring enough of a body? Yes. Python requires at least one statement inside a <code>def</code>, and a docstring is a statement (a string expression on its own line). An abstract method's body normally never runs, so a docstring that documents what subclasses must do is the most useful thing to put there. <code>pass</code> or <code>...</code> (Lesson 4) would also be valid. Notice the two styles in this lesson: the earlier <code>Shape</code> <em>raises</em> the exception <code>NotImplementedError</code> when called; the abstract version stops you from creating the object in the first place. (Neither is the value <code>NotImplemented</code> from Lesson 2, which operator methods return.)</p>

<h3>Composition: "has a" instead of "is a"</h3>
<p>Inheritance is tempting whenever two classes share code, but it couples them tightly: a subclass depends on every detail of its parent, and changing the parent can break it. Often it's better for one object to <em>contain</em> another and delegate work to it:</p>
<pre><code>class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower
    def start(self):
        return "vroom"

class Car:
    def __init__(self, model, engine):
        self.model = model
        self.engine = engine           # a Car HAS an Engine

    def start(self):
        return self.engine.start()     # delegate</code></pre>
<p>A car is not a kind of engine, so inheritance would be wrong here. Composition also lets you swap parts at run time, such as an electric motor with the same <code>start</code> method. A useful rule: use inheritance only for a genuine "is a" relationship where the subclass can be used anywhere the superclass is expected; otherwise prefer composition.</p>

<h3>When "is a" is wrong: squares and rectangles</h3>
<p>Mathematically, a square is a rectangle. In code it's often a bad subclass. Here is a mutable <code>Rectangle</code> with setters, and a <code>Square</code> that overrides them to keep its sides equal:</p>
<pre><code>class Rectangle:
    def __init__(self, w, h):
        self.w, self.h = w, h
    def set_width(self, w):
        self.w = w
    def set_height(self, h):
        self.h = h
    def area(self):
        return self.w * self.h

class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)
    def set_width(self, w):
        self.w = self.h = w          # keep the sides equal
    def set_height(self, h):
        self.w = self.h = h

def stretch(r):
    r.set_width(5)
    r.set_height(4)
    return r.area()                  # anyone reading this expects 5 × 4 = 20

print(stretch(Rectangle(2, 3)))      # 20
print(stretch(Square(2)))            # 16</code></pre>
<p>Trace the square: <code>set_width(5)</code> makes both sides 5; then <code>set_height(4)</code> makes both sides 4, undoing the width. The area is 4 × 4 = 16. Each class is reasonable on its own, but a <code>Square</code> can't be safely used where a <code>Rectangle</code> is expected.</p>
<p>The principle being broken is named after Barbara Liskov, who stated it in 1987: the <strong>Liskov substitution principle</strong> says objects of a subclass must be usable anywhere objects of the superclass are, without surprises. Liskov received the Turing Award in 2008 for her work on data abstraction.</p>

<h3>Designing a hierarchy</h3>
<ul>
  <li>Keep hierarchies shallow. Two or three levels is usually plenty; deep trees are hard to understand.</li>
  <li>Put shared behavior in the base class only if <em>every</em> subclass needs it.</li>
  <li>Override to specialize, and call <code>super()</code> to reuse the parent's work rather than copying it.</li>
  <li>If you're inheriting just to reuse a few helper methods, use composition or a plain function instead.</li>
</ul>
`,
    terms: [
      ["Inheritance", "Defining a class as a specialization of another, inheriting its attributes and methods."],
      ["Subclass / superclass", "The specialized class and the class it inherits from."],
      ["super()", "Accesses the superclass's version of a method, typically to extend rather than replace it."],
      ["Override", "Define a method in a subclass with the same name as one in the superclass."],
      ["Polymorphism", "Code written against a shared interface working with objects of many types."],
      ["Duck typing", "Using an object based on the methods it has, not its declared type."],
      ["Abstract class", "A class that defines an interface but can't itself be instantiated."],
      ["Composition", "Building an object from other objects it contains and delegates to (\"has a\")."],
      ["Liskov substitution principle", "A subclass must be usable anywhere its superclass is expected."]
    ],
    quiz: [
      { q: "A <code>SavingsAccount</code> subclass defines <code>__init__</code>. What should it usually call first?", choices: ["Account()", "super().__init__(...)", "self.__init__()", "Nothing"], answer: 1, why: "super().__init__ lets the superclass set up its own attributes." },
      { q: "<code>c = CheckingAccount(\"A\", 50)</code>. Which <code>withdraw</code> runs for <code>c.withdraw(10)</code>?", choices: ["Account.withdraw only", "CheckingAccount.withdraw, which calls Account.withdraw through super()", "Both, independently", "Neither"], answer: 1, why: "Python finds the method on the object's own class first; that override then calls the parent's version." },
      { q: "Which relationship is best modeled with composition?", choices: ["A Dog and an Animal", "A Car and an Engine", "A Circle and a Shape", "A SavingsAccount and an Account"], answer: 1, why: "A car has an engine; it isn't a kind of engine." },
      { q: "What happens when you try to create an instance of a class with an unimplemented <code>@abstractmethod</code>?", choices: ["It works, but the method returns None", "TypeError", "The method is inherited from object", "A warning is printed"], answer: 1, why: "Abstract classes can't be instantiated until every abstract method is defined." },
      { q: "Why can a mutable Square be a bad subclass of a mutable Rectangle?", choices: ["Squares have fewer attributes", "Code that sets width and height independently gets surprising results from a Square", "Python forbids it", "It makes the program slower"], answer: 1, why: "That breaks the Liskov substitution principle: a Square can't be used everywhere a Rectangle can." }
    ],
    practice: [
      { q: `<p>Add a <code>Triangle(base, height)</code> class to the shapes example and check that <code>total_area</code> works with it without changes. What property of the design made that possible?</p>`, a: `<pre><code>class Triangle(Shape):
    def __init__(self, base, height):
        self.base, self.height = base, height
    def area(self):
        return self.base * self.height / 2

total_area([Rectangle(2, 3), Triangle(4, 5)])   # 16.0</code></pre><p>Polymorphism: <code>total_area</code> depends only on the <code>area()</code> interface, so new shapes plug in without edits.</p>` },
      { q: `<p>Write a class hierarchy for employees: <code>Employee(name, salary)</code> with a method <code>pay()</code> returning a monthly amount (salary / 12), and <code>Manager</code>, which also has a <code>bonus</code> and adds bonus / 12 to the monthly pay. Use <code>super()</code>.</p>`, a: `<pre><code>class Employee:
    def __init__(self, name, salary):
        self.name, self.salary = name, salary
    def pay(self):
        return self.salary / 12

class Manager(Employee):
    def __init__(self, name, salary, bonus):
        super().__init__(name, salary)
        self.bonus = bonus
    def pay(self):
        return super().pay() + self.bonus / 12</code></pre>` },
      { q: `<p>Rewrite this inheritance as composition, and explain why it's better.</p><pre><code>class Stack(list):
    def push(self, x):
        self.append(x)</code></pre>`, a: `<pre><code>class Stack:
    def __init__(self):
        self._items = []
    def push(self, x):
        self._items.append(x)
    def pop(self):
        return self._items.pop()
    def __len__(self):
        return len(self._items)</code></pre><p>Inheriting from <code>list</code> exposes every list method, so users could call <code>insert(0, x)</code> or sort the stack, breaking the "last in, first out" behavior. Composition exposes only the operations a stack should have.</p>` },
      { q: `<p>A <code>Bird</code> class has a <code>fly()</code> method, and <code>Penguin</code> subclasses <code>Bird</code> but overrides <code>fly()</code> to raise an error. What design principle does this break, and how could you restructure it?</p>`, a: `<p>It breaks the Liskov substitution principle: code that calls <code>fly()</code> on any bird will crash on a penguin. One restructuring: a <code>Bird</code> base class without <code>fly</code>, and a separate <code>FlyingBird</code> subclass (or a "can fly" capability object composed in) that the flying birds use.</p>` },
      { q: `<p>In a game, characters can walk, swim, or fly, in various combinations. Explain why making a class for each combination (WalkingSwimmer, FlyingWalker, …) scales badly, and sketch a composition-based design.</p>`, a: `<p>With three abilities there are 7 non-empty combinations, and each new ability doubles the number of classes. Instead, give each <code>Character</code> a list of movement objects, such as <code>Walk()</code>, <code>Swim()</code> and <code>Fly()</code>, each with a <code>move()</code> method. A duck is <code>Character("duck", [Walk(), Swim(), Fly()])</code>. New abilities add one class, not dozens.</p>` }
    ],
    sources: ["pytutorial", "thinkpython"]
  },
  {
    id: "c4",
    title: "Types, interfaces and design",
    minutes: 90,
    summary: "Make interfaces explicit with type hints, protocols and enums; check them with a type checker; and design classes that are cohesive, loosely coupled and easy to change.",
    notes: `
<p>A class's <strong>interface</strong> is the promise it makes to the code that uses it: which methods exist, what they take, what they return, and what they guarantee. In small programs you keep that promise in your head. In large programs, written by many people over years, it needs to be written down and checked. This lesson covers the tools for that, and the design principles that keep interfaces small and stable.</p>

<h3>Type hints</h3>
<p>Python lets you annotate the types of parameters, return values and variables:</p>
<pre><code>def average(scores: list[float]) -&gt; float:
    return sum(scores) / len(scores)

class Inventory:
    def __init__(self) -&gt; None:
        self.items: dict[str, int] = {}

    def add(self, name: str, quantity: int = 1) -&gt; None:
        self.items[name] = self.items.get(name, 0) + quantity

    def count(self, name: str) -&gt; int:
        return self.items.get(name, 0)</code></pre>
<p>Python itself ignores type hints at run time: <code>average("oops")</code> still runs and fails in the usual way. Their value is that people and tools can read them. Editors use them for autocomplete, and a <strong>static type checker</strong> such as mypy or pyright reads your whole program without running it and reports mismatches, such as calling <code>inv.count(42)</code> when <code>name</code> should be a <code>str</code>. Type hints became part of Python in 2015 through PEP 484 and are now standard in professional code. (A <strong>PEP</strong>, Python Enhancement Proposal, is a numbered public document that proposes a change to Python; once accepted, it is the official description of that feature. PEP 8 is the style guide.)</p>
<p>To run mypy, install it once in a terminal with <code>python -m pip install mypy</code>, then run it on a file:</p>
<pre data-label="inventory.py"><code>class Inventory:
    def __init__(self) -&gt; None:
        self.items: dict[str, int] = {}

    def add(self, name: str, quantity: int = 1) -&gt; None:
        self.items[name] = self.items.get(name, 0) + quantity

    def count(self, name: str) -&gt; int:
        return self.items.get(name, 0)


inv = Inventory()
inv.add("apple", 3)
print(inv.count(42))    # line 14</code></pre>
<pre data-label="Shell"><code>$ mypy inventory.py
inventory.py:14: error: Argument 1 to "count" of "Inventory" has incompatible type "int"; expected "str"  [arg-type]
Found 1 error in 1 file (checked 1 source file)</code></pre>
<p>The <code>14</code> after the file name is the line number of the mistake. (The file has two blank lines after the class, as Python's style guide recommends, so the last line is line 14.) Running the program itself prints 0 and gives no warning; mypy finds the mistake without running anything. Many editors run a checker like this as you type and underline the error.</p>
<p>Useful forms:</p>
<table>
  <thead><tr><th>Hint</th><th>Means</th></tr></thead>
  <tbody>
    <tr><td><code>list[int]</code>, <code>dict[str, float]</code>, <code>tuple[int, int]</code></td><td>Collections with element types</td></tr>
    <tr><td><code>int | None</code></td><td>An int, or None (for example, "not found"). Older code writes the same type as <code>Optional[int]</code>, imported from <code>typing</code>; the two mean exactly the same, and the <code>|</code> form works from Python 3.10.</td></tr>
    <tr><td><code>Callable[[int], bool]</code></td><td>A function from int to bool</td></tr>
    <tr><td><code>Iterable[str]</code></td><td>Anything you can loop over that yields strings</td></tr>
  </tbody>
</table>
<p>The built-in names (<code>list</code>, <code>dict</code>, <code>tuple</code>, <code>int</code>, <code>None</code>) need no import. <code>Callable</code> and <code>Iterable</code> both come from the same place: <code>from collections.abc import Callable, Iterable</code>. (Older code imports them from <code>typing</code>, which still works.)</p>
<p>Prefer general types for parameters (<code>Iterable[str]</code> accepts lists, tuples, sets and generators) and specific types for return values (<code>list[str]</code> tells callers exactly what they get).</p>

<h3>Protocols: interfaces for duck typing</h3>
<p>An abstract base class requires implementers to inherit from it. A <strong>protocol</strong> describes an interface that any class satisfies just by having the right methods, matching Python's duck typing:</p>
<pre><code>from typing import Protocol

class HasArea(Protocol):
    def area(self) -&gt; float: ...

def total_area(shapes: list[HasArea]) -&gt; float:
    return sum(s.area() for s in shapes)</code></pre>
<p>Any class with an <code>area()</code> method that returns a float now satisfies <code>HasArea</code>, and the type checker verifies that, with no inheritance needed. The <code>...</code> at the end of the method line is a real Python value called <code>Ellipsis</code> (try <code>print(...)</code>). Used as a function body, it's a placeholder statement, like <code>pass</code>; by convention it means "no body here, only the signature matters", which is exactly what a protocol describes.</p>

<h3>Enums: a fixed set of choices</h3>
<p>When a value can only be one of a few options, a string like <code>"pending"</code> invites typos (<code>"pendng"</code>) that nothing catches. An <strong>enum</strong> makes the options a type:</p>
<pre><code>from enum import Enum

class Status(Enum):
    PENDING = "pending"
    SHIPPED = "shipped"
    DELIVERED = "delivered"

order_status = Status.SHIPPED
if order_status is Status.DELIVERED:
    print("Done")</code></pre>
<p>A misspelled <code>Status.SHIPED</code> fails immediately with an <code>AttributeError</code>, and a type checker flags it before the program even runs.</p>

<h3>Designing good classes</h3>
<p>Type hints document an interface; design decides what the interface should be. A few principles cover most of what matters:</p>
<ul>
  <li><strong>High cohesion.</strong> Everything in a class should relate to one responsibility. A <code>Report</code> class that formats text, sends email and talks to the database has three reasons to change; split it into three classes.</li>
  <li><strong>Low coupling.</strong> Classes should depend on each other as little as possible, and only through public interfaces. If changing one class's internals forces changes in five others, they're too tightly coupled.</li>
  <li><strong>Small interfaces.</strong> Every public method is a promise you must keep forever. Expose what callers need and keep the rest internal (with a leading underscore).</li>
  <li><strong>Tell, don't ask.</strong> Instead of asking an object for its data and acting on it (<code>if acct.balance &gt;= x: acct.balance -= x</code>), tell the object what to do (<code>acct.withdraw(x)</code>) so it can enforce its own rules.</li>
  <li><strong>Depend on abstractions.</strong> A <code>Checkout</code> class that takes "something with a <code>charge(amount)</code> method" works with any payment provider, and with a fake one in tests; one that creates a specific provider's object inside itself works with only that provider.</li>
</ul>
<p>Robert C. Martin collected five related principles around 2000, and Michael Feathers later gave them the acronym <strong>SOLID</strong>, which you'll see in job interviews and design books:</p>
<ul>
  <li><strong>S</strong>ingle responsibility: a class should have one reason to change (high cohesion, above).</li>
  <li><strong>O</strong>pen–closed: extend behavior by adding code, such as a new subclass, rather than editing working code (Lesson 3's <code>total_area</code>).</li>
  <li><strong>L</strong>iskov substitution: a subclass must work anywhere its superclass does (Lesson 3).</li>
  <li><strong>I</strong>nterface segregation: prefer several small interfaces to one large one (small interfaces, above).</li>
  <li><strong>D</strong>ependency inversion: depend on abstractions, not on specific classes (the last bullet above).</li>
</ul>
<p>They are guidelines rather than laws. Their common purpose is to make a program easy to change: most of the cost of software comes after it's first written.</p>

<h3>Worked example: improving a design</h3>
<p>Here is a first attempt at an online store's order handling:</p>
<pre><code>class Order:
    def __init__(self, items, customer_email):
        self.items = items                     # list of (name, price, quantity)
        self.customer_email = customer_email

    def process(self):
        total = sum(p * q for _, p, q in self.items)
        if total &gt; 100:
            total *= 0.9                       # discount
        # ... charge a credit card using a payment company's library ...
        # ... send a confirmation email ...
        return total</code></pre>
<p>(In <code>for _, p, q in self.items</code>, each item is a tuple of three values unpacked into three names. <code>_</code> is an ordinary variable name that, by convention, means "I don't use this one": here it receives the item's name.)</p>
<p>Problems: <code>process</code> mixes pricing, payment and email, so a change in any of them touches this method; it can't be tested without charging a card and sending an email; and items are anonymous tuples. A better design:</p>
<pre><code>from dataclasses import dataclass
from typing import Protocol

@dataclass(frozen=True)
class LineItem:
    name: str
    price: float
    quantity: int

class PaymentGateway(Protocol):
    def charge(self, email: str, amount: float) -&gt; None: ...

class Notifier(Protocol):
    def send(self, email: str, message: str) -&gt; None: ...

class Order:
    def __init__(self, items: list[LineItem], email: str) -&gt; None:
        self.items, self.email = items, email

    def total(self) -&gt; float:
        subtotal = sum(i.price * i.quantity for i in self.items)
        return subtotal * 0.9 if subtotal &gt; 100 else subtotal

class Checkout:
    def __init__(self, payments: PaymentGateway, notifier: Notifier) -&gt; None:
        self.payments, self.notifier = payments, notifier

    def complete(self, order: Order) -&gt; float:
        amount = order.total()
        self.payments.charge(order.email, amount)
        self.notifier.send(order.email, f"Thanks! You paid {amount:.2f}.")
        return amount</code></pre>
<p>Now pricing can be tested on its own; <code>Checkout</code> can be tested with fake payment and notification objects (Lesson 6); and switching payment providers means writing one new class, not editing <code>Order</code>. The design has more pieces, but each is simple and has one reason to change.</p>
`,
    terms: [
      ["Interface", "The public methods and guarantees a class offers to code that uses it."],
      ["Type hint", "An annotation stating the expected type of a parameter, return value or variable."],
      ["Static type checker", "A tool such as mypy that checks type hints across a program without running it."],
      ["Protocol", "A type describing required methods, satisfied by any class that has them."],
      ["Enum", "A type whose values are a fixed set of named options."],
      ["Cohesion", "How closely the parts of a class relate to a single responsibility."],
      ["Coupling", "How much classes depend on each other's details."]
    ],
    quiz: [
      { q: "What happens at run time if you call <code>average(\"oops\")</code> on a function annotated <code>scores: list[float]</code>?", choices: ["Python raises a type error before calling", "Type hints are ignored at run time; it fails however the code would normally fail", "The argument is converted to a list", "Nothing happens"], answer: 1, why: "Python doesn't enforce hints. Static checkers like mypy report the mismatch before you run." },
      { q: "Which parameter type accepts a list, a tuple, a set or a generator of strings?", choices: ["list[str]", "Iterable[str]", "tuple[str]", "str"], answer: 1, why: "Iterable means anything you can loop over." },
      { q: "A class with a <code>charge</code> method satisfies a <code>PaymentGateway</code> protocol only if:", choices: ["It inherits from PaymentGateway", "It has a charge method with a matching signature", "It is registered with the protocol", "It is a dataclass"], answer: 1, why: "Protocols use structural typing: having the right methods is enough." },
      { q: "Why is <code>acct.withdraw(x)</code> better design than <code>if acct.balance &gt;= x: acct.balance -= x</code> in the caller?", choices: ["It's shorter", "The account enforces its own rules in one place (tell, don't ask)", "It runs faster", "It avoids type hints"], answer: 1, why: "Logic about an object's data belongs in the object, where its invariants can be kept." },
      { q: "In the improved store design, why does Checkout take payments and notifier as parameters?", choices: ["To save memory", "So any provider, including a fake one in tests, can be used without changing Checkout", "Because Python requires it", "To make it a dataclass"], answer: 1, why: "Depending on abstractions passed in lowers coupling and makes testing easy." }
    ],
    practice: [
      { q: `<p>Add type hints to these functions: <code>def first_word(text): return text.split()[0] if text.split() else None</code> and <code>def apply_all(funcs, x): return [f(x) for f in funcs]</code> (where every function takes and returns an int).</p>`, a: `<pre><code>from collections.abc import Callable

def first_word(text: str) -&gt; str | None:
    words = text.split()
    return words[0] if words else None

def apply_all(funcs: list[Callable[[int], int]], x: int) -&gt; list[int]:
    return [f(x) for f in funcs]</code></pre>` },
      { q: `<p>Replace the string statuses in this code with an enum, and say what bug it would have caught.</p><pre><code>def next_status(s):
    if s == "pending": return "shipped"
    if s == "shiped": return "delivered"
    return s</code></pre>`, a: `<pre><code>from enum import Enum

class Status(Enum):
    PENDING = "pending"
    SHIPPED = "shipped"
    DELIVERED = "delivered"

def next_status(s: Status) -&gt; Status:
    if s is Status.PENDING:
        return Status.SHIPPED
    if s is Status.SHIPPED:
        return Status.DELIVERED
    return s</code></pre><p>The original misspells <code>"shiped"</code>, so shipped orders never advance to delivered, silently. With an enum, <code>Status.SHIPED</code> raises <code>AttributeError</code> immediately.</p>` },
      { q: `<p>Identify the cohesion and coupling problems in this class, and propose a split.</p><pre><code>class StudentManager:
    def add_student(self, name): ...
    def compute_gpa(self, student): ...
    def save_to_database(self): ...
    def render_report_html(self, student): ...
    def email_report(self, student): ...</code></pre>`, a: `<p>It has at least four responsibilities: managing student records, computing grades, storage, and reporting/emailing. Changes to the database, the HTML design, or the email service would all touch it. A split: <code>Roster</code> (adding and finding students), <code>GradeCalculator</code> (GPA), <code>StudentRepository</code> (saving and loading), <code>ReportRenderer</code> (HTML) and <code>Mailer</code> (sending), with a small coordinating function that uses them.</p>` },
      { q: `<p>Write a <code>FakeGateway</code> and <code>FakeNotifier</code> that record what they were asked to do, and use them to check that <code>Checkout.complete</code> charges the discounted total for an order over $100.</p>`, a: `<pre><code>class FakeGateway:
    def __init__(self):
        self.charges = []
    def charge(self, email, amount):
        self.charges.append((email, amount))

class FakeNotifier:
    def __init__(self):
        self.sent = []
    def send(self, email, message):
        self.sent.append((email, message))

pay, note = FakeGateway(), FakeNotifier()
order = Order([LineItem("desk", 120.0, 1)], "ada@example.com")
assert Checkout(pay, note).complete(order) == 108.0
assert pay.charges == [("ada@example.com", 108.0)]
assert len(note.sent) == 1</code></pre><p>No card is charged and no email is sent, yet the logic is fully tested. This is why depending on abstractions matters.</p>` },
      { q: `<p>A colleague proposes adding twelve public methods to a class "in case someone needs them". What would you say in a code review?</p>`, a: `<p>Every public method is a commitment: it must be documented, tested and kept working, and removing it later can break other people's code. Add methods when there's a real caller that needs them. Keeping the interface small also keeps the class easier to understand and to change.</p>` }
    ],
    sources: ["pytutorial", "thinkpython"]
  }
]);

CSA.addUnits("cs102", [
  {
    id: "c5",
    title: "Iterators, generators and functional tools",
    minutes: 90,
    summary: "How a for loop really works; writing your own iterators and generators; lazy sequences; and functions as values: lambdas, closures, map and filter, and decorators.",
    notes: `
<p>You've written hundreds of <code>for</code> loops over lists, strings, ranges, dictionaries and files. They all work the same way underneath, through a small protocol you can implement yourself. This lesson opens up the <code>for</code> loop, then looks at another powerful idea: functions are values that can be passed around, returned and wrapped.</p>

<h3>The iterator protocol</h3>
<p>An <strong>iterable</strong> is anything you can loop over. An <strong>iterator</strong> is an object that hands out values one at a time and remembers where it is. Two built-in functions connect them:</p>
<pre data-label="Python console"><code>&gt;&gt;&gt; it = iter([10, 20, 30])   # ask the list for an iterator
&gt;&gt;&gt; next(it)
10
&gt;&gt;&gt; next(it)
20
&gt;&gt;&gt; next(it)
30
&gt;&gt;&gt; next(it)
StopIteration</code></pre>
<p>A <code>for</code> loop is exactly this, done for you:</p>
<pre><code># for x in items:
#     print(x)
# is equivalent to:
it = iter(items)
while True:
    try:
        x = next(it)
    except StopIteration:
        break
    print(x)</code></pre>
<p><code>iter(obj)</code> calls <code>obj.__iter__()</code>, and <code>next(it)</code> calls <code>it.__next__()</code>. So a class can support <code>for</code> loops by providing these methods:</p>
<pre><code>class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current &lt; 1:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

for n in Countdown(3):
    print(n)          # 3, 2, 1</code></pre>
<p>Because this object is its own iterator, it can be looped over only once: after the first loop, <code>current</code> is 0. A list, by contrast, creates a <em>fresh</em> iterator each time <code>iter</code> is called, which is why you can loop over a list many times.</p>

<h3>Generators: iterators the easy way</h3>
<p>Writing <code>__next__</code> by hand means storing all the loop's state in attributes. A <strong>generator function</strong> lets Python do that bookkeeping. Any function containing <code>yield</code> is a generator function:</p>
<pre><code>def countdown(start):
    while start &gt;= 1:
        yield start
        start -= 1

for n in countdown(3):
    print(n)          # 3, 2, 1</code></pre>
<p>Calling <code>countdown(3)</code> doesn't run the body. It returns a <strong>generator object</strong>, an iterator. Each <code>next</code> runs the body until the next <code>yield</code>, hands out that value, and <em>pauses</em> there, keeping all local variables. The next <code>next</code> resumes right after the <code>yield</code>. When the function returns, the generator raises <code>StopIteration</code>.</p>
<p>The easiest way to make a class iterable is often to write <code>__iter__</code> as a generator:</p>
<pre><code>class Playlist:
    def __init__(self, songs):
        self._songs = list(songs)

    def __iter__(self):
        for song in self._songs:
            yield song</code></pre>

<h3>Laziness and infinite sequences</h3>
<p>A generator computes each value only when asked. That's called <strong>lazy evaluation</strong>, and it has two big benefits. It saves memory: summing a billion squares with <code>sum(x * x for x in range(10**9))</code> never builds a billion-item list. And it allows <em>infinite</em> sequences:</p>
<pre><code>def fibonacci():
    a, b = 0, 1
    while True:            # never ends, and that's fine
        yield a
        a, b = b, a + b

from itertools import islice
print(list(islice(fibonacci(), 10)))   # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]</code></pre>
<p><code>islice(iterable, n)</code> gives the first <code>n</code> items of any iterable, lazily, and then stops, so it is a safe way to take a few values from an infinite generator. (<code>islice(iterable, start, stop)</code> skips to position <code>start</code> first, like the slice <code>[start:stop]</code>: <code>list(islice(fibonacci(), 2, 6))</code> is <code>[1, 2, 3, 5]</code>.)</p>
<p>The expression <code>(x * x for x in data)</code>, with parentheses instead of brackets, is a <strong>generator expression</strong>, which you first met in <a href="#c-cs101-str">CS 101, Strings</a>, in the one-line <code>clean</code>. Now you can see what it is: like a list comprehension, but lazy. When a generator expression is the <em>only</em> argument of a call, you may leave out its own parentheses and let the call's parentheses do the job: <code>sum(x * x for x in data)</code> means <code>sum((x * x for x in data))</code>. With a second argument you need both: <code>sum((x * x for x in data), 0)</code>. Generators can be chained into <strong>pipelines</strong> in which each stage pulls items from the one before:</p>
<pre><code>def read_lines(path):
    with open(path) as f:
        for line in f:
            yield line.rstrip("\\n")

def non_blank(lines):
    return (line for line in lines if line.strip())

def numbers(lines):
    return (float(line) for line in lines)

total = sum(numbers(non_blank(read_lines("data.txt"))))</code></pre>
<p>Only one line is in memory at a time, so this works on a file of any size. The <code>itertools</code> module provides ready-made pieces for pipelines, such as <code>islice</code>, <code>count</code>, <code>chain</code> and <code>groupby</code>.</p>
<p>One caution: a generator can be consumed only once. If you need the values twice, store them in a list.</p>

<h3>Functions are values</h3>
<p>In Python, a function is an object like any other: you can store it in a variable, put it in a list, pass it to another function, or return it from one. You've already done this with <code>sorted(words, key=len)</code>, which passes the function <code>len</code> itself (no parentheses) for <code>sorted</code> to call. A function that takes or returns functions is a <strong>higher-order function</strong>.</p>
<p>You met <strong>lambda</strong> in <a href="#c-cs101-u3">CS 101, Functions and abstraction</a>, and used it as a sort key in <a href="#c-cs101-u5">CS 101's lists lesson</a>. As a reminder, a lambda creates a short function, used once, without a name:</p>
<pre><code>students = [("Ada", 92), ("Alan", 85), ("Grace", 97)]
by_score = sorted(students, key=lambda s: s[1], reverse=True)

list(map(lambda x: x * 2, [1, 2, 3]))        # [2, 4, 6]
list(filter(lambda x: x % 2 == 0, range(7)))  # [0, 2, 4, 6]</code></pre>
<p>A lambda can only contain a single expression. <code>lambda x: x * 2</code> means the same as a <code>def</code> that takes <code>x</code> and returns <code>x * 2</code>. Two classic higher-order functions appear above. <code>map(f, items)</code> applies <code>f</code> to each item, giving <code>f(item)</code> for each one in turn. <code>filter(f, items)</code> keeps only the items for which <code>f(item)</code> is true. Both are lazy, like generators: they return an iterator, not a list, which is why the examples wrap them in <code>list(...)</code>. In Python, comprehensions are usually clearer than <code>map</code> and <code>filter</code>: <code>[x * 2 for x in xs]</code> says the same thing more directly.</p>

<h3>Closures</h3>
<p>A function defined inside another function can use the outer function's variables, even after the outer function has returned:</p>
<pre><code>def make_multiplier(n):
    def multiply(x):
        return x * n        # n comes from the enclosing call
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(10), triple(10))   # 20 30</code></pre>
<p>Each call to <code>make_multiplier</code> creates a new <code>multiply</code> function that remembers its own <code>n</code>. A function bundled with the variables it captured is called a <strong>closure</strong>. To <em>change</em> a captured variable, declare it <code>nonlocal</code>:</p>
<pre><code>def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

c = make_counter()
c(); c()
print(c())    # 3</code></pre>
<p>A closure with state is a tiny object: data plus behavior. Closures and objects are two ways to express the same idea.</p>
<p><strong><code>nonlocal</code> or <code>global</code>?</strong> You need either one only when a function <em>assigns</em> to a name it didn't create; reading a variable from an outer scope never needs a declaration. Use <code>nonlocal</code> when the variable belongs to an enclosing <em>function</em>, as with <code>count</code> above. Use <code>global</code> when it belongs to the module, the top level of the file. Global variables that functions change make programs hard to follow and test, so treat <code>global</code> as a last resort; usually a return value, a parameter, or an object attribute is clearer.</p>
<p><strong>Closures capture variables, not values.</strong> The inner function doesn't copy <code>n</code> when it's created; it remembers the variable and looks up its current value each time it runs. That rarely matters, except in a loop:</p>
<pre><code>funcs = []
for i in range(3):
    funcs.append(lambda: i)    # each lambda refers to the variable i
print([f() for f in funcs])    # [2, 2, 2]: by now i is 2</code></pre>
<p>All three functions share one variable <code>i</code>, and they are called after the loop has left it at 2. To freeze the value at creation time, pass it in as a default argument: <code>lambda i=i: i</code>. A default value is evaluated once, when the function is <em>created</em>, and stored with that function; so the first lambda stores 0, the second 1, the third 2, and the parameter <code>i</code> inside each one starts with its own stored value. Calling <code>make_multiplier</code> in a loop works too, because each call creates a fresh variable <code>n</code>.</p>

<h3>Decorators</h3>
<p>A <strong>decorator</strong> is a function that takes a function and returns a new function that wraps it, adding behavior before or after. The <code>@</code> syntax applies one:</p>
<pre><code>import time
import functools

def timed(func):
    @functools.wraps(func)          # keep the original's name and docstring
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.perf_counter() - start:.4f} s")
        return result
    return wrapper

@timed                              # same as: slow_sum = timed(slow_sum)
def slow_sum(n):
    return sum(range(n))

slow_sum(10_000_000)</code></pre>
<p>(Python ignores underscores between digits, so <code>10_000_000</code> is just ten million, written so you can count the zeros.) <code>*args</code> and <code>**kwargs</code> collect any positional and keyword arguments, so the wrapper works for any function. In a parameter list, <code>*args</code> gathers the extra positional arguments into a tuple and <code>**kwargs</code> gathers the keyword arguments into a dictionary (the names are conventions; the stars do the work):</p>
<pre><code>def show(*args, **kwargs):
    print("args =", args)
    print("kwargs =", kwargs)

show(1, "two", x=3, y=4)
# args = (1, 'two')
# kwargs = {'x': 3, 'y': 4}</code></pre>
<p>In a <em>call</em>, the stars do the reverse: <code>func(*args, **kwargs)</code> unpacks the tuple back into positional arguments and the dictionary into keyword arguments. So the wrapper receives whatever the caller passed and hands exactly the same arguments on to <code>func</code>.</p>
<p>What does <code>@functools.wraps(func)</code> fix? The decorated name now refers to <code>wrapper</code>, so without it the function would introduce itself as the wrong thing: <code>slow_sum.__name__</code> would be <code>'wrapper'</code> and its docstring would be <code>None</code>. That breaks <code>help(slow_sum)</code>, makes error tracebacks and logs name <code>wrapper</code> instead of the function you wrote, and confuses tools that look functions up by name, such as pytest. <code>functools.wraps</code> copies the name, docstring and other details from <code>func</code> onto <code>wrapper</code>, and the decorator in the example prints the right name only because of it.</p>
<h4>Decorators with arguments</h4>
<p><code>@functools.wraps(func)</code> has parentheses and an argument, unlike <code>@timed</code>. The rule is that Python first evaluates whatever follows the <code>@</code>, then uses the result as the decorator. <code>@timed</code> evaluates to the function <code>timed</code> itself. <code>@functools.wraps(func)</code> first <em>calls</em> <code>functools.wraps(func)</code>, which returns a decorator (a function that takes a function), and that decorator is applied to <code>wrapper</code>:</p>
<pre><code>@functools.wraps(func)        # same as: wrapper = functools.wraps(func)(wrapper)
def wrapper(*args, **kwargs): ...

@dataclass(frozen=True)       # same as: Point = dataclass(frozen=True)(Point)
class Point: ...</code></pre>
<p>So a decorator with arguments is a function that <em>makes</em> a decorator. It still fits the definition: what finally gets applied takes one function (or class) and returns its replacement. You'll see the same pattern in <code>@pytest.mark.parametrize(...)</code> in Lesson 6. You don't need to write decorator factories yourself in this course.</p>
<h4>Functions can carry attributes</h4>
<p>Because functions are objects, you can attach attributes to them, just as you do to instances: <code>f.note = "hello"</code> works on any function <code>f</code> you defined. A wrapper can use this to keep information about itself where callers can read it:</p>
<pre><code>def logged(func):
    @functools.wraps(func)
    def wrapper(*args):
        wrapper.history.append(args)   # wrapper finds itself by name when it runs
        return func(*args)
    wrapper.history = []               # attach the attribute before returning
    return wrapper

@logged
def add(a, b):
    return a + b

add(1, 2); add(5, 6)
print(add.history)    # [(1, 2), (5, 6)]</code></pre>
<p>Two details make this work. The attribute is created once, in <code>logged</code>, before the wrapper is ever called. And inside <code>wrapper</code>, the name <code>wrapper</code> refers to the enclosing function's variable, which holds the wrapper function itself; it is looked up each time the wrapper runs. Changing an attribute, as in <code>wrapper.history.append(...)</code> or <code>wrapper.count += 1</code>, changes the <em>object</em>, not which object the name refers to, so it needs no <code>nonlocal</code>.</p>
<p>You've already used decorators: <code>@property</code>, <code>@dataclass</code> and <code>@abstractmethod</code>. A very useful one from the standard library is <code>@functools.cache</code>, which remembers the results of previous calls:</p>
<pre><code>@functools.cache
def fib(n):
    return n if n &lt; 2 else fib(n - 1) + fib(n - 2)

fib(100)   # 354224848179261915075, instantly</code></pre>
<p>With the cache, each of <code>fib(0)</code> to <code>fib(100)</code> is computed once. Without it, the number of calls <em>C</em>(<em>n</em>) obeys <em>C</em>(<em>n</em>) = 1 + <em>C</em>(<em>n</em> − 1) + <em>C</em>(<em>n</em> − 2), almost Fibonacci's own rule, and works out to 2<em>F</em>(<em>n</em> + 1) − 1 (try <em>n</em> = 2: 3 calls). For <code>fib(100)</code> that's about 1.1 × 10²¹ calls. At roughly 30 million calls a second, a typical speed for Python on a laptop, that's about a million years.</p>
<p>Remembering results this way is called <strong>memoization</strong>. You'll meet it again in algorithms as the basis of dynamic programming.</p>
`,
    terms: [
      ["Iterable", "An object you can loop over; iter() gives an iterator for it."],
      ["Iterator", "An object that returns values one at a time with next() and raises StopIteration at the end."],
      ["Generator", "A function containing yield; calling it returns an iterator that runs the body lazily, pausing at each yield."],
      ["Lazy evaluation", "Computing values only when they're needed."],
      ["Higher-order function", "A function that takes or returns functions."],
      ["Lambda", "A small anonymous function written as a single expression."],
      ["Closure", "A function together with variables it captured from the scope where it was defined."],
      ["Decorator", "A function that wraps another function to add behavior, applied with @."],
      ["Memoization", "Caching a function's results so repeated calls with the same arguments are instant."]
    ],
    quiz: [
      { q: "What does calling a generator function, like <code>countdown(3)</code>, do immediately?", choices: ["Runs the body and returns a list", "Returns a generator object without running the body yet", "Prints 3, 2, 1", "Raises StopIteration"], answer: 1, why: "The body runs only as values are requested with next()." },
      { q: "What does <code>next</code> raise when an iterator has no more values?", choices: ["IndexError", "StopIteration", "ValueError", "It returns None"], answer: 1, why: "StopIteration is how iterators signal the end; for loops catch it." },
      { q: "<code>g = (x * x for x in range(3))</code>. What is <code>list(g) + list(g)</code>?", choices: ["[0, 1, 4, 0, 1, 4]", "[0, 1, 4]", "An error", "[]"], answer: 1, why: "A generator can be consumed only once; the second list(g) is empty." },
      { q: "After <code>double = make_multiplier(2)</code> (from the Closures section), why does <code>double(10)</code> still know about 2?", choices: ["5 is a global variable", "The inner function captured n from the enclosing call", "Python re-runs make_adder", "Default arguments"], answer: 1, why: "That's what a closure is: a function plus the variables it captured." },
      { q: "<code>@timed</code> above <code>def f(): ...</code> is equivalent to:", choices: ["f = timed", "f = timed(f)", "timed = f(timed)", "f()"], answer: 1, why: "The decorator receives the function and its return value replaces the name." }
    ],
    practice: [
      { q: `<p>Write a generator <code>evens(limit)</code> that yields the even numbers from 0 up to but not including <code>limit</code>. Then write an infinite generator <code>squares()</code> and use <code>islice</code> to print the first five squares.</p>`, a: `<pre><code>from itertools import islice

def evens(limit):
    n = 0
    while n &lt; limit:
        yield n
        n += 2

def squares():
    n = 1
    while True:
        yield n * n
        n += 1

print(list(evens(9)))                 # [0, 2, 4, 6, 8]
print(list(islice(squares(), 5)))     # [1, 4, 9, 16, 25]</code></pre>` },
      { q: `<p>Trace this code. What does it print, and in what order?</p><pre><code>def gen():
    print("start")
    yield 1
    print("middle")
    yield 2
    print("end")

g = gen()
print("created")
print(next(g))
print(next(g))</code></pre>`, a: `<pre data-label="Output"><code>created
start
1
middle
2</code></pre><p>Nothing runs until the first <code>next</code>. Each <code>next</code> runs up to the following <code>yield</code>. "end" is never printed because nobody asked for a third value.</p>` },
      { q: `<p>Rewrite with a comprehension: <code>list(map(lambda w: w.upper(), filter(lambda w: len(w) &gt; 3, words)))</code></p>`, a: `<pre><code>[w.upper() for w in words if len(w) &gt; 3]</code></pre>` },
      { q: `<p>Write a decorator <code>count_calls</code> that counts how many times the decorated function has been called, storing the count in an attribute <code>calls</code> on the wrapper.</p>`, a: `<pre><code>import functools

def count_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper

@count_calls
def greet(name):
    return f"Hi {name}"

greet("A"); greet("B")
print(greet.calls)   # 2</code></pre><p>Functions are objects, so they can have attributes (see "Functions can carry attributes" above). <code>wrapper.calls += 1</code> changes an attribute of the wrapper object, not the variable <code>wrapper</code>, so no <code>nonlocal</code> is needed.</p>` },
      { q: `<p>What's wrong with this code, which tries to make three functions that return 0, 1 and 2?</p><pre><code>funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])   # [2, 2, 2]</code></pre>`, a: `<p>All three lambdas capture the <em>variable</em> <code>i</code>, not its value at the time; by the time they're called, the comprehension has finished and <code>i</code> is 2. Capture the current value with a default argument: <code>[lambda i=i: i for i in range(3)]</code>. Read <code>lambda i=i: i</code> as "a function with one parameter named <code>i</code>, whose default is the <em>current</em> value of the loop's <code>i</code>". The default is computed once, when each lambda is created (0, then 1, then 2), and stored with that lambda. When you call <code>f()</code> with no argument, the parameter takes its stored default, so the result is <code>[0, 1, 2]</code>. A factory function like <code>make_multiplier</code> also works, since each call creates a separate variable.</p>` }
    ],
    sources: ["composing", "pytutorial", "thinkpython"]
  },
  {
    id: "c6",
    title: "Test-driven development",
    minutes: 90,
    summary: "Write the test first: pytest, assertions and fixtures, parametrized tests, testing exceptions, fakes for dependencies, the red–green–refactor cycle, and refactoring safely.",
    notes: `
<p>In <a href="#c-cs101-u6">CS 101's testing lesson</a> you tested functions with a few <code>assert</code> statements. Professional programmers go further: they keep a <strong>test suite</strong>, a collection of automated tests that runs in seconds and checks the whole program every time anything changes. Many write each test <em>before</em> the code it tests. This lesson teaches the tools and the habit.</p>

<h3>Why automated tests?</h3>
<ul>
  <li><strong>Confidence to change code.</strong> Most work on software is changing existing code. Without tests, every change risks breaking something you can't see. With them, you find out in seconds.</li>
  <li><strong>Documentation that can't go stale.</strong> A test shows exactly how code is meant to be used, and it fails if the code stops behaving that way.</li>
  <li><strong>Better design.</strong> Code that's hard to test is usually badly designed: it does too much, or is tangled up with files, networks or clocks. Writing tests pushes you toward small, decoupled pieces.</li>
</ul>

<h3>pytest</h3>
<p><strong>pytest</strong> is the most widely used Python testing tool. Install it with <code>pip install pytest</code> (or <code>python -m pip install pytest</code>). Put tests in files named <code>test_*.py</code>, in functions whose names start with <code>test_</code>, and use plain <code>assert</code>:</p>
<pre data-label="fraction.py"><code>from math import gcd

class Fraction:
    def __init__(self, num, den=1):
        if den == 0:
            raise ZeroDivisionError("denominator is zero")
        if den &lt; 0:
            num, den = -num, -den
        g = gcd(num, den)
        self.num, self.den = num // g, den // g

    def __add__(self, other):
        return Fraction(self.num * other.den + other.num * self.den, self.den * other.den)

    def __eq__(self, other):
        return (self.num, self.den) == (other.num, other.den)</code></pre>
<pre data-label="test_fraction.py"><code>import pytest
from fraction import Fraction

def test_reduces_to_lowest_terms():
    f = Fraction(6, 8)
    assert (f.num, f.den) == (3, 4)

def test_sign_moves_to_numerator():
    assert Fraction(1, -2) == Fraction(-1, 2)

def test_add():
    assert Fraction(1, 2) + Fraction(1, 3) == Fraction(5, 6)

def test_zero_denominator_raises():
    with pytest.raises(ZeroDivisionError):
        Fraction(1, 0)</code></pre>
<pre data-label="Shell"><code>$ pytest
============ test session starts ============
collected 4 items

test_fraction.py ....                  [100%]
============= 4 passed in 0.01s =============</code></pre>
<p>Each dot is a passing test. When a test fails, pytest shows the values on both sides of the failing <code>assert</code>, which usually tells you the bug at once. <code>pytest.raises</code> checks that a block raises the expected exception; the test fails if it doesn't.</p>
<h4>Where to run it: your own computer</h4>
<p>pytest runs in a terminal on your computer, using the Python you installed in <a href="#c-cs101-u0">CS 101's first lesson</a>. (The programming problems on this site run their tests in your browser instead, so they don't need pytest.) Put the code and its tests side by side in one folder:</p>
<pre data-label="Folder layout"><code>fraction_project/
    fraction.py          # the class Fraction
    test_fraction.py     # the tests</code></pre>
<pre data-label="Shell"><code>$ cd fraction_project
$ python -m pytest</code></pre>
<p>pytest searches the current folder (and the folders inside it) for files named <code>test_*.py</code>, runs every function in them whose name starts with <code>test_</code>, and prints the report above. The import <code>from fraction import Fraction</code> works because <code>fraction.py</code> sits in the same folder as the test file, exactly like importing your own module in <a href="#c-cs101-files">CS 101's lesson on files and modules</a>. If you see <code>ModuleNotFoundError: No module named 'fraction'</code>, you're either in the wrong folder or the file is named differently. Writing <code>python -m pytest</code> rather than plain <code>pytest</code> guarantees that pytest uses the same Python you installed it into. Every pytest example in this lesson follows this layout: a module, and a test file next to it.</p>

<h3>What makes a good test</h3>
<ul>
  <li><strong>One behavior per test</strong>, with a name that says what it checks. When <code>test_sign_moves_to_numerator</code> fails, you know what broke without reading it.</li>
  <li><strong>Arrange, act, assert.</strong> Set up the objects, do the one thing being tested, check the result.</li>
  <li><strong>Test behavior, not implementation.</strong> Check what the public interface promises, not private attributes or the order of internal steps. Then you can rewrite the internals freely and the tests still apply.</li>
  <li><strong>Cover the edges.</strong> Empty inputs, zero, negatives, one item, duplicates, the boundaries of every <code>if</code>. Bugs cluster at edges.</li>
  <li><strong>Independent and fast.</strong> Tests must not depend on each other or on the order they run, and the whole suite should run in seconds so you run it constantly.</li>
</ul>

<h3>Parametrized tests</h3>
<p>When many cases test the same behavior, list them as data instead of copying the test:</p>
<pre><code>@pytest.mark.parametrize("a, b, expected", [
    (Fraction(1, 2), Fraction(1, 2), Fraction(1)),
    (Fraction(1, 3), Fraction(-1, 3), Fraction(0)),
    (Fraction(2), Fraction(1, 4), Fraction(9, 4)),
])
def test_add_cases(a, b, expected):
    assert a + b == expected</code></pre>
<p>pytest runs and reports each row as a separate test. <code>@pytest.mark.parametrize(...)</code> is a decorator with arguments (<a href="#c-cs102-c5">Lesson 5</a>): the call with the names and rows builds a decorator, which marks the test function so pytest knows to run it once per row, passing the row's values as the parameters <code>a</code>, <code>b</code> and <code>expected</code>.</p>

<h3>Fixtures</h3>
<p>A <strong>fixture</strong> provides a fresh object to each test that asks for it by naming it as a parameter:</p>
<pre><code>@pytest.fixture
def account():
    return BankAccount("Ada", 100)

def test_deposit(account):
    account.deposit(50)
    assert account.balance == 150

def test_overdraw(account):
    with pytest.raises(ValueError):
        account.withdraw(500)
    assert account.balance == 100      # unchanged after the failed withdrawal</code></pre>
<p>Each test gets its own new account, so one test's deposit can't affect another. How does pytest know to pass it? It isn't magic, just the idea that functions are values (Lesson 5). The <code>@pytest.fixture</code> decorator records the function <code>account</code> in a table under its name. Before running a test, pytest looks at the names of the test function's parameters (Python lets a program inspect a function's parameter list). For each parameter it finds the fixture with the same name, calls it, and passes the result in. So <code>test_deposit(account)</code> is run as <code>test_deposit(account())</code>, with a fresh call for every test. That's why the parameter name must match the fixture's name exactly.</p>
<p>pytest also has built-in fixtures, such as <code>tmp_path</code>, a fresh temporary folder for testing code that reads and writes files. It's a <code>Path</code> object from the standard library's <code>pathlib</code> module, which represents file paths. <code>Path</code> defines the special method <code>__truediv__</code> (Lesson 2), so <code>/</code> between a path and a string means "join with a folder separator": <code>tmp_path / "scores.txt"</code> is the path of a file named <code>scores.txt</code> inside that folder. It's arithmetic-looking syntax for path joining, and it uses the right separator (<code>/</code> or <code>\\</code>) on every operating system. You can pass a <code>Path</code> to <code>open</code> like a string.</p>

<h3>Testing code with dependencies</h3>
<p>How do you test code that charges a credit card, sends email or calls a web service? You don't want tests to do those things for real. Lesson 4 showed the design that solves this: pass dependencies in, then pass a <strong>fake</strong> in tests. A fake is a simple stand-in object with the same interface that records what it was asked to do, like <code>FakeGateway</code> in Lesson 4's practice.</p>
<p>Python's <code>unittest.mock</code> module can build such stand-ins automatically. A <code>Mock</code> object accepts <em>any</em> method call, returns another mock, and records every call so you can check it afterwards. Here it is with the <code>Order</code>, <code>LineItem</code> and <code>Checkout</code> classes from <a href="#c-cs102-c4">Lesson 4's worked example</a>, where <code>Checkout(payments, notifier)</code> charges an order's total and then sends a message:</p>
<pre><code>from unittest.mock import Mock

order = Order([LineItem("desk", 120.0, 1)], "ada@example.com")   # $120, over $100
gateway = Mock()
Checkout(gateway, Mock()).complete(order)     # a second Mock stands in for the notifier
gateway.charge.assert_called_once_with("ada@example.com", 108.0)   # 10% off 120</code></pre>
<p>The last line passes if <code>charge</code> was called exactly once with those arguments, and fails the test otherwise.</p>
<p>When should you use which? A mock is quickest when you only need to check that one call happened with the right arguments, or when the real dependency has a large interface you'd otherwise have to imitate. A hand-written fake is better when the stand-in needs real behavior (say, an in-memory "database" that returns what was saved), when many tests reuse it, or when you want the test to read plainly. Be aware that a plain mock accepts misspelled method names too: <code>gateway.chrage(...)</code> silently succeeds, so a mock can hide the very bug a test should catch. Creating it as <code>Mock(spec=SomeClass)</code> limits it to that class's real methods.</p>
<p>The same trick handles time and randomness, which make tests flaky: pass in a clock function or a seeded <code>random.Random</code> instead of calling <code>time.time()</code> or <code>random.random()</code> directly. <code>random.Random(42)</code> is a random-number generator started from the <em>seed</em> 42; generators with the same seed produce the same sequence on every run, so a test sees the same "random" numbers each time.</p>

<h3>The red–green–refactor cycle</h3>
<p><strong>Test-driven development</strong> (TDD), popularized by Kent Beck around 2002, is a rhythm of very small steps:</p>
<ol>
  <li><strong>Red.</strong> Write one small test for behavior that doesn't exist yet. Run it and watch it fail. (If it passes, the test is wrong or the feature already exists.)</li>
  <li><strong>Green.</strong> Write the simplest code that makes it pass. Don't add anything the test doesn't need.</li>
  <li><strong>Refactor.</strong> With all tests passing, clean up: remove duplication, improve names, simplify. Run the tests after every change.</li>
</ol>
<p>Then repeat with the next small test. Writing the test first forces you to decide what the code should do, and what its interface looks like from the caller's side, before deciding how.</p>
<h4>An example: a word-frequency counter</h4>
<p>Red: <code>def test_empty(): assert word_counts("") == {}</code>. Green: <code>def word_counts(text): return {}</code>. That looks like cheating, but it's correct for every test so far. Red: <code>assert word_counts("a b a") == {"a": 2, "b": 1}</code>. Green: a loop with a dictionary. Red: <code>assert word_counts("A a") == {"a": 2}</code> (ignore case). Green: add <code>.lower()</code>. Red: <code>assert word_counts("hi, hi!") == {"hi": 2}</code> (ignore punctuation). Green: strip punctuation. Refactor: tidy the function, perhaps using <code>collections.Counter</code>, a ready-made dictionary of counts: <code>Counter(text.split())</code> counts each word in one step, and <code>Counter("a b a".split()) == {"a": 2, "b": 1}</code> is <code>True</code>. The four tests confirm the rewrite changed nothing. Each step took a minute, and the code was never broken for long.</p>

<h3>Refactoring</h3>
<p><strong>Refactoring</strong> means changing code's structure without changing its behavior: renaming, extracting a function, splitting a class, replacing a loop with a comprehension. The term was popularized by Martin Fowler's 1999 book <em>Refactoring</em>. It's only safe with tests, which is why TDD puts it in every cycle. Common refactorings:</p>
<ul>
  <li><strong>Extract function</strong>: a block of code with a comment explaining what it does becomes a function named after the comment.</li>
  <li><strong>Rename</strong>: a name that needs explaining is the wrong name.</li>
  <li><strong>Replace conditionals with polymorphism</strong>: a long <code>if isinstance</code> chain becomes a method on each class (Lesson 3).</li>
  <li><strong>Introduce a parameter object</strong>: five parameters that always travel together become one dataclass.</li>
</ul>

<h3>What tests can't do</h3>
<p>Dijkstra put it sharply in 1969: "Program testing can be used to show the presence of bugs, but never to show their absence." Tests check the cases you thought of. Coverage tools (<code>pytest --cov</code> with the pytest-cov plugin) show which lines your tests never ran, which is useful, but running a line isn't the same as testing it properly. Tests are one tool alongside careful design, code review, type checking, and, for critical systems, formal proof.</p>
`,
    terms: [
      ["Test suite", "A collection of automated tests run together, often after every change."],
      ["pytest", "A Python testing tool that finds test_ functions and reports failing assertions in detail."],
      ["Fixture", "A function that provides a fresh object or resource to each test that requests it."],
      ["Parametrized test", "One test function run for several rows of input and expected output."],
      ["Fake", "A simple stand-in for a real dependency, used in tests."],
      ["Test-driven development (TDD)", "Writing a failing test first, then the simplest code to pass it, then refactoring."],
      ["Refactoring", "Changing code's structure without changing its behavior."],
      ["Regression", "A bug in behavior that used to work, typically caught by an existing test."]
    ],
    quiz: [
      { q: "In TDD, what should you see right after writing a new test, before writing any code?", choices: ["It passes", "It fails", "A syntax error", "Nothing; tests aren't run yet"], answer: 1, why: "Red first: a failing test proves the test can detect the missing behavior." },
      { q: "How do you check in pytest that <code>Fraction(1, 0)</code> raises ZeroDivisionError?", choices: ["assert Fraction(1, 0) == ZeroDivisionError", "with pytest.raises(ZeroDivisionError): Fraction(1, 0)", "try: Fraction(1, 0) except: pass", "assert raises(Fraction(1, 0))"], answer: 1, why: "pytest.raises fails the test if the block doesn't raise that exception." },
      { q: "Why give each test a fresh object from a fixture?", choices: ["It's faster", "So tests are independent and can't affect each other", "pytest requires fixtures", "To test private attributes"], answer: 1, why: "Shared mutable objects make test results depend on order." },
      { q: "Refactoring means:", choices: ["Adding features", "Fixing bugs", "Changing structure without changing behavior", "Rewriting in another language"], answer: 2, why: "Tests confirm the behavior stays the same while the structure improves." },
      { q: "Your tests run every line of a function and all pass. What can you conclude?", choices: ["The function has no bugs", "The lines ran without failing the cases you tested; untested inputs could still fail", "The function is optimal", "Nothing at all"], answer: 1, why: "Testing shows the presence of bugs, never their absence (Dijkstra)." }
    ],
    practice: [
      { q: `<p>Write pytest tests for a function <code>is_leap(year)</code>: divisible by 4, except centuries, except centuries divisible by 400. Use <code>parametrize</code> and include the edge cases.</p>`, a: `<pre><code>import pytest
from dates import is_leap

@pytest.mark.parametrize("year, expected", [
    (2024, True), (2023, False),
    (1900, False), (2000, True), (2100, False), (2400, True),
])
def test_is_leap(year, expected):
    assert is_leap(year) == expected</code></pre><p>The century years are the edges where a naive "divisible by 4" implementation fails. To run it, save the tests as <code>test_dates.py</code> in a folder, next to a file <code>dates.py</code> containing the function, and run <code>python -m pytest</code> in that folder. In true TDD style, start with <code>def is_leap(year): return False</code> and watch some tests fail, then write the real version:</p><pre data-label="dates.py"><code>def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)</code></pre><p>pytest then reports <code>6 passed</code>: one per row of the table.</p>` },
      { q: `<p>This test sometimes fails. Why, and how would you fix the design?</p><pre><code>def greeting():
    hour = datetime.now().hour
    return "Good morning" if hour &lt; 12 else "Good afternoon"

def test_greeting():
    assert greeting() == "Good morning"</code></pre>`, a: `<p>It depends on the real clock, so it passes only before noon. Pass the time in: <code>def greeting(hour): ...</code>, called as <code>greeting(datetime.now().hour)</code> by the program. Then test <code>greeting(9)</code>, <code>greeting(11)</code>, <code>greeting(12)</code> and <code>greeting(15)</code>, including the boundary at 12.</p>` },
      { q: `<p>Do two red–green cycles of TDD for a <code>Stack</code> class: first "a new stack is empty" (<code>len(s) == 0</code>), then "push then pop returns the item". Write each test and the minimal code after each.</p>`, a: `<p>Cycle 1, red: <code>def test_new_stack_empty(): assert len(Stack()) == 0</code>. Green:</p><pre><code>class Stack:
    def __len__(self):
        return 0</code></pre><p>Cycle 2, red: <code>def test_push_pop(): s = Stack(); s.push(5); assert s.pop() == 5</code>. Green:</p><pre><code>class Stack:
    def __init__(self):
        self._items = []
    def __len__(self):
        return len(self._items)
    def push(self, x):
        self._items.append(x)
    def pop(self):
        return self._items.pop()</code></pre><p>Notice <code>__len__</code> changed to use the list, and the first test still passes.</p>` },
      { q: `<p>Write two functions, <code>save_scores(path, scores)</code>, which writes a list of integer scores to a file one per line, and <code>load_scores(path)</code>, which reads them back as a list of ints. Then write tests for them that use <code>tmp_path</code>, including the empty list.</p>`, a: `<pre data-label="scores.py"><code>def save_scores(path, scores):
    with open(path, "w") as f:
        for s in scores:
            f.write(f"{s}\\n")

def load_scores(path):
    with open(path) as f:
        return [int(line) for line in f]</code></pre><pre data-label="test_scores.py"><code>from scores import save_scores, load_scores

def test_round_trip(tmp_path):
    path = tmp_path / "scores.txt"
    save_scores(path, [90, 85, 77])
    assert load_scores(path) == [90, 85, 77]

def test_empty(tmp_path):
    path = tmp_path / "empty.txt"
    save_scores(path, [])
    assert load_scores(path) == []</code></pre>` },
      { q: `<p>A test named <code>test_stuff</code> creates an account, deposits, withdraws, transfers, checks the balance, checks the history, and checks an error. What's wrong, and how would you improve it?</p>`, a: `<p>It tests many behaviors at once, so a failure doesn't tell you what broke, and the first failing assert hides any later problems. Split it into one test per behavior (<code>test_deposit_increases_balance</code>, <code>test_withdraw_more_than_balance_raises</code>, …), each using a fresh account from a fixture.</p>` }
    ],
    sources: ["pytestdocs", "pytutorial", "composing"]
  },
  {
    id: "c7",
    title: "Stacks, queues and linked lists",
    minutes: 90,
    summary: "Abstract data types and their implementations: stacks and queues and their uses, how Python's list works underneath, and building a linked list from nodes.",
    notes: `
<p>The list and dictionary are so convenient that it's easy to forget they're <em>implemented</em> by someone, with particular costs. This lesson separates what a data structure does from how it does it, and builds the first structure made of objects pointing to objects: the linked list.</p>

<h3>A quick recap of big-O</h3>
<p>This lesson and the next compare costs with the <strong>big-O notation</strong> from <a href="#c-cs101-algo">CS 101's lesson on searching, sorting and efficiency</a>. We count the basic steps an operation takes as a function of the input size <em>n</em> (here, the number of items stored), keep only the term that grows fastest, and drop constant factors: 3<em>n</em> + 7 steps is O(<em>n</em>), and <em>n</em>²/2 + <em>n</em> is O(<em>n</em>²). Big-O describes how the cost <em>grows</em>, not the exact time. The classes you'll see, from fastest to slowest: O(1), <em>constant</em> (the same work however many items there are); O(log <em>n</em>), which grows by one step each time <em>n</em> doubles; O(<em>n</em>), <em>linear</em>, which doubles when <em>n</em> doubles; O(<em>n</em> log <em>n</em>); and O(<em>n</em>²), which quadruples when <em>n</em> doubles.</p>

<h3>Abstract data types</h3>
<p>An <strong>abstract data type</strong> (ADT) is defined by its operations and their behavior, with no mention of how it's stored. It's data abstraction (Lesson 2) applied to collections. A <strong>data structure</strong> is a concrete way of implementing an ADT. One ADT can have several implementations with different costs, and choosing between them is a central skill in computer science.</p>

<h3>Stacks</h3>
<p>A <strong>stack</strong> is a collection where you add and remove items at the same end, the <em>top</em>: last in, first out (LIFO), like a stack of plates. Operations: <code>push(x)</code>, <code>pop()</code> (remove and return the top), <code>peek()</code> (look at the top), and <code>is_empty()</code>.</p>
<pre><code>class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)       # the end of the list is the top

    def pop(self):
        if not self._items:
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self):
        if not self._items:
            raise IndexError("peek at empty stack")
        return self._items[-1]

    def is_empty(self):
        return not self._items

    def __len__(self):
        return len(self._items)</code></pre>
<p>Putting the top at the <em>end</em> of the list makes push and pop O(1): appending to or removing from the end of a Python list doesn't move any other items. Putting the top at the front, with <code>insert(0, x)</code> and <code>pop(0)</code>, would shift every item each time: O(n).</p>
<p>Stacks are everywhere: the "undo" history in an editor, the browser's back button, and the <strong>call stack</strong> from <a href="#c-cs101-u4">CS 101's recursion lesson</a>, which holds a frame for each function call in progress. A classic use is checking that brackets match:</p>
<pre><code>PAIRS = {")": "(", "]": "[", "}": "{"}

def balanced(text):
    stack = Stack()
    for ch in text:
        if ch in "([{":
            stack.push(ch)
        elif ch in PAIRS:
            if stack.is_empty() or stack.pop() != PAIRS[ch]:
                return False
    return stack.is_empty()

balanced("f(a[1], {b: 2})")   # True
balanced("(]")                # False
balanced("((")                # False: unclosed</code></pre>
<p>Each opening bracket waits on the stack until its partner arrives; the most recent unclosed bracket is always on top, which is exactly the one the next closing bracket must match. Compilers and editors check your code's brackets this way.</p>

<h3>Queues</h3>
<p>A <strong>queue</strong> adds at the back and removes from the front: first in, first out (FIFO), like a line at a shop. Operations: <code>enqueue(x)</code> and <code>dequeue()</code>. Queues hold jobs waiting for a printer, requests waiting for a web server, and messages between programs. In algorithms, a queue drives breadth-first search, which you'll meet in Data Structures and Algorithms; its simplest case, visiting a tree row by row, is in <a href="#c-cs102-c8">Lesson 8</a>.</p>
<p>A Python list is a poor queue: <code>pop(0)</code> is O(n). Use <code>collections.deque</code> (a "double-ended queue"), which is O(1) at both ends:</p>
<pre><code>from collections import deque

line = deque()
line.append("Ada")        # enqueue
line.append("Alan")
line.popleft()            # dequeue: "Ada"</code></pre>

<h3>How Python's list works</h3>
<p>A Python list is a <strong>dynamic array</strong>: a block of consecutive memory slots, each holding a reference to an object. Because slots are consecutive and equal-sized, the computer can find slot <em>i</em> with arithmetic, so <code>xs[i]</code> is O(1) whatever the length. The costs follow from the layout:</p>
<table>
  <thead><tr><th>Operation</th><th>Cost</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td><code>xs[i]</code>, <code>xs[i] = v</code></td><td>O(1)</td><td>Address arithmetic</td></tr>
    <tr><td><code>xs.append(v)</code>, <code>xs.pop()</code></td><td>O(1) on average</td><td>Uses a spare slot at the end</td></tr>
    <tr><td><code>xs.insert(0, v)</code>, <code>xs.pop(0)</code></td><td>O(n)</td><td>Every later item shifts one slot</td></tr>
    <tr><td><code>v in xs</code></td><td>O(n)</td><td>Checks items one by one</td></tr>
  </tbody>
</table>
<p>When the block is full, <code>append</code> allocates a bigger block (about 1.125 times the size in CPython, plus a little) and copies everything over. Copying is O(n), but it happens rarely enough that the <em>average</em> cost per append stays O(1). This is called <strong>amortized</strong> O(1).</p>
<p>Why does growing by a <em>fixed fraction</em> keep the average constant, even a fraction as small as 12.5%? Start with doubling, where the numbers are easy. Begin with room for 1 item and append 16 items. The block fills at sizes 1, 2, 4 and 8, and each time everything is copied: 1 + 2 + 4 + 8 = 15 copies for 16 appends. One more append (the 17th) finds the block of 16 full and copies all 16, so 17 appends cost 31 copies. In general, let <em>s</em> be the size of the last copy. That copy happened because a block of size <em>s</em> was full and another item arrived, so <em>n</em> &gt; <em>s</em>. No copy came after it, so the new block of size 2<em>s</em> never overflowed: <em>n</em> ≤ 2<em>s</em>. Together, <em>n</em>/2 ≤ <em>s</em> &lt; <em>n</em>. (With 16 appends, <em>s</em> = 8, exactly <em>n</em>/2; with 17, <em>s</em> = 16.) Reading the copies backwards from the last one, they are <em>s</em>, <em>s</em>/2, <em>s</em>/4, …, 1. A sum like this, where each term is a fixed multiple of the one before, is a <strong>geometric series</strong>, and there's a one-line trick for adding it. Call the sum <em>S</em> = 1 + 2 + 4 + … + <em>s</em>. Then 2<em>S</em> = 2 + 4 + … + <em>s</em> + 2<em>s</em>, and in 2<em>S</em> − <em>S</em> everything cancels except 2<em>s</em> − 1. So the total is 2<em>s</em> − 1, which is at least <em>n</em> − 1 and less than 2<em>n</em>: between 1 and 2 copies per append, depending on where <em>n</em> falls, however large <em>n</em> gets. (<a href="#c-math131-k4">MATH 131, Sequences and series</a> treats geometric series in general and states the same bound, 1 + 2 + 4 + … + <em>n</em> &lt; 2<em>n</em>.)</p>
<p>Growing by 12.5% works the same way, just with a bigger constant. Each resize happens when the list is about 1.125 times larger than at the previous resize, so the copy sizes, read backwards from the last one, are roughly <em>s</em>, <em>sq</em>, <em>sq</em>², …, with <em>q</em> = 1/1.125 = 8/9, where by the same reasoning <em>n</em>/1.125 ≤ <em>s</em> &lt; <em>n</em>, roughly. The same trick adds this series. If <em>S</em> = <em>s</em> + <em>sq</em> + … + <em>sq</em><sup><em>k</em></sup>, then <em>S</em> − <em>qS</em> = <em>s</em> − <em>sq</em><sup><em>k</em>+1</sup>, so <em>S</em> = <em>s</em>(1 − <em>q</em><sup><em>k</em>+1</sup>)/(1 − <em>q</em>). That is just under <em>s</em>/(1 − <em>q</em>) = <em>s</em>/(1/9) = 9<em>s</em>, because after many resizes <em>q</em><sup><em>k</em>+1</sup> is tiny. So the total is between about 8<em>n</em> and 9<em>n</em>: between 8 and 9 copies per append. Simulating CPython's exact growth rule for a million appends gives about 8.45 copies per append (at most; the memory system can sometimes extend a block in place without copying): more than doubling's 1 to 2, but a constant that doesn't grow with <em>n</em>. (CPython trades those extra copies for less wasted memory.) Compare growing by a fixed <em>amount</em>, say 100 more slots each time: then a resize happens every 100 appends, each copying the whole list. The copies have sizes 100, 200, 300, …, up to about <em>n</em>, which is 100 × (1 + 2 + … + <em>n</em>/100). The sum 1 + 2 + … + <em>k</em> is <em>k</em>(<em>k</em> + 1)/2 ≈ <em>k</em>²/2, so with <em>k</em> = <em>n</em>/100 the total is about 100 × (<em>n</em>/100)²/2 = <em>n</em>²/200 copies. Dividing by the <em>n</em> appends gives about <em>n</em>/200 copies per append. That grows with <em>n</em>: it's O(<em>n</em>) per append, not O(1). Growth by a factor is what makes the difference.</p>

<h3>Linked lists</h3>
<p>A <strong>linked list</strong> stores items in separate <strong>nodes</strong> scattered anywhere in memory. Each node holds one value and a reference to the next node; the last node's reference is <code>None</code>.</p>
<figure class="fig">
<svg viewBox="0 0 520 110" role="img" aria-label="A linked list: head points to a node holding 3, which points to a node holding 7, which points to a node holding 1, which points to None.">
  <defs><marker id="c7arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="hl"/></marker></defs>
  <text x="10" y="64" class="m">head</text>
  <line x1="50" y1="60" x2="88" y2="60" class="ln" marker-end="url(#c7arr)"/>
  <rect x="90" y="40" width="50" height="40" class="box"/><rect x="140" y="40" width="30" height="40" class="box soft"/>
  <text x="115" y="65" text-anchor="middle" class="code">3</text><circle cx="155" cy="60" r="3" class="dot"/>
  <line x1="155" y1="60" x2="208" y2="60" class="ln" marker-end="url(#c7arr)"/>
  <rect x="210" y="40" width="50" height="40" class="box"/><rect x="260" y="40" width="30" height="40" class="box soft"/>
  <text x="235" y="65" text-anchor="middle" class="code">7</text><circle cx="275" cy="60" r="3" class="dot"/>
  <line x1="275" y1="60" x2="328" y2="60" class="ln" marker-end="url(#c7arr)"/>
  <rect x="330" y="40" width="50" height="40" class="box"/><rect x="380" y="40" width="30" height="40" class="box soft"/>
  <text x="355" y="65" text-anchor="middle" class="code">1</text><circle cx="395" cy="60" r="3" class="dot"/>
  <line x1="395" y1="60" x2="448" y2="60" class="ln" marker-end="url(#c7arr)"/>
  <text x="452" y="65" class="code">None</text>
  <text x="115" y="30" text-anchor="middle" class="m">value</text><text x="155" y="30" text-anchor="middle" class="m">next</text>
</svg>
<figcaption>A linked list holding 3, 7, 1. Each node is a separate object holding a value and a reference to the next node.</figcaption>
</figure>
<pre><code>class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
        self._size = 0

    def push_front(self, value):            # O(1)
        self.head = Node(value, self.head)
        self._size += 1

    def __len__(self):
        return self._size

    def __iter__(self):                     # walk the chain
        node = self.head
        while node is not None:
            yield node.value
            node = node.next

    def __contains__(self, value):          # O(n)
        return any(v == value for v in self)

    def remove(self, value):                # O(n) to find; O(1) to unlink
        prev, node = None, self.head
        while node is not None:
            if node.value == value:
                if prev is None:
                    self.head = node.next   # removing the first node
                else:
                    prev.next = node.next   # bypass the node
                self._size -= 1
                return
            prev, node = node, node.next
        raise ValueError(f"{value!r} not in list")</code></pre>
<p><code>__contains__</code> uses the built-in <code>any</code>, which returns <code>True</code> if at least one item of an iterable is true (it stops at the first one) and <code>False</code> otherwise. Here the generator expression supplies one <code>True</code> or <code>False</code> per value.</p>
<p>Read <code>push_front</code> carefully: it creates a node whose <code>next</code> is the old head, then makes that node the new head. Nothing is shifted, so it's O(1) however long the list is. Removing a node is just changing one reference so the chain skips it. The cost is in <em>finding</em> things: there's no address arithmetic, so reaching the i-th item means following i references, O(n).</p>
<p>Drawing boxes and arrows, like the figure, is the best way to get linked-list code right. Before writing each line, draw what should change; check the cases of an empty list, a one-node list, and changes at the head.</p>

<h3>Arrays versus linked lists</h3>
<table>
  <thead><tr><th></th><th>Dynamic array (list)</th><th>Singly linked list</th></tr></thead>
  <tbody>
    <tr><td>Access item i</td><td>O(1)</td><td>O(i)</td></tr>
    <tr><td>Add/remove at front</td><td>O(n)</td><td>O(1)</td></tr>
    <tr><td>Add/remove at end</td><td>O(1) amortized</td><td>O(n), or O(1) with a tail reference (for adding)</td></tr>
    <tr><td>Insert after a node you already have</td><td>O(n)</td><td>O(1)</td></tr>
    <tr><td>Memory</td><td>Compact; fast to scan because items are adjacent</td><td>An extra reference per node; scattered in memory</td></tr>
  </tbody>
</table>
<p>In practice, Python's list wins for most jobs, partly because modern processors are much faster at reading adjacent memory. Linked structures matter because they're the building block of many other structures, such as hash table buckets, queues inside operating systems, and the trees in the next lesson, and because thinking in nodes and references is a skill every programmer needs.</p>
`,
    terms: [
      ["Abstract data type", "A type defined by its operations and their behavior, independent of implementation."],
      ["Stack", "A last-in, first-out collection: push and pop at the top."],
      ["Queue", "A first-in, first-out collection: enqueue at the back, dequeue at the front."],
      ["Deque", "A double-ended queue with O(1) operations at both ends (collections.deque)."],
      ["Dynamic array", "An array that grows by allocating a larger block and copying; Python's list."],
      ["Amortized cost", "The average cost per operation over a long sequence, counting rare expensive steps."],
      ["Linked list", "A sequence of nodes, each holding a value and a reference to the next node."],
      ["Node", "One element of a linked structure: a value plus references to other nodes."]
    ],
    quiz: [
      { q: "Pushing 1, 2, 3 onto a stack, then popping twice, returns:", choices: ["1 then 2", "3 then 2", "3 then 1", "2 then 3"], answer: 1, why: "Last in, first out." },
      { q: "Why is <code>list.pop(0)</code> a poor way to dequeue?", choices: ["It returns the wrong item", "It's O(n): every remaining item shifts left", "It raises an error", "It's not allowed on lists"], answer: 1, why: "Use collections.deque, whose popleft is O(1)." },
      { q: "What does <code>push_front</code> do to a linked list of length n?", choices: ["Shifts n items: O(n)", "Creates one node and changes head: O(1)", "Copies the list", "Walks to the end"], answer: 1, why: "The new node points to the old head; nothing else changes." },
      { q: "Getting the 1000th item is O(1) in a Python list but O(n) in a linked list because:", choices: ["Linked lists are written in Python", "A list computes the slot address; a linked list must follow 999 references", "Linked lists are sorted", "Lists use hashing"], answer: 1, why: "Array slots are adjacent and equal-sized; linked nodes are scattered." },
      { q: "For <code>balanced(\"([)]\")</code>, the algorithm returns:", choices: ["True", "False", "An error", "None"], answer: 1, why: "When ) arrives, the top of the stack is [, which doesn't match." }
    ],
    practice: [
      { q: `<p>Trace <code>balanced("{[()]}")</code>, writing the stack's contents after each character.</p>`, a: `<p><code>{</code> → [{]; <code>[</code> → [{, []; <code>(</code> → [{, [, (]; <code>)</code> pops ( ✓ → [{, []; <code>]</code> pops [ ✓ → [{]; <code>}</code> pops { ✓ → []. The stack ends empty, so the result is True.</p>` },
      { q: `<p>Implement a <code>Queue</code> class with <code>enqueue</code>, <code>dequeue</code> and <code>__len__</code> using <code>collections.deque</code>, raising <code>IndexError</code> when dequeuing from an empty queue.</p>`, a: `<pre><code>from collections import deque

class Queue:
    def __init__(self):
        self._items = deque()
    def enqueue(self, x):
        self._items.append(x)
    def dequeue(self):
        if not self._items:
            raise IndexError("dequeue from empty queue")
        return self._items.popleft()
    def __len__(self):
        return len(self._items)</code></pre>` },
      { q: `<p>Add a method <code>push_back(value)</code> to <code>LinkedList</code>. What is its cost, and how could you make it O(1)?</p>`, a: `<pre><code>    def push_back(self, value):
        new = Node(value)
        if self.head is None:
            self.head = new
        else:
            node = self.head
            while node.next is not None:
                node = node.next
            node.next = new
        self._size += 1</code></pre><p>It's O(n) because it walks to the end. Keeping a <code>self.tail</code> reference to the last node (and updating it in every method that changes the list) makes it O(1).</p>` },
      { q: `<p>Write a method <code>reverse()</code> that reverses a linked list in place, in O(n) time, without creating new nodes. Draw the references first.</p>`, a: `<pre><code>    def reverse(self):
        prev, node = None, self.head
        while node is not None:
            nxt = node.next      # remember the rest of the list
            node.next = prev     # turn this node's arrow around
            prev, node = node, nxt
        self.head = prev</code></pre><p>Each step reverses one arrow. Saving <code>node.next</code> before changing it is essential: otherwise you lose the rest of the list.</p>` },
      { q: `<p>An editor stores its undo history. Which ADT fits, and why? What about a print server receiving jobs from many users?</p>`, a: `<p>Undo: a stack, because the most recent change is undone first. Print server: a queue, because jobs should print in the order they arrived (first come, first served).</p>` }
    ],
    sources: ["pythonds", "composing"]
  },
  {
    id: "c8",
    title: "Trees and recursive data structures",
    minutes: 90,
    summary: "Data structures defined in terms of themselves: trees and their vocabulary, recursive functions on trees, traversals, and binary search trees with their costs.",
    notes: `
<p>A linked list node points to one next node. Let each node point to <em>several</em> and you get a <strong>tree</strong>, the structure behind file systems, web pages (the DOM), organization charts, the syntax of every programming language, and many of the fastest search structures. Trees are also the best place to practice recursion, because a tree is defined recursively.</p>

<h3>Vocabulary</h3>
<figure class="fig">
<svg viewBox="0 0 440 210" role="img" aria-label="A binary search tree with root 8; children 3 and 10; 3 has children 1 and 6; 6 has children 4 and 7; 10 has right child 14; 14 has left child 13.">
  <g class="ln">
    <line x1="220" y1="30" x2="130" y2="80"/><line x1="220" y1="30" x2="310" y2="80"/>
    <line x1="130" y1="80" x2="80" y2="130"/><line x1="130" y1="80" x2="180" y2="130"/>
    <line x1="180" y1="130" x2="150" y2="180"/><line x1="180" y1="130" x2="210" y2="180"/>
    <line x1="310" y1="80" x2="360" y2="130"/><line x1="360" y1="130" x2="330" y2="180"/>
  </g>
  <circle cx="220" cy="30" r="16" class="box warm"/><text x="220" y="35" text-anchor="middle" class="code">8</text>
  <circle cx="130" cy="80" r="16" class="box"/><text x="130" y="85" text-anchor="middle" class="code">3</text>
  <circle cx="310" cy="80" r="16" class="box"/><text x="310" y="85" text-anchor="middle" class="code">10</text>
  <circle cx="80" cy="130" r="16" class="box soft"/><text x="80" y="135" text-anchor="middle" class="code">1</text>
  <circle cx="180" cy="130" r="16" class="box"/><text x="180" y="135" text-anchor="middle" class="code">6</text>
  <circle cx="360" cy="130" r="16" class="box"/><text x="360" y="135" text-anchor="middle" class="code">14</text>
  <circle cx="150" cy="180" r="16" class="box soft"/><text x="150" y="185" text-anchor="middle" class="code">4</text>
  <circle cx="210" cy="180" r="16" class="box soft"/><text x="210" y="185" text-anchor="middle" class="code">7</text>
  <circle cx="330" cy="180" r="16" class="box soft"/><text x="330" y="185" text-anchor="middle" class="code">13</text>
  <text x="250" y="34" class="m">root</text>
  <text x="20" y="200" class="m">shaded: leaves</text>
</svg>
<figcaption>A binary search tree. Every value in a node's left subtree is smaller than the node; every value in its right subtree is larger.</figcaption>
</figure>
<ul>
  <li>The top node is the <strong>root</strong>. Each node except the root has exactly one <strong>parent</strong>; the nodes below it are its <strong>children</strong>. A node with no children is a <strong>leaf</strong>.</li>
  <li>A node together with everything below it is a <strong>subtree</strong>. This is the key idea: <em>every child is the root of a smaller tree</em>.</li>
  <li>The <strong>depth</strong> of a node is the number of edges from the root to it. The <strong>height</strong> of a tree is the greatest depth of any node (the tree above has height 3; a single node has height 0; we'll say an empty tree has height −1). The −1 isn't arbitrary: it's the only value that makes the recursive rule "height = 1 + the larger subtree height" (in the code below) give the right answer for a single node, whose two subtrees are empty: 1 + max(−1, −1) = 0. Some books count <em>nodes</em> on the longest path instead of edges; then a single node has height 1 and an empty tree 0. Either convention works if you use it consistently.</li>
  <li>In a <strong>binary tree</strong>, each node has at most two children, called left and right.</li>
</ul>

<h3>A recursive definition, recursive functions</h3>
<p>A binary tree is either <em>empty</em> (<code>None</code>), or a node with a value, a left binary tree and a right binary tree. Functions on trees follow the same shape: handle the empty tree, otherwise combine the results for the two subtrees.</p>
<pre><code>class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def size(t):
    if t is None:
        return 0
    return 1 + size(t.left) + size(t.right)

def height(t):
    if t is None:
        return -1
    return 1 + max(height(t.left), height(t.right))

def total(t):
    if t is None:
        return 0
    return t.value + total(t.left) + total(t.right)</code></pre>
<p>These are almost word-for-word translations of the definitions: "the size of a tree is one for the root plus the sizes of the two subtrees". Trust the recursion (the "leap of faith" from <a href="#c-cs101-u4">CS 101's recursion lesson</a>): assume the calls on the smaller subtrees return correct answers, and check that you combine them correctly and handle the base case.</p>

<h3>Traversals</h3>
<p>Visiting every node is a <strong>traversal</strong>. The three depth-first orders differ only in when the node itself is visited:</p>
<pre><code>def preorder(t):     # node, then left, then right
    if t is not None:
        yield t.value
        yield from preorder(t.left)
        yield from preorder(t.right)

def inorder(t):      # left, then node, then right
    if t is not None:
        yield from inorder(t.left)
        yield t.value
        yield from inorder(t.right)

def postorder(t):    # left, then right, then node
    if t is not None:
        yield from postorder(t.left)
        yield from postorder(t.right)
        yield t.value</code></pre>
<p><code>yield from</code> passes along every value from another generator. For the tree in the figure: preorder gives 8, 3, 1, 6, 4, 7, 10, 14, 13; inorder gives 1, 3, 4, 6, 7, 8, 10, 13, 14; postorder gives 1, 4, 7, 6, 3, 13, 14, 10, 8. Preorder is the order you'd copy a tree or print an outline; postorder is the order you'd delete a folder (contents before the folder) or evaluate an expression tree (operands before the operator).</p>
<h4>Level order: row by row, with a queue</h4>
<p>A <strong>level-order</strong> traversal visits the root, then every node one level down from left to right, then the next row, and so on: for the figure's tree, 8, 3, 10, 1, 6, 14, 4, 7, 13. Recursion doesn't fit this order, because it finishes one whole subtree before starting the next. Instead, keep a queue (<a href="#c-cs102-c7">Lesson 7</a>) of nodes waiting to be visited:</p>
<ol>
  <li>Start with a queue holding just the root (or an empty queue if the tree is empty).</li>
  <li>While the queue isn't empty: take the node at the <em>front</em>, record its value, then add its left child and then its right child (those that aren't <code>None</code>) to the <em>back</em>.</li>
</ol>
<p>Because children join the back of the line, every node in one row is visited before any node in the next. The trace for the figure's tree:</p>
<table>
  <thead><tr><th>Take from front</th><th>Add to back</th><th>Queue afterwards</th></tr></thead>
  <tbody>
    <tr><td>(start)</td><td></td><td>8</td></tr>
    <tr><td>8</td><td>3, 10</td><td>3, 10</td></tr>
    <tr><td>3</td><td>1, 6</td><td>10, 1, 6</td></tr>
    <tr><td>10</td><td>14</td><td>1, 6, 14</td></tr>
    <tr><td>1</td><td></td><td>6, 14</td></tr>
    <tr><td>6</td><td>4, 7</td><td>14, 4, 7</td></tr>
    <tr><td>14</td><td>13</td><td>4, 7, 13</td></tr>
    <tr><td>4, 7, 13</td><td></td><td>(empty)</td></tr>
  </tbody>
</table>
<p>The values were taken in the order 8, 3, 10, 1, 6, 14, 4, 7, 13. In Python, a <code>collections.deque</code> is the queue: <code>append</code> adds at the back and <code>popleft</code> takes from the front, both in O(1). Each node enters and leaves the queue once, so the traversal is O(<em>n</em>). This is the tree version of breadth-first search.</p>

<h3>Binary search trees</h3>
<p>A <strong>binary search tree</strong> (BST) is a binary tree with one invariant: for every node, all values in its left subtree are smaller and all values in its right subtree are larger. That lets a search discard half of what's left at each step, like binary search on a sorted list:</p>
<pre><code>class BST:
    def __init__(self):
        self.root = None

    def insert(self, value):
        self.root = self._insert(self.root, value)

    def _insert(self, node, value):
        if node is None:
            return TreeNode(value)
        if value &lt; node.value:
            node.left = self._insert(node.left, value)
        elif value &gt; node.value:
            node.right = self._insert(node.right, value)
        return node                       # equal: already present, no change

    def __contains__(self, value):
        node = self.root
        while node is not None:
            if value == node.value:
                return True
            node = node.left if value &lt; node.value else node.right
        return False

    def __iter__(self):
        return inorder(self.root)</code></pre>
<p>The recursive <code>_insert</code> returns the (possibly new) root of each subtree, so the parent can attach a newly created node with a single assignment. Why reassign when the child usually doesn't change? Because the one call that <em>does</em> change something, the call that reaches <code>None</code> and creates the new node, can't attach it by itself: it has no reference to the parent. Its only way to hand the node over is to return it, and the parent's assignment does the attaching. Every other call returns the same <code>node</code> it was given, so its parent's assignment stores the reference that was already there, which changes nothing. Trace inserting 5 into the tree in the figure:</p>
<ol>
  <li><code>_insert(8, 5)</code>: 5 &lt; 8, so it runs <code>8.left = _insert(3, 5)</code>.</li>
  <li><code>_insert(3, 5)</code>: 5 &gt; 3, so it runs <code>3.right = _insert(6, 5)</code>.</li>
  <li><code>_insert(6, 5)</code>: 5 &lt; 6, so it runs <code>6.left = _insert(4, 5)</code>.</li>
  <li><code>_insert(4, 5)</code>: 5 &gt; 4, so it runs <code>4.right = _insert(None, 5)</code>.</li>
  <li><code>_insert(None, 5)</code> returns a new node 5. Back in step 4, <code>4.right</code> becomes that node: the only real change. Step 4 returns node 4, so <code>6.left = 4</code> (no change); step 3 returns 6, so <code>3.right = 6</code> (no change); and so on up to <code>self.root = 8</code>.</li>
</ol>
<p>The alternative is to check <code>if node.left is None</code> before every recursive call and attach there, which needs separate cases for left, right and the empty tree. Returning the subtree handles them all with one pattern, and deletion (below) uses the same pattern. The search in <code>__contains__</code> is a loop, since it follows just one path. And an <strong>inorder traversal of a BST yields the values in sorted order</strong>: everything smaller is visited first, then the node, then everything larger.</p>

<h3>Deleting from a BST</h3>
<p>Removing a value must keep the BST invariant. First find the node, then handle one of three cases:</p>
<ol>
  <li><strong>A leaf</strong> (no children): just remove it. In the figure, deleting 13 leaves 14 with no children.</li>
  <li><strong>One child</strong>: replace the node by its child. Deleting 14 puts 13 in its place under 10. Everything in that subtree was already on the correct side of every ancestor, so the invariant still holds.</li>
  <li><strong>Two children</strong>: the node can't simply disappear, since two subtrees would need one parent slot. Instead, copy into it the next larger value, its <strong>inorder successor</strong>: the smallest value in its right subtree, found by going right once and then left as far as possible. Then delete that successor from the right subtree. The successor has no left child, so that second deletion is case 1 or 2. Deleting 3 in the figure: the successor is 4 (right to 6, then left to 4). Copy 4 into the node, then delete the old 4 leaf. The result, with 4 where 3 was, is still a BST: 4 is larger than everything on its left (just 1) and smaller than everything left in its right subtree (6 and 7).</li>
</ol>
<pre><code>    def remove(self, value):
        self.root = self._remove(self.root, value)

    def _remove(self, node, value):
        if node is None:
            raise KeyError(value)             # not in the tree
        if value &lt; node.value:
            node.left = self._remove(node.left, value)
        elif value &gt; node.value:
            node.right = self._remove(node.right, value)
        elif node.left is None:               # cases 1 and 2
            return node.right
        elif node.right is None:
            return node.left
        else:                                 # case 3: two children
            successor = node.right
            while successor.left is not None:
                successor = successor.left
            node.value = successor.value
            node.right = self._remove(node.right, successor.value)
        return node</code></pre>
<p>Returning the new root of each subtree, as <code>_insert</code> does, means "replace this node by its child" is just <code>return node.right</code>; the parent's assignment does the rest. Deletion follows one path down (plus the walk to the successor), so it also costs O(height).</p>

<h3>How fast is a BST?</h3>
<p>Search and insert follow one path from the root, so they take time proportional to the tree's height. If the tree is <strong>balanced</strong>, with left and right subtrees of similar size at every node, a tree of n nodes has height about log₂ n: a million values in about 20 levels. But insert values in sorted order, 1, 2, 3, …, and each goes to the right of the last: the tree becomes a linked list of height n − 1, and every operation is O(n).</p>
<table>
  <thead><tr><th>Operation</th><th>Balanced BST</th><th>Worst-case BST</th><th>Sorted list</th><th>Python set</th></tr></thead>
  <tbody>
    <tr><td>Search</td><td>O(log n)</td><td>O(n)</td><td>O(log n)</td><td>O(1) average</td></tr>
    <tr><td>Insert</td><td>O(log n)</td><td>O(n)</td><td>O(n)</td><td>O(1) average</td></tr>
    <tr><td>All values in order</td><td>O(n)</td><td>O(n)</td><td>O(n)</td><td>O(n log n): must sort</td></tr>
  </tbody>
</table>
<p><strong>Self-balancing</strong> trees, such as AVL trees (1962, named for Adelson-Velsky and Landis) and red–black trees, rearrange themselves after each change to keep the height O(log n). You don't need them yet; they come in the Year 2 Data Structures course. They power ordered maps in Java (<code>TreeMap</code>) and C++ (<code>std::map</code>), and a close relative, the B-tree, organizes almost every database index and file system on disk.</p>

<h3>Trees you already use</h3>
<ul>
  <li><strong>File systems</strong>: folders contain files and folders. Python's <code>os.walk</code> is a preorder traversal.</li>
  <li><strong>HTML</strong>: every web page is a tree of elements; the page you're reading is one.</li>
  <li><strong>Programs</strong>: Python parses your code into an <em>abstract syntax tree</em> before running it. Try <code>import ast; print(ast.dump(ast.parse("1 + 2 * 3"), indent=2))</code> and you'll see the multiplication nested beneath the addition, which is how precedence is represented.</li>
  <li><strong>JSON</strong>: nested dictionaries and lists form a tree, and recursive functions are the natural way to process them.</li>
</ul>
`,
    terms: [
      ["Tree", "A hierarchical structure of nodes in which each node except the root has exactly one parent."],
      ["Root / leaf", "The top node of a tree / a node with no children."],
      ["Subtree", "A node together with all its descendants; itself a tree."],
      ["Height", "The greatest number of edges from the root to a leaf (−1 for an empty tree, by our convention)."],
      ["Traversal", "Visiting every node of a tree in a systematic order: preorder, inorder, postorder or level order."],
      ["Binary search tree", "A binary tree in which every left subtree holds smaller values and every right subtree larger ones."],
      ["Balanced tree", "A tree whose height is O(log n), keeping search and insert fast."],
      ["Inorder successor", "The next larger value in a BST: the leftmost node of a node's right subtree. Used when deleting a node with two children."]
    ],
    quiz: [
      { q: "In the figure's tree, what is the height?", choices: ["2", "3", "4", "9"], answer: 1, why: "The longest path from root to leaf, 8 → 3 → 6 → 4, has 3 edges." },
      { q: "Which traversal of a BST visits the values in sorted order?", choices: ["Preorder", "Inorder", "Postorder", "Level order"], answer: 1, why: "Left subtree (smaller), then the node, then right subtree (larger)." },
      { q: "You insert 1, 2, 3, 4, 5 in that order into an empty BST. What is its height?", choices: ["2", "4", "5", "1"], answer: 1, why: "Each value goes right of the previous, forming a chain of 5 nodes with 4 edges." },
      { q: "What does <code>size(None)</code> return in the lesson's code, and why does it matter?", choices: ["1; the root counts", "0; it's the base case that stops the recursion", "An error", "-1"], answer: 1, why: "Every recursive tree function needs a correct answer for the empty tree." },
      { q: "Searching a balanced BST of about a million values takes roughly how many comparisons?", choices: ["1", "20", "1,000", "1,000,000"], answer: 1, why: "Height is about log₂ 1,000,000 ≈ 20." }
    ],
    practice: [
      { q: `<p>Write a recursive function <code>count_leaves(t)</code>.</p>`, a: `<pre><code>def count_leaves(t):
    if t is None:
        return 0
    if t.left is None and t.right is None:
        return 1
    return count_leaves(t.left) + count_leaves(t.right)</code></pre><p>Two base cases: an empty tree has no leaves; a single node is one leaf.</p>` },
      { q: `<p>Draw the BST that results from inserting 50, 30, 70, 20, 40, 60, 80, 35. Then list its preorder and postorder traversals.</p>`, a: `<p>50 is the root; 30 and 70 its children; 20 and 40 under 30; 60 and 80 under 70; 35 is the left child of 40. Preorder: 50, 30, 20, 40, 35, 70, 60, 80. Postorder: 20, 35, 40, 30, 60, 80, 70, 50.</p>` },
      { q: `<p>In the BST from the previous question, delete 30, then delete 50. Draw the tree after each deletion and give its preorder traversal.</p>`, a: `<p>30 has two children, so it takes the value of its inorder successor, the smallest value in its right subtree: right to 40, then left to 35. Copy 35 into the node and remove the old 35 leaf. Preorder: 50, 35, 20, 40, 70, 60, 80. Next, 50 also has two children; its successor is 60 (right to 70, then left to 60), a leaf. Preorder: 60, 35, 20, 40, 70, 80. Check with an inorder traversal: 20, 35, 40, 60, 70, 80 is still sorted.</p>` },
      { q: `<p>Write <code>bst_min(t)</code> returning the smallest value in a non-empty BST, without looking at every node. What is its cost?</p>`, a: `<pre><code>def bst_min(t):
    while t.left is not None:
        t = t.left
    return t.value</code></pre><p>The smallest value is the leftmost node. The cost is O(height): O(log n) when balanced.</p>` },
      { q: `<p>Write a function <code>is_bst(t)</code> that checks the BST invariant. Why isn't it enough to check that each node's left child is smaller and right child is larger?</p>`, a: `<pre><code>def is_bst(t, low=float("-inf"), high=float("inf")):
    if t is None:
        return True
    if not (low &lt; t.value &lt; high):
        return False
    return is_bst(t.left, low, t.value) and is_bst(t.right, t.value, high)</code></pre><p>The invariant is about whole subtrees: in a tree with root 10, left child 5 and that child's right child 12, each parent–child pair looks fine, but 12 is in 10's left subtree. Passing down the allowed range catches this.</p>` },
      { q: `<p>Nested lists can represent trees: <code>[1, [2, [4], [5]], [3]]</code> is a node 1 with children 2 and 3, and 2 has children 4 and 5. Write a recursive function <code>tree_sum</code> that adds up all the numbers in such a tree.</p>`, a: `<pre><code>def tree_sum(tree):
    value, *children = tree
    return value + sum(tree_sum(c) for c in children)

tree_sum([1, [2, [4], [5]], [3]])   # 15</code></pre><p>This tree isn't binary: each node can have any number of children, and the recursion handles that with a loop over them.</p>` }
    ],
    sources: ["composing", "pythonds"]
  }
]);

CSA.addAsides("cs102", {
  c1: [
    { kind: "lang", title: "Simula, Smalltalk and the word \"object\"", html: `<p>Classes and objects were invented in Norway. Ole-Johan Dahl and Kristen Nygaard designed Simula 67 to write simulations of ships, queues and factories, and needed a way to describe many similar things, each with its own state. Their <code>class</code> keyword is the one you just used. In the 1970s Alan Kay's group at Xerox PARC built Smalltalk, in which <em>everything</em> is an object, and coined the term "object-oriented". Dahl and Nygaard shared the 2001 Turing Award; Kay received it in 2003.</p>`, sources: ["kay93"] },
    { kind: "lang", title: "self in other languages", html: `<p>Python makes the object an explicit first parameter. Java, C++ and C# pass it implicitly and call it <code>this</code>; you can usually leave it out and write <code>balance</code> instead of <code>this.balance</code>. Guido van Rossum kept <code>self</code> explicit on purpose: it makes clear which names are attributes and which are local variables, and it makes <code>a.deposit(50)</code> visibly the same as <code>BankAccount.deposit(a, 50)</code>.</p>`, sources: ["pyhistory"] }
  ],
  c2: [
    { kind: "lang", title: "Operator overloading", html: `<p>Defining what <code>+</code> means for your own types is called <em>operator overloading</em>. C++ has allowed it since the 1980s; Java deliberately doesn't, because its designers felt it made code harder to read (Java programmers write <code>a.add(b)</code>). Python takes the middle path: overload operators when the meaning is natural, as for fractions, vectors and money.</p>` }
  ],
  c3: [
    { kind: "history", title: "Barbara Liskov and data abstraction", html: `<p>In the early 1970s, Barbara Liskov designed CLU at MIT, one of the first languages built around abstract data types: types whose representation is hidden behind operations. CLU also introduced iterators and exception handling in forms that Python later adopted. Her 1987 keynote "Data Abstraction and Hierarchy" gave the substitution principle that bears her name. Liskov, one of the first women in the U.S. to earn a PhD in computer science, received the Turing Award in 2008.</p>`, sources: ["liskov87"] },
    { kind: "lang", title: "Multiple inheritance and its alternatives", html: `<p>Python and C++ let a class inherit from several superclasses. This is powerful but can be confusing when two parents define the same method. Java (1995) allowed only single inheritance of classes, adding <em>interfaces</em> for shared method signatures. Go (2009) and Rust (2015) dropped class inheritance entirely: they use composition plus interfaces (Go) or traits (Rust). The industry's experience with deep hierarchies is one reason "prefer composition over inheritance" became standard advice.</p>` }
  ],
  c4: [
    { kind: "lang", title: "Static versus dynamic typing", html: `<p>In <em>statically typed</em> languages such as Java, C++, Go and Rust, the compiler checks every type before the program runs. In <em>dynamically typed</em> languages such as Python, JavaScript and Ruby, types are checked as the program runs. The trend since about 2012 has been to meet in the middle: TypeScript (2012) added optional types to JavaScript, Python added type hints (2015), and the checkers grew powerful enough that many large Python codebases now type-check everything. The motivation is scale: types are documentation the computer can verify.</p>` }
  ],
  c5: [
    { kind: "lang", title: "Lambda: from logic to every language", html: `<p>The word <em>lambda</em> comes from Alonzo Church's lambda calculus (1930s), a mathematical model of computation built entirely from functions. John McCarthy borrowed it for Lisp in 1958. For decades, functions as values were mostly found in functional languages like Lisp, ML and Haskell. Then the mainstream adopted them: Python got <code>lambda</code> in 1994, C++ lambdas came in 2011, and Java added lambdas in 2014. Generators trace back to CLU (1975) and Icon (1977).</p>`, sources: ["mccarthy60"] }
  ],
  c6: [
    { kind: "history", title: "From \"debugging\" to test suites", html: `<p>Early programmers tested by hand, running programs and inspecting the output. Glenford Myers' <em>The Art of Software Testing</em> (1979) established testing as a discipline. Kent Beck wrote SUnit for Smalltalk in the 1990s, and with Erich Gamma created JUnit for Java in 1997; nearly every language now has a descendant, including Python's built-in <code>unittest</code>. pytest (2004, Holger Krekel) simplified the style to plain functions and <code>assert</code>.</p>`, sources: ["pytestdocs"] },
    { kind: "ethics", title: "When tests aren't enough", html: `<p>In 2018 and 2019, two Boeing 737 MAX crashes killed 346 people. Investigations found that a flight-control system, MCAS, relied on a single angle-of-attack sensor and could repeatedly push the nose down when that sensor failed, and that pilots hadn't been told about it. Software did exactly what it was specified to do; the specification and the safety analysis were wrong. Testing checks code against what we think it should do. Engineers also have a responsibility to question whether that is right, and to speak up when it isn't (ACM Code of Ethics, principle 2.5).</p>`, sources: ["acm"] }
  ],
  c7: [
    { kind: "history", title: "Linked lists and Lisp", html: `<p>Linked lists were invented in 1955–56 by Allen Newell, Cliff Shaw and Herbert Simon for their Information Processing Language, used in early artificial intelligence programs. John McCarthy's Lisp (1958) made the linked list the central data structure of a language: its <code>cons</code> cell is a node, <code>car</code> is the value and <code>cdr</code> is the next reference. Lisp code is itself written as nested lists, which is why the language is so good at programs that manipulate programs.</p>`, sources: ["mccarthy60"] }
  ],
  c8: [
    { kind: "lang", title: "Trees inside your interpreter", html: `<p>When you run a Python program, the interpreter first <em>parses</em> the text into an abstract syntax tree, then compiles the tree into bytecode for its virtual machine. Every language implementation does something similar; you'll build a parser and interpreter of your own in the compilers course. Python 3.9 (2020) switched to a new parser based on parsing expression grammars, which allowed new syntax such as the <code>match</code> statement (Python 3.10).</p>` }
  ]
});

CSA.addOptional("cs102", [
  {
    id: "oophist",
    kind: "history",
    title: "The rise of object-oriented programming",
    minutes: 60,
    summary: "How a language for simulating ships in Norway became the dominant way to organize software, and why newer languages are taking a step back from parts of it.",
    notes: `
<p>Object-oriented programming (OOP) is so common now that it's easy to assume it was always there. It took about thirty years to go from a research idea to the mainstream, and the story explains a lot about why languages look the way they do.</p>

<h3>1. Simula: classes for simulation (1962–1967)</h3>
<p>At the Norwegian Computing Center in Oslo, Ole-Johan Dahl and Kristen Nygaard were writing simulations: customers in a shop, ships in a harbor, jobs in a factory. Each simulated thing had its own state and behavior, and there were many things of each kind. Their language Simula I (1962–65) and its successor <strong>Simula 67</strong> introduced classes, objects, inheritance ("subclasses"), and <em>virtual methods</em>. A virtual method is one that a subclass can replace, where the version that runs is chosen by the object's actual class when the program runs, not by the type the code was written against. That is exactly what happens in Python every time <code>s.area()</code> runs <code>Circle.area</code> or <code>Rectangle.area</code> depending on what <code>s</code> is (<a href="#c-cs102-c3">CS 102, Lesson 3</a>): in Python every method is virtual, so the word never comes up. In Simula, and later C++, a method had to be marked <code>virtual</code> to behave this way, which is where the name comes from. Virtual methods are the mechanism behind polymorphism. Simula was used mainly in Scandinavia and in research, but it was read closely by the people who built the next generation of languages.</p>

<h3>2. Smalltalk: everything is an object (1972–1980)</h3>
<p>At Xerox's Palo Alto Research Center (PARC), Alan Kay imagined the "Dynabook", a personal computer a child could carry and program. His group, including Dan Ingalls and Adele Goldberg, built Smalltalk, in which <em>everything</em>, even numbers and classes, is an object, and all computation happens by objects sending messages to each other. Smalltalk-80 came with a graphical environment with overlapping windows, a mouse and menus. Kay later said the core idea was messaging: independent objects, like cells in a body or computers on a network, cooperating without knowing each other's insides. Steve Jobs saw the PARC work in 1979, and its influence on the Macintosh is well documented.</p>

<h3>3. Abstract data types (1970s)</h3>
<p>In parallel, a different line of research focused on <em>hiding representations</em>. David Parnas's 1972 paper "On the Criteria to Be Used in Decomposing Systems into Modules" argued that each module should hide a design decision likely to change. Barbara Liskov's CLU (1974–75) built this into a language with abstract data types, along with iterators and exceptions. These ideas, encapsulation and data abstraction, became half of what "object-oriented" now means.</p>

<h3>4. C++ and Objective-C: objects meet C (1980s)</h3>
<p>Bjarne Stroustrup had used Simula for his PhD work in Cambridge and loved its organization but not its speed. At Bell Labs from 1979 he built "C with Classes", renamed <strong>C++</strong> in 1983: Simula's classes added to C, with no cost for features you don't use. Around the same time, Brad Cox created Objective-C by adding Smalltalk-style messaging to C. NeXT and then Apple adopted it, and it was the language of Mac and iPhone apps until Swift (2014).</p>

<h3>5. The mainstream: Java and design patterns (1990s)</h3>
<p>By the 1990s, programs were huge and teams were large, and OOP was sold as the way to manage that. The 1994 book <em>Design Patterns</em> by Gamma, Helm, Johnson and Vlissides (the "Gang of Four") catalogued 23 reusable object-oriented designs. <strong>Java</strong> (Sun Microsystems, 1995), designed by James Gosling's team, made classes mandatory: every function must live inside a class. Java's portability ("write once, run anywhere") and its use in universities made it the most taught language for twenty years. Python (1991), Ruby (1995) and JavaScript (1995) all included objects too, each in its own style.</p>

<h3>6. Backlash and synthesis (2000s to today)</h3>
<p>Experience with very large object-oriented systems brought criticism: deep inheritance hierarchies that were fragile to change, "factory factories", and code where it was hard to find what actually happened. The response wasn't to abandon objects but to rebalance:</p>
<ul>
  <li>"Favor object composition over class inheritance" (already in <em>Design Patterns</em>, 1994) became standard advice.</li>
  <li>Functional ideas, such as immutable values, lambdas and higher-order functions, moved into Java, C#, C++ and Python.</li>
  <li><strong>Go</strong> (2009) has methods and interfaces but no classes or inheritance. <strong>Rust</strong> (2015) uses structs and traits, also without inheritance.</li>
  <li>Data-oriented styles (dataclasses, records in Java 16, structs) keep data and behavior more loosely coupled.</li>
</ul>
<p>Python sits comfortably in the middle: you can write classes, plain functions, or functional pipelines, and good Python code uses whichever fits the problem. That's the lesson of the history: object-oriented programming is a powerful tool for organizing state and behavior, not the only way to think.</p>

<h3>Discussion questions</h3>
<ol>
  <li>Kay said OOP was about messaging, not classes. How does that idea show up today in web services that communicate by sending requests?</li>
  <li>Why might a language designer (Go's or Rust's) leave out inheritance deliberately? What do programmers lose and gain?</li>
  <li>Java required every function to be in a class. Python doesn't. Which do you find clearer for small programs, and for large ones?</li>
</ol>
`,
    terms: [
      ["Simula 67", "The first object-oriented language, with classes, objects, inheritance and virtual methods."],
      ["Smalltalk", "A language from Xerox PARC in which everything is an object and computation is message passing."],
      ["Information hiding", "Parnas's principle that each module should hide a design decision likely to change."],
      ["Design pattern", "A named, reusable solution to a common design problem."]
    ],
    quiz: [
      { q: "Simula was originally designed for:", choices: ["Web pages", "Simulations", "Databases", "Games"], answer: 1, why: "Dahl and Nygaard needed to model many similar entities with their own state." },
      { q: "Which pair of modern languages deliberately has no class inheritance?", choices: ["Java and C#", "Go and Rust", "Python and Ruby", "C++ and Objective-C"], answer: 1, why: "Both rely on interfaces or traits plus composition." },
      { q: "Who introduced the principle of hiding design decisions inside modules (1972)?", choices: ["Alan Kay", "David Parnas", "Bjarne Stroustrup", "James Gosling"], answer: 1, why: "Parnas's paper on decomposing systems into modules." }
    ],
    sources: ["kay93", "liskov87", "hopl"]
  },
  {
    id: "oss",
    kind: "ethics",
    title: "Open source: licenses, communities and responsibility",
    minutes: 60,
    summary: "Almost every program depends on code written by volunteers. What software licenses allow, what happens when critical projects are under-supported, and what users owe the commons.",
    notes: `
<p>When you <code>pip install pytest</code>, you download code written by people you'll never meet, under terms you probably didn't read, and run it on your computer. Modern software is built this way: a typical application depends on hundreds of open-source packages. This lesson looks at the rules that make that possible and the responsibilities that come with it.</p>

<h3>Copyright and licenses</h3>
<p>Code is automatically protected by copyright: without permission, you may not copy, modify or distribute someone else's code. A <strong>license</strong> is that permission, with conditions. An <strong>open-source license</strong> lets anyone use, study, modify and share the code. The two main families:</p>
<ul>
  <li><strong>Permissive</strong> licenses (MIT, BSD, Apache 2.0) let you do almost anything, including using the code in closed, commercial products, as long as you keep the copyright notice. This course's code is under the MIT license. Apache 2.0 also grants patent rights.</li>
  <li><strong>Copyleft</strong> licenses (the GNU GPL, created by Richard Stallman in 1989) require that if you distribute a modified version, or a program that includes the code, you release it under the same license, with source code. The goal is to keep software free for every later user. Linux is GPL-licensed.</li>
</ul>
<p>Code with <em>no</em> license isn't free to use, even if it's public on GitHub. Before you copy code into a project, check its license; when you publish your own, choose one.</p>

<h3>Free software and open source</h3>
<p>The <strong>free software</strong> movement (Stallman, 1983) frames access to source code as a matter of user freedom: "free as in speech, not as in beer". The term <strong>open source</strong> (1998) emphasized the practical benefits, such as better code through many reviewers, to win over businesses. The two communities overlap heavily but disagree on emphasis, and the debate still shapes licenses and policies.</p>

<h3>The tragedy of the under-funded commons</h3>
<p>Open-source code is a shared resource that everyone uses and few maintain. Three incidents show the risk:</p>
<ul>
  <li><strong>Heartbleed (2014).</strong> A bug in OpenSSL, which encrypted a large share of the web's traffic, let attackers read servers' memory, including passwords and <em>private keys</em> (the secret numbers a server uses to prove its identity and decrypt traffic; MATH 121 Lesson 5 shows one kind in RSA). The bug was a missing <em>bounds check</em>: a request said how many bytes to send back, and the code never checked that number against the data's real length, so asking for more returned up to 64 KB of whatever happened to lie next to it in memory. (Python checks every index for you and raises <code>IndexError</code>; OpenSSL is written in C, which doesn't.) OpenSSL was maintained mainly by a handful of volunteers, with roughly $2,000 a year in donations. Afterwards, the Linux Foundation created the Core Infrastructure Initiative to fund critical projects.</li>
  <li><strong>Log4Shell (2021).</strong> Log4j, a Java logging library used in millions of applications, would look up and run code from a remote server if a logged message contained a special string. Attackers only needed to get a string logged, for example by typing it into a chat or a username field. The volunteer maintainers worked through the holidays to release fixes, while companies that had used the library for free for years demanded quick answers.</li>
  <li><strong>The xz utils backdoor (2024).</strong> Over about two years, a contributor using the name "Jia Tan" gained the trust of the overworked sole maintainer of xz, a compression library included in most Linux systems, partly helped by other accounts pressuring the maintainer to hand over control. Jia Tan then hid a <em>backdoor</em> (a secret way in that skips the normal login checks) in the release files. It would have let the attacker take control of many servers through SSH, the standard program for logging in to a remote computer and running commands on it. It was caught just before reaching stable Linux distributions, by Andres Freund, an engineer who noticed that SSH logins were taking about half a second longer than usual.</li>
</ul>

<h3>Questions of responsibility</h3>
<ul>
  <li><strong>What do companies owe the projects they depend on?</strong> Funding, engineering time, security reviews? Some now do all three; many still do none.</li>
  <li><strong>What do maintainers owe users?</strong> Most licenses say the software comes "as is", with no warranty. Yet maintainers often feel responsible, and burn out. Is it fair to expect unpaid volunteers to respond to security emergencies?</li>
  <li><strong>What do you owe as a developer?</strong> Know what you depend on, keep dependencies updated, report bugs helpfully, and contribute back when you can. The ACM Code of Ethics asks computing professionals to "contribute to society" and to "respect the work required to produce new ideas" (principles 1.1 and 1.5).</li>
  <li><strong>Trust.</strong> The xz attack exploited the social side of open source: kindness to a helpful newcomer and a maintainer's exhaustion. How can communities stay open to new contributors while guarding against that?</li>
</ul>

<h3>Discussion and writing</h3>
<ol>
  <li>Pick a library you used this term (pytest, for example). Find its license and its maintainers. How is it funded?</li>
  <li>A company sells a product that includes GPL code but doesn't release its own source. What does the license require, and why did Stallman design it that way?</li>
  <li>Write a one-page argument for or against this proposal: "Companies above a certain size must contribute funding or staff time to the open-source packages their products depend on."</li>
</ol>
`,
    terms: [
      ["License", "Permission from the copyright holder to use code, with conditions."],
      ["Permissive license", "An open-source license with few conditions beyond keeping the notice (MIT, BSD, Apache)."],
      ["Copyleft", "A license condition requiring distributed derivatives to use the same license (GPL)."],
      ["Supply-chain attack", "Compromising software by attacking something it depends on, such as a library."]
    ],
    quiz: [
      { q: "Public code on GitHub with no license file is:", choices: ["Public domain", "Free to use under MIT terms", "Still under copyright; you have no permission to reuse it", "Automatically GPL"], answer: 2, why: "Copyright applies automatically; a license grants permission." },
      { q: "What does copyleft require?", choices: ["Paying the original author", "Distributing derivatives under the same license, with source", "Keeping the code private", "Nothing"], answer: 1, why: "That's the GPL's mechanism for keeping software free downstream." },
      { q: "How was the xz utils backdoor discovered?", choices: ["An automated scanner", "An engineer noticed SSH logins were slightly slower", "The attacker confessed", "A government audit"], answer: 1, why: "Andres Freund investigated a half-second slowdown in SSH." }
    ],
    sources: ["osi", "acm", "xzcve"]
  }
]);
