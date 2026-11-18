/* Program structure, the source registry, and the empty course table.
   Each course's content lives in its own file (data/<id>.js) and registers
   itself with CSA.addCourse(). */
window.CSA = {
  program: {
    name: "First Principles CS",
    degree: "B.S. Computer Science",
    /* languages: which programming languages a term's code examples, explanations and quizzes
       use. Year 1 is taught in Python only. A term (or a course, with its own languages
       field) listing several shows the language switcher. Default: Python, Java and C++. */
    terms: [
      { id: "y1f", year: 1, term: "Fall", theme: "Foundations", open: true, languages: ["python"],
        courses: ["cs101", "math120", "math130", "cs100", "writ100"] },
      { id: "y1s", year: 1, term: "Spring", theme: "Foundations", open: true, languages: ["python"],
        courses: ["cs102", "math121", "math131", "phys150"] },
      { id: "y2f", year: 2, term: "Fall", theme: "Core systems & theory", open: true, languages: ["python"],
        courses: ["cs201", "cs210", "math220", "math230"] },
      { id: "y2s", year: 2, term: "Spring", theme: "Core systems & theory", open: true, languages: ["python"],
        courses: ["cs220", "cs230", "cs240", "phys250"] },
      { id: "y3f", year: 3, term: "Fall", theme: "Upper-level core",
        planned: ["Operating Systems", "Theory of Computation", "Databases", "Track elective"] },
      { id: "y3s", year: 3, term: "Spring", theme: "Upper-level core",
        planned: ["Computer Networks", "Programming Languages", "Intro to AI & ML", "Security Fundamentals", "Track elective"] },
      { id: "y4f", year: 4, term: "Fall", theme: "Depth & synthesis",
        planned: ["Distributed Systems", "Capstone I", "Track electives ×2", "Free elective"] },
      { id: "y4s", year: 4, term: "Spring", theme: "Depth & synthesis",
        planned: ["Capstone II / Thesis", "Ethics, Law & Policy of Computing", "Track elective", "Free electives"] }
    ]
  },

  /* Every reference cited anywhere on the site. Licenses are listed only
     where the source states one on its own page. */
  sources: {
    mit6100l: { title: "6.100L Introduction to CS and Programming Using Python (Fall 2022)", author: "Ana Bell, MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/", license: "CC BY-NC-SA 4.0", kind: "Course" },
    thinkpython: { title: "Think Python, 3rd edition", author: "Allen B. Downey", url: "https://allendowney.github.io/ThinkPython/", license: "CC BY-NC-SA 4.0", kind: "Textbook" },
    pytutorial: { title: "The Python Tutorial", author: "Python Software Foundation", url: "https://docs.python.org/3/tutorial/", license: "PSF documentation license", kind: "Reference" },
    cs50p: { title: "CS50's Introduction to Programming with Python", author: "David J. Malan, Harvard University", url: "https://cs50.harvard.edu/python/", license: "", kind: "Course" },
    missing: { title: "The Missing Semester of Your CS Education", author: "Anish Athalye, Jon Gjengset, Jose Javier Gonzalez Ortiz, MIT", url: "https://missing.csail.mit.edu/", license: "CC BY-NC-SA", kind: "Course" },
    mcs: { title: "Mathematics for Computer Science (6.042J, Spring 2015)", author: "Eric Lehman, F. Thomson Leighton, Albert R. Meyer, MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/", license: "CC BY-NC-SA 4.0", kind: "Course & textbook" },
    levin: { title: "Discrete Mathematics: An Open Introduction", author: "Oscar Levin", url: "https://discrete.openmathbooks.org/", license: "CC BY-NC-SA 4.0", kind: "Textbook" },
    forallx: { title: "forall x: Calgary, An Introduction to Formal Logic", author: "P. D. Magnus, Tim Button, Robert Trueman, Richard Zach", url: "https://forallx.openlogicproject.org/", license: "CC BY 4.0", kind: "Textbook" },
    bookofproof: { title: "Book of Proof, 3rd edition", author: "Richard Hammack", url: "https://richardhammack.github.io/BookOfProof/", license: "Creative Commons (see site)", kind: "Textbook" },
    openstaxcalc: { title: "Calculus Volume 1", author: "Gilbert Strang, Edwin Herman, et al., OpenStax", url: "https://openstax.org/details/books/calculus-volume-1", license: "CC BY-NC-SA 4.0", kind: "Textbook" },
    eoc: { title: "Essence of Calculus (video series)", author: "Grant Sanderson, 3Blue1Brown", url: "https://www.3blue1brown.com/topics/calculus", license: "", kind: "Video" },
    acm: { title: "ACM Code of Ethics and Professional Conduct (2018)", author: "Association for Computing Machinery", url: "https://www.acm.org/code-of-ethics", license: "", kind: "Professional code" },
    sep: { title: "Computer and Information Ethics", author: "Terrell Bynum, Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/ethics-computer/", license: "", kind: "Encyclopedia entry" },
    chm: { title: "Timeline of Computer History", author: "Computer History Museum", url: "https://www.computerhistory.org/timeline/computers/", license: "", kind: "Reference" },
    nistrmf: { title: "AI Risk Management Framework (AI RMF 1.0)", author: "National Institute of Standards and Technology", url: "https://www.nist.gov/itl/ai-risk-management-framework", license: "U.S. government work", kind: "Framework" },
    gdpr: { title: "General Data Protection Regulation (full text)", author: "European Union, via gdpr-info.eu", url: "https://gdpr-info.eu/", license: "", kind: "Regulation" },
    hopl: { title: "History of Programming Languages conference (HOPL IV, 2021)", author: "ACM SIGPLAN", url: "https://hopl4.sigplan.org/", license: "", kind: "Conference papers" },
    pyhistory: { title: "The History of Python (blog)", author: "Guido van Rossum", url: "https://python-history.blogspot.com/", license: "", kind: "Primary source" },
    pep20: { title: "PEP 20: The Zen of Python", author: "Tim Peters", url: "https://peps.python.org/pep-0020/", license: "Public domain", kind: "Primary source" },
    dijkstra68: { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra, Communications of the ACM 11(3), 1968", url: "", license: "", kind: "Paper" },
    mccarthy60: { title: "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I", author: "John McCarthy, Communications of the ACM 3(4), 1960", url: "", license: "", kind: "Paper" },
    leveson93: { title: "An Investigation of the Therac-25 Accidents", author: "Nancy G. Leveson and Clark S. Turner, IEEE Computer 26(7), 1993", url: "", license: "", kind: "Paper" },
    gao92: { title: "Patriot Missile Defense: Software Problem Led to System Failure at Dhahran, Saudi Arabia (GAO/IMTEC-92-26)", author: "U.S. General Accounting Office, 1992", url: "https://www.gao.gov/products/imtec-92-26", license: "U.S. government work", kind: "Report" },
    ariane96: { title: "ARIANE 5 Flight 501 Failure: Report by the Inquiry Board", author: "J. L. Lions (chair), ESA/CNES, 1996", url: "", license: "", kind: "Report" },
    horizon: { title: "Post Office Horizon IT Inquiry", author: "UK public inquiry", url: "https://www.postofficehorizoninquiry.org.uk/", license: "", kind: "Public inquiry" },
    boole: { title: "An Investigation of the Laws of Thought (1854)", author: "George Boole, via Project Gutenberg", url: "https://www.gutenberg.org/ebooks/15114", license: "Public domain", kind: "Primary source" },
    shannon37: { title: "A Symbolic Analysis of Relay and Switching Circuits (1937 thesis)", author: "Claude E. Shannon, MIT DSpace", url: "https://dspace.mit.edu/handle/1721.1/11173", license: "", kind: "Primary source" },
    sepboole: { title: "George Boole", author: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/boole/", license: "", kind: "Encyclopedia entry" },
    seprussell: { title: "Russell's Paradox", author: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/russell-paradox/", license: "", kind: "Encyclopedia entry" },
    sel4: { title: "The seL4 Microkernel", author: "seL4 Foundation", url: "https://sel4.systems/", license: "", kind: "Project" },
    mactutorcalc: { title: "The Rise of Calculus", author: "MacTutor History of Mathematics, University of St Andrews", url: "https://mathshistory.st-andrews.ac.uk/HistTopics/The_rise_of_calculus/", license: "", kind: "History" },
    eniac: { title: "The ENIAC Programmers Project", author: "Kathy Kleiman", url: "https://eniacprogrammers.org/", license: "", kind: "History" },
    chmrev: { title: "Revolution: The First 2000 Years of Computing", author: "Computer History Museum", url: "https://www.computerhistory.org/revolution", license: "", kind: "Online exhibit" },
    propublica: { title: "Machine Bias", author: "Julia Angwin, Jeff Larson, Surya Mattu, Lauren Kirchner, ProPublica (2016)", url: "https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing", license: "", kind: "Investigative report" },
    gendershades: { title: "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification", author: "Joy Buolamwini and Timnit Gebru, FAT* 2018", url: "https://proceedings.mlr.press/v81/buolamwini18a.html", license: "", kind: "Paper" },
    wcag: { title: "Web Content Accessibility Guidelines (WCAG)", author: "W3C Web Accessibility Initiative", url: "https://www.w3.org/WAI/standards-guidelines/wcag/", license: "", kind: "Standard" },
    euaiact: { title: "EU Artificial Intelligence Act (text and explorer)", author: "Future of Life Institute, artificialintelligenceact.eu", url: "https://artificialintelligenceact.eu/", license: "", kind: "Regulation" },
    composing: { title: "Composing Programs", author: "John DeNero, UC Berkeley (based on Structure and Interpretation of Computer Programs)", url: "https://www.composingprograms.com/", license: "CC BY-SA 3.0", kind: "Textbook" },
    pythonds: { title: "Problem Solving with Algorithms and Data Structures using Python", author: "Brad Miller and David Ranum, Runestone Academy", url: "https://runestone.academy/ns/books/published/pythonds3/index.html", license: "CC BY-NC-SA 4.0", kind: "Textbook" },
    pytestdocs: { title: "pytest documentation", author: "Holger Krekel and pytest-dev team", url: "https://docs.pytest.org/", license: "MIT", kind: "Reference" },
    kay93: { title: "The Early History of Smalltalk", author: "Alan C. Kay, HOPL-II, ACM SIGPLAN Notices 28(3), 1993", url: "", license: "", kind: "Paper" },
    liskov87: { title: "Data Abstraction and Hierarchy (OOPSLA '87 keynote)", author: "Barbara Liskov, ACM SIGPLAN Notices 23(5), 1988", url: "", license: "", kind: "Paper" },
    osi: { title: "Open Source Initiative: licenses and the Open Source Definition", author: "Open Source Initiative", url: "https://opensource.org/licenses", license: "CC BY 4.0", kind: "Reference" },
    xzcve: { title: "CVE-2024-3094 (xz utils backdoor)", author: "NIST National Vulnerability Database", url: "https://nvd.nist.gov/vuln/detail/CVE-2024-3094", license: "U.S. government work", kind: "Advisory" },
    grinstead: { title: "Introduction to Probability", author: "Charles M. Grinstead and J. Laurie Snell", url: "https://math.dartmouth.edu/~prob/prob/prob.pdf", license: "GNU FDL", kind: "Textbook" },
    keller: { title: "Applied Combinatorics", author: "Mitchel T. Keller and William T. Trotter", url: "https://www.appliedcombinatorics.org/", license: "CC BY-SA 4.0", kind: "Textbook" },
    openstaxcalc2: { title: "Calculus Volume 2", author: "Gilbert Strang, Edwin Herman, et al., OpenStax", url: "https://openstax.org/details/books/calculus-volume-2", license: "CC BY-NC-SA 4.0", kind: "Textbook" },
    openstaxcalc3: { title: "Calculus Volume 3", author: "Gilbert Strang, Edwin Herman, et al., OpenStax", url: "https://openstax.org/details/books/calculus-volume-3", license: "CC BY-NC-SA 4.0", kind: "Textbook" },
    mactutorseries: { title: "An overview of the history of mathematics: infinite series and Euler", author: "MacTutor History of Mathematics, University of St Andrews", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Euler/", license: "", kind: "History" },
    openstaxphys: { title: "University Physics Volume 1", author: "William Moebs, Samuel J. Ling, Jeff Sanny, OpenStax", url: "https://openstax.org/details/books/university-physics-volume-1", license: "CC BY 4.0", kind: "Textbook" },
    feynman: { title: "The Feynman Lectures on Physics, Volume I", author: "Richard P. Feynman, Robert B. Leighton, Matthew Sands, Caltech", url: "https://www.feynmanlectures.caltech.edu/I_toc.html", license: "", kind: "Textbook" },
    newton1687: { title: "Philosophiæ Naturalis Principia Mathematica (1687), English translation by Andrew Motte (1729)", author: "Isaac Newton, via Wikisource", url: "https://en.wikisource.org/wiki/The_Mathematical_Principles_of_Natural_Philosophy_(1729)", license: "Public domain", kind: "Primary source" },
    nasahidden: { title: "Katherine Johnson biography", author: "NASA", url: "https://www.nasa.gov/people/katherine-johnson/", license: "U.S. government work", kind: "Biography" },
    googletw: { title: "Technical Writing One and Two (courses)", author: "Google for Developers", url: "https://developers.google.com/tech-writing", license: "", kind: "Course" },
    diataxis: { title: "Diátaxis: a systematic approach to technical documentation", author: "Daniele Procida", url: "https://diataxis.fr/", license: "", kind: "Guide" },
    writethedocs: { title: "A beginner's guide to writing documentation, and the Write the Docs guide", author: "Write the Docs community", url: "https://www.writethedocs.org/guide/", license: "CC BY-NC-SA 4.0", kind: "Guide" },
    beams: { title: "How to Write a Git Commit Message", author: "Chris Beams (2014)", url: "https://cbea.ms/git-commit/", license: "", kind: "Article" },
    tatham: { title: "How to Report Bugs Effectively", author: "Simon Tatham (1999)", url: "https://www.chiark.greenend.org.uk/~sgtatham/bugs.html", license: "", kind: "Article" },
    engprac: { title: "Google Engineering Practices: How to do a code review", author: "Google", url: "https://google.github.io/eng-practices/review/reviewer/", license: "", kind: "Guide" },
    designdocs: { title: "Design Docs at Google", author: "Malte Ubl, Industrial Empathy (2020)", url: "https://www.industrialempathy.com/posts/design-docs-at-google/", license: "", kind: "Article" },
    gopen90: { title: "The Science of Scientific Writing", author: "George D. Gopen and Judith A. Swan, American Scientist 78(6), 1990", url: "https://www.americanscientist.org/blog/the-long-view/the-science-of-scientific-writing", license: "", kind: "Article" },
    orwell46: { title: "Politics and the English Language (1946)", author: "George Orwell, via the Orwell Foundation", url: "https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/", license: "", kind: "Essay" },
    strunk: { title: "The Elements of Style (1918 edition)", author: "William Strunk Jr., via Project Gutenberg", url: "https://www.gutenberg.org/ebooks/37134", license: "Public domain", kind: "Primary source" },
    plainlang: { title: "Federal Plain Language Guidelines", author: "Plain Language Action and Information Network (PLAIN)", url: "https://www.plainlanguage.gov/guidelines/", license: "U.S. government work", kind: "Guidelines" },
    sift: { title: "SIFT (The Four Moves)", author: "Mike Caulfield (2019)", url: "https://hapgood.us/2019/06/19/sift-the-four-moves/", license: "CC BY 4.0", kind: "Article" },
    purdueowl: { title: "Purdue OWL: Research and Citation Resources", author: "Purdue University Online Writing Lab", url: "https://owl.purdue.edu/owl/research_and_citation/resources.html", license: "", kind: "Reference" },
    ieeeref: { title: "IEEE Reference Guide", author: "IEEE Author Center", url: "https://ieeeauthorcenter.ieee.org/wp-content/uploads/IEEE-Reference-Guide.pdf", license: "", kind: "Style guide" },
    knuth84: { title: "Literate Programming", author: "Donald E. Knuth, The Computer Journal 27(2), 1984", url: "", license: "", kind: "Paper" },
    caib: { title: "Columbia Accident Investigation Board Report, Volume I (2003)", author: "Columbia Accident Investigation Board", url: "", license: "U.S. government work", kind: "Report" },
    clrs: { title: "Introduction to Algorithms, 4th edition", author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein (MIT Press, 2022)", url: "", license: "", kind: "Textbook" },
    odsds: { title: "Open Data Structures", author: "Pat Morin", url: "https://opendatastructures.org/", license: "", kind: "Textbook" },
    sedgewick: { title: "Algorithms, 4th edition (booksite)", author: "Robert Sedgewick and Kevin Wayne, Princeton University", url: "https://algs4.cs.princeton.edu/home/", license: "", kind: "Textbook" },
    pep456: { title: "PEP 456: Secure and interchangeable hash algorithm", author: "Christian Heimes (2013)", url: "https://peps.python.org/pep-0456/", license: "Public domain", kind: "Primary source" },
    timsort: { title: "listsort.txt: the design of Python's sort (Timsort)", author: "Tim Peters, CPython source", url: "https://github.com/python/cpython/blob/main/Objects/listsort.txt", license: "", kind: "Primary source" },
    csapp: { title: "Computer Systems: A Programmer's Perspective, 3rd edition", author: "Randal E. Bryant and David R. O'Hallaron (Pearson, 2015)", url: "https://csapp.cs.cmu.edu/", license: "", kind: "Textbook" },
    cppref: { title: "C reference", author: "cppreference.com", url: "https://en.cppreference.com/w/c", license: "", kind: "Reference" },
    goldberg91: { title: "What Every Computer Scientist Should Know About Floating-Point Arithmetic", author: "David Goldberg, ACM Computing Surveys 23(1), 1991 (reprinted by Oracle)", url: "https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html", license: "", kind: "Paper" },
    kr: { title: "The C Programming Language, 2nd edition", author: "Brian W. Kernighan and Dennis M. Ritchie (Prentice Hall, 1988)", url: "", license: "", kind: "Textbook" },
    patthen: { title: "Computer Organization and Design: The Hardware/Software Interface", author: "David A. Patterson and John L. Hennessy (Morgan Kaufmann)", url: "", license: "", kind: "Textbook" },
    aleph1: { title: "Smashing the Stack for Fun and Profit", author: "Aleph One, Phrack 49 (1996)", url: "http://phrack.org/issues/49/14.html", license: "", kind: "Article" },
    ostep: { title: "Operating Systems: Three Easy Pieces", author: "Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/", license: "", kind: "Textbook" },
    mit1806: { title: "18.06SC Linear Algebra (Fall 2011)", author: "Gilbert Strang, MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/", license: "CC BY-NC-SA 4.0", kind: "Course" },
    ila: { title: "Interactive Linear Algebra", author: "Dan Margalit and Joseph Rabinoff, Georgia Tech", url: "https://textbooks.math.gatech.edu/ila/", license: "GNU FDL", kind: "Textbook" },
    eola: { title: "Essence of Linear Algebra (video series)", author: "Grant Sanderson, 3Blue1Brown", url: "https://www.3blue1brown.com/topics/linear-algebra", license: "", kind: "Video" },
    pagerank98: { title: "The Anatomy of a Large-Scale Hypertextual Web Search Engine", author: "Sergey Brin and Lawrence Page, WWW7 (1998)", url: "http://infolab.stanford.edu/~backrub/google.html", license: "", kind: "Paper" },
    mit1805: { title: "18.05 Introduction to Probability and Statistics (Spring 2022)", author: "Jeremy Orloff and Jennifer French Kamrin, MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/", license: "CC BY-NC-SA 4.0", kind: "Course" },
    graham02: { title: "A Plan for Spam", author: "Paul Graham (2002)", url: "https://paulgraham.com/spam.html", license: "", kind: "Essay" },
    openintro: { title: "OpenIntro Statistics, 4th edition", author: "David Diez, Mine Çetinkaya-Rundel, Christopher Barr", url: "https://www.openintro.org/book/os/", license: "", kind: "Textbook" },
    anscombe73: { title: "Graphs in Statistical Analysis", author: "F. J. Anscombe, The American Statistician 27(1), 1973", url: "", license: "", kind: "Paper" },
    seeingtheory: { title: "Seeing Theory: a visual introduction to probability and statistics", author: "Daniel Kunin et al., Brown University", url: "https://seeing-theory.brown.edu/", license: "", kind: "Interactive" },
    efron79: { title: "Bootstrap Methods: Another Look at the Jackknife", author: "Bradley Efron, The Annals of Statistics 7(1), 1979", url: "", license: "", kind: "Paper" },
    asa16: { title: "The ASA Statement on p-Values: Context, Process, and Purpose", author: "Ronald L. Wasserstein and Nicole A. Lazar, The American Statistician 70(2), 2016", url: "https://www.tandfonline.com/doi/full/10.1080/00031305.2016.1154108", license: "", kind: "Statement" },
    kleinberg: { title: "Algorithm Design", author: "Jon Kleinberg and Éva Tardos, Pearson, 2005 (lecture slides by Kevin Wayne)", url: "https://www.cs.princeton.edu/~wayne/kleinberg-tardos/", license: "", kind: "Textbook" },
    jeffe: { title: "Algorithms", author: "Jeff Erickson, University of Illinois, 2019", url: "https://jeffe.cs.illinois.edu/teaching/algorithms/", license: "CC BY 4.0", kind: "Textbook" },
    hh: { title: "Digital Design and Computer Architecture, RISC-V Edition", author: "Sarah L. Harris and David Harris, Morgan Kaufmann, 2021", url: "https://pages.hmc.edu/harris/ddca/", license: "", kind: "Textbook" },
    nand2tetris: { title: "The Elements of Computing Systems (Nand to Tetris)", author: "Noam Nisan and Shimon Schocken", url: "https://www.nand2tetris.org/", license: "", kind: "Course" },
    riscvspec: { title: "The RISC-V Instruction Set Manual, Volume I: Unprivileged Architecture", author: "RISC-V International", url: "https://github.com/riscv/riscv-isa-manual", license: "CC BY 4.0", kind: "Specification" },
    swebook: { title: "Guide to the Software Engineering Body of Knowledge (SWEBOK)", author: "IEEE Computer Society", url: "https://www.computer.org/education/bodies-of-knowledge/software-engineering", license: "", kind: "Reference" },
    agilemanifesto: { title: "Manifesto for Agile Software Development", author: "Kent Beck and others, 2001", url: "https://agilemanifesto.org/", license: "", kind: "Primary source" },
    progit: { title: "Pro Git, 2nd edition", author: "Scott Chacon and Ben Straub", url: "https://git-scm.com/book/en/v2", license: "CC BY-NC-SA 3.0", kind: "Textbook" },
    hypothesisdocs: { title: "Hypothesis documentation", author: "David R. MacIver and Hypothesis contributors", url: "https://hypothesis.readthedocs.io/", license: "MPL 2.0", kind: "Reference" },
    fowler: { title: "Refactoring: Improving the Design of Existing Code, 2nd edition", author: "Martin Fowler, Addison-Wesley, 2018", url: "https://martinfowler.com/books/refactoring.html", license: "", kind: "Book" },
    ousterhout: { title: "A Philosophy of Software Design", author: "John Ousterhout, Yaknyam Press, 2018", url: "https://web.stanford.edu/~ouster/cgi-bin/book.php", license: "", kind: "Book" },
    gof: { title: "Design Patterns: Elements of Reusable Object-Oriented Software", author: "Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides, Addison-Wesley, 1994", url: "https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-9780201633610", license: "", kind: "Book" },
    norvig96: { title: "Design Patterns in Dynamic Languages (1996 talk)", author: "Peter Norvig", url: "https://norvig.com/design-patterns/", license: "", kind: "Talk" },
    rfc9110: { title: "RFC 9110: HTTP Semantics", author: "R. Fielding, M. Nottingham and J. Reschke, IETF, 2022", url: "https://www.rfc-editor.org/rfc/rfc9110", license: "", kind: "Specification" },
    rfc8259: { title: "RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format", author: "T. Bray, IETF, 2017", url: "https://www.rfc-editor.org/rfc/rfc8259", license: "", kind: "Specification" },
    semver: { title: "Semantic Versioning 2.0.0", author: "Tom Preston-Werner", url: "https://semver.org/", license: "CC BY 3.0", kind: "Specification" },
    ghactions: { title: "GitHub Actions documentation", author: "GitHub", url: "https://docs.github.com/en/actions", license: "CC BY 4.0", kind: "Reference" },
    mypydocs: { title: "mypy documentation", author: "The mypy project", url: "https://mypy.readthedocs.io/", license: "MIT", kind: "Reference" },
    pyast: { title: "ast: Abstract Syntax Trees (Python documentation)", author: "Python Software Foundation", url: "https://docs.python.org/3/library/ast.html", license: "PSF", kind: "Reference" },
    srebook: { title: "Site Reliability Engineering: How Google Runs Production Systems", author: "Betsy Beyer, Chris Jones, Jennifer Petoff and Niall Richard Murphy, O'Reilly, 2016", url: "https://sre.google/sre-book/table-of-contents/", license: "", kind: "Book" },
    owasp: { title: "OWASP Top 10: 2021", author: "OWASP Foundation", url: "https://owasp.org/Top10/", license: "CC BY-SA 4.0", kind: "Reference" },
    openstaxphys2: { title: "University Physics Volume 2", author: "Samuel J. Ling, Jeff Sanny, William Moebs, OpenStax", url: "https://openstax.org/details/books/university-physics-volume-2", license: "CC BY 4.0", kind: "Textbook" },
    feynman2: { title: "The Feynman Lectures on Physics, Volume II", author: "Richard P. Feynman, Robert B. Leighton, Matthew Sands, Caltech", url: "https://www.feynmanlectures.caltech.edu/II_toc.html", license: "", kind: "Textbook" },
    faraday1832: { title: "Experimental Researches in Electricity (first series)", author: "Michael Faraday, Philosophical Transactions of the Royal Society 122, 1832", url: "https://doi.org/10.1098/rstl.1832.0006", license: "", kind: "Primary source" },
    maxwell1865: { title: "A Dynamical Theory of the Electromagnetic Field", author: "James Clerk Maxwell, Philosophical Transactions of the Royal Society 155, 1865", url: "https://doi.org/10.1098/rstl.1865.0008", license: "", kind: "Primary source" },
    yee66: { title: "Numerical Solution of Initial Boundary Value Problems Involving Maxwell's Equations in Isotropic Media", author: "Kane S. Yee, IEEE Transactions on Antennas and Propagation 14(3), 1966", url: "https://doi.org/10.1109/TAP.1966.1138693", license: "", kind: "Primary source" }
  },

  /* How a reader can get each source. open = openly licensed; pd = public domain or
     government work; free = free to read online, all rights reserved; library = journal
     article, usually through a library or the publisher. */
  access: {
    mit6100l: "open", thinkpython: "open", pytutorial: "open", cs50p: "free", missing: "open", mcs: "open",
    levin: "open", forallx: "open", bookofproof: "open", openstaxcalc: "open", eoc: "free", acm: "free",
    sep: "free", chm: "free", nistrmf: "pd", gdpr: "free", hopl: "library", pyhistory: "free", pep20: "pd",
    dijkstra68: "library", mccarthy60: "library", leveson93: "library", gao92: "pd", ariane96: "free",
    horizon: "free", boole: "pd", shannon37: "free", sepboole: "free", seprussell: "free", sel4: "free",
    mactutorcalc: "free", eniac: "free", chmrev: "free", propublica: "free", gendershades: "free",
    wcag: "free", euaiact: "free", composing: "open", pythonds: "open", pytestdocs: "open", kay93: "library",
    liskov87: "library", osi: "open", xzcve: "pd", grinstead: "open", keller: "open", openstaxcalc2: "open",
    openstaxcalc3: "open", mactutorseries: "free", openstaxphys: "open", feynman: "free", newton1687: "pd", nasahidden: "pd",
    googletw: "free", diataxis: "free", writethedocs: "open", beams: "free", tatham: "free", engprac: "free",
    designdocs: "free", gopen90: "free", orwell46: "free", strunk: "pd", plainlang: "pd", sift: "open", purdueowl: "free",
    ieeeref: "free", knuth84: "library", caib: "pd",
    clrs: "library", odsds: "open", sedgewick: "free", pep456: "pd", timsort: "free", csapp: "library", cppref: "free",
    goldberg91: "free", kr: "library", patthen: "library", aleph1: "free", ostep: "free", mit1806: "open", ila: "open",
    eola: "free", pagerank98: "free", mit1805: "open", graham02: "free", openintro: "free", anscombe73: "library",
    seeingtheory: "free", efron79: "library", asa16: "free",
    kleinberg: "library", jeffe: "open", hh: "library", nand2tetris: "free", riscvspec: "open",
    swebook: "free", agilemanifesto: "free", progit: "open", hypothesisdocs: "open", fowler: "library",
    ousterhout: "library", gof: "library", norvig96: "free", rfc9110: "free", rfc8259: "free", semver: "open",
    ghactions: "open", mypydocs: "open", pyast: "open", srebook: "free", owasp: "open",
    openstaxphys2: "open", feynman2: "free", faraday1832: "library", maxwell1865: "library", yee66: "library"
  },

  courses: {},
  addCourse(c) { c.optional = c.optional || []; c.units = c.units || []; this.courses[c.id] = c; },

  /* Append units to a course, in order. Lets a long course be written in several parts. */
  addUnits(courseId, units) { this.courses[courseId].units.push(...units); },

  /* Sidebars inside core units: { unitId: [{ kind, title, html, sources }] }.
     kind is one of: history, ethics, lang (language evolution), practice. */
  addAsides(courseId, byUnit) {
    const c = this.courses[courseId];
    for (const u of c.units) if (byUnit[u.id]) u.asides = (u.asides || []).concat(byUnit[u.id]);
  },

  /* Auto-graded programming problems: { unitId: [problem, ...] }. See data/cs101-code.js. */
  addCode(courseId, byUnit) {
    const c = this.courses[courseId];
    for (const u of c.units) if (byUnit[u.id]) u.code = (u.code || []).concat(byUnit[u.id]);
  },

  /* Optional lessons: same shape as a unit plus kind (history, ethics, deep). */
  addOptional(courseId, lessons) {
    const c = this.courses[courseId];
    c.optional = c.optional.concat(lessons);
  }
};
