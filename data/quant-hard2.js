/* Quant bank - HARD, set 2.
   Calibrated to the top of the real GRE's difficulty range (163-170 material):
   constraint interaction, statistics reasoning, conditional counting, and
   multi-step traps. Every id is prefixed q2h_. */
(function () {
  const B = window.GREBANK = window.GREBANK || {};
  B.quant = B.quant || [];
  B.disets = B.disets || [];
  const Q = B.quant, D = B.disets;
  const d = "hard";

  /* ---------- Quantitative Comparison ---------- */
  Q.push(
    { id: "q2h_qc1", type: "qc", topic: "algebra", diff: d,
      info: "x + y = 1, where x and y are positive numbers",
      qa: "xy", qb: "1/4",
      answer: 3,
      expl: "Find the largest xy can be, then check whether smaller values are also allowed.<br>x + y = 1, so the setup is symmetric: <strong>xy peaks when x = y = 1/2</strong>, giving xy = 1/4 (that is AM–GM).<br>So Quantity A can equal 1/4 exactly.<br>Now push the split off-center: x = 0.9, y = 0.1 → xy = 0.09, and Quantity B is greater.<br>Equal in one case, B greater in another → <strong>(D)</strong>.<br><em>The trap:</em> proving xy ≤ 1/4 and answering (B). The maximum is attainable here, so equality genuinely happens.",
      tip: "When one quantity's maximum exactly equals the other side, test the extreme AND an off-center case — that pairing usually yields (D). Target: ~30 seconds." },
    { id: "q2h_qc2", type: "qc", topic: "arithmetic", diff: d,
      info: "n is a positive integer",
      qa: "(−1)<sup>n</sup> + (−1)<sup>n+1</sup>", qb: "0",
      answer: 2,
      expl: "Don't plug in values — ask whether the expression can vary at all.<br>n and n + 1 always have opposite parity, so one exponent is even and the other odd.<br>That makes one power +1 and the other −1.<br><strong>(+1) + (−1) = 0 for every n</strong>.<br>n = 1: −1 + 1 = 0. n = 2: 1 + (−1) = 0.<br>Quantity A is 0, Quantity B is 0 → <strong>(C), equal</strong>.<br><em>The trap:</em> seeing a variable and reflexively answering (D). A variable only forces (D) if it actually changes the value.",
      tip: "A variable in a QC quantity does not mean (D). Check invariance first: consecutive exponents on −1 always cancel to 0. Target: ~20 seconds." },
    { id: "q2h_qc3", type: "qc", topic: "data", diff: d,
      info: "Set S consists of the numbers 2, 4, 6, 8, and x.",
      qa: "The standard deviation of S when x = 5", qb: "The standard deviation of S when x = 2",
      answer: 1,
      expl: "No SD formula needed — ask which fifth value sits closer to the set's center.<br>Base values: 2, 4, 6, 8.<br>x = 5: the mean stays 5 and the new value lands exactly on it, adding <strong>no spread at all</strong>.<br>x = 2: it duplicates the low extreme and drags the mean down to 22/5 = 4.4, so nearly every deviation grows.<br>Computing confirms it: variance 20/5 = 4 versus 27.2/5 = 5.44.<br><strong>Quantity B is greater.</strong><br><em>The trap:</em> assuming a repeated value must shrink the SD. Repeating an <em>extreme</em> widens the spread; only a value sitting at the mean adds nothing.",
      tip: "Standard deviation measures distance from the mean, so compare which version clusters more tightly instead of computing. Target: ~30 seconds." },
    { id: "q2h_qc4", type: "qc", topic: "data", diff: d,
      info: "A fair six-sided die is rolled twice.",
      qa: "The probability that the second roll is greater than the first",
      qb: "1/2",
      answer: 1,
      expl: "Use symmetry instead of counting winners one by one.<br>Two rolls give 6 × 6 = 36 equally likely ordered pairs.<br>Ties: (1,1) through (6,6) = 6 pairs.<br>The other 30 pairs are mirror images — second higher and second lower must match: <strong>15 each</strong>.<br>P(second &gt; first) = 15/36 = 5/12, and 5/12 &lt; 6/12.<br><strong>Quantity B is greater.</strong><br><em>The trap:</em> reasoning that the second roll is equally likely to beat or lose to the first, so the probability is 1/2. Higher and lower are indeed equally likely, but ties absorb 6/36, leaving each side below half.",
      tip: "Greater, less, and equal must total 1, so P(greater) = (1 − P(tie))/2 — count the ties first. Target: ~30 seconds." },
    { id: "q2h_qc5", type: "qc", topic: "algebra", diff: d,
      info: "0 < a < b < 1",
      qa: "a<sup>b</sup>", qb: "b<sup>a</sup>",
      answer: 1,
      expl: "Compare structure, not values: which side has the friendlier base and exponent?<br>Between 0 and 1, a <strong>bigger base gives a bigger value</strong>, and a <strong>smaller exponent also gives a bigger value</strong> (raising a fraction to a higher power shrinks it).<br>Quantity B is b<sup>a</sup>: bigger base (b &gt; a) AND smaller exponent (a &lt; b), so both effects favor B.<br>Confirm with a = 1/4, b = 1/2:<br>A = (1/4)<sup>1/2</sup> = 1/2 = 0.5<br>B = (1/2)<sup>1/4</sup> ≈ 0.84<br><strong>Quantity B is greater — always, for any 0 &lt; a &lt; b &lt; 1.</strong><br><em>The trap:</em> importing intuition from numbers above 1, where the larger exponent wins.",
      tip: "For 0 &lt; base &lt; 1 exponents run backwards: a higher power means a smaller number. Bigger base plus smaller exponent wins outright. Target: ~30 seconds." },
    { id: "q2h_qc6", type: "qc", topic: "algebra", diff: d,
      info: "x² = 16 and y² = 9",
      qa: "x + y", qb: "1",
      answer: 3,
      expl: "Squared equations carry two roots each — enumerate before comparing.<br>x² = 16 → x = 4 or −4.<br>y² = 9 → y = 3 or −3.<br>Four possible sums: 4 + 3 = 7, 4 − 3 = 1, −4 + 3 = −1, −4 − 3 = −7.<br>So x + y can be <strong>1, exactly matching Quantity B</strong>, and it can also be 7, well above it.<br>More than one relationship occurs → <strong>(D)</strong>.<br><em>The trap:</em> reading x² = 16 as x = 4 and y² = 9 as y = 3, getting 7 and answering (A). &radic;16 is nonnegative, but solving x² = 16 is not the same operation.",
      tip: "Every squared variable contributes a ± sign. List all sign combinations and stop as soon as two different comparison results appear. Target: ~25 seconds." },
    { id: "q2h_qc7", type: "qc", topic: "geometry", diff: d,
      info: "A rectangle has perimeter 20.",
      qa: "The area of the rectangle", qb: "24",
      answer: 3,
      expl: "A perimeter fixes the sum of the sides, never the product.<br>2(L + W) = 20 → L + W = 10.<br>Most area comes from the most equal split: 5 × 5 = <strong>25, above 24</strong>.<br>Now squash it flat: 9.9 × 0.1 = 0.99, <strong>far below 24</strong>.<br>Values on both sides of 24 are possible → <strong>(D)</strong>.<br><em>The trap:</em> assuming a fixed perimeter pins the area, computing the maximum 25, and answering (A). That 25 is only a ceiling — the area slides continuously down toward 0.",
      tip: "Fixed perimeter, free area: maximum at the square, minimum approaching 0. Any comparison value strictly between them gives (D). Target: ~25 seconds." },
    { id: "q2h_qc8", type: "qc", topic: "arithmetic", diff: d,
      info: "n is an integer greater than 1",
      qa: "The number of positive factors of n²", qb: "Twice the number of positive factors of n",
      answer: 3,
      expl: "Factor counts come from exponents: if n = p<sup>a</sup>q<sup>b</sup>, n has (a+1)(b+1) factors and n² has (2a+1)(2b+1).<br>Test a single prime, n = 2: n² = 4 has 3 factors (1, 2, 4), while 2 × 2 = 4. <strong>Quantity B greater.</strong><br>Test several primes, n = 12 = 2²·3: 12 has 6 factors; n² = 144 = 2⁴·3² has 5 × 3 = 15, while 2 × 6 = 12. <strong>Quantity A greater.</strong><br>Two opposite outcomes → <strong>(D)</strong>.<br><em>The trap:</em> assuming squaring doubles the factor count. Each (a+1) becomes (2a+1) — under double per prime, but multiplied across several primes it overshoots.",
      tip: "Test n = a prime (one exponent, undershoots) and n = 12 (two exponents, overshoots). One case each way settles it. Target: ~45 seconds." },
    { id: "q2h_qc9", type: "qc", topic: "algebra", diff: d,
      info: "x > 2",
      qa: "(x − 1)³", qb: "(x − 1)²",
      answer: 0,
      expl: "Substitute for the repeated expression, then locate it relative to 1.<br>Let t = x − 1. Since x &gt; 2, <strong>t &gt; 1</strong>.<br>Compare t³ with t²: divide both by t² (positive, so the direction holds) → compare t with 1.<br>t &gt; 1, so t³ &gt; t². <strong>Quantity A is greater.</strong><br>Spot check x = 3: t = 2, and 8 &gt; 4.<br><em>The trap:</em> the comparison flips if 1 &lt; x &lt; 2, since then 0 &lt; t &lt; 1 and cubing shrinks (0.5³ = 0.125 &lt; 0.25). The stated bound x &gt; 2 does all the work — without it this is (D).",
      tip: "Powers compare by where the base sits: above 1 higher powers grow, between 0 and 1 they shrink. Divide by the smaller power to see it. Target: ~25 seconds." },
    { id: "q2h_qc10", type: "qc", topic: "arithmetic", diff: d,
      qa: "The remainder when 6<sup>83</sup> is divided by 10",
      qb: "The units digit of 4<sup>41</sup>",
      answer: 0,
      expl: "Both sides are units-digit questions — never compute the powers.<br>Quantity A: dividing by 10 leaves the units digit as the remainder. Every power of 6 ends in 6 (6, 36, 216, …), so A = <strong>6</strong>.<br>Quantity B: units digits of 4 cycle 4, 6, 4, 6 with period 2 — odd exponent gives 4, even gives 6. 41 is odd, so B = <strong>4</strong>.<br>6 &gt; 4 → <strong>Quantity A is greater.</strong><br><em>The trap:</em> lining exponent 41 up with the wrong slot in the cycle. Anchor on 4<sup>1</sup> = 4 and let odd/even decide, rather than counting cycle repetitions.",
      tip: "Remainder mod 10 IS the units digit. Cycles worth knowing: 0, 1, 5, 6 fixed; 4 and 9 period 2; 2, 3, 7, 8 period 4. Target: ~20 seconds." },
    { id: "q2h_qc11", type: "qc", topic: "data", diff: d,
      qa: "The number of different committees of 3 that can be chosen from 8 people",
      qb: "The number of different committees of 5 that can be chosen from 8 people",
      answer: 2,
      expl: "Recognize the complement instead of computing anything.<br>Picking 3 of the 8 people to serve is the same act as picking the <strong>5 who stay off</strong> — every committee of 3 pairs with exactly one group of 5.<br>So C(8,3) = C(8,5) by definition, not coincidence.<br>Verify if you like: C(8,3) = (8 · 7 · 6)/(3 · 2 · 1) = 56, and C(8,5) = 56 as well.<br><strong>The quantities are equal, (C).</strong><br><em>The trap:</em> assuming the larger committee size yields more committees. Counts climb to a peak at k = 4 and then fall back symmetrically.",
      tip: "C(n, k) = C(n, n − k). When the two group sizes add to n, the counts are identical — answer on sight. Target: ~15 seconds." },
    { id: "q2h_qc12", type: "qc", topic: "algebra", diff: d,
      info: "|x − 3| ≤ 2 and |y + 1| ≤ 2",
      qa: "The greatest possible value of x − y", qb: "8",
      answer: 2,
      expl: "Turn each absolute value into an interval, then push to opposite ends.<br>|x − 3| ≤ 2 → −2 ≤ x − 3 ≤ 2 → x lies in [1, 5].<br>|y + 1| ≤ 2 → −2 ≤ y + 1 ≤ 2 → <strong>y lies in [−3, 1]</strong>.<br>To maximize x − y, take x as large as allowed and y as small as allowed:<br>5 − (−3) = <strong>8</strong>.<br>Quantity B is 8, so the two are <strong>equal, (C)</strong>.<br><em>The trap:</em> shifting the y interval the wrong way to [−1, 3], which gives 5 − (−1) = 6 and points to (B). Adding 1 inside the bars means subtracting 1 from the bounds.",
      tip: "Rewrite |expr| ≤ k as a double inequality, isolate the variable, then read the max of a difference off opposite endpoints. Target: ~30 seconds." }
  );

  /* ---------- Multiple Choice ---------- */
  Q.push(
    { id: "q2h_mc1", type: "mcq", topic: "data", diff: d,
      text: "A committee of 4 people is to be selected from 5 women and 4 men. How many different committees include at least one man?",
      choices: ["105", "120", "121", "125", "126"],
      answer: 2,
      expl: "Count the complement instead of four overlapping cases.<br>All committees of 4 from 9 people: C(9,4) = (9 · 8 · 7 · 6)/24 = 126.<br>Committees with <strong>no man</strong> — all 4 drawn from the 5 women: C(5,4) = 5.<br>At least one man = <strong>126 − 5 = 121</strong>.<br>Counting directly would mean adding the 1-man, 2-man, 3-man and 4-man cases separately: four binomial products instead of two.<br><em>The trap:</em> reporting 126, the unrestricted total, by forgetting to strip out the all-women committees. The correct answer must sit just below that total, since only 5 committees are excluded.",
      tip: "At least one X = (total arrangements) − (arrangements with zero X). Complement counting wins whenever more than two cases appear. Target: ~40 seconds." },
    { id: "q2h_mc2", type: "mcq", topic: "data", diff: d,
      text: "A box contains 4 defective and 8 working bulbs. If 2 bulbs are drawn at random without replacement, what is the probability that exactly one is defective?",
      choices: ["8/33", "14/33", "16/33", "4/11", "2/3"],
      answer: 2,
      expl: "Exactly one defective means one of each kind, so <strong>both draw orders count</strong>.<br>Combinations route: choose 1 of 4 defective (4 ways) and 1 of 8 working (8 ways) = 32 favorable pairs.<br>Total pairs: C(12,2) = (12 · 11)/2 = 66.<br>P = 32/66 = <strong>16/33</strong>.<br>Sequential route: (4/12)(8/11) + (8/12)(4/11) = 32/132 + 32/132 = 64/132 = 16/33.<br><em>The trap:</em> computing a single ordering, (4/12)(8/11) = 8/33, and stopping there — exactly half the right value. Defective-first and working-first are two distinct paths to the same outcome.",
      tip: "Combinations are order-free; sequential fractions are not — pick one method and stay in it. For one of each type: (count A)(count B)/C(total, 2). Target: ~45 seconds." },
    { id: "q2h_mc3", type: "mcq", topic: "data", diff: d,
      text: "Each of 150 students studies at least one of French and Spanish. If 95 study French and 105 study Spanish, how many study both languages?",
      choices: ["40", "45", "50", "55", "60"],
      answer: 2,
      expl: "Two overlapping groups and nobody outside them — use the double-counting identity.<br>Total = French + Spanish − Both, with no neither-group to add.<br>95 + 105 = 200 enrollments spread across only 150 students.<br>Those <strong>50 surplus enrollments are exactly the students counted twice</strong>, which is the both-languages group.<br>Check: 95 + 105 − 50 = 150.<br><strong>50 students study both.</strong><br><em>The trap:</em> computing 150 − 105 = 45 and calling it the overlap. That 45 is the French-only count (95 − 50 = 45), a different group.",
      tip: "Overlap = (sum of the groups) − total, valid only when nobody sits outside both. Add a neither term whenever the problem permits one. Target: ~25 seconds." },
    { id: "q2h_mc4", type: "mcq", topic: "arithmetic", diff: d,
      text: "Solution X is 10 percent salt and solution Y is 25 percent salt, by volume. How many liters of Y must be added to 6 liters of X to obtain a solution that is 20 percent salt?",
      choices: ["6", "8", "9", "12", "15"],
      answer: 3,
      expl: "Balance the salt, in liters, before and after.<br>Salt already present: 0.10 × 6 = 0.6 L.<br>Salt added with y liters of Y: 0.25y.<br>Salt required in the blend: 0.20(6 + y).<br>0.6 + 0.25y = 1.2 + 0.20y<br><strong>0.05y = 0.6 → y = 12 liters.</strong><br>Faster route: the 20% target sits 10 points above X but only 5 points below Y, so you need <strong>twice as much Y as X</strong>: 2 × 6 = 12.<br><em>The trap:</em> assuming equal volumes land you at 20%. Equal parts of 10% and 25% average to 17.5%, so Y has to dominate the mix.",
      tip: "Alligation: the volumes are in the inverse ratio of each solution's distance to the target concentration. Target: ~40 seconds." },
    { id: "q2h_mc5", type: "mcq", topic: "arithmetic", diff: d,
      text: "Pipe A alone fills a tank in 4 hours and pipe B alone fills it in 6 hours. With both pipes open and a drain open, the tank fills in 3 hours. Working alone, how long would the drain take to empty a full tank?",
      choices: ["8 hours", "10 hours", "12 hours", "15 hours", "18 hours"],
      answer: 2,
      expl: "Convert every pipe to a rate in tanks per hour, then add fillers and subtract the drain.<br>A: 1/4. B: 1/6. Drain: −1/d.<br>Net rate equation: 1/4 + 1/6 − 1/d = 1/3.<br>Over denominator 12: 3/12 + 2/12 = <strong>5/12</strong>.<br>5/12 − 1/d = 4/12 → 1/d = 1/12 → <strong>d = 12 hours</strong>.<br>Sanity check: the two pipes alone would finish in 12/5 = 2.4 hours; the drain stretches that to 3.<br><em>The trap:</em> combining the times (4, 6, 3) arithmetically instead of the rates. Times never add or subtract in work problems.",
      tip: "Work problems: rate = 1/time, fillers positive, drains negative. Sum the rates, then invert once at the very end. Target: ~40 seconds." },
    { id: "q2h_mc6", type: "mcq", topic: "geometry", diff: d,
      text: "In the xy-plane, line k passes through the points (−2, 5) and (4, −7). Line m passes through the origin and is perpendicular to k. At what point do k and m intersect?",
      choices: ["(2/5, 1/5)", "(1/5, 2/5)", "(1, −1)", "(2, −3)", "(−2/5, −1/5)"],
      answer: 0,
      expl: "Get both lines into y = mx + b, then set them equal.<br>Slope of k: (−7 − 5)/(4 − (−2)) = −12/6 = −2.<br>Through (−2, 5): y = −2(x + 2) + 5 = <strong>−2x + 1</strong>.<br>Line m is perpendicular through the origin, so its slope is the negative reciprocal and b = 0: <strong>y = x/2</strong>.<br>Intersect: x/2 = −2x + 1 → x = −4x + 2 → 5x = 2 → <strong>x = 2/5</strong>.<br>Then y = (2/5)/2 = <strong>1/5</strong>.<br><em>The trap:</em> reversing the coordinates to (1/5, 2/5). On y = x/2 the y-value is always the smaller of the two, so the x-coordinate has to be the bigger number.",
      tip: "Perpendicular slopes multiply to −1, and a line through the origin has no intercept. Substitute rather than solving a full system. Target: ~50 seconds." },
    { id: "q2h_mc7", type: "mcq", topic: "algebra", diff: d,
      text: "In a sequence, a₁ = 3 and aₙ = 2aₙ₋₁ − 1 for n ≥ 2. What is the value of a₆?",
      choices: ["33", "63", "65", "95", "129"],
      answer: 2,
      expl: "Just iterate — but label every term as you write it.<br>a₁ = 3<br>a₂ = 2(3) − 1 = 5<br>a₃ = 2(5) − 1 = 9<br>a₄ = 2(9) − 1 = 17<br>a₅ = 2(17) − 1 = 33<br>a₆ = 2(33) − 1 = <strong>65</strong><br>Pattern check: every term equals 2<sup>n</sup> + 1, because doubling and subtracting 1 preserves the +1 offset. 2<sup>6</sup> + 1 = 65 confirms it.<br><em>The trap:</em> stopping one step early, or writing six values starting from a₂ — either slip lands on 33, which is a₅.",
      tip: "Write recursive sequences as a labeled list, not a running total. These questions are almost entirely off-by-one tests. Target: ~30 seconds." },
    { id: "q2h_mc8", type: "mcq", topic: "algebra", diff: d,
      text: "If 2<sup>2x</sup> − 2<sup>x+1</sup> − 8 = 0, what is the value of x?",
      choices: ["1", "2", "3", "4", "8"],
      answer: 1,
      expl: "Three terms with exponentials means a quadratic in disguise.<br>Rewrite everything in terms of 2<sup>x</sup>:<br>2<sup>2x</sup> = (2<sup>x</sup>)² and 2<sup>x+1</sup> = 2 · 2<sup>x</sup>.<br>Let t = 2<sup>x</sup>: <strong>t² − 2t − 8 = 0</strong><br>(t − 4)(t + 2) = 0 → t = 4 or t = −2.<br>t = 2<sup>x</sup> is always positive, so <strong>discard t = −2</strong>.<br>2<sup>x</sup> = 4 → <strong>x = 2</strong>.<br><em>The trap:</em> misreading 2<sup>2x</sup> as 2 · 2<sup>x</sup>, or 2<sup>x+1</sup> as 2<sup>x</sup> + 1 — either error destroys the substitution and yields a different root.",
      tip: "Substitute t for the base power whenever the exponents read 2x, x+1, x. Solve the quadratic, then reject any root that is not positive. Target: ~45 seconds." }
  );

  /* ---------- Multiple-answer ---------- */
  Q.push(
    { id: "q2h_ma1", type: "mcma", topic: "algebra", diff: d,
      text: "x is an integer and 12 < x² < 50. Which of the following could be the value of x?<br>Indicate <b>all</b> such values.",
      choices: ["−7", "−5", "−4", "3", "7"],
      answer: [0, 1, 2, 4],
      expl: "Solve for the magnitude first, then bring the signs back in.<br>Squares strictly between 12 and 50: 16, 25, 36, 49.<br>So <strong>|x| is 4, 5, 6, or 7</strong> (9 is too small, 64 too big).<br>Check each option:<br>−7 → 49, inside. <strong>Qualifies.</strong><br>−5 → 25, inside. <strong>Qualifies.</strong><br>−4 → 16, inside. <strong>Qualifies.</strong><br>3 → 9, below 12. Out.<br>7 → 49, inside. <strong>Qualifies.</strong><br><em>The trap:</em> screening only positive values and skipping the negatives. Squaring erases the sign, so every valid magnitude brings its negative twin along.",
      tip: "Convert a squared inequality into a range for |x|, then take both signs of every magnitude in that range. Target: ~30 seconds." },
    { id: "q2h_ma2", type: "mcma", topic: "data", diff: d,
      text: "The average (arithmetic mean) of five distinct positive integers is 10. Which of the following could be the median of the five integers?<br>Indicate <b>all</b> such values.",
      choices: ["2", "10", "14", "16"],
      answer: [1, 2],
      expl: "The sum is locked at 5 × 10 = 50, and the five integers are distinct positives. Build the cheapest legal list around each candidate median.<br>Median 2: two distinct positive integers would have to sit below 2 — impossible. Out.<br>Median 10: 1, 2, 10, 17, 20 sums to 50. <strong>Works.</strong><br>Median 14: 1, 2, 14, 16, 17 sums to 50. <strong>Works.</strong><br>Median 16: the leanest possible list is 1, 2, 16, 17, 18 = <strong>54, already over 50</strong>. Out.<br><em>The trap:</em> assuming the median must hug the mean of 10. A median above the mean is fine as long as the two smallest values absorb enough of the sum.",
      tip: "Fix the total, then minimize everything you may choose: 1 and 2 below, median+1 and median+2 above. If that floor exceeds the total, the median is impossible. Target: ~60 seconds." },
    { id: "q2h_ma3", type: "mcma", topic: "geometry", diff: d,
      text: "Two sides of a triangle have lengths 5 and 9. Which of the following could be the length of the third side?<br>Indicate <b>all</b> such lengths.",
      choices: ["3", "4", "5", "13", "14"],
      answer: [2, 3],
      expl: "The third side must fall strictly between the difference and the sum of the other two.<br>9 − 5 = 4 and 9 + 5 = 14, so the side lies in <strong>4 &lt; s &lt; 14</strong>.<br>3: too short — 3 + 5 = 8 &lt; 9, so the two short sides can't span the long one. Out.<br>4: 4 + 5 = 9 exactly — the figure flattens into a segment. Out.<br>5: inside the range. <strong>Qualifies.</strong><br>13: inside the range. <strong>Qualifies.</strong><br>14: 5 + 9 = 14 exactly — flat again. Out.<br><em>The trap:</em> using ≤ and admitting both 4 and 14. Equality makes the three vertices collinear, which is not a triangle.",
      tip: "Third-side range: (difference) &lt; s &lt; (sum), both endpoints excluded. Test the endpoints deliberately. Target: ~20 seconds." },
    { id: "q2h_ma4", type: "mcma", topic: "data", diff: d,
      text: "A list of 7 numbers has average (arithmetic mean) 20 and median 20. Which of the following must be true?<br>Indicate <b>all</b> such statements.",
      choices: [
        "The number 20 appears in the list",
        "At least three of the numbers are greater than or equal to 20",
        "Every number in the list is between 10 and 30"
      ],
      answer: [0, 1],
      expl: "Seven numbers, mean 20, median 20. Test each claim for MUST be true, not could.<br>The count is odd, so the median IS the 4th value once sorted — <strong>20 really appears in the list</strong>. First claim holds.<br>The 4th, 5th, 6th and 7th values are all at least the median, so <strong>four</strong> numbers are ≥ 20; at least three is guaranteed. Second claim holds.<br>The range claim dies on one counterexample: 0, 0, 0, 20, 40, 40, 40 has median 20 and mean 140/7 = 20, yet six of its values sit outside 10 to 30.<br><em>The trap:</em> reading mean = median as a promise of a tight, tidy list. Symmetric extremes preserve both statistics.",
      tip: "Odd count means the median is a genuine list member. For must-be-true claims, hunt one extreme counterexample before accepting any range restriction. Target: ~50 seconds." }
  );

  /* ---------- Numeric Entry ---------- */
  Q.push(
    { id: "q2h_ne1", type: "num", topic: "arithmetic", diff: d,
      text: "Working alone, machine P produces 300 units in 5 hours, and machine Q produces 300 units in 3 hours. Working together at their constant rates, how many <b>minutes</b> do they take to produce 240 units?",
      answer: 90,
      expl: "Turn each machine into units per hour, add the rates, then obey the unit in the question.<br>P: 300 units / 5 hours = 60 units per hour.<br>Q: 300 / 3 = 100 units per hour.<br>Together: <strong>160 units per hour</strong>.<br>Time for 240 units: 240/160 = 1.5 hours.<br>The box wants <strong>minutes</strong>: 1.5 × 60 = <strong>90</strong>.<br><em>The trap:</em> entering 1.5 — the right time in the wrong unit. Numeric entry offers no answer choices to catch the mismatch, so that final conversion is the entire point of the question.",
      tip: "Rates add, times don't. Then reread the bolded unit before typing — hours-to-minutes is the standard numeric-entry ambush. Target: ~40 seconds." },
    { id: "q2h_ne2", type: "num", topic: "data", diff: d,
      text: "How many positive three-digit integers have three digits that are all different?",
      answer: 648,
      expl: "Fill the three slots in order, shrinking the pool as digits get used.<br>Hundreds digit: cannot be 0, so <strong>9 choices</strong> (1–9).<br>Tens digit: 0 is allowed here, but the hundreds digit is spent — 10 − 1 = <strong>9 choices</strong>.<br>Units digit: two digits are now used — 10 − 2 = <strong>8 choices</strong>.<br>9 × 9 × 8 = <strong>648</strong>.<br>Complement check: 900 three-digit integers total, so 900 − 648 = 252 of them repeat a digit.<br><em>The trap:</em> computing 9 × 8 × 7 = 504 by banning 0 from every slot instead of only the leading one.",
      tip: "Slot counting: handle the restricted position first, then decrement the pool by one per slot. Only the leading digit excludes 0. Target: ~30 seconds." },
    { id: "q2h_ne3", type: "num", topic: "arithmetic", diff: d,
      text: "The price of an item is increased by 25 percent, and the new price is then decreased by x percent, returning it exactly to its original price. What is the value of x?",
      answer: 20,
      expl: "Use the <strong>assume-the-price-is-100</strong> trick — the fastest method for any percent-change chain.<br>Original price: 100.<br>After the 25% increase: 100 → 125.<br>To get back to 100, the price must fall by 125 − 100 = 25.<br>But that decrease is measured from the <strong>new</strong> price, 125, not from 100:<br>25/125 = 1/5 = <strong>20%</strong>.<br><em>The trap:</em> a 25% increase followed by a 25% decrease does <strong>not</strong> cancel out, because the second percentage is taken from a different (larger) starting value.",
      tip: "Percent-change chains: set the original to 100, track actual amounts, and always divide by the value the change is measured FROM. Target: ~10 seconds." },
    { id: "q2h_ne4", type: "num", topic: "data", diff: d, frac: true, ansFrac: [1, 2],
      text: "Events A and B are independent, with P(A) = 1/3 and P(B) = 1/4. What is the probability that <b>neither</b> A nor B occurs?<br><i>Give your answer as a fraction.</i>",
      answer: 0.5,
      expl: "Neither means both complements happen — and independence lets you multiply them.<br>P(not A) = 1 − 1/3 = 2/3.<br>P(not B) = 1 − 1/4 = 3/4.<br>Independent events keep independent complements, so:<br>P(neither) = (2/3)(3/4) = 6/12 = <strong>1/2</strong>.<br><em>The trap:</em> computing 1 − 1/3 − 1/4 = 5/12, which subtracts the both-happen overlap twice. Done properly, P(A or B) = 1/3 + 1/4 − (1/3)(1/4) = 1/2, and 1 − 1/2 = 1/2 — matching.",
      tip: "P(neither) = (1 − P(A))(1 − P(B)) for independent events. Subtracting probabilities straight from 1 is valid only for mutually exclusive events. Target: ~30 seconds." }
  );

  /* ---------- Data Interpretation sets ---------- */
  D.push({
    id: "q2h_di1", diff: d,
    intro: "<p><b>Distribution of test scores for the 40 students in a class</b></p>",
    display: {
      tables: [{
        caption: "Frequency distribution of scores",
        cols: ["Score range", "Number of students"],
        rows: [
          ["60–69", "6"],
          ["70–79", "12"],
          ["80–89", "14"],
          ["90–99", "8"]
        ]
      }]
    },
    questions: [
      { id: "q2h_di1a", type: "mcq", topic: "data", diff: d,
        text: "The median score of the class must lie in which score range?",
        choices: ["60–69", "70–79", "80–89", "90–99", "It cannot be determined"],
        answer: 2,
        expl: "Grouped data: convert the median into a rank position, then walk the cumulative count.<br>40 scores, so the median is the average of the <strong>20th and 21st</strong> values in order.<br>Cumulative totals: 60–69 covers ranks 1–6; 70–79 covers ranks 7–18; 80–89 covers ranks <strong>19–32</strong>.<br>Ranks 20 and 21 both land inside 80–89, so their average does too — no individual scores required.<br><em>The trap:</em> answering that it cannot be determined because the exact scores are unknown. The exact median is indeed unknown, but its interval is fully pinned down.",
        tip: "For a frequency table, turn n into a rank (n/2 and n/2 + 1 when n is even), then accumulate rows until you pass it. Target: ~40 seconds." },
      { id: "q2h_di1b", type: "mcq", topic: "data", diff: d,
        text: "What percent of the students scored below 80?",
        choices: ["30%", "36%", "45%", "55%", "65%"],
        answer: 2,
        expl: "Read the boundary literally before adding anything.<br>Below 80 covers the 60–69 and 70–79 rows only: 6 + 12 = <strong>18 students</strong>.<br>18/40 = 9/20 = <strong>45%</strong>.<br><em>The trap:</em> flipping the inequality and totaling the 80-and-above rows instead: 14 + 8 = 22, giving 55%. Both figures look reasonable if you skim past the word below.",
        tip: "Underline below / above / at least in the stem, then include only whole rows. With a total of 40, multiply the count by 2.5 to get the percent. Target: ~20 seconds." },
      { id: "q2h_di1c", type: "num", topic: "data", diff: d,
        text: "How many more students scored in the 80–89 range than in the 60–69 range?",
        answer: 8,
        expl: "Straight subtraction — read two rows and move on.<br>80–89 row: 14 students.<br>60–69 row: 6 students.<br>14 − 6 = <strong>8</strong>.<br><em>The trap:</em> answering with a ratio (14/6) or a percent when the question says how many <strong>more</strong>. How many more always means a plain difference in the table's own units.",
        tip: "Every DI set includes one gift question. Clear it in seconds and bank the surplus for the ratio or median question. Target: ~15 seconds." }
    ]
  });

  D.push({
    id: "q2h_di3", diff: d,
    intro: "<p><b>Hours of study and test scores for the 12 students in a seminar</b></p>",
    display: {
      note: "Each point represents one student.",
      scatter: { title: "Test score versus hours studied", xlabel: "Hours studied",
        ylabel: "(score)", xmax: 10, ymax: 100,
        points: [[1, 52], [2, 58], [2, 64], [3, 60], [4, 68], [4, 75], [5, 70], [6, 78], [6, 85], [7, 80], [8, 88], [9, 62]] }
    },
    questions: [
      { id: "q2h_di3a", type: "mcq", topic: "data", diff: d,
        text: "How many of the 12 students scored above 75?",
        choices: ["3", "4", "5", "6", "7"],
        answer: 1,
        expl: "Scan heights only — hours don't matter for this one.<br>Points above the 75 line: 78, 80, 85, and 88.<br>That is <strong>4 students</strong>.<br><em>The trap:</em> the student at exactly 75 — \"above 75\" excludes the boundary. Counting that point gives 5.",
        tip: "For \"above/below\" scatterplot counts, sweep one axis with a finger and mind the boundary word: above excludes, at-least includes. Target: ~15 seconds." },
      { id: "q2h_di3b", type: "mcq", topic: "data", diff: d,
        text: "Which of the following best describes the relationship shown in the scatterplot?",
        choices: [
          "A generally positive relationship with one clear exception",
          "A generally negative relationship",
          "No relationship between the two variables",
          "A perfectly linear positive relationship",
          "A relationship that is positive only above 6 hours of study"
        ],
        answer: 0,
        expl: "Trace the cloud left to right first, then look for stragglers.<br>From 1 hour up through 8 hours, scores climb steadily: 52 up to 88.<br>One point breaks the pattern: the student at 9 hours scoring 62.<br>So: <strong>generally positive, with one clear exception</strong>.<br><em>The trap:</em> \"perfectly linear\" — the trend is upward but the points don't sit on a line (2 hours maps to both 58 and 64). One outlier doesn't erase a trend, and a trend doesn't make it perfect.",
        tip: "Describe scatterplots in two passes: overall direction of the cloud, then any outliers. GRE answers usually hedge with \"generally.\" Target: ~15 seconds." },
      { id: "q2h_di3c", type: "num", topic: "data", diff: d, frac: true, ansFrac: [4, 5],
        text: "Of the students who studied for 6 or more hours, what fraction scored above 75?<br><i>Give your answer as a fraction.</i>",
        answer: 0.8,
        expl: "Restrict to the right region first, then count within it.<br>Students at 6+ hours: scores 78, 85, 80, 88, and 62 — that is 5 students.<br>Of those, above 75: 78, 85, 80, 88 — that is 4.<br>Fraction = <strong>4/5</strong>.<br><em>The trap:</em> forgetting the 9-hour outlier (62) when counting the denominator — it studied plenty and still belongs in the 6+ group, making the denominator 5, not 4.",
        tip: "Two-condition scatterplot questions: fence off the x-condition first, and count EVERY point inside the fence before applying the y-condition. Target: ~30 seconds." }
    ]
  });

  D.push({
    id: "q2h_di2", diff: d,
    intro: "<p><b>Annual exports and imports of Country Z, 2019–2023</b></p>",
    display: {
      line: { title: "Exports and imports ($ billions)", unit: "$ billions",
        cats: ["2019", "2020", "2021", "2022", "2023"],
        series: [
          { name: "Exports", values: [40, 44, 55, 50, 60] },
          { name: "Imports", values: [60, 62, 66, 72, 75] }
        ] }
    },
    questions: [
      { id: "q2h_di2a", type: "mcq", topic: "data", diff: d,
        text: "In which year was the ratio of imports to exports the greatest?",
        choices: ["2019", "2020", "2021", "2022", "2023"],
        answer: 0,
        expl: "Greatest <strong>ratio</strong>, not greatest gap — so divide each year, never subtract.<br>2019: 60/40 = <strong>1.50</strong><br>2020: 62/44 ≈ 1.41<br>2021: 66/55 = 1.20<br>2022: 72/50 = 1.44<br>2023: 75/60 = 1.25<br>The peak is <strong>2019</strong>, the only year where imports are a full 1.5 times exports.<br><em>The trap:</em> picking 2022, where the dollar gap is widest (72 − 50 = 22, versus 20 in 2019). A larger difference sitting on a larger base still produces a smaller ratio.",
        tip: "Ratio questions: divide, never subtract. Scan for the year with the smallest denominator relative to its numerator instead of computing all five exactly. Target: ~50 seconds." },
      { id: "q2h_di2b", type: "mcq", topic: "data", diff: d,
        text: "From 2019 to 2023, exports increased by what percent?",
        choices: ["20%", "33%", "50%", "60%", "150%"],
        answer: 2,
        expl: "Percent change is always measured from the starting value.<br>Exports: 40 in 2019 → 60 in 2023.<br>Increase: 60 − 40 = 20.<br><strong>20/40 = 50%</strong>.<br><em>The trap:</em> dividing by 60, the ending value, for 20/60 ≈ 33%. That number answers the reverse trip — falling from 60 to 40 is a 33% decrease, while rising from 40 to 60 is a 50% increase. Same pair of numbers, different denominators.",
        tip: "Percent change = (new − old)/old. The denominator is always the value the change started from, so up and down between the same two numbers differ. Target: ~20 seconds." },
      { id: "q2h_di2c", type: "num", topic: "data", diff: d,
        text: "What was the average (arithmetic mean) of Country Z's annual imports over the five years, in billions of dollars?",
        answer: 67,
        expl: "Average the import series, pairing values into round sums as you go.<br>Imports: 60, 62, 66, 72, 75.<br>60 + 75 = 135<br>62 + 72 = 134<br>135 + 134 + 66 = <strong>335</strong><br>335/5 = <strong>67</strong>.<br>Deviation check: guess 66, then add the offsets (−6, −4, 0, +6, +9 = +5), and 5/5 = 1, so 66 + 1 = 67.<br><em>The trap:</em> averaging the export line by mistake, or mixing the two series. Also confirm the mean lands between the smallest and largest imports (60 and 75) — 67 does.",
        tip: "Pick a rough anchor, sum the deviations from it, divide once, and add back. Faster and less error-prone than a five-number column sum. Target: ~30 seconds." }
    ]
  });
})();
