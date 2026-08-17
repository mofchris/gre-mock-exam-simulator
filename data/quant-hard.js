/* Quant bank - HARD. */
(function () {
  const B = window.GREBANK = window.GREBANK || {};
  B.quant = B.quant || [];
  B.disets = B.disets || [];
  const Q = B.quant, D = B.disets;
  const d = "hard";

  /* ---------- Quantitative Comparison ---------- */
  Q.push(
    { id: "qh_qc1", type: "qc", topic: "algebra", diff: d,
      info: "x and y are nonzero numbers",
      qa: "(x + y)²", qb: "x² + y²",
      answer: 3,
      expl: "Expand, then see what is actually left over.<br>(x + y)² = x² + 2xy + y².<br>Quantity B is x² + y², so the whole comparison reduces to the sign of <strong>2xy</strong>.<br>x = y = 1 → 2xy = 2 &gt; 0, so Quantity A is greater.<br>x = 1, y = −1 → 2xy = −2, so A = 0 &lt; 2 = B.<br>Both directions occur, so <strong>(D)</strong>.<br><em>The trap:</em> expanding (x + y)² as x² + y². The cross-term is the entire question, and \"nonzero\" never forces its sign.",
      tip: "Subtract the quantities and the problem usually collapses to the sign of one term. If that sign is free to vary, answer (D). Target: ~15 seconds." },
    { id: "qh_qc2", type: "qc", topic: "arithmetic", diff: d,
      qa: "3⁴⁰", qb: "9¹⁹",
      answer: 0,
      expl: "Force the bases to match, then only the exponents matter.<br>9 = 3², so 9¹⁹ = (3²)¹⁹ = 3³⁸.<br>Compare 3⁴⁰ with 3³⁸.<br>Same base, bigger than 1, so the larger exponent wins: <strong>3⁴⁰ &gt; 3³⁸</strong>.<br>Quantity A is greater.<br><em>The trap:</em> judging by the base and picking 9¹⁹ because 9 &gt; 3. Convert instead — 3⁴⁰ = 9²⁰, which beats 9¹⁹ for the same reason.",
      tip: "Rewrite everything in the smallest common base using (aᵐ)ⁿ = aᵐⁿ, then compare exponents. Target: ~10 seconds." },
    { id: "qh_qc3", type: "qc", topic: "arithmetic", diff: d,
      qa: "The number of distinct prime factors of 210", qb: "The number of distinct prime factors of 330",
      answer: 2,
      expl: "Don't factor by slow repeated division — break each number into easy chunks:<br>210 = 21 × 10 = (3 × 7)(2 × 5) → primes 2, 3, 5, 7 → count = 4.<br>330 = 33 × 10 = (3 × 11)(2 × 5) → primes 2, 3, 5, 11 → count = 4.<br>Four distinct primes each — <strong>equal</strong>.<br><em>The trap:</em> \"distinct\" means count each different prime once, ignoring repeats. Example: 12 = 2² × 3 has <strong>2</strong> distinct prime factors, not 3.",
      tip: "Split into familiar chunks (× 10 is a gift: it contributes 2 and 5), then just list the different primes. Target: ~10–15 seconds." },
    { id: "qh_qc4", type: "qc", topic: "algebra", diff: d,
      info: "0 < x < 1",
      qa: "1/(1 − x)", qb: "1 + x",
      answer: 0,
      expl: "Clear the fraction rather than plugging in numbers.<br>Since 0 &lt; x &lt; 1, the quantity 1 − x is <strong>positive</strong>, so multiplying both sides by it is legal and preserves the comparison.<br>A × (1 − x) = 1.<br>B × (1 − x) = (1 + x)(1 − x) = 1 − x².<br>x² &gt; 0, so 1 − x² &lt; 1.<br>So A &gt; B for every allowed x — <strong>Quantity A is greater</strong>.<br><em>The trap:</em> multiplying by an expression whose sign you haven't checked. Here the restriction 0 &lt; x &lt; 1 is exactly what licenses the move.",
      tip: "Multiplying both quantities by the same positive expression is safe; the difference of squares (1+x)(1−x) then does the work. Target: ~20 seconds." },
    { id: "qh_qc5", type: "qc", topic: "geometry", diff: d,
      info: "Triangle PQR has angles measuring 50°, 60°, and 70°.",
      qa: "The length of the side opposite the 70° angle", qb: "The length of the side opposite the 60° angle",
      answer: 0,
      expl: "No trigonometry needed — use the angle–side ordering rule.<br>In any triangle, the longer side sits opposite the larger angle.<br>The angles are 50°, 60°, 70°; the pair being compared is 70° versus 60°.<br>70° &gt; 60°, so the side facing 70° is the longer one.<br><strong>Quantity A is greater.</strong><br><em>The trap:</em> assuming this needs the Law of Sines, or hunting for a special right triangle. 50-60-70 is just an ordering problem.",
      tip: "Rank the angles; the opposite sides rank in exactly the same order. Target: ~10 seconds." },
    { id: "qh_qc6", type: "qc", topic: "data", diff: d,
      info: "A fair coin is flipped 3 times.",
      qa: "The probability of getting at least one head", qb: "0.85",
      answer: 0,
      expl: "\"At least one\" means flip to the complement.<br>The only failing outcome is all three tails.<br>P(all tails) = (1/2)³ = 1/8.<br>P(at least one head) = 1 − 1/8 = 7/8.<br>7/8 = <strong>0.875</strong>, and 0.875 &gt; 0.85.<br><strong>Quantity A is greater.</strong><br><em>The trap:</em> computing \"exactly one head\" instead and getting 3/8, or assuming heads-versus-tails symmetry makes the answer 1/2.",
      tip: "P(at least one) = 1 − P(none). Keep eighths memorized: 1/8 = 0.125, 7/8 = 0.875. Target: ~15 seconds." },
    { id: "qh_qc7", type: "qc", topic: "algebra", diff: d,
      info: "x² + y² = 25, where x and y are real numbers",
      qa: "x + y", qb: "5",
      answer: 3,
      expl: "The constraint is a circle of radius 5, so hunt for extreme points on it.<br>x = 3, y = 4: sum of squares is 25, and x + y = 7 &gt; 5.<br>x = 5, y = 0: still 25, and x + y = 5 — equal.<br>x = −3, y = −4: still 25, and x + y = −7 &lt; 5.<br>Greater, equal, and less are all reachable, so <strong>(D)</strong>.<br><em>The trap:</em> quietly assuming x and y are positive. Nothing says so, and a single negative pair breaks the comparison.",
      tip: "When one equation allows a whole family of values, test the balanced case, an axis case, and a negative case. Two disagreeing results means (D). Target: ~20 seconds." },
    { id: "qh_qc8", type: "qc", topic: "algebra", diff: d,
      info: "a < b < 0",
      qa: "ab", qb: "b²",
      answer: 0,
      expl: "Subtract and factor instead of testing blindly.<br>A − B = ab − b² = b(a − b).<br>Given a &lt; b &lt; 0: b is negative, and a − b is negative because a is the smaller number.<br>Negative × negative = <strong>positive</strong>, so A − B &gt; 0 for every allowed pair.<br>Check a = −3, b = −2: ab = 6 and b² = 4.<br><strong>Quantity A is greater.</strong><br><em>The trap:</em> reasoning \"a square beats a product\" and choosing B. That holds for positives, but here both factors of the difference flip sign.",
      tip: "Difference-and-factor: the given ordering fixes the sign of each factor, so no number-plugging is required. Target: ~20 seconds." },
    { id: "qh_qc9", type: "qc", topic: "arithmetic", diff: d,
      qa: "The remainder when 2¹⁰⁰ is divided by 7", qb: "2",
      answer: 2,
      expl: "Never compute the huge power — find the <strong>remainder cycle</strong> instead.<br>2¹ ÷ 7 → remainder 2.<br>2² = 4 ÷ 7 → remainder 4.<br>2³ = 8 ÷ 7 → remainder 1.<br>The pattern repeats: 2, 4, 1, 2, 4, 1, … so the cycle length is 3.<br>Now divide the exponent by the cycle length: 100 = 3(33) + 1, so 100 leaves remainder 1.<br>That puts 2¹⁰⁰ in <strong>position 1</strong> of the cycle → remainder <strong>2</strong>. Equal to Quantity B.",
      tip: "Compute small powers until the remainders repeat, get the cycle length, then reduce the exponent by it. If it divides evenly, use the LAST position of the cycle. Target: ~15–20 seconds." },
    { id: "qh_qc10", type: "qc", topic: "geometry", diff: d,
      info: "A right circular cylinder has radius 2 and height 5.",
      qa: "The volume of the cylinder", qb: "60",
      answer: 0,
      expl: "Get the volume in terms of π, then divide the comparison down.<br>V = πr²h = π(2²)(5) = <strong>20π</strong>.<br>Compare 20π with 60 by dividing both by 20: π versus 3.<br>π ≈ 3.14 &gt; 3, so 20π ≈ 62.8 &gt; 60.<br><strong>Quantity A is greater.</strong><br><em>The trap:</em> rounding π to 3, which makes the two look equal. Also remember only the radius gets squared — height stays to the first power.",
      tip: "V = πr²h, then divide both quantities by the coefficient so the comparison becomes π versus a plain number. Target: ~15 seconds." },
    { id: "qh_qc11", type: "qc", topic: "algebra", diff: d,
      info: "|x| + |y| = 10, where x and y are real numbers",
      qa: "x² + y²", qb: "50",
      answer: 3,
      expl: "One equation, two unknowns — probe the ends of the constraint.<br>Even split, |x| = |y| = 5: x² + y² = 25 + 25 = 50, <strong>equal</strong> to B.<br>All in one variable, x = 10, y = 0: x² + y² = 100 + 0 = 100 &gt; 50.<br>Equal is possible and greater is possible, so <strong>(D)</strong>.<br><em>The trap:</em> stopping at the even split, getting exactly 50, and calling it equal. For a fixed |x| + |y|, an even split <em>minimizes</em> x² + y², so 50 is the floor, not the value.",
      tip: "Fixed |x| + |y|: sum of squares is smallest at an even split, largest when loaded into one variable. One equal case plus one unequal case gives (D). Target: ~20 seconds." },
    { id: "qh_qc12", type: "qc", topic: "data", diff: d,
      info: "Set S consists of 30 integers whose average (arithmetic mean) is 40.",
      qa: "The median of S", qb: "40",
      answer: 3,
      expl: "Ask what the mean actually pins down: only the <strong>total</strong>.<br>Total = 30 × 40 = 1,200.<br>Symmetric case: thirty 40s. Median = 40, equal to B.<br>Skewed case: twenty-nine 1s plus one 1,171 — that still totals 1,200, and the median is 1, far below 40.<br>Flip the construction and the median lands above 40.<br>So <strong>(D)</strong>.<br><em>The trap:</em> treating mean and median as interchangeable. One extreme value drags the mean hard but barely moves the middle.",
      tip: "Mean fixes the sum; median fixes the middle. With no symmetry stated, build one balanced set and one outlier-heavy set, then answer (D). Target: ~20 seconds." }
  );

  /* ---------- Multiple Choice ---------- */
  Q.push(
    { id: "qh_mc1", type: "mcq", topic: "data", diff: d,
      text: "How many distinct arrangements are there of the letters in the word LEVEL?",
      choices: ["20", "30", "60", "120", "240"],
      answer: 1,
      expl: "Arrangements of a word with repeats: take the factorial, then divide out the repeats.<br>LEVEL has 5 letters: L, E, V, E, L.<br>L appears twice, E appears twice, V once.<br>Arrangements = 5!/(2! × 2!).<br>= 120/4 = <strong>30</strong>.<br><em>The trap:</em> 120 comes from treating all five letters as distinct; 60 comes from dividing out only one of the two repeated pairs. Every repeated letter needs its own division.",
      tip: "n! divided by k! once for each letter that appears k times. Target: ~15 seconds." },
    { id: "qh_mc2", type: "mcq", topic: "data", diff: "medium", /* recalibrated: real-GRE medium */
      text: "Two fair six-sided dice are rolled. What is the probability that the sum of the two results is 8?",
      choices: ["1/6", "5/36", "1/8", "7/36", "1/9"],
      answer: 1,
      expl: "Count favorable ordered outcomes over the fixed total of 36.<br>Two dice give 6 × 6 = 36 equally likely ordered rolls.<br>Walk the first die and look for a partner summing to 8: (2,6), (3,5), (4,4), (5,3), (6,2).<br>That is <strong>5</strong> favorable rolls.<br>P = <strong>5/36</strong>.<br><em>The trap:</em> 1/6 is 6/36, the count for a sum of <strong>7</strong> — the one sum with six combinations. A sum of 8 has only five, since (4,4) occurs a single way.",
      tip: "Denominator is always 36 for two dice. March the first die 1 through 6 and check whether the needed partner exists. Target: ~20 seconds." },
    { id: "qh_mc3", type: "mcq", topic: "arithmetic", diff: d,
      text: "What is the units digit of 7⁶³?",
      choices: ["1", "3", "7", "9", "0"],
      answer: 1,
      expl: "Track only the last digit; it repeats in a short cycle.<br>7¹ ends in 7.<br>7² = 49 ends in 9.<br>7³: 9 × 7 = 63, ends in 3.<br>7⁴: 3 × 7 = 21, ends in 1.<br>Cycle is 7, 9, 3, 1 — length 4.<br>Divide the exponent: 63 = 4(15) + 3, remainder 3.<br>Take the <strong>3rd</strong> position of the cycle → <strong>3</strong>.<br><em>The trap:</em> answering 1 by assuming a big exponent lands at the end of the cycle, or 7 by starting the count at 7⁰ instead of 7¹.",
      tip: "Units digits cycle with period 1, 2, or 4. Exponent ÷ period, and the remainder picks the position — remainder 0 means the last one. Target: ~20 seconds." },
    { id: "qh_mc4", type: "mcq", topic: "arithmetic", diff: d,
      text: "A boat travels at 15 miles per hour in still water. It goes 36 miles downstream with a 3-mph current and returns 36 miles upstream. What is the total travel time?",
      choices: ["4 hours", "4.8 hours", "5 hours", "5.2 hours", "6 hours"],
      answer: 2,
      expl: "Two legs at two different speeds, so time each leg separately.<br>Downstream the current helps: 15 + 3 = 18 mph. Time = 36/18 = 2 hours.<br>Upstream it fights: 15 − 3 = 12 mph. Time = 36/12 = 3 hours.<br>Total = 2 + 3 = <strong>5 hours</strong>.<br><em>The trap:</em> 4.8 hours is 72/15 — averaging the speeds as if the current cancels out. It never does: the slow leg lasts longer, so a round trip with current always beats still-water time in time taken.",
      tip: "Round trip with a current: add the two times, never average the speeds. The total must exceed total distance ÷ still-water speed. Target: ~30 seconds." },
    { id: "qh_mc5", type: "mcq", topic: "algebra", diff: d,
      text: "If x + 1/x = 4, what is the value of x² + 1/x²?",
      choices: ["8", "12", "14", "16", "18"],
      answer: 2,
      expl: "Don't solve for x — square the expression you were handed.<br>(x + 1/x)² = x² + 2(x)(1/x) + 1/x².<br>The middle term is 2(1) = 2, so the square equals x² + 2 + 1/x².<br>The given value makes that 4² = 16.<br>x² + 2 + 1/x² = 16.<br>Subtract the cross term: x² + 1/x² = <strong>14</strong>.<br><em>The trap:</em> 16 comes from squaring 4 and stopping. Since x times 1/x is always exactly 1, the correction is always 2.",
      tip: "x + 1/x = k → x² + 1/x² = k² − 2 (and x³ + 1/x³ = k³ − 3k). Target: ~15 seconds." },
    { id: "qh_mc6", type: "mcq", topic: "geometry", diff: "medium", /* recalibrated: real-GRE medium */
      text: "A square has a diagonal of length 10. What is the area of the square?",
      choices: ["25", "40", "50", "100", "100√2"],
      answer: 2,
      expl: "Go straight from diagonal to area; you never need the side.<br>The diagonal cuts the square into two right triangles: d² = s² + s² = 2s².<br>Area is s², so area = d²/2.<br>= 10²/2 = 100/2 = <strong>50</strong>.<br>Longhand check: s = 10/&radic;2 ≈ 7.07, and 7.07² ≈ 50.<br><em>The trap:</em> 100 comes from treating the diagonal as a side; 25 comes from halving the diagonal first and squaring 5. Halve the <em>square</em> of the diagonal, not the diagonal itself.",
      tip: "Square: area = diagonal²/2, and diagonal = side × &radic;2. Target: ~10 seconds." },
    { id: "qh_mc7", type: "mcq", topic: "algebra", diff: "medium", /* recalibrated: real-GRE medium */
      text: "If f(x) = x² − 3x, what is the value of f(f(2))?",
      choices: ["−2", "0", "4", "10", "18"],
      answer: 3,
      expl: "Composition is evaluated inside-out.<br>Inner step: f(2) = 2² − 3(2) = 4 − 6 = <strong>−2</strong>.<br>Now feed −2 back into the same rule: f(−2) = (−2)² − 3(−2).<br>(−2)² = 4.<br>−3(−2) = +6.<br>4 + 6 = <strong>10</strong>.<br><em>The trap:</em> −2 is the inner result, not the answer — a very easy place to stop. Getting −2 a second time means the minus sign in front of 3x was dropped when the input went negative.",
      tip: "Evaluate the inner function, write the number down, then substitute it — and re-check signs when the input is negative. Target: ~20 seconds." },
    { id: "qh_mc8", type: "mcq", topic: "arithmetic", diff: d,
      text: "A town's population increased by 25 percent from 2010 to 2015 and decreased by 20 percent from 2015 to 2020. The 2020 population is what percent of the 2010 population?",
      choices: ["95%", "100%", "102%", "105%", "110%"],
      answer: 1,
      expl: "Percent changes multiply; they never add. Use a base of 100.<br>Up 25%: 100 × 1.25 = 125.<br>Down 20%: 125 × 0.80 = 100.<br>2020 is 100 out of 100, so <strong>100%</strong>.<br>Why it lands exactly: 1.25 = 5/4 and 0.80 = 4/5, and (5/4)(4/5) = 1.<br><em>The trap:</em> 105% comes from adding +25 and −20. The 20% cut applies to the bigger 2015 base, so it removes 25 people, not 20.",
      tip: "Chain multipliers of the form (1 + r) on a base of 100, and learn the inverse pairs: +25% undoes −20%, +50% undoes −33⅓%. Target: ~20 seconds." },
    { id: "qh_mc9", type: "mcq", topic: "arithmetic", diff: d,
      text: "How many integers from 1 to 100 inclusive are divisible by 3 or by 5?",
      choices: ["45", "47", "50", "53", "55"],
      answer: 1,
      expl: "\"Or\" calls for inclusion–exclusion.<br>Multiples of 3 up to 100: 100 ÷ 3 → 33.<br>Multiples of 5: 100 ÷ 5 = 20.<br>Numbers in both lists are the multiples of 15: 100 ÷ 15 → 6.<br>Those 6 were counted twice, so remove one copy.<br>33 + 20 − <strong>6</strong> = <strong>47</strong>.<br><em>The trap:</em> 53 is 33 + 20 with the overlap left in. Any \"A or B\" count needs the shared multiples subtracted exactly once.",
      tip: "Count each set by floor division, then subtract the count of LCM multiples. Drop remainders — never round up. Target: ~20 seconds." },
    { id: "qh_mc10", type: "mcq", topic: "data", diff: "medium", /* recalibrated: real-GRE medium */
      text: "The average age of a group of 5 friends is 24. After one friend leaves, the average age of the remaining 4 is 22. How old is the friend who left?",
      choices: ["26", "28", "30", "32", "34"],
      answer: 3,
      expl: "Averages mislead; work with <strong>totals</strong>.<br>Total for 5 friends: 5 × 24 = 120.<br>Total for the remaining 4: 4 × 22 = 88.<br>The person who left accounts for the entire gap: 120 − 88 = <strong>32</strong>.<br>Sanity check: the average fell 2 across 4 people, which is 8 years of \"extra\" age, on top of the 24 the leaver was contributing — 24 + 8 = 32.<br><em>The trap:</em> 26 comes from adding the 2-point drop to 24. That drop is spread over 4 people, so it is worth 8, not 2.",
      tip: "Sum = average × count. A removed value equals old total minus new total. Target: ~20 seconds." },
    { id: "qh_mc11", type: "mcq", topic: "geometry", diff: d,
      text: "A circle of radius 3 is inscribed in a square. What is the area of the region inside the square but outside the circle?",
      choices: ["9 − 9π", "36 − 6π", "36 − 9π", "36 − 3π", "9π − 36"],
      answer: 2,
      expl: "Picture it: an inscribed circle touches all four sides, so its <strong>diameter equals the side</strong>.<br>Side = 2(3) = 6.<br>Square area = 6² = 36.<br>Circle area = π(3²) = 9π.<br>Leftover = <strong>36 − 9π</strong> ≈ 36 − 28.3 ≈ 7.7, comfortably positive.<br><em>The trap:</em> 9 − 9π uses the radius as the side and comes out negative — always check that a leftover area is positive. 36 − 6π uses the circumference form 2πr in place of πr².",
      tip: "Inscribed circle: diameter = side of the square. Subtract areas, keep π symbolic, then confirm the result is positive. Target: ~20 seconds." },
    { id: "qh_mc12", type: "mcq", topic: "algebra", diff: "medium", /* recalibrated: real-GRE medium */
      text: "If 3 − 2x < 7, which of the following describes all possible values of x?",
      choices: ["x < −2", "x > −2", "x < 2", "x > 2", "x > 5"],
      answer: 1,
      expl: "Isolate x and watch the direction of the sign.<br>3 − 2x &lt; 7.<br>Subtract 3 from both sides: −2x &lt; 4.<br>Divide by −2, and dividing by a negative <strong>flips</strong> the inequality: x &gt; −2.<br>So the solution is <strong>x &gt; −2</strong>.<br>Verify with x = 0: 3 − 0 = 3 &lt; 7, true — and 0 &gt; −2, consistent.<br><em>The trap:</em> x &lt; −2 is the identical arithmetic with the flip forgotten. Testing one convenient value catches it immediately.",
      tip: "Multiplying or dividing an inequality by a negative reverses it. Then plug in one easy value to confirm the direction. Target: ~15 seconds." }
  );

  /* ---------- Multiple-answer ---------- */
  Q.push(
    { id: "qh_ma1", type: "mcma", topic: "algebra", diff: d,
      text: "If x² − 5x + 6 < 0, which of the following could be the value of x?<br>Indicate <b>all</b> such values.",
      choices: ["2", "2.5", "2.9", "3", "3.5"],
      answer: [1, 2],
      expl: "Factor first:<br>x² − 5x + 6 = (x − 2)(x − 3), so we need (x − 2)(x − 3) &lt; 0.<br><strong>Fast recognition:</strong> (x − a)(x − b) &lt; 0 means x is strictly <strong>between</strong> a and b. So 2 &lt; x &lt; 3.<br>Check each option against that interval:<br>· 2 → makes the expression 0, and 0 is not &lt; 0 — out.<br>· 2.5 → inside — works.<br>· 2.9 → inside — works.<br>· 3 → makes it 0 again — out.<br>· 3.5 → outside the interval — out.<br><em>The trap:</em> a strict inequality (&lt; not ≤) means the endpoints never count.",
      tip: "Factor → roots → 'negative between the roots' (for an upward-opening quadratic). Check strictness before touching endpoints. Target: ~15–20 seconds." },
    { id: "qh_ma2", type: "mcma", topic: "arithmetic", diff: d,
      text: "If n is an odd integer, which of the following must be even?<br>Indicate <b>all</b> such expressions.",
      choices: ["n² ", "(n + 1)(n − 1)", "n³ + 1", "n/2"],
      answer: [1, 2],
      expl: "Run each expression through parity rules, then confirm with one number.<br>Let n be odd.<br>n²: odd × odd = <strong>odd</strong> — out.<br>(n + 1)(n − 1): n ± 1 are both even, so the product is even — <strong>works</strong>.<br>n³ + 1: n³ is odd × odd × odd = odd, and odd + 1 = even — <strong>works</strong>.<br>n/2: an odd number over 2 is not an integer at all, so it cannot be even — out.<br>Test n = 3: 9 (odd), 4 × 2 = 8 (even), 27 + 1 = 28 (even), 1.5 (not an integer).<br><em>The trap:</em> calling n/2 even because a 2 appears in it. \"Even\" requires being an integer first.",
      tip: "Parity toolkit: odd × odd = odd, odd ± 1 = even, odd + odd = even. One test value such as n = 3 checks the whole list. Target: ~20 seconds." },
    { id: "qh_ma3", type: "mcma", topic: "algebra", diff: d,
      text: "If |2x − 6| < 4, which of the following could be the value of x?<br>Indicate <b>all</b> such values.",
      choices: ["0", "1", "2", "4", "5"],
      answer: [2, 3],
      expl: "Unwrap the absolute value into a double inequality.<br>|2x − 6| &lt; 4 means −4 &lt; 2x − 6 &lt; 4.<br>Add 6 across all three parts: 2 &lt; 2x &lt; 10.<br>Divide by 2: <strong>1 &lt; x &lt; 5</strong>, strictly.<br>Now test the options: 0 is below the range; 1 gives |−4| = 4, which is not less than 4; 2 gives |−2| = 2, in; 4 gives |2| = 2, in; 5 gives |4| = 4, out.<br>So <strong>2 and 4</strong>.<br><em>The trap:</em> including 1 and 5. They make the absolute value exactly 4, and the inequality is strict.",
      tip: "|expr| &lt; k → −k &lt; expr &lt; k, then solve all three parts at once. Endpoints only qualify when the sign is ≤. Target: ~20 seconds." }
  );

  /* ---------- Numeric Entry ---------- */
  Q.push(
    { id: "qh_ne1", type: "num", topic: "arithmetic", diff: d,
      text: "What is the remainder when 3⁴⁷ is divided by 5?",
      answer: 2,
      expl: "Find the remainder pattern of powers of 3 divided by 5:<br>3¹ → 3.<br>3² = 9 → 4.<br>3³ = 27 → 2.<br>3⁴ = 81 → 1.<br>The repeating cycle is 3, 4, 2, 1 — cycle length 4.<br>Divide the exponent by the cycle length: 47 = 4(11) + 3, so 47 leaves remainder 3.<br>Use the <strong>3rd position</strong> of the cycle (3, 4, <strong>2</strong>, 1) → the remainder is <strong>2</strong>.",
      tip: "Cycle → cycle length → exponent ÷ cycle length → that remainder picks the position. Even division means the last position. Target: ~15–20 seconds." },
    { id: "qh_ne2", type: "num", topic: "arithmetic", diff: "medium", /* recalibrated: real-GRE medium */
      text: "$10,000 is invested at 10 percent annual interest, compounded annually. What is the value of the investment, in dollars, after exactly 2 years?",
      answer: 12100,
      expl: "Compounding multiplies year over year — it does not add a flat amount.<br>Yearly multiplier: 1 + 0.10 = 1.1.<br>Year 1: 10,000 × 1.1 = 11,000.<br>Year 2: 11,000 × 1.1 = <strong>12,100</strong>.<br>Same thing in one step: 10,000 × 1.1² = 10,000 × 1.21 = 12,100.<br><em>The trap:</em> 12,000 is simple interest — $1,000 twice. Compounding also pays 10% on year one's $1,000 of interest, and that is the extra $100.",
      tip: "Value = P(1 + r)ⁿ. For two years, square the multiplier; the gap from simple interest is interest-on-interest. Target: ~20 seconds." },
    { id: "qh_ne3", type: "num", topic: "data", diff: d, frac: true, ansFrac: [3, 10],
      text: "A bag contains 3 red and 2 blue marbles. Two marbles are drawn at random without replacement. What is the probability that both are red?<br><i>Give your answer as a fraction.</i>",
      answer: 0.3,
      expl: "Without replacement, the pool shrinks between draws.<br>Start: 3 red of 5 marbles, so P(first red) = 3/5.<br>After one red leaves: 2 red of 4 marbles, so P(second red) = 2/4 = 1/2.<br>Multiply the two: (3/5)(1/2) = <strong>3/10</strong>.<br><em>The trap:</em> 9/25 comes from using 3/5 twice, as if the first marble went back in. Both the red count <em>and</em> the total must drop by one after each successful draw.",
      tip: "Sequential draws: multiply conditional probabilities, decrementing numerator and denominator each time. Target: ~20 seconds." },
    { id: "qh_ne4", type: "num", topic: "arithmetic", diff: "medium", /* recalibrated: real-GRE medium */
      text: "What is the sum of all integers from 1 to 50, inclusive?",
      answer: 1275,
      expl: "Use the formula instead of adding fifty numbers.<br>Sum of 1 through n = n(n + 1)/2.<br>= 50(51)/2.<br>= 2,550/2 = <strong>1,275</strong>.<br>Pairing check: (1 + 50), (2 + 49), (3 + 48), … gives 25 pairs each worth 51, and 25 × 51 = 1,275.<br><em>The trap:</em> 2,550 is the answer with the division by 2 skipped. The pairing view is the built-in check — half as many pairs as numbers.",
      tip: "Evenly spaced list: sum = (first + last)/2 × count. Works for any arithmetic sequence, not just 1 to n. Target: ~15 seconds." }
  );

  /* ---------- Data Interpretation sets ---------- */
  D.push({
    id: "qh_di1", diff: d,
    intro: "<p><b>Electricity generation in Country X, by source (terawatt-hours)</b></p>",
    display: {
      tables: [{
        caption: "Generation by source, 2010 and 2020 (TWh)",
        cols: ["Source", "2010", "2020"],
        rows: [
          ["Coal", "400", "300"],
          ["Natural gas", "200", "260"],
          ["Nuclear", "150", "140"],
          ["Renewables", "50", "200"],
          ["<b>Total</b>", "<b>800</b>", "<b>900</b>"]
        ]
      }]
    },
    questions: [
      { id: "qh_di1a", type: "mcq", topic: "data", diff: d,
        text: "From 2010 to 2020, generation from renewables increased by what percent?",
        choices: ["150%", "200%", "300%", "400%", "500%"],
        answer: 2,
        expl: "Percent increase measures the change against the starting value.<br>Renewables: 50 in 2010, 200 in 2020.<br>Change = 200 − 50 = 150.<br>Divide by the <strong>original</strong>: 150/50 = 3.<br>3 = <strong>300%</strong>.<br><em>The trap:</em> 400% is 200/50 — what the new value <em>is</em> as a percent of the old, not how much it <em>increased</em>. Those two always differ by exactly 100%, so quadrupling is a 300% increase.",
        tip: "Percent increase = (new − old)/old. \"Is what percent of\" = new/old. Read which one the question wants. Target: ~15 seconds." },
      { id: "qh_di1b", type: "mcq", topic: "data", diff: d,
        text: "In 2020, renewables accounted for approximately what percent of total generation?",
        choices: ["18%", "22%", "25%", "29%", "33%"],
        answer: 1,
        expl: "Part over whole, with both numbers from the same year.<br>2020 renewables = 200.<br>2020 total = 900.<br>200/900 = 2/9.<br>2/9 ≈ 0.222, so about <strong>22%</strong>.<br><em>The trap:</em> 25% comes from dividing 200 by the 2010 total of 800. The question says \"in 2020,\" so the denominator must be the 2020 total.",
        tip: "Lock part and whole to the same row/column, then convert: 1/9 ≈ 11%, 2/9 ≈ 22%, 1/4 = 25%. Target: ~15 seconds." },
      { id: "qh_di1c", type: "mcq", topic: "data", diff: d,
        text: "Which source had the greatest change in absolute value of generation from 2010 to 2020?",
        choices: ["Coal", "Natural gas", "Nuclear", "Renewables", "Two sources tie"],
        answer: 3,
        expl: "\"Absolute value of change\" ignores direction — compute each gap and compare sizes.<br>Coal: 300 − 400 = −100, size 100.<br>Natural gas: 260 − 200 = +60.<br>Nuclear: 140 − 150 = −10.<br>Renewables: 200 − 50 = +150.<br>Biggest magnitude is <strong>renewables, 150 TWh</strong>.<br><em>The trap:</em> picking coal because a decline of 100 from the largest source looks dramatic, or ranking by percent change instead. Absolute change is raw TWh, and 150 &gt; 100.",
        tip: "Absolute change = |new − old| in the table's own units. Eyeball the two columns for the widest gap instead of computing percents. Target: ~20 seconds." }
    ]
  });

  D.push({
    id: "qh_di2", diff: d,
    intro: "<p><b>Quarterly revenue and profit of Cormorant Ltd. (millions of dollars)</b></p>",
    display: {
      bar: { title: "Revenue and profit by quarter", unit: "$ millions",
        cats: ["Q1", "Q2", "Q3", "Q4"],
        series: [{ name: "Revenue", values: [50, 60, 80, 90] }, { name: "Profit", values: [5, 9, 16, 17] }] }
    },
    questions: [
      { id: "qh_di2a", type: "mcq", topic: "data", diff: d,
        text: "In which quarter was profit as a percent of revenue the greatest?",
        choices: ["Q1", "Q2", "Q3", "Q4", "It cannot be determined"],
        answer: 2,
        expl: "\"Percent of revenue\" is a ratio, so divide each pair — bar height alone won't tell you.<br>Q1: 5/50 = 10%.<br>Q2: 9/60 = 15%.<br>Q3: 16/80 = <strong>20%</strong>.<br>Q4: 17/90 ≈ 18.9%.<br>The highest margin is <strong>Q3</strong>.<br><em>The trap:</em> going with Q4 because its profit bar is the tallest. Q4 earns more dollars but on more revenue, so its margin slips just under Q3's.",
        tip: "Margin questions: divide profit by revenue for each category and look for the cleanest fraction, not the tallest bar. Target: ~30 seconds." },
      { id: "qh_di2b", type: "num", topic: "data", diff: d,
        text: "What was Cormorant's total profit for the year, in millions of dollars?",
        answer: 47,
        expl: "Read only the profit series, then add the four quarters.<br>Q1 = 5.<br>Q2 = 9.<br>Q3 = 16.<br>Q4 = 17.<br>5 + 9 = 14; 14 + 16 = 30; 30 + 17 = <strong>47</strong> million dollars.<br><em>The trap:</em> adding the taller revenue bars gives 280, and summing both series gives 327. The question asks for profit only, so identify the series from the legend before adding anything.",
        tip: "Confirm which series the legend assigns to each bar, then total that one series alone. Target: ~15 seconds." },
      { id: "qh_di2c", type: "mcq", topic: "data", diff: d,
        text: "Revenue in Q4 was what percent greater than revenue in Q1?",
        choices: ["40%", "44%", "55%", "80%", "180%"],
        answer: 3,
        expl: "\"Percent greater than\" is a difference divided by the baseline.<br>Q4 revenue = 90; Q1 revenue = 50.<br>Difference = 90 − 50 = 40.<br>Divide by the Q1 baseline: 40/50 = 0.8.<br>= <strong>80% greater</strong>.<br><em>The trap:</em> 180% is 90/50 — what Q4 <em>is</em> as a percent of Q1, with the subtraction skipped. 44% is 40/90, dividing by the wrong quarter.",
        tip: "Percent greater = (bigger − smaller)/smaller. Whatever follows the word \"than\" is the denominator. Target: ~15 seconds." }
    ]
  });
})();
