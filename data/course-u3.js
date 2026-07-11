/* GRE Study Course — Unit 3: Quantitative Foundations */
(function () {
  const C = window.GRECOURSE = window.GRECOURSE || { units: [] };

  C.units.push({
    id: "u3",
    title: "Unit 3 — Quantitative Foundations",
    blurb: "Arithmetic, number properties, algebra, and word problems. The content is high-school level — the difficulty is in the traps and the clock.",
    modules: [

/* ================= MODULE 8 ================= */
{
  id: "gm3_1", title: "Arithmetic, Fractions, Percents, and Ratios", minutes: 15, level: "core",
  content: `
<p>The GRE's math content stops at roughly high-school level. No calculus, no trigonometry. What makes it
hard is that the questions are engineered so the obvious move is wrong.</p>

<h2>Fractions, decimals, percents — one idea in three costumes</h2>
<p>Convert freely. Memorize these so you never compute them:</p>
<table>
  <tr><th>Fraction</th><th>Decimal</th><th>Percent</th></tr>
  <tr><td>1/2</td><td>0.5</td><td>50%</td></tr>
  <tr><td>1/3</td><td>0.333…</td><td>33.3%</td></tr>
  <tr><td>1/4</td><td>0.25</td><td>25%</td></tr>
  <tr><td>1/5</td><td>0.2</td><td>20%</td></tr>
  <tr><td>1/6</td><td>0.1667</td><td>16.7%</td></tr>
  <tr><td>1/8</td><td>0.125</td><td>12.5%</td></tr>
  <tr><td>3/8</td><td>0.375</td><td>37.5%</td></tr>
</table>

<h2>Percent language, translated word for word</h2>
<table>
  <tr><th>English</th><th>Math</th></tr>
  <tr><td>percent</td><td>÷ 100</td></tr>
  <tr><td>of</td><td>×</td></tr>
  <tr><td>is / are</td><td>=</td></tr>
  <tr><td>what</td><td>a variable</td></tr>
</table>
<p>"<em>What percent of 50 is 12?</em>" → (x/100) × 50 = 12 → x = 24.</p>
<div class="warnbox"><strong>Percent OF vs percent GREATER THAN — the #1 quant trap.</strong>
<p>If a value goes from 50 to 90:</p>
<ul>
  <li>90 <strong>is</strong> 180% <strong>of</strong> 50. (90/50 = 1.8)</li>
  <li>90 is <strong>80% greater than</strong> 50. (the <em>change</em>, 40, over the original, 50)</li>
</ul>
<p>Both numbers appear in the answer choices. Read which one is asked.</p></div>

<h3>Percent change</h3>
<p><strong>Percent change = (new − old) / old × 100.</strong> The denominator is always the <em>original</em>.</p>
<p>Doubling = +100% increase. Tripling = +200%. Quadrupling = +300%. (Not 200%, 300%, 400% — a favorite trap.)</p>

<h3>Successive percent changes multiply — they don't add</h3>
<div class="worked"><h4>A stock rises 20%, then falls 20%. Where is it?</h4>
<p><em>Not</em> back where it started. 1.20 × 0.80 = <strong>0.96</strong> — it's down 4%.</p>
<p>General rule: up x% then down x% always lands <em>below</em> the start, because the decrease is applied
to a bigger number. The factor is (1+x)(1−x) = 1 − x².</p>
<p><strong>But:</strong> +25% then −20% returns exactly to the start, because 1.25 × 0.80 = 1.00.
(5/4 × 4/5 = 1.) The GRE loves this one.</p></div>

<h2>Ratios</h2>
<p>A ratio of 3:5 doesn't tell you the quantities — only the proportion. The actual values are 3k and 5k
for some multiplier k.</p>
<div class="worked"><h4>The ratio of boys to girls is 3:5 and there are 48 students. How many girls?</h4>
<p>Total parts = 3 + 5 = <strong>8</strong>. Each part = 48 ÷ 8 = <strong>6</strong> students.<br>
Girls = 5 × 6 = <strong>30</strong>.</p>
<p><strong>The method:</strong> always sum the parts first, then find the value of one part.</p></div>
<div class="exambox"><strong>Exam angle:</strong> since a ratio fixes only the proportion, any question
asking for an actual quantity from a ratio alone is unanswerable — which makes "cannot be determined" a
live answer in Quantitative Comparison.</div>

<h2>Averages are sums in disguise</h2>
<p><strong>Average = sum ÷ count</strong>, so <strong>sum = average × count</strong>. Almost every average
problem is solved faster by working with the total.</p>
<div class="worked"><h4>The average of 5 numbers is 20. Four of them are 18, 22, 17, 25. Find the fifth.</h4>
<p>Total must be 5 × 20 = 100. The four given sum to 82. Fifth = 100 − 82 = <strong>18</strong>.</p></div>
<div class="worked"><h4>The average age of 5 friends is 24. One leaves and the average of the remaining 4 is 22. How old was the leaver?</h4>
<p>Before: 5 × 24 = 120. After: 4 × 22 = 88. The one who left: 120 − 88 = <strong>32</strong>.</p></div>

<h2>Rates: distance, work, and unit conversion</h2>
<ul>
  <li><strong>Distance = rate × time.</strong> Cover any one to solve for it.</li>
  <li><strong>Work:</strong> add <em>rates</em>, never times. If A takes 6 hours and B takes 12, their combined rate is 1/6 + 1/12 = 1/4 job per hour → <strong>4 hours</strong> together.</li>
</ul>
<div class="warnbox"><strong>Never average speeds directly.</strong> Driving 60 mph out and 30 mph back is
<em>not</em> 45 mph average. Use total distance ÷ total time. (For 60 miles each way: 1 hour + 2 hours = 3
hours for 120 miles = <strong>40 mph</strong>.)</div>
<p><strong>Sanity check for work problems:</strong> two people working together must be <em>faster</em> than
either alone. If your answer isn't, you added times instead of rates.</p>

<h2>What you must remember</h2>
<ul>
  <li>"Percent of" ≠ "percent greater than." Percent change divides by the <em>original</em>.</li>
  <li>Successive percents multiply: +20% then −20% = 0.96, not 1.00.</li>
  <li>Ratios: sum the parts, find one part. A ratio alone never gives you a quantity.</li>
  <li>Averages → sums. Work → add rates. Never average speeds.</li>
</ul>`,
  quiz: [
    { text: "A price rises by 20% and then falls by 20%. The final price is what percent of the original?",
      choices: ["100%", "96%", "104%", "80%"],
      answer: 1,
      expl: "Successive percent changes multiply: 1.20 × 0.80 = 0.96, so the final price is 96% of the original. Up then down by the same percent always lands below the start." },
    { text: "45 is 30 percent of what number?",
      choices: ["13.5", "60", "135", "150"],
      answer: 3,
      expl: "45 = 0.30n, so n = 45 ÷ 0.3 = 150. (13.5 is 30% OF 45 — the reversed operation, and a deliberate trap.)" },
    { text: "The ratio of boys to girls in a class is 3 to 5, and there are 48 students. How many girls are there?",
      choices: ["18", "24", "30", "32"],
      answer: 2,
      expl: "The parts sum to 8, so each part is 48 ÷ 8 = 6 students. Girls = 5 × 6 = 30." },
    { text: "Machine A completes a job in 6 hours and machine B in 12 hours. Working together, how long do they take?",
      choices: ["3 hours", "4 hours", "9 hours", "18 hours"],
      answer: 1,
      expl: "Add rates: 1/6 + 1/12 = 1/4 job per hour, so 4 hours. Sanity check: together must be faster than the faster machine alone (6 hours) — and 4 is." },
    { text: "The average of 5 numbers is 20. Four of them are 18, 22, 17, and 25. What is the fifth?",
      choices: ["16", "18", "20", "22"],
      answer: 1,
      expl: "The total must be 5 × 20 = 100. The four given sum to 82, so the fifth is 18. Turn averages into sums immediately." },
    { text: "A value increases from 50 to 90. Which statement is correct?",
      choices: [
        "90 is 80% greater than 50, and 180% of 50",
        "90 is 180% greater than 50",
        "90 is 40% greater than 50",
        "90 is 80% of 50"],
      answer: 0,
      expl: "Percent change uses the original as the denominator: 40/50 = 80% increase. Separately, 90/50 = 180%, so 90 IS 180% OF 50. Both figures appear as answer choices." },
    { text: "A car travels 60 miles at 60 mph and returns the same 60 miles at 30 mph. What is its average speed for the trip?",
      choices: ["45 mph", "40 mph", "50 mph", "35 mph"],
      answer: 1,
      expl: "Never average speeds. Total distance 120 miles; total time 1 + 2 = 3 hours; 120/3 = 40 mph." },
    { text: "Which two statements about ratios are true? (Select TWO.)",
      choices: [
        "A ratio gives the proportion but not the actual quantities",
        "A ratio of 3:5 means there are exactly 3 and 5 items",
        "To use a ratio with a total, sum the parts and find the value of one part",
        "Ratios can only be used with whole numbers",
        "A ratio always equals a percentage"],
      answer: [0, 2],
      expl: "Ratios fix proportion only; the actual values are 3k and 5k. With a known total, sum the parts and divide to find the multiplier." }
  ]
},

/* ================= MODULE 9 ================= */
{
  id: "gm3_2", title: "Number Properties", minutes: 14, level: "core",
  content: `
<p>Number properties questions look abstract and intimidating. They're actually the most mechanical
questions on the test — if you know the rules.</p>

<h2>Integers, factors, multiples</h2>
<ul>
  <li>A <strong>factor</strong> divides evenly into a number. (Factors of 12: 1, 2, 3, 4, 6, 12.)</li>
  <li>A <strong>multiple</strong> is that number times an integer. (Multiples of 12: 12, 24, 36…)</li>
  <li><strong>Prime</strong>: exactly two factors (1 and itself). 2, 3, 5, 7, 11, 13, 17, 19, 23…</li>
</ul>
<div class="warnbox"><strong>1 is NOT prime</strong> (it has only one factor). <strong>2 IS prime</strong> —
and it's the only even prime. Both appear as traps.</div>

<h3>Prime factorization: the master key</h3>
<p>Every integer breaks into primes uniquely. <strong>60 = 2² × 3 × 5.</strong> This unlocks a surprising
number of questions:</p>
<ul>
  <li><strong>Count the factors:</strong> add 1 to each exponent and multiply. 60 = 2²·3¹·5¹ → (2+1)(1+1)(1+1) = <strong>12 factors</strong>.</li>
  <li><strong>Divisibility:</strong> a number is divisible by 12 only if its prime factorization contains 2² × 3.</li>
</ul>

<h2>Divisibility rules (know these cold)</h2>
<table>
  <tr><th>Divisible by</th><th>Test</th></tr>
  <tr><td>2</td><td>Last digit is even</td></tr>
  <tr><td>3</td><td><strong>Digits sum to a multiple of 3</strong></td></tr>
  <tr><td>4</td><td>Last two digits form a multiple of 4</td></tr>
  <tr><td>5</td><td>Ends in 0 or 5</td></tr>
  <tr><td>6</td><td>Divisible by both 2 and 3</td></tr>
  <tr><td>9</td><td><strong>Digits sum to a multiple of 9</strong></td></tr>
  <tr><td>10</td><td>Ends in 0</td></tr>
</table>

<h2>Even / odd / positive / negative</h2>
<table>
  <tr><th>Operation</th><th>Result</th></tr>
  <tr><td>even ± even</td><td>even</td></tr>
  <tr><td>odd ± odd</td><td><strong>even</strong></td></tr>
  <tr><td>even ± odd</td><td>odd</td></tr>
  <tr><td>even × anything</td><td><strong>even</strong></td></tr>
  <tr><td>odd × odd</td><td>odd</td></tr>
</table>
<p>Two consecutive integers always include exactly one even, so <strong>n(n+1) is always even</strong>.</p>
<div class="keybox"><strong>Sign rules that decide Quantitative Comparisons:</strong>
<ul>
  <li>A negative raised to an <strong>even</strong> power → positive. To an <strong>odd</strong> power → negative.</li>
  <li>x² = 25 means x = 5 <strong>or</strong> x = −5. Even powers destroy sign information — this is the most common QC trap in existence.</li>
</ul></div>

<h2>The fraction zone: 0 < x < 1</h2>
<p>Numbers between 0 and 1 behave backwards from intuition:</p>
<ul>
  <li><strong>x² < x</strong> (squaring makes it smaller: 0.5² = 0.25)</li>
  <li><strong>√x > x</strong> (the root makes it bigger: √0.25 = 0.5)</li>
  <li>Dividing by it makes things bigger: 10 ÷ 0.5 = 20</li>
</ul>
<p>This is why "test a fraction between 0 and 1" is a mandatory step in Quantitative Comparison.</p>

<h2>Remainders and cyclicity</h2>
<p>Powers cycle in their units digits. This makes "find the units digit of 7⁶³" trivial:</p>
<div class="worked"><h4>Units digit of 7⁶³</h4>
<p>7¹ = 7, 7² = 4<strong>9</strong>, 7³ = 34<strong>3</strong>, 7⁴ = 240<strong>1</strong>, 7⁵ = …<strong>7</strong>.
The cycle is <strong>7, 9, 3, 1</strong> — length 4.</p>
<p>63 ÷ 4 = 15 remainder <strong>3</strong> → take the 3rd item in the cycle → <strong>3</strong>.</p></div>
<p>The same logic handles remainder questions: find the cycle of remainders, then reduce the exponent
modulo the cycle length.</p>

<h2>Exponent and root rules</h2>
<table>
  <tr><th>Rule</th><th>Example</th></tr>
  <tr><td>xᵃ · xᵇ = x<sup>a+b</sup></td><td>2³ · 2⁴ = 2⁷ (the base never changes)</td></tr>
  <tr><td>xᵃ ÷ xᵇ = x<sup>a−b</sup></td><td>2⁵ ÷ 2² = 2³</td></tr>
  <tr><td>(xᵃ)ᵇ = x<sup>ab</sup></td><td>(2³)² = 2⁶</td></tr>
  <tr><td>x⁰ = 1</td><td>(for any x ≠ 0)</td></tr>
  <tr><td>x<sup>−a</sup> = 1/xᵃ</td><td>2⁻³ = 1/8</td></tr>
</table>
<div class="warnbox"><strong>√(a + b) ≠ √a + √b.</strong> √(64 + 36) = √100 = 10, but √64 + √36 = 8 + 6 = 14.
Never distribute a root across addition. Same for exponents: (a + b)² ≠ a² + b² — it's a² + 2ab + b².</div>
<p>To compare exponentials, <strong>rewrite them in a common base</strong>: 9¹⁹ = (3²)¹⁹ = 3³⁸, which is
clearly less than 3⁴⁰.</p>

<h2>What you must remember</h2>
<ul>
  <li>1 isn't prime; 2 is. Prime factorization counts factors: add 1 to each exponent, multiply.</li>
  <li>Divisibility by 3 or 9: sum the digits.</li>
  <li><strong>x² = k has two roots.</strong> Even powers hide the sign.</li>
  <li>Between 0 and 1: squaring shrinks, rooting grows.</li>
  <li>Common base to compare exponents. Never distribute roots over addition.</li>
</ul>`,
  quiz: [
    { text: "How many distinct positive factors does 60 have?",
      choices: ["8", "10", "12", "16"],
      answer: 2,
      expl: "60 = 2² × 3¹ × 5¹. Add 1 to each exponent and multiply: (2+1)(1+1)(1+1) = 12." },
    { text: "If x² = 49, what are the possible values of x?",
      choices: ["7 only", "−7 only", "7 and −7", "0 and 7"],
      answer: 2,
      expl: "Even powers destroy sign information: both 7 and −7 square to 49. Forgetting the negative root is the most common trap in Quantitative Comparison." },
    { text: "If 0 < x < 1, which statement is TRUE?",
      choices: ["x² > x", "x² < x", "x² = x", "It cannot be determined"],
      answer: 1,
      expl: "Squaring a proper fraction makes it smaller: 0.5² = 0.25. This is why testing a fraction between 0 and 1 is mandatory in QC." },
    { text: "Which of the following is prime?",
      choices: ["1", "2", "9", "21"],
      answer: 1,
      expl: "2 is prime — and it is the only even prime. 1 is NOT prime (it has just one factor), 9 = 3², and 21 = 3 × 7." },
    { text: "What is the units digit of 7⁶³?",
      choices: ["1", "3", "7", "9"],
      answer: 1,
      expl: "The units digits of powers of 7 cycle 7, 9, 3, 1 (length 4). 63 ÷ 4 leaves remainder 3, so take the third item in the cycle: 3." },
    { text: "Which expression is equal to √64 + √36?",
      choices: ["√100", "14", "10", "√(64+36)"],
      answer: 1,
      expl: "√64 + √36 = 8 + 6 = 14. Note that √(64+36) = √100 = 10 — roots never distribute across addition." },
    { text: "For any integer n, which expression must be even?",
      choices: ["n²", "n(n + 1)", "n² + 1", "3n + 1"],
      answer: 1,
      expl: "n and n+1 are consecutive integers, so exactly one of them is even — making their product always even. The others flip parity depending on n." },
    { text: "Which two are true about exponents? (Select TWO.)",
      choices: [
        "2³ · 2⁴ = 2⁷",
        "2³ · 2⁴ = 4⁷",
        "(2³)² = 2⁶",
        "(a + b)² = a² + b²",
        "√(a + b) = √a + √b"],
      answer: [0, 2],
      expl: "Multiplying same-base powers adds exponents (and never changes the base); raising a power to a power multiplies them. The last two are classic distribution errors." }
  ]
},

/* ================= MODULE 10 ================= */
{
  id: "gm3_3", title: "Algebra", minutes: 15, level: "core",
  content: `
<p>GRE algebra is mechanical — but the test rewards people who avoid algebra when a shortcut exists.</p>

<h2>Linear equations and systems</h2>
<p>To solve two equations in two unknowns: <strong>substitution</strong> or <strong>elimination</strong>.
Elimination is usually faster when coefficients line up.</p>
<div class="worked"><h4>2x + y = 11 and x − y = 1. Find xy.</h4>
<p>The y coefficients are +1 and −1 — just <strong>add the equations</strong>: 3x = 12 → x = 4.
Then y = x − 1 = 3. So xy = <strong>12</strong>.</p>
<p><em>Notice the question asked for xy, not x.</em> Answer choices will include 4 and 3.</p></div>
<div class="warnbox"><strong>Always re-read what's asked.</strong> The GRE routinely asks for xy, or x + y,
or 2x — and puts the value of x among the choices. Solving correctly and answering the wrong question is
the most common way strong students lose points.</div>

<h2>Inequalities — one rule that matters</h2>
<p>Treat them like equations, with one exception: <strong>multiplying or dividing by a negative flips the
inequality sign.</strong></p>
<p>3 − 2x < 7 → −2x < 4 → <strong>x > −2</strong> (sign flipped).</p>

<h2>Quadratics</h2>
<p>Factor, don't use the quadratic formula — the GRE's quadratics always factor cleanly.</p>
<ul>
  <li>x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → x = 2 or 3.</li>
  <li>Note: <strong>(x − 2)(x − 3) < 0</strong> exactly when x is strictly <em>between</em> the roots: 2 < x < 3.</li>
</ul>

<h3>The three identities worth memorizing</h3>
<table>
  <tr><td>(a + b)² = a² + <strong>2ab</strong> + b²</td></tr>
  <tr><td>(a − b)² = a² − <strong>2ab</strong> + b²</td></tr>
  <tr><td><strong>a² − b² = (a + b)(a − b)</strong> — the difference of squares</td></tr>
</table>
<div class="worked"><h4>If x + 1/x = 4, find x² + 1/x².</h4>
<p>Square the given: (x + 1/x)² = x² + 2·x·(1/x) + 1/x² = x² + <strong>2</strong> + 1/x² = 16.</p>
<p>So x² + 1/x² = <strong>14</strong>. The cross-term is always 2 — this exact question appears constantly.</p></div>

<h2>Two techniques that beat algebra</h2>

<h3>1. Plug in numbers (for variables in the answer choices)</h3>
<p>If a question is entirely in variables and the answers are too, <strong>pick easy numbers</strong>, compute
the target, and test the choices. Use numbers that are easy but not degenerate — avoid 0 and 1, which can
make several choices tie.</p>

<h3>2. Backsolve (from the answer choices)</h3>
<p>If the answers are specific numbers and the algebra is ugly, <strong>test the choices</strong>. Start with
the middle value: if it's too big, you've eliminated it and everything above it in one move.</p>

<h2>Functions and symbols</h2>
<p>f(x) = x² − 3x is just a rule. f(2) = 4 − 6 = −2. Nested: f(f(2)) = f(−2) = 4 + 6 = <strong>10</strong>.
Work <em>inside out</em>, and mind the signs — (−2)² = +4, and −3(−2) = +6.</p>
<p>The GRE also invents symbols: "define a ⊕ b = a² − b." These are never hard; just follow the definition
literally.</p>

<h2>Sequences</h2>
<ul>
  <li><strong>Arithmetic</strong> (add d each time): aₙ = a₁ + <strong>(n − 1)</strong>d. The "n − 1" is the trap — from term 1 to term 10 there are only <em>nine</em> steps.</li>
  <li><strong>Geometric</strong> (multiply by r): aₙ = a₁ · r<sup>n−1</sup>.</li>
  <li><strong>Sum 1 to n</strong> = n(n + 1)/2. (Sum 1–50 = 50 × 51/2 = 1,275.)</li>
</ul>

<h2>What you must remember</h2>
<ul>
  <li><strong>Re-read what's asked.</strong> Solving for x when the question wants xy is the classic loss.</li>
  <li>Dividing an inequality by a negative flips the sign.</li>
  <li>(a+b)² has a 2ab term. a² − b² factors. Squaring x + 1/x always yields a +2.</li>
  <li>Plug in numbers when the answers have variables; backsolve when they're numbers.</li>
  <li>Arithmetic sequence: (n − 1)d, not nd.</li>
</ul>`,
  quiz: [
    { text: "If 2x + y = 11 and x − y = 1, what is the value of xy?",
      choices: ["3", "4", "12", "7"],
      answer: 2,
      expl: "Adding the equations eliminates y: 3x = 12, so x = 4 and y = 3. The question asks for xy = 12 — note that 4 and 3 both appear as traps." },
    { text: "Solve: 3 − 2x < 7",
      choices: ["x < −2", "x > −2", "x < 2", "x > 2"],
      answer: 1,
      expl: "−2x < 4, and dividing by −2 flips the inequality: x > −2. Failing to flip the sign is the single most common inequality error." },
    { text: "If x + 1/x = 4, what is x² + 1/x²?",
      choices: ["12", "14", "16", "18"],
      answer: 1,
      expl: "Square both sides: (x + 1/x)² = x² + 2 + 1/x² = 16, so x² + 1/x² = 14. The cross-term is always exactly 2." },
    { text: "For which values of x is (x − 2)(x − 3) < 0?",
      choices: ["x < 2", "x > 3", "2 < x < 3", "x < 2 or x > 3"],
      answer: 2,
      expl: "A quadratic is negative strictly between its roots. At x = 2 or x = 3 the product is zero, not less than zero, so the endpoints are excluded." },
    { text: "In an arithmetic sequence with first term 5 and common difference 4, what is the 10th term?",
      choices: ["40", "41", "45", "49"],
      answer: 1,
      expl: "aₙ = a₁ + (n−1)d = 5 + 9(4) = 41. There are only nine steps from term 1 to term 10 — using 10d gives 45, the built-in trap." },
    { text: "If f(x) = x² − 3x, what is f(f(2))?",
      choices: ["−2", "0", "4", "10"],
      answer: 3,
      expl: "f(2) = 4 − 6 = −2. Then f(−2) = (−2)² − 3(−2) = 4 + 6 = 10. Work inside out and watch the signs." },
    { text: "A question gives answer choices entirely in variables. Which technique is MOST efficient?",
      choices: [
        "Plug in easy numbers for the variables and test the choices",
        "Always use the quadratic formula",
        "Guess randomly",
        "Solve symbolically no matter how long it takes"],
      answer: 0,
      expl: "Picking concrete, easy numbers converts an abstract manipulation into arithmetic. Avoid 0 and 1, which can make multiple choices coincidentally match." },
    { text: "Which two identities are correct? (Select TWO.)",
      choices: [
        "(a + b)² = a² + 2ab + b²",
        "(a + b)² = a² + b²",
        "a² − b² = (a + b)(a − b)",
        "a² + b² = (a + b)(a − b)",
        "√(a² + b²) = a + b"],
      answer: [0, 2],
      expl: "The square of a binomial includes the 2ab cross-term, and the difference of squares factors into conjugates. The others are classic distribution errors." }
  ]
},

/* ================= MODULE 11 ================= */
{
  id: "gm3_4", title: "Word Problems", minutes: 12, level: "core",
  content: `
<p>Word problems aren't a math topic — they're a translation skill. The math is easy once the sentence
becomes an equation.</p>

<h2>Translate literally</h2>
<table>
  <tr><th>Words</th><th>Math</th></tr>
  <tr><td>is, are, was, will be</td><td>=</td></tr>
  <tr><td>of</td><td>×</td></tr>
  <tr><td>more than, sum, increased by</td><td>+</td></tr>
  <tr><td>less than, fewer than</td><td>− <em>(careful: "5 less than x" is x − 5, not 5 − x)</em></td></tr>
  <tr><td>per, for each</td><td>÷ (a rate)</td></tr>
  <tr><td>percent</td><td>÷ 100</td></tr>
</table>

<h2>Interest</h2>
<ul>
  <li><strong>Simple interest:</strong> I = P × r × t. Linear — the interest is on the original principal only.</li>
  <li><strong>Compound interest:</strong> A = P(1 + r)ᵗ. Each period's interest earns interest.</li>
</ul>
<div class="worked"><h4>$10,000 at 10% compounded annually for 2 years</h4>
<p>A = 10000 × (1.1)² = 10000 × 1.21 = <strong>$12,100</strong>.</p>
<p>Simple interest would have given $12,000. The extra $100 <em>is</em> the compounding — interest earned
on year one's interest. Both figures appear in the answer choices.</p></div>

<h2>Mixtures and weighted averages</h2>
<p>A weighted average is pulled toward whichever group is bigger.</p>
<div class="worked"><h4>A class of 30 averages 80. Another class of 20 averages 90. What's the combined average?</h4>
<p><strong>Not 85.</strong> Use totals: (30 × 80) + (20 × 90) = 2400 + 1800 = 4200, over 50 students =
<strong>84</strong>.</p>
<p>It's pulled toward 80 because that group is larger. Whenever groups differ in size, the simple average
of the averages is wrong — and it's always among the answer choices.</p></div>

<h2>Overlapping sets</h2>
<p><strong>Two groups:</strong> |A ∪ B| = |A| + |B| − |A ∩ B|. Subtract the overlap, which you counted twice.</p>
<div class="worked"><h4>How many integers from 1 to 100 are divisible by 3 or 5?</h4>
<p>By 3: ⌊100/3⌋ = 33. By 5: ⌊100/5⌋ = 20. By <strong>both</strong> (i.e. by 15): ⌊100/15⌋ = 6.</p>
<p>33 + 20 − 6 = <strong>47</strong>.</p></div>
<p>For "neither" problems, a 2×2 grid is faster than any formula. Draw it.</p>

<h2>Age, coin, and consecutive-integer problems</h2>
<ul>
  <li><strong>Ages:</strong> define one variable and express everyone in terms of it. "In 5 years" means add 5 to <em>everyone</em>.</li>
  <li><strong>Consecutive integers:</strong> n, n+1, n+2. Consecutive <em>even</em> or <em>odd</em>: n, n+2, n+4.</li>
  <li><strong>Evenly spaced sets:</strong> mean = median = (first + last)/2. This shortcut kills many questions instantly.</li>
</ul>

<h2>The discipline that prevents most word-problem errors</h2>
<ol>
  <li><strong>Define your variable explicitly.</strong> Write "let x = the number of adult tickets" — not just "x."</li>
  <li><strong>Write the equation before computing anything.</strong></li>
  <li><strong>Check the units.</strong> Hours vs minutes, dollars vs cents — the GRE switches them mid-problem on purpose.</li>
  <li><strong>Answer the question that was asked.</strong> Underline it.</li>
</ol>

<h2>What you must remember</h2>
<ul>
  <li>Translate word by word. "5 less than x" = x − 5.</li>
  <li>Compound ≠ simple. A = P(1 + r)ᵗ.</li>
  <li>Weighted averages use totals, never the average of the averages.</li>
  <li>Overlapping sets: add, then subtract the overlap.</li>
  <li>Evenly spaced set: mean = median = (first + last)/2.</li>
</ul>`,
  quiz: [
    { text: "$10,000 is invested at 10% annual interest compounded annually. What is its value after 2 years?",
      choices: ["$12,000", "$12,100", "$11,000", "$12,210"],
      answer: 1,
      expl: "A = 10000(1.1)² = 10000 × 1.21 = $12,100. Simple interest would give $12,000 — the extra $100 is interest earned on interest." },
    { text: "A class of 30 students averages 80. Another class of 20 averages 90. What is the combined average?",
      choices: ["85", "84", "86", "83"],
      answer: 1,
      expl: "Use totals: (30×80 + 20×90)/50 = 4200/50 = 84. The average is pulled toward the larger group. The tempting 85 is the trap." },
    { text: "How many integers from 1 to 100 inclusive are divisible by 3 or by 5?",
      choices: ["45", "47", "53", "50"],
      answer: 1,
      expl: "Inclusion-exclusion: 33 (multiples of 3) + 20 (multiples of 5) − 6 (multiples of 15, counted twice) = 47." },
    { text: "How would you translate '5 less than x'?",
      choices: ["5 − x", "x − 5", "5x", "x/5"],
      answer: 1,
      expl: "'5 less than x' means you take x and remove 5: x − 5. Reversing this is one of the most common translation errors." },
    { text: "In an evenly spaced set of numbers, which statement is TRUE?",
      choices: [
        "The mean is always greater than the median",
        "The mean equals the median, and both equal (first + last)/2",
        "The median is always greater than the mean",
        "Neither can be determined"],
      answer: 1,
      expl: "Evenly spaced sets are symmetric, so mean and median coincide at the midpoint. This shortcut resolves many questions in seconds." },
    { text: "A boat travels 36 miles downstream with a 3 mph current and returns 36 miles upstream. Its speed in still water is 15 mph. What is the total travel time?",
      choices: ["4.8 hours", "5 hours", "4 hours", "6 hours"],
      answer: 1,
      expl: "Downstream 18 mph: 36/18 = 2 hours. Upstream 12 mph: 36/12 = 3 hours. Total 5 hours. Using 15 mph both ways gives 4.8 — the trap." },
    { text: "Which two are sound word-problem habits? (Select TWO.)",
      choices: [
        "Define your variable explicitly before writing equations",
        "Compute first and set up the equation afterward",
        "Check that units are consistent throughout",
        "Assume all rates are per hour",
        "Average the averages when combining groups"],
      answer: [0, 2],
      expl: "Explicit variable definitions and unit consistency prevent most word-problem errors. Averaging averages ignores group sizes and is usually wrong." }
  ]
}
    ],

/* ================= CHECKPOINT 3 (cumulative) ================= */
    checkpoint: {
      id: "gcp3", title: "Quantitative Foundations", n: 18,
      questions: [
        { text: "A price increases 25% and then decreases 20%. The final price is what percent of the original?",
          choices: ["95%", "100%", "105%", "90%"],
          answer: 1,
          expl: "1.25 × 0.80 = 1.00 — exactly 100%. These two changes are exact inverses (5/4 × 4/5 = 1)." },
        { text: "If x² = 36, what are the possible values of x?",
          choices: ["6 only", "6 and −6", "−6 only", "0 and 6"],
          answer: 1,
          expl: "Even powers hide sign information: both 6 and −6 square to 36." },
        { text: "How many usable factors does 36 have?",
          choices: ["6", "8", "9", "12"],
          answer: 2,
          expl: "36 = 2² × 3². Add 1 to each exponent and multiply: (2+1)(2+1) = 9 factors." },
        { text: "The average of 4 numbers is 15. If three of them are 10, 14, and 20, what is the fourth?",
          choices: ["14", "16", "18", "20"],
          answer: 1,
          expl: "Total must be 4 × 15 = 60. The three given sum to 44, so the fourth is 16." },
        { text: "Solve: 5 − 3x > 14",
          choices: ["x > −3", "x < −3", "x > 3", "x < 3"],
          answer: 1,
          expl: "−3x > 9, and dividing by −3 flips the sign: x < −3." },
        { text: "If 0 < x < 1, which is TRUE?",
          choices: ["√x < x", "√x > x", "√x = x", "Cannot be determined"],
          answer: 1,
          expl: "Taking the root of a proper fraction makes it larger: √0.25 = 0.5 > 0.25." },
        { text: "Which two numbers are prime? (Select TWO.)",
          choices: ["2", "1", "17", "21", "9"],
          answer: [0, 2],
          expl: "2 is the only even prime, and 17 is prime. 1 is not prime, 21 = 3×7, and 9 = 3²." },
        { text: "What is the units digit of 3⁴⁷?",
          choices: ["1", "3", "7", "9"],
          answer: 2,
          expl: "Powers of 3 cycle in units digit: 3, 9, 7, 1 (length 4). 47 ÷ 4 leaves remainder 3, so the third item: 7." },
        { text: "Machines A and B take 4 and 12 hours respectively to complete a job alone. Working together, how long?",
          choices: ["3 hours", "8 hours", "2 hours", "6 hours"],
          answer: 0,
          expl: "Add rates: 1/4 + 1/12 = 4/12 = 1/3 job per hour → 3 hours. Together must beat the faster machine's 4 hours — and it does." },
        { text: "The ratio of red to blue marbles is 2:7 and there are 63 marbles. How many are blue?",
          choices: ["14", "42", "49", "56"],
          answer: 2,
          expl: "Parts sum to 9; each part is 63 ÷ 9 = 7. Blue = 7 × 7 = 49." },
        { text: "If x + 1/x = 5, what is x² + 1/x²?",
          choices: ["21", "23", "25", "27"],
          answer: 1,
          expl: "Squaring gives x² + 2 + 1/x² = 25, so x² + 1/x² = 23. The cross-term is always 2." },
        { text: "Which two statements about percent change are correct? (Select TWO.)",
          choices: [
            "Percent change divides by the original value",
            "Doubling a value is a 200% increase",
            "Doubling a value is a 100% increase",
            "Percent change divides by the new value",
            "Successive percent changes are added"],
          answer: [0, 2],
          expl: "Percent change is (new − old)/old, and doubling means the change equals the original — a 100% increase. Successive changes multiply, not add." },
        { text: "In an arithmetic sequence with a₁ = 3 and d = 5, what is the 8th term?",
          choices: ["38", "40", "43", "35"],
          answer: 0,
          expl: "a₈ = 3 + (8−1)(5) = 3 + 35 = 38. The trap is using 8d instead of 7d." },
        { text: "A class of 40 averages 70; a class of 10 averages 90. What is the combined average?",
          choices: ["80", "74", "78", "72"],
          answer: 1,
          expl: "Totals: (40×70 + 10×90)/50 = (2800 + 900)/50 = 74. The average is pulled toward the larger group." },
        { text: "Which of the following is divisible by 3?",
          choices: ["1,234", "5,678", "9,876", "4,447"],
          answer: 2,
          expl: "Sum the digits: 9+8+7+6 = 30, which is divisible by 3. The others' digit sums (10, 26, 19) are not." },
        { text: "What is √(36 + 64)?",
          choices: ["14", "10", "100", "6 + 8"],
          answer: 1,
          expl: "√(36 + 64) = √100 = 10. Note that √36 + √64 = 14 — roots never distribute over addition." },
        { text: "If 4x − 7 = 21, what is the value of 2x?",
          choices: ["7", "14", "28", "3.5"],
          answer: 1,
          expl: "4x = 28, so x = 7 and 2x = 14. The question asks for 2x, not x — and 7 sits among the choices as a trap." },
        { text: "How many integers from 1 to 60 are divisible by 4 or 6?",
          choices: ["20", "25", "15", "30"],
          answer: 0,
          expl: "By 4: 15. By 6: 10. By both (i.e. by 12): 5. Inclusion-exclusion: 15 + 10 − 5 = 20." },
        { text: "Which two behaviors are true of numbers between 0 and 1? (Select TWO.)",
          choices: [
            "Squaring makes them smaller",
            "Squaring makes them larger",
            "Taking the square root makes them larger",
            "Taking the square root makes them smaller",
            "They behave exactly like integers"],
          answer: [0, 2],
          expl: "Proper fractions shrink when squared and grow when rooted — the reverse of integer intuition, which is exactly why they must be tested in Quantitative Comparison." },
        { text: "A car covers 120 miles at 60 mph and returns at 40 mph. What is the average speed for the round trip?",
          choices: ["50 mph", "48 mph", "45 mph", "52 mph"],
          answer: 1,
          expl: "Total distance 240 miles; time = 2 + 3 = 5 hours; 240/5 = 48 mph. Averaging 60 and 40 to get 50 is the trap." }
      ]
    }
  });
})();
