CSA.addCourse({
  id: "cs340",
  code: "CS 340",
  title: "Databases",
  credits: 4,
  kind: "required",
  term: "y3f",
  summary: "How databases store, query and protect data: the relational model and relational algebra, SQL from simple queries to grouping, subqueries and recursive queries, schema design with functional dependencies and normal forms, pages and B+ tree indexes, how queries are executed and optimized, transactions and concurrency control, crash recovery with a write-ahead log, and the non-relational stores built for other needs. Every query runs in a real database, SQLite, inside the page.",
  prereqs: ["CS 201 Data Structures", "CS 240 Software Engineering I", "MATH 120 Discrete Mathematics I"],
  outcomes: [
    "Explain what a database system provides beyond files, and describe data as relations with keys and foreign keys",
    "Write relational algebra expressions and SQL queries, including joins, grouping, subqueries, set operations, views and recursive queries, and reason correctly about NULL",
    "Use parameterized queries from Python, and explain why they prevent injection",
    "Design a schema from an entity–relationship model, find keys from functional dependencies, and decompose a relation into BCNF without losing information",
    "Explain how records are stored in pages, how B+ tree and hash indexes work, and when an index helps, using EXPLAIN QUERY PLAN to check",
    "Estimate the I/O cost of selections and join algorithms, and explain how an optimizer chooses a plan",
    "Decide whether a schedule is conflict serializable, explain two-phase locking, deadlock and isolation levels, and describe MVCC and snapshot isolation",
    "Explain how a write-ahead log makes transactions atomic and durable across crashes, and choose between relational and non-relational stores for a workload"
  ],
  rubric: {
    criteriaFor: "the project, the written problem sets and the exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly: the lesson's programming problems, plus written exercises in relational algebra, design, cost estimation and scheduling." },
      { name: "Project", weight: 25, desc: "In pairs, over the term: design and build the database behind a small application of your choice. Milestones: an ER model and a normalized schema with its functional dependencies; the application's queries in SQL, run from Python with parameters; indexes justified with EXPLAIN QUERY PLAN and timings on a realistic amount of data; and a short report on how the application uses transactions." },
      { name: "Midterm exam", weight: 15, desc: "The relational model, SQL and design (lessons 1–4)." },
      { name: "Final exam", weight: 25, desc: "Cumulative, with emphasis on storage, query processing, transactions and recovery (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Do the queries, designs and answers give the right results?", levels: [
        "Correct on every case, including NULLs, empty tables and duplicates, with tests or examples that show it.",
        "Correct on the main cases, with an occasional edge case wrong.",
        "Often right in idea, but wrong on joins, grouping or NULLs.",
        "Mostly incorrect." ] },
      { name: "Design", desc: "Is the schema sound?", levels: [
        "Keys and constraints are declared; every relation is in BCNF or 3NF, and any departure is a deliberate, explained choice.",
        "Mostly normalized, with minor redundancy or a missing constraint.",
        "Works, but redundant data invites update anomalies.",
        "No clear keys or structure." ] },
      { name: "Analysis", desc: "Are costs and correctness argued, not guessed?", levels: [
        "Uses I/O cost formulas, query plans and precedence graphs correctly to justify choices.",
        "Sound reasoning with small errors.",
        "Claims without evidence, or with the wrong cost model.",
        "No analysis." ] },
      { name: "Communication", desc: "Can a reader follow it?", levels: [
        "Clear explanations, readable SQL, and diagrams where they help.",
        "Mostly clear, with some gaps.",
        "Hard to follow; reasoning must be guessed.",
        "Unreadable or missing." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Tools:</b> SQLite, through Python's built-in <code>sqlite3</code> module, runs in this page and on any computer with Python. The project may use SQLite or PostgreSQL, both free.",
      "<b>Collaboration:</b> discuss ideas freely; write your own problem-set answers and code. Project pairs submit one repository, and each partner's commits must show their share.",
      "<b>AI assistants:</b> allowed for the project if the report says how one was used; you must be able to explain every query and design decision in a short oral check. Not allowed in exams.",
      "<b>Late work:</b> four late days in total for problem sets; project milestones are due on the day of their review meeting."
    ]
  },
  units: [
    {
      id: "db1",
      title: "The relational model",
      minutes: 90,
      summary: "Why programs keep data in a database system rather than in their own files, how the relational model describes data as relations (tables) with schemas and keys, and relational algebra, the small set of operators on relations that every SQL query is built from, implemented in Python.",
      notes: `
<p>Almost every program you use keeps data that outlives a single run: accounts, messages, orders, grades. So far your programs have kept such data in files, such as CS 101's text files and CS 240's JSON. This course is about the alternative that nearly every serious application uses: a <strong>database management system</strong> (DBMS), a program whose whole job is to store data safely and answer questions about it. This lesson starts with why, then introduces the idea underneath most databases: the relational model.</p>

<h3>Why not just use files?</h3>
<p>Suppose a university keeps its students in <code>students.csv</code> and its enrollments in <code>enrolled.csv</code>, and several programs read and write them: registration, grading, the transcript printer. Problems arrive quickly.</p>
<ul>
<li><strong>Every question needs new code.</strong> "Which third-year students are taking CS 201?" means writing a loop that reads both files and matches rows. A different question means a different loop.</li>
<li><strong>The format is everyone's business.</strong> If registration adds a column, every program that splits lines on commas must change. The programs depend on how the data is laid out.</li>
<li><strong>Concurrent writers collide.</strong> If two programs read the file, each change it in memory and each write it back, the second write silently erases the first.</li>
<li><strong>Crashes leave damage.</strong> A program that dies halfway through rewriting a file leaves it half old, half new, or empty.</li>
<li><strong>Nothing enforces the rules.</strong> Nothing stops an enrollment for a student who doesn't exist, or a grade of 940.</li>
<li><strong>Speed needs structure.</strong> Finding one student among ten million by reading the whole file takes seconds; CS 201's search trees and hash tables would take microseconds, but each program would have to build and maintain them itself.</li>
</ul>
<p>A DBMS solves each problem once, for every program. Programs ask questions in a <em>declarative</em> query language (SQL, from the next lesson): they say what they want, not how to find it, and the DBMS chooses the method (Lesson 6). It keeps indexes (Lesson 5), lets many users work at once without interfering (Lesson 7), survives crashes without losing committed work (Lesson 8), and checks <strong>integrity constraints</strong>, rules the data must always satisfy. Above all, it separates the logical description of the data from its physical storage. Codd's 1970 paper, which founded the field, begins: "Future users of large data banks must be protected from having to know how the data is organized in the machine." This separation is called <strong>data independence</strong>: the storage can be reorganized, or an index added, without changing any program.</p>

<h3>Relations</h3>
<p>MATH 120 Lesson 5 defined a relation from <em>A</em> to <em>B</em> as a subset of the Cartesian product <em>A</em> × <em>B</em>. Codd's idea was to describe all data this way. Given sets of possible values <em>D</em><sub>1</sub>, …, <em>D</em><sub><em>n</em></sub>, called <strong>domains</strong> (integers, strings of up to 40 characters, dates), a <strong>relation</strong> is a subset of <em>D</em><sub>1</sub> × ⋯ × <em>D</em><sub><em>n</em></sub>: a set of <em>n</em>-tuples. Draw it as a table: each tuple is a row, and each position is a column, called an <strong>attribute</strong>, with a name.</p>
<figure class="fig"><svg viewBox="0 0 560 215" role="img" aria-label="The students relation drawn as a table with columns sid, name, major and year and three rows. The sid column is the primary key; each column is an attribute and each row a tuple.">
<rect class="soft" x="40" y="40" width="320" height="30"/>
<rect class="box" x="40" y="70" width="320" height="90"/>
<g class="ln"><line x1="40" y1="100" x2="360" y2="100"/><line x1="40" y1="130" x2="360" y2="130"/><line x1="100" y1="40" x2="100" y2="160"/><line x1="190" y1="40" x2="190" y2="160"/><line x1="300" y1="40" x2="300" y2="160"/></g>
<rect class="hl" x="42" y="42" width="56" height="116"/>
<g class="text">
<text x="70" y="60" text-anchor="middle" class="code">sid</text><text x="145" y="60" text-anchor="middle" class="code">name</text><text x="245" y="60" text-anchor="middle" class="code">major</text><text x="330" y="60" text-anchor="middle" class="code">year</text>
<text x="70" y="90" text-anchor="middle">1</text><text x="145" y="90" text-anchor="middle">Ana</text><text x="245" y="90" text-anchor="middle">CS</text><text x="330" y="90" text-anchor="middle">2</text>
<text x="70" y="120" text-anchor="middle">2</text><text x="145" y="120" text-anchor="middle">Ben</text><text x="245" y="120" text-anchor="middle">Math</text><text x="330" y="120" text-anchor="middle">3</text>
<text x="70" y="150" text-anchor="middle">3</text><text x="145" y="150" text-anchor="middle">Chen</text><text x="245" y="150" text-anchor="middle">CS</text><text x="330" y="150" text-anchor="middle">3</text>
<text x="245" y="25" text-anchor="middle" class="m">attribute (column)</text>
<text x="380" y="119" class="m">← tuple (row)</text>
<text x="380" y="60" class="m">← heading: the attribute names</text>
<text x="70" y="182" text-anchor="middle" class="m">primary key</text>
<text x="40" y="205" class="code">schema: students(sid, name, major, year)</text></g>
</svg><figcaption>A relation drawn as a table. Its schema is its name and attributes; its instance is the set of rows it holds right now.</figcaption></figure>
<p>Some vocabulary. A relation's <strong>schema</strong> is its name and its attributes with their domains, written <code>students(sid, name, major, year)</code>; it changes rarely. Its <strong>instance</strong> is the set of tuples it holds at a moment, which changes with every insertion. A database schema is the set of all its relation schemas. The number of attributes is the relation's <em>degree</em> (4 here) and the number of tuples its <em>cardinality</em>.</p>
<p>Because a relation is a <em>set</em>, two consequences follow, and they matter later. First, there are no duplicate rows and the rows have no order: a query that needs an order must ask for one. Second, the order of the columns doesn't matter either, but that needs a slightly different definition, since the elements of <em>D</em><sub>1</sub> × ⋯ × <em>D</em><sub><em>n</em></sub> are ordered: (1, 'Ana') and ('Ana', 1) are different tuples. The usual fix is to identify each value by its attribute name instead of its position: a tuple is a function from attribute names to values, such as {sid ↦ 1, name ↦ 'Ana'}, which has no first or second entry. Fixing an order of the attributes (sid first, then name) turns each such tuple into an ordered tuple and the relation into a subset of the product, so the product definition is this one with a column order chosen; any order describes the same relation. Each value is also <strong>atomic</strong>: a single value from its domain, such as one phone number, never a list of them. (SQL tables relax the first rule: they may contain duplicate rows unless a key forbids it, as Lesson 2 shows.)</p>

<h3>Relations in Python</h3>
<p>To experiment, represent a relation as a list of dicts with the same keys, one dict per tuple. A list rather than a set, because Python dicts can't go in a set; the operators below remove duplicates themselves.</p>
<pre><code>students = [
    {"sid": 1, "name": "Ana",  "major": "CS",      "year": 2},
    {"sid": 2, "name": "Ben",  "major": "Math",    "year": 3},
    {"sid": 3, "name": "Chen", "major": "CS",      "year": 3},
    {"sid": 4, "name": "Dara", "major": "Physics", "year": 1},
    {"sid": 5, "name": "Eli",  "major": "CS",      "year": 4},
]
enrolled = [
    {"sid": 1, "cid": "CS201",   "grade": 91},
    {"sid": 1, "cid": "MATH220", "grade": 85},
    {"sid": 2, "cid": "CS201",   "grade": 88},
    {"sid": 2, "cid": "MATH220", "grade": 78},
    {"sid": 3, "cid": "CS201",   "grade": 72},
    {"sid": 3, "cid": "CS240",   "grade": 95},
    {"sid": 4, "cid": "PHYS150", "grade": 80},
]</code></pre>

<h3>Keys</h3>
<p>A <strong>superkey</strong> is a set of attributes whose values identify a tuple: no two tuples in any valid instance agree on all of them. A <strong>candidate key</strong> is a minimal superkey, one with no attribute you could remove and keep a superkey. In <code>students</code>, {sid} is a candidate key and {sid, name} is a superkey but not a candidate key. The designer picks one candidate key as the <strong>primary key</strong>, the one other tables use to refer to a row. In <code>enrolled</code> neither sid nor cid alone is a key (Ana takes two courses; CS201 has three students), but {sid, cid} is: a student enrolls in a course once.</p>
<p>A key is a rule about every instance the database may ever hold, so it comes from the meaning of the data, not from looking at today's rows. Today's rows can only <em>refute</em> a claimed key. In the five rows above, no two students share both a major and a year, so {major, year} happens to identify every student, yet it's obviously not a key: the next third-year CS student breaks it.</p>
<pre><code>def is_superkey_here(R, attrs):
    """True if no two tuples of this instance agree on attrs."""
    seen = {tuple(t[a] for a in attrs) for t in R}
    return len(seen) == len(R)

print(is_superkey_here(enrolled, ["sid"]))          # False
print(is_superkey_here(enrolled, ["sid", "cid"]))   # True
print(is_superkey_here(students, ["major", "year"]))  # True</code></pre>
<p>A <strong>foreign key</strong> is an attribute (or set of attributes) of one relation whose values must appear as the primary key of another: <code>enrolled.sid</code> references <code>students.sid</code>. This rule, <strong>referential integrity</strong>, forbids "dangling" enrollments for students who don't exist. A DBMS checks it on every insertion and deletion; here is the check by hand:</p>
<pre><code>def dangling(child, fk, parent, pk):
    keys = {t[pk] for t in parent}
    return [t for t in child if t[fk] not in keys]

print(dangling(enrolled, "sid", students, "sid"))   # []
print(dangling([{"sid": 9, "cid": "CS201", "grade": 50}], "sid", students, "sid"))   # [{'sid': 9, 'cid': 'CS201', 'grade': 50}]</code></pre>

<h3>Relational algebra</h3>
<p>Codd also defined operators that take relations and return a relation, so they can be combined freely, the way arithmetic operators take numbers and return a number. This set is <strong>relational algebra</strong>. Each operator is a few lines of Python:</p>
<ul>
<li><strong>Selection</strong> σ<sub><em>condition</em></sub>(<em>R</em>) keeps the tuples that satisfy a condition (rows).</li>
<li><strong>Projection</strong> π<sub><em>attributes</em></sub>(<em>R</em>) keeps only the listed attributes (columns), removing any duplicates this creates.</li>
<li><strong>Rename</strong> ρ changes attribute names, so relations can be combined without name clashes.</li>
<li><strong>Union</strong> <em>R</em> ∪ <em>S</em> and <strong>difference</strong> <em>R</em> − <em>S</em> are the set operations from MATH 120 Lesson 4. They need <em>union-compatible</em> relations, with the same attributes.</li>
<li><strong>Cartesian product</strong> <em>R</em> × <em>S</em> pairs every tuple of <em>R</em> with every tuple of <em>S</em>.</li>
<li><strong>Natural join</strong> <em>R</em> ⋈ <em>S</em> pairs the tuples that agree on all the attributes the two relations share, keeping one copy of each shared attribute.</li>
</ul>
<pre><code>def select(R, pred):
    return [t for t in R if pred(t)]

def project(R, attrs):
    out = []
    for t in R:
        row = {a: t[a] for a in attrs}
        if row not in out:            # a relation is a set: drop duplicates
            out.append(row)
    return out

def rename(R, mapping):
    return [{mapping.get(a, a): v for a, v in t.items()} for t in R]

def union(R, S):
    return R + [t for t in S if t not in R]

def difference(R, S):
    return [t for t in R if t not in S]

def product(R, S):                    # assumes no attribute names in common
    return [{**r, **s} for r in R for s in S]

def natural_join(R, S):
    common = [a for a in R[0] if a in S[0]] if R and S else []
    return [{**r, **s} for r in R for s in S
            if all(r[a] == s[a] for a in common)]

print(project(students, ["major"]))   # [{'major': 'CS'}, {'major': 'Math'}, {'major': 'Physics'}]
print(len(product(students, rename(enrolled, {"sid": "esid"}))))   # 35</code></pre>
<p>(<code>{**r, **s}</code> builds a new dict with the entries of both. The <code>row not in out</code> test makes <code>project</code> quadratic; a real system removes duplicates by sorting or hashing, Lesson 6.) The product has 5 × 7 = 35 tuples, as |<em>A</em> × <em>B</em>| = |<em>A</em>| · |<em>B</em>| predicts. Other operators can be built from these: intersection is <em>R</em> ∩ <em>S</em> = <em>R</em> − (<em>R</em> − <em>S</em>), and a natural join is a product followed by a selection on the shared attributes and a projection removing the duplicate columns.</p>

<h3>Writing queries as expressions</h3>
<p>"Names of students taking CS201" becomes an expression: join students to their enrollments, keep the CS201 rows, keep the names.</p>
<p class="math">π<sub>name</sub>(σ<sub>cid = 'CS201'</sub>(students ⋈ enrolled))</p>
<pre><code>q1 = project(select(natural_join(students, enrolled),
                    lambda t: t["cid"] == "CS201"), ["name"])
q2 = project(natural_join(students,
                          select(enrolled, lambda t: t["cid"] == "CS201")), ["name"])
print(q1)   # [{'name': 'Ana'}, {'name': 'Ben'}, {'name': 'Chen'}]
print(q1 == q2)   # True</code></pre>
<p>The second expression selects first and joins afterwards. It gives the same answer, but its join compares 5 × 3 = 15 pairs of tuples instead of 5 × 7 = 35. That is the seed of query optimization: algebra has laws (such as "a selection can move inside a join when its condition uses only one side"), and a DBMS uses them to rewrite your query into an equivalent, cheaper one. Lesson 6 develops this.</p>
<p>Difference answers "not" questions. Students taking no course at all are all students minus those who appear in <code>enrolled</code>:</p>
<pre><code>everyone = project(students, ["sid"])
taking = project(enrolled, ["sid"])
print(difference(everyone, taking))   # [{'sid': 5}]</code></pre>
<p>Eli (sid 5) takes nothing. Notice that the two sides were projected to the same attribute first so that they are union-compatible.</p>
<p class="note">Why it matters: relational algebra is what SQL compiles into. Every SQL query you write in the next two lessons becomes a tree of these operators, and the database's optimizer (Lesson 6) rearranges that tree before running it.</p>
`,
      terms: [
        ["Database management system (DBMS)", "Software that stores data and answers queries about it, handling concurrency, crash recovery, integrity and access for every program that uses the data."],
        ["Data independence", "The separation of a database's logical description from its physical storage, so storage can change without changing programs."],
        ["Integrity constraint", "A rule the data must always satisfy, such as a key or a range of allowed values, checked by the DBMS."],
        ["Domain", "The set of allowed values for an attribute."],
        ["Relation", "A set of tuples, each drawn from the Cartesian product of the attributes' domains; drawn as a table."],
        ["Attribute", "A named column of a relation."],
        ["Tuple", "One row of a relation."],
        ["Schema", "A relation's name and attributes (with their domains); a database schema is the set of its relation schemas."],
        ["Instance", "The set of tuples a relation holds at a particular moment."],
        ["Superkey", "A set of attributes on which no two tuples of any valid instance agree."],
        ["Candidate key", "A minimal superkey: removing any attribute would stop it being a superkey."],
        ["Primary key", "The candidate key chosen to identify a relation's tuples."],
        ["Foreign key", "Attributes whose values must appear as the primary key of another relation."],
        ["Referential integrity", "The rule that every foreign key value refers to an existing tuple."],
        ["Relational algebra", "Operators on relations that return relations: selection, projection, rename, union, difference, product and join."],
        ["Selection (σ)", "The operator that keeps the tuples satisfying a condition."],
        ["Projection (π)", "The operator that keeps only some attributes, removing duplicate tuples."],
        ["Natural join (⋈)", "The operator that pairs tuples agreeing on all shared attributes."]
      ],
      quiz: [
        { q: "Why does a relation have no duplicate rows and no row order?", choices: ["Because disks can't store duplicates", "Because a relation is a set of tuples", "Because SQL forbids them", "Because of the primary key's index"], answer: 1, why: "A set has no repeated elements and no order; SQL tables, unlike relations, may have duplicates." },
        { q: "In enrolled(sid, cid, grade), where a student takes each course at most once, what is the primary key?", choices: ["{sid}", "{cid}", "{sid, cid}", "{sid, cid, grade}"], answer: 2, why: "Neither attribute alone identifies a row, and grade isn't needed; {sid, cid, grade} is a superkey but not minimal." },
        { q: "Today's data happens to have no two students with the same name. Is {name} a candidate key?", choices: ["Yes, the data shows it", "Only if it's the primary key", "Not necessarily: keys are rules about every valid instance, and the data can only refute one", "Yes, because names are strings"], answer: 2, why: "Two students may share a name tomorrow; a key comes from the meaning of the data." },
        { q: "R has 20 tuples and S has 30, with no attributes in common. How many tuples does R × S have?", choices: ["50", "600", "30", "20"], answer: 1, why: "|R × S| = |R| · |S| = 600." },
        { q: "Which expression gives the sids of students who are enrolled in no course?", choices: ["π_sid(students) − π_sid(enrolled)", "π_sid(enrolled) − π_sid(students)", "π_sid(students ⋈ enrolled)", "π_sid(students) ∪ π_sid(enrolled)"], answer: 0, why: "All student ids minus those that appear in enrolled." },
        { q: "What does data independence let you do?", choices: ["Store each table in a separate file", "Change how data is stored, for example add an index, without changing the programs that query it", "Run without a schema", "Avoid using keys"], answer: 1, why: "Programs see the logical relations, not the storage." }
      ],
      practice: [
        {
          q: `<p>Using the notes' functions, write relational algebra (and run it) for: (a) the cids of courses Ana takes; (b) the names of CS majors in year 3 or later; (c) the sids of students who take both CS201 and MATH220.</p>`,
          hint: `<p>For (c), find the sids taking each course separately, then combine the two sets. Which set operation gives "both"?</p>`,
          a: `<p>(a) π<sub>cid</sub>(σ<sub>name='Ana'</sub>(students ⋈ enrolled)); (b) π<sub>name</sub>(σ<sub>major='CS' ∧ year ≥ 3</sub>(students)); (c) the intersection π<sub>sid</sub>(σ<sub>cid='CS201'</sub>(enrolled)) ∩ π<sub>sid</sub>(σ<sub>cid='MATH220'</sub>(enrolled)), using <em>A</em> ∩ <em>B</em> = <em>A</em> − (<em>A</em> − <em>B</em>).</p>
<pre><code>print(project(select(natural_join(students, enrolled), lambda t: t["name"] == "Ana"), ["cid"]))
# [{'cid': 'CS201'}, {'cid': 'MATH220'}]
print(project(select(students, lambda t: t["major"] == "CS" and t["year"] &gt;= 3), ["name"]))
# [{'name': 'Chen'}, {'name': 'Eli'}]
a = project(select(enrolled, lambda t: t["cid"] == "CS201"), ["sid"])
b = project(select(enrolled, lambda t: t["cid"] == "MATH220"), ["sid"])
print(difference(a, difference(a, b)))   # [{'sid': 1}, {'sid': 2}]</code></pre>`
        },
        {
          q: `<p>A relation <code>flights(flight, day, pilot, gate)</code> records that a flight number on a given day has one pilot and one gate. A pilot flies at most one flight per day, and a gate serves at most one flight per day. List the candidate keys, and say which you would choose as primary key and why.</p>`,
          a: `<p>{flight, day} is a key: each flight on each day has one row. {pilot, day} is also a key, because a pilot flies one flight per day, so (pilot, day) determines the flight and hence the row. Likewise {gate, day}. None of these can lose an attribute: no single attribute identifies a row, since every flight, pilot and gate appears on many days. So there are three candidate keys. {flight, day} is the natural primary key, because it's what other tables (bookings, crew lists) will refer to and it stays fixed if the pilot or gate is changed.</p>`
        },
        {
          q: `<p>Show that the natural join is not just "product then select" when attribute names overlap: what goes wrong if you call the notes' <code>product(students, enrolled)</code> directly? Then express students ⋈ enrolled using rename, product, selection and projection.</p>`,
          a: `<p>Both relations have an attribute <code>sid</code>, so <code>{**r, **s}</code> overwrites the student's sid with the enrollment's, and the result silently pairs every student with every enrollment under the wrong id. Rename first, then select on equality and project the extra column away:</p>
<pre><code>e2 = rename(enrolled, {"sid": "esid"})
joined = select(product(students, e2), lambda t: t["sid"] == t["esid"])
manual = project(joined, ["sid", "name", "major", "year", "cid", "grade"])
print(manual == natural_join(students, enrolled))   # True</code></pre>`
        },
        {
          q: `<p>The files approach and a DBMS both lose data if the disk is destroyed. List three failures from the start of the lesson that a DBMS does prevent, and for each name the part of the DBMS (and the later lesson) responsible.</p>`,
          a: `<p>(1) Lost updates from two programs writing at once: concurrency control (Lesson 7). (2) A half-written file after a crash: logging and recovery, which make each transaction all-or-nothing (Lesson 8). (3) Enrollments for students who don't exist, or impossible grades: integrity constraints such as foreign keys and CHECK clauses, enforced on every change (this lesson and Lesson 2). Also: slow searches (indexes, Lesson 5) and code rewritten for each question (declarative queries, Lessons 2–3). Destroyed disks need backups or replication (Lesson 8).</p>`
        }
      ],
      sources: ["codd70", "dbsc", "cmu15445"]
    },
    {
      id: "db2",
      title: "SQL I: tables, queries and joins",
      minutes: 90,
      summary: "SQL, the language every relational database speaks: creating tables with keys and constraints, inserting rows, SELECT–FROM–WHERE queries with sorting and limits, inner and outer joins, how each query maps onto relational algebra, and NULL with SQL's three-valued logic. Every example runs in SQLite from Python.",
      notes: `
<p>Relational algebra says <em>how</em> to compute an answer, one operator at a time. <strong>SQL</strong> (Structured Query Language) lets you say <em>what</em> you want and leaves the how to the database. It was designed at IBM in the 1970s for System R, the first big implementation of Codd's ideas, and is now an international standard spoken, with dialect differences, by every relational database. CS 240 Lesson 8 showed a single SQL query as an example of injection and promised this course; here is the language properly.</p>

<h3>SQLite from Python</h3>
<p>We use <strong>SQLite</strong>, a complete SQL database that runs inside your program rather than as a separate server. Python's built-in <code>sqlite3</code> module includes it, and it runs in this page. <code>sqlite3.connect(":memory:")</code> creates a database that lives in memory and vanishes when the program ends; a file name instead, such as <code>"school.db"</code>, stores it in that file. <code>execute</code> runs one SQL statement and returns a <em>cursor</em>, whose <code>fetchall()</code> returns the result rows as a list of tuples. <code>executescript</code> runs several statements separated by semicolons.</p>
<p>SQL keywords are case-insensitive; writing them in capitals is a convention. Strings go in single quotes: <code>'CS'</code>.</p>

<h3>Creating tables</h3>
<pre><code>import sqlite3

db = sqlite3.connect(":memory:")
db.execute("PRAGMA foreign_keys = ON")      # SQLite-specific; see below
db.executescript("""
CREATE TABLE students (
    sid   INTEGER PRIMARY KEY,
    name  TEXT NOT NULL,
    major TEXT,
    year  INTEGER CHECK (year BETWEEN 1 AND 4)
);
CREATE TABLE courses (
    cid     TEXT PRIMARY KEY,
    title   TEXT NOT NULL,
    dept    TEXT NOT NULL,
    credits INTEGER NOT NULL
);
CREATE TABLE enrolled (
    sid   INTEGER NOT NULL REFERENCES students(sid),
    cid   TEXT NOT NULL REFERENCES courses(cid),
    grade INTEGER,
    PRIMARY KEY (sid, cid)
);
""")</code></pre>
<p><code>CREATE TABLE</code> declares a relation schema: each column's name and type, plus constraints. <code>PRIMARY KEY</code> makes the database reject a second row with the same key; a key of several columns is declared on its own line. <code>NOT NULL</code> forbids missing values (NULL, below). <code>REFERENCES</code> declares a foreign key, and <code>CHECK</code> states any condition each row must meet. Every constraint is checked on every insertion and update, for every program that uses the database: Lesson 1's integrity constraints, enforced in one place.</p>

<h3>Inserting rows</h3>
<pre><code>db.executemany("INSERT INTO students VALUES (?, ?, ?, ?)", [
    (1, "Ana", "CS", 2), (2, "Ben", "Math", 3), (3, "Chen", "CS", 3),
    (4, "Dara", "Physics", 1), (5, "Eli", "CS", 4)])
db.executemany("INSERT INTO courses VALUES (?, ?, ?, ?)", [
    ("CS201", "Data Structures", "CS", 4), ("CS240", "Software Engineering", "CS", 4),
    ("MATH220", "Linear Algebra", "Math", 3), ("PHYS150", "Mechanics", "Physics", 4),
    ("CS100", "Computing in Society", "CS", 2)])
db.executemany("INSERT INTO enrolled VALUES (?, ?, ?)", [
    (1, "CS201", 91), (1, "MATH220", 85), (2, "CS201", 88), (2, "MATH220", 78),
    (3, "CS201", 72), (3, "CS240", 95), (4, "PHYS150", 80), (4, "MATH220", None)])
db.commit()

def q(sql, params=()):
    return db.execute(sql, params).fetchall()</code></pre>
<p><code>executemany</code> runs the statement once per tuple, filling each <code>?</code> from it, exactly as in CS 240 Lesson 8; Lesson 3 explains why values should always be passed this way. Python's <code>None</code> becomes SQL's NULL: Dara has started MATH220 but has no grade yet. <code>commit()</code> makes the changes permanent (Lesson 7 explains transactions). The data is Lesson 1's, plus the courses table and Dara's new enrollment. Constraints now protect it:</p>
<pre><code>for bad in ["INSERT INTO enrolled VALUES (9, 'CS201', 50)",      # no student 9
            "INSERT INTO students VALUES (1, 'Fay', 'CS', 1)",   # sid 1 exists
            "INSERT INTO students VALUES (6, 'Gus', 'CS', 7)"]:  # year 7
    try:
        db.execute(bad)
    except sqlite3.IntegrityError as e:
        print(e)
# FOREIGN KEY constraint failed
# UNIQUE constraint failed: students.sid
# CHECK constraint failed: year BETWEEN 1 AND 4</code></pre>

<h3>SELECT, FROM, WHERE</h3>
<p>The basic query has three parts: <code>SELECT</code> the columns (or expressions) you want, <code>FROM</code> one or more tables, <code>WHERE</code> a condition on each row.</p>
<pre><code>print(q("SELECT name, year FROM students WHERE major = 'CS' AND year &gt;= 3"))
# [('Chen', 3), ('Eli', 4)]
print(q("SELECT * FROM courses WHERE credits &lt; 4"))
# [('MATH220', 'Linear Algebra', 'Math', 3), ('CS100', 'Computing in Society', 'CS', 2)]
print(q("SELECT name FROM students WHERE name LIKE 'D%' OR major IN ('Math', 'Art')"))
# [('Ben',), ('Dara',)]</code></pre>
<p><code>*</code> means every column. Conditions combine with <code>AND</code>, <code>OR</code> and <code>NOT</code>; <code>&lt;&gt;</code> means "not equal"; <code>LIKE</code> matches a pattern in which <code>%</code> is any run of characters and <code>_</code> is one character; <code>IN</code> tests membership in a list.</p>
<p>The output of a query is a table, but not quite a relation: SQL keeps duplicates unless you ask otherwise. <code>SELECT major FROM students</code> returns five rows, three of them <code>'CS'</code>; <code>SELECT DISTINCT major FROM students</code> returns three. Removing duplicates costs time (sorting or hashing), so SQL does it only on request. Formally, SQL works with <em>bags</em> (multisets), not sets.</p>

<h3>Sorting, limiting and computing</h3>
<p>Rows come back in no guaranteed order. Above, SQLite returned them in the order it stores them, but a different database, or the same one after an index is added, may not. If order matters, say so with <code>ORDER BY</code>, ascending by default or <code>DESC</code>, with later columns breaking ties. <code>LIMIT n</code> keeps the first <em>n</em> rows. Columns can be computed, and <code>AS</code> names them:</p>
<pre><code>print(q("""SELECT sid, cid, grade FROM enrolled
           ORDER BY grade DESC, sid LIMIT 3"""))
# [(3, 'CS240', 95), (1, 'CS201', 91), (2, 'CS201', 88)]
print(q("""SELECT cid, credits * 15 AS hours FROM courses
           WHERE dept = 'CS' ORDER BY hours DESC, cid"""))
# [('CS201', 60), ('CS240', 60), ('CS100', 30)]</code></pre>
<p>(<code>LIMIT</code> isn't in the SQL standard, which writes <code>FETCH FIRST 3 ROWS ONLY</code>, but SQLite, PostgreSQL and MySQL all accept it. <code>LIMIT 3 OFFSET 6</code> skips six rows first, which is how result pages 1, 2, 3 are fetched.)</p>

<h3>Joins</h3>
<p>Listing several tables in <code>FROM</code> forms their Cartesian product, and <code>WHERE</code> then keeps the matching pairs. The explicit <code>JOIN … ON</code> syntax says the same thing and keeps the join condition next to the join. Short <em>aliases</em> (<code>s</code>, <code>e</code>) name each table, and <code>s.sid</code> means "the sid column of s":</p>
<pre><code>a = q("""SELECT s.name, e.grade FROM students s, enrolled e
         WHERE s.sid = e.sid AND e.cid = 'CS201' ORDER BY s.name""")
b = q("""SELECT s.name, e.grade FROM students s JOIN enrolled e ON s.sid = e.sid
         WHERE e.cid = 'CS201' ORDER BY s.name""")
print(a)        # [('Ana', 91), ('Ben', 88), ('Chen', 72)]
print(a == b)   # True
print(q("""SELECT s.name, c.title FROM students s
           JOIN enrolled e ON s.sid = e.sid
           JOIN courses c ON e.cid = c.cid
           WHERE c.dept = 'Math' ORDER BY s.name"""))
# [('Ana', 'Linear Algebra'), ('Ben', 'Linear Algebra'), ('Dara', 'Linear Algebra')]</code></pre>
<p>This kind of join, which keeps only rows with a match, is an <strong>inner join</strong> (<code>JOIN</code> is short for <code>INNER JOIN</code>). Eli has no enrollments, so an inner join of students and enrolled has no row for him. A <strong>left outer join</strong> keeps every row of the left table, and fills the right table's columns with NULL where nothing matches:</p>
<pre><code>print(q("""SELECT s.name, e.cid FROM students s
           LEFT JOIN enrolled e ON s.sid = e.sid
           WHERE s.sid &gt;= 4 ORDER BY s.name, e.cid"""))
# [('Dara', 'MATH220'), ('Dara', 'PHYS150'), ('Eli', None)]
print(q("""SELECT c.cid FROM courses c LEFT JOIN enrolled e ON c.cid = e.cid
           WHERE e.cid IS NULL"""))
# [('CS100',)]</code></pre>
<p>The second query is a common pattern: left join, then keep the rows where the right side is missing, giving the courses nobody takes. It computes Lesson 1's difference. Be careful where conditions go in an outer join. A condition in <code>ON</code> decides which rows match; a condition in <code>WHERE</code> filters the result afterwards, and it can throw away exactly the NULL-padded rows you wanted:</p>
<pre><code>print(len(q("""SELECT s.name, e.cid FROM students s
               LEFT JOIN enrolled e ON s.sid = e.sid AND e.cid = 'CS201'""")))   # 5
print(len(q("""SELECT s.name, e.cid FROM students s
               LEFT JOIN enrolled e ON s.sid = e.sid WHERE e.cid = 'CS201'""")))  # 3</code></pre>
<p>The first keeps all five students, with a cid only for the three taking CS201; the second is just an inner join. A <em>right</em> outer join keeps every row of the right table, and a <em>full</em> outer join keeps unmatched rows from both sides (SQLite supports both since version 3.39).</p>

<h3>From SQL to relational algebra</h3>
<p>A query is easiest to understand in the order the database conceptually evaluates it, which is not the order it is written:</p>
<ol>
<li><code>FROM</code>: form the product of the tables (or the joins);</li>
<li><code>WHERE</code>: keep the rows where the condition is true;</li>
<li><code>SELECT</code>: compute the output columns (and remove duplicates if <code>DISTINCT</code>);</li>
<li><code>ORDER BY</code>, then <code>LIMIT</code>.</li>
</ol>
<p>So <code>SELECT DISTINCT</code> <em>A</em> <code>FROM</code> <em>R</em>, <em>S</em> <code>WHERE</code> <em>C</em> is exactly π<sub><em>A</em></sub>(σ<sub><em>C</em></sub>(<em>R</em> × <em>S</em>)). This order explains rules that otherwise seem arbitrary: a column alias defined in <code>SELECT</code> can be used in <code>ORDER BY</code> (which comes later) but, in standard SQL, not in <code>WHERE</code> (which comes earlier). The database doesn't actually build the product; the optimizer turns σ<sub><em>C</em></sub>(<em>R</em> × <em>S</em>) into a join and picks an algorithm for it (Lesson 6). The order is a definition of the answer, not a recipe.</p>

<h3>NULL and three-valued logic</h3>
<p><strong>NULL</strong> marks a missing or unknown value. It is not zero and not the empty string, and it changes how conditions work. What is <code>grade &gt; 80</code> when the grade is unknown? Neither true nor false: SQL says <strong>unknown</strong>. Any comparison with NULL, even <code>NULL = NULL</code>, is unknown, and the logical operators extend to three values:</p>
<table>
<tr><th><em>p</em></th><th><em>q</em></th><th><em>p</em> AND <em>q</em></th><th><em>p</em> OR <em>q</em></th><th>NOT <em>p</em></th></tr>
<tr><td>true</td><td>unknown</td><td>unknown</td><td>true</td><td>false</td></tr>
<tr><td>false</td><td>unknown</td><td>false</td><td>unknown</td><td>true</td></tr>
<tr><td>unknown</td><td>unknown</td><td>unknown</td><td>unknown</td><td>unknown</td></tr>
</table>
<p>(Rows with no unknown follow MATH 120 Lesson 1's truth tables.) The rule behind the table: treat unknown as "could be either". False AND anything is false whatever the unknown turns out to be, and true OR anything is true; otherwise the answer depends on the unknown, so it is unknown. <code>WHERE</code> keeps a row only if its condition is <em>true</em>, so unknown rows are dropped. That has a surprising consequence:</p>
<pre><code>print(len(q("SELECT * FROM enrolled")))                   # 8
print(len(q("SELECT * FROM enrolled WHERE grade &gt; 80")))   # 4
print(len(q("SELECT * FROM enrolled WHERE grade &lt;= 80")))  # 3
print(q("SELECT sid, cid FROM enrolled WHERE grade = NULL"))   # []
print(q("SELECT sid, cid FROM enrolled WHERE grade IS NULL"))  # [(4, 'MATH220')]
print(q("SELECT NULL = NULL, NULL AND 0, NULL OR 1, NOT NULL"))  # [(None, 0, 1, None)]</code></pre>
<p>A condition and its opposite together miss Dara's row. To test for NULL, use <code>IS NULL</code> or <code>IS NOT NULL</code>, never <code>= NULL</code>, which is unknown for every row. In the last line, SQLite shows false as 0, true as 1, and unknown as NULL, which Python receives as <code>None</code>.</p>

<h3>SQLite's quirks</h3>
<p>SQLite follows the standard closely, with a few differences worth knowing before you meet another database such as PostgreSQL:</p>
<ul>
<li><strong>Types are suggestions.</strong> A declared type gives a column an <em>affinity</em>, a preferred type to convert to, but SQLite stores any value in any column: inserting <code>'four'</code> into <code>credits INTEGER</code> succeeds and stores text. PostgreSQL rejects it. Declaring a table <code>STRICT</code> (SQLite 3.37 and later) makes SQLite reject it too.</li>
<li><strong>No boolean type.</strong> <code>TRUE</code> and <code>FALSE</code> are just 1 and 0. PostgreSQL has a real <code>BOOLEAN</code> type with values true, false and NULL.</li>
<li><strong>Foreign keys are off by default</strong>, for compatibility with old programs. Without <code>PRAGMA foreign_keys = ON</code>, run on each new connection, the dangling enrollment above would have been accepted.</li>
<li><strong>NULLs sort first</strong> in ascending order (SQLite treats NULL as smaller than any value); PostgreSQL sorts them last. Either can be overridden with <code>NULLS FIRST</code> or <code>NULLS LAST</code>.</li>
</ul>
<p class="note">Why it matters: most bugs in SQL queries are join bugs (a missing condition multiplies rows; an inner join silently drops rows that have no match) or NULL bugs (a condition that is never true). Check a new query on data that includes unmatched rows and NULLs.</p>
`,
      terms: [
        ["SQL", "Structured Query Language: the standard declarative language for defining, querying and changing relational databases."],
        ["SQLite", "A complete SQL database engine that runs inside the program using it, storing a database in a single file or in memory."],
        ["Cursor", "The object that runs a statement and holds its results; fetchall() returns the rows."],
        ["CREATE TABLE", "The statement that declares a table's columns, types and constraints."],
        ["CHECK constraint", "A condition every row of a table must satisfy."],
        ["SELECT–FROM–WHERE", "The basic query: choose columns, from tables, for rows meeting a condition."],
        ["DISTINCT", "A keyword that removes duplicate rows from a query's result."],
        ["ORDER BY", "The clause that sorts a query's result; without it, the order is unspecified."],
        ["LIMIT", "The clause that keeps only the first n rows of a result."],
        ["Inner join", "A join that keeps only pairs of rows that match the join condition."],
        ["Left outer join", "A join that keeps every row of the left table, filling the right table's columns with NULL where no row matches."],
        ["Bag", "A multiset: like a set, but elements may appear more than once. SQL tables and results are bags."],
        ["NULL", "A marker for a missing or unknown value."],
        ["Three-valued logic", "Logic with the values true, false and unknown, used by SQL conditions involving NULL."],
        ["Type affinity", "SQLite's per-column preferred type, used to convert values; it doesn't stop other types being stored."]
      ],
      quiz: [
        { q: "In what order does SQL conceptually evaluate the clauses of SELECT … FROM … WHERE … ORDER BY …?", choices: ["SELECT, FROM, WHERE, ORDER BY", "FROM, WHERE, SELECT, ORDER BY", "WHERE, FROM, SELECT, ORDER BY", "FROM, SELECT, WHERE, ORDER BY"], answer: 1, why: "Rows are formed, filtered, then shaped into output columns, then sorted." },
        { q: "A table has 10 rows; 3 have a NULL price. How many rows do WHERE price > 5 and WHERE NOT (price > 5) return together?", choices: ["10", "7", "13", "3"], answer: 1, why: "Both conditions are unknown for the 3 NULL rows, so neither query returns them." },
        { q: "What does NULL OR TRUE evaluate to?", choices: ["NULL (unknown)", "TRUE", "FALSE", "An error"], answer: 1, why: "TRUE OR anything is true, whatever the unknown value is." },
        { q: "Students LEFT JOIN enrolled ON s.sid = e.sid, where 5 students have 8 enrollments and one student has none. How many rows?", choices: ["8", "5", "9", "40"], answer: 2, why: "The 8 matched rows plus one NULL-padded row for the student with no enrollment." },
        { q: "Why might a query without ORDER BY return rows in a different order tomorrow?", choices: ["SQL shuffles rows", "Tables are bags with no defined order; the order depends on how the database chooses to execute the query", "Because of NULLs", "It can't"], answer: 1, why: "Adding an index or more data can change the plan and hence the order." },
        { q: "In SQLite, a column declared INTEGER is given the value 'four'. What happens?", choices: ["An error, as in PostgreSQL", "The text 'four' is stored, unless the table is STRICT", "It stores 4", "It stores NULL"], answer: 1, why: "SQLite's types are affinities; STRICT tables enforce them." }
      ],
      practice: [
        {
          q: `<p>Write and run queries on the notes' database for: (a) the titles of courses worth 4 credits, alphabetically; (b) the names of students taking a course in their own major's department; (c) each student's name with the number of credits of each course they take, for students in year 3, ordered by name then credits.</p>`,
          hint: `<p>For (b), join all three tables and compare <code>s.major</code> with <code>c.dept</code>.</p>`,
          a: `<pre><code>print(q("SELECT title FROM courses WHERE credits = 4 ORDER BY title"))
# [('Data Structures',), ('Mechanics',), ('Software Engineering',)]
print(q("""SELECT DISTINCT s.name FROM students s
           JOIN enrolled e ON s.sid = e.sid JOIN courses c ON e.cid = c.cid
           WHERE c.dept = s.major ORDER BY s.name"""))
# [('Ana',), ('Ben',), ('Chen',), ('Dara',)]
print(q("""SELECT s.name, c.credits FROM students s
           JOIN enrolled e ON s.sid = e.sid JOIN courses c ON e.cid = c.cid
           WHERE s.year = 3 ORDER BY s.name, c.credits"""))
# [('Ben', 3), ('Ben', 4), ('Chen', 4), ('Chen', 4)]</code></pre><p>In (b), DISTINCT matters: Chen takes two CS courses and would otherwise appear twice.</p>`
        },
        {
          q: `<p>Translate into relational algebra, then predict the number of rows: <code>SELECT s.name FROM students s, enrolled e WHERE e.grade &gt; 85</code>. What mistake does it contain, and how should it be fixed if the intent was "students with a grade above 85"?</p>`,
          a: `<p>It is π<sub>name</sub>(σ<sub>grade &gt; 85</sub>(students × enrolled)) without duplicate removal. Three enrollments have grades above 85 (91, 88, 95), and the product pairs each with all 5 students, so it returns 15 rows. The join condition <code>s.sid = e.sid</code> is missing. The fix: <code>SELECT DISTINCT s.name FROM students s JOIN enrolled e ON s.sid = e.sid WHERE e.grade &gt; 85</code>, giving Ana, Ben and Chen.</p>
<pre><code>print(len(q("SELECT s.name FROM students s, enrolled e WHERE e.grade &gt; 85")))   # 15</code></pre>`
        },
        {
          q: `<p>Evaluate each condition for a row with <code>a = 3</code> and <code>b</code> NULL, and say whether WHERE keeps the row: (a) <code>a &gt; 1 OR b = 2</code>; (b) <code>a &gt; 1 AND b = 2</code>; (c) <code>NOT (b = 2)</code>; (d) <code>a = 3 AND b IS NULL</code>; (e) <code>b &lt;&gt; 2 OR b = 2</code>.</p>`,
          a: `<p>(a) true OR unknown = true: kept. (b) true AND unknown = unknown: dropped. (c) NOT unknown = unknown: dropped. (d) true AND true = true: kept. (e) unknown OR unknown = unknown: dropped, even though in two-valued logic "<em>p</em> or not <em>p</em>" is always true.</p>
<pre><code>print(q("SELECT 3 &gt; 1 OR NULL = 2, 3 &gt; 1 AND NULL = 2, NOT (NULL = 2), NULL &lt;&gt; 2 OR NULL = 2"))
# [(1, None, None, None)]</code></pre>`
        },
        {
          q: `<p>List every course with the names of its students, including courses with no students (show NULL for the name), ordered by course id and then name. Explain why the join order you chose matters.</p>`,
          a: `<p>Courses must be on the left of the outer joins so that every course is kept; the second join must also be a left join, or the NULL-padded CS100 row (whose <code>e.sid</code> is NULL) would match no student and be dropped.</p>
<pre><code>print(q("""SELECT c.cid, s.name FROM courses c
           LEFT JOIN enrolled e ON c.cid = e.cid
           LEFT JOIN students s ON e.sid = s.sid
           ORDER BY c.cid, s.name"""))
# [('CS100', None), ('CS201', 'Ana'), ('CS201', 'Ben'), ('CS201', 'Chen'), ('CS240', 'Chen'), ('MATH220', 'Ana'), ('MATH220', 'Ben'), ('MATH220', 'Dara'), ('PHYS150', 'Dara')]</code></pre>`
        }
      ],
      sources: ["dbsc", "sqlitedocs", "pysqlite3", "cmu15445"]
    },
    {
      id: "db3",
      title: "SQL II: grouping, subqueries, views and parameters",
      minutes: 90,
      summary: "The rest of everyday SQL: aggregate functions, GROUP BY and HAVING, subqueries with IN, EXISTS and correlation, set operations, views, common table expressions including recursive ones, and parameterized queries from Python, which keep user input from being run as SQL.",
      notes: `
<p>Lesson 2's queries look at rows one at a time. Many questions are about groups of rows: how many students take each course, which course has the highest average, who takes every course their friend takes. This lesson covers the SQL for them, then how to send queries from a program safely. The database is Lesson 2's, rebuilt here with literal values in one script:</p>
<pre><code>import sqlite3

db = sqlite3.connect(":memory:")
db.executescript("""
CREATE TABLE students (sid INTEGER PRIMARY KEY, name TEXT NOT NULL, major TEXT, year INTEGER);
CREATE TABLE courses (cid TEXT PRIMARY KEY, title TEXT NOT NULL, dept TEXT NOT NULL,
                      credits INTEGER NOT NULL);
CREATE TABLE enrolled (sid INTEGER REFERENCES students, cid TEXT REFERENCES courses,
                       grade INTEGER, PRIMARY KEY (sid, cid));
INSERT INTO students VALUES (1, 'Ana', 'CS', 2), (2, 'Ben', 'Math', 3), (3, 'Chen', 'CS', 3),
    (4, 'Dara', 'Physics', 1), (5, 'Eli', 'CS', 4);
INSERT INTO courses VALUES ('CS201', 'Data Structures', 'CS', 4),
    ('CS240', 'Software Engineering', 'CS', 4), ('MATH220', 'Linear Algebra', 'Math', 3),
    ('PHYS150', 'Mechanics', 'Physics', 4), ('CS100', 'Computing in Society', 'CS', 2);
INSERT INTO enrolled VALUES (1, 'CS201', 91), (1, 'MATH220', 85), (2, 'CS201', 88),
    (2, 'MATH220', 78), (3, 'CS201', 72), (3, 'CS240', 95), (4, 'PHYS150', 80),
    (4, 'MATH220', NULL);
""")

def q(sql, params=()):
    return db.execute(sql, params).fetchall()</code></pre>

<h3>Aggregates</h3>
<p>An <strong>aggregate function</strong> turns a column of values into one value: <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code> and <code>MAX</code>. All of them skip NULLs, except <code>COUNT(*)</code>, which counts rows.</p>
<pre><code>print(q("SELECT COUNT(*), COUNT(grade), AVG(grade), MIN(grade), MAX(grade) FROM enrolled"))
# [(8, 7, 84.14285714285714, 72, 95)]
print(q("SELECT COUNT(DISTINCT cid) FROM enrolled"))                # [(4,)]
print(q("SELECT COUNT(*), SUM(grade) FROM enrolled WHERE grade &gt; 100"))   # [(0, None)]</code></pre>
<p>The average is over the 7 known grades: 589 / 7 ≈ 84.14. Over no rows at all, <code>COUNT</code> is 0 but <code>SUM</code>, <code>AVG</code>, <code>MIN</code> and <code>MAX</code> are NULL: there is nothing to add up. <code>COALESCE(x, 0)</code>, which returns its first argument that isn't NULL, turns such a NULL into 0.</p>

<h3>GROUP BY and HAVING</h3>
<p><code>GROUP BY</code> splits the rows into groups that agree on the listed columns and produces one output row per group, so aggregates are computed per group:</p>
<pre><code>print(q("""SELECT cid, COUNT(*), ROUND(AVG(grade), 1) FROM enrolled
           GROUP BY cid ORDER BY cid"""))
# [('CS201', 3, 83.7), ('CS240', 1, 95.0), ('MATH220', 3, 81.5), ('PHYS150', 1, 80.0)]</code></pre>
<p>MATH220 has three students but averages only its two known grades, (85 + 78) / 2 = 81.5. Since each group produces one row, every column in <code>SELECT</code> must either be listed in <code>GROUP BY</code> or be inside an aggregate: within the CS201 group, "the" grade has no single value, but its average does. (SQLite is lax here, another quirk: it accepts a bare column and takes its value from some row of the group. PostgreSQL rejects the query, which is safer.)</p>
<p>Grouping after a join answers questions about each student. Use a left join to keep students with no enrollments, and count a column from the right table, which is NULL for them, rather than <code>*</code>:</p>
<pre><code>print(q("""SELECT s.name, COUNT(e.cid), COUNT(*), COALESCE(SUM(c.credits), 0)
           FROM students s
           LEFT JOIN enrolled e ON s.sid = e.sid
           LEFT JOIN courses c ON e.cid = c.cid
           GROUP BY s.sid, s.name ORDER BY s.name"""))
# [('Ana', 2, 2, 7), ('Ben', 2, 2, 7), ('Chen', 2, 2, 8), ('Dara', 2, 2, 7), ('Eli', 0, 1, 0)]</code></pre>
<p>Eli's group holds one NULL-padded row, so <code>COUNT(*)</code> wrongly says 1 while <code>COUNT(e.cid)</code> correctly says 0.</p>
<p><code>WHERE</code> filters rows before grouping; <code>HAVING</code> filters groups after it, so only <code>HAVING</code> can test an aggregate:</p>
<pre><code>print(q("""SELECT cid, COUNT(*) FROM enrolled WHERE grade &gt;= 80
           GROUP BY cid HAVING COUNT(*) &gt;= 2"""))
# [('CS201', 2)]</code></pre>
<p>Read it in evaluation order. <code>WHERE</code> keeps the grades of at least 80 (CS201's 91 and 88; MATH220's 85; CS240's 95; PHYS150's 80), <code>GROUP BY</code> forms groups of sizes 2, 1, 1 and 1, and <code>HAVING</code> keeps the groups of at least 2. The full order is FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.</p>

<h3>Subqueries</h3>
<p>A query can appear inside another wherever a value or a table can. A <strong>scalar subquery</strong> returns one value:</p>
<pre><code>print(q("""SELECT sid, grade FROM enrolled WHERE cid = 'CS201'
           AND grade &gt; (SELECT AVG(grade) FROM enrolled WHERE cid = 'CS201')"""))
# [(1, 91), (2, 88)]</code></pre>
<p><code>IN</code> tests membership in a subquery's result, and <code>NOT IN</code> the opposite:</p>
<pre><code>print(q("""SELECT name FROM students WHERE sid IN
             (SELECT e.sid FROM enrolled e JOIN courses c ON e.cid = c.cid
              WHERE c.dept = 'Math') ORDER BY name"""))
# [('Ana',), ('Ben',), ('Dara',)]
print(q("SELECT name FROM students WHERE year NOT IN (1, 2)"))         # [('Ben',), ('Chen',), ('Eli',)]
print(q("SELECT name FROM students WHERE year NOT IN (1, 2, NULL)"))   # []</code></pre>
<p>The last query returns nothing. <code>year NOT IN (1, 2, NULL)</code> means <code>year &lt;&gt; 1 AND year &lt;&gt; 2 AND year &lt;&gt; NULL</code>, and the last part is unknown, so the whole condition is never true. A subquery whose result contains a single NULL does the same, a classic bug. <code>NOT EXISTS</code> avoids it.</p>
<p><code>EXISTS (subquery)</code> is true when the subquery returns at least one row. It is usually <strong>correlated</strong>: the inner query mentions a table of the outer query, so conceptually it is re-evaluated for each outer row.</p>
<pre><code>print(q("""SELECT name FROM students s WHERE EXISTS
             (SELECT 1 FROM enrolled e WHERE e.sid = s.sid AND e.grade &gt;= 90)
           ORDER BY name"""))
# [('Ana',), ('Chen',)]
print(q("""SELECT e.sid, e.cid, e.grade FROM enrolled e
           WHERE e.grade &gt; (SELECT AVG(e2.grade) FROM enrolled e2 WHERE e2.cid = e.cid)
           ORDER BY e.sid, e.cid"""))
# [(1, 'CS201', 91), (1, 'MATH220', 85), (2, 'CS201', 88)]</code></pre>
<p>The second query finds each grade above <em>its own course's</em> average: for each row <code>e</code>, the subquery averages the rows <code>e2</code> of the same course. The optimizer usually avoids literally rerunning it (for example by computing all the averages once), but "once per outer row" is the meaning.</p>

<h3>Set operations</h3>
<p><code>UNION</code>, <code>INTERSECT</code> and <code>EXCEPT</code> combine the results of two queries with the same number of columns, as Lesson 1's ∪, ∩ and −. They remove duplicates; <code>UNION ALL</code> keeps them (and is faster, since it needn't check).</p>
<pre><code>cs201 = "SELECT sid FROM enrolled WHERE cid = 'CS201'"
math = "SELECT sid FROM enrolled WHERE cid = 'MATH220'"
print(q(cs201 + " INTERSECT " + math))   # [(1,), (2,)]
print(q(cs201 + " EXCEPT " + math))      # [(3,)]
print(len(q(cs201 + " UNION ALL " + math)), len(q(cs201 + " UNION " + math)))   # 6 4</code></pre>
<p>(Gluing these query strings together is safe because they are constants written by the programmer, not user input. That distinction is the subject of the last section.)</p>

<h3>Views and common table expressions</h3>
<p>A <strong>view</strong> is a named query that can be used like a table. The database stores the query, not its result, so a view is always up to date:</p>
<pre><code>db.execute("""CREATE VIEW transcript AS
              SELECT s.sid, s.name, c.cid, c.credits, e.grade
              FROM students s JOIN enrolled e ON s.sid = e.sid
                              JOIN courses c ON e.cid = c.cid""")
print(q("SELECT name, SUM(credits) FROM transcript GROUP BY sid, name HAVING SUM(credits) &gt;= 8"))
# [('Chen', 8)]</code></pre>
<p>Views give programs a stable interface while the tables beneath change (Lesson 1's data independence, at the logical level), and they restrict access: a view without the grade column can be shown to users who mustn't see grades. Some databases also offer <em>materialized</em> views, which store the result and must be refreshed.</p>
<p>A <strong>common table expression</strong> (CTE) is a view that lasts for one query, written first with <code>WITH</code>. It lets a long query be read top to bottom in named steps. The "above its course's average" query again, without correlation:</p>
<pre><code>print(q("""WITH course_avg AS (
               SELECT cid, AVG(grade) AS avg_grade FROM enrolled GROUP BY cid)
           SELECT e.sid, e.cid, e.grade
           FROM enrolled e JOIN course_avg a ON e.cid = a.cid
           WHERE e.grade &gt; a.avg_grade ORDER BY e.sid, e.cid"""))
# [(1, 'CS201', 91), (1, 'MATH220', 85), (2, 'CS201', 88)]</code></pre>
<p>A <strong>recursive CTE</strong> refers to itself, which lets SQL follow chains of any length. Given each course's direct prerequisites, which courses must be taken, directly or indirectly, before CS340?</p>
<pre><code>db.executescript("""
CREATE TABLE prereq (course TEXT, needs TEXT);
INSERT INTO prereq VALUES ('CS102', 'CS101'), ('CS201', 'CS102'), ('CS240', 'CS201'),
    ('CS240', 'CS102'), ('CS340', 'CS201'), ('CS340', 'CS240'), ('CS340', 'MATH120');
""")
print(q("""WITH RECURSIVE needed(cid) AS (
               SELECT needs FROM prereq WHERE course = 'CS340'
               UNION
               SELECT p.needs FROM prereq p JOIN needed n ON p.course = n.cid)
           SELECT cid FROM needed ORDER BY cid"""))
# [('CS101',), ('CS102',), ('CS201',), ('CS240',), ('MATH120',)]</code></pre>
<p>The first <code>SELECT</code> is the base case (CS201, CS240, MATH120). The second runs repeatedly, each time adding the prerequisites of the courses found in the previous round, until a round adds nothing new. It is breadth-first search (CS 201 Lesson 7) over the prerequisite graph, and it computes the <strong>transitive closure</strong> of the relation "needs": the smallest transitive relation containing it (transitivity is from MATH 120 Lesson 5), here every course reachable by following prerequisites. Because <code>UNION</code> drops rows already found, it stops even if the graph has a cycle.</p>

<h3>Parameterized queries</h3>
<p>Programs build queries from user input: a search box, a login form. CS 240 Lesson 8 showed why pasting input into SQL text is dangerous. Here it is against a real database:</p>
<pre><code>name = "x' OR '1'='1"
print(q("SELECT sid FROM students WHERE name = '" + name + "'"))   # [(1,), (2,), (3,), (4,), (5,)]
print(q("SELECT sid FROM students WHERE name = ?", (name,)))        # []</code></pre>
<p>Concatenation produced <code>WHERE name = 'x' OR '1'='1'</code>, which is true for every row. With a <strong>placeholder</strong> <code>?</code>, the database parses the query first and receives the value separately, so the value is only ever compared as a string, whatever characters it contains. An honest name breaks the concatenated version too: <code>O'Brien</code> ends the string early and causes a syntax error. Parameters can also be named, with values from a dict:</p>
<pre><code>print(q("SELECT name FROM students WHERE major = :major AND year &gt;= :y",
        {"major": "CS", "y": 3}))
# [('Chen',), ('Eli',)]</code></pre>
<p>Rules for using them:</p>
<ul>
<li>Pass <em>every</em> value that comes from outside the program as a parameter, never with <code>+</code>, f-strings or <code>%</code>.</li>
<li>Placeholders stand for values only, not for table names, column names or keywords. To let users choose a sort column, check their choice against a fixed list of allowed names, then insert the name from your list.</li>
<li>For a list of values, generate one placeholder per value: <code>",".join("?" * len(ids))</code> gives <code>"?,?,?"</code> for three ids, which is safe because it contains only question marks.</li>
</ul>
<p>Python's <code>execute</code> also refuses to run more than one statement, so the famous attack that appends <code>; DROP TABLE students</code> raises an error instead (<code>executescript</code> has no such protection, so never give it user input). Parameters have a second benefit: a database can parse and plan a parameterized query once and reuse the plan for each new value.</p>
<p class="note">Why it matters: grouping and subqueries let one query replace pages of loops, and the database runs it close to the data. Parameters are not optional: injection has been on the OWASP list of the most serious web risks since the list began.</p>
`,
      terms: [
        ["Aggregate function", "A function such as COUNT, SUM, AVG, MIN or MAX that combines many values into one; all but COUNT(*) skip NULLs."],
        ["COALESCE", "A function returning its first argument that isn't NULL."],
        ["GROUP BY", "The clause that partitions rows into groups agreeing on given columns, producing one result row per group."],
        ["HAVING", "The clause that filters groups after grouping, so it can test aggregates."],
        ["Subquery", "A query nested inside another, used as a value, a set of values or a table."],
        ["Correlated subquery", "A subquery that refers to a row of the outer query, so its meaning is evaluated once per outer row."],
        ["EXISTS", "A condition that is true when a subquery returns at least one row."],
        ["UNION / INTERSECT / EXCEPT", "Set operations on query results with the same columns; they remove duplicates, while UNION ALL keeps them."],
        ["View", "A named, stored query that can be used like a table."],
        ["Common table expression (CTE)", "A named subquery introduced with WITH for the duration of one query."],
        ["Recursive CTE", "A CTE that refers to itself, repeatedly adding rows until none are new; used for chains and graphs."],
        ["Placeholder", "A marker (? or :name) in a query for a value supplied separately."],
        ["Parameterized query", "A query whose values are passed separately from its text, so they can't change its structure."]
      ],
      quiz: [
        { q: "A table has 10 rows; the column x is NULL in 4 of them. What are COUNT(*) and COUNT(x)?", choices: ["10 and 10", "10 and 6", "6 and 6", "6 and 10"], answer: 1, why: "COUNT(*) counts rows; COUNT(x) skips NULLs." },
        { q: "Which clause can filter on AVG(grade)?", choices: ["WHERE", "HAVING", "FROM", "Neither"], answer: 1, why: "WHERE runs before grouping, so aggregates don't exist yet; HAVING runs after." },
        { q: "The subquery returns (1, 2, NULL). Which rows does WHERE x NOT IN (subquery) keep?", choices: ["Rows with x not 1 or 2", "None", "All rows", "Rows where x is NULL"], answer: 1, why: "x <> NULL is unknown, so the AND of the comparisons is never true." },
        { q: "What makes a subquery correlated?", choices: ["It uses GROUP BY", "It refers to a column of the outer query's current row", "It returns one value", "It uses EXISTS"], answer: 1, why: "Its result depends on the outer row, so conceptually it's evaluated once per row." },
        { q: "Why does a recursive CTE written with UNION stop on a cyclic graph?", choices: ["SQL limits recursion to 100 levels", "UNION drops rows already found, so eventually a round adds nothing new", "Cycles are an error", "It doesn't stop"], answer: 1, why: "With UNION ALL, rows would be added forever around the cycle." },
        { q: "A program needs ORDER BY on a column the user picks. What's the safe way?", choices: ["ORDER BY ? with the column as a parameter", "Paste the user's text into the query", "Check the choice against a fixed list of allowed column names, then use the name from the list", "Escape quotes in the user's text"], answer: 2, why: "Placeholders can't stand for column names, and escaping by hand is error-prone." }
      ],
      practice: [
        {
          q: `<p>Write queries for: (a) each department with the number of courses it offers and their total credits, largest total first; (b) the names of students whose average known grade is at least 85; (c) the course(s) with the most students, using a subquery rather than <code>LIMIT 1</code> (so ties are all returned).</p>`,
          a: `<pre><code>print(q("""SELECT dept, COUNT(*), SUM(credits) FROM courses
           GROUP BY dept ORDER BY SUM(credits) DESC, dept"""))
# [('CS', 3, 10), ('Physics', 1, 4), ('Math', 1, 3)]
print(q("""SELECT s.name FROM students s JOIN enrolled e ON s.sid = e.sid
           GROUP BY s.sid, s.name HAVING AVG(e.grade) &gt;= 85 ORDER BY s.name"""))
# [('Ana',)]
print(q("""SELECT cid FROM enrolled GROUP BY cid
           HAVING COUNT(*) = (SELECT MAX(n) FROM
                              (SELECT COUNT(*) AS n FROM enrolled GROUP BY cid))
           ORDER BY cid"""))
# [('CS201',), ('MATH220',)]</code></pre><p>In (b), Ana averages (91 + 85) / 2 = 88; Ben 83; Chen 83.5; Dara's only known grade is 80. In (c), the innermost query is a table of group sizes, used in <code>FROM</code>; CS201 and MATH220 tie with 3.</p>`
        },
        {
          q: `<p>Find the names of students who take every course that Ana (sid 1) takes, Ana included. Use two nested <code>NOT EXISTS</code>: "there is no course of Ana's that this student doesn't take".</p>`,
          hint: `<p>The outer query ranges over students <code>s</code>. The middle subquery ranges over Ana's enrollments <code>a</code>. The inner subquery looks for an enrollment of <code>s</code> in <code>a.cid</code>.</p>`,
          a: `<pre><code>print(q("""SELECT s.name FROM students s WHERE NOT EXISTS (
               SELECT 1 FROM enrolled a WHERE a.sid = 1 AND NOT EXISTS (
                   SELECT 1 FROM enrolled e WHERE e.sid = s.sid AND e.cid = a.cid))
           ORDER BY s.name"""))
# [('Ana',), ('Ben',)]</code></pre><p>Ana takes CS201 and MATH220; only Ben also takes both. This "for all" query is relational <em>division</em>. Logic explains the shape: ∀<em>c</em> (Ana takes <em>c</em> → <em>s</em> takes <em>c</em>) is equivalent to ¬∃<em>c</em> (Ana takes <em>c</em> ∧ ¬(<em>s</em> takes <em>c</em>)), by negating a quantifier as in MATH 120 Lesson 2.</p>`
        },
        {
          q: `<p>Write <code>students_in(db, cids)</code> that returns the sorted distinct names of students enrolled in any of the course ids in the list <code>cids</code>, safely, for a list of any length. What should it return for an empty list?</p>`,
          a: `<pre><code>def students_in(db, cids):
    if not cids:
        return []                    # "IN ()" is a syntax error in most databases
    marks = ",".join("?" * len(cids))
    rows = db.execute("SELECT DISTINCT s.name FROM students s JOIN enrolled e "
                      "ON s.sid = e.sid WHERE e.cid IN (" + marks + ") ORDER BY s.name",
                      list(cids)).fetchall()
    return [r[0] for r in rows]

print(students_in(db, ["CS240", "PHYS150"]))     # ['Chen', 'Dara']
print(students_in(db, ["x') OR 1=1 --"]))         # []
print(students_in(db, []))                       # []</code></pre><p>Only question marks are pasted into the query text; every value is a parameter. An empty list matches nothing, so it returns <code>[]</code> without querying.</p>`
        },
        {
          q: `<p>Using a recursive CTE on the notes' <code>prereq</code> table, list every course that has CS201 as a direct or indirect prerequisite (the courses CS201 "unlocks"). Then explain what would happen with <code>UNION ALL</code> if someone added the row <code>('CS201', 'CS340')</code>.</p>`,
          a: `<pre><code>print(q("""WITH RECURSIVE unlocks(cid) AS (
               SELECT course FROM prereq WHERE needs = 'CS201'
               UNION
               SELECT p.course FROM prereq p JOIN unlocks u ON p.needs = u.cid)
           SELECT cid FROM unlocks ORDER BY cid"""))
# [('CS240',), ('CS340',)]</code></pre><p>The recursion follows the edges in the other direction. The added row makes a cycle CS201 → CS340 → CS201. With <code>UNION</code> the query still stops, since rows already found are discarded. With <code>UNION ALL</code>, each round would re-add the same courses forever (SQLite would run until stopped or out of memory), unless a <code>LIMIT</code> or a depth counter column ended it.</p>`
        }
      ],
      sources: ["dbsc", "sqlitedocs", "pysqlite3", "owasp"]
    },
    {
      id: "db4",
      title: "Database design and normalization",
      minutes: 90,
      summary: "How to decide which tables a database should have: entity–relationship modeling and its translation into tables, the update, insertion and deletion anomalies of a poor design, functional dependencies and attribute closure, finding keys, the normal forms 1NF, 3NF and BCNF, and decomposing a relation into BCNF without losing information.",
      notes: `
<p>So far the tables were given. Choosing them is the most consequential decision in building a database: queries can be rewritten in an afternoon, but a schema holding years of data is hard to change. This lesson gives two tools. Entity–relationship modeling produces a first design from a description of the world, and the theory of functional dependencies tests a design and repairs it.</p>

<h3>Entity–relationship modeling</h3>
<p>An <strong>entity–relationship (ER) model</strong>, introduced by Peter Chen in 1976, describes the world as <strong>entities</strong> (things, such as students and courses), grouped into <em>entity sets</em>, each with <strong>attributes</strong> and a key; and <strong>relationships</strong> among entities, which can have attributes of their own. A grade belongs neither to a student nor to a course but to the relationship "student enrolls in course".</p>
<figure class="fig"><svg viewBox="0 0 560 300" role="img" aria-label="ER diagram: Student and Course entities joined by an Enrolls relationship with attribute grade, many-to-many; Course joined to Department by Offers, many-to-one.">
<g class="ln"><line x1="130" y1="100" x2="180" y2="100"/><line x1="280" y1="100" x2="330" y2="100"/><line x1="230" y1="50" x2="230" y2="70"/>
<line x1="52" y1="49" x2="65" y2="80"/><line x1="118" y1="49" x2="105" y2="80"/><line x1="348" y1="49" x2="360" y2="80"/><line x1="418" y1="49" x2="405" y2="80"/>
<line x1="380" y1="120" x2="380" y2="145"/><line x1="380" y1="205" x2="380" y2="240"/><line x1="435" y1="260" x2="466" y2="260"/></g>
<g class="box"><rect x="30" y="80" width="100" height="40"/><rect x="330" y="80" width="100" height="40"/><rect x="325" y="240" width="110" height="40"/></g>
<g class="soft"><polygon points="230,70 280,100 230,130 180,100"/><polygon points="380,145 430,175 380,205 330,175"/></g>
<g class="outline"><ellipse cx="50" cy="35" rx="26" ry="14"/><ellipse cx="120" cy="35" rx="30" ry="14"/><ellipse cx="230" cy="35" rx="32" ry="15"/><ellipse cx="345" cy="35" rx="26" ry="14"/><ellipse cx="420" cy="35" rx="28" ry="14"/><ellipse cx="502" cy="260" rx="36" ry="14"/></g>
<g class="ln"><line x1="40" y1="42" x2="60" y2="42"/><line x1="335" y1="42" x2="356" y2="42"/><line x1="485" y1="267" x2="519" y2="267"/></g>
<g class="text"><text x="80" y="105" text-anchor="middle">Student</text><text x="380" y="105" text-anchor="middle">Course</text><text x="380" y="265" text-anchor="middle">Department</text>
<text x="230" y="105" text-anchor="middle">Enrolls</text><text x="380" y="180" text-anchor="middle">Offers</text>
<text x="50" y="40" text-anchor="middle" class="code">sid</text><text x="120" y="40" text-anchor="middle" class="code">name</text><text x="230" y="40" text-anchor="middle" class="code">grade</text><text x="345" y="40" text-anchor="middle" class="code">cid</text><text x="420" y="40" text-anchor="middle" class="code">title</text><text x="502" y="265" text-anchor="middle" class="code">dname</text>
<text x="152" y="92" class="m">M</text><text x="300" y="92" class="m">N</text><text x="388" y="138" class="m">N</text><text x="388" y="225" class="m">1</text></g>
</svg><figcaption>An ER diagram in Chen's notation: rectangles are entity sets, diamonds relationships, ovals attributes; key attributes are underlined. M and N mean "many"; each course is offered by exactly one department.</figcaption></figure>
<p>The <strong>cardinality</strong> of a relationship says how many entities on each side can be related. Enrolls is <em>many-to-many</em>: a student takes many courses and a course has many students. Offers is <em>many-to-one</em>: many courses per department, one department per course. <em>One-to-one</em> also occurs (each department has one head, who heads one department). Participation can be <em>total</em> (every course must have a department) or <em>partial</em> (a student need not enroll in anything). A <strong>weak entity</strong> can't be identified by its own attributes alone: a section "Fall 2026, number 2" makes sense only within its course, so its key includes the course's key. Industry diagrams usually draw the same ideas in "crow's foot" notation, with forked line ends for "many".</p>
<p>Translating an ER model into tables follows rules:</p>
<ul>
<li>Each entity set becomes a table whose primary key is the entity's key: <code>students(sid, name)</code>, <code>courses(cid, title, dname)</code>, <code>departments(dname)</code>.</li>
<li>A many-to-many relationship becomes its own table, whose key combines the keys of the entities it connects, each a foreign key, plus the relationship's attributes: <code>enrolled(sid, cid, grade)</code> with key (sid, cid).</li>
<li>A many-to-one relationship becomes a foreign key on the "many" side: <code>courses.dname</code> references <code>departments</code>. Total participation adds <code>NOT NULL</code>.</li>
<li>A weak entity's table includes its owner's key in its own: <code>sections(cid, term, number)</code>, key all three.</li>
<li>An attribute with several values, such as a student's phone numbers, becomes a separate table <code>phones(sid, phone)</code>, so that every value stays atomic.</li>
</ul>

<h3>What goes wrong in a bad design</h3>
<p>Suppose instead that everything lives in one wide table, as in a spreadsheet:</p>
<table>
<tr><th>sid</th><th>name</th><th>cid</th><th>title</th><th>dept</th><th>grade</th></tr>
<tr><td>1</td><td>Ana</td><td>CS201</td><td>Data Structures</td><td>CS</td><td>91</td></tr>
<tr><td>1</td><td>Ana</td><td>MATH220</td><td>Linear Algebra</td><td>Math</td><td>85</td></tr>
<tr><td>2</td><td>Ben</td><td>CS201</td><td>Data Structures</td><td>CS</td><td>88</td></tr>
</table>
<p>Facts are repeated: "CS201 is Data Structures in CS" appears once per student, and "student 1 is Ana" once per course. That <strong>redundancy</strong> wastes space, but the real harm is three <strong>anomalies</strong>:</p>
<ul>
<li><strong>Update anomaly:</strong> renaming CS201 means changing every one of its rows; miss one and the database contradicts itself.</li>
<li><strong>Insertion anomaly:</strong> a new course with no students yet can't be recorded without inventing a student, since (sid, cid) is the key and sid can't be NULL.</li>
<li><strong>Deletion anomaly:</strong> if Ben drops CS201 and was its only student, deleting his row also deletes the fact that CS201 exists.</li>
</ul>
<p>The cause is that the table mixes facts about different things. To say that precisely we need functional dependencies.</p>

<h3>Functional dependencies</h3>
<p>A <strong>functional dependency</strong> (FD) <em>X</em> → <em>Y</em>, read "<em>X</em> determines <em>Y</em>", says that any two rows that agree on the attributes <em>X</em> also agree on <em>Y</em>: the value of <em>X</em> fixes the value of <em>Y</em>, as a function (MATH 120 Lesson 5) does. In the wide table:</p>
<p class="math">sid → name &nbsp;&nbsp;&nbsp; cid → title, dept &nbsp;&nbsp;&nbsp; sid, cid → grade</p>
<p>Like keys, FDs are rules about the meaning of the data. A key is a special case: <em>K</em> is a superkey exactly when <em>K</em> → (every attribute). FDs imply others. From <em>A</em> → <em>B</em> and <em>B</em> → <em>C</em> follows <em>A</em> → <em>C</em>. <strong>Armstrong's axioms</strong> generate every implied FD: <em>reflexivity</em> (if <em>Y</em> ⊆ <em>X</em> then <em>X</em> → <em>Y</em>), <em>augmentation</em> (if <em>X</em> → <em>Y</em> then <em>XZ</em> → <em>YZ</em> for any <em>Z</em>, where <em>XZ</em> means <em>X</em> ∪ <em>Z</em>) and <em>transitivity</em>. An FD is <em>trivial</em> when <em>Y</em> ⊆ <em>X</em>, so it holds in every table.</p>

<h3>Attribute closure</h3>
<p>The practical tool is the <strong>closure</strong> <em>X</em><sup>+</sup> of a set of attributes: everything <em>X</em> determines. Start with <em>X</em>; whenever some FD's left side is entirely inside the set, add its right side; stop when nothing changes. Then <em>X</em> → <em>Y</em> follows from the FDs exactly when <em>Y</em> ⊆ <em>X</em><sup>+</sup>.</p>
<pre><code>def closure(attrs, fds):
    result = set(attrs)
    changed = True
    while changed:
        changed = False
        for lhs, rhs in fds:
            if lhs &lt;= result and not rhs &lt;= result:   # lhs inside, rhs not yet
                result |= rhs
                changed = True
    return result

F = [({"sid"}, {"name"}), ({"cid"}, {"title", "dept"}), ({"sid", "cid"}, {"grade"})]
print(sorted(closure({"sid"}, F)))          # ['name', 'sid']
print(sorted(closure({"sid", "cid"}, F)))   # ['cid', 'dept', 'grade', 'name', 'sid', 'title']</code></pre>
<p>(For sets, <code>&lt;=</code> is ⊆ and <code>|=</code> adds elements. The results are sorted because Python prints a set of strings in no fixed order.) {sid, cid}<sup>+</sup> is every attribute, so {sid, cid} is a superkey, and since neither {sid}<sup>+</sup> nor {cid}<sup>+</sup> is everything, it's a candidate key.</p>
<p>A worked example by hand. <em>R</em>(<em>A</em>, <em>B</em>, <em>C</em>, <em>D</em>, <em>E</em>) with <em>A</em> → <em>B</em>, <em>B</em> → <em>C</em>, <em>CD</em> → <em>E</em>. Start {<em>A</em>}; <em>A</em> → <em>B</em> adds <em>B</em>; <em>B</em> → <em>C</em> adds <em>C</em>; <em>CD</em> → <em>E</em> doesn't fire, since <em>D</em> is missing. So {<em>A</em>}<sup>+</sup> = {<em>A</em>, <em>B</em>, <em>C</em>}. Starting from {<em>A</em>, <em>D</em>}, the same steps add <em>B</em> and <em>C</em>, then <em>CD</em> → <em>E</em> fires: {<em>A</em>, <em>D</em>}<sup>+</sup> is everything.</p>
<p>To find all candidate keys, use one shortcut: an attribute that appears on no right-hand side can't be determined by anything else, so it is in <em>every</em> key. Here <em>A</em> and <em>D</em> appear on no right side, so every key contains {<em>A</em>, <em>D</em>}; since {<em>A</em>, <em>D</em>} is already a superkey, it is the only candidate key. In general, try sets in order of size, starting from the forced attributes, and skip any superset of a key already found.</p>

<h3>Normal forms</h3>
<p>A <strong>normal form</strong> is a condition on a schema that rules out a class of anomalies.</p>
<ul>
<li><strong>First normal form (1NF):</strong> every value is atomic, with no lists or repeating groups in a cell. Lesson 1's relations are in 1NF by definition.</li>
<li><strong>Boyce–Codd normal form (BCNF):</strong> for every nontrivial FD <em>X</em> → <em>Y</em> that holds, <em>X</em> is a superkey. In words: every fact the table records is a fact about a key.</li>
<li><strong>Third normal form (3NF):</strong> for every nontrivial FD <em>X</em> → <em>A</em> (a single attribute on the right), <em>X</em> is a superkey <em>or</em> <em>A</em> is <em>prime</em>, meaning part of some candidate key. 3NF is BCNF with one exception, which the street example below explains.</li>
</ul>
<p>(Second normal form, which forbids a non-prime attribute depending on part of a key, is of historical interest: 3NF implies it.) The wide table isn't in BCNF, nor even in 3NF: sid → name holds, sid isn't a superkey, and name isn't prime. To check a table in BCNF, it is enough to check the FDs you were given, as long as they are FDs on that table's own attributes: if none of them violates BCNF, no implied FD does either.</p>

<h3>BCNF decomposition</h3>
<p>To repair a table, split it. While some table <em>R</em> in the design has a violating FD <em>X</em> → <em>Y</em>:</p>
<ol>
<li>compute <em>X</em><sup>+</sup>;</li>
<li>replace <em>R</em> by <em>R</em><sub>1</sub> = <em>X</em><sup>+</sup> ∩ <em>R</em> (<em>X</em> with everything it determines) and <em>R</em><sub>2</sub> = <em>R</em> − (<em>X</em><sup>+</sup> − <em>X</em>) (everything else, plus <em>X</em> itself to connect them).</li>
</ol>
<p>On the wide table, sid → name violates BCNF. {sid}<sup>+</sup> = {sid, name}, so <em>R</em><sub>1</sub> = (sid, name) and <em>R</em><sub>2</sub> = (sid, cid, title, dept, grade). In <em>R</em><sub>2</sub>, cid → title, dept violates BCNF ({cid}<sup>+</sup> = {cid, title, dept}), giving (cid, title, dept) and (sid, cid, grade). The result is exactly the students, courses and enrolled tables of Lesson 2. Each piece states one kind of fact, and the three anomalies are gone: a course is renamed in one row, and courses exist independently of students.</p>
<p>One subtlety: to check a piece, you need the FDs that hold <em>on its attributes</em>, including implied ones. In <em>R</em>(<em>A</em>, <em>B</em>, <em>C</em>) with <em>A</em> → <em>B</em> and <em>B</em> → <em>C</em>, the piece (<em>A</em>, <em>C</em>) has no given FD, but <em>A</em> → <em>C</em> is implied and holds on it. The safe way to test a piece <em>S</em> is with closures: for each subset <em>X</em> of <em>S</em>, the attributes of <em>S</em> that <em>X</em> determines are <em>X</em><sup>+</sup> ∩ <em>S</em>; <em>S</em> violates BCNF if that set contains something beyond <em>X</em> but not all of <em>S</em>.</p>

<h3>Lossless joins</h3>
<p>A decomposition must not lose information: joining the pieces must give back exactly the original table. Splitting <em>R</em> into <em>R</em><sub>1</sub> and <em>R</em><sub>2</sub> is <strong>lossless</strong> when the shared attributes determine all of one piece: <em>R</em><sub>1</sub> ∩ <em>R</em><sub>2</sub> → <em>R</em><sub>1</sub> or <em>R</em><sub>1</sub> ∩ <em>R</em><sub>2</sub> → <em>R</em><sub>2</sub>. The BCNF step always qualifies, because the shared attributes are <em>X</em>, which determines <em>R</em><sub>1</sub>. A careless split does not:</p>
<pre><code>rows = [(1, "CS201", 90), (2, "MATH220", 90), (1, "MATH220", 80)]   # (sid, cid, grade)
by_sid = {(s, g) for s, c, g in rows}          # piece (sid, grade)
by_cid = {(c, g) for s, c, g in rows}          # piece (cid, grade)
rejoined = {(s, c, g) for s, g in by_sid for c, g2 in by_cid if g == g2}
print(len(rows), len(rejoined))                # 3 5
print(sorted(rejoined - set(rows)))            # [(1, 'MATH220', 90), (2, 'CS201', 90)]</code></pre>
<p>The pieces share only grade, which determines nothing, so the join pairs every 90 with every 90 and invents two enrollments. "Lossy" means the extra tuples destroy information: from the pieces you can no longer tell which enrollments are real.</p>
<p>The FD test is enough to prove a split lossless, but it isn't the whole story. Joining the pieces always gives back every row of <em>R</em>; the question is whether it adds rows. Let <em>X</em> = <em>R</em><sub>1</sub> ∩ <em>R</em><sub>2</sub>. The join pairs every <em>R</em><sub>1</sub> part of a row with every <em>R</em><sub>2</sub> part of a row that has the same <em>X</em> value, so it adds nothing exactly when <em>R</em> already contains all those combinations. That condition has a name. A <strong>multivalued dependency</strong> (MVD) <em>X</em> ↠ <em>Y</em> holds when, for any two rows <em>t</em> and <em>u</em> that agree on <em>X</em>, the row that takes its <em>Y</em> values from <em>t</em> and its other values from <em>u</em> is also in <em>R</em>: the set of <em>Y</em> values that go with an <em>X</em> value doesn't depend on the rest of the row. So the split is lossless if and only if <em>X</em> ↠ <em>R</em><sub>1</sub> − <em>X</em>. Every FD <em>X</em> → <em>Y</em> is an MVD (there is only one <em>Y</em> value to combine), which is why the FD test works. An MVD that isn't an FD still causes redundancy, as a practice problem below shows. <strong>Fourth normal form</strong> (4NF) is BCNF with MVDs in place of FDs: for every nontrivial MVD <em>X</em> ↠ <em>Y</em> (<em>Y</em> not inside <em>X</em>, and <em>X</em> ∪ <em>Y</em> not all of <em>R</em>), <em>X</em> is a superkey.</p>

<h3>BCNF or 3NF?</h3>
<p>BCNF can cost something. Take <code>addresses(street, city, zip)</code> with street, city → zip and zip → city. Its candidate keys are {street, city} and {street, zip}. zip → city violates BCNF, since zip alone isn't a superkey; decomposing gives (zip, city) and (street, zip). Now the rule "street, city → zip" mentions attributes in different tables, so the database can't check it without a join on every insertion. The decomposition is lossless but not <strong>dependency preserving</strong>. The original table <em>is</em> in 3NF, because city is prime. That is 3NF's purpose: every schema has a 3NF design that is both lossless and dependency preserving, while BCNF sometimes forces a choice. In practice most tables reach BCNF, and designers accept 3NF in cases like this one.</p>
<p>Real designs also break the rules deliberately. A reporting database may store each order's customer name alongside the order, <em>denormalized</em>, to avoid a join in a query that runs millions of times, accepting the update cost. That is a reasonable engineering trade-off, provided it is a choice and not an accident.</p>
<p class="note">Why it matters: a normalized schema stores each fact once, so the database cannot contradict itself, and its constraints document the rules of the world it models.</p>
`,
      terms: [
        ["Entity–relationship (ER) model", "A description of data as entity sets with attributes and keys, and relationships among them."],
        ["Entity set", "A collection of similar things, such as students, each identified by a key."],
        ["Relationship set", "An association among entities, such as Enrolls between Student and Course, possibly with its own attributes."],
        ["Cardinality (of a relationship)", "How many entities on each side may be related: one-to-one, one-to-many or many-to-many."],
        ["Weak entity", "An entity that can be identified only together with the key of an owner entity."],
        ["Anomaly", "An update, insertion or deletion problem caused by storing the same fact in several rows or mixing facts about different things."],
        ["Functional dependency (FD)", "X → Y: any two rows that agree on X agree on Y."],
        ["Armstrong's axioms", "Reflexivity, augmentation and transitivity: rules that derive every FD implied by a set of FDs."],
        ["Attribute closure", "X⁺: the set of all attributes determined by X under the given FDs."],
        ["Prime attribute", "An attribute that belongs to some candidate key."],
        ["First normal form (1NF)", "Every value is atomic."],
        ["Third normal form (3NF)", "For every nontrivial FD X → A, X is a superkey or A is prime."],
        ["Boyce–Codd normal form (BCNF)", "For every nontrivial FD X → Y, X is a superkey."],
        ["Lossless-join decomposition", "A split whose pieces join back to exactly the original relation; guaranteed when the shared attributes determine one piece, and exactly when they multidetermine the rest of one piece."],
        ["Multivalued dependency (MVD)", "X ↠ Y: the set of Y values that go with each X value is independent of the other attributes, so every combination appears."],
        ["Fourth normal form (4NF)", "For every nontrivial MVD X ↠ Y, X is a superkey."],
        ["Dependency preservation", "The property that every FD can be checked within a single table of the decomposition."],
        ["Denormalization", "Deliberately storing redundant data to speed up reads, accepting the cost of keeping copies consistent."]
      ],
      quiz: [
        { q: "How should a many-to-many relationship Enrolls(Student, Course) with attribute grade become tables?", choices: ["Add a cid column to students", "Add a sid column to courses", "A separate table enrolled(sid, cid, grade) with key (sid, cid)", "Merge students and courses"], answer: 2, why: "Neither side can hold a single foreign key, since each row relates to many on the other side." },
        { q: "With FDs A → B and B → C on R(A, B, C, D), what is {A}⁺?", choices: ["{A}", "{A, B}", "{A, B, C}", "{A, B, C, D}"], answer: 2, why: "A gives B, B gives C, and nothing gives D." },
        { q: "In the same R(A, B, C, D), what are the candidate keys?", choices: ["{A}", "{A, D}", "{D}", "{A, B, D}"], answer: 1, why: "A and D appear on no right side, so both are in every key, and {A, D}⁺ is everything." },
        { q: "A table is in BCNF when …", choices: ["it has a primary key", "every nontrivial FD's left side is a superkey", "every attribute is prime", "it has no NULLs"], answer: 1, why: "That's the definition: every fact is about a key." },
        { q: "R(A, B, C) with A → B is split into (A, B) and (A, C). Is the split lossless?", choices: ["Yes: the shared attribute A determines all of (A, B)", "No: joins always add tuples", "Only if C → A", "Only if the tables have the same size"], answer: 0, why: "R₁ ∩ R₂ = {A}, and A → B gives A → (A, B)." },
        { q: "Why might a designer accept 3NF instead of BCNF?", choices: ["3NF is always faster", "BCNF can make some FD impossible to check within one table; 3NF can always be lossless and dependency preserving", "BCNF allows anomalies", "3NF has no redundancy"], answer: 1, why: "The street, city, zip example." }
      ],
      practice: [
        {
          q: `<p>Draw (in words) an ER model for a library: members borrow copies of books; each book (identified by ISBN, with a title) has many physical copies, numbered 1, 2, 3 within the book; each loan records the date borrowed and the date returned. Then give the tables, with keys and foreign keys.</p>`,
          a: `<p>Entities: Member (member_id, name), Book (isbn, title), and Copy, a weak entity owned by Book (copy number within its ISBN). Relationship: Borrows between Member and Copy, many-to-many over time, with attributes borrowed and returned.</p><p>Tables: <code>members(member_id, name)</code>; <code>books(isbn, title)</code>; <code>copies(isbn, copy_no)</code> with key (isbn, copy_no) and isbn referencing books; <code>loans(member_id, isbn, copy_no, borrowed, returned)</code> with (isbn, copy_no) referencing copies. Because a member may borrow the same copy twice, the key must include the date: (isbn, copy_no, borrowed). <code>returned</code> is NULL while the book is out.</p>`
        },
        {
          q: `<p><em>R</em>(<em>A</em>, <em>B</em>, <em>C</em>, <em>D</em>) has FDs <em>A</em> → <em>B</em>, <em>BC</em> → <em>D</em> and <em>D</em> → <em>A</em>. Compute {<em>C</em>, <em>D</em>}<sup>+</sup> and {<em>A</em>, <em>C</em>}<sup>+</sup>, find all candidate keys, and say whether <em>R</em> is in BCNF and in 3NF.</p>`,
          a: `<p>{<em>C</em>, <em>D</em>}<sup>+</sup>: <em>D</em> → <em>A</em> adds <em>A</em>, <em>A</em> → <em>B</em> adds <em>B</em>: everything. {<em>A</em>, <em>C</em>}<sup>+</sup>: <em>A</em> → <em>B</em> adds <em>B</em>, then <em>BC</em> → <em>D</em> adds <em>D</em>: everything. <em>C</em> appears on no right side, so it's in every key, but {<em>C</em>}<sup>+</sup> = {<em>C</em>}. Of the pairs containing <em>C</em>: {<em>A</em>, <em>C</em>} and {<em>C</em>, <em>D</em>} are keys; {<em>B</em>, <em>C</em>}<sup>+</sup> = {<em>B</em>, <em>C</em>, <em>D</em>, <em>A</em>} is also a key. So the candidate keys are {<em>A</em>, <em>C</em>}, {<em>B</em>, <em>C</em>} and {<em>C</em>, <em>D</em>}.</p>
<pre><code>G = [({"A"}, {"B"}), ({"B", "C"}, {"D"}), ({"D"}, {"A"})]
for X in ({"C", "D"}, {"A", "C"}, {"B", "C"}, {"C"}):
    print(sorted(X), sorted(closure(X, G)))
# ['C', 'D'] ['A', 'B', 'C', 'D']
# ['A', 'C'] ['A', 'B', 'C', 'D']
# ['B', 'C'] ['A', 'B', 'C', 'D']
# ['C'] ['C']</code></pre><p>Not BCNF: <em>A</em> → <em>B</em> has a left side that isn't a superkey (so does <em>D</em> → <em>A</em>). But every attribute is prime (each is in some key), so every FD satisfies 3NF's exception: <em>R</em> is in 3NF.</p>`
        },
        {
          q: `<p>Decompose <code>orders(order_id, customer_id, customer_name, product_id, product_name, quantity)</code> into BCNF, given order_id → customer_id; customer_id → customer_name; product_id → product_name; order_id, product_id → quantity. Show each step and check that each split is lossless.</p>`,
          a: `<p>The only candidate key is {order_id, product_id}. Step 1: order_id → customer_id violates BCNF; {order_id}<sup>+</sup> = {order_id, customer_id, customer_name}, so split into (order_id, customer_id, customer_name) and (order_id, product_id, product_name, quantity). Shared {order_id} determines the first piece: lossless. Step 2: in the first piece customer_id → customer_name violates BCNF (customer_id isn't a key there): split into (customer_id, customer_name) and (order_id, customer_id); shared customer_id determines the first. Step 3: in the second piece product_id → product_name violates BCNF: split into (product_id, product_name) and (order_id, product_id, quantity). Result: customers(customer_id, customer_name), orders(order_id, customer_id), products(product_id, product_name), order_lines(order_id, product_id, quantity), each with its left-hand side as key.</p>`
        },
        {
          q: `<p>A table <code>teaches(course, teacher, textbook)</code> records that a course uses a set of textbooks and is taught by a set of teachers, independently: every teacher of a course uses every textbook of that course. There are no nontrivial FDs, so it's in BCNF. Show with an example that it still contains redundancy, suggest a better design, and show that your split is lossless.</p>`,
          a: `<p>If CS340 has teachers Kim and Lee and textbooks X and Y, the table needs all four combinations: (CS340, Kim, X), (CS340, Kim, Y), (CS340, Lee, X), (CS340, Lee, Y). Adding a third textbook requires two new rows, one per teacher, and forgetting one breaks the "every combination" rule: an update anomaly with no FD to blame. Split into <code>course_teacher(course, teacher)</code> and <code>course_book(course, textbook)</code>; the join gives back exactly the combinations. The FD test can't show this, since course determines neither teacher nor textbook. But the rule "every teacher of a course uses every textbook of that course" is the MVD course ↠ teacher, and the pieces share {course}, so the split is lossless by the MVD test. teaches is not in 4NF (course ↠ teacher is nontrivial and course isn't a superkey); each piece is, since its only MVDs are trivial.</p><pre><code>teach_rows = {("CS340", t, b) for t in ("Kim", "Lee") for b in ("X", "Y")}
ct = {(c, t) for c, t, b in teach_rows}
cb = {(c, b) for c, t, b in teach_rows}
print({(c, t, b) for c, t in ct for c2, b in cb if c == c2} == teach_rows)   # True</code></pre>`
        }
      ],
      sources: ["chen76", "dbsc", "cmu15445", "codd70"]
    },
    {
      id: "db5",
      title: "Storage and indexing",
      minutes: 90,
      summary: "How a database lays data out on disk: pages, slotted pages and record ids, heap files, and the cost model that counts page reads. Then indexes: B+ trees (search, insertion with splits, and why a high fanout makes them shallow), hash indexes, clustered and unclustered indexes, composite and covering indexes, and SQLite's EXPLAIN QUERY PLAN to see an index being used.",
      notes: `
<p>Lessons 1–4 treated tables as abstract sets of rows. This lesson looks underneath: how rows are stored, and how an <strong>index</strong> finds a few rows among millions without reading them all. The data structures are close relatives of CS 201's, adapted to one fact about storage.</p>

<h3>Pages and the I/O cost model</h3>
<p>CS 210 Lesson 7's memory hierarchy put an SSD read at about 100 µs and a hard-disk read at 5–10 ms, against about 100 ns for main memory: a thousand to a hundred thousand times slower. Storage is also read in blocks, never single bytes. So a database stores everything in fixed-size <strong>pages</strong> (4,096 bytes in SQLite by default, 8 KB in PostgreSQL) and moves whole pages between disk and a <strong>buffer pool</strong> of pages cached in memory. Because a page read costs far more than the work done on the page once it is in memory, the standard way to compare methods is to count <strong>page I/Os</strong>, the number of pages read or written, and ignore the rest. This lesson and the next use that cost model.</p>
<p class="note">Three kinds of page. CS 310, which you are taking in parallel, also uses the word, for two other things. A <em>database page</em> is the unit the database itself reads, caches and lays records out in; the database chooses its size (SQLite allows any power of two from 512 bytes to 64 KB). An <em>OS page</em> (CS 310 Lesson 6) is the 4 KB unit of memory management, and the OS caches file data in RAM in these units, its page cache (CS 310 Lesson 7). A <em>flash page</em> (CS 310 Lesson 8) is the unit an SSD reads and writes internally, hidden behind its flash translation layer. The three are independent, but databases choose page sizes that are multiples of 4 KB and keep pages aligned in the file, so that one database page is a whole number of OS pages and of the drive's 4 KB logical blocks, never a part of one, which would make the layers below read or rewrite more than was asked. A database page read is a request to the OS; it may be answered from the OS page cache without touching the drive. The cost model still counts database pages, because that is the unit the database's algorithms control.</p>

<h3>Records in pages</h3>
<p>A row is stored as a <strong>record</strong>: its field values laid out as bytes. Since text fields vary in length, most systems use a <strong>slotted page</strong>. A small header at the start of the page holds the number of slots and where the free space begins; an array of <em>slots</em>, each giving the offset and length of one record, grows forward from the header; and records are placed from the end of the page backward. The free space is in the middle.</p>
<figure class="fig"><svg viewBox="0 0 560 120" role="img" aria-label="A slotted page: header and slot array at the left, free space in the middle, records packed from the right end; each slot points to its record.">
<defs><marker id="arr-slot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<rect class="box" x="20" y="40" width="520" height="50"/>
<rect class="soft" x="20" y="40" width="60" height="50"/>
<g class="box"><rect x="80" y="40" width="30" height="50"/><rect x="110" y="40" width="30" height="50"/><rect x="140" y="40" width="30" height="50"/></g>
<g class="warm"><rect x="330" y="40" width="70" height="50"/><rect x="400" y="40" width="50" height="50"/><rect x="450" y="40" width="90" height="50"/></g>
<g class="ln"><path d="M95,40 C95,10 495,10 495,38" marker-end="url(#arr-slot)"/><path d="M125,40 C125,18 425,18 425,38" marker-end="url(#arr-slot)"/><path d="M155,40 C155,26 365,26 365,38" marker-end="url(#arr-slot)"/></g>
<g class="text"><text x="50" y="70" text-anchor="middle" class="m">header</text><text x="95" y="70" text-anchor="middle">0</text><text x="125" y="70" text-anchor="middle">1</text><text x="155" y="70" text-anchor="middle">2</text>
<text x="250" y="70" text-anchor="middle" class="m">free space</text><text x="495" y="70" text-anchor="middle">record 0</text><text x="425" y="70" text-anchor="middle">rec 1</text><text x="365" y="70" text-anchor="middle">record 2</text>
<text x="125" y="108" text-anchor="middle" class="m">slot array grows →</text><text x="435" y="108" text-anchor="middle" class="m">← records grow</text></g>
</svg><figcaption>A slotted page. A record is named by (page number, slot number); the record can move within the page as long as its slot is updated.</figcaption></figure>
<p>A record is identified by its <strong>record id</strong> (rid): the page number and slot number. Indexes store rids. The indirection through the slot lets the page compact itself after deletions, moving records without changing their rids.</p>
<p>The simplest table layout is a <strong>heap file</strong>: pages of records in no particular order. With <em>B</em> pages, inserting costs about 2 I/Os (read the last page, write it back), but finding the row with a given key means scanning: <em>B</em>/2 pages on average if the key is unique, all <em>B</em> otherwise. A file sorted on the key allows binary search, about log<sub>2</sub> <em>B</em> I/Os, but each insertion must shift records over about half the file. Neither is good at both. Indexes are.</p>

<h3>B+ trees</h3>
<p>CS 201 Lesson 4 noted that databases use B-trees: search trees with many keys per node, so each level costs one page read. The variant almost every database uses is the <strong>B+ tree</strong>:</p>
<ul>
<li>Each node is one page. An <em>internal node</em> holds up to <em>m</em> keys <em>k</em><sub>1</sub> &lt; ⋯ &lt; <em>k</em><sub><em>n</em></sub> and <em>n</em> + 1 child pointers; the subtree left of <em>k</em><sub><em>i</em></sub> holds keys less than <em>k</em><sub><em>i</em></sub>, and the subtree right of it keys greater than or equal to it.</li>
<li>All the data entries are in the <em>leaves</em>: each leaf holds keys with their records or rids. Internal keys are only signposts, and a key may appear both in a leaf and as a signpost above it.</li>
<li>Each leaf points to the next, so after finding the start of a range the tree reads leaves left to right.</li>
<li>All leaves are at the same depth, and every node except the root is kept at least about half full.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 600 200" role="img" aria-label="A B+ tree with root 65, internal nodes 25|45 and 85, and five leaves 5 15, 25 35, 45 55, 65 75, 85 95 linked left to right.">
<defs><marker id="arr-bpt" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<g class="ln"><line x1="277" y1="45" x2="145" y2="80"/><line x1="277" y1="45" x2="410" y2="80"/>
<line x1="115" y1="110" x2="55" y2="150"/><line x1="145" y1="110" x2="145" y2="150"/><line x1="175" y1="110" x2="235" y2="150"/>
<line x1="395" y1="110" x2="365" y2="150"/><line x1="425" y1="110" x2="455" y2="150"/></g>
<g class="soft"><rect x="252" y="15" width="50" height="30"/><rect x="105" y="80" width="80" height="30"/><rect x="385" y="80" width="50" height="30"/></g>
<g class="box"><rect x="20" y="150" width="70" height="30"/><rect x="110" y="150" width="70" height="30"/><rect x="200" y="150" width="70" height="30"/><rect x="330" y="150" width="70" height="30"/><rect x="420" y="150" width="70" height="30"/></g>
<g class="ln"><line x1="145" y1="80" x2="145" y2="110"/><line x1="55" y1="150" x2="55" y2="180"/><line x1="145" y1="150" x2="145" y2="180"/><line x1="235" y1="150" x2="235" y2="180"/><line x1="365" y1="150" x2="365" y2="180"/><line x1="455" y1="150" x2="455" y2="180"/></g>
<g class="ln dash"><line x1="90" y1="165" x2="108" y2="165" marker-end="url(#arr-bpt)"/><line x1="180" y1="165" x2="198" y2="165" marker-end="url(#arr-bpt)"/><line x1="270" y1="165" x2="328" y2="165" marker-end="url(#arr-bpt)"/><line x1="400" y1="165" x2="418" y2="165" marker-end="url(#arr-bpt)"/></g>
<g class="text"><text x="277" y="35" text-anchor="middle">65</text><text x="125" y="100" text-anchor="middle">25</text><text x="165" y="100" text-anchor="middle">45</text><text x="410" y="100" text-anchor="middle">85</text>
<text x="37" y="170" text-anchor="middle">5</text><text x="72" y="170" text-anchor="middle">15</text><text x="127" y="170" text-anchor="middle">25</text><text x="162" y="170" text-anchor="middle">35</text><text x="217" y="170" text-anchor="middle">45</text><text x="252" y="170" text-anchor="middle">55</text>
<text x="347" y="170" text-anchor="middle">65</text><text x="382" y="170" text-anchor="middle">75</text><text x="437" y="170" text-anchor="middle">85</text><text x="472" y="170" text-anchor="middle">95</text>
<text x="500" y="35" class="m">internal nodes:</text><text x="500" y="50" class="m">signposts</text><text x="500" y="170" class="m">leaves</text></g>
</svg><figcaption>The B+ tree built by inserting 5, 15, …, 95 with at most three keys per node (the example below). Keys equal to a signpost go to its right.</figcaption></figure>
<p><strong>Search</strong> for key <em>x</em>: at each internal node, follow the child just right of the last key ≤ <em>x</em> (the first child if there is none); at the leaf, look for <em>x</em>. Python's <code>bisect.bisect_right(keys, x)</code> returns exactly that child's position: the number of keys ≤ <em>x</em>.</p>
<pre><code>import bisect

class Node:
    def __init__(self, keys, children=None, values=None):
        self.keys = keys
        self.children = children     # internal node: len(keys) + 1 children
        self.values = values         # leaf: one value per key
        self.next = None             # leaf: the next leaf to the right

def search(node, x):
    reads = 1
    while node.children is not None:
        node = node.children[bisect.bisect_right(node.keys, x)]
        reads += 1
    i = bisect.bisect_left(node.keys, x)
    found = i &lt; len(node.keys) and node.keys[i] == x
    return (node.values[i] if found else None), reads

leaves = [Node([5, 15], values=["a", "b"]), Node([25, 35], values=["c", "d"]),
          Node([45, 55], values=["e", "f"]), Node([65, 75], values=["g", "h"]),
          Node([85, 95], values=["i", "j"])]
for left, right in zip(leaves, leaves[1:]):
    left.next = right
root = Node([65], children=[Node([25, 45], children=leaves[:3]),
                            Node([85], children=leaves[3:])])
print(search(root, 45), search(root, 50), search(root, 95))   # ('e', 3) (None, 3) ('j', 3)</code></pre>
<p>Every search reads one page per level: 3 here. <code>bisect_left</code> finds where <em>x</em> is or would be in the leaf.</p>
<p><strong>Insertion</strong> finds the leaf where the key belongs and adds it in order. If the leaf now has more than <em>m</em> keys, it <strong>splits</strong>: the first half stays, the second half moves to a new leaf, and the new leaf's first key is <em>copied up</em> into the parent as a signpost, with a pointer to the new leaf. If that makes the parent overflow, it splits too, but an internal split <em>moves</em> its middle key up rather than copying it (signposts are needed only once). If the root splits, a new root is created above it. That is the only way the tree grows taller, so all leaves stay at the same depth. Building the figure's tree with <em>m</em> = 3 shows each case:</p>
<ul>
<li>Insert 5, 15, 25: one leaf, which is also the root.</li>
<li>Insert 35: the leaf would hold 5, 15, 25, 35, so it splits into [5, 15] and [25, 35], and 25 is copied up into a new root [25].</li>
<li>Insert 45, then 55: the right leaf overflows as [25, 35, 45, 55], splits into [25, 35] and [45, 55], and 45 is copied up: root [25, 45]. Likewise 65 and 75 give root [25, 45, 65].</li>
<li>Insert 85, then 95: the last leaf splits into [65, 75] and [85, 95] and 85 is copied up. Now the root would hold 25, 45, 65, 85, so it splits: [25, 45] and [85], with 65 moved up into a new root. The tree is now three levels tall.</li>
</ul>
<p>Each insertion reads one path and writes at most a few pages per level, so it costs O(height) I/Os. Deletion is the reverse (when a node falls below half full, borrow from a neighbor or merge with it), and many real systems simply allow nodes to become emptier.</p>

<h3>Why B+ trees are shallow</h3>
<p>The number of children per node, the <strong>fanout</strong>, is what makes B+ trees good on disk. A 4,096-byte page holding 8-byte keys and 8-byte page pointers fits 4,096 / 16 = 256 entries. Nodes are typically about two-thirds full, so take a fanout of about 170. Then:</p>
<table>
<tr><th>Levels</th><th>Keys reachable (170<sup>levels</sup>)</th></tr>
<tr><td>2</td><td>28,900</td></tr>
<tr><td>3</td><td>4,913,000</td></tr>
<tr><td>4</td><td>835,210,000</td></tr>
</table>
<p>Four page reads find any of over 800 million keys. A balanced binary tree, such as CS 201's AVL trees, has at least 30 levels for a billion keys (2<sup>30</sup> ≈ 1.07 billion), and each level would be a separate page read. Better still, the root and the second level are only 1 + 170 pages, about 700 KB, which stay in the buffer pool, so a lookup typically costs one or two actual disk reads. The height grows as log<sub>170</sub> <em>n</em>, so it changes only when the data grows by a factor of 170.</p>

<h3>Hash indexes</h3>
<p>A <strong>hash index</strong> applies CS 201 Lesson 3's hashing to pages: a hash of the key picks one of <em>N</em> buckets, each a page (plus overflow pages if it fills). An equality lookup costs about one or two I/Os, slightly better than a B+ tree, but a hash index can't answer range queries (<code>age BETWEEN 30 AND 40</code>) or produce sorted output, because hashing scatters neighboring keys. Variants such as extendible and linear hashing grow the number of buckets gradually instead of rehashing everything at once. Most databases offer hash indexes, but B+ trees are the default, because they handle both kinds of query.</p>

<h3>Clustered and unclustered indexes</h3>
<p>An index is <strong>clustered</strong> if the table's rows are stored in (roughly) the order of the index key, and <strong>unclustered</strong> otherwise. A table can be clustered on at most one key, but can have many unclustered indexes. The difference matters for range queries. Take a table of 1,000,000 rows, 100 per page (10,000 pages), and a query matching 1% of them, 10,000 rows:</p>
<ul>
<li><strong>Clustered:</strong> descend the tree (about 3 I/Os), then read the matching rows, which are packed together in 10,000 / 100 = 100 pages: about 103 I/Os.</li>
<li><strong>Unclustered:</strong> descend the tree, read the matching index leaves (10,000 rids at about 170 per leaf, 59 leaves), then fetch each row, which may be on a different page each time: up to 3 + 59 + 10,000 = 10,062 I/Os. That is <em>worse</em> than scanning the whole table (10,000 I/Os).</li>
</ul>
<p>So an unclustered index is excellent for finding a few rows and can be worse than useless for many. Deciding between them needs an estimate of how many rows match, which is Lesson 6's subject.</p>

<h3>Indexes in SQLite</h3>
<p>SQLite stores each table as a tree keyed by a hidden integer <code>rowid</code>, so every table is clustered on its rowid. A column declared <code>INTEGER PRIMARY KEY</code> becomes that rowid. Each index created with <code>CREATE INDEX</code> is a separate tree whose entries are (indexed columns, rowid). SQLite's documentation calls both "b-trees", but they are of two different kinds. A <em>table b-tree</em> is of the B+ kind: its interior pages hold only rowids as signposts and child page numbers, and all rows sit in the leaves. (Unlike the textbook B+ tree, its leaves aren't linked; a scan steps from leaf to leaf through their parents.) An <em>index b-tree</em> is a B-tree of the original kind, which CS 201 only named: each entry is stored once, in an interior page or a leaf, with no copies as signposts. <code>EXPLAIN QUERY PLAN</code> before a query shows how SQLite will run it: <code>SCAN</code> means reading the whole table, <code>SEARCH</code> means using an index or the rowid to go straight to the matching rows.</p>
<pre><code>import sqlite3, random

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE people (id INTEGER PRIMARY KEY, name TEXT, city TEXT, age INTEGER)")
random.seed(1)
cities = ["Austin", "Boston", "Chicago", "Denver", "Eugene"]
db.executemany("INSERT INTO people (name, city, age) VALUES (?, ?, ?)",
               [("p" + str(i), random.choice(cities), random.randint(18, 90))
                for i in range(100000)])

def plan(sql):
    return [row[3] for row in db.execute("EXPLAIN QUERY PLAN " + sql)]

print(plan("SELECT * FROM people WHERE age = 30"))   # ['SCAN people']
db.execute("CREATE INDEX idx_age ON people(age)")
print(plan("SELECT * FROM people WHERE age = 30"))   # ['SEARCH people USING INDEX idx_age (age=?)']
print(plan("SELECT * FROM people WHERE id = 42"))    # ['SEARCH people USING INTEGER PRIMARY KEY (rowid=?)']
print(plan("SELECT age FROM people WHERE age BETWEEN 30 AND 40"))
# ['SEARCH people USING COVERING INDEX idx_age (age&gt;? AND age&lt;?)']
print(db.execute("SELECT min(age), max(age) FROM people WHERE age BETWEEN 30 AND 40").fetchone())   # (30, 40)</code></pre>
<p>(Each row of <code>EXPLAIN QUERY PLAN</code> output is a tuple whose fourth field is the description. The exact wording varies a little between SQLite versions.) The <code>age&gt;? AND age&lt;?</code> in the BETWEEN plan only says that the search is bounded below and above; the text does not show whether the bounds are inclusive. BETWEEN still means 30 ≤ age ≤ 40, and the last line confirms that ages 30 and 40 are found. The last query needs only <code>age</code>, which the index itself contains, so SQLite never touches the table: a <strong>covering index</strong>. On a test machine, looking up one person by name among the 100,000 was several hundred times faster with an index on <code>name</code> than without, both natively and in the browser.</p>
<p>An index on several columns, such as <code>CREATE INDEX idx_city_age ON people(city, age)</code>, sorts entries by city, then by age within each city, like names in a phone book sorted by surname and then first name. It helps queries that constrain a <em>leftmost prefix</em> of its columns:</p>
<pre><code>db.execute("CREATE INDEX idx_city_age ON people(city, age)")
db.execute("DROP INDEX idx_age")
print(plan("SELECT * FROM people WHERE city = 'Boston' AND age = 30"))
# ['SEARCH people USING INDEX idx_city_age (city=? AND age=?)']
print(plan("SELECT * FROM people WHERE age = 30"))    # ['SCAN people']</code></pre>
<p>Ages are scattered across the five city sections, so the index can't jump to age 30 alone, just as a phone book can't find every "Maria" quickly. A condition on a computed value, such as <code>WHERE age + 0 = 30</code>, also can't use an index on <code>age</code>.</p>
<p>An index also saves sorting. Within the Boston section of <code>idx_city_age</code>, entries are already in age order, so <code>ORDER BY age</code> costs nothing extra. When no index supplies the order, SQLite sorts the result itself, building a temporary B-tree of the output rows, and the plan says so with a <code>USE TEMP B-TREE FOR ORDER BY</code> line:</p>
<pre><code>print(plan("SELECT name FROM people WHERE city = 'Boston' ORDER BY age"))
# ['SEARCH people USING INDEX idx_city_age (city=?)']
print(plan("SELECT name FROM people WHERE city = 'Boston' ORDER BY name"))
# ['SEARCH people USING INDEX idx_city_age (city=?)', 'USE TEMP B-TREE FOR ORDER BY']
print(plan("SELECT * FROM people ORDER BY age"))
# ['SCAN people', 'USE TEMP B-TREE FOR ORDER BY']</code></pre>
<p>The last query has no condition on <code>city</code>, the index's leftmost column, so the index's order doesn't help, and every row is read and then sorted.</p>
<p>Indexes aren't free. Every insertion, deletion and update of an indexed column must also update each index, and each index takes space. Index the columns that queries actually search, join or sort on, and check with <code>EXPLAIN QUERY PLAN</code> that the index is used.</p>
<p class="note">Why it matters: the difference between a scan and an index lookup is the difference between a page that loads in milliseconds and one that times out once the table grows. Choosing indexes is the most common performance work a developer does with a database.</p>
`,
      terms: [
        ["Page", "A fixed-size block (for example 4 KB) that is the unit of transfer between disk and memory."],
        ["Buffer pool", "The pages a database keeps cached in memory."],
        ["Page I/O", "One page read from or written to disk; the unit of cost in database algorithms."],
        ["Slotted page", "A page layout with a slot array pointing to variable-length records stored from the end of the page."],
        ["Record id (rid)", "A record's address: its page number and slot number."],
        ["Heap file", "A table stored as pages of records in no particular order."],
        ["Index", "A data structure that finds the rows with given key values without scanning the table."],
        ["B+ tree", "A balanced search tree whose nodes are pages, with all data entries in linked leaves and keys in internal nodes as signposts."],
        ["Fanout", "The number of children of an internal node; high fanout makes a tree shallow."],
        ["Node split", "Dividing an overflowing node into two and adding a separator key to its parent."],
        ["Hash index", "An index that hashes the key to a bucket page; fast for equality, useless for ranges."],
        ["Clustered index", "An index whose key order matches the order in which the table's rows are stored."],
        ["Unclustered index", "An index whose entries point to rows stored in a different order, so each match may need its own page read."],
        ["Covering index", "An index that contains every column a query needs, so the table itself needn't be read."],
        ["Composite index", "An index on several columns, sorted by the first, then the second, and so on; it helps queries on a leftmost prefix."],
        ["EXPLAIN QUERY PLAN", "SQLite's command that describes how a query will be executed, such as SCAN or SEARCH using an index."]
      ],
      quiz: [
        { q: "Why does a database count page I/Os rather than CPU operations?", choices: ["CPUs are slow", "Reading a page from storage costs far more than processing it in memory", "Pages are always in memory", "It's easier to count"], answer: 1, why: "Storage is a thousand or more times slower than memory, so page reads dominate." },
        { q: "A B+ tree has fanout 200. Roughly how many levels does it need for 8 million keys?", choices: ["2", "3", "8", "23"], answer: 1, why: "200² = 40,000 and 200³ = 8,000,000." },
        { q: "With at most 3 keys per node, the leaf [10, 20, 30] receives 25. What happens?", choices: ["It becomes [10, 20, 25, 30]", "It splits into [10, 20] and [25, 30], and 25 is copied into the parent", "25 is moved to the parent and removed from the leaf", "The tree is rebuilt"], answer: 1, why: "Leaf splits copy the new leaf's first key up; the key stays in the leaf." },
        { q: "Which query can a hash index on age answer efficiently?", choices: ["WHERE age = 30", "WHERE age BETWEEN 30 AND 40", "ORDER BY age", "WHERE age > 30"], answer: 0, why: "Hashing scatters neighboring keys, so only equality lookups are fast." },
        { q: "A query matches half the rows of a large table. An unclustered index on the condition's column exists. What's likely best?", choices: ["Use the index", "Scan the table", "Build a hash index", "Sort the table first"], answer: 1, why: "The index would cost about one page read per matching row, far more than reading every page once." },
        { q: "There is an index on (city, age). Which condition can use it to search?", choices: ["age = 30", "city = 'Boston'", "age > 30", "name = 'p7'"], answer: 1, why: "Only a leftmost prefix of the index's columns (city, or city and age) can be searched." }
      ],
      practice: [
        {
          q: `<p>Insert 8, 3, 12, 5, 1, 9, 10 in that order into an empty B+ tree with at most 3 keys per node. Draw the tree after each split. Then list the nodes read to search for 10.</p>`,
          hint: `<p>The first split happens when 5 arrives. A leaf of four keys keeps its first two keys and gives the last two to a new leaf.</p>`,
          a: `<p>8, 3, 12 make the leaf [3, 8, 12]. Inserting 5 gives [3, 5, 8, 12], which splits into [3, 5] and [8, 12] with 8 copied up: root [8]. 1 goes to the left leaf: [1, 3, 5]. 9 goes right: [8, 9, 12]. 10 goes right: [8, 9, 10, 12] splits into [8, 9] and [10, 12], 10 copied up: root [8, 10], leaves [1, 3, 5], [8, 9], [10, 12]. Searching for 10: the root (10 ≥ 10, so follow the third child), then the leaf [10, 12]: two nodes.</p>`
        },
        {
          q: `<p>A table has 2,000,000 rows of 200 bytes on 4 KB pages (about 20 rows per page). Estimate the I/O cost of <code>WHERE id = 777</code> (a) with no index, as a heap file, and (b) with a B+ tree index on <code>id</code> of fanout 200 whose root is cached. Then estimate a range query matching 5,000 rows (c) with the index clustered and (d) unclustered.</p>`,
          a: `<p>The table has 2,000,000 / 20 = 100,000 pages. (a) A unique key is found after scanning half the file on average: about 50,000 I/Os (100,000 if it's absent). (b) 200² = 40,000 &lt; 2,000,000 ≤ 200³ = 8,000,000, so the tree has 3 levels; with the root cached, 2 more index pages plus 1 data page: 3 I/Os. (c) Clustered: about 2 index pages, then 5,000 / 20 = 250 data pages: about 252. (d) Unclustered: about 2, plus the leaves holding 5,000 entries (5,000 / 200 = 25 leaves), plus up to 5,000 data pages: about 5,027. Still far better than the 100,000-page scan, since only 0.25% of the rows match.</p>`
        },
        {
          q: `<p>For each query on <code>people(id, name, city, age)</code>, say which single index would help most, and whether it could be covering: (a) <code>SELECT name FROM people WHERE city = 'Denver' ORDER BY age</code>; (b) <code>SELECT COUNT(*) FROM people WHERE age &gt; 80</code>; (c) <code>SELECT * FROM people WHERE name LIKE '%son'</code>.</p>`,
          a: `<p>(a) An index on (city, age): it finds Denver's entries, already in age order, so no sort is needed. An index on (city, age, name) would be covering. (b) An index on age, which is covering, since the count needs nothing else: SQLite reads only the index entries with age &gt; 80. (c) None: a pattern starting with <code>%</code> could match anywhere in the sorted order, so the query must scan.</p>
<pre><code>db.execute("CREATE INDEX idx_city_age_name ON people(city, age, name)")
print(plan("SELECT name FROM people WHERE city = 'Denver' ORDER BY age"))
# ['SEARCH people USING COVERING INDEX idx_city_age_name (city=?)']</code></pre>`
        },
        {
          q: `<p>A slotted 4,096-byte page has an 8-byte header, and each slot takes 4 bytes. How many 100-byte records fit? If every other record is deleted, why can the page take new records without changing any existing record's rid?</p>`,
          a: `<p>Each record needs 100 bytes plus a 4-byte slot: (4,096 − 8) / 104 = 39.3, so 39 records. After deletions, the page can compact: move the remaining records together at the end and update their slots' offsets. A rid names the slot, not the byte offset, so it doesn't change; deleted slots are marked empty and can be reused for new records.</p>`
        }
      ],
      sources: ["dbsc", "cmu15445", "sqlitedocs", "redbook"]
    },
    {
      id: "db6",
      title: "Query processing and optimization",
      minutes: 90,
      summary: "How a database turns a SQL query into a plan and runs it: the iterator model, the I/O cost of selection, projection and external sorting, the join algorithms (nested loop, block nested loop, index nested loop, sort-merge and hash join) with their cost formulas, and how a cost-based optimizer estimates selectivity and chooses a join order.",
      notes: `
<p>A SQL query says what to compute; the database must decide how. Lesson 2 noted that a query is defined by a product followed by a selection, and that no database actually runs it that way. Between the two lies the <strong>query optimizer</strong>, which considers many equivalent ways to compute the answer and picks the one it estimates is cheapest. The choice matters enormously: for the same join, this lesson finds plans whose costs differ by a factor of ten thousand.</p>

<h3>Plans and the iterator model</h3>
<p>The database first <em>parses</em> the query and translates it into relational algebra (Lesson 1). A <strong>query plan</strong> is a tree of physical operators, each an algorithm for one algebra operator: "scan this table", "look up this index", "hash join these two inputs". Most databases run a plan with the <strong>iterator model</strong>: each operator produces its output one row at a time, on request, pulling rows from its children as it needs them. That is exactly a Python generator (CS 102):</p>
<pre><code>def scan(table):
    for row in table:
        yield row

def select(rows, pred):
    for row in rows:
        if pred(row):
            yield row

def project(rows, cols):
    for row in rows:
        yield tuple(row[c] for c in cols)

def limit(rows, n):                       # n &gt;= 1
    for i, row in enumerate(rows):
        yield row
        if i + 1 == n:
            return                            # stop before asking for another row

table = [(i, "p" + str(i), 18 + i % 73) for i in range(1_000_000)]   # (id, name, age)
looked_at = []
plan = limit(project(select(scan(table), lambda r: looked_at.append(r) or r[2] == 30),
                     [1]), 3)
print(list(plan), len(looked_at))   # [('p12',), ('p85',), ('p158',)] 159</code></pre>
<p>(The condition records each row it examines, then tests the age; <code>append</code> returns <code>None</code>, so <code>or</code> moves on to the test.) Rows flow up the tree one at a time, called <em>pipelining</em>: no operator stores its whole output, and because <code>limit</code> stops asking after three rows, only 159 of the million rows are ever looked at. Some operators are <em>blocking</em>: a sort can't output its first row until it has seen every input row, and a hash join must read one whole input before producing anything.</p>

<h3>The cost of selection</h3>
<p>Write <em>B</em>(<em>R</em>) for the number of pages of a table <em>R</em>, <em>T</em>(<em>R</em>) for its number of rows, and <em>M</em> for the number of pages of memory (buffer pool) an operator may use. Lesson 5 gives the cost of σ<sub><em>condition</em></sub>(<em>R</em>), in page I/Os:</p>
<table>
<tr><th>Access method</th><th>Cost</th></tr>
<tr><td>Scan a heap file</td><td><em>B</em>(<em>R</em>)</td></tr>
<tr><td>Binary search a sorted file</td><td>log<sub>2</sub> <em>B</em>(<em>R</em>) + pages of matching rows</td></tr>
<tr><td>Clustered B+ tree of height <em>h</em></td><td><em>h</em> + pages of matching rows</td></tr>
<tr><td>Unclustered B+ tree</td><td><em>h</em> + matching leaves + one I/O per matching row</td></tr>
<tr><td>Hash index (equality only)</td><td>about 1–2 + one I/O per matching row (unclustered)</td></tr>
</table>
<p>Each cost depends on how many rows match, so the optimizer needs an estimate of that before running the query (below). <strong>Projection</strong> is cheap unless duplicates must be removed (<code>DISTINCT</code>), which needs a sort or a hash table, like a join.</p>

<h3>External sorting</h3>
<p>Sorting is needed for <code>ORDER BY</code>, <code>DISTINCT</code>, grouping and one join algorithm, often on tables far larger than memory. <strong>External merge sort</strong> works in passes. Pass 0 reads <em>M</em> pages at a time, sorts them in memory and writes them out as a sorted <em>run</em>, giving ⌈<em>B</em> / <em>M</em>⌉ runs. Each later pass merges <em>M</em> − 1 runs at a time into one (one input page per run, one output page), as in merge sort's merge step. Every pass reads and writes every page, so:</p>
<p class="math">cost = 2<em>B</em> × (1 + ⌈log<sub><em>M</em>−1</sub> ⌈<em>B</em> / <em>M</em>⌉⌉)</p>
<p>With <em>B</em> = 1,000 and <em>M</em> = 102: pass 0 makes 10 runs, and one merge pass (101 runs could be merged at once) finishes: 2 passes, 4,000 I/Os. Even a terabyte sorts in two or three passes with a few gigabytes of memory.</p>

<h3>Join algorithms</h3>
<p>The join is the expensive operator, and there are several algorithms for <em>R</em> ⋈ <em>S</em> on an equality condition. Here they are with an example: <em>R</em> has 100,000 rows on 1,000 pages, <em>S</em> has 40,000 rows on 500 pages, and <em>M</em> = 102 pages of memory. The result is written out the same way by every algorithm, so its cost is left out.</p>
<ul>
<li><strong>Nested loop join</strong>: for each row of <em>R</em> (the <em>outer</em> input), scan all of <em>S</em> (the <em>inner</em>). Cost <em>B</em>(<em>R</em>) + <em>T</em>(<em>R</em>) · <em>B</em>(<em>S</em>). Doing it a page at a time instead (for each page of <em>R</em>, scan <em>S</em> and match every pair from the two pages) costs <em>B</em>(<em>R</em>) + <em>B</em>(<em>R</em>) · <em>B</em>(<em>S</em>).</li>
<li><strong>Block nested loop join</strong>: read <em>M</em> − 2 pages of <em>R</em> at a time into memory (keeping one page for reading <em>S</em> and one for output), then scan <em>S</em> once for the whole block. Cost <em>B</em>(<em>R</em>) + ⌈<em>B</em>(<em>R</em>) / (<em>M</em> − 2)⌉ · <em>B</em>(<em>S</em>). Put the smaller table outside.</li>
<li><strong>Index nested loop join</strong>: if <em>S</em> has an index on the join column, look up each <em>R</em> row's matches. Cost <em>B</em>(<em>R</em>) + <em>T</em>(<em>R</em>) · <em>c</em>, where <em>c</em> is the cost of one lookup (a few I/Os). Excellent when <em>R</em> is small, for example after a selective filter.</li>
<li><strong>Sort-merge join</strong>: sort both inputs on the join column, then scan them together, as in merging two sorted lists, matching equal keys. Cost: the two sorts plus <em>B</em>(<em>R</em>) + <em>B</em>(<em>S</em>) for the merge. A run of equal keys on both sides must be paired up, all with all. Free if the inputs are already sorted, and the output is sorted too.</li>
<li><strong>Hash join</strong>: if the smaller input <em>S</em> fits in memory, build a hash table on it, then scan <em>R</em> and probe the table with each row: cost <em>B</em>(<em>R</em>) + <em>B</em>(<em>S</em>). If not, the <em>Grace</em> hash join first partitions both inputs by a hash of the join column into <em>M</em> − 1 pieces written to disk, so that matching rows land in matching pieces, then joins each pair of pieces in memory: cost about 3(<em>B</em>(<em>R</em>) + <em>B</em>(<em>S</em>)), because partitioning reads every page of both inputs once and writes it once (2(<em>B</em>(<em>R</em>) + <em>B</em>(<em>S</em>))), and the join phase reads every piece once more (<em>B</em>(<em>R</em>) + <em>B</em>(<em>S</em>)). It works when each piece of <em>S</em> fits in memory. If the hash spreads rows evenly, each of the <em>M</em> − 1 pieces of <em>S</em> has about <em>B</em>(<em>S</em>)/(<em>M</em> − 1) pages, and it must fit in the <em>M</em> pages of memory: <em>B</em>(<em>S</em>)/(<em>M</em> − 1) ≤ <em>M</em>, roughly <em>B</em>(<em>S</em>) ≤ <em>M</em><sup>2</sup>, that is <em>M</em> ≥ √<em>B</em>(<em>S</em>).</li>
</ul>
<pre><code>import math

BR, TR, BS, TS, M = 1000, 100_000, 500, 40_000, 102

def sort_cost(B, M):
    runs = math.ceil(B / M)
    passes = 1 + (math.ceil(math.log(runs, M - 1)) if runs &gt; 1 else 0)
    return 2 * B * passes

costs = {
    "nested loop":             BR + TR * BS,
    "page nested loop":        BR + BR * BS,
    "block nested loop":       BR + math.ceil(BR / (M - 2)) * BS,
    "block, S outer":          BS + math.ceil(BS / (M - 2)) * BR,
    "index nested loop (c=3)": BR + TR * 3,
    "sort-merge":              sort_cost(BR, M) + sort_cost(BS, M) + BR + BS,
    "Grace hash":              3 * (BR + BS),
}
for name, c in costs.items():
    print(name.ljust(24), c)</code></pre>
<pre data-label="Output"><code>nested loop              50001000
page nested loop         501000
block nested loop        6000
block, S outer           5500
index nested loop (c=3)  301000
sort-merge               7500
Grace hash               4500</code></pre>
<p>At 0.1 ms per I/O (an SSD), the naive nested loop takes about 83 minutes, the page version 50 seconds, and the block, sort-merge and hash joins under a second. The index nested loop is poor here because it probes for all 100,000 rows of <em>R</em>; if a filter first cut <em>R</em> to 100 rows, it would cost about 300 I/Os plus the filter and beat everything else.</p>
<p>The page nested loop and the in-memory hash join, with a counter of page reads:</p>
<pre><code>def paged(rows, per_page):
    return [rows[i:i + per_page] for i in range(0, len(rows), per_page)]

class Disk:
    def __init__(self):
        self.reads = 0
    def read(self, page):
        self.reads += 1
        return page

def page_nested_loop(R, S, rk, sk, disk):
    out = []
    for rpage in R:
        rp = disk.read(rpage)
        for spage in S:
            sp = disk.read(spage)
            out += [r + s for r in rp for s in sp if r[rk] == s[sk]]
    return out

def hash_join(R, S, rk, sk, disk):        # builds on S, which must fit in memory
    table = {}
    for spage in S:
        for s in disk.read(spage):
            table.setdefault(s[sk], []).append(s)
    out = []
    for rpage in R:
        for r in disk.read(rpage):
            out += [r + s for s in table.get(r[rk], [])]
    return out

enroll = paged([(i % 100, "C" + str(i % 7)) for i in range(600)], 20)   # (sid, cid): 30 pages
people = paged([(i, "n" + str(i)) for i in range(100)], 10)              # (sid, name): 10 pages
d1, d2 = Disk(), Disk()
a = page_nested_loop(enroll, people, 0, 0, d1)
b = hash_join(enroll, people, 0, 0, d2)
print(d1.reads, d2.reads, len(a), sorted(a) == sorted(b))   # 330 40 600 True</code></pre>
<p>As the formulas say: 30 + 30 × 10 = 330 reads against 30 + 10 = 40.</p>

<h3>Estimating sizes</h3>
<p>To compare plans, the optimizer estimates how many rows each operator produces from <em>statistics</em> it keeps about each table: <em>T</em>(<em>R</em>), and for each column the number of distinct values <em>V</em>(<em>R</em>, <em>a</em>) and the minimum and maximum (SQLite gathers them with the <code>ANALYZE</code> command; many systems also keep histograms). The fraction of rows a condition keeps is its <strong>selectivity</strong>. The classic estimates, from IBM's System R optimizer (1979):</p>
<ul>
<li><em>a</em> = constant: 1 / <em>V</em>(<em>R</em>, <em>a</em>), assuming values are equally common;</li>
<li><em>a</em> &gt; constant <em>v</em>: (max − <em>v</em>) / (max − min), assuming values are spread evenly;</li>
<li><em>p</em> AND <em>q</em>: sel(<em>p</em>) · sel(<em>q</em>), assuming the conditions are independent (MATH 230's independent events); <em>p</em> OR <em>q</em>: sel(<em>p</em>) + sel(<em>q</em>) − sel(<em>p</em>) · sel(<em>q</em>);</li>
<li><em>R</em> ⋈ <em>S</em> on <em>R</em>.<em>a</em> = <em>S</em>.<em>b</em>: <em>T</em>(<em>R</em>) · <em>T</em>(<em>S</em>) / max(<em>V</em>(<em>R</em>, <em>a</em>), <em>V</em>(<em>S</em>, <em>b</em>)). Each <em>R</em> row matches about <em>T</em>(<em>S</em>) / <em>V</em>(<em>S</em>, <em>b</em>) rows, if its value occurs in <em>S</em>; dividing by the larger <em>V</em> assumes the column with fewer distinct values has its values among the other's.</li>
</ul>
<p>When a selection's result feeds a join, the join formula needs <em>V</em> for the filtered table, so the optimizer estimates that too. After <em>a</em> = constant, <em>V</em>(σ(<em>R</em>), <em>a</em>) = 1. For any other column <em>b</em>, the simplest estimate is <em>V</em>(σ(<em>R</em>), <em>b</em>) = min(<em>V</em>(<em>R</em>, <em>b</em>), <em>T</em>(σ(<em>R</em>))): the values are assumed to survive, but there can't be more distinct values than rows. A key column keeps one distinct value per remaining row.</p>
<p>Lesson 5's table of 100,000 people, with 5 cities and ages 18 to 90 chosen at random: <code>city = 'Boston' AND age &gt; 80</code> is estimated at 100,000 × (1/5) × (90 − 80)/(90 − 18) ≈ 2,778 rows, and the true count was 2,725. The estimates are only as good as their assumptions. Real data is skewed (a few values are very common) and correlated (city and zip code are far from independent), and errors multiply through a plan with many joins. Bad estimates are the commonest reason an optimizer picks a bad plan.</p>

<h3>Choosing a join order</h3>
<p>Join is commutative and associative, so a query joining <em>n</em> tables can be evaluated in many orders: there are <em>n</em>! orders of the form ((<em>R</em><sub>1</sub> ⋈ <em>R</em><sub>2</sub>) ⋈ <em>R</em><sub>3</sub>) ⋈ ⋯, called <em>left-deep</em> plans, and more if both inputs of a join may be joins themselves. The orders can differ hugely, because the size of the intermediate results differs. Take students (10,000 rows), enrolled (100,000 rows, <em>V</em>(sid) = 10,000, <em>V</em>(cid) = 500) and courses (500 rows), with the condition <code>courses.dept = 'Math'</code> and 20 departments, so σ(courses) is estimated at 500 / 20 = 25 rows, and since cid is courses' key, <em>V</em>(σ(courses), cid) = min(500, 25) = 25:</p>
<pre><code>def join_size(t1, t2, v1, v2):
    return t1 * t2 / max(v1, v2)

math_courses = 500 / 20
# order 1: (enrolled ⋈ σ(courses)) ⋈ students
step1 = join_size(100_000, math_courses, 500, 25)
print(step1, join_size(step1, 10_000, 10_000, 10_000))   # 5000.0 5000.0
# order 2: (students ⋈ enrolled) ⋈ σ(courses)
step1 = join_size(10_000, 100_000, 10_000, 10_000)
print(step1, join_size(step1, math_courses, 500, 25))    # 100000.0 5000.0
# order 3: (students × σ(courses)) ⋈ enrolled: no condition joins them
print(10_000 * math_courses)                             # 250000.0</code></pre>
<p>All three give the same 5,000 rows, but order 1 builds a 5,000-row intermediate result, order 2 one of 100,000, and order 3 a 250,000-row Cartesian product. The general rules: apply selections as early as possible ("push them down"), join first the pairs that produce small results, and avoid products.</p>
<p>The System R optimizer chooses the order by <strong>dynamic programming</strong> (CS 220): find the cheapest plan for every single table, then for every pair of tables, then every set of three built from a cheapest smaller plan plus one more table, and so on. That examines about 2<sup><em>n</em></sup> sets instead of <em>n</em>! orders (for 10 tables, 1,024 against 3,628,800), and for each set it keeps the cheapest plan plus any plan whose output is sorted in a useful way, since that order may save a sort later. Most databases still use this method for up to roughly a dozen tables, and switch to heuristics or randomized search beyond that.</p>

<h3>Plans in SQLite</h3>
<p>SQLite implements every join as a nested loop, so its main decisions are which table goes outside and which index to use for the inner lookups. If no index fits, it may build a temporary <em>automatic index</em> for the inner table, which makes the join an index nested loop. With Lesson 5's <code>people</code> table and a five-row <code>cities(city, state)</code> table:</p>
<pre data-label="SQL"><code>EXPLAIN QUERY PLAN
SELECT p.name, c.state FROM people p JOIN cities c ON p.city = c.city
WHERE c.state = 'MA';</code></pre>
<pre data-label="Output"><code>SCAN c
SEARCH p USING AUTOMATIC COVERING INDEX (city=?)</code></pre>
<p>The condition on <code>state</code> makes <code>cities</code> the small, filtered input, so it goes outside, and the large table is probed through an index. PostgreSQL also has hash and sort-merge joins, and its <code>EXPLAIN</code> prints its estimated costs and row counts; <code>EXPLAIN ANALYZE</code> runs the query and prints the true counts beside the estimates, the first thing to check when a query is slow.</p>
<p class="note">Why it matters: you will rarely write a join algorithm, but you will often need to see why a query is slow. The answer is almost always in the plan: a scan where an index was expected, a bad join order, or an estimate that was wrong by orders of magnitude.</p>
`,
      terms: [
        ["Query optimizer", "The part of a database that chooses an efficient plan for a query among many equivalent ones."],
        ["Query plan", "A tree of physical operators (scans, index lookups, joins, sorts) that computes a query's result."],
        ["Iterator model", "Running a plan by having each operator produce one row at a time on request from its parent."],
        ["Pipelining", "Passing rows directly from one operator to the next without storing intermediate results."],
        ["Blocking operator", "An operator, such as a sort, that must read all its input before producing output."],
        ["External merge sort", "Sorting data larger than memory by writing sorted runs and merging them in passes."],
        ["Nested loop join", "A join that compares each outer row with every inner row."],
        ["Block nested loop join", "A nested loop join that reads the outer input M − 2 pages at a time, scanning the inner once per block."],
        ["Index nested loop join", "A join that looks up each outer row's matches in an index on the inner input."],
        ["Sort-merge join", "A join that sorts both inputs on the join key and merges them."],
        ["Hash join", "A join that builds a hash table on one input and probes it with the other; Grace hash join first partitions both by hash."],
        ["Selectivity", "The fraction of rows a condition keeps."],
        ["Statistics", "Facts kept about tables, such as row counts and distinct values per column, used to estimate costs."],
        ["Left-deep plan", "A join plan in which every join's right input is a single table."]
      ],
      quiz: [
        { q: "With B(R) = 200, B(S) = 50 and M = 52 buffer pages, what does a block nested loop join cost with S as the outer input?", choices: ["250", "450", "10,050", "650"], answer: 0, why: "S fits in one block of 50 pages: 50 + 1 × 200 = 250." },
        { q: "When is an index nested loop join the best choice?", choices: ["When both inputs are huge", "When the outer input is small and the inner has an index on the join column", "When neither input has an index", "Always"], answer: 1, why: "Its cost grows with the number of outer rows, each needing a lookup." },
        { q: "A hash join builds its table on the smaller input S. When does it cost only B(R) + B(S)?", choices: ["Always", "When the hash table for S fits in memory", "When R is sorted", "When the join is not on equality"], answer: 1, why: "Otherwise both inputs are first partitioned to disk, about 3(B(R) + B(S))." },
        { q: "T(R) = 50,000 and V(R, city) = 100. What is the estimated size of σ_city='Lima'(R)?", choices: ["100", "500", "5,000", "50,000"], answer: 1, why: "Selectivity 1/100 of 50,000 rows." },
        { q: "Why does the optimizer multiply the selectivities of p AND q?", choices: ["Because it's exact", "It assumes the conditions are independent, which can be badly wrong for correlated columns", "To get a smaller number", "Because AND is multiplication in SQL"], answer: 1, why: "P(p and q) = P(p)P(q) only for independent events." },
        { q: "Why does the iterator model let LIMIT 10 run fast on a huge table?", choices: ["It sorts first", "Rows are pulled on demand, so the plan stops after producing 10", "It caches the table", "It uses an index"], answer: 1, why: "Pipelined operators do only as much work as their consumers ask for, unless a blocking operator intervenes." }
      ],
      practice: [
        {
          q: `<p>R has 2,000 pages (80,000 rows) and S has 300 pages (12,000 rows); M = 52. Compute the cost of (a) a page nested loop with R outer, (b) a block nested loop with each table outer, (c) a sort-merge join, (d) a Grace hash join. Which is cheapest?</p>`,
          a: `<pre><code>BR, BS, M = 2000, 300, 52
print(BR + BR * BS)                                   # 602000
print(BR + math.ceil(BR / (M - 2)) * BS, BS + math.ceil(BS / (M - 2)) * BR)   # 14000 12300
print(sort_cost(BR, M) + sort_cost(BS, M) + BR + BS)  # 11500
print(3 * (BR + BS))                                  # 6900</code></pre><p>(c): R makes ⌈2000/52⌉ = 39 runs, merged in one pass (39 ≤ 51), so 2 passes: 8,000; S makes 6 runs: 2 passes, 1,200; plus the merge 2,300: total 11,500. (d) needs √300 ≈ 17 &lt; 52 pages of memory, which we have. The Grace hash join, 6,900, is cheapest.</p>`
        },
        {
          q: `<p>Write <code>sort_merge(R, S, rk, sk)</code> for two lists of tuples already sorted on their join columns, returning all matching pairs <code>r + s</code>. Test it on a case with repeated keys on both sides, and compare with a nested loop.</p>`,
          hint: `<p>When the keys are equal, find the end of the run of that key in both lists, output every pair from the two runs, and continue after both runs.</p>`,
          a: `<pre><code>def sort_merge(R, S, rk, sk):
    out, i, j = [], 0, 0
    while i &lt; len(R) and j &lt; len(S):
        a, b = R[i][rk], S[j][sk]
        if a &lt; b:
            i += 1
        elif a &gt; b:
            j += 1
        else:
            i2, j2 = i, j
            while i2 &lt; len(R) and R[i2][rk] == a:
                i2 += 1
            while j2 &lt; len(S) and S[j2][sk] == a:
                j2 += 1
            out += [r + s for r in R[i:i2] for s in S[j:j2]]
            i, j = i2, j2
    return out

R = [(1, "a"), (2, "b"), (2, "c"), (4, "d")]
S = [(2, "x"), (2, "y"), (3, "z"), (4, "w")]
print(sort_merge(R, S, 0, 0))
# [(2, 'b', 2, 'x'), (2, 'b', 2, 'y'), (2, 'c', 2, 'x'), (2, 'c', 2, 'y'), (4, 'd', 4, 'w')]
print(sort_merge(R, S, 0, 0) == [r + s for r in R for s in S if r[0] == s[0]])   # True</code></pre>`
        },
        {
          q: `<p>Estimate the result size of <code>SELECT * FROM orders o JOIN customers c ON o.cust = c.id WHERE c.country = 'NZ' AND o.total &gt; 900</code>, given T(orders) = 1,000,000, V(orders, cust) = 50,000, T(customers) = 50,000 (id is its key), V(customers, country) = 100, and totals spread evenly from 0 to 1,000. Use the notes' estimates for <em>V</em> after a selection. Which selections should be applied before the join?</p>`,
          a: `<p>σ<sub>country='NZ'</sub>(customers): 50,000 / 100 = 500 rows, and since id is the key, <em>V</em> = min(50,000, 500) = 500. σ<sub>total&gt;900</sub>(orders): 1,000,000 × (1,000 − 900)/1,000 = 100,000 rows, with <em>V</em>(cust) = min(50,000, 100,000) = 50,000: the estimate assumes they still cover all the customers. The join: 100,000 × 500 / max(50,000, 500) = 1,000 rows. Both selections should be applied first (pushed down): the join then combines 100,000 and 500 rows instead of 1,000,000 and 50,000, and the 500 filtered customers easily fit in a hash table.</p>`
        },
        {
          q: `<p>For a query joining four tables A, B, C, D in a chain (A–B, B–C, C–D, each pair linked by a condition), how many left-deep join orders are there, and how many avoid a Cartesian product? How many table subsets does dynamic programming consider?</p>`,
          a: `<p>4! = 24 left-deep orders. Those avoiding a product must add, at each step, a table joined to one already present. Starting from A: A B C D only (1). From B: B A C D, B C A D, B C D A (3). From C: symmetric with B (3). From D: 1. That is 8 orders. Dynamic programming considers the 2<sup>4</sup> − 1 = 15 nonempty subsets (and in practice skips the subsets that aren't connected, such as {A, C}).</p>
<pre><code>from itertools import permutations
links = {frozenset("AB"), frozenset("BC"), frozenset("CD")}
def ok(order):
    return all(any(frozenset((order[k], x)) in links for x in order[:k])
               for k in range(1, len(order)))
print(sum(ok(p) for p in permutations("ABCD")))   # 8</code></pre>`
        }
      ],
      sources: ["selinger79", "dbsc", "cmu15445", "sqlitedocs", "redbook"]
    },
    {
      id: "db7",
      title: "Transactions and concurrency control",
      minutes: 90,
      summary: "How a database lets many users work at once without corrupting data: transactions and the ACID properties, schedules and conflict serializability tested with a precedence graph, two-phase locking and deadlocks, the SQL isolation levels and the anomalies each allows, and multiversion concurrency control with snapshot isolation.",
      notes: `
<p>A database serves many programs at once: a web application may run hundreds of queries in the same second, some reading the rows others are changing. Lesson 1 listed "concurrent writers collide" as a failure of plain files. This lesson is about how a database prevents it while still running work in parallel.</p>

<h3>Transactions</h3>
<p>A <strong>transaction</strong> is a sequence of reads and writes that the database treats as one unit. In SQL it starts with <code>BEGIN</code> and ends with <code>COMMIT</code> (make the changes permanent) or <code>ROLLBACK</code> (undo them all). Moving money between accounts is the classic example:</p>
<pre><code>import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE accounts (name TEXT PRIMARY KEY, balance INTEGER CHECK (balance &gt;= 0))")
db.executemany("INSERT INTO accounts VALUES (?, ?)", [("ana", 100), ("ben", 50)])
db.commit()

def transfer(db, src, dst, amount):
    with db:        # commit at the end of the block, or roll back if it raises
        db.execute("UPDATE accounts SET balance = balance + ? WHERE name = ?", (amount, dst))
        db.execute("UPDATE accounts SET balance = balance - ? WHERE name = ?", (amount, src))

transfer(db, "ana", "ben", 30)
try:
    transfer(db, "ben", "ana", 500)     # ben has only 80
except sqlite3.IntegrityError as e:
    print(e)                            # CHECK constraint failed: balance &gt;= 0
print(db.execute("SELECT * FROM accounts ORDER BY name").fetchall())   # [('ana', 70), ('ben', 80)]</code></pre>
<p>In the failed transfer, the first update had already added 500 to Ana's balance when the second failed its check. The rollback undid it: either both updates happen or neither does. (Python's <code>sqlite3</code> starts a transaction automatically before the first statement that changes data; <code>with db:</code> then commits or rolls back.)</p>
<p>Transactions promise four properties, known by their initials as <strong>ACID</strong>:</p>
<ul>
<li><strong>Atomicity:</strong> all of a transaction's changes happen, or none do, even if the program or the machine crashes halfway (Lesson 8).</li>
<li><strong>Consistency:</strong> a transaction that starts with the data satisfying every constraint ends with it satisfying them too. The database enforces the declared constraints; rules it doesn't know about are the application's job.</li>
<li><strong>Isolation:</strong> concurrent transactions don't see each other's partial work; ideally, the result is the same as if they ran one at a time. This lesson.</li>
<li><strong>Durability:</strong> once a commit returns, the changes survive crashes (Lesson 8).</li>
</ul>

<h3>Schedules and the lost update</h3>
<p>Write a transaction's operations as <em>R</em><sub>1</sub>(<em>A</em>) (transaction 1 reads item <em>A</em>) and <em>W</em><sub>1</sub>(<em>A</em>) (it writes <em>A</em>). A <strong>schedule</strong> is an interleaving of the operations of several transactions, keeping each one's own order. Suppose T1 withdraws 30 from an account holding 100 and T2 deposits 20 into it, each reading the balance and writing back a new one:</p>
<p class="math"><em>R</em><sub>1</sub>(<em>A</em>) &nbsp; <em>R</em><sub>2</sub>(<em>A</em>) &nbsp; <em>W</em><sub>1</sub>(<em>A</em>) &nbsp; <em>W</em><sub>2</sub>(<em>A</em>)</p>
<p>Both read 100; T1 writes 70, then T2 writes 120. The withdrawal is lost: run one after the other, in either order, the result would be 90. This <strong>lost update</strong> is the basic concurrency bug. A <strong>serial</strong> schedule runs transactions one at a time, so it is always correct (if each transaction is correct alone), but it wastes the parallelism of the machine. The goal is to allow interleaved schedules that are <strong>serializable</strong>: equivalent to some serial schedule.</p>

<h3>Conflict serializability</h3>
<p>Two operations <strong>conflict</strong> if they belong to different transactions, touch the same item, and at least one is a write. Reads of the same item don't conflict, and operations on different items never do. Swapping two adjacent operations that don't conflict can't change any value read or the final state. So if a schedule can be turned into a serial one by such swaps, it is <strong>conflict serializable</strong>. The test:</p>
<ol>
<li>Draw a <strong>precedence graph</strong> with a vertex per transaction, and an edge <em>T<sub>i</sub></em> → <em>T<sub>j</sub></em> whenever an operation of <em>T<sub>i</sub></em> conflicts with a <em>later</em> operation of <em>T<sub>j</sub></em>. The edge says "<em>T<sub>i</sub></em> must come before <em>T<sub>j</sub></em> in any equivalent serial order".</li>
<li>The schedule is conflict serializable if and only if the graph has no cycle, and then any topological order of the graph (CS 201 Lesson 7) is an equivalent serial order.</li>
</ol>
<pre><code>def precedence_graph(schedule):
    edges = set()
    for i, (t1, op1, x1) in enumerate(schedule):
        for t2, op2, x2 in schedule[i + 1:]:
            if t1 != t2 and x1 == x2 and "W" in (op1, op2):
                edges.add((t1, t2))
    return edges

lost = [(1, "R", "A"), (2, "R", "A"), (1, "W", "A"), (2, "W", "A")]
print(sorted(precedence_graph(lost)))   # [(1, 2), (2, 1)]
ok = [(1, "R", "A"), (1, "W", "A"), (2, "R", "A"), (1, "R", "B"),
      (2, "W", "A"), (1, "W", "B"), (2, "R", "B"), (2, "W", "B")]
print(sorted(precedence_graph(ok)))     # [(1, 2)]</code></pre>
<figure class="fig"><svg viewBox="0 0 560 120" role="img" aria-label="Precedence graphs: the lost-update schedule has edges T1 to T2 and T2 to T1, a cycle; the second schedule has only T1 to T2.">
<defs><marker id="arr-prec" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<g class="box"><circle cx="70" cy="60" r="22"/><circle cx="230" cy="60" r="22"/><circle cx="350" cy="60" r="22"/><circle cx="510" cy="60" r="22"/></g>
<g class="ln"><path d="M90,50 Q150,20 208,50" marker-end="url(#arr-prec)"/><path d="M210,70 Q150,100 92,70" marker-end="url(#arr-prec)"/><line x1="372" y1="60" x2="486" y2="60" marker-end="url(#arr-prec)"/></g>
<g class="text"><text x="70" y="65" text-anchor="middle">T1</text><text x="230" y="65" text-anchor="middle">T2</text><text x="350" y="65" text-anchor="middle">T1</text><text x="510" y="65" text-anchor="middle">T2</text>
<text x="150" y="22" text-anchor="middle" class="m">R1(A) before W2(A)</text><text x="150" y="112" text-anchor="middle" class="m">R2(A) before W1(A)</text><text x="430" y="48" text-anchor="middle" class="m">every conflict</text>
<text x="150" y="65" text-anchor="middle" class="m">cycle</text><text x="430" y="85" text-anchor="middle" class="m">serial order T1, T2</text></g>
</svg><figcaption>Left: the lost update's precedence graph has a cycle, so no serial order is equivalent. Right: the second schedule interleaves the two transactions, but every conflict goes from T1 to T2, so it is equivalent to T1 followed by T2.</figcaption></figure>
<p>In the second schedule, T2 works on <em>A</em> while T1 works on <em>B</em>: real parallelism, yet the same result as running T1 first. (There is a broader notion, view serializability, but testing it is NP-complete, so databases aim for conflict serializability.)</p>
<p>Serializability isn't the only requirement. If T2 reads a value T1 wrote, and T1 later aborts, T2 has read data that never existed; if T2 has already committed, it can't be undone. A schedule is <strong>recoverable</strong> if every transaction commits only after every transaction it read from has committed. Better still, transactions should read only committed data, so that one abort never forces others to abort (a <em>cascading abort</em>).</p>

<h3>Two-phase locking</h3>
<p>Checking schedules after the fact is too late; the database must produce good schedules as it goes. The classic method is locking. Before reading an item a transaction takes a <strong>shared lock</strong> (S) on it, and before writing it an <strong>exclusive lock</strong> (X). Many transactions can hold S locks on an item at once, but an X lock excludes every other lock:</p>
<table>
<tr><th>Held \\ requested</th><th>S</th><th>X</th></tr>
<tr><td>S</td><td>granted</td><td>wait</td></tr>
<tr><td>X</td><td>wait</td><td>wait</td></tr>
</table>
<p>Locks alone aren't enough: releasing a lock right after each read lets the lost update through. <strong>Two-phase locking</strong> (2PL) adds one rule: a transaction may not acquire any lock after it has released one. Each transaction has a <em>growing phase</em>, taking locks, then a <em>shrinking phase</em>, releasing them. Every schedule 2PL allows is conflict serializable: a conflict edge <em>T<sub>i</sub></em> → <em>T<sub>j</sub></em> means <em>T<sub>j</sub></em> acquired a lock on the item only after <em>T<sub>i</sub></em> released its own, so <em>T<sub>i</sub></em> reached its last lock acquisition before <em>T<sub>j</sub></em> did, and ordering transactions by that moment gives the serial order. Databases use <strong>strict 2PL</strong>: hold every lock until commit or abort. Then no one ever reads uncommitted data, which rules out cascading aborts.</p>

<h3>Deadlock</h3>
<p>Under 2PL the lost-update schedule can't happen, but it turns into something else. T1 and T2 each take an S lock on <em>A</em> and read it; T1 then asks for an X lock to write, and must wait for T2's S lock; T2 asks for X and must wait for T1's. Neither can proceed: a <strong>deadlock</strong>. The database keeps a <strong>wait-for graph</strong>, with an edge <em>T<sub>i</sub></em> → <em>T<sub>j</sub></em> when <em>T<sub>i</sub></em> waits for a lock <em>T<sub>j</sub></em> holds; a deadlock is a cycle. It is the same structure as the wait-for graph of threads and locks in CS 310 Lesson 5, with transactions in place of threads. (It is not the precedence graph above: that one records conflicts in a schedule, this one records who is waiting right now.) Systems handle it in one of three ways:</p>
<ul>
<li><strong>Detection:</strong> look for cycles periodically, and abort one transaction on the cycle (often the one that has done least work), which releases its locks. The application must then retry it.</li>
<li><strong>Prevention</strong> by timestamps: give each transaction its start time as a priority. In <em>wait-die</em>, an older transaction may wait for a younger one, but a younger one requesting a lock an older one holds aborts at once (and restarts later with its original timestamp). In <em>wound-wait</em>, an older transaction aborts ("wounds") a younger holder, and a younger one waits. Either way waits go only one direction in age, so no cycle can form.</li>
<li><strong>Timeouts:</strong> abort any transaction that has waited too long. Simple, but it can abort transactions that weren't deadlocked.</li>
</ul>
<p>Locking individual rows leaves one gap. A transaction that runs <code>SELECT COUNT(*) FROM enrolled WHERE cid = 'CS340'</code> twice can lock every row it saw, yet another transaction can <em>insert</em> a new CS340 row in between, and the second count differs. The new row is a <strong>phantom</strong>. Preventing phantoms requires locking the condition, not just the rows; databases do it by locking ranges of an index (for example, every key from CS340 up to the next key in the index).</p>

<h3>Isolation levels</h3>
<p>Full serializability costs waiting and aborts, so SQL lets each transaction choose a weaker <strong>isolation level</strong>, defined by which anomalies it allows:</p>
<ul>
<li>A <strong>dirty read</strong>: reading a value written by a transaction that hasn't committed (and may abort).</li>
<li>A <strong>nonrepeatable read</strong>: reading the same row twice and getting different values, because another transaction changed it and committed in between.</li>
<li>A <strong>phantom</strong>: running the same query twice and getting a different set of rows, because another transaction inserted or deleted matching rows.</li>
</ul>
<table>
<tr><th>Level</th><th>Dirty read</th><th>Nonrepeatable read</th><th>Phantom</th></tr>
<tr><td>READ UNCOMMITTED</td><td>possible</td><td>possible</td><td>possible</td></tr>
<tr><td>READ COMMITTED</td><td>prevented</td><td>possible</td><td>possible</td></tr>
<tr><td>REPEATABLE READ</td><td>prevented</td><td>prevented</td><td>possible</td></tr>
<tr><td>SERIALIZABLE</td><td>prevented</td><td>prevented</td><td>prevented</td></tr>
</table>
<p>With locks, READ COMMITTED means holding X locks to commit but releasing S locks right after each read; REPEATABLE READ holds S locks too, but not range locks. Defaults differ: PostgreSQL uses READ COMMITTED, MySQL's InnoDB uses REPEATABLE READ, and SQLite gives serializable transactions by allowing only one writer at a time. A 1995 paper by Berenson and colleagues showed that these three anomalies don't capture everything (lost updates and the write skew below are not on the list), and that many databases' "SERIALIZABLE" wasn't.</p>

<h3>MVCC and snapshot isolation</h3>
<p>Most modern databases, including PostgreSQL, Oracle and MySQL's InnoDB, avoid making readers wait at all with <strong>multiversion concurrency control</strong> (MVCC). A write doesn't overwrite a row; it adds a new <em>version</em>, stamped with the writing transaction. A reader sees, for each row, the newest version that was committed before it started. Readers never block writers and writers never block readers; old versions are garbage-collected once no running transaction can see them.</p>
<p>The usual MVCC guarantee is <strong>snapshot isolation</strong>: each transaction reads from a snapshot of the database as of its start, and when two concurrent transactions write the same item, only the first to commit succeeds; the second aborts (<em>first committer wins</em>). Here is the whole idea in a small class:</p>
<pre><code>class SnapshotStore:
    def __init__(self):
        self.versions = {}          # key -&gt; list of (commit time, value)
        self.clock = 0
    def begin(self):
        return {"start": self.clock, "writes": {}}
    def read(self, tx, key):
        if key in tx["writes"]:
            return tx["writes"][key]
        seen = [v for t, v in self.versions.get(key, []) if t &lt;= tx["start"]]
        return seen[-1] if seen else None
    def write(self, tx, key, value):
        tx["writes"][key] = value   # invisible to others until commit
    def commit(self, tx):
        for key in tx["writes"]:    # first committer wins
            if any(t &gt; tx["start"] for t, v in self.versions.get(key, [])):
                return False        # someone else committed this key since we began
        self.clock += 1
        for key, value in tx["writes"].items():
            self.versions.setdefault(key, []).append((self.clock, value))
        return True

db = SnapshotStore()
t0 = db.begin(); db.write(t0, "A", 100); db.commit(t0)
t1, t2 = db.begin(), db.begin()                  # the lost-update interleaving
db.write(t1, "A", db.read(t1, "A") - 30)
db.write(t2, "A", db.read(t2, "A") + 20)
print(db.commit(t1), db.commit(t2), db.read(db.begin(), "A"))   # True False 70</code></pre>
<p>T2's commit fails because T1 committed a new version of <em>A</em> after T2's snapshot was taken; the application retries T2, which then reads 70 and writes 90. Snapshot isolation prevents dirty reads, nonrepeatable reads and lost updates. But it is not serializable. Its characteristic anomaly is <strong>write skew</strong>: two transactions read overlapping data and write <em>different</em> items. A hospital requires at least one of two doctors to be on call; both are, and each, at the same moment, checks that the other is on call and goes off call:</p>
<pre><code>t = db.begin(); db.write(t, "alice", "on"); db.write(t, "bob", "on"); db.commit(t)
t1, t2 = db.begin(), db.begin()
if db.read(t1, "bob") == "on":
    db.write(t1, "alice", "off")
if db.read(t2, "alice") == "on":
    db.write(t2, "bob", "off")
print(db.commit(t1), db.commit(t2))                  # True True
s = db.begin()
print(db.read(s, "alice"), db.read(s, "bob"))        # off off</code></pre>
<p>Each saw a snapshot in which the other was on call, and they wrote different rows, so neither commit conflicted. No serial order produces this result: whichever ran second would have seen the first go off call. PostgreSQL's REPEATABLE READ level is snapshot isolation; its SERIALIZABLE level (since 2011) is <em>serializable snapshot isolation</em>, which also tracks what each transaction read and aborts one transaction of a dangerous pattern like this one.</p>
<p class="note">Why it matters: a concurrency bug appears only under load, when two requests happen to interleave badly, and it corrupts data quietly. Know your database's default isolation level, use SERIALIZABLE (and retry on abort) for transactions that check a condition before writing, and keep transactions short.</p>
`,
      terms: [
        ["Transaction", "A sequence of reads and writes treated as one unit, ended by COMMIT or ROLLBACK."],
        ["ACID", "Atomicity, consistency, isolation, durability: the guarantees of a transaction."],
        ["Schedule", "An interleaving of the operations of several transactions, keeping each transaction's own order."],
        ["Lost update", "An anomaly in which two transactions read the same value and one's write overwrites the other's."],
        ["Serializable schedule", "A schedule equivalent to some serial (one-at-a-time) schedule."],
        ["Conflict", "Two operations from different transactions on the same item, at least one of them a write."],
        ["Precedence graph", "A graph with an edge Ti → Tj when an operation of Ti conflicts with a later one of Tj; acyclic exactly when the schedule is conflict serializable."],
        ["Recoverable schedule", "A schedule in which each transaction commits only after every transaction it read from has committed."],
        ["Shared and exclusive locks", "S locks, which many readers can hold at once, and X locks, held by a single writer."],
        ["Two-phase locking (2PL)", "The rule that a transaction acquires no lock after releasing one; it guarantees conflict serializability."],
        ["Strict 2PL", "2PL in which locks are held until commit or abort, preventing cascading aborts."],
        ["Deadlock", "A cycle of transactions each waiting for a lock another holds."],
        ["Wait-for graph", "A graph with an edge Ti → Tj when Ti waits for a lock held by Tj; deadlock is a cycle."],
        ["Phantom", "A row inserted or deleted by another transaction that changes the result of a repeated query."],
        ["Isolation level", "A chosen trade-off between consistency and concurrency: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ or SERIALIZABLE."],
        ["MVCC", "Multiversion concurrency control: writes create new versions, and readers see the versions committed before they started."],
        ["Snapshot isolation", "Each transaction reads a snapshot from its start, and of two concurrent writers of an item only the first to commit succeeds."],
        ["Write skew", "An anomaly allowed by snapshot isolation: two transactions read overlapping data and update different items, together breaking a rule."]
      ],
      quiz: [
        { q: "Which pair of operations conflicts?", choices: ["R1(A) and R2(A)", "R1(A) and W2(A)", "W1(A) and W2(B)", "R1(A) and W1(A)"], answer: 1, why: "Different transactions, same item, and one is a write. R1(A), W1(A) are in the same transaction." },
        { q: "The schedule R1(A) W2(A) R2(B) W1(B) has which precedence graph?", choices: ["T1 → T2 only", "T2 → T1 only", "T1 → T2 and T2 → T1: not conflict serializable", "No edges"], answer: 2, why: "R1(A) before W2(A) gives T1 → T2; R2(B) before W1(B) gives T2 → T1." },
        { q: "What does two-phase locking forbid?", choices: ["Holding two locks", "Acquiring a lock after releasing any lock", "Shared locks", "More than two transactions"], answer: 1, why: "All acquisitions come before all releases." },
        { q: "Why do databases use strict 2PL rather than plain 2PL?", choices: ["It allows more concurrency", "Holding locks until commit means no one reads uncommitted data, so aborts don't cascade", "It prevents deadlock", "It needs fewer locks"], answer: 1, why: "Plain 2PL may release an X lock before commit, letting others read data that could still be rolled back." },
        { q: "A transaction reads a row twice and sees different committed values. Which anomaly, and which is the weakest level that prevents it?", choices: ["Dirty read; READ COMMITTED", "Nonrepeatable read; REPEATABLE READ", "Phantom; SERIALIZABLE", "Lost update; READ UNCOMMITTED"], answer: 1, why: "The value changed between reads; REPEATABLE READ keeps it stable." },
        { q: "Under snapshot isolation, two transactions each read both doctors' rows and set a different doctor off call. What happens?", choices: ["The second commit aborts", "Both commit, and the rule is broken: write skew", "Both abort", "They deadlock"], answer: 1, why: "They wrote different items, so first-committer-wins sees no conflict." }
      ],
      practice: [
        {
          q: `<p>Draw the precedence graph of R1(X) R2(Y) W2(X) R3(X) W1(Y) W3(Y) and decide whether it is conflict serializable. If so, give the equivalent serial order.</p>`,
          a: `<p>Conflicts in order: R1(X) before W2(X): T1 → T2. R1(X) and R3(X) are both reads. W2(X) before R3(X): T2 → T3. R2(Y) before W1(Y): T2 → T1. R2(Y) before W3(Y): T2 → T3. W1(Y) before W3(Y): T1 → T3. The edges T1 → T2 and T2 → T1 form a cycle, so it is not conflict serializable.</p>
<pre><code>s = [(1, "R", "X"), (2, "R", "Y"), (2, "W", "X"), (3, "R", "X"), (1, "W", "Y"), (3, "W", "Y")]
print(sorted(precedence_graph(s)))   # [(1, 2), (1, 3), (2, 1), (2, 3)]</code></pre>`
        },
        {
          q: `<p>Under strict 2PL, T1 runs R1(A) W1(A) R1(B) W1(B) and T2 runs R2(B) W2(B) R2(A) W2(A), and they start at the same time, alternating one operation each. Trace the lock requests until something blocks. What happens, and how would wait-die resolve it if T1 is older?</p>`,
          a: `<p>T1 takes S(A) and reads A; T2 takes S(B) and reads B. T1 upgrades to X(A) and writes A; T2 upgrades to X(B) and writes B. T1 requests S(B): T2 holds X(B), so T1 waits. T2 requests S(A): T1 holds X(A), so T2 waits. The wait-for graph has T1 → T2 → T1: a deadlock. Under wait-die, T1 (older) asking for T2's lock is allowed to wait; T2 (younger) asking for older T1's lock dies: it aborts, releasing B, and T1 proceeds. T2 restarts later with its original timestamp, so it eventually becomes the oldest and can't starve.</p>`
        },
        {
          q: `<p>Using the notes' <code>SnapshotStore</code>, show a nonrepeatable read can't happen: transaction T1 reads <em>A</em>, T2 changes <em>A</em> and commits, T1 reads <em>A</em> again. Then explain whether the doctors' write skew could happen under strict 2PL.</p>`,
          a: `<pre><code>s = SnapshotStore()
t = s.begin(); s.write(t, "A", 1); s.commit(t)
t1 = s.begin()
first = s.read(t1, "A")
t2 = s.begin(); s.write(t2, "A", 2); s.commit(t2)
print(first, s.read(t1, "A"), s.read(s.begin(), "A"))   # 1 1 2</code></pre><p>T1 keeps reading its snapshot. Under strict 2PL each transaction would hold S locks on both rows it read; to write its own row it needs an X lock on it, which conflicts with the other's S lock. Each waits for the other: a deadlock, and one is aborted, so the other's change is the only one that happens. When the aborted one retries, it sees the other doctor off call and doesn't go off call itself. 2PL prevents write skew, at the price of the deadlock.</p>`
        },
        {
          q: `<p>An application books seats: it checks <code>SELECT COUNT(*) FROM bookings WHERE flight = 7</code> against the capacity, then inserts a booking. Under READ COMMITTED, two customers booking the last seat at the same moment can both succeed. Explain why, name the anomaly, and give two fixes.</p>`,
          a: `<p>Both transactions count the same committed rows (capacity − 1), both see a free seat, and both insert. Neither changed a row the other wrote, so nothing conflicts. It is a phantom (each one's insert is a phantom for the other's count), and the outcome is write skew. Fixes: (1) run the transaction at SERIALIZABLE and retry when the database aborts one; (2) keep a <code>seats_left</code> column in a <code>flights</code> row and update it with <code>UPDATE flights SET seats_left = seats_left - 1 WHERE id = 7 AND seats_left &gt; 0</code>, checking that one row changed: the two transactions now write the same row, so one waits for (or, under snapshot isolation, conflicts with) the other. A CHECK constraint <code>seats_left &gt;= 0</code> adds a safety net.</p>`
        }
      ],
      sources: ["dbsc", "cmu15445", "berenson95", "pgiso", "sqlitedocs"]
    },
    {
      id: "db8",
      title: "Recovery, and beyond relational databases",
      minutes: 90,
      summary: "How a database keeps committed work and discards uncommitted work across crashes: buffer policies, the write-ahead log, redo and undo, checkpoints and a brief look at ARIES. Then the non-relational stores (key-value, document, wide-column and graph), replication and partitioning, the CAP theorem, and how to choose a store for a workload.",
      notes: `
<p>Lesson 7's ACID promises include two that concurrency control doesn't touch: <em>atomicity</em> (a transaction happens entirely or not at all) and <em>durability</em> (committed work survives crashes). Both are kept by the same mechanism, a log. The second half of the lesson looks at the databases built around different trade-offs from the relational ones.</p>

<h3>What can fail</h3>
<ul>
<li><strong>A transaction fails</strong>: it breaks a constraint, is chosen as a deadlock victim, or the application rolls it back. Its changes must be undone while everything else carries on.</li>
<li><strong>The system crashes</strong>: power fails or the process dies. Everything in memory, including the buffer pool, is lost; what was written to disk survives.</li>
<li><strong>The storage fails</strong>: a disk dies. Only copies elsewhere help: backups and replicas (below).</li>
</ul>
<p>The difficulty with crashes comes from the buffer pool (Lesson 5). Changes are made to pages in memory and written to disk later, at times chosen for efficiency. Two policies decide how free the buffer pool is. <strong>Steal</strong>: may a page changed by an uncommitted transaction be written to disk, for example to make room? If so, a crash can leave uncommitted changes on disk, which must be <em>undone</em>. <strong>Force</strong>: must every page a transaction changed be written to disk when it commits? If not, a crash can lose committed changes that were still only in memory, which must be <em>redone</em>. "No steal, force" needs neither undo nor redo, but it is slow: memory fills with pages that can't be written, and each commit waits for many scattered page writes. Real systems choose <strong>steal, no force</strong> for speed, and so need both undo and redo. The log provides them.</p>

<h3>Write-ahead logging</h3>
<p>The <strong>log</strong> is an append-only file of records describing every change. Each update record holds a <em>log sequence number</em> (LSN, its position in the log), the transaction, the item (in practice a page and position), and its value before and after: the <em>old</em> value for undo, the <em>new</em> value for redo. There are also records for a transaction's begin, commit and abort. Appending is fast because the log is written sequentially, and many transactions' records share each disk write.</p>
<p><strong>Write-ahead logging</strong> (WAL) imposes two rules:</p>
<ol>
<li>Before a changed page is written to disk, the log records describing its changes must be on disk. So whatever uncommitted change reaches the disk, its old value is in the log, ready for undo.</li>
<li>A transaction is committed when its commit record is on disk, and not before. So every committed change has its new value in the log, ready for redo, even if no data page was written.</li>
</ol>
<p>Committing therefore costs one sequential log write (forcing the log to disk, often shared by many transactions committing at once: <em>group commit</em>) instead of writing every changed page. The data pages follow later, at leisure.</p>

<h3>Recovery: redo, then undo</h3>
<p>After a crash, the database reads the log and repairs the data in two passes:</p>
<ol>
<li><strong>Redo</strong>, forward through the log: reapply the new value of every update, whether or not its transaction committed. This "repeats history", bringing the data to exactly its state at the moment of the crash.</li>
<li><strong>Undo</strong>, backward through the log: for each update of a transaction with no commit or abort record (a <em>loser</em>), restore the old value. Each undo is itself logged as a <em>compensation log record</em> (CLR), and finally an abort record is written for each loser.</li>
</ol>
<pre><code>log = [("BEGIN", "T1"), ("UPDATE", "T1", "A", 100, 70),
       ("BEGIN", "T2"), ("UPDATE", "T2", "B", 50, 80),
       ("UPDATE", "T1", "C", 10, 40), ("COMMIT", "T1"),
       ("UPDATE", "T2", "A", 70, 90)]                     # crash here
disk = {"A": 90, "B": 50, "C": 10}    # A's page was stolen; B's and C's never written

def recover(log, disk):
    disk = dict(disk)
    for rec in log:                                       # redo: repeat history
        if rec[0] == "UPDATE":
            disk[rec[2]] = rec[4]
        elif rec[0] == "CLR":                             # ("CLR", t, item, value)
            disk[rec[2]] = rec[3]
    finished = {rec[1] for rec in log if rec[0] in ("COMMIT", "ABORT")}
    losers = {rec[1] for rec in log if rec[0] == "BEGIN"} - finished
    clrs = []
    for rec in reversed(log):                             # undo the losers
        if rec[0] == "UPDATE" and rec[1] in losers:
            disk[rec[2]] = rec[3]
            clrs.append(("CLR", rec[1], rec[2], rec[3]))
    return disk, clrs + [("ABORT", t) for t in sorted(losers)]

print(recover(log, disk))
# ({'A': 70, 'B': 50, 'C': 40}, [('CLR', 'T2', 'A', 70), ('CLR', 'T2', 'B', 50), ('ABORT', 'T2')])</code></pre>
<p>Follow it through. Redo sets A = 70, B = 80, C = 40, then A = 90. T1 committed; T2 didn't, so it is the loser. Undo, going backward, restores A to 70 and B to 50. The result has all of T1's changes (A = 70, C = 40) and none of T2's, whatever the disk held at the crash. Undoing in reverse order matters: T2 changed A <em>after</em> T1 did, and only the last update's old value is the right one to restore.</p>
<p>Recovery must also survive a crash <em>during</em> recovery, and the log may describe rollbacks that were under way, or finished, before the crash. Redo is safe to repeat: setting A to 70 twice is the same as once. The CLRs are what make the undo side work, for two reasons.</p>
<p><strong>Redo repeats the rollbacks too.</strong> A CLR is an ordinary change (set this item to this value), and the redo loop reapplies it like an update. Without CLRs, a transaction that aborted before the crash would have its updates redone and nothing to remove them, since its abort record means it is not a loser. Treating it as a loser instead would be wrong: if T1 changed A from 1 to 2 and rolled back, and T2 then set A to 7 and committed, undoing T1 again would put A back to 1 and destroy T2's committed write. With the CLR, redo gives A = 2, then 1, then 7, and T1 is left alone:</p>
<pre><code>log2 = [("BEGIN", "T1"), ("UPDATE", "T1", "A", 1, 2), ("CLR", "T1", "A", 1),
        ("ABORT", "T1"), ("BEGIN", "T2"), ("UPDATE", "T2", "A", 1, 7),
        ("COMMIT", "T2"), ("BEGIN", "T3"), ("UPDATE", "T3", "B", 0, 9)]
print(recover(log2, {"A": 2, "B": 9}))
# ({'A': 7, 'B': 0}, [('CLR', 'T3', 'B', 0), ('ABORT', 'T3')])</code></pre>
<p><strong>A CLR marks an update as already undone.</strong> A rollback works backward, so a loser with <em>k</em> CLRs in the log (its rollback, or an earlier recovery, was cut short by the crash) has had its <em>k</em> most recent updates undone. Recovery should skip those and undo only the rest, so that each update is undone, and has a CLR, exactly once. If it undid them again and logged second CLRs, and then crashed again before logging the abort, the log would hold more CLRs than the loser has updates, and the next recovery's count would skip an update that was never undone. The notes' <code>recover</code> leaves this case out; the practice problem on crash recovery handles it, along with checkpoints.</p>
<p>Rolling back a single transaction while the system runs uses the same idea: walk that transaction's records backward, restore each old value, and log CLRs and an abort record. That's what happened to Lesson 7's failed transfer.</p>

<h3>Checkpoints and ARIES</h3>
<p>The log grows forever, and a recovery that starts at the beginning would take longer every day. A <strong>checkpoint</strong> bounds the work. The simplest kind pauses new updates, writes every changed page in the buffer pool to disk, and writes a checkpoint record listing the active transactions. Every change before the checkpoint is then on disk, so redo can start there; undo still goes back as far as the oldest loser's first record. Old log records that no running transaction needs can be archived or deleted.</p>
<p>Pausing the system is unacceptable in practice. <strong>ARIES</strong>, the algorithm published by C. Mohan and colleagues at IBM in 1992 and used in some form by most databases, takes <em>fuzzy</em> checkpoints that record which pages are dirty and which transactions are active, without writing any pages or stopping work. Each page stores the LSN of the last update applied to it (its <em>pageLSN</em>), so redo can skip any update the page already contains. Recovery runs three passes: <em>analysis</em> (from the last checkpoint, rebuild the lists of dirty pages and active transactions), <em>redo</em> (repeat history from the oldest change that might not be on disk), and <em>undo</em> (roll back the losers, writing CLRs). The ideas are the ones above, engineered so that the system never stops.</p>
<p>SQLite offers two methods, chosen with <code>PRAGMA journal_mode</code>. The default <em>rollback journal</em> copies each page's original contents to a separate journal file before changing it in the database file: an undo log, deleted at commit. In <em>WAL mode</em> (<code>PRAGMA journal_mode = WAL</code>) changed pages are appended to a <code>-wal</code> file instead, a redo log; readers keep reading the pages that were committed when they started, so they never wait for the writer, and a checkpoint periodically copies the pages back into the main file.</p>
<p>A note on words. "Journal" names different logs in different systems. A file-system journal (CS 310 Lesson 7) holds the <em>new</em> versions of blocks and replays committed ones after a crash: a redo log. SQLite's rollback journal holds <em>old</em> page contents and puts them back: an undo log. <em>Write-ahead logging</em> is the general rule that a change's log record reaches disk before the change itself, whichever kind of record it is; the database log in this lesson holds both old and new values, so it supports undo and redo.</p>

<h3>Beyond relational: why other kinds of database exist</h3>
<p>In the 2000s, companies such as Google and Amazon needed to store more data, and serve more requests, than any single machine could handle, and to keep running when machines failed, which at their scale happened every day. Google's Bigtable (2006) and Amazon's Dynamo (2007) gave up joins, a fixed schema or multi-row transactions in exchange for spreading data across thousands of machines. The systems that followed are loosely called <strong>NoSQL</strong> ("not only SQL"). They fall into four families:</p>
<ul>
<li><strong>Key-value stores</strong> (Redis, Amazon DynamoDB, RocksDB): a giant dictionary with <code>get</code>, <code>put</code> and <code>delete</code> by key, and nothing else. The value is opaque to the store. Simple enough to partition across machines by hashing the key, and very fast. Used for caches, user sessions, shopping carts, and as the storage layer underneath other databases.</li>
<li><strong>Document stores</strong> (MongoDB, CouchDB): the value is a JSON-like document (CS 240 Lesson 6) that the store understands, so you can query and index fields inside it. One document typically holds a whole <em>aggregate</em>, such as an order with its customer details and line items, read and written together without joins. The cost is duplication (the customer's name is copied into each order, Lesson 4's denormalization) and weak support for queries across documents.</li>
<li><strong>Wide-column stores</strong> (Bigtable, Apache Cassandra, HBase): tables whose rows, sorted by key and split across machines, can each have different, sparse columns. Built for very high write rates and huge tables, such as sensor readings or message histories, read by key or key range.</li>
<li><strong>Graph databases</strong> (Neo4j): nodes and edges with properties, and a query language for traversals such as "friends of friends who live in Lima". Lesson 3's recursive CTEs can express these, but a graph store follows edges directly instead of joining.</li>
</ul>
<p>The boundaries have blurred. PostgreSQL and SQLite store and index JSON (SQLite's <code>json_extract(doc, '$.customer.name')</code> reads a field from a JSON string), while many NoSQL stores have added SQL-like languages and transactions. A different family, the <em>column-oriented</em> analytical databases (data warehouses, DuckDB), stores each column of a table separately, so a query that averages one column over a billion rows reads only that column: the right design for analysis, the wrong one for updating single rows.</p>
<p>Many key-value stores, including RocksDB and Cassandra's storage engine, use a <strong>log-structured merge tree</strong> (LSM tree) instead of a B+ tree: writes go to a sorted structure in memory (and to a log, for durability), which is written out as an immutable sorted file when it fills; background <em>compaction</em> merges these files. Writes become purely sequential, which is why such stores accept writes so fast, at the price of reads that may have to check several files.</p>

<h3>Replication, partitioning and CAP</h3>
<p><strong>Replication</strong> keeps copies of the data on several machines, for durability (a dead disk loses nothing), availability (another copy can serve requests) and read capacity. The usual design is <em>leader–follower</em>: one replica, the leader, accepts writes and ships its log to the followers, which replay it, the same log as recovery uses. If the leader waits for followers to confirm before reporting a commit (<em>synchronous</em> replication), no committed write is lost when the leader dies, but every commit waits for the network. If it doesn't (<em>asynchronous</em>), commits are fast, but followers lag behind, so a read from a follower may return stale data, and the last few commits may be lost in a failover. <strong>Partitioning</strong> (sharding) splits the data across machines, by ranges of the key or by its hash, so that each holds a part; a transaction touching several partitions then needs a coordination protocol such as two-phase commit, the subject of a later course on distributed systems.</p>
<p>A network can fail so that the replicas are split into groups that can't reach each other, a <strong>partition</strong> (a network partition, not a data partition as in sharding). The <strong>CAP theorem</strong> (conjectured by Eric Brewer in 2000, proved by Seth Gilbert and Nancy Lynch in 2002) says that during a partition a replicated system cannot be both <em>consistent</em> (every read returns the latest write, as if there were one copy; not the C of ACID from Lesson 7) and <em>available</em> (every request to a working replica gets an answer). A replica cut off from the latest writes must either refuse to answer (choosing consistency) or answer with possibly stale data (choosing availability). When there is no partition, both are possible, and the everyday trade-off is between consistency and latency. Dynamo-style stores choose availability and <em>eventual consistency</em>: replicas may disagree for a while but converge once updates stop. They let each application tune this with quorums: with <em>N</em> copies, a write waits for <em>W</em> of them and a read asks <em>R</em>, and if <em>R</em> + <em>W</em> &gt; <em>N</em> (for example <em>N</em> = 3, <em>W</em> = 2, <em>R</em> = 2), every read set overlaps every write set, so a read sees the latest acknowledged write.</p>

<h3>Choosing a store</h3>
<p>Start with a relational database. PostgreSQL (or SQLite, for one application on one machine) gives transactions, constraints, ad hoc queries and joins, and a single machine handles far more than most applications ever need. Reach for something else when a specific need outweighs those guarantees:</p>
<table>
<tr><th>Need</th><th>Good fit</th></tr>
<tr><td>Data with relationships, changing queries, correctness that matters (money, grades, inventory)</td><td>Relational</td></tr>
<tr><td>A cache or session store: lookups by key, extreme speed, losing data is tolerable</td><td>Key-value (in memory)</td></tr>
<tr><td>Self-contained records of varied shape, read and written whole</td><td>Document, or JSON columns in a relational database</td></tr>
<tr><td>Enormous write rates of data read back by key and time range</td><td>Wide-column or LSM-based key-value</td></tr>
<tr><td>Queries that follow many links (recommendations, fraud rings)</td><td>Graph</td></tr>
<tr><td>Aggregates over billions of rows for analysis</td><td>Column-oriented warehouse</td></tr>
</table>
<p class="note">Why it matters: every store makes the same trade-offs this course has studied (what is stored once or copied, what is indexed, what is locked or versioned, what is logged and when) in different proportions. Knowing them lets you read a database's documentation and see what it promises, and what it doesn't.</p>
`,
      terms: [
        ["Steal / no-steal", "Whether the buffer pool may write a page changed by an uncommitted transaction to disk; steal requires undo."],
        ["Force / no-force", "Whether all of a transaction's changed pages must reach disk at commit; no-force requires redo."],
        ["Log", "An append-only file of records describing every change, with old and new values."],
        ["Log sequence number (LSN)", "A log record's position in the log, used to order records and to mark which updates a page contains."],
        ["Write-ahead logging (WAL)", "The rules that a change's log record reaches disk before the changed page, and a commit record before the commit is reported."],
        ["Redo", "Reapplying logged new values after a crash, so committed changes not yet on disk are restored."],
        ["Undo", "Restoring logged old values to remove the changes of transactions that didn't commit."],
        ["Compensation log record (CLR)", "A log record of an undo action, so undo is not repeated after another crash."],
        ["Checkpoint", "A point recorded in the log that limits how far back recovery must read."],
        ["ARIES", "A widely used recovery algorithm with fuzzy checkpoints, page LSNs and analysis, redo and undo passes."],
        ["NoSQL", "A loose name for non-relational databases: key-value, document, wide-column and graph stores."],
        ["Document store", "A database whose records are JSON-like documents whose fields it can query and index."],
        ["LSM tree", "A log-structured merge tree: writes collect in memory and are written as sorted files that are merged in the background."],
        ["Replication", "Keeping copies of data on several machines; leader–follower replication ships the leader's log to followers."],
        ["Partitioning (sharding)", "Splitting data across machines by key range or key hash."],
        ["CAP theorem", "During a network partition, a replicated system must choose between consistency and availability."],
        ["Eventual consistency", "The guarantee that replicas converge to the same value once updates stop."],
        ["Quorum", "The number of replicas that must answer a read (R) or write (W); R + W > N makes reads see the latest acknowledged write."]
      ],
      quiz: [
        { q: "Why does a steal policy require undo during recovery?", choices: ["Committed data may be missing from disk", "Uncommitted changes may have been written to disk", "The log may be lost", "Pages may be written twice"], answer: 1, why: "Stolen pages carry changes of transactions that may never commit." },
        { q: "Under write-ahead logging, when is a transaction committed?", choices: ["When all its pages are on disk", "When its commit record is on disk", "When it releases its locks", "At the next checkpoint"], answer: 1, why: "Then redo can restore all its changes even if no data page was written." },
        { q: "The log holds &lt;T1, X, 5, 8&gt;, &lt;T1 COMMIT&gt;, &lt;T2, X, 8, 3&gt;, then a crash. After recovery, X is …", choices: ["3", "5", "8", "unknown"], answer: 2, why: "Redo sets 8 then 3; T2 is a loser, so undo restores its old value 8." },
        { q: "Why does undo go backward through the log?", choices: ["It's faster", "So that an item changed several times ends with the value it had before the losers' first change to it", "Because redo went forward", "It doesn't matter"], answer: 1, why: "Restoring in reverse order unwinds the changes layer by layer, like popping a stack; going forward would leave an intermediate value." },
        { q: "What does the CAP theorem say?", choices: ["A database can't have all of ACID", "During a network partition, a replicated system must give up either consistency or availability", "Consistent systems are slow", "NoSQL is faster than SQL"], answer: 1, why: "A cut-off replica must refuse to answer or risk answering with stale data." },
        { q: "With N = 5 replicas, which quorum guarantees that reads see the latest acknowledged write?", choices: ["W = 2, R = 2", "W = 3, R = 3", "W = 1, R = 3", "W = 2, R = 3"], answer: 1, why: "Only R + W = 6 > 5 forces every read set to overlap every write set." }
      ],
      practice: [
        {
          q: `<p>Recover from this log after a crash, with the disk holding A = 1, B = 2, C = 3, D = 4 (every value as it was before the log began): <code>BEGIN T1; T1: A 1→5; BEGIN T2; T2: B 2→6; T1: C 3→7; COMMIT T1; BEGIN T3; T3: D 4→8; T2: A 5→9; COMMIT T3</code>. Give the redo and undo steps and the final values.</p>`,
          a: `<p>Redo, forward: A = 5, B = 6, C = 7, D = 8, A = 9. Committed: T1 and T3; loser: T2. Undo T2 backward: A back to 5, then B back to 2. Final: A = 5, B = 2, C = 7, D = 8.</p>
<pre><code>log2 = [("BEGIN", "T1"), ("UPDATE", "T1", "A", 1, 5), ("BEGIN", "T2"),
        ("UPDATE", "T2", "B", 2, 6), ("UPDATE", "T1", "C", 3, 7), ("COMMIT", "T1"),
        ("BEGIN", "T3"), ("UPDATE", "T3", "D", 4, 8), ("UPDATE", "T2", "A", 5, 9),
        ("COMMIT", "T3")]
print(recover(log2, {"A": 1, "B": 2, "C": 3, "D": 4})[0])   # {'A': 5, 'B': 2, 'C': 7, 'D': 8}</code></pre>`
        },
        {
          q: `<p>A system uses "no steal, no force". Which of redo and undo does recovery need? Why is this combination rarely used?</p>`,
          a: `<p>No steal means no uncommitted change ever reaches disk, so undo is unnecessary. No force means committed changes may still be only in memory at a crash, so redo is needed: the log must hold new values. It is rarely used because no steal means every page an active transaction has changed must stay in memory until it commits, so a large transaction (an update of every row of a big table) could exhaust the buffer pool.</p>`
        },
        {
          q: `<p>An online shop stores products, customers, orders and payments, and wants a product page to show "customers who bought this also bought". Which parts would you keep in a relational database, and might anything go elsewhere? Justify each choice briefly.</p>`,
          a: `<p>Orders, payments, customers and stock belong in a relational database: they are related (orders reference customers and products), must be correct (a payment must not be lost or applied twice, which needs transactions), and support many queries (sales reports). "Also bought" can start as a SQL query over orders (a self-join on order lines, grouped and counted); if it grows heavy, precompute it nightly into a table, or into a key-value store or cache keyed by product id, where slightly stale results are fine. A graph database would suit it only if recommendations needed deeper traversals. Session data and the product-page cache can go in an in-memory key-value store, since losing them is harmless.</p>`
        },
        {
          q: `<p>A store keeps N = 3 replicas with W = 1 and R = 1. Describe how a client can write a value and then read an older one, even with no failures. Which settings would prevent it, and what do they cost?</p>`,
          a: `<p>The write is acknowledged after reaching one replica, say replica 1; the others receive it a little later. An immediate read that asks only replica 2 returns the old value, since R + W = 2 is not more than N = 3 and the read and write sets need not overlap. W = 2, R = 2 (or W = 3, R = 1, or W = 1, R = 3) guarantees overlap. The cost is latency (waiting for the slower of two or three replicas) and availability: with W = 3, a single unreachable replica blocks every write.</p>`
        }
      ],
      sources: ["mohan92", "dbsc", "cmu15445", "sqlitedocs", "dynamo07", "brewer12"]
    }
  ]
});

