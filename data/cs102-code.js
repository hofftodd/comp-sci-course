/* Auto-graded programming problems for CS 102, by lesson.
   Same format as data/cs101-code.js; test kinds are documented in app/harness.py.
   Most tests here are "assert" tests, because they create objects and call methods. */
CSA.addCode("cs102", {
  c1: [
    {
      id: "bank_account",
      title: "A bank account",
      prompt: `<p>Write a class <code>BankAccount</code>:</p>
<ul>
  <li><code>BankAccount(owner, balance=0)</code> stores the owner and starting balance. A negative starting balance raises <code>ValueError</code>.</li>
  <li><code>deposit(amount)</code> adds money; an amount of zero or less raises <code>ValueError</code>.</li>
  <li><code>withdraw(amount)</code> removes money; an amount of zero or less, or more than the balance, raises <code>ValueError</code> and leaves the balance unchanged.</li>
  <li><code>history</code> is a list of the successful operations, in order, as tuples like <code>("deposit", 50)</code> and <code>("withdraw", 20)</code>. Each account has its own history.</li>
</ul>`,
      starter: `class BankAccount:\n    def __init__(self, owner, balance=0):\n        pass\n\n    def deposit(self, amount):\n        pass\n\n    def withdraw(self, amount):\n        pass\n`,
      hint: `<p>Check for errors <em>before</em> changing anything, so a failed withdrawal leaves the balance alone. Create the history list in <code>__init__</code> with <code>self.history = []</code>, not in the class body, or every account will share it.</p>`,
      solution: `class BankAccount:\n    def __init__(self, owner, balance=0):\n        if balance < 0:\n            raise ValueError("starting balance can't be negative")\n        self.owner = owner\n        self.balance = balance\n        self.history = []\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("deposit must be positive")\n        self.balance += amount\n        self.history.append(("deposit", amount))\n\n    def withdraw(self, amount):\n        if amount <= 0:\n            raise ValueError("withdrawal must be positive")\n        if amount > self.balance:\n            raise ValueError("insufficient funds")\n        self.balance -= amount\n        self.history.append(("withdraw", amount))\n`,
      tests: [
        { label: "Deposit and withdraw", type: "assert", code: `a = BankAccount("Ada", 100)\na.deposit(50)\na.withdraw(30)\nassert a.owner == "Ada", "owner should be stored"\nassert a.balance == 120, f"Expected balance 120, got {a.balance}"` },
        { label: "Starting balance defaults to 0", type: "assert", code: `assert BankAccount("Alan").balance == 0, "A new account with no balance given should have 0."` },
        { label: "Overdrawing raises ValueError", type: "raises", call: `BankAccount("Ada", 10).withdraw(11)`, error: "ValueError" },
        { label: "A failed withdrawal leaves the balance unchanged", type: "assert", code: `a = BankAccount("Ada", 10)\ntry:\n    a.withdraw(11)\nexcept ValueError:\n    pass\nassert a.balance == 10, f"Balance changed to {a.balance} after a failed withdrawal."` },
        { label: "Zero or negative amounts raise ValueError", type: "assert", code: `a = BankAccount("Ada", 10)\nfor bad in (0, -5):\n    for op in (a.deposit, a.withdraw):\n        try:\n            op(bad)\n        except ValueError:\n            continue\n        raise AssertionError(f"{op.__name__}({bad}) should raise ValueError")` },
        { label: "Negative starting balance raises ValueError", type: "raises", call: `BankAccount("Ada", -1)`, error: "ValueError" },
        { label: "History records successful operations", type: "assert", code: `a = BankAccount("Ada", 10)\na.deposit(5)\ntry:\n    a.withdraw(100)\nexcept ValueError:\n    pass\na.withdraw(3)\nassert a.history == [("deposit", 5), ("withdraw", 3)], f"history is {a.history}"` },
        { label: "Each account has its own history", type: "assert", code: `a, b = BankAccount("A"), BankAccount("B")\na.deposit(1)\nassert b.history == [], "Depositing into one account changed another account's history. Create the list in __init__."` }
      ]
    },
    {
      id: "tally",
      title: "A tally counter",
      prompt: `<p>Write a class <code>Tally</code> that counts how many times it has seen each item:</p>
<ul>
  <li><code>add(item)</code> records one occurrence.</li>
  <li><code>count(item)</code> returns how many times it was added (0 if never).</li>
  <li><code>most_common()</code> returns the item added most often. If there's a tie, return the one that reached that count <em>first</em>. If nothing was added, return <code>None</code>.</li>
  <li><code>len(t)</code> returns the number of <em>different</em> items seen. (Define a <code>__len__</code> method, as in the lesson's "A first special method".)</li>
</ul>
<pre><code>t = Tally()
for word in "the cat and the hat".split():
    t.add(word)
t.count("the")     # 2
t.most_common()    # "the"
len(t)             # 4</code></pre>`,
      starter: `class Tally:\n    def __init__(self):\n        pass\n`,
      hint: `<p>Keep a dictionary from item to count. For ties, the simplest approach is to keep track of the current leader in <code>add</code>: switch leaders only when another item's count becomes <em>strictly greater</em>. <code>len(t)</code> calls <code>t.__len__()</code>.</p>`,
      solution: `class Tally:\n    def __init__(self):\n        self._counts = {}\n        self._leader = None\n\n    def add(self, item):\n        self._counts[item] = self._counts.get(item, 0) + 1\n        if self._leader is None or self._counts[item] > self._counts[self._leader]:\n            self._leader = item\n\n    def count(self, item):\n        return self._counts.get(item, 0)\n\n    def most_common(self):\n        return self._leader\n\n    def __len__(self):\n        return len(self._counts)\n`,
      tests: [
        { label: "Counts words", type: "assert", code: `t = Tally()\nfor w in "the cat and the hat".split():\n    t.add(w)\nassert t.count("the") == 2 and t.count("cat") == 1, "Wrong counts"\nassert t.count("dog") == 0, "An item never added should count 0"` },
        { label: "Most common", type: "assert", code: `t = Tally()\nfor w in "b a b c a b".split():\n    t.add(w)\nassert t.most_common() == "b", f"most_common() returned {t.most_common()!r}"` },
        { label: "Ties go to the item that reached the count first", type: "assert", code: `t = Tally()\nfor w in "x y y x".split():\n    t.add(w)\nassert t.most_common() == "y", f"Both have 2, but y reached 2 first; got {t.most_common()!r}"` },
        { label: "Empty tally", type: "assert", code: `t = Tally()\nassert t.most_common() is None, "most_common() of an empty tally should be None"\nassert len(t) == 0, "len of an empty tally should be 0"` },
        { label: "len counts different items", type: "assert", code: `t = Tally()\nfor w in "a a b".split():\n    t.add(w)\nassert len(t) == 2, f"len(t) should be 2, got {len(t)}"` }
      ]
    }
  ],
  c2: [
    {
      id: "fraction",
      title: "Fractions",
      prompt: `<p>Write a class <code>Fraction</code> that is always stored in lowest terms with a positive denominator, in attributes <code>num</code> and <code>den</code>.</p>
<ul>
  <li><code>Fraction(num, den=1)</code>; a zero denominator raises <code>ZeroDivisionError</code>.</li>
  <li><code>+</code>, <code>-</code> and <code>*</code> between fractions return new fractions.</li>
  <li><code>==</code> and <code>&lt;</code> compare values; fractions can be put in a set.</li>
  <li><code>repr(Fraction(1, 2))</code> is <code>"Fraction(1, 2)"</code> and <code>str(Fraction(1, 2))</code> is <code>"1/2"</code>. A whole number prints without a denominator: <code>str(Fraction(4, 2))</code> is <code>"2"</code>.</li>
</ul>`,
      starter: `from math import gcd\n\nclass Fraction:\n    def __init__(self, num, den=1):\n        pass\n`,
      hint: `<p>Normalize in <code>__init__</code>: move a negative sign to the numerator, then divide both parts by <code>gcd(num, den)</code>. Every operation creates its result with <code>Fraction(...)</code>, so it's normalized automatically. For sets you need <code>__hash__</code>: <code>hash((self.num, self.den))</code>.</p>`,
      solution: `from math import gcd\n\nclass Fraction:\n    def __init__(self, num, den=1):\n        if den == 0:\n            raise ZeroDivisionError("denominator is zero")\n        if den < 0:\n            num, den = -num, -den\n        g = gcd(num, den)\n        self.num = num // g\n        self.den = den // g\n\n    def __add__(self, other):\n        return Fraction(self.num * other.den + other.num * self.den, self.den * other.den)\n\n    def __sub__(self, other):\n        return Fraction(self.num * other.den - other.num * self.den, self.den * other.den)\n\n    def __mul__(self, other):\n        return Fraction(self.num * other.num, self.den * other.den)\n\n    def __eq__(self, other):\n        if not isinstance(other, Fraction):\n            return NotImplemented\n        return (self.num, self.den) == (other.num, other.den)\n\n    def __lt__(self, other):\n        return self.num * other.den < other.num * self.den\n\n    def __hash__(self):\n        return hash((self.num, self.den))\n\n    def __repr__(self):\n        return f"Fraction({self.num}, {self.den})"\n\n    def __str__(self):\n        return str(self.num) if self.den == 1 else f"{self.num}/{self.den}"\n`,
      tests: [
        { label: "Stored in lowest terms", type: "assert", code: `f = Fraction(6, 8)\nassert (f.num, f.den) == (3, 4), f"Fraction(6, 8) stored as {f.num}/{f.den}"` },
        { label: "Sign moves to the numerator", type: "assert", code: `f = Fraction(3, -6)\nassert (f.num, f.den) == (-1, 2), f"Fraction(3, -6) stored as {f.num}/{f.den}"` },
        { label: "Zero denominator raises", type: "raises", call: `Fraction(1, 0)`, error: "ZeroDivisionError" },
        { label: "Arithmetic", type: "assert", code: `assert Fraction(1, 2) + Fraction(1, 3) == Fraction(5, 6), "1/2 + 1/3 should be 5/6"\nassert Fraction(1, 2) - Fraction(3, 4) == Fraction(-1, 4), "1/2 - 3/4 should be -1/4"\nassert Fraction(2, 3) * Fraction(3, 4) == Fraction(1, 2), "2/3 * 3/4 should be 1/2"` },
        { label: "Comparison and sorting", type: "assert", code: `assert Fraction(1, 3) < Fraction(1, 2), "1/3 < 1/2"\nassert not Fraction(1, 2) < Fraction(1, 2), "1/2 < 1/2 should be False"\nassert sorted([Fraction(3, 4), Fraction(1, 2), Fraction(-1, 3)]) == [Fraction(-1, 3), Fraction(1, 2), Fraction(3, 4)], "sorting fractions failed"` },
        { label: "Equal fractions work in a set", type: "assert", code: `assert len({Fraction(1, 2), Fraction(2, 4), Fraction(3, 6)}) == 1, "These are all 1/2; the set should have one item. Define __hash__."` },
        { label: "Not equal to other types", type: "assert", code: `assert (Fraction(1, 2) == "1/2") is False, "Comparing with a string should give False, not an error."` },
        { label: "repr and str", type: "assert", code: `assert repr(Fraction(2, 4)) == "Fraction(1, 2)", f"repr gave {repr(Fraction(2, 4))!r}"\nassert str(Fraction(2, 4)) == "1/2", f"str gave {str(Fraction(2, 4))!r}"\nassert str(Fraction(4, 2)) == "2", f"str(Fraction(4, 2)) gave {str(Fraction(4, 2))!r}"` }
      ]
    },
    {
      id: "vector2",
      title: "Two-dimensional vectors",
      prompt: `<p>Write an <strong>immutable</strong> class <code>Vector2</code> with attributes <code>x</code> and <code>y</code>:</p>
<ul>
  <li><code>v + w</code> and <code>v - w</code> add and subtract component by component.</li>
  <li><code>v * k</code> multiplies both components by a number <code>k</code>.</li>
  <li><code>abs(v)</code> is the length, √(x² + y²).</li>
  <li><code>v == w</code> compares components; vectors can be used as dictionary keys.</li>
  <li><code>repr(Vector2(1, 2))</code> is <code>"Vector2(1, 2)"</code>.</li>
  <li>Assigning <code>v.x = 5</code> raises an error (any exception type).</li>
</ul>
<p>You may build it as a frozen dataclass (a <code>__repr__</code> you write in the class body is kept, as the lesson shows) or as a plain class with read-only properties.</p>`,
      starter: `class Vector2:\n    pass\n`,
      hint: `<p>A frozen dataclass gives you <code>__init__</code>, <code>__eq__</code>, <code>__hash__</code> and immutability. Its generated repr would be <code>Vector2(x=1, y=2)</code>, so write your own <code>__repr__</code>. <code>abs(v)</code> calls <code>v.__abs__()</code>.</p>`,
      solution: `from dataclasses import dataclass\nimport math\n\n@dataclass(frozen=True)\nclass Vector2:\n    x: float\n    y: float\n\n    def __add__(self, other):\n        return Vector2(self.x + other.x, self.y + other.y)\n\n    def __sub__(self, other):\n        return Vector2(self.x - other.x, self.y - other.y)\n\n    def __mul__(self, k):\n        return Vector2(self.x * k, self.y * k)\n\n    def __abs__(self):\n        return math.hypot(self.x, self.y)\n\n    def __repr__(self):\n        return f"Vector2({self.x}, {self.y})"\n`,
      tests: [
        { label: "Addition and subtraction", type: "assert", code: `assert Vector2(1, 2) + Vector2(3, 4) == Vector2(4, 6), "(1,2) + (3,4) should be (4,6)"\nassert Vector2(1, 2) - Vector2(3, 4) == Vector2(-2, -2), "(1,2) - (3,4) should be (-2,-2)"` },
        { label: "Scaling", type: "assert", code: `assert Vector2(1, -2) * 3 == Vector2(3, -6), "(1,-2) * 3 should be (3,-6)"` },
        { label: "Length", type: "assert", code: `assert abs(abs(Vector2(3, 4)) - 5) < 1e-9, f"abs(Vector2(3, 4)) should be 5"` },
        { label: "repr", type: "assert", code: `assert repr(Vector2(1, 2)) == "Vector2(1, 2)", f"repr gave {repr(Vector2(1, 2))!r}"` },
        { label: "Usable as a dictionary key", type: "assert", code: `d = {Vector2(0, 0): "origin"}\nassert d[Vector2(0, 0)] == "origin", "An equal vector should find the same key."` },
        { label: "Immutable", type: "assert", code: `v = Vector2(1, 2)\ntry:\n    v.x = 5\nexcept Exception:\n    pass\nelse:\n    raise AssertionError("Setting v.x should raise an error: vectors are immutable.")` }
      ]
    }
  ],
  c3: [
    {
      id: "shapes",
      title: "Shapes and polymorphism",
      prompt: `<p>Write an abstract base class <code>Shape</code> with abstract methods <code>area()</code> and <code>perimeter()</code>, and three subclasses:</p>
<ul>
  <li><code>Rectangle(w, h)</code></li>
  <li><code>Circle(r)</code> (use <code>math.pi</code>)</li>
  <li><code>Square(side)</code>, a subclass of <code>Rectangle</code> that reuses its methods</li>
</ul>
<p>Then write a function <code>total_area(shapes)</code> that adds up the areas of any list of shapes, without checking their types. Creating a plain <code>Shape()</code> must raise <code>TypeError</code>.</p>`,
      starter: `import math\nfrom abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    pass\n`,
      hint: `<p>Mark both methods in <code>Shape</code> with <code>@abstractmethod</code>. <code>Square.__init__</code> only needs one line: <code>super().__init__(side, side)</code>. <code>total_area</code> is a one-liner with <code>sum</code>.</p>`,
      solution: `import math\nfrom abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\n    @abstractmethod\n    def perimeter(self):\n        pass\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w, self.h = w, h\n\n    def area(self):\n        return self.w * self.h\n\n    def perimeter(self):\n        return 2 * (self.w + self.h)\n\nclass Square(Rectangle):\n    def __init__(self, side):\n        super().__init__(side, side)\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n\n    def area(self):\n        return math.pi * self.r ** 2\n\n    def perimeter(self):\n        return 2 * math.pi * self.r\n\ndef total_area(shapes):\n    return sum(s.area() for s in shapes)\n`,
      tests: [
        { label: "Rectangle", type: "assert", code: `r = Rectangle(3, 4)\nassert r.area() == 12 and r.perimeter() == 14, "Rectangle(3, 4) should have area 12 and perimeter 14"` },
        { label: "Circle", type: "assert", code: `import math\nc = Circle(2)\nassert abs(c.area() - 4 * math.pi) < 1e-9 and abs(c.perimeter() - 4 * math.pi) < 1e-9, "Circle(2): area and perimeter are both 4π"` },
        { label: "Square is a Rectangle", type: "assert", code: `s = Square(5)\nassert isinstance(s, Rectangle), "Square should be a subclass of Rectangle"\nassert s.area() == 25 and s.perimeter() == 20, "Square(5): area 25, perimeter 20"` },
        { label: "Shape is abstract", type: "raises", call: `Shape()`, error: "TypeError" },
        { label: "total_area works on any shapes", type: "assert", code: `import math\nassert abs(total_area([Rectangle(2, 3), Square(1), Circle(1)]) - (7 + math.pi)) < 1e-9, "Wrong total"\nassert total_area([]) == 0, "The total of no shapes is 0"` },
        { label: "total_area doesn't check types", type: "source", code: `assert "isinstance" not in __source__ and "type(" not in __source__, "Rely on polymorphism: call area() on each shape instead of checking its type."` }
      ]
    },
    {
      id: "employees",
      title: "Employees and managers",
      prompt: `<p>Write a class <code>Employee(name, salary)</code> with a method <code>monthly_pay()</code> returning <code>salary / 12</code>, and a <code>__repr__</code> so that <code>repr(Employee("Ada", 120000))</code> is <code>Employee('Ada', 120000)</code>, with quotes around the name (<code>!r</code> in an f-string does this; see Lesson 2).</p>
<p>Write a subclass <code>Manager(name, salary, bonus)</code> whose monthly pay also includes <code>bonus / 12</code>, and who keeps a list of reports: <code>add_report(employee)</code> adds one, and <code>team_payroll()</code> returns the manager's own monthly pay plus that of every report. A report can itself be a manager, whose team counts too. A manager's repr shows all three arguments: <code>repr(Manager("Grace", 120000, 24000))</code> is <code>Manager('Grace', 120000, 24000)</code>.</p>
<p>Use <code>super()</code> rather than repeating the parent's code.</p>`,
      starter: `class Employee:\n    def __init__(self, name, salary):\n        pass\n`,
      hint: `<p><code>Manager.monthly_pay</code> can be <code>super().monthly_pay() + self.bonus / 12</code>. For <code>team_payroll</code>, a report that is a manager should contribute its own <code>team_payroll()</code>. Polymorphism helps: give <code>Employee</code> a <code>team_payroll()</code> too, returning just its own pay. <code>Manager</code> needs its own <code>__repr__</code>, because it has an extra argument to show.</p>`,
      solution: `class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\n    def monthly_pay(self):\n        return self.salary / 12\n\n    def team_payroll(self):\n        return self.monthly_pay()\n\n    def __repr__(self):\n        return f"Employee({self.name!r}, {self.salary})"\n\nclass Manager(Employee):\n    def __init__(self, name, salary, bonus):\n        super().__init__(name, salary)\n        self.bonus = bonus\n        self.reports = []\n\n    def monthly_pay(self):\n        return super().monthly_pay() + self.bonus / 12\n\n    def add_report(self, employee):\n        self.reports.append(employee)\n\n    def team_payroll(self):\n        return self.monthly_pay() + sum(r.team_payroll() for r in self.reports)\n\n    def __repr__(self):\n        return f"Manager({self.name!r}, {self.salary}, {self.bonus})"\n`,
      tests: [
        { label: "Employee pay and repr", type: "assert", code: `e = Employee("Ada", 120000)\nassert e.monthly_pay() == 10000, f"monthly_pay() gave {e.monthly_pay()}"\nassert repr(e) == "Employee('Ada', 120000)", f"repr gave {repr(e)!r}"` },
        { label: "Manager pay includes bonus", type: "assert", code: `m = Manager("Grace", 120000, 24000)\nassert isinstance(m, Employee), "Manager should be a subclass of Employee"\nassert m.monthly_pay() == 12000, f"monthly_pay() gave {m.monthly_pay()}"` },
        { label: "Manager repr", type: "assert", code: `m = Manager("Grace", 120000, 24000)\nassert repr(m) == "Manager('Grace', 120000, 24000)", f"repr gave {repr(m)!r}"` },
        { label: "Team payroll", type: "assert", code: `m = Manager("Grace", 120000, 24000)\nm.add_report(Employee("A", 60000))\nm.add_report(Employee("B", 36000))\nassert m.team_payroll() == 12000 + 5000 + 3000, f"team_payroll() gave {m.team_payroll()}"` },
        { label: "Nested managers", type: "assert", code: `top = Manager("T", 120000, 0)\nmid = Manager("M", 60000, 0)\nmid.add_report(Employee("E", 12000))\ntop.add_report(mid)\nassert top.team_payroll() == 10000 + 5000 + 1000, f"team_payroll() gave {top.team_payroll()}"` },
        { label: "Each manager has their own reports", type: "assert", code: `a, b = Manager("A", 1, 0), Manager("B", 1, 0)\na.add_report(Employee("E", 12))\nassert b.team_payroll() == 1 / 12, "Adding a report to one manager affected another. Create the list in __init__."` },
        { label: "Uses super()", type: "source", code: `assert "super()" in __source__, "Use super() to reuse Employee's code."` }
      ]
    }
  ],
  c4: [
    {
      id: "inventory",
      title: "A typed inventory",
      prompt: `<p>A shop's stock is a set of items in categories. Write:</p>
<ul>
  <li>An enum <code>Category</code> with members <code>FOOD</code>, <code>TOOLS</code> and <code>TOYS</code>. Their values don't matter and aren't tested; lowercase strings like <code>"food"</code>, as in the lesson's <code>Status</code>, are a good choice.</li>
  <li>A frozen dataclass <code>Item</code> with fields <code>name: str</code>, <code>price: float</code> and <code>category: Category</code>.</li>
  <li>A class <code>Inventory</code> with methods:
    <ul>
      <li><code>add(item: Item, quantity: int = 1) -&gt; None</code> (a quantity below 1 raises <code>ValueError</code>)</li>
      <li><code>remove(item: Item, quantity: int = 1) -&gt; None</code>, which raises <code>ValueError</code> if the quantity is below 1 or there aren't enough in stock (an item not in stock at all has 0, so removing it raises too). A failed <code>remove</code> leaves the stock unchanged. An item whose quantity reaches 0 disappears.</li>
      <li><code>quantity(item: Item) -&gt; int</code></li>
      <li><code>value() -&gt; float</code>: total price × quantity of everything</li>
      <li><code>in_category(cat: Category) -&gt; list[Item]</code>: the items in stock in that category, sorted by name</li>
    </ul>
  </li>
</ul>
<p>Include type hints on every method.</p>`,
      starter: `from dataclasses import dataclass\nfrom enum import Enum\n\n`,
      hint: `<p>Frozen dataclasses are hashable, so a dictionary of type <code>dict[Item, int]</code>, stored in an attribute of your choice, can map items to quantities. For <code>in_category</code>, collect the items in stock whose <code>category</code> is <code>cat</code> into a list, say <code>matches</code>, then sort it by name with a key function, as in <a href="#c-cs101-dicts">CS 101's dictionaries lesson</a> ("Sorting with a key"): <code>sorted(matches, key=lambda i: i.name)</code>.</p>`,
      solution: `from dataclasses import dataclass\nfrom enum import Enum\n\nclass Category(Enum):\n    FOOD = "food"\n    TOOLS = "tools"\n    TOYS = "toys"\n\n@dataclass(frozen=True)\nclass Item:\n    name: str\n    price: float\n    category: Category\n\nclass Inventory:\n    def __init__(self) -> None:\n        self._stock: dict[Item, int] = {}\n\n    def add(self, item: Item, quantity: int = 1) -> None:\n        if quantity < 1:\n            raise ValueError("quantity must be at least 1")\n        self._stock[item] = self._stock.get(item, 0) + quantity\n\n    def remove(self, item: Item, quantity: int = 1) -> None:\n        have = self._stock.get(item, 0)\n        if quantity < 1 or quantity > have:\n            raise ValueError("not enough in stock")\n        if quantity == have:\n            del self._stock[item]\n        else:\n            self._stock[item] = have - quantity\n\n    def quantity(self, item: Item) -> int:\n        return self._stock.get(item, 0)\n\n    def value(self) -> float:\n        return sum(i.price * q for i, q in self._stock.items())\n\n    def in_category(self, cat: Category) -> list[Item]:\n        return sorted((i for i in self._stock if i.category is cat), key=lambda i: i.name)\n`,
      tests: [
        { label: "Enum and dataclass", type: "assert", code: `assert {c.name for c in Category} == {"FOOD", "TOOLS", "TOYS"}, "Category needs FOOD, TOOLS and TOYS"\ni = Item("apple", 0.5, Category.FOOD)\nassert i == Item("apple", 0.5, Category.FOOD), "Equal items should compare equal"\ntry:\n    i.price = 1\nexcept Exception:\n    pass\nelse:\n    raise AssertionError("Item should be frozen")` },
        { label: "Add and count", type: "assert", code: `inv = Inventory()\napple = Item("apple", 0.5, Category.FOOD)\ninv.add(apple, 10)\ninv.add(apple)\nassert inv.quantity(apple) == 11, f"quantity gave {inv.quantity(apple)}"\nassert inv.quantity(Item("pear", 1, Category.FOOD)) == 0, "An item not in stock has quantity 0"` },
        { label: "Remove", type: "assert", code: `inv = Inventory()\nh = Item("hammer", 12.0, Category.TOOLS)\ninv.add(h, 2)\ninv.remove(h)\nassert inv.quantity(h) == 1\ninv.remove(h)\nassert inv.quantity(h) == 0 and inv.in_category(Category.TOOLS) == [], "An item with quantity 0 should disappear"` },
        { label: "Removing too many raises ValueError", type: "assert", code: `inv = Inventory()\nh = Item("hammer", 12.0, Category.TOOLS)\ninv.add(h, 2)\ntry:\n    inv.remove(h, 3)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError("remove(h, 3) with only 2 should raise ValueError")\nassert inv.quantity(h) == 2, "A failed remove shouldn't change the stock"` },
        { label: "Adding zero raises ValueError", type: "raises", call: `Inventory().add(Item("x", 1, Category.TOYS), 0)`, error: "ValueError" },
        { label: "Removing zero raises ValueError", type: "assert", code: `inv = Inventory()\nh = Item("hammer", 12.0, Category.TOOLS)\ninv.add(h, 2)\ntry:\n    inv.remove(h, 0)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError("remove(h, 0) should raise ValueError")\nassert inv.quantity(h) == 2, "A failed remove shouldn't change the stock"` },
        { label: "Removing an item not in stock raises ValueError", type: "raises", call: `Inventory().remove(Item("x", 1, Category.TOYS))`, error: "ValueError" },
        { label: "Total value", type: "assert", code: `inv = Inventory()\ninv.add(Item("apple", 0.5, Category.FOOD), 10)\ninv.add(Item("yo-yo", 3.0, Category.TOYS), 2)\nassert abs(inv.value() - 11.0) < 1e-9, f"value() gave {inv.value()}"` },
        { label: "Items by category, sorted by name", type: "assert", code: `inv = Inventory()\nfor n in ["saw", "drill", "apple"]:\n    inv.add(Item(n, 1, Category.FOOD if n == "apple" else Category.TOOLS))\nassert [i.name for i in inv.in_category(Category.TOOLS)] == ["drill", "saw"], "in_category gave the wrong items or order"` },
        { label: "Methods have type hints", type: "assert", code: `import inspect\nfor name in ["add", "remove", "quantity", "value", "in_category"]:\n    sig = inspect.signature(getattr(Inventory, name))\n    assert sig.return_annotation is not inspect.Signature.empty, f"{name} needs a return type hint"\n    for p in list(sig.parameters.values())[1:]:\n        assert p.annotation is not inspect.Parameter.empty, f"Parameter {p.name} of {name} needs a type hint"` }
      ]
    },
    {
      id: "checkout",
      title: "Checkout with a fake payment gateway",
      prompt: `<p>An online shop's <code>Checkout</code> class charges customers through a payment gateway. The gateway is passed in, so tests can use a fake. Write:</p>
<ul>
  <li><code>Checkout(gateway)</code>, where <code>gateway</code> is any object with a method <code>charge(email, amount)</code> that returns <code>True</code> if the payment succeeded and <code>False</code> if it was declined.</li>
  <li><code>add(price, quantity=1)</code> adds a line to the cart.</li>
  <li><code>total()</code>: the sum of the lines, with 10% off if the sum is over 100.</li>
  <li><code>pay(email)</code>: charges the total. If the charge succeeds, the cart is emptied and <code>pay</code> returns the amount charged. If it's declined, the cart is kept and <code>pay</code> raises <code>RuntimeError</code>. Paying with an empty cart raises <code>ValueError</code> without calling the gateway.</li>
</ul>
<p>Then write a class <code>FakeGateway(succeed=True)</code> that records each call in a list attribute <code>charges</code> as <code>(email, amount)</code> tuples and returns <code>succeed</code>.</p>`,
      starter: `class FakeGateway:\n    pass\n\nclass Checkout:\n    pass\n`,
      hint: `<p>Store the gateway in <code>__init__</code> and call <code>self.gateway.charge(...)</code> in <code>pay</code>. Never create a real gateway inside <code>Checkout</code>: depending on whatever is passed in is what makes it testable.</p>`,
      solution: `class FakeGateway:\n    def __init__(self, succeed=True):\n        self.succeed = succeed\n        self.charges = []\n\n    def charge(self, email, amount):\n        self.charges.append((email, amount))\n        return self.succeed\n\nclass Checkout:\n    def __init__(self, gateway):\n        self.gateway = gateway\n        self.lines = []\n\n    def add(self, price, quantity=1):\n        self.lines.append((price, quantity))\n\n    def total(self):\n        subtotal = sum(p * q for p, q in self.lines)\n        return subtotal * 0.9 if subtotal > 100 else subtotal\n\n    def pay(self, email):\n        if not self.lines:\n            raise ValueError("cart is empty")\n        amount = self.total()\n        if not self.gateway.charge(email, amount):\n            raise RuntimeError("payment declined")\n        self.lines = []\n        return amount\n`,
      tests: [
        { label: "FakeGateway records charges", type: "assert", code: `g = FakeGateway()\nassert g.charge("a@x.org", 5) is True, "A default FakeGateway should succeed"\nassert g.charges == [("a@x.org", 5)], f"charges is {g.charges}"\nassert FakeGateway(False).charge("a", 1) is False, "FakeGateway(False) should decline"` },
        { label: "Total with and without discount", type: "assert", code: `c = Checkout(FakeGateway())\nc.add(30, 2)\nassert c.total() == 60, f"total() gave {c.total()}"\nc.add(50)\nassert abs(c.total() - 99) < 1e-9, f"110 with 10% off is 99; got {c.total()}"` },
        { label: "Successful payment", type: "assert", code: `g = FakeGateway()\nc = Checkout(g)\nc.add(20)\nassert c.pay("ada@x.org") == 20, "pay should return the amount charged"\nassert g.charges == [("ada@x.org", 20)], f"gateway saw {g.charges}"\nassert c.total() == 0, "The cart should be empty after paying"` },
        { label: "Declined payment keeps the cart", type: "assert", code: `c = Checkout(FakeGateway(succeed=False))\nc.add(20)\ntry:\n    c.pay("ada@x.org")\nexcept RuntimeError:\n    pass\nelse:\n    raise AssertionError("A declined payment should raise RuntimeError")\nassert c.total() == 20, "The cart should be kept after a declined payment"` },
        { label: "Empty cart raises without charging", type: "assert", code: `g = FakeGateway()\ntry:\n    Checkout(g).pay("a@x.org")\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError("Paying for an empty cart should raise ValueError")\nassert g.charges == [], "The gateway shouldn't be called for an empty cart"` }
      ]
    }
  ],
  c5: [
    {
      id: "chunks",
      title: "Chunks and windows",
      prompt: `<p>Write two generator functions that work on <em>any</em> iterable, including other generators, and never build a list of the whole input:</p>
<ul>
  <li><code>chunks(items, n)</code> yields lists of <code>n</code> consecutive items; the last chunk may be shorter. <code>list(chunks(range(7), 3))</code> is <code>[[0, 1, 2], [3, 4, 5], [6]]</code>.</li>
  <li><code>windows(items, n)</code> yields tuples of each <code>n</code> consecutive items, overlapping. <code>list(windows("abcd", 2))</code> is <code>[("a", "b"), ("b", "c"), ("c", "d")]</code>. If there are fewer than <code>n</code> items, it yields nothing.</li>
</ul>`,
      starter: `def chunks(items, n):\n    pass\n\ndef windows(items, n):\n    pass\n`,
      hint: `<p>For <code>chunks</code>, build up a list as you loop, and <code>yield</code> it whenever it reaches length <code>n</code>; after the loop, yield whatever is left if it isn't empty. For <code>windows</code>, keep the last <code>n</code> items in a <code>collections.deque(maxlen=n)</code>, which drops the oldest item automatically.</p>`,
      solution: `from collections import deque\n\ndef chunks(items, n):\n    chunk = []\n    for x in items:\n        chunk.append(x)\n        if len(chunk) == n:\n            yield chunk\n            chunk = []\n    if chunk:\n        yield chunk\n\ndef windows(items, n):\n    window = deque(maxlen=n)\n    for x in items:\n        window.append(x)\n        if len(window) == n:\n            yield tuple(window)\n`,
      tests: [
        { label: "chunks", type: "call", call: `list(chunks(range(7), 3))`, expect: `[[0, 1, 2], [3, 4, 5], [6]]` },
        { label: "chunks of an exact multiple", type: "call", call: `list(chunks("abcd", 2))`, expect: `[["a", "b"], ["c", "d"]]` },
        { label: "chunks of nothing", type: "call", call: `list(chunks([], 3))`, expect: `[]` },
        { label: "windows", type: "call", call: `list(windows("abcd", 2))`, expect: `[("a", "b"), ("b", "c"), ("c", "d")]` },
        { label: "windows too short", type: "call", call: `list(windows([1, 2], 3))`, expect: `[]` },
        { label: "They are generators", type: "assert", code: `import types\nassert isinstance(chunks([1], 1), types.GeneratorType), "chunks should use yield"\nassert isinstance(windows([1], 1), types.GeneratorType), "windows should use yield"` },
        { label: "Work lazily on an infinite input", type: "assert", code: `import itertools\nassert next(chunks(itertools.count(), 3)) == [0, 1, 2], "chunks should work on an endless iterator"\nassert next(windows(itertools.count(), 2)) == (0, 1), "windows should work on an endless iterator"`, limit: 3 }
      ]
    },
    {
      id: "fib_gen",
      title: "Infinite sequences",
      prompt: `<p>Write two infinite generators and one helper:</p>
<ul>
  <li><code>fibonacci()</code> yields 0, 1, 1, 2, 3, 5, 8, … forever.</li>
  <li><code>primes()</code> yields 2, 3, 5, 7, 11, … forever.</li>
  <li><code>take(n, iterable)</code> returns a list of the first <code>n</code> items of any iterable (without consuming more than <code>n</code>).</li>
</ul>`,
      starter: `def fibonacci():\n    pass\n\ndef primes():\n    pass\n\ndef take(n, iterable):\n    pass\n`,
      hint: `<p>Both generators use <code>while True:</code> with a <code>yield</code> inside. For <code>primes</code>, keep a list of the primes found so far and test each candidate only against primes up to its square root. For <code>take</code>, <code>itertools.islice</code> does the work.</p>`,
      solution: `from itertools import islice, count\n\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\ndef primes():\n    found = []\n    for n in count(2):\n        if all(n % p for p in found if p * p <= n):\n            found.append(n)\n            yield n\n\ndef take(n, iterable):\n    return list(islice(iterable, n))\n`,
      tests: [
        { label: "First ten Fibonacci numbers", type: "call", call: `take(10, fibonacci())`, expect: `[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]` },
        { label: "First ten primes", type: "call", call: `take(10, primes())`, expect: `[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]` },
        { label: "take doesn't consume extra items", type: "assert", code: `it = iter(range(10))\nassert take(3, it) == [0, 1, 2]\nassert next(it) == 3, "take(3, it) should leave the 4th item for later"` },
        { label: "take(0, …)", type: "call", call: `take(0, fibonacci())`, expect: `[]` },
        { label: "The 2000th prime, quickly", type: "assert", code: `ps = take(2000, primes())\nassert ps[-1] == 17389, f"The 2000th prime is 17389, got {ps[-1]}"`, limit: 4, hidden: true }
      ]
    },
    {
      id: "closures",
      title: "Counters and memoization",
      prompt: `<p>Write:</p>
<ul>
  <li><code>make_counter(start=0, step=1)</code>, which returns a function. Each call to that function returns the next value: <code>c = make_counter(10, 5)</code>, then <code>c()</code> gives 10, then 15, then 20. Separate counters are independent.</li>
  <li>A decorator <code>memoize</code> that caches a function's results by its arguments, and adds an attribute <code>calls</code> to the wrapper counting how many times the <em>original</em> function actually ran. Only positional arguments need to be supported (the tests never pass keyword arguments), and every argument will be hashable, so the tuple of arguments can be a dictionary key. The wrapper must keep the original function's <code>__name__</code>.</li>
</ul>
<p>The lesson's "Functions can carry attributes" shows how a wrapper can keep an attribute on itself.</p>
<pre><code>@memoize
def slow_square(x):
    return x * x

slow_square(4); slow_square(4); slow_square(5)
slow_square.calls   # 2: the second slow_square(4) came from the cache</code></pre>`,
      starter: `def make_counter(start=0, step=1):\n    pass\n\ndef memoize(func):\n    pass\n`,
      hint: `<p>In <code>make_counter</code>, the inner function needs <code>nonlocal</code> to update the captured value. In <code>memoize</code>, keep a dictionary keyed by the <code>args</code> tuple; set <code>wrapper.calls = 0</code> before returning the wrapper.</p>`,
      solution: `import functools\n\ndef make_counter(start=0, step=1):\n    value = start - step\n    def counter():\n        nonlocal value\n        value += step\n        return value\n    return counter\n\ndef memoize(func):\n    cache = {}\n    @functools.wraps(func)\n    def wrapper(*args):\n        if args not in cache:\n            wrapper.calls += 1\n            cache[args] = func(*args)\n        return cache[args]\n    wrapper.calls = 0\n    return wrapper\n`,
      tests: [
        { label: "Counter counts", type: "assert", code: `c = make_counter(10, 5)\nassert [c(), c(), c()] == [10, 15, 20], "make_counter(10, 5) should give 10, 15, 20"` },
        { label: "Default counter starts at 0", type: "assert", code: `c = make_counter()\nassert [c(), c()] == [0, 1], "make_counter() should give 0, 1, ..."` },
        { label: "Counters are independent", type: "assert", code: `a, b = make_counter(), make_counter(100)\na(); a()\nassert b() == 100 and a() == 2, "Each counter should keep its own value"` },
        { label: "memoize caches results", type: "assert", code: `@memoize\ndef sq(x):\n    return x * x\nassert sq(4) == 16 and sq(4) == 16 and sq(5) == 25, "Wrong results"\nassert sq.calls == 2, f"The original should run twice, ran {sq.calls} times"` },
        { label: "memoize keeps the function's name", type: "assert", code: `@memoize\ndef area(w, h):\n    return w * h\nassert area(2, 3) == 6 and area.__name__ == "area", "Use functools.wraps so the wrapper keeps the name"` },
        { label: "Memoized recursion is fast", type: "assert", code: `@memoize\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\nassert fib(200) == 280571172992510140037611932413038677189525, "fib(200) is wrong"`, limit: 3, hidden: true }
      ]
    }
  ],
  c6: [
    {
      id: "roman",
      title: "Roman numerals, test first",
      prompt: `<p>Write <code>to_roman(n)</code> and <code>from_roman(s)</code> for whole numbers from 1 to 3999. Roman numerals use I=1, V=5, X=10, L=50, C=100, D=500, M=1000, with subtractive pairs IV=4, IX=9, XL=40, XC=90, CD=400, CM=900. So 1994 is MCMXCIV.</p>
<p><code>to_roman</code> raises <code>ValueError</code> for numbers outside 1–3999. Work test-first: start with 1, then 3, then 4, then 9, and so on, adding a case each time.</p>`,
      starter: `def to_roman(n):\n    pass\n\ndef from_roman(s):\n    pass\n`,
      hint: `<p>A table of (value, symbol) pairs from largest to smallest, including the six subtractive pairs, makes <code>to_roman</code> a simple loop: while <code>n</code> is at least the value, append the symbol and subtract. For <code>from_roman</code>, add each letter's value, but subtract it instead when the next letter is worth more.</p>`,
      solution: `TABLE = [(1000, "M"), (900, "CM"), (500, "D"), (400, "CD"), (100, "C"), (90, "XC"),\n         (50, "L"), (40, "XL"), (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]\nVALUES = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}\n\ndef to_roman(n):\n    if not 1 <= n <= 3999:\n        raise ValueError("out of range")\n    out = []\n    for value, symbol in TABLE:\n        while n >= value:\n            out.append(symbol)\n            n -= value\n    return "".join(out)\n\ndef from_roman(s):\n    total = 0\n    for i, ch in enumerate(s):\n        v = VALUES[ch]\n        if i + 1 < len(s) and VALUES[s[i + 1]] > v:\n            total -= v\n        else:\n            total += v\n    return total\n`,
      tests: [
        { label: "Simple numbers", type: "assert", code: `for n, r in [(1, "I"), (3, "III"), (8, "VIII"), (20, "XX")]:\n    assert to_roman(n) == r, f"to_roman({n}) gave {to_roman(n)!r}, expected {r!r}"` },
        { label: "Subtractive pairs", type: "assert", code: `for n, r in [(4, "IV"), (9, "IX"), (40, "XL"), (90, "XC"), (400, "CD"), (900, "CM")]:\n    assert to_roman(n) == r, f"to_roman({n}) gave {to_roman(n)!r}, expected {r!r}"` },
        { label: "1994 and 3999", type: "assert", code: `assert to_roman(1994) == "MCMXCIV", f"to_roman(1994) gave {to_roman(1994)!r}"\nassert to_roman(3999) == "MMMCMXCIX", f"to_roman(3999) gave {to_roman(3999)!r}"` },
        { label: "Out of range raises ValueError", type: "assert", code: `for bad in (0, -1, 4000):\n    try:\n        to_roman(bad)\n    except ValueError:\n        continue\n    raise AssertionError(f"to_roman({bad}) should raise ValueError")` },
        { label: "from_roman", type: "assert", code: `for r, n in [("III", 3), ("IV", 4), ("XLII", 42), ("MCMXCIV", 1994)]:\n    assert from_roman(r) == n, f"from_roman({r!r}) gave {from_roman(r)}, expected {n}"` },
        { label: "Round trip for every number", type: "assert", code: `for n in range(1, 4000):\n    assert from_roman(to_roman(n)) == n, f"Round trip failed for {n}: {to_roman(n)!r}"`, hidden: true }
      ]
    },
    {
      id: "write_tests",
      title: "Write tests that catch bugs",
      prompt: `<p>This time <em>you</em> write the tests. The function <code>is_leap(year)</code> is given: a year is a leap year if it's divisible by 4, except century years, which must be divisible by 400.</p>
<p>Write at least one test function whose name starts with <code>test_</code> that uses <code>assert</code> to check <code>is_leap</code>. The checker runs your tests twice:</p>
<ol>
  <li>Against the correct <code>is_leap</code>: all your tests must pass.</li>
  <li>Against four broken versions, each with a different common bug: for each one, at least one of your tests must fail.</li>
</ol>
<p>Don't change <code>is_leap</code>. Think about which kinds of years each rule is about.</p>`,
      starter: `def is_leap(year):\n    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)\n\n\n# Write your test_ functions below.\n`,
      hint: `<p>Cover each branch of the rule: an ordinary leap year (2024), an ordinary non-leap year (2023), a century that isn't a leap year (1900), and a century that is (2000). One bug might, for example, treat every year divisible by 4 as a leap year.</p>`,
      solution: `def is_leap(year):\n    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)\n\n\ndef test_ordinary_leap_year():\n    assert is_leap(2024)\n\ndef test_ordinary_common_year():\n    assert not is_leap(2023)\n\ndef test_century_not_leap():\n    assert not is_leap(1900)\n    assert not is_leap(2100)\n\ndef test_400_year_century_is_leap():\n    assert is_leap(2000)\n`,
      tests: [
        { label: "You wrote at least one test", type: "assert", code: `tests = [v for k, v in dict(globals()).items() if k.startswith("test_") and callable(v)]\nassert tests, "Write at least one function whose name starts with test_."` },
        { label: "Your tests pass on the correct is_leap", type: "assert", code: `for k, v in dict(globals()).items():\n    if k.startswith("test_") and callable(v):\n        try:\n            v()\n        except AssertionError:\n            raise AssertionError(f"{k} fails on the correct is_leap, so the test itself is wrong.")` },
        { label: "Your tests catch all four bugs", type: "assert", code: `mutants = {\n    "every multiple of 4 is a leap year": lambda y: y % 4 == 0,\n    "centuries are never leap years": lambda y: y % 4 == 0 and y % 100 != 0,\n    "every year is a leap year": lambda y: True,\n    "the 400 rule is applied to every year": lambda y: y % 400 == 0,\n}\ng = globals()\ntests = [v for k, v in dict(g).items() if k.startswith("test_") and callable(v)]\nreal = g["is_leap"]\nmissed = []\nfor name, bad in mutants.items():\n    g["is_leap"] = bad\n    caught = False\n    for t in tests:\n        try:\n            t()\n        except AssertionError:\n            caught = True\n            break\n    if not caught:\n        missed.append(name)\ng["is_leap"] = real\nassert not missed, "Your tests didn't catch these bugs: " + "; ".join(missed)` },
        { label: "is_leap is unchanged", type: "source", code: `assert "return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)" in __source__, "Don't change is_leap; write tests for it."` }
      ]
    }
  ],
  c7: [
    {
      id: "stack_brackets",
      title: "A stack and matching brackets",
      prompt: `<p>Write a class <code>Stack</code> with <code>push(x)</code>, <code>pop()</code>, <code>peek()</code>, <code>is_empty()</code> and <code>len()</code> support. <code>pop</code> and <code>peek</code> on an empty stack raise <code>IndexError</code>. Push and pop must be O(1).</p>
<p>Then write <code>balanced(text)</code>, which returns <code>True</code> if every bracket <code>( ) [ ] { }</code> in the text is properly matched and nested, ignoring all other characters. Use your stack.</p>`,
      starter: `class Stack:\n    pass\n\ndef balanced(text):\n    pass\n`,
      hint: `<p>Use a Python list with the top at the <em>end</em>. In <code>balanced</code>, push each opening bracket; on a closing bracket, the stack must be non-empty and its top must be the matching opener. At the end, the stack must be empty.</p>`,
      solution: `class Stack:\n    def __init__(self):\n        self._items = []\n\n    def push(self, x):\n        self._items.append(x)\n\n    def pop(self):\n        if not self._items:\n            raise IndexError("pop from empty stack")\n        return self._items.pop()\n\n    def peek(self):\n        if not self._items:\n            raise IndexError("peek at empty stack")\n        return self._items[-1]\n\n    def is_empty(self):\n        return not self._items\n\n    def __len__(self):\n        return len(self._items)\n\nPAIRS = {")": "(", "]": "[", "}": "{"}\n\ndef balanced(text):\n    s = Stack()\n    for ch in text:\n        if ch in "([{":\n            s.push(ch)\n        elif ch in PAIRS:\n            if s.is_empty() or s.pop() != PAIRS[ch]:\n                return False\n    return s.is_empty()\n`,
      tests: [
        { label: "Last in, first out", type: "assert", code: `s = Stack()\nfor x in [1, 2, 3]:\n    s.push(x)\nassert len(s) == 3 and s.peek() == 3, "peek should show the last item pushed"\nassert [s.pop(), s.pop(), s.pop()] == [3, 2, 1], "pop should return items in reverse order"\nassert s.is_empty(), "the stack should be empty"` },
        { label: "Empty stack raises IndexError", type: "assert", code: `for op in ("pop", "peek"):\n    try:\n        getattr(Stack(), op)()\n    except IndexError:\n        continue\n    raise AssertionError(f"{op}() on an empty stack should raise IndexError")` },
        { label: "Balanced text", type: "assert", code: `for t in ["", "()", "f(a[1], {b: 2})", "{[()()]}"]:\n    assert balanced(t) is True, f"balanced({t!r}) should be True"` },
        { label: "Unbalanced text", type: "assert", code: `for t in ["(", ")", "(]", "([)]", "(()", "{}}"]:\n    assert balanced(t) is False, f"balanced({t!r}) should be False"` },
        { label: "Push and pop are O(1)", type: "assert", code: `s = Stack()\nfor i in range(200000):\n    s.push(i)\nfor i in range(200000):\n    s.pop()\nassert s.is_empty()`, limit: 3, hidden: true }
      ]
    },
    {
      id: "linked_list",
      title: "A linked list",
      prompt: `<p>Using the <code>Node</code> class provided, write a class <code>LinkedList</code> (don't use a Python list inside it):</p>
<ul>
  <li><code>LinkedList(items=())</code> creates a list containing the given items, in order.</li>
  <li><code>push_front(x)</code>, O(1).</li>
  <li><code>push_back(x)</code>, O(1): keep a reference to the last node.</li>
  <li><code>len(lst)</code>, O(1), and iteration with <code>for</code>.</li>
  <li><code>remove(x)</code> removes the first node holding <code>x</code>, raising <code>ValueError</code> if there isn't one.</li>
  <li><code>reverse()</code> reverses the list in place without creating nodes.</li>
</ul>`,
      starter: `class Node:\n    def __init__(self, value, next=None):\n        self.value = value\n        self.next = next\n\nclass LinkedList:\n    pass\n`,
      hint: `<p>Keep <code>self.head</code>, <code>self.tail</code> and <code>self._size</code>. The tricky cases are the empty list and changes at either end: when you remove the last node, update <code>tail</code>; after reversing, the old head is the new tail. Draw boxes and arrows before writing each method.</p>`,
      solution: `class Node:\n    def __init__(self, value, next=None):\n        self.value = value\n        self.next = next\n\nclass LinkedList:\n    def __init__(self, items=()):\n        self.head = self.tail = None\n        self._size = 0\n        for x in items:\n            self.push_back(x)\n\n    def push_front(self, x):\n        self.head = Node(x, self.head)\n        if self.tail is None:\n            self.tail = self.head\n        self._size += 1\n\n    def push_back(self, x):\n        node = Node(x)\n        if self.tail is None:\n            self.head = self.tail = node\n        else:\n            self.tail.next = node\n            self.tail = node\n        self._size += 1\n\n    def __len__(self):\n        return self._size\n\n    def __iter__(self):\n        node = self.head\n        while node is not None:\n            yield node.value\n            node = node.next\n\n    def remove(self, x):\n        prev, node = None, self.head\n        while node is not None:\n            if node.value == x:\n                if prev is None:\n                    self.head = node.next\n                else:\n                    prev.next = node.next\n                if node is self.tail:\n                    self.tail = prev\n                self._size -= 1\n                return\n            prev, node = node, node.next\n        raise ValueError(f"{x!r} not in list")\n\n    def reverse(self):\n        prev, node = None, self.head\n        self.tail = self.head\n        while node is not None:\n            nxt = node.next\n            node.next = prev\n            prev, node = node, nxt\n        self.head = prev\n`,
      tests: [
        { label: "Build and iterate", type: "assert", code: `lst = LinkedList([1, 2, 3])\nassert list(lst) == [1, 2, 3] and len(lst) == 3, f"Got {list(lst)}"\nassert list(LinkedList()) == [] and len(LinkedList()) == 0, "An empty list should be empty"` },
        { label: "push_front and push_back", type: "assert", code: `lst = LinkedList()\nlst.push_back(2)\nlst.push_front(1)\nlst.push_back(3)\nassert list(lst) == [1, 2, 3], f"Got {list(lst)}"` },
        { label: "remove from the front, middle and end", type: "assert", code: `lst = LinkedList([1, 2, 3, 4])\nlst.remove(1)\nlst.remove(3)\nlst.remove(4)\nassert list(lst) == [2] and len(lst) == 1, f"Got {list(lst)}"\nlst.push_back(5)\nassert list(lst) == [2, 5], f"push_back after removing the last node gave {list(lst)}: update tail in remove"` },
        { label: "remove a missing value raises ValueError", type: "raises", call: `LinkedList([1]).remove(9)`, error: "ValueError" },
        { label: "reverse", type: "assert", code: `lst = LinkedList([1, 2, 3])\nlst.reverse()\nassert list(lst) == [3, 2, 1], f"Got {list(lst)}"\nlst.push_back(0)\nassert list(lst) == [3, 2, 1, 0], f"push_back after reverse gave {list(lst)}: update tail in reverse"\nempty = LinkedList()\nempty.reverse()\nassert list(empty) == []` },
        { label: "Doesn't use a Python list inside", type: "assert", code: `lst = LinkedList([1, 2])\nassert not any(isinstance(v, list) for v in vars(lst).values()), "Store nodes, not a Python list."\nassert isinstance(lst.head, Node), "head should be a Node"` },
        { label: "push_back is O(1)", type: "assert", code: `lst = LinkedList()\nfor i in range(100000):\n    lst.push_back(i)\nassert len(lst) == 100000`, limit: 3, hidden: true }
      ]
    }
  ],
  c8: [
    {
      id: "bst",
      title: "A binary search tree",
      prompt: `<p>Write a class <code>BST</code> of distinct values using the <code>TreeNode</code> class provided:</p>
<ul>
  <li><code>insert(x)</code> adds a value (inserting a value that's already there changes nothing).</li>
  <li><code>x in tree</code> (<code>__contains__</code>) searches without visiting every node.</li>
  <li><code>len(tree)</code> is the number of values.</li>
  <li>Iterating over the tree yields the values in sorted order.</li>
  <li><code>height()</code> returns the height: −1 for an empty tree, 0 for one node.</li>
</ul>`,
      starter: `class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\nclass BST:\n    pass\n`,
      hint: `<p>A recursive helper <code>_insert(node, x)</code> that returns the subtree's root makes insertion short. Sorted order is an inorder traversal: a recursive generator with <code>yield from</code>. Only count a value in <code>len</code> if it was actually new.</p>`,
      solution: `class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n        self._size = 0\n\n    def insert(self, x):\n        self.root = self._insert(self.root, x)\n\n    def _insert(self, node, x):\n        if node is None:\n            self._size += 1\n            return TreeNode(x)\n        if x < node.value:\n            node.left = self._insert(node.left, x)\n        elif x > node.value:\n            node.right = self._insert(node.right, x)\n        return node\n\n    def __contains__(self, x):\n        node = self.root\n        while node is not None:\n            if x == node.value:\n                return True\n            node = node.left if x < node.value else node.right\n        return False\n\n    def __len__(self):\n        return self._size\n\n    def __iter__(self):\n        def inorder(node):\n            if node is not None:\n                yield from inorder(node.left)\n                yield node.value\n                yield from inorder(node.right)\n        return inorder(self.root)\n\n    def height(self):\n        def h(node):\n            return -1 if node is None else 1 + max(h(node.left), h(node.right))\n        return h(self.root)\n`,
      tests: [
        { label: "Insert and search", type: "assert", code: `t = BST()\nfor x in [8, 3, 10, 1, 6, 14, 4, 7, 13]:\n    t.insert(x)\nassert 6 in t and 13 in t and 8 in t, "Inserted values should be found"\nassert 5 not in t and 15 not in t, "Values never inserted shouldn't be found"` },
        { label: "Sorted iteration", type: "assert", code: `t = BST()\nfor x in [8, 3, 10, 1, 6, 14, 4, 7, 13]:\n    t.insert(x)\nassert list(t) == [1, 3, 4, 6, 7, 8, 10, 13, 14], f"Got {list(t)}"` },
        { label: "Duplicates are ignored", type: "assert", code: `t = BST()\nfor x in [5, 5, 3, 5]:\n    t.insert(x)\nassert len(t) == 2 and list(t) == [3, 5], f"len {len(t)}, values {list(t)}"` },
        { label: "Height", type: "assert", code: `t = BST()\nassert t.height() == -1, "An empty tree has height -1"\nt.insert(8)\nassert t.height() == 0, "One node has height 0"\nfor x in [3, 10, 1, 6, 14, 4, 7, 13]:\n    t.insert(x)\nassert t.height() == 3, f"Expected height 3, got {t.height()}"` },
        { label: "Uses the BST property", type: "assert", code: `t = BST()\nfor x in [8, 3, 10]:\n    t.insert(x)\nassert t.root.value == 8 and t.root.left.value == 3 and t.root.right.value == 10, "Smaller values go left, larger go right"` },
        { label: "Search is fast on a balanced tree", type: "assert", code: `import random\nrng = random.Random(1)\nvals = rng.sample(range(10**6), 20000)\nt = BST()\nfor v in vals:\n    t.insert(v)\nassert all(v in t for v in vals[:20000]), "Some values weren't found"`, limit: 4, hidden: true }
      ]
    },
    {
      id: "tree_funcs",
      title: "Recursive tree functions",
      prompt: `<p>Using <code>TreeNode(value, left=None, right=None)</code> (provided), write recursive functions on binary trees, where an empty tree is <code>None</code>:</p>
<ul>
  <li><code>count_leaves(t)</code>: the number of nodes with no children.</li>
  <li><code>mirror(t)</code>: returns a <em>new</em> tree that's the mirror image (left and right swapped at every level), without changing <code>t</code>.</li>
  <li><code>is_bst(t)</code>: <code>True</code> if every node's left subtree holds only smaller values and its right subtree only larger values.</li>
  <li><code>level_order(t)</code>: a list of the values row by row, left to right (<code>[]</code> for an empty tree). This one isn't recursive: use a queue, as in the lesson's "Level order" section.</li>
</ul>`,
      starter: `class TreeNode:\n    def __init__(self, value, left=None, right=None):\n        self.value = value\n        self.left = left\n        self.right = right\n\ndef count_leaves(t):\n    pass\n\ndef mirror(t):\n    pass\n\ndef is_bst(t):\n    pass\n\ndef level_order(t):\n    pass\n`,
      hint: `<p>Start every function with the empty-tree case. For <code>is_bst</code>, checking each node against its children isn't enough; pass down the range of values allowed (<code>low</code>, <code>high</code>). At the root nothing limits the value yet, so start with <code>low = float("-inf")</code> and <code>high = float("inf")</code>: these are floats that compare smaller and larger than every number. Default parameters do this neatly: <code>def is_bst(t, low=float("-inf"), high=float("inf")):</code>. <code>level_order</code> isn't recursive: use a <code>collections.deque</code> as a queue, starting with the root.</p>`,
      solution: `from collections import deque\n\nclass TreeNode:\n    def __init__(self, value, left=None, right=None):\n        self.value = value\n        self.left = left\n        self.right = right\n\ndef count_leaves(t):\n    if t is None:\n        return 0\n    if t.left is None and t.right is None:\n        return 1\n    return count_leaves(t.left) + count_leaves(t.right)\n\ndef mirror(t):\n    if t is None:\n        return None\n    return TreeNode(t.value, mirror(t.right), mirror(t.left))\n\ndef is_bst(t, low=float("-inf"), high=float("inf")):\n    if t is None:\n        return True\n    if not (low < t.value < high):\n        return False\n    return is_bst(t.left, low, t.value) and is_bst(t.right, t.value, high)\n\ndef level_order(t):\n    out = []\n    queue = deque([t] if t is not None else [])\n    while queue:\n        node = queue.popleft()\n        out.append(node.value)\n        if node.left is not None:\n            queue.append(node.left)\n        if node.right is not None:\n            queue.append(node.right)\n    return out\n`,
      tests: [
        { label: "count_leaves", type: "assert", code: `T = TreeNode\nt = T(8, T(3, T(1), T(6, T(4), T(7))), T(10, None, T(14, T(13))))\nassert count_leaves(t) == 4, f"Expected 4 leaves, got {count_leaves(t)}"\nassert count_leaves(None) == 0 and count_leaves(T(1)) == 1, "Check the base cases"` },
        { label: "mirror", type: "assert", code: `T = TreeNode\nt = T(1, T(2, T(4)), T(3))\nm = mirror(t)\nassert level_order(m) == [1, 3, 2, 4], f"Mirror's level order gave {level_order(m)}"\nassert level_order(t) == [1, 2, 3, 4], "mirror shouldn't change the original tree"\nassert mirror(None) is None` },
        { label: "is_bst: valid trees", type: "assert", code: `T = TreeNode\nassert is_bst(None) and is_bst(T(1)), "Empty and one-node trees are BSTs"\nassert is_bst(T(8, T(3, T(1), T(6)), T(10, None, T(14)))), "This tree is a BST"` },
        { label: "is_bst: a violation deeper down", type: "assert", code: `T = TreeNode\nt = T(10, T(5, None, T(12)), T(15))\nassert is_bst(t) is False, "12 is in 10's left subtree, so this isn't a BST"` },
        { label: "level_order", type: "assert", code: `T = TreeNode\nt = T(8, T(3, T(1), T(6, T(4), T(7))), T(10, None, T(14, T(13))))\nassert level_order(t) == [8, 3, 10, 1, 6, 14, 4, 7, 13], f"Got {level_order(t)}"\nassert level_order(None) == []` }
      ]
    }
  ]
});
