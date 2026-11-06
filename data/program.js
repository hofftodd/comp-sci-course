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
      { id: "y1s", year: 1, term: "Spring", theme: "Foundations", languages: ["python"],
        planned: ["Programming II", "Discrete Mathematics II", "Calculus II & Multivariable", "Physics I or science"] },
      { id: "y2f", year: 2, term: "Fall", theme: "Core systems & theory",
        planned: ["Data Structures", "Computer Systems I", "Linear Algebra", "Probability & Statistics for CS"] },
      { id: "y2s", year: 2, term: "Spring", theme: "Core systems & theory",
        planned: ["Algorithms I", "Computer Architecture & Digital Logic", "Software Engineering I", "Science elective"] },
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
    euaiact: { title: "EU Artificial Intelligence Act (text and explorer)", author: "Future of Life Institute, artificialintelligenceact.eu", url: "https://artificialintelligenceact.eu/", license: "", kind: "Regulation" }
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
    wcag: "free", euaiact: "free"
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
