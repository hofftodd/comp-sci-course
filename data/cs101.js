CSA.addCourse({
  id: "cs101",
  code: "CS 101",
  title: "Programming I",
  credits: 4,
  kind: "required",
  term: "y1f",
  summary: "Learn to write, run, test and debug programs in Python. The course builds from values and expressions up to functions, recursion and collections, and ends with the everyday tools working programmers use.",
  prereqs: [],
  outcomes: [
    "Read and write Python programs that use variables, conditionals, loops and functions",
    "Break a problem into small functions with clear inputs and outputs",
    "Think recursively and recognize when recursion is the natural fit",
    "Choose between lists, tuples, dictionaries and sets for a task",
    "Write tests, read tracebacks, and debug methodically",
    "Work comfortably in a terminal with Git and a code editor"
  ],
  units: [
    {
      id: "u1",
      title: "Programs, values and expressions",
      minutes: 60,
      summary: "What a program is, how Python evaluates expressions, how variables name values, and how a program talks with its user through output and input.",
      notes: `
<p>A <strong>program</strong> is a precise sequence of instructions that a computer carries out. Python runs your program one statement at a time, top to bottom, unless a statement tells it to jump somewhere else.</p>

<h3>Values and types</h3>
<p>Every piece of data in Python is a <em>value</em>, and every value has a <em>type</em> that decides what you can do with it.</p>
<ul>
  <li><code>int</code>: whole numbers such as <code>42</code> or <code>-7</code>. Python integers have no fixed size limit.</li>
  <li><code>float</code>: numbers with a fractional part, such as <code>3.14</code>. They are stored in binary, so <code>0.1 + 0.2</code> gives <code>0.30000000000000004</code>.</li>
  <li><code>str</code>: text, written in quotes: <code>"hello"</code>.</li>
  <li><code>bool</code>: <code>True</code> or <code>False</code>.</li>
</ul>
<p>Use <code>type(x)</code> to ask Python what type a value has.</p>

<h3>Expressions and operators</h3>
<p>An <em>expression</em> is anything Python can reduce to a single value. Python follows standard precedence: <code>**</code> first, then <code>* / // %</code>, then <code>+ -</code>. Parentheses override it.</p>
<div class="multi">
<pre data-lang="python"><code>7 / 2     # 3.5   true division always gives a float
7 // 2    # 3     floor division
7 % 2     # 1     remainder
2 ** 10   # 1024  exponent
"ab" * 3  # 'ababab'</code></pre>
<pre data-lang="java"><code>7 / 2            // 3     both ints, so integer division
7 / 2.0          // 3.5   one double makes it true division
7 % 2            // 1     remainder
Math.pow(2, 10)  // 1024.0  (returns a double)
"ab".repeat(3)   // "ababab"</code></pre>
<pre data-lang="cpp"><code>7 / 2            // 3     both ints, so integer division
7 / 2.0          // 3.5   one double makes it true division
7 % 2            // 1     remainder
std::pow(2, 10)  // 1024  (returns a double, needs &lt;cmath&gt;)
std::string(3, 'a')  // "aaa"  (no built-in string repeat)</code></pre>
</div>
<p class="langnote" data-only="java cpp">Watch out: in Java and C++, dividing two integers throws away the fraction. Python changed <code>/</code> to always give a float in Python 3.</p>

<h3>Variables are names, not boxes</h3>
<p>The assignment <code>x = 5</code> makes the name <code>x</code> refer to the value <code>5</code>. Python evaluates the right side first, then binds the name. That is why <code>count = count + 1</code> works: the old value is read, one is added, and the name is pointed at the result.</p>
<div class="multi">
<pre data-lang="python"><code>price = 19.99
qty = 3
total = price * qty
print(f"Total: {total:.2f}")   # Total: 59.97</code></pre>
<pre data-lang="java"><code>double price = 19.99;   // Java needs a declared type
int qty = 3;
double total = price * qty;
System.out.printf("Total: %.2f%n", total);   // Total: 59.97</code></pre>
<pre data-lang="cpp"><code>double price = 19.99;   // C++ needs a declared type
int qty = 3;
double total = price * qty;
std::cout &lt;&lt; std::fixed &lt;&lt; std::setprecision(2)
          &lt;&lt; "Total: " &lt;&lt; total &lt;&lt; "\\n";   // Total: 59.97</code></pre>
</div>

<div class="callout"><strong>Mental model.</strong> When you read code, trace it. For each line, write down what each name refers to afterward. Tracing by hand is the single most useful skill you can build this term.</div>

<h3>Talking to the user: output and input</h3>
<p>Programs communicate with people through <em>output</em>, showing text, and <em>input</em>, reading what the user types. Every language provides a way to do both. Here is a complete program that asks two questions and replies. Choose your language at the top of the page.</p>
<div class="multi">
<pre data-lang="python"><code># greet.py
name = input("What's your name? ")
age = int(input("How old are you? "))
print(f"Hi {name}, next year you'll be {age + 1}.")</code></pre>
<pre data-lang="java"><code>// Greet.java
import java.util.Scanner;

public class Greet {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.print("What's your name? ");
        String name = in.nextLine();
        System.out.print("How old are you? ");
        int age = Integer.parseInt(in.nextLine());
        System.out.println("Hi " + name + ", next year you'll be " + (age + 1) + ".");
    }
}</code></pre>
<pre data-lang="cpp"><code>// greet.cpp
#include &lt;iostream&gt;
#include &lt;string&gt;

int main() {
    std::string name;
    int age;
    std::cout &lt;&lt; "What's your name? ";
    std::getline(std::cin, name);
    std::cout &lt;&lt; "How old are you? ";
    std::cin &gt;&gt; age;
    std::cout &lt;&lt; "Hi " &lt;&lt; name &lt;&lt; ", next year you'll be " &lt;&lt; age + 1 &lt;&lt; ".\\n";
}</code></pre>
</div>
<div data-only="python">
<p>Run it from a terminal, and the conversation looks like this (you type the parts after the question marks and press Enter):</p>
<pre data-label="Terminal"><code>$ python3 greet.py
What's your name? Ada
How old are you? 36
Hi Ada, next year you'll be 37.</code></pre>
</div>
<div data-only="java">
<p>Java is compiled before it runs. <code>javac</code> turns <code>Greet.java</code> into bytecode in <code>Greet.class</code>, and <code>java</code> runs it. You type the parts after the question marks and press Enter:</p>
<pre data-label="Terminal"><code>$ javac Greet.java
$ java Greet
What's your name? Ada
How old are you? 36
Hi Ada, next year you'll be 37.</code></pre>
<p>Since Java 11 you can also skip the separate compile step for a one-file program and run <code>java Greet.java</code> directly.</p>
</div>
<div data-only="cpp">
<p>C++ is compiled to a native program before it runs. <code>g++</code> (or <code>clang++</code>) produces an executable called <code>greet</code>, which you then run. The <code>-Wall</code> option turns on warnings, which catch many mistakes. You type the parts after the question marks and press Enter:</p>
<pre data-label="Terminal"><code>$ g++ -std=c++17 -Wall -o greet greet.cpp
$ ./greet
What's your name? Ada
How old are you? 36
Hi Ada, next year you'll be 37.</code></pre>
</div>

<h4>What happens when the program reads input</h4>
<div data-only="python">
<p>When Python reaches <code>input("What's your name? ")</code>, four things happen in order:</p>
<ol>
  <li>It prints the text you passed in, the <em>prompt</em>, without starting a new line.</li>
  <li>It <strong>pauses the program</strong> and waits. Nothing after that line runs yet.</li>
  <li>The user types and presses Enter.</li>
  <li><code>input()</code> <strong>returns</strong> what they typed, as a string, without the Enter at the end. Here that string is stored in <code>name</code>.</li>
</ol>
<p>The result is <em>always</em> a string, even if the user types digits. <code>"36"</code> is text, not the number 36, and <code>"36" + 1</code> is an error. That is why the program wraps the second call in <code>int(...)</code>, which converts text to an integer. Use <code>float(...)</code> for numbers with a decimal point. If the text is not a valid number, such as <code>"thirty"</code>, the conversion raises a <code>ValueError</code>; you will learn to handle that gracefully in Unit 6.</p>
<p><code>print()</code> works the other way: it takes values, turns them into text and writes them out, followed by a new line. The <code>f</code> before the quotes in the last line makes an <strong>f-string</strong>. Python evaluates each expression inside <code>{ }</code> and inserts the result into the text, so <code>{age + 1}</code> becomes <code>37</code>. (The <code>{total:.2f}</code> in the earlier price example works the same way; <code>:.2f</code> means "show two decimal places".)</p>
</div>
<div data-only="java">
<p>When the program reaches the first question, four things happen in order:</p>
<ol>
  <li><code>System.out.print(...)</code> shows the prompt. Unlike <code>println</code>, it does not start a new line, so the cursor waits right after the question.</li>
  <li><code>in.nextLine()</code> <strong>pauses the program</strong> and waits. Nothing after that line runs yet.</li>
  <li>The user types and presses Enter.</li>
  <li><code>nextLine()</code> <strong>returns</strong> what they typed as a <code>String</code>, without the line ending. Here it is stored in <code>name</code>.</li>
</ol>
<p>The reading is done by a <code>Scanner</code> object, created once with <code>new Scanner(System.in)</code>. <code>System.in</code> is the program's standard input, explained below.</p>
<p>The result of <code>nextLine()</code> is always a <code>String</code>, even if the user types digits. To get a number, the program passes the text to <code>Integer.parseInt(...)</code>; use <code>Double.parseDouble(...)</code> for numbers with a decimal point. If the text is not a valid number, such as <code>"thirty"</code>, <code>parseInt</code> throws a <code>NumberFormatException</code>, which you will learn to handle with <code>try</code> and <code>catch</code>.</p>
<p><code>Scanner</code> also has <code>nextInt()</code>, which reads a number directly. Mixing <code>nextInt()</code> with <code>nextLine()</code> is a classic beginner trap: <code>nextInt()</code> leaves the Enter key's line ending behind, so the next <code>nextLine()</code> returns an empty string. Reading whole lines and converting them, as this program does, avoids the problem.</p>
<p><code>System.out.println(...)</code> writes text and then starts a new line. The <code>+</code> operator joins strings: <code>"Hi " + name</code> gives <code>"Hi Ada"</code>. The parentheses around <code>(age + 1)</code> matter. <code>+</code> works from left to right, so without them Java would first join <code>"...you'll be "</code> and <code>36</code> into text, then append <code>1</code>, printing <code>361</code>.</p>
</div>
<div data-only="cpp">
<p>When the program reaches the first question, four things happen in order:</p>
<ol>
  <li><code>std::cout &lt;&lt; "What's your name? "</code> sends the prompt to the screen.</li>
  <li><code>std::getline(std::cin, name)</code> <strong>pauses the program</strong> until the user presses Enter.</li>
  <li>It stores the whole line, without the line ending, in the <code>std::string</code> variable <code>name</code>.</li>
  <li>Later, <code>std::cin &gt;&gt; age</code> reads the next number the user types and converts it straight into the <code>int</code> variable <code>age</code>.</li>
</ol>
<p>The two ways of reading behave differently. <code>getline</code> reads a whole line, spaces included. The <code>&gt;&gt;</code> operator skips leading spaces, reads one word or number, and stops at the first character that doesn't fit. If the program used <code>std::cin &gt;&gt; name</code>, a user typing <code>Ada Lovelace</code> would get only <code>Ada</code>.</p>
<p>When <code>&gt;&gt;</code> cannot convert the text, for example <code>thirty</code> into an <code>int</code>, the program does not crash. Instead <code>std::cin</code> enters a <em>fail state</em>, the variable is set to 0, and every later read quietly fails until the error is cleared. Careful programs check each read: <code>if (!(std::cin &gt;&gt; age)) { ... }</code>. Also watch out for mixing the two: <code>&gt;&gt;</code> leaves the line ending behind, so a <code>getline</code> right after it returns an empty line. In this program <code>getline</code> comes first, so the problem doesn't arise.</p>
<p><code>&lt;&lt;</code> sends each value to <code>std::cout</code> in turn, and <code>"\\n"</code> starts a new line. You will also see <code>std::endl</code>, which starts a new line and then <em>flushes</em> the output, forcing it to the screen immediately. That is slower when printing a lot.</p>
</div>

<h4>Is reading input part of the language or a library?</h4>
<div data-only="python">
<p>Neither, exactly. Python code is built from four layers, and it helps to know which one you are using:</p>
<table>
  <thead><tr><th>Layer</th><th>Examples</th><th>How you get it</th></tr></thead>
  <tbody>
    <tr><td><strong>Keywords</strong>: the grammar of the language itself</td><td><code>if</code>, <code>for</code>, <code>def</code>, <code>return</code>, <code>True</code></td><td>Always there. You cannot use them as names.</td></tr>
    <tr><td><strong>Built-in functions</strong></td><td><code>print</code>, <code>input</code>, <code>len</code>, <code>type</code>, <code>int</code></td><td>Always available, with no <code>import</code>. Python has about 70.</td></tr>
    <tr><td><strong>Standard library</strong></td><td><code>math</code>, <code>random</code>, <code>datetime</code></td><td>Installed with Python, but you must <code>import</code> a module first, e.g. <code>import math</code>.</td></tr>
    <tr><td><strong>Third-party packages</strong></td><td><code>numpy</code>, <code>requests</code></td><td>Installed separately with <code>pip</code>, then imported.</td></tr>
  </tbody>
</table>
<p><code>input()</code> is a <strong>built-in function</strong>. It comes with every Python installation and needs no import, but it is an ordinary function, not special syntax. You call it with parentheses like any other function, and it returns a value like any other function.</p>
</div>
<div data-only="java">
<p>Java code is built from four layers, and it helps to know which one you are using:</p>
<table>
  <thead><tr><th>Layer</th><th>Examples</th><th>How you get it</th></tr></thead>
  <tbody>
    <tr><td><strong>Keywords</strong>: the grammar of the language itself</td><td><code>if</code>, <code>class</code>, <code>public</code>, <code>return</code>, <code>new</code></td><td>Always there. You cannot use them as names.</td></tr>
    <tr><td><strong>The <code>java.lang</code> package</strong></td><td><code>String</code>, <code>Integer</code>, <code>Math</code>, <code>System</code></td><td>Part of the standard library, imported into every program automatically.</td></tr>
    <tr><td><strong>The rest of the standard library</strong></td><td><code>java.util.Scanner</code>, <code>java.util.ArrayList</code>, <code>java.time</code></td><td>Comes with the JDK, but needs an <code>import</code> statement.</td></tr>
    <tr><td><strong>Third-party libraries</strong></td><td>Gson, JUnit</td><td>Downloaded with a build tool such as Maven or Gradle, then imported.</td></tr>
  </tbody>
</table>
<p>Reading input is <strong>not built into the Java language</strong>. <code>Scanner</code> is a class in the <code>java.util</code> package of the standard library, which is why the program starts with <code>import java.util.Scanner;</code>. Printing needs no import only because <code>System</code> lives in <code>java.lang</code>, which every program imports automatically.</p>
</div>
<div data-only="cpp">
<p>C++ code is built from three layers, and it helps to know which one you are using:</p>
<table>
  <thead><tr><th>Layer</th><th>Examples</th><th>How you get it</th></tr></thead>
  <tbody>
    <tr><td><strong>Keywords</strong>: the grammar of the language itself</td><td><code>int</code>, <code>if</code>, <code>return</code>, <code>class</code></td><td>Always there. You cannot use them as names.</td></tr>
    <tr><td><strong>The standard library</strong></td><td><code>std::cin</code>, <code>std::cout</code>, <code>std::string</code>, <code>std::vector</code></td><td>Ships with every compiler. <code>#include</code> the right header, such as <code>&lt;iostream&gt;</code> or <code>&lt;string&gt;</code>.</td></tr>
    <tr><td><strong>Third-party libraries</strong></td><td>Boost, fmt</td><td>Installed separately, then included and linked into your program.</td></tr>
  </tbody>
</table>
<p>The core C++ language has <strong>no input or output at all</strong>. <code>std::cin</code> and <code>std::cout</code> are objects defined in the standard library's <code>&lt;iostream&gt;</code> header, which is why the program begins with <code>#include &lt;iostream&gt;</code>. The <code>std::</code> prefix says they belong to the standard library's <em>namespace</em>, its own set of names.</p>
</div>

<h4>Does it work in a program, or only in a console?</h4>
<div data-only="python">
<p>Both. In a program run from the terminal, as above, <code>input()</code> pauses the program and waits for the user. In the <strong>interactive console</strong>, the <code>&gt;&gt;&gt;</code> prompt you get by typing <code>python3</code> with no file name, it does the same thing, and you can see the result right away:</p>
<pre data-label="Python console"><code>&gt;&gt;&gt; answer = input("Type something: ")
Type something: 42
&gt;&gt;&gt; answer
'42'
&gt;&gt;&gt; type(answer)
&lt;class 'str'&gt;
&gt;&gt;&gt; int(answer) + 1
43</code></pre>
<p>It also works inside editors such as IDLE, Thonny and VS Code, where you type your answer into the editor's terminal or console panel.</p>
<p>Where <code>input()</code> does need care is when <strong>no one is at the keyboard</strong>. Technically, <code>input()</code> reads from <strong>standard input</strong>, the program's incoming text stream. Normally that stream is connected to your keyboard, but it can be connected to a file instead. Automated graders use this to test your program without a person present:</p>
<pre data-label="Terminal"><code>$ python3 greet.py &lt; answers.txt</code></pre>
<p>Here each call to <code>input()</code> reads the next line of <code>answers.txt</code>. If the program asks for more lines than the file has, <code>input()</code> raises an <code>EOFError</code> ("end of file"). You can cause the same thing yourself by pressing Ctrl+D (macOS and Linux) or Ctrl+Z then Enter (Windows) at an input prompt.</p>
</div>
<div data-only="java">
<p>Both. A Java program reads input the same way whether you start it with <code>java Greet</code> in a terminal or from an editor such as IntelliJ IDEA or VS Code, where you type your answers into the editor's console panel.</p>
<p>Java also has an interactive console, <strong>jshell</strong> (included since Java 9), where you can try one line at a time without writing a class:</p>
<pre data-label="jshell"><code>jshell&gt; Integer.parseInt("36") + 1
$1 ==&gt; 37</code></pre>
<p>Where reading needs care is when <strong>no one is at the keyboard</strong>. <code>System.in</code> is the program's <strong>standard input</strong>, its incoming text stream. Normally that stream is connected to your keyboard, but it can be connected to a file instead. Automated graders use this to test your program without a person present:</p>
<pre data-label="Terminal"><code>$ java Greet &lt; answers.txt</code></pre>
<p>Here each call to <code>nextLine()</code> reads the next line of <code>answers.txt</code>. If the program asks for more lines than the file has, <code>nextLine()</code> throws a <code>NoSuchElementException</code>. You can cause the same thing by pressing Ctrl+D (macOS and Linux) or Ctrl+Z then Enter (Windows) at a prompt.</p>
</div>
<div data-only="cpp">
<p>A C++ program reads input whenever it runs with a terminal attached: started as <code>./greet</code>, or from an editor such as Visual Studio, CLion or VS Code, where you type your answers into the editor's console panel. Unlike Python and Java, standard C++ has no interactive console. You always write a program, compile it and run it.</p>
<p>Where reading needs care is when <strong>no one is at the keyboard</strong>. <code>std::cin</code> reads the program's <strong>standard input</strong>, its incoming text stream. Normally that stream is connected to your keyboard, but it can be connected to a file instead. Automated graders use this to test your program without a person present:</p>
<pre data-label="Terminal"><code>$ ./greet &lt; answers.txt</code></pre>
<p>Here each read takes the next part of <code>answers.txt</code>. If the program asks for more than the file has, there is no crash and no exception: the read fails and <code>std::cin</code>'s end-of-file state is set. Check for it the same way as any failed read, for example <code>if (!std::getline(std::cin, name)) { ... }</code>. You can cause the same thing by pressing Ctrl+D (macOS and Linux) or Ctrl+Z then Enter (Windows) at a prompt.</p>
</div>
<p>Programs that run in the background, such as web servers, have no keyboard attached at all. They get their input from network requests and files instead.</p>
`,
      terms: [
        ["Value", "A piece of data, such as 3, 'hi' or True."],
        ["Type", "The category of a value. It determines which operations are allowed."],
        ["Expression", "Code that evaluates to a value."],
        ["Statement", "A complete instruction, such as an assignment or a print call."],
        ["Variable", "A name bound to a value."],
        ["Built-in function", "A function that is always available in Python without an import, such as print, input and len."],
        ["Standard input", "A program's incoming text stream, normally the keyboard but redirectable from a file."],
        ["Interactive console", "Python's >>> prompt (also called the REPL), which runs each line as you type it."],
        ["f-string", "A string starting with f whose {expressions} are evaluated and inserted into the text."]
      ],
      quiz: [
        { q: "What does <code>17 // 5</code> evaluate to?", choices: ["3.4", "3", "2", "4"], answer: 1, why: "<code>//</code> is floor division: 17 divided by 5 is 3.4, rounded down to 3.", langs: { java: { q: "In Java, what does <code>17 / 5</code> evaluate to?", why: "Both values are <code>int</code>, so <code>/</code> is integer division: 3.4 loses its fraction and becomes 3." }, cpp: { q: "In C++, what does <code>17 / 5</code> evaluate to?", why: "Both values are <code>int</code>, so <code>/</code> is integer division: 3.4 loses its fraction and becomes 3." } } },
        { q: "After <code>x = 4</code> then <code>x = x * x - 1</code>, what is <code>x</code>?", choices: ["15", "12", "3", "An error"], answer: 0, why: "The right side is evaluated with the old x: 4 × 4 − 1 = 15." },
        { q: "What is the type of <code>input()</code>'s return value?", choices: ["int", "It depends on what the user types", "str", "float"], answer: 2, why: "<code>input()</code> always returns a string. You must convert it with <code>int()</code> or <code>float()</code>.", langs: { java: { q: "What type does <code>in.nextLine()</code> return?", choices: ["int", "It depends on what the user types", "String", "double"], answer: 2, why: "<code>nextLine()</code> always returns a <code>String</code>. Convert it with <code>Integer.parseInt()</code> or <code>Double.parseDouble()</code>." }, cpp: { q: "<code>int age;</code> then <code>std::cin &gt;&gt; age;</code>, and the user types <code>thirty</code>. What happens?", choices: ["age becomes 30", "The program crashes with an exception", "The read fails: std::cin enters a fail state and age is set to 0", "age becomes the text \"thirty\""], answer: 2, why: "A failed numeric read sets the variable to 0 and puts <code>std::cin</code> in a fail state. Always check whether a read succeeded." } } },
        { q: "What must you do before calling <code>input()</code> in a Python program?", choices: ["<code>import input</code>", "<code>import sys</code>", "Nothing: it is a built-in function", "Start the interactive console"], answer: 2, why: "Built-in functions like <code>input</code>, <code>print</code> and <code>len</code> are always available. It works in scripts and in the console alike.", langs: { java: { q: "What must a Java program do before using <code>Scanner</code>?", choices: ["Nothing: it is built into the language", "<code>import java.util.Scanner;</code>", "<code>#include &lt;scanner&gt;</code>", "Start jshell"], answer: 1, why: "<code>Scanner</code> is in the <code>java.util</code> package of the standard library, so it must be imported. Classes in <code>java.lang</code>, such as <code>String</code> and <code>System</code>, need no import." }, cpp: { q: "What must a C++ program do before using <code>std::cin</code>?", choices: ["Nothing: it is built into the language", "<code>#include &lt;iostream&gt;</code>", "<code>import cin;</code>", "Install a third-party library"], answer: 1, why: "<code>std::cin</code> and <code>std::cout</code> are declared in the standard library's <code>&lt;iostream&gt;</code> header. The core language has no input or output." } } },
        { q: "An automated grader runs your program with no one at the keyboard. Where do your <code>input()</code> calls get their text?", choices: ["They wait forever", "From standard input, which the grader connects to a file of answers", "Python invents a value", "From the clipboard"], answer: 1, why: "<code>input()</code> reads standard input, which can come from a file. If the file runs out, it raises <code>EOFError</code>.", langs: { java: { q: "A grader runs your Java program with <code>java Greet &lt; answers.txt</code>, and the file runs out of lines before the program stops asking. What happens?", choices: ["It waits forever", "<code>nextLine()</code> throws a <code>NoSuchElementException</code>", "<code>nextLine()</code> returns an empty string", "Java invents a value"], answer: 1, why: "Standard input came from the file. When it is exhausted, <code>Scanner.nextLine()</code> throws <code>NoSuchElementException</code>." }, cpp: { q: "A grader runs your C++ program with <code>./greet &lt; answers.txt</code>, and the file runs out before the program stops reading. What happens?", choices: ["An exception is thrown", "The read fails and std::cin's end-of-file state is set, so the program must check for it", "It waits forever", "The variable is set to the text EOF"], answer: 1, why: "C++ streams report problems through their state, not exceptions, by default. Write <code>if (!std::getline(std::cin, name))</code> to detect it." } } },
        { q: "What does <code>print(f\"{2 + 3} apples\")</code> display?", choices: ["{2 + 3} apples", "5 apples", "2 + 3 apples", "An error"], answer: 1, why: "In an f-string, each expression in braces is evaluated and inserted: 2 + 3 becomes 5.", langs: { java: { q: "What does <code>System.out.println(\"Total: \" + 2 + 3);</code> print?", choices: ["Total: 5", "Total: 23", "Total: 2 + 3", "An error"], answer: 1, why: "<code>+</code> works left to right: <code>\"Total: \" + 2</code> makes a <code>String</code>, then <code>3</code> is appended as text. Write <code>(2 + 3)</code> to add first." }, cpp: { q: "What does <code>std::cout &lt;&lt; \"Total: \" &lt;&lt; 2 + 3;</code> print?", choices: ["Total: 5", "Total: 23", "Total: 2 + 3", "An error"], answer: 0, why: "<code>+</code> binds more tightly than <code>&lt;&lt;</code>, so <code>2 + 3</code> is computed first and 5 is printed." } } }
      ],
      sources: ["thinkpython", "mit6100l", "pytutorial"]
    },
    {
      id: "u2",
      title: "Branching and iteration",
      minutes: 60,
      summary: "Make decisions with if/elif/else and repeat work with while and for loops.",
      notes: `
<h3>Boolean expressions</h3>
<p>Comparisons such as <code>==</code>, <code>!=</code>, <code>&lt;</code> and <code>&gt;=</code> produce booleans. Combine them with <code>and</code>, <code>or</code> and <code>not</code>. Python <em>short-circuits</em>: in <code>a and b</code>, if <code>a</code> is false, <code>b</code> is never evaluated.</p>

<h3>Conditionals</h3>
<pre><code>def grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"</code></pre>
<p>Python checks each condition in order and runs only the first branch that is true. Indentation is part of the syntax: it marks which statements belong to which branch.</p>

<h3>while loops</h3>
<p>A <code>while</code> loop repeats as long as its condition holds. Something inside the loop must eventually make the condition false, or the loop runs forever.</p>
<pre><code>n = 27
steps = 0
while n != 1:
    n = n // 2 if n % 2 == 0 else 3 * n + 1
    steps += 1
print(steps)   # 111  (the Collatz sequence from 27)</code></pre>

<h3>for loops</h3>
<p>A <code>for</code> loop walks over the items of a sequence. <code>range(a, b)</code> produces the integers from <code>a</code> up to but <em>not including</em> <code>b</code>.</p>
<div class="multi">
<pre data-lang="python"><code>total = 0
for i in range(1, 101):
    total += i
print(total)   # 5050</code></pre>
<pre data-lang="java"><code>int total = 0;
for (int i = 1; i &lt;= 100; i++) {
    total += i;
}
System.out.println(total);   // 5050</code></pre>
<pre data-lang="cpp"><code>int total = 0;
for (int i = 1; i &lt;= 100; i++) {
    total += i;
}
std::cout &lt;&lt; total &lt;&lt; "\\n";   // 5050</code></pre>
</div>
<p>Use <code>for</code> when you know what you are iterating over. Use <code>while</code> when you are waiting for a condition to change.</p>

<h3>break and continue</h3>
<p><code>break</code> leaves the loop immediately. <code>continue</code> skips to the next iteration. Use them sparingly; a clear loop condition is usually easier to read.</p>

<div class="callout"><strong>Loop invariant.</strong> For any loop, ask: what is true at the start of every iteration? In the sum above, <code>total</code> always equals 1 + 2 + … + (i − 1). Stating the invariant is how you convince yourself a loop is correct, and it connects directly to induction in Discrete Math.</div>

<h3>Guess-and-check and bisection</h3>
<p>Loops let you search. To find the square root of 2, you could try values in small steps (guess and check), or repeatedly halve an interval that must contain the answer (bisection). Bisection reaches six correct decimal places in about 20 steps because each step halves the remaining range.</p>
`,
      terms: [
        ["Boolean", "A value that is True or False."],
        ["Short-circuit evaluation", "Stopping evaluation of and/or as soon as the result is known."],
        ["Iteration", "Repeating a block of code."],
        ["Loop invariant", "A condition that is true at the start of every pass through a loop."],
        ["Bisection search", "Finding a value by repeatedly halving an interval that contains it."]
      ],
      quiz: [
        { q: "How many times does the body of <code>for i in range(3, 10, 2):</code> run?", choices: ["3", "4", "7", "5"], answer: 1, why: "It produces 3, 5, 7, 9. Four values; 10 is excluded." },
        { q: "In <code>x != 0 and 10 / x > 1</code>, what happens when <code>x</code> is 0?", choices: ["ZeroDivisionError", "The expression is False", "The expression is True", "SyntaxError"], answer: 1, why: "Short-circuiting: <code>x != 0</code> is False, so Python never evaluates the division." },
        { q: "Bisection on an interval of width 1 needs about how many steps to reach width 0.001?", choices: ["3", "10", "100", "1000"], answer: 1, why: "Each step halves the width. 2<sup>10</sup> = 1024, so 10 halvings get below 0.001." }
      ],
      sources: ["mit6100l", "thinkpython", "pytutorial"]
    },
    {
      id: "u3",
      title: "Functions and abstraction",
      minutes: 60,
      summary: "Package logic into functions with parameters and return values, and understand scope.",
      notes: `
<p>A <strong>function</strong> gives a name to a computation. Once it works, you can use it without thinking about how it works inside. That idea, <em>abstraction</em>, is the core tool for managing complexity in every program you will ever write.</p>

<h3>Defining and calling</h3>
<div class="multi">
<pre data-lang="python"><code>def hypotenuse(a, b):
    """Return the length of the hypotenuse of a right triangle."""
    return (a ** 2 + b ** 2) ** 0.5

print(hypotenuse(3, 4))   # 5.0</code></pre>
<pre data-lang="java"><code>/** Return the length of the hypotenuse of a right triangle. */
static double hypotenuse(double a, double b) {
    return Math.sqrt(a * a + b * b);
}

System.out.println(hypotenuse(3, 4));   // 5.0</code></pre>
<pre data-lang="cpp"><code>// Return the length of the hypotenuse of a right triangle.
double hypotenuse(double a, double b) {
    return std::sqrt(a * a + b * b);
}

std::cout &lt;&lt; hypotenuse(3, 4) &lt;&lt; "\\n";   // 5</code></pre>
</div>
<p class="langnote" data-only="java cpp">Java and C++ require the type of every parameter and of the return value. Python checks types only while the program runs.</p>
<p><code>a</code> and <code>b</code> are <em>parameters</em>. The values passed in a call, <code>3</code> and <code>4</code>, are <em>arguments</em>. The string under the <code>def</code> line is a <em>docstring</em>: it describes what the function does, not how.</p>

<h3>return versus print</h3>
<p><code>return</code> hands a value back to the caller, who can store or reuse it. <code>print</code> only shows text on the screen. A function with no <code>return</code> statement returns <code>None</code>. Mixing these up is the most common bug in a first programming course.</p>

<h3>Scope</h3>
<p>Each call creates a new <em>frame</em>: a private set of names. Parameters and variables assigned inside a function exist only in that frame and disappear when it returns.</p>
<pre><code>x = 10
def f(x):
    x = x + 1
    return x

print(f(x))  # 11
print(x)     # 10  the global x was never changed</code></pre>

<h3>Specifications</h3>
<p>A good function has a contract. The <em>precondition</em> states what the caller must provide; the <em>postcondition</em> states what the function promises in return. Writing these first forces you to decide what the function is for before you write it.</p>

<h3>Functions as values</h3>
<p>Functions are values too. You can pass one as an argument:</p>
<pre><code>def apply_twice(f, x):
    return f(f(x))

apply_twice(lambda n: n * 3, 2)   # 18</code></pre>
<p>This is the doorway to higher-order functions such as <code>map</code>, <code>filter</code> and <code>sorted(key=...)</code>.</p>

<div class="callout"><strong>Decomposition.</strong> If a function is longer than your screen, or needs the word "and" to describe it, split it.</div>
`,
      terms: [
        ["Parameter", "A name in a function definition that receives an argument."],
        ["Argument", "The value passed to a function when it is called."],
        ["Return value", "The value a function hands back to its caller."],
        ["Scope", "The region of code where a name is visible."],
        ["Abstraction", "Hiding how something works behind what it does."],
        ["Higher-order function", "A function that takes or returns another function."]
      ],
      quiz: [
        { q: "What does a Python function return if it has no return statement?", choices: ["0", "An empty string", "None", "It raises an error"], answer: 2, why: "Every function returns something. Without a <code>return</code>, that is <code>None</code>." },
        { q: "A function prints its result but does not return it. What does <code>y = f()</code> store in <code>y</code>?", choices: ["The printed text", "None", "True", "The function itself"], answer: 1, why: "Printing does not produce a return value, so <code>y</code> becomes <code>None</code>." },
        { q: "Why does changing a parameter inside a function not change the caller's variable with the same name?", choices: ["Python copies every value", "Each call has its own frame of names", "Parameters are read-only", "It does change it"], answer: 1, why: "Rebinding a name in the function's frame does not affect names in other frames." }
      ],
      sources: ["thinkpython", "mit6100l", "pytutorial"]
    },
    {
      id: "u4",
      title: "Recursion",
      minutes: 60,
      summary: "Solve problems by reducing them to smaller instances of the same problem.",
      notes: `
<p>A function is <strong>recursive</strong> when it calls itself. Every correct recursive function has two parts:</p>
<ul>
  <li>A <strong>base case</strong> small enough to answer directly.</li>
  <li>A <strong>recursive case</strong> that reduces the problem toward the base case and combines the result.</li>
</ul>

<h3>A first example</h3>
<div class="multi">
<pre data-lang="python"><code>def factorial(n):
    if n == 0:            # base case
        return 1
    return n * factorial(n - 1)   # recursive case</code></pre>
<pre data-lang="java"><code>static long factorial(int n) {
    if (n == 0) {                  // base case
        return 1;
    }
    return n * factorial(n - 1);   // recursive case
}</code></pre>
<pre data-lang="cpp"><code>long long factorial(int n) {
    if (n == 0) {                  // base case
        return 1;
    }
    return n * factorial(n - 1);   // recursive case
}</code></pre>
</div>
<p class="langnote" data-only="java cpp">A <code>long</code> holds 64 bits, so factorial overflows past 20!. Python integers never overflow.</p>
<p>Calling <code>factorial(3)</code> creates a stack of frames: <code>factorial(3)</code> waits on <code>factorial(2)</code>, which waits on <code>factorial(1)</code>, which waits on <code>factorial(0)</code>. The base case returns 1 and the results multiply back up: 1, 1, 2, 6.</p>

<h3>The recursive leap of faith</h3>
<p>When writing the recursive case, assume the function already works for smaller inputs. You only have to show how to build the answer for <code>n</code> from the answer for something smaller. This is the same reasoning as a proof by induction.</p>

<h3>Recursion on structure</h3>
<pre><code>def is_palindrome(s):
    if len(s) &lt;= 1:
        return True
    return s[0] == s[-1] and is_palindrome(s[1:-1])

def flatten(items):
    out = []
    for x in items:
        if isinstance(x, list):
            out.extend(flatten(x))
        else:
            out.append(x)
    return out

flatten([1, [2, [3, 4]], 5])   # [1, 2, 3, 4, 5]</code></pre>
<p>Nested data is where recursion is clearly better than loops: the shape of the code matches the shape of the data.</p>

<h3>Costs and pitfalls</h3>
<p>Forgetting the base case, or not moving toward it, causes infinite recursion; Python stops at about 1000 frames with a <code>RecursionError</code>. Naive recursion can also repeat work. The obvious Fibonacci function makes about 1.6<sup>n</sup> calls. Storing results you have already computed (<em>memoization</em>) brings this down to n calls:</p>
<pre><code>from functools import cache

@cache
def fib(n):
    return n if n &lt; 2 else fib(n - 1) + fib(n - 2)</code></pre>
`,
      terms: [
        ["Recursion", "Defining a function in terms of itself on smaller inputs."],
        ["Base case", "An input the function answers without recursing."],
        ["Call stack", "The chain of active function frames waiting on each other."],
        ["Memoization", "Caching results of calls so each input is computed once."]
      ],
      quiz: [
        { q: "What happens if a recursive function has no base case?", choices: ["It returns None", "It recurses until Python raises RecursionError", "Python adds one automatically", "It returns 0"], answer: 1, why: "Each call adds a frame. Python stops at its recursion limit and raises <code>RecursionError</code>." },
        { q: "For <code>sum_list(xs)</code>, which recursive case is correct?", choices: ["<code>return xs[0] + sum_list(xs)</code>", "<code>return sum_list(xs[1:])</code>", "<code>return xs[0] + sum_list(xs[1:])</code>", "<code>return xs[0] * sum_list(xs[1:])</code>"], answer: 2, why: "Take the first item and add the sum of the rest. The input shrinks every call." },
        { q: "Why is naive recursive Fibonacci slow?", choices: ["Recursion is always slow in Python", "It recomputes the same subproblems many times", "Integers get very large", "It has no base case"], answer: 1, why: "fib(n−2) is computed inside both fib(n) and fib(n−1), and so on down. Memoization removes the repeats." }
      ],
      sources: ["mit6100l", "thinkpython", "mcs"]
    },
    {
      id: "u5",
      title: "Strings, lists, tuples and dictionaries",
      minutes: 75,
      summary: "Python's built-in collections, mutability, aliasing, and choosing the right structure.",
      notes: `
<h3>Sequences</h3>
<p>Strings, lists and tuples are <em>sequences</em>: ordered and indexed from 0. They share indexing (<code>s[0]</code>, <code>s[-1]</code>), slicing (<code>s[1:4]</code>), <code>len</code>, <code>in</code> and iteration with <code>for</code>.</p>

<h3>Mutable versus immutable</h3>
<table>
  <thead><tr><th>Type</th><th>Example</th><th>Mutable?</th><th>Typical use</th></tr></thead>
  <tbody>
    <tr><td><code>str</code></td><td><code>"cat"</code></td><td>No</td><td>Text</td></tr>
    <tr><td><code>tuple</code></td><td><code>(3, 4)</code></td><td>No</td><td>Fixed records, dictionary keys</td></tr>
    <tr><td><code>list</code></td><td><code>[3, 4]</code></td><td>Yes</td><td>Ordered collections that grow</td></tr>
    <tr><td><code>dict</code></td><td><code>{"a": 1}</code></td><td>Yes</td><td>Lookup by key</td></tr>
    <tr><td><code>set</code></td><td><code>{1, 2}</code></td><td>Yes</td><td>Membership, removing duplicates</td></tr>
  </tbody>
</table>

<h3>Aliasing</h3>
<p>Assignment never copies. After <code>b = a</code>, both names refer to the <em>same</em> list, so a change through one is visible through the other.</p>
<pre><code>a = [1, 2, 3]
b = a
b.append(4)
print(a)        # [1, 2, 3, 4]
c = a.copy()    # or a[:] or list(a)
c.append(5)
print(a)        # [1, 2, 3, 4]  unchanged</code></pre>
<p>This matters most when you pass a list to a function: the function can change the caller's list.</p>

<h3>Dictionaries</h3>
<p>A dictionary maps keys to values. Looking up a key takes about the same time no matter how large the dictionary is, which makes it the workhorse for counting and indexing.</p>
<pre><code>def word_counts(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts

word_counts("the cat and the hat")
# {'the': 2, 'cat': 1, 'and': 1, 'hat': 1}</code></pre>
<p>Keys must be immutable (hashable): strings, numbers and tuples work; lists do not.</p>

<h3>Comprehensions</h3>
<pre><code>squares = [n * n for n in range(10)]
evens = [n for n in range(20) if n % 2 == 0]
lengths = {w: len(w) for w in ["ab", "abc"]}</code></pre>

<div class="callout"><strong>Choosing a structure.</strong> Need order? list. Fixed record? tuple. Find by name? dict. Ask "is it in there?" a lot? set.</div>
`,
      terms: [
        ["Sequence", "An ordered collection indexed by position."],
        ["Mutable", "Able to be changed in place after creation."],
        ["Aliasing", "Two names referring to the same object."],
        ["Hashable", "Usable as a dictionary key or set member; immutable built-ins are hashable."],
        ["Comprehension", "A compact expression that builds a list, dict or set from an iterable."]
      ],
      quiz: [
        { q: "After <code>a = [1, 2]; b = a; b += [3]</code>, what is <code>a</code>?", choices: ["[1, 2]", "[1, 2, 3]", "[3]", "An error"], answer: 1, why: "<code>b</code> is an alias for the same list, and <code>+=</code> on a list changes it in place." },
        { q: "Which of these can be a dictionary key?", choices: ["[1, 2]", "{1, 2}", "(1, 2)", "{'a': 1}"], answer: 2, why: "Only the tuple is immutable and hashable." },
        { q: "What does <code>'python'[1:4]</code> evaluate to?", choices: ["'pyt'", "'yth'", "'ytho'", "'pyth'"], answer: 1, why: "Slices include the start index and exclude the end: indices 1, 2, 3 are y, t, h." }
      ],
      sources: ["thinkpython", "pytutorial", "mit6100l"]
    },
    {
      id: "u6",
      title: "Testing, debugging and exceptions",
      minutes: 60,
      summary: "Find bugs on purpose: write tests, read tracebacks, and handle errors deliberately.",
      notes: `
<h3>Testing</h3>
<p>A test runs code on a known input and checks the output. Good test suites cover three kinds of input:</p>
<ul>
  <li><strong>Typical cases</strong> that represent normal use.</li>
  <li><strong>Edge cases</strong>: empty lists, zero, negative numbers, one element, very large values.</li>
  <li><strong>Error cases</strong>: inputs the function should reject.</li>
</ul>
<pre><code># test_stats.py  (run with: python -m pytest)
from stats import mean

def test_typical():
    assert mean([1, 2, 3]) == 2

def test_single():
    assert mean([5]) == 5

def test_empty_raises():
    import pytest
    with pytest.raises(ValueError):
        mean([])</code></pre>
<p>Writing a test before you fix a bug proves the bug exists and proves you fixed it.</p>

<h3>Reading a traceback</h3>
<p>Read Python's error output from the <em>bottom up</em>. The last line names the exception and message. The lines above show the chain of calls that led there, with file names and line numbers.</p>

<h3>A debugging method</h3>
<ol>
  <li>Reproduce the bug with the smallest input you can find.</li>
  <li>Form a hypothesis about where the program's state first goes wrong.</li>
  <li>Test the hypothesis with a print statement, an <code>assert</code>, or the debugger (<code>breakpoint()</code>).</li>
  <li>Fix the cause, not the symptom, and keep the test.</li>
</ol>
<p>Explaining the code line by line to someone else, or to a rubber duck, finds a surprising number of bugs.</p>

<h3>Exceptions</h3>
<pre><code>def mean(xs):
    if not xs:
        raise ValueError("mean() of empty list")
    return sum(xs) / len(xs)

try:
    value = int(input("Number: "))
except ValueError:
    print("That was not a whole number.")</code></pre>
<p>Raise exceptions when a caller breaks a function's contract. Catch them only where you can do something useful. A bare <code>except:</code> that swallows every error hides bugs.</p>

<h3>Assertions</h3>
<p><code>assert</code> states something you believe is always true at that point. If it is false, the program stops at once, close to the real cause.</p>
`,
      terms: [
        ["Unit test", "A small automated check of one function's behavior."],
        ["Edge case", "An input at the boundary of what a function accepts."],
        ["Traceback", "Python's report of the call chain that led to an error."],
        ["Exception", "An object signaling an error, which travels up the call stack until caught."],
        ["Assertion", "A statement that a condition must hold at that point."]
      ],
      quiz: [
        { q: "Which part of a traceback should you read first?", choices: ["The first line", "The last line", "The middle", "Only the file names"], answer: 1, why: "The last line names the exception and the message. Then work upward through the calls." },
        { q: "Which is an edge case for a function that finds the maximum of a list?", choices: ["[3, 7, 2]", "[10, 20, 30]", "[]", "[5, 1, 4]"], answer: 2, why: "The empty list is the boundary: there is no maximum, so the function must decide what to do." },
        { q: "Why is <code>except:</code> with no exception type risky?", choices: ["It is a syntax error", "It catches every error, hiding real bugs", "It runs slower", "It only catches ValueError"], answer: 1, why: "It catches everything, including typos that raise NameError, so the program keeps going in a broken state." }
      ],
      sources: ["mit6100l", "thinkpython", "cs50p"]
    },
    {
      id: "u7",
      title: "The programmer's toolkit",
      minutes: 45,
      summary: "Terminal, editor, Git, and working with AI coding assistants without outsourcing your learning.",
      notes: `
<h3>The terminal</h3>
<p>The shell lets you run programs and manage files by typing commands. A handful cover most daily work:</p>
<pre data-label="Shell"><code>pwd                 # where am I?
ls                  # what is here?
cd projects/hw1     # move into a folder
mkdir data          # make a folder
python3 main.py     # run a program
python3 -m pytest   # run your tests</code></pre>

<h3>Version control with Git</h3>
<p>Git records snapshots (<em>commits</em>) of your project, so you can see what changed, undo mistakes and work with others.</p>
<pre data-label="Shell"><code>git init                    # start tracking this folder
git status                  # what changed?
git add main.py             # stage a file
git commit -m "Add mean()"  # save a snapshot
git log --oneline           # history</code></pre>
<p>Commit small, working steps with messages that explain why. A commit history is a lab notebook.</p>

<h3>Virtual environments</h3>
<p>Different projects need different package versions. <code>python3 -m venv .venv</code> creates an isolated environment; activate it, then <code>pip install</code> only what that project needs.</p>

<h3>Using AI coding assistants well</h3>
<p>AI assistants can explain errors, suggest tests and draft code. In an introductory course the goal is to build your own understanding, so use them in ways that keep you thinking:</p>
<ul>
  <li>Attempt the problem first, then ask for a hint or an explanation, not the solution.</li>
  <li>Never submit code you cannot explain line by line.</li>
  <li>Verify everything. Assistants produce plausible code that can be wrong, especially at edge cases.</li>
  <li>Follow your course's policy and say when you used one.</li>
</ul>
`,
      terms: [
        ["Shell", "A program that reads typed commands and runs them."],
        ["Commit", "A saved snapshot of a project in Git."],
        ["Repository", "A project folder whose history Git tracks."],
        ["Virtual environment", "An isolated set of Python packages for one project."]
      ],
      quiz: [
        { q: "Which command shows which files have changed since your last commit?", choices: ["git log", "git status", "git init", "git commit"], answer: 1, why: "<code>git status</code> lists modified, staged and untracked files." },
        { q: "What is the main reason to use a virtual environment?", choices: ["It makes Python faster", "It isolates each project's package versions", "It is required to run Python", "It backs up your code"], answer: 1, why: "Projects can need conflicting versions of the same package; a venv keeps them apart." },
        { q: "An AI assistant gives you working code for an assignment. What should you do before using it?", choices: ["Submit it", "Make sure you can explain every line and test it", "Rename the variables", "Nothing"], answer: 1, why: "You are responsible for code you submit. Understand it, test it, and follow your course policy." }
      ],
      sources: ["missing", "cs50p"]
    }
  ]
});
