/* GRE Study Course - Unit 3: Quantitative Foundations */
(function () {
  const C = window.GRECOURSE = window.GRECOURSE || { units: [] };

  C.units.push({
    id: "u3",
    title: "Unit 3: Quantitative Foundations",
    blurb: "Arithmetic, number properties, algebra, and word problems. The content is high-school level. The difficulty is in the traps and the clock.",
    modules: [

/* ================= MODULE 8 ================= */
{
  id: "gm3_1", title: "Arithmetic, Fractions, Percents, and Ratios", minutes: 15, level: "core",
  content: `
<p>The GRE's math content stops at roughly high-school level. No calculus, no trigonometry. What makes it
hard is that the questions are engineered so the obvious move is wrong.</p>

<h2>Fractions, decimals, percents, one idea in three costumes</h2>
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
<div class="warnbox"><strong>Percent OF vs percent GREATER THAN: the #1 quant trap.</strong>
<p>If a value goes from 50 to 90:</p>
<ul>
  <li>90 <strong>is</strong> 180% <strong>of</strong> 50. (90/50 = 1.8)</li>
  <li>90 is <strong>80% greater than</strong> 50. (the <em>change</em>, 40, over the original, 50)</li>
</ul>
<p>Both numbers appear in the answer choices. Read which one is asked.</p></div>

<h3>Percent change</h3>
<p><strong>Percent change = (new − old) / old × 100.</strong> The denominator is always the <em>original</em>.</p>
<p>Doubling = +100% increase. Tripling = +200%. Quadrupling = +300%. (Not 200%, 300%, 400%: a favorite trap.)</p>

<h3>Successive percent changes multiply: they don't add</h3>
<div class="worked"><h4>A stock rises 20%, then falls 20%. Where is it?</h4>
<p><em>Not</em> back where it started. 1.20 × 0.80 = <strong>0.96</strong>: it's down 4%.</p>
<p>General rule: up x% then down x% always lands <em>below</em> the start, because the decrease is applied
to a bigger number. The factor is (1+x)(1−x) = 1 − x².</p>
<p><strong>But:</strong> +25% then −20% returns exactly to the start, because 1.25 × 0.80 = 1.00.
(5/4 × 4/5 = 1.) The GRE loves this one.</p></div>

<h2>Ratios</h2>
<p>A ratio of 3:5 doesn't tell you the quantities, only the proportion. The actual values are 3k and 5k
for some multiplier k.</p>
<div class="worked"><h4>The ratio of boys to girls is 3:5 and there are 48 students. How many girls?</h4>
<p>Total parts = 3 + 5 = <strong>8</strong>. Each part = 48 ÷ 8 = <strong>6</strong> students.<br>
Girls = 5 × 6 = <strong>30</strong>.</p>
<p><strong>The method:</strong> always sum the parts first, then find the value of one part.</p></div>
<div class="exambox"><strong>Exam angle:</strong> since a ratio fixes only the proportion, any question
asking for an actual quantity from a ratio alone is unanswerable, which makes "cannot be determined" a
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
      expl: "Turn each change into a multiplier and multiply — percent changes never add.<br>Up 20% → × 1.20<br>Down 20% → × 0.80<br>1.20 × 0.80 = <strong>0.96</strong> → <strong>96% of the original</strong>.<br><em>The trap:</em> answering 100% by assuming the two 20% moves cancel. The drop is taken from the larger 120, so it removes more than the rise added.<br><em>Fast method:</em> up x% then down x% gives a factor of 1 − x², so it always lands below the start. Target: ~15 seconds." },
    { text: "45 is 30 percent of what number?",
      choices: ["13.5", "60", "135", "150"],
      answer: 3,
      expl: "Translate word for word: <em>is</em> means equals, <em>of</em> means times.<br>45 = 0.30 × n<br><strong>n = 45 ÷ 0.3 = 150</strong><br>Check: 30% of 150 = 45.<br><em>The trap:</em> 13.5 comes from computing 30% <em>of</em> 45 — the reversed operation. When the unknown is the whole, you divide.<br><em>Fast method:</em> part ÷ percent = whole; if the answer must be bigger than the part, divide, never multiply. Target: ~15 seconds." },
    { text: "The ratio of boys to girls in a class is 3 to 5, and there are 48 students. How many girls are there?",
      choices: ["18", "24", "30", "32"],
      answer: 2,
      expl: "Sum the parts first, then find what one part is worth.<br>Parts = 3 + 5 = 8<br>One part = 48 ÷ 8 = <strong>6 students</strong><br>Girls = 5 × 6 = <strong>30</strong><br>Check: boys = 3 × 6 = 18, and 18 + 30 = 48.<br><em>The trap:</em> 18 is the boys' count. The ratio is given boys-to-girls, so the 5 belongs to the girls.<br><em>Fast method:</em> total ÷ sum of parts = one part, then multiply by the part you were asked for. Target: ~15 seconds." },
    { text: "Machine A completes a job in 6 hours and machine B in 12 hours. Working together, how long do they take?",
      choices: ["3 hours", "4 hours", "9 hours", "18 hours"],
      answer: 1,
      expl: "Add rates, never times.<br>A = 1/6 job per hour, B = 1/12 job per hour<br>1/6 + 1/12 = 2/12 + 1/12 = <strong>1/4 job per hour</strong><br>Time = 1 ÷ (1/4) = <strong>4 hours</strong><br><em>The trap:</em> 9 hours is the average of 6 and 12. Two machines together must beat the faster one alone, so any total above 6 hours is impossible on sight.<br><em>Fast method:</em> for two workers, combined time = product ÷ sum = 72 ÷ 18 = 4. Target: ~20 seconds." },
    { text: "The average of 5 numbers is 20. Four of them are 18, 22, 17, and 25. What is the fifth?",
      choices: ["16", "18", "20", "22"],
      answer: 1,
      expl: "Convert the average into a total immediately.<br>Total = 5 × 20 = <strong>100</strong><br>18 + 22 + 17 + 25 = 82<br>Fifth = 100 − 82 = <strong>18</strong><br><em>The trap:</em> 20, which is just the average repeated. The four given numbers run 2 above their own share (82 versus 80), so the fifth must sit 2 <em>below</em> 20.<br><em>Fast method:</em> sum = average × count; the missing value is the total minus what you already have. Target: ~15 seconds." },
    { text: "A value increases from 50 to 90. Which statement is correct?",
      choices: [
        "90 is 80% greater than 50, and 180% of 50",
        "90 is 180% greater than 50",
        "90 is 40% greater than 50",
        "90 is 80% of 50"],
      answer: 0,
      expl: "Two different measurements hide in one sentence — compute both.<br>Percent greater than: change ÷ original = (90 − 50)/50 = 40/50 = <strong>80% greater</strong><br>Percent of: 90 ÷ 50 = 1.8 = <strong>180% of 50</strong><br>So the statement pairing 80% greater with 180% of is the one that holds.<br><em>The trap:</em> calling it a 180% <em>increase</em>, which fuses the two forms into a number that is true of neither.<br><em>Fast method:</em> percent OF divides new by old; percent GREATER divides the change by old. The two always differ by exactly 100. Target: ~20 seconds." },
    { text: "A car travels 60 miles at 60 mph and returns the same 60 miles at 30 mph. What is its average speed for the trip?",
      choices: ["45 mph", "40 mph", "50 mph", "35 mph"],
      answer: 1,
      expl: "Never average speeds — average the whole trip.<br>Out: 60 ÷ 60 = 1 hour<br>Back: 60 ÷ 30 = 2 hours<br>Total distance 120 miles in <strong>3 hours</strong><br>120 ÷ 3 = <strong>40 mph</strong><br><em>The trap:</em> 45 mph, the midpoint of 60 and 30. More of the trip's <em>time</em> is spent at the slow speed, so the true average must fall below the midpoint.<br><em>Fast method:</em> equal distances at a and b → 2ab/(a+b) = 3600/90 = 40. Target: ~25 seconds." },
    { text: "Which two statements about ratios are true? (Select TWO.)",
      choices: [
        "A ratio gives the proportion but not the actual quantities",
        "A ratio of 3:5 means there are exactly 3 and 5 items",
        "To use a ratio with a total, sum the parts and find the value of one part",
        "Ratios can only be used with whole numbers",
        "A ratio always equals a percentage"],
      answer: [0, 2],
      expl: "Rewrite the ratio as 3k:5k and test each statement against it.<br><strong>A ratio gives proportion, not actual quantities</strong> — k is unknown, so this is true.<br><strong>Sum the parts and find one part</strong> — that is exactly how you turn a ratio plus a total into real numbers, so this is true too.<br><em>The trap:</em> reading 3:5 as exactly 3 and 5 items; 6 and 10, or 30 and 50, fit just as well. Ratios also handle non-integers, and a ratio is not a percentage.<br><em>Fast method:</em> write every ratio with the k in place and the true statements pick themselves out. Target: ~25 seconds." }
  ]
},

/* ================= MODULE 9 ================= */
{
  id: "gm3_2", title: "Number Properties", minutes: 14, level: "core",
  content: `
<p>Number properties questions look abstract and intimidating. They're actually the most mechanical
questions on the test, if you know the rules.</p>

<h2>Integers, factors, multiples</h2>
<ul>
  <li>A <strong>factor</strong> divides evenly into a number. (Factors of 12: 1, 2, 3, 4, 6, 12.)</li>
  <li>A <strong>multiple</strong> is that number times an integer. (Multiples of 12: 12, 24, 36…)</li>
  <li><strong>Prime</strong>: exactly two factors (1 and itself). 2, 3, 5, 7, 11, 13, 17, 19, 23…</li>
</ul>
<div class="warnbox"><strong>1 is NOT prime</strong> (it has only one factor). <strong>2 IS prime</strong>: 
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
  <li>x² = 25 means x = 5 <strong>or</strong> x = −5. Even powers destroy sign information. This is the most common QC trap in existence.</li>
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
The cycle is <strong>7, 9, 3, 1</strong>: length 4.</p>
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
Never distribute a root across addition. Same for exponents: (a + b)² ≠ a² + b²; it's a² + 2ab + b².</div>
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
      expl: "Don't list factors — break the number into primes and count from the exponents.<br>60 = 6 × 10 = (2 × 3)(2 × 5) = <strong>2² × 3¹ × 5¹</strong><br>Add 1 to each exponent and multiply: (2+1)(1+1)(1+1) = 3 × 2 × 2 = <strong>12</strong><br><em>The trap:</em> a count of 8 or 10 comes from hand-listing and dropping a pair — 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60 is easy to shorten by accident.<br><em>Fast method:</em> exponents plus one, all multiplied together, gives the factor count in a single line. Target: ~20 seconds." },
    { text: "If x² = 49, what are the possible values of x?",
      choices: ["7 only", "−7 only", "7 and −7", "0 and 7"],
      answer: 2,
      expl: "An even power erases the sign, so expect a pair of solutions.<br>x² = 49<br>7² = 49, so x = 7 works<br>(−7)² = 49 as well, so x = −7 works<br>Both values satisfy the equation: <strong>7 and −7</strong>.<br><em>The trap:</em> answering 7 only. The equation x² = 49 is not the same as the expression √49, which is defined as just 7.<br><em>Fast method:</em> x² = k always gives x = ±√k — write the ± down before doing anything else. Target: ~10 seconds." },
    { text: "If 0 < x < 1, which statement is TRUE?",
      choices: ["x² > x", "x² < x", "x² = x", "It cannot be determined"],
      answer: 1,
      expl: "Don't reason abstractly — plug in a number in the range. Use x = 0.5.<br>x² = 0.25<br>0.25 is less than 0.5, so <strong>x² &lt; x</strong><br>Confirm with x = 0.1: 0.01 &lt; 0.1. Same direction.<br><em>The trap:</em> assuming x² &gt; x out of integer habit. That holds only for x &gt; 1; multiplying by something smaller than 1 shrinks a number.<br><em>Fast method:</em> for any 0 &lt; x &lt; 1 claim, test 0.5 once — squaring shrinks, rooting grows. Target: ~10 seconds." },
    { text: "Which of the following is prime?",
      choices: ["1", "2", "9", "21"],
      answer: 1,
      expl: "Hold each candidate against the definition: exactly two factors.<br>1 → only one factor, so not prime<br>2 → factors 1 and 2 only → <strong>prime</strong><br>9 = 3 × 3 → three factors, not prime<br>21 = 3 × 7 → not prime<br>So the answer is <strong>2</strong>.<br><em>The trap:</em> treating 1 as prime, or rejecting 2 because it is even. 2 is the <em>only</em> even prime.<br><em>Fast method:</em> memorize the two edge cases (1 is not prime, 2 is) and the rest is trial division. Target: ~10 seconds." },
    { text: "What is the units digit of 7⁶³?",
      choices: ["1", "3", "7", "9"],
      answer: 1,
      expl: "Only the last digit matters, so find where it starts repeating.<br>7¹ → 7<br>7² = 49 → 9<br>7³ = 343 → 3<br>7⁴ = 2401 → 1<br>The cycle is <strong>7, 9, 3, 1</strong>, length 4.<br>63 ÷ 4 = 15 remainder <strong>3</strong> → third slot in the cycle → <strong>3</strong><br><em>The trap:</em> 1, which belongs to remainder 0 (exponents that are multiples of 4), or 7, from starting the cycle at 7⁰.<br><em>Fast method:</em> divide the exponent by the cycle length and read the remainder as a position, with remainder 0 meaning the last slot. Target: ~25 seconds." },
    { text: "Which expression is equal to √64 + √36?",
      choices: ["√100", "14", "10", "√(64+36)"],
      answer: 1,
      expl: "Take each root on its own — that is exactly what the expression says.<br>√64 = 8<br>√36 = 6<br>8 + 6 = <strong>14</strong><br><em>The trap:</em> 10, which is √(64 + 36) = √100. Roots never distribute across addition, so √64 + √36 and √(64+36) are genuinely different numbers, and both sit in the choices.<br><em>Fast method:</em> resolve each radical first and add second; a choice that merges separate radicals into one is the planted error. Target: ~15 seconds." },
    { text: "For any integer n, which expression must be even?",
      choices: ["n²", "n(n + 1)", "n² + 1", "3n + 1"],
      answer: 1,
      expl: "\"Must be\" means it has to survive both an even n and an odd n — test both.<br>n(n + 1): n and n + 1 are consecutive, so one of the two is always even, and even × anything is even → <strong>always even</strong><br>n²: n = 3 gives 9, odd<br>n² + 1: n = 2 gives 5, odd<br>3n + 1: n = 2 gives 7, odd<br><em>The trap:</em> picking an expression that happens to be even for one value of n. Consecutive integers are the only guarantee here.<br><em>Fast method:</em> on must-be questions, plug in one even and one odd value; a single odd result kills the choice. Target: ~25 seconds." },
    { text: "Which two are true about exponents? (Select TWO.)",
      choices: [
        "2³ · 2⁴ = 2⁷",
        "2³ · 2⁴ = 4⁷",
        "(2³)² = 2⁶",
        "(a + b)² = a² + b²",
        "√(a + b) = √a + √b"],
      answer: [0, 2],
      expl: "Check each claim against the two rules that actually exist, then confirm with numbers.<br>Same base multiplied → add the exponents: 2³ · 2⁴ = 2⁷ = 128, and 8 × 16 = 128. <strong>True</strong>.<br>Power of a power → multiply the exponents: (2³)² = 2⁶ = 64, and 8² = 64. <strong>True</strong>.<br><em>The trap:</em> the version that changes the base to 4⁷ — the base never moves when you add exponents. The distribution claims also fail on numbers: (3+4)² = 49, not 9 + 16, and √(9+16) = 5, not 3 + 4.<br><em>Fast method:</em> plug in 2s, 3s and 4s; a false identity breaks on the first try. Target: ~30 seconds." }
  ]
},

/* ================= MODULE 10 ================= */
{
  id: "gm3_3", title: "Algebra", minutes: 15, level: "core",
  content: `
<p>GRE algebra is mechanical, but the test rewards people who avoid algebra when a shortcut exists.</p>

<h2>Linear equations and systems</h2>
<p>To solve two equations in two unknowns: <strong>substitution</strong> or <strong>elimination</strong>.
Elimination is usually faster when coefficients line up.</p>
<div class="worked"><h4>2x + y = 11 and x − y = 1. Find xy.</h4>
<p>The y coefficients are +1 and −1, just <strong>add the equations</strong>: 3x = 12 → x = 4.
Then y = x − 1 = 3. So xy = <strong>12</strong>.</p>
<p><em>Notice the question asked for xy, not x.</em> Answer choices will include 4 and 3.</p></div>
<div class="warnbox"><strong>Always re-read what's asked.</strong> The GRE routinely asks for xy, or x + y,
or 2x, and puts the value of x among the choices. Solving correctly and answering the wrong question is
the most common way strong students lose points.</div>

<h2>Inequalities, one rule that matters</h2>
<p>Treat them like equations, with one exception: <strong>multiplying or dividing by a negative flips the
inequality sign.</strong></p>
<p>3 − 2x < 7 → −2x < 4 → <strong>x > −2</strong> (sign flipped).</p>

<h2>Quadratics</h2>
<p>Factor, don't use the quadratic formula: the GRE's quadratics always factor cleanly.</p>
<ul>
  <li>x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → x = 2 or 3.</li>
  <li>Note: <strong>(x − 2)(x − 3) < 0</strong> exactly when x is strictly <em>between</em> the roots: 2 < x < 3.</li>
</ul>

<h3>The three identities worth memorizing</h3>
<table>
  <tr><td>(a + b)² = a² + <strong>2ab</strong> + b²</td></tr>
  <tr><td>(a − b)² = a² − <strong>2ab</strong> + b²</td></tr>
  <tr><td><strong>a² − b² = (a + b)(a − b)</strong>: the difference of squares</td></tr>
</table>
<div class="worked"><h4>If x + 1/x = 4, find x² + 1/x².</h4>
<p>Square the given: (x + 1/x)² = x² + 2·x·(1/x) + 1/x² = x² + <strong>2</strong> + 1/x² = 16.</p>
<p>So x² + 1/x² = <strong>14</strong>. The cross-term is always 2. This exact question appears constantly.</p></div>

<h2>Two techniques that beat algebra</h2>

<h3>1. Plug in numbers (for variables in the answer choices)</h3>
<p>If a question is entirely in variables and the answers are too, <strong>pick easy numbers</strong>, compute
the target, and test the choices. Use numbers that are easy but not degenerate: avoid 0 and 1, which can
make several choices tie.</p>

<h3>2. Backsolve (from the answer choices)</h3>
<p>If the answers are specific numbers and the algebra is ugly, <strong>test the choices</strong>. Start with
the middle value: if it's too big, you've eliminated it and everything above it in one move.</p>

<h2>Functions and symbols</h2>
<p>f(x) = x² − 3x is just a rule. f(2) = 4 − 6 = −2. Nested: f(f(2)) = f(−2) = 4 + 6 = <strong>10</strong>.
Work <em>inside out</em>, and mind the signs, (−2)² = +4, and −3(−2) = +6.</p>
<p>The GRE also invents symbols: "define a ⊕ b = a² − b." These are never hard; just follow the definition
literally.</p>

<h2>Sequences</h2>
<ul>
  <li><strong>Arithmetic</strong> (add d each time): aₙ = a₁ + <strong>(n − 1)</strong>d. The "n − 1" is the trap, from term 1 to term 10 there are only <em>nine</em> steps.</li>
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
      expl: "The y terms are +y and −y, so <strong>add the equations</strong> instead of substituting.<br>(2x + y) + (x − y) = 11 + 1<br>3x = 12 → <strong>x = 4</strong><br>y = x − 1 = <strong>3</strong><br>Asked for xy = 4 × 3 = <strong>12</strong><br><em>The trap:</em> stopping at 4 or at 3 — the values of x and y are both sitting in the choices, but the question wants their product.<br><em>Fast method:</em> when coefficients are opposites, add the equations; then re-read the requested expression before you answer. Target: ~25 seconds." },
    { text: "Solve: 3 − 2x < 7",
      choices: ["x < −2", "x > −2", "x < 2", "x > 2"],
      answer: 1,
      expl: "Isolate x, then apply the one rule inequalities add.<br>3 − 2x &lt; 7<br>−2x &lt; 4<br>Dividing by −2 is dividing by a negative, so <strong>the sign flips</strong>: <strong>x &gt; −2</strong><br>Check x = 0: 3 − 0 = 3 &lt; 7, true, and 0 &gt; −2. Consistent.<br><em>The trap:</em> x &lt; −2, from dividing without flipping. Test it with x = −3: 3 + 6 = 9, which is not less than 7.<br><em>Fast method:</em> solve like an equation, flip on any multiply or divide by a negative, then plug in one easy value to confirm the direction. Target: ~20 seconds." },
    { text: "If x + 1/x = 4, what is x² + 1/x²?",
      choices: ["12", "14", "16", "18"],
      answer: 1,
      expl: "Don't solve for x — square the given expression and the target falls out.<br>(x + 1/x)² = 4² = 16<br>Expand: x² + 2 · x · (1/x) + 1/x² = x² + <strong>2</strong> + 1/x²<br>So x² + 1/x² = 16 − 2 = <strong>14</strong><br><em>The trap:</em> 16, which is just 4² with the middle term forgotten. The cross-term is always exactly 2, because x · (1/x) = 1 no matter what x is.<br><em>Fast method:</em> if x + 1/x = k, then x² + 1/x² = k² − 2. Target: ~20 seconds." },
    { text: "For which values of x is (x − 2)(x − 3) < 0?",
      choices: ["x < 2", "x > 3", "2 < x < 3", "x < 2 or x > 3"],
      answer: 2,
      expl: "A product is negative only when the two factors have opposite signs. Find the roots, then test each region.<br>Roots: x = 2 and x = 3.<br>x = 1: (−1)(−2) = +2, positive<br>x = 2.5: (0.5)(−0.5) = −0.25, <strong>negative</strong><br>x = 4: (2)(1) = +2, positive<br>So <strong>2 &lt; x &lt; 3</strong>, with the endpoints excluded because there the product equals 0, not less than 0.<br><em>The trap:</em> the outside region (x &lt; 2 or x &gt; 3) — that is precisely where the product is positive.<br><em>Fast method:</em> an upward parabola is negative strictly between its roots. Target: ~20 seconds." },
    { text: "In an arithmetic sequence with first term 5 and common difference 4, what is the 10th term?",
      choices: ["40", "41", "45", "49"],
      answer: 1,
      expl: "Count the steps between terms, not the terms themselves.<br>Term 1 to term 10 is <strong>9 steps</strong> of 4.<br>a₁₀ = 5 + 9 × 4 = 5 + 36 = <strong>41</strong><br><em>The trap:</em> 45, from 5 + 10 × 4. That value is actually the 11th term — the formula reads a₁ + (n − 1)d for exactly this reason.<br><em>Fast method:</em> steps = n − 1; sanity-check on a tiny case (term 2 here is 9, not 13). Target: ~15 seconds." },
    { text: "If f(x) = x² − 3x, what is f(f(2))?",
      choices: ["−2", "0", "4", "10"],
      answer: 3,
      expl: "Work from the inside out, one evaluation at a time.<br>Inner: f(2) = 2² − 3(2) = 4 − 6 = <strong>−2</strong><br>Now feed that back in: f(−2) = (−2)² − 3(−2)<br>(−2)² = +4, and −3(−2) = <strong>+6</strong><br>4 + 6 = <strong>10</strong><br><em>The trap:</em> −2, which is only the inner value — the question nests f twice. A sign slip on −3(−2) also lands you at −2 again.<br><em>Fast method:</em> compute the inner value, write it down, substitute; two minus signs multiply to a plus. Target: ~20 seconds." },
    { text: "A question gives answer choices entirely in variables. Which technique is MOST efficient?",
      choices: [
        "Plug in easy numbers for the variables and test the choices",
        "Always use the quadratic formula",
        "Guess randomly",
        "Solve symbolically no matter how long it takes"],
      answer: 0,
      expl: "Match the tool to the shape of the question. All-variable answers mean nothing is pinned down, so pin it down yourself.<br><strong>Pick easy numbers</strong> for the variables.<br>Compute the target value with them.<br>Test each choice and keep the one that produces it.<br>Abstract manipulation becomes plain arithmetic.<br><em>The trap:</em> committing to a full symbolic solve because it feels rigorous — it is slower and more error-prone under the clock. Also avoid 0 and 1, which can make several choices tie and force a rerun.<br><em>Fast method:</em> variables in the choices → plug in; numbers in the choices → backsolve from the middle value. Target: ~15 seconds." },
    { text: "Which two identities are correct? (Select TWO.)",
      choices: [
        "(a + b)² = a² + 2ab + b²",
        "(a + b)² = a² + b²",
        "a² − b² = (a + b)(a − b)",
        "a² + b² = (a + b)(a − b)",
        "√(a² + b²) = a + b"],
      answer: [0, 2],
      expl: "Test each claim with small numbers instead of trusting the shape. Let a = 3, b = 4.<br>(a + b)² = 49, and a² + 2ab + b² = 9 + 24 + 16 = 49. <strong>True</strong>.<br>a² − b² = 9 − 16 = −7, and (a + b)(a − b) = 7 × (−1) = −7. <strong>True</strong>.<br><em>The trap:</em> dropping the 2ab cross-term (9 + 16 = 25, not 49), factoring a² + b² (it doesn't factor over the reals), or splitting a root over a sum (√25 = 5, not 7).<br><em>Fast method:</em> a = 3, b = 4 exposes every fake identity in one pass. Target: ~30 seconds." }
  ]
},

/* ================= MODULE 11 ================= */
{
  id: "gm3_4", title: "Word Problems", minutes: 12, level: "core",
  content: `
<p>Word problems aren't a math topic: they're a translation skill. The math is easy once the sentence
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
  <li><strong>Simple interest:</strong> I = P × r × t. Linear. The interest is on the original principal only.</li>
  <li><strong>Compound interest:</strong> A = P(1 + r)ᵗ. Each period's interest earns interest.</li>
</ul>
<div class="worked"><h4>$10,000 at 10% compounded annually for 2 years</h4>
<p>A = 10000 × (1.1)² = 10000 × 1.21 = <strong>$12,100</strong>.</p>
<p>Simple interest would have given $12,000. The extra $100 <em>is</em> the compounding: interest earned
on year one's interest. Both figures appear in the answer choices.</p></div>

<h2>Mixtures and weighted averages</h2>
<p>A weighted average is pulled toward whichever group is bigger.</p>
<div class="worked"><h4>A class of 30 averages 80. Another class of 20 averages 90. What's the combined average?</h4>
<p><strong>Not 85.</strong> Use totals: (30 × 80) + (20 × 90) = 2400 + 1800 = 4200, over 50 students =
<strong>84</strong>.</p>
<p>It's pulled toward 80 because that group is larger. Whenever groups differ in size, the simple average
of the averages is wrong, and it's always among the answer choices.</p></div>

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
  <li><strong>Define your variable explicitly.</strong> Write "let x = the number of adult tickets", not just "x."</li>
  <li><strong>Write the equation before computing anything.</strong></li>
  <li><strong>Check the units.</strong> Hours vs minutes, dollars vs cents: the GRE switches them mid-problem on purpose.</li>
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
      expl: "Compounding is a repeated multiplier, so use A = P(1 + r)ᵗ.<br>Multiplier per year = 1.10<br>Two years: 1.10² = <strong>1.21</strong><br>A = 10,000 × 1.21 = <strong>$12,100</strong><br><em>The trap:</em> $12,000, which is <em>simple</em> interest ($1,000 twice). The extra $100 is year two's 10% earned on year one's $1,000 of interest — that gap is the whole point of the question.<br><em>Fast method:</em> multiply by (1 + r) once per period; for two periods, just square the multiplier. Target: ~20 seconds." },
    { text: "A class of 30 students averages 80. Another class of 20 averages 90. What is the combined average?",
      choices: ["85", "84", "86", "83"],
      answer: 1,
      expl: "Weighted averages run on totals, never on an average of the averages.<br>30 × 80 = 2,400<br>20 × 90 = 1,800<br>Sum = 4,200 points across 50 students<br>4,200 ÷ 50 = <strong>84</strong><br><em>The trap:</em> 85, the midpoint of 80 and 90. The groups aren't the same size, so the bigger group pulls the result toward 80 — the answer had to come out below 85.<br><em>Fast method:</em> add the group totals, divide by the head count, then check that the result leans toward the larger group. Target: ~25 seconds." },
    { text: "How many integers from 1 to 100 inclusive are divisible by 3 or by 5?",
      choices: ["45", "47", "53", "50"],
      answer: 1,
      expl: "Count each list, then remove the overlap you counted twice.<br>By 3: 100 ÷ 3 → <strong>33</strong> multiples<br>By 5: 100 ÷ 5 = <strong>20</strong> multiples<br>By both means by 15: 100 ÷ 15 → <strong>6</strong><br>33 + 20 − 6 = <strong>47</strong><br><em>The trap:</em> 53, from adding 33 and 20 and never subtracting. Every multiple of 15 sits in both lists, so it gets counted twice.<br><em>Fast method:</em> A or B = A + B − (multiples of the least common multiple of the two). Target: ~30 seconds." },
    { text: "How would you translate '5 less than x'?",
      choices: ["5 − x", "x − 5", "5x", "x/5"],
      answer: 1,
      expl: "Translate in the order the subtraction actually happens: you start from x and remove 5.<br>5 less than x → <strong>x − 5</strong><br>Test it with x = 12: five less than 12 is 7, and 12 − 5 = 7.<br><em>The trap:</em> 5 − x, which reverses the order. In the test case that gives 7 − 12 = −5, plainly not what the words describe.<br><em>Fast method:</em> with <em>less than</em> and <em>subtracted from</em>, the number named first ends up second in the expression. Target: ~10 seconds." },
    { text: "In an evenly spaced set of numbers, which statement is TRUE?",
      choices: [
        "The mean is always greater than the median",
        "The mean equals the median, and both equal (first + last)/2",
        "The median is always greater than the mean",
        "Neither can be determined"],
      answer: 1,
      expl: "An evenly spaced set is symmetric about its center, and that settles everything. Build one and look.<br>Take 4, 7, 10, 13.<br>Mean = 34 ÷ 4 = 8.5<br>Median = (7 + 10)/2 = 8.5<br>(first + last)/2 = (4 + 13)/2 = 8.5<br>All three agree: <strong>mean = median = (first + last)/2</strong>.<br><em>The trap:</em> claiming one exceeds the other. Mean and median separate only in <em>skewed</em> sets, and evenly spaced sets can't be skewed.<br><em>Fast method:</em> for any evenly spaced list, average the two endpoints and skip the summation entirely. Target: ~15 seconds." },
    { text: "A boat travels 36 miles downstream with a 3 mph current and returns 36 miles upstream. Its speed in still water is 15 mph. What is the total travel time?",
      choices: ["4.8 hours", "5 hours", "4 hours", "6 hours"],
      answer: 1,
      expl: "Adjust the boat's speed for the current on each leg, then time the legs separately.<br>Downstream: 15 + 3 = 18 mph → 36 ÷ 18 = <strong>2 hours</strong><br>Upstream: 15 − 3 = 12 mph → 36 ÷ 12 = <strong>3 hours</strong><br>Total = <strong>5 hours</strong><br><em>The trap:</em> 4.8 hours, from using 15 mph both ways (72 ÷ 15). The current does not cancel out — the slow leg loses more time than the fast leg saves.<br><em>Fast method:</em> still water ± current per direction, divide each distance, then add the times. Target: ~25 seconds." },
    { text: "Which two are sound word-problem habits? (Select TWO.)",
      choices: [
        "Define your variable explicitly before writing equations",
        "Compute first and set up the equation afterward",
        "Check that units are consistent throughout",
        "Assume all rates are per hour",
        "Average the averages when combining groups"],
      answer: [0, 2],
      expl: "Judge each habit by the specific failure it prevents.<br><strong>Defining the variable explicitly</strong> (\"let x = adult tickets\") stops you from solving correctly for the wrong quantity.<br><strong>Checking that units are consistent</strong> stops the hours-versus-minutes and dollars-versus-cents switches the test plants on purpose.<br><em>The trap:</em> averaging the averages when combining groups — that ignores group size and is wrong whenever the groups differ. Computing before setting up the equation, and assuming every rate is per hour, are the other two failure modes.<br><em>Fast method:</em> name the variable, write the equation, check units, re-read the question. Target: ~25 seconds." }
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
          expl: "Convert each change to a multiplier and multiply them.<br>Up 25% → × 1.25, which is 5/4<br>Down 20% → × 0.80, which is 4/5<br>5/4 × 4/5 = <strong>1.00</strong> → <strong>100% of the original</strong><br><em>The trap:</em> 105%, from adding +25 and −20. Percent changes multiply. This particular pair are exact reciprocals, which is why the test reaches for it so often.<br><em>Fast method:</em> write the multipliers as fractions; +25% then −20% is the one clean round trip. Target: ~15 seconds." },
        { text: "If x² = 36, what are the possible values of x?",
          choices: ["6 only", "6 and −6", "−6 only", "0 and 6"],
          answer: 1,
          expl: "An even power hides the sign, so look for two solutions.<br>6² = 36<br>(−6)² = 36<br>Both satisfy the equation: <strong>6 and −6</strong>.<br><em>The trap:</em> answering 6 only. The equation x² = 36 is not the same as the expression √36, which is defined as just 6.<br><em>Fast method:</em> x² = k gives x = ±√k — write the ± the moment you see an even power. Target: ~10 seconds." },
        { text: "How many usable factors does 36 have?",
          choices: ["6", "8", "9", "12"],
          answer: 2,
          expl: "Prime-factor it and read the count straight off the exponents.<br>36 = 4 × 9 = <strong>2² × 3²</strong><br>Add 1 to each exponent and multiply: (2+1)(2+1) = <strong>9</strong><br>Listing confirms it: 1, 2, 3, 4, 6, 9, 12, 18, 36.<br><em>The trap:</em> 6 or 8, both from hand-listing and losing a factor — 6 pairs with itself here, so it only gets counted once.<br><em>Fast method:</em> exponents plus one, multiplied; a perfect square always has an <em>odd</em> factor count, which rules out the even choices instantly. Target: ~20 seconds." },
        { text: "The average of 4 numbers is 15. If three of them are 10, 14, and 20, what is the fourth?",
          choices: ["14", "16", "18", "20"],
          answer: 1,
          expl: "Go straight to the total; averages are sums in disguise.<br>Total = 4 × 15 = <strong>60</strong><br>10 + 14 + 20 = 44<br>Fourth = 60 − 44 = <strong>16</strong><br>Check: 10 + 14 + 20 + 16 = 60.<br><em>The trap:</em> 14, a value already in the list — the three given numbers sit 1 below their share of 45, so the missing one must be 1 above 15.<br><em>Fast method:</em> sum = average × count, then subtract what you were given. Target: ~15 seconds." },
        { text: "Solve: 5 − 3x > 14",
          choices: ["x > −3", "x < −3", "x > 3", "x < 3"],
          answer: 1,
          expl: "Isolate x, then flip the sign when you divide by a negative.<br>5 − 3x &gt; 14<br>−3x &gt; 9<br>Divide by −3 → <strong>the inequality flips</strong> → <strong>x &lt; −3</strong><br>Check x = −4: 5 + 12 = 17 &gt; 14, true.<br><em>The trap:</em> x &gt; −3, from skipping the flip. Test it with x = 0: 5 &gt; 14 is false, so that direction can't be right.<br><em>Fast method:</em> flip on any multiply or divide by a negative, then verify with one easy value. Target: ~20 seconds." },
        { text: "If 0 < x < 1, which is TRUE?",
          choices: ["√x < x", "√x > x", "√x = x", "Cannot be determined"],
          answer: 1,
          expl: "Plug in a friendly fraction rather than reasoning in the abstract. Use x = 0.25.<br>√0.25 = 0.5<br>0.5 is bigger than 0.25, so <strong>√x &gt; x</strong><br>Second check with x = 0.01: √0.01 = 0.1, larger again.<br><em>The trap:</em> assuming a root always shrinks a number. That is only true above 1 — below 1 the root moves <em>toward</em> 1, which means up.<br><em>Fast method:</em> in the 0-to-1 zone, squaring shrinks and rooting grows; test 0.25 because its root is exact. Target: ~10 seconds." },
        { text: "Which two numbers are prime? (Select TWO.)",
          choices: ["2", "1", "17", "21", "9"],
          answer: [0, 2],
          expl: "Hold each number against the definition: exactly two factors.<br><strong>2</strong> → factors 1 and 2 only → prime, and the only even prime there is<br><strong>17</strong> → not divisible by 2 or 3, and 5² already exceeds 17, so nothing else can divide it → prime<br>1 → one factor only, not prime<br>21 = 3 × 7 and 9 = 3² → not prime<br><em>The trap:</em> counting 1 as prime, or dismissing 2 because it is even.<br><em>Fast method:</em> to test a prime, divide only by primes up to its square root. Target: ~20 seconds." },
        { text: "What is the units digit of 3⁴⁷?",
          choices: ["1", "3", "7", "9"],
          answer: 2,
          expl: "Track the units digit only, and find where it repeats.<br>3¹ → 3<br>3² = 9 → 9<br>3³ = 27 → 7<br>3⁴ = 81 → 1<br>Cycle: <strong>3, 9, 7, 1</strong>, length 4.<br>47 ÷ 4 = 11 remainder <strong>3</strong> → third slot → <strong>7</strong><br><em>The trap:</em> 1, which belongs to remainder 0 (exponents divisible by 4), or 3, from reading remainder 3 as the first slot.<br><em>Fast method:</em> divide the exponent by 4 and count the remainder into the cycle, with remainder 0 meaning the last slot. Target: ~25 seconds." },
        { text: "Machines A and B take 4 and 12 hours respectively to complete a job alone. Working together, how long?",
          choices: ["3 hours", "8 hours", "2 hours", "6 hours"],
          answer: 0,
          expl: "Add rates, never times.<br>A = 1/4 job per hour, B = 1/12 job per hour<br>1/4 + 1/12 = 3/12 + 1/12 = <strong>4/12 = 1/3 job per hour</strong><br>Time = 1 ÷ (1/3) = <strong>3 hours</strong><br><em>The trap:</em> 8 hours, the average of 4 and 12. Working together must beat the faster machine's own 4 hours, so any total above 4 hours can be ruled out before any arithmetic.<br><em>Fast method:</em> two workers → product ÷ sum = 48 ÷ 16 = 3. Target: ~20 seconds." },
        { text: "The ratio of red to blue marbles is 2:7 and there are 63 marbles. How many are blue?",
          choices: ["14", "42", "49", "56"],
          answer: 2,
          expl: "Sum the parts, then find what one part is worth.<br>Parts = 2 + 7 = 9<br>One part = 63 ÷ 9 = <strong>7 marbles</strong><br>Blue = 7 × 7 = <strong>49</strong><br>Check: red = 2 × 7 = 14, and 14 + 49 = 63.<br><em>The trap:</em> 14 is the red count. The ratio is stated red-to-blue, so the 7 belongs to blue.<br><em>Fast method:</em> total ÷ sum of parts, then multiply by the part actually requested. Target: ~15 seconds." },
        { text: "If x + 1/x = 5, what is x² + 1/x²?",
          choices: ["21", "23", "25", "27"],
          answer: 1,
          expl: "Never solve for x — square the given expression and subtract the cross-term.<br>(x + 1/x)² = 5² = 25<br>Expand: x² + 2 · x · (1/x) + 1/x² = x² + <strong>2</strong> + 1/x²<br>So x² + 1/x² = 25 − 2 = <strong>23</strong><br><em>The trap:</em> 25, which is 5² with the middle term dropped. The cross-term is always exactly 2, since x · (1/x) = 1 regardless of x.<br><em>Fast method:</em> x + 1/x = k → x² + 1/x² = k² − 2. Target: ~15 seconds." },
        { text: "Which two statements about percent change are correct? (Select TWO.)",
          choices: [
            "Percent change divides by the original value",
            "Doubling a value is a 200% increase",
            "Doubling a value is a 100% increase",
            "Percent change divides by the new value",
            "Successive percent changes are added"],
          answer: [0, 2],
          expl: "Test every claim on one concrete case: 50 doubling to 100.<br>Change = 100 − 50 = 50, and the definition puts the <em>original</em> underneath: 50/50 = 100%.<br>So <strong>percent change divides by the original</strong> and <strong>doubling is a 100% increase</strong>.<br><em>The trap:</em> calling doubling a 200% increase — 200% <em>of</em> the original is the new value, not the increase. Dividing by the new value gives 50%, and successive changes multiply rather than add.<br><em>Fast method:</em> run 50 → 100 through any percent claim and the wording sorts itself out. Target: ~30 seconds." },
        { text: "In an arithmetic sequence with a₁ = 3 and d = 5, what is the 8th term?",
          choices: ["38", "40", "43", "35"],
          answer: 0,
          expl: "Count the steps between terms, not the terms.<br>Term 1 to term 8 is <strong>7 steps</strong> of 5.<br>a₈ = 3 + 7 × 5 = 3 + 35 = <strong>38</strong><br><em>The trap:</em> 43, from 3 + 8 × 5 — that is actually the 9th term. Sanity-check the small case: a₂ = 8, which is one step, not two.<br><em>Fast method:</em> aₙ = a₁ + (n − 1)d; steps are always one fewer than terms. Target: ~15 seconds." },
        { text: "A class of 40 averages 70; a class of 10 averages 90. What is the combined average?",
          choices: ["80", "74", "78", "72"],
          answer: 1,
          expl: "Use totals, and expect the result to lean toward the bigger group.<br>40 × 70 = 2,800<br>10 × 90 = 900<br>Sum = 3,700 points across 50 students<br>3,700 ÷ 50 = <strong>74</strong><br><em>The trap:</em> 80, the midpoint of 70 and 90. The 40-student class outweighs the 10-student class 4 to 1, so the answer had to land close to 70.<br><em>Fast method:</em> total points ÷ total people; a weighted average always sits nearer the larger group, which alone eliminates the midpoint. Target: ~25 seconds." },
        { text: "Which of the following is divisible by 3?",
          choices: ["1,234", "5,678", "9,876", "4,447"],
          answer: 2,
          expl: "Don't divide anything — sum the digits.<br>1,234 → 1+2+3+4 = 10, not a multiple of 3<br>5,678 → 5+6+7+8 = 26, no<br>9,876 → 9+8+7+6 = <strong>30</strong>, yes → <strong>9,876</strong><br>4,447 → 4+4+4+7 = 19, no<br><em>The trap:</em> checking the last digit. An even ending or a 0/5 ending decides divisibility by 2 or 5 and says nothing at all about 3.<br><em>Fast method:</em> digit sum divisible by 3 means the number is; the same trick works for 9 if the sum is a multiple of 9. Target: ~20 seconds." },
        { text: "What is √(36 + 64)?",
          choices: ["14", "10", "100", "6 + 8"],
          answer: 1,
          expl: "Everything under the radical is added first, then rooted.<br>36 + 64 = 100<br>√100 = <strong>10</strong><br><em>The trap:</em> 14, from splitting the root into √36 + √64 = 6 + 8. Roots never distribute over addition, and the two expressions give genuinely different values — both are offered here.<br><em>Fast method:</em> resolve inside the radical before touching the root; a choice that splits one root across a sum is always the planted error. Target: ~10 seconds." },
        { text: "If 4x − 7 = 21, what is the value of 2x?",
          choices: ["7", "14", "28", "3.5"],
          answer: 1,
          expl: "Solve, then answer the expression that was actually requested.<br>4x − 7 = 21<br>4x = <strong>28</strong><br>x = 7<br>Asked for 2x = <strong>14</strong><br>Even quicker: 2x is half of 4x, so 2x = 28 ÷ 2 = 14 without ever finding x.<br><em>The trap:</em> 7, the value of x, which is sitting right there in the choices. Solving correctly and answering the wrong question is how strong students lose points.<br><em>Fast method:</em> underline the requested expression first, then check whether you can reach it directly from what you already have. Target: ~15 seconds." },
        { text: "How many integers from 1 to 60 are divisible by 4 or 6?",
          choices: ["20", "25", "15", "30"],
          answer: 0,
          expl: "Count each list, then subtract the overlap you counted twice.<br>By 4: 60 ÷ 4 = <strong>15</strong><br>By 6: 60 ÷ 6 = <strong>10</strong><br>By both means by 12, their least common multiple: 60 ÷ 12 = <strong>5</strong><br>15 + 10 − 5 = <strong>20</strong><br><em>The trap:</em> 25, from adding and never subtracting. A subtler slip is using 4 × 6 = 24 as the overlap; 4 and 6 share a factor of 2, so the LCM is 12, not 24.<br><em>Fast method:</em> A + B − (multiples of the LCM), and always compute the LCM rather than the product. Target: ~30 seconds." },
        { text: "Which two behaviors are true of numbers between 0 and 1? (Select TWO.)",
          choices: [
            "Squaring makes them smaller",
            "Squaring makes them larger",
            "Taking the square root makes them larger",
            "Taking the square root makes them smaller",
            "They behave exactly like integers"],
          answer: [0, 2],
          expl: "One test value settles both statements. Use x = 0.25.<br>0.25² = 0.0625, smaller → <strong>squaring makes them smaller</strong><br>√0.25 = 0.5, larger → <strong>taking the square root makes them larger</strong><br><em>The trap:</em> importing integer intuition, where squaring grows a number and rooting shrinks it. Both behaviors reverse below 1, which is exactly why a fraction test is mandatory in Quantitative Comparison.<br><em>Fast method:</em> in the 0-to-1 zone, squares shrink and roots grow; test 0.25 and read both results off one line. Target: ~20 seconds." },
        { text: "A car covers 120 miles at 60 mph and returns at 40 mph. What is the average speed for the round trip?",
          choices: ["50 mph", "48 mph", "45 mph", "52 mph"],
          answer: 1,
          expl: "Average speed is total distance over total time — never the average of the two speeds.<br>Out: 120 ÷ 60 = 2 hours<br>Back: 120 ÷ 40 = 3 hours<br>Total: 240 miles in <strong>5 hours</strong><br>240 ÷ 5 = <strong>48 mph</strong><br><em>The trap:</em> 50 mph, the midpoint of 60 and 40. More of the trip's <em>time</em> is spent at 40 mph, so the true average must fall below the midpoint.<br><em>Fast method:</em> equal distances at a and b → 2ab/(a+b) = 4800/100 = 48. Target: ~25 seconds." }
      ]
    }
  });
})();