CSA.addAsides("cs340", {
  db1: [
    { kind: "history", title: "Codd's paper and the race to build it", html: `<p>In 1970 most databases were <em>navigational</em>: programs followed pointers from record to record, so every query was written against the physical layout, and reorganizing the data broke the programs. Edgar F. Codd, a mathematician at IBM's San Jose research laboratory, proposed describing data as mathematical relations and querying it with logic, leaving the path to the data to the system. IBM was slow to embrace the idea, partly to protect its successful navigational product, IMS. Two research projects set out to show it could be fast: IBM's System R (1974–1979), which produced SQL and the cost-based optimizer of Lesson 6, and Ingres at Berkeley, led by Michael Stonebraker and Eugene Wong. A small company that later renamed itself Oracle read the System R papers and shipped the first commercial SQL database in 1979, ahead of IBM. Codd received the Turing Award in 1981 and Stonebraker in 2014; Stonebraker's later Berkeley project, Postgres, became today's PostgreSQL.</p>`, sources: ["codd70", "redbook"] }
  ],
  db2: [
    { kind: "lang", title: "SEQUEL, SQL and the standard", html: `<p>Donald Chamberlin and Raymond Boyce designed the language for System R in 1974 and called it SEQUEL, "Structured English Query Language", aiming for something non-programmers could read. The name was changed to SQL because SEQUEL was already a trademark of a British aircraft company, which is why both "S-Q-L" and "sequel" are still heard. SQL became an ANSI standard in 1986 and an ISO standard in 1987, and has grown with each revision: recursive queries in SQL:1999, window functions in SQL:2003, JSON in SQL:2016. No database implements all of it, and each adds its own extensions, so SQL that runs unchanged on SQLite, PostgreSQL and MySQL sticks to the common core this course uses.</p>`, sources: ["dbsc", "sqlitedocs"] }
  ],
  db5: [
    { kind: "practice", title: "The most widely deployed database", html: `<p>SQLite is in every Android and iOS device, every major web browser, and countless applications, from desktop programs to embedded devices; its developers believe it is used more than all other database engines combined. It was written by D. Richard Hipp in 2000 and placed in the public domain. Its reliability comes from testing on a scale few projects attempt: as of version 3.42 (2023), the library was about 156,000 lines of C, and the project had 590 times as much test code, achieving 100% branch coverage and simulating crashes and power failures in the middle of writes to check that the database always recovers. CS 240 Lesson 3's coverage and mutation testing, taken to their limit.</p>`, sources: ["sqlitedocs"] }
  ],
  db8: [
    { kind: "ethics", title: "Deleting data is harder than it looks", html: `<p>Privacy laws such as the EU's GDPR give people a "right to erasure": in many circumstances an organization must delete their personal data on request. In a database, <code>DELETE</code> removes a row from the table, but copies remain. The write-ahead log holds its old values; replicas hold their own copies; backups taken last month hold the row as it was; and the page it lived on may still contain its bytes until they are overwritten (SQLite's <code>PRAGMA secure_delete</code> zeroes deleted content for this reason). Honest systems decide in advance how long logs and backups are kept, so that deleted data really disappears within a stated time, and some encrypt each person's data with their own key and delete the key on request ("crypto-shredding"), which makes every remaining copy unreadable at once. Designing for deletion is far easier than retrofitting it, and it is a question to ask at the ER-model stage: what personal data do we really need to keep, and for how long?</p>`, sources: ["gdpr", "sqlitedocs"] }
  ]
});
