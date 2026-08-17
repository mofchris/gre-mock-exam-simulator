/* GRE Study Course - Unit 4: Advanced Quant */
(function () {
  const C = window.GRECOURSE = window.GRECOURSE || { units: [] };

  C.units.push({
    id: "u4",
    title: "Unit 4: Advanced Quantitative Reasoning",
    blurb: "Geometry, data analysis, charts, and the question type unique to the GRE: Quantitative Comparison, where the strategy matters more than the math.",
    modules: [

/* ================= MODULE 12 ================= */
{
  id: "gm4_1", title: "Geometry", minutes: 16, level: "core",
  content: `
<p>GRE geometry is formula-light and reasoning-heavy. There's no trigonometry and no proofs. But there is
one rule that catches everyone.</p>
<div class="warnbox"><strong>Figures are NOT drawn to scale unless the problem says so.</strong> A triangle
that looks equilateral may not be. An angle that looks like 90° may not be, <em>unless it's marked</em>.
<strong>Exception:</strong> coordinate systems and number lines <em>are</em> drawn to scale.</div>

<h2>Lines and angles</h2>
<ul>
  <li>A straight line = 180°. Angles around a point = 360°.</li>
  <li>Vertical angles (opposite each other at a crossing) are <strong>equal</strong>.</li>
  <li>When parallel lines are cut by a transversal, you only get <strong>two</strong> distinct angles, and they sum to 180°. Every angle is either equal to, or supplementary to, every other.</li>
</ul>

<h2>Triangles: the highest-yield shape</h2>
<ul>
  <li><strong>Angles sum to 180°.</strong></li>
  <li><strong>Area = ½ × base × height.</strong> The height must be <em>perpendicular</em> to the base.</li>
  <li><strong>Triangle inequality:</strong> any side is less than the sum and greater than the difference of the other two. With sides 5 and 8, the third side s satisfies <strong>3 < s < 13</strong> (strictly).</li>
  <li><strong>Bigger angle faces the bigger side.</strong> This alone answers many QC questions without any computation.</li>
  <li>The exterior angle equals the sum of the two remote interior angles.</li>
</ul>

<h3>Right triangles</h3>
<p><strong>a² + b² = c².</strong> But recognize the common triples on sight and skip the arithmetic:</p>
<table>
  <tr><th>Triple</th><th>Multiples</th></tr>
  <tr><td><strong>3-4-5</strong></td><td>6-8-10, 9-12-15, 30-40-50</td></tr>
  <tr><td><strong>5-12-13</strong></td><td>10-24-26</td></tr>
  <tr><td>8-15-17</td><td>-</td></tr>
</table>
<p>Special right triangles (memorize the ratios):</p>
<ul>
  <li><strong>45-45-90:</strong> sides are x : x : x√2. (A square's diagonal is s√2.)</li>
  <li><strong>30-60-90:</strong> sides are x : x√3 : 2x. The <em>short</em> leg faces the 30°.</li>
</ul>

<h2>Quadrilaterals</h2>
<ul>
  <li>Rectangle: area = lw; perimeter = 2(l + w).</li>
  <li>Square: area = s². <strong>And: area = d²/2</strong> where d is the diagonal. Memorize this shortcut, it saves 30 seconds every time.</li>
  <li>Parallelogram: area = base × height. Trapezoid: area = ½(b₁ + b₂) × h.</li>
  <li>Interior angles of any n-sided polygon: <strong>(n − 2) × 180°</strong>. Pentagon = 540°.</li>
</ul>

<h2>Circles</h2>
<table>
  <tr><td>Circumference = 2πr = πd</td><td>Area = πr²</td></tr>
</table>
<ul>
  <li><strong>Arc length</strong> = (central angle / 360) × circumference.</li>
  <li><strong>Sector area</strong> = (central angle / 360) × area.</li>
  <li>An <strong>inscribed</strong> angle is half the central angle subtending the same arc. An angle inscribed in a semicircle is always <strong>90°</strong>.</li>
</ul>
<p>Circle inscribed in a square: the circle's <em>diameter</em> = the square's <em>side</em>.
Square inscribed in a circle: the square's <em>diagonal</em> = the circle's <em>diameter</em>. Sketch it
and the relationship is obvious; assume it and you'll get it backwards.</p>

<h2>Coordinate geometry</h2>
<ul>
  <li><strong>Slope = (y₂ − y₁)/(x₂ − x₁)</strong>: rise over run.</li>
  <li>Line: y = mx + b (m = slope, b = y-intercept).</li>
  <li><strong>Parallel</strong> lines have equal slopes. <strong>Perpendicular</strong> slopes are <em>negative reciprocals</em> (m and −1/m).</li>
  <li><strong>Distance</strong> between points = √[(x₂−x₁)² + (y₂−y₁)²]. That's just the Pythagorean theorem.</li>
  <li><strong>Midpoint</strong> = the average of the coordinates.</li>
</ul>

<h2>Solids</h2>
<ul>
  <li>Rectangular box: volume = lwh; surface area = 2(lw + lh + wh).</li>
  <li>Cylinder: volume = πr²h; surface area = 2πr² + 2πrh.</li>
  <li>Cube: volume = s³. Its <em>space diagonal</em> = s√3.</li>
</ul>

<h2>The habits that win geometry points</h2>
<ol>
  <li><strong>Redraw the figure yourself</strong>, especially if it isn't to scale. Draw it to scale and the answer often becomes visible.</li>
  <li><strong>Label everything you know</strong>, then look for what that unlocks.</li>
  <li><strong>Look for the hidden right triangle.</strong> Most GRE geometry reduces to one.</li>
  <li><strong>Estimate.</strong> If a computed area comes out negative or absurdly large, you've erred.</li>
</ol>

<h2>What you must remember</h2>
<ul>
  <li><strong>Figures aren't to scale</strong> (except coordinate planes and number lines).</li>
  <li>Triangle inequality: |a − b| < c < a + b, strictly. Bigger angle faces bigger side.</li>
  <li>Square: area = d²/2. Polygon angles: (n − 2)180.</li>
  <li>Perpendicular slopes are negative reciprocals. Angle in a semicircle = 90°.</li>
</ul>`,
  quiz: [
    { text: "Two sides of a triangle are 5 and 8. Which could be the third side?",
      choices: ["3", "2", "10", "13"],
      answer: 2,
      expl: "Two sides pin the third into a strict window.<br>Upper bound: less than the sum &rarr; s &lt; 8 + 5 = 13.<br>Lower bound: greater than the difference &rarr; s &gt; 8 &minus; 5 = 3.<br>So <strong>3 &lt; s &lt; 13</strong>, strictly.<br>2 is too small, and 3 and 13 sit exactly on the boundary, so both are out.<br>Only <strong>10</strong> lands inside.<br><em>The trap:</em> the endpoint values &mdash; a third side of exactly 3 or 13 flattens the triangle into a straight segment.<br><em>Fast method:</em> the third side lives strictly between the difference and the sum of the other two. Target: ~15 seconds." },
    { text: "A square has a diagonal of length 10. What is its area?",
      choices: ["25", "50", "100", "100√2"],
      answer: 1,
      expl: "You can go the long way or use the diagonal formula.<br>Long way: d = s&radic;2 &rarr; s = 10/&radic;2 &rarr; s&sup2; = 100/2 = 50.<br>Shortcut: <strong>area = d&sup2;/2 = 100/2 = 50</strong>.<br><em>The trap:</em> treating 10 as the side gives 100; halving the diagonal first and then squaring gives 25.<br><em>Fast method:</em> for any square, area = d&sup2;/2 &mdash; never solve for the side. Target: ~10 seconds." },
    { text: "A figure in a GRE problem is not marked 'drawn to scale.' What may you assume?",
      choices: [
        "That it is accurate anyway",
        "Nothing about lengths or angles that isn't explicitly stated",
        "That all angles shown as right angles are right angles",
        "That the figure is symmetric"],
      answer: 1,
      expl: "This is a rules question, so recall the convention exactly.<br>Unless a figure says it is drawn to scale, the picture may be deliberately distorted.<br>A right-looking angle is 90&deg; only if it is <strong>marked</strong> 90&deg;.<br>So you may assume <strong>nothing about lengths or angles that isn't explicitly stated</strong>.<br>Coordinate planes and number lines are the only to-scale exceptions.<br><em>The trap:</em> assuming right angles or symmetry because the drawing looks that way &mdash; that look is precisely what the distortion buys.<br><em>Fast method:</em> trust the labels, never the drawing. Target: ~10 seconds." },
    { text: "What is the sum of the interior angles of a pentagon?",
      choices: ["360°", "450°", "540°", "720°"],
      answer: 2,
      expl: "Use the polygon angle-sum formula instead of chopping the shape into triangles.<br>Sum = (n &minus; 2) &times; 180&deg;.<br>Pentagon: n = 5 &rarr; (5 &minus; 2) &times; 180&deg; = 3 &times; 180&deg; = <strong>540&deg;</strong>.<br><em>The trap:</em> 360&deg; is the sum of the <em>exterior</em> angles, which is 360&deg; for every polygon; 720&deg; is the hexagon.<br><em>Fast method:</em> (n &minus; 2) &times; 180&deg; for interior angles; exterior angles always total 360&deg;. Target: ~10 seconds." },
    { text: "Two lines are perpendicular. If one has slope 3, what is the other's slope?",
      choices: ["3", "−3", "1/3", "−1/3"],
      answer: 3,
      expl: "Perpendicular means flip <em>and</em> negate &mdash; two operations, not one.<br>Start: m = 3.<br>Reciprocal: 1/3.<br>Negate: <strong>&minus;1/3</strong>.<br>Check: 3 &times; (&minus;1/3) = &minus;1, which is the test for perpendicularity.<br><em>The trap:</em> doing only half the job &mdash; &minus;3 negates without flipping, and 1/3 flips without negating.<br><em>Fast method:</em> perpendicular slopes multiply to &minus;1. Target: ~10 seconds." },
    { text: "In a triangle with angles 50°, 60°, and 70°, which side is longest?",
      choices: [
        "The side opposite the 50° angle",
        "The side opposite the 60° angle",
        "The side opposite the 70° angle",
        "They are all equal"],
      answer: 2,
      expl: "No computation needed &mdash; this is pure ordering.<br>In any triangle, the bigger angle faces the bigger side.<br>The largest angle here is 70&deg;.<br>So the longest side is the one <strong>opposite the 70&deg; angle</strong>.<br><em>The trap:</em> pairing the smallest angle, 50&deg;, with the longest side by reading the rule backwards.<br><em>Fast method:</em> rank the angles, and the opposite sides rank in the same order. Target: ~10 seconds." },
    { text: "A circle has circumference 12π. What is its area?",
      choices: ["36π", "24π", "144π", "12π"],
      answer: 0,
      expl: "Circumference and area don't convert directly &mdash; route through the radius.<br>2&pi;r = 12&pi; &rarr; r = 6.<br>Area = &pi;r&sup2; = &pi;(36) = <strong>36&pi;</strong>.<br><em>The trap:</em> reusing 12 as the radius gives 144&pi;; leaving the answer as 12&pi; just copies the circumference across.<br><em>Fast method:</em> every circle question runs circumference &rarr; r &rarr; area. Target: ~15 seconds." },
    { text: "Which two are true about a 30-60-90 triangle? (Select TWO.)",
      choices: [
        "Its sides are in the ratio x : x√3 : 2x",
        "Its sides are in the ratio x : x : x√2",
        "The shortest side is opposite the 30° angle",
        "The hypotenuse is opposite the 60° angle",
        "All sides are equal"],
      answer: [0, 2],
      expl: "Separate the two special right triangles, then place the sides.<br>30-60-90 sides are <strong>x : x&radic;3 : 2x</strong> &mdash; first true statement.<br>The short leg x faces the smallest angle, 30&deg; &mdash; second true statement.<br>The hypotenuse 2x faces the 90&deg;, not the 60&deg;.<br><em>The trap:</em> the x : x : x&radic;2 ratio, which belongs to the 45-45-90 triangle; and \"all sides equal\" describes an equilateral triangle.<br><em>Fast method:</em> 30-60-90 is 1 : &radic;3 : 2, and each side faces its own angle in size order. Target: ~20 seconds." }
  ]
},

/* ================= MODULE 13 ================= */
{
  id: "gm4_2", title: "Data Analysis, Counting, and Probability", minutes: 15, level: "advanced",
  content: `
<p>This is where the GRE's "data analysis" label lives: statistics, sets, counting, and probability.</p>

<h2>The statistics you need</h2>
<ul>
  <li><strong>Mean</strong> = sum ÷ count.</li>
  <li><strong>Median</strong> = the middle value when sorted. With an even count, average the two middle values. <em>Always sort first.</em></li>
  <li><strong>Mode</strong> = most frequent value.</li>
  <li><strong>Range</strong> = max − min.</li>
  <li><strong>Standard deviation</strong> = how spread out the values are.</li>
</ul>
<div class="keybox"><strong>You will essentially never compute a standard deviation.</strong> You'll compare
spreads. Key facts: identical values → SD = <strong>0</strong>. Adding the same constant to every value
leaves SD <strong>unchanged</strong> (the spread doesn't move). Multiplying every value by k multiplies SD
by |k|.</div>

<h3>Mean vs median: the concept the GRE loves</h3>
<p>The <strong>mean is dragged by outliers; the median is not.</strong> In a set of salaries where one
person earns $10 million, the mean is meaningless and the median tells the truth.</p>
<p>In an <strong>evenly spaced</strong> set, mean = median. If a question tells you the mean but asks about
the median (or vice versa), the answer is usually "cannot be determined": they're independent unless the
set is symmetric.</p>

<h3>Normal distribution</h3>
<p>The GRE tests one fact: in a normal distribution, about <strong>68%</strong> of values fall within 1
standard deviation of the mean, <strong>95%</strong> within 2, and <strong>99.7%</strong> within 3. The
distribution is symmetric, so half of each tail is on each side.</p>

<h2>Counting</h2>
<table>
  <tr><th></th><th>Use when</th><th>Formula</th></tr>
  <tr><td><strong>Permutation</strong></td><td>Order <em>matters</em> (rankings, arrangements, seat orders)</td><td>nPr = n!/(n−r)!</td></tr>
  <tr><td><strong>Combination</strong></td><td>Order does <em>not</em> matter (committees, groups, handshakes)</td><td>nCr = n!/[r!(n−r)!]</td></tr>
</table>
<p><strong>Ask yourself: would swapping two selections create a different outcome?</strong> If yes,
permutation. If no, combination.</p>
<div class="worked"><h4>How many 2-person committees can be formed from 6 people?</h4>
<p>Order doesn't matter (a committee of {Ann, Bob} = {Bob, Ann}), so it's a combination:
C(6,2) = (6 × 5)/2 = <strong>15</strong>.</p>
<p>The trap answer is 30. That's the <em>permutation</em>, counting each pair twice.</p></div>
<p><strong>Repeated letters:</strong> the arrangements of LEVEL = 5!/(2!·2!) = 120/4 = <strong>30</strong>
(L twice, E twice). Divide by the factorial of each repetition.</p>

<h2>Probability</h2>
<p><strong>P = favorable outcomes ÷ total outcomes.</strong> Always between 0 and 1.</p>
<ul>
  <li><strong>AND → multiply</strong> (both events happen).</li>
  <li><strong>OR → add</strong> (for mutually exclusive events), then subtract any overlap.</li>
  <li><strong>"At least one" → use the complement:</strong> P(at least one) = 1 − P(none).</li>
</ul>
<div class="worked"><h4>A fair coin is flipped 3 times. P(at least one head)?</h4>
<p>Directly: messy. By complement: P(no heads) = (1/2)³ = 1/8. So P(at least one) = 1 − 1/8 =
<strong>7/8</strong>.</p>
<p><em>Any time you see "at least," reach for the complement.</em></p></div>
<div class="worked"><h4>A bag has 3 red and 2 blue marbles. Two are drawn without replacement. P(both red)?</h4>
<p>First draw: 3/5. Second draw: now only 4 marbles remain and 2 are red → 2/4.</p>
<p>P = (3/5)(2/4) = 6/20 = <strong>3/10</strong>. <em>Without replacement means updating both the numerator
and the denominator.</em></p></div>

<h2>Sets</h2>
<p>|A ∪ B| = |A| + |B| − |A ∩ B|. For "neither" problems, draw a 2×2 table: it's faster and less
error-prone than any formula.</p>

<h2>What you must remember</h2>
<ul>
  <li>Sort before finding the median. Mean is dragged by outliers; median isn't.</li>
  <li>SD = 0 when all values are identical. Adding a constant doesn't change SD.</li>
  <li>Committee = combination. Ranking/arrangement = permutation. Divide out repeats.</li>
  <li><strong>"At least one" → 1 − P(none).</strong> Without replacement → update both numbers.</li>
</ul>`,
  quiz: [
    { text: "A committee of 3 is chosen from 7 people. How many different committees are possible?",
      choices: ["21", "35", "210", "343"],
      answer: 1,
      expl: "Settle order-matters first, then compute.<br>Swapping two members gives the same committee &rarr; order doesn't matter &rarr; combination.<br>C(7,3) = (7 &times; 6 &times; 5)/(3 &times; 2 &times; 1) = 210/6 = <strong>35</strong>.<br><em>The trap:</em> 210 is the permutation 7 &times; 6 &times; 5, which counts each committee 3! = 6 times; 343 is 7&sup3;.<br><em>Fast method:</em> committee = combination &mdash; multiply down r factors, then divide by r!. Target: ~20 seconds." },
    { text: "A fair coin is flipped 3 times. What is the probability of getting at least one head?",
      choices: ["1/2", "3/8", "7/8", "1/8"],
      answer: 2,
      expl: "\"At least one\" is the signal to go through the complement.<br>The opposite of at least one head is zero heads, i.e. all tails.<br>P(all tails) = (1/2)&sup3; = 1/8.<br>P(at least one head) = <strong>1 &minus; 1/8 = 7/8</strong>.<br><em>The trap:</em> 1/8 is the complement itself &mdash; the number you computed but forgot to subtract; 3/8 counts exactly one head.<br><em>Fast method:</em> see \"at least one,\" compute 1 &minus; P(none). Target: ~15 seconds." },
    { text: "A set consists of five identical values. What is its standard deviation?",
      choices: ["0", "1", "Equal to the mean", "Cannot be determined"],
      answer: 0,
      expl: "Ask what standard deviation actually measures: distance from the mean.<br>All five values are identical, so each one equals the mean.<br>Every deviation is 0, so the spread is 0 &rarr; SD = <strong>0</strong>.<br><em>The trap:</em> answering \"cannot be determined\" because no actual numbers were given. You don't need them &mdash; zero spread is zero spread whatever the repeated value is.<br><em>Fast method:</em> no variation, no deviation &mdash; identical values give SD = 0. Target: ~10 seconds." },
    { text: "A bag has 3 red and 2 blue marbles. Two are drawn without replacement. What is P(both red)?",
      choices: ["9/25", "3/10", "1/2", "6/25"],
      answer: 1,
      expl: "Without replacement, the bag changes between draws.<br>First draw red: 3 red out of 5 total = 3/5.<br>Now 2 red remain out of 4 total &rarr; 2/4.<br>Both must happen, so multiply: (3/5)(2/4) = 6/20 = <strong>3/10</strong>.<br><em>The trap:</em> 9/25 comes from squaring 3/5, which treats the draws as <em>with</em> replacement and ignores the marble you removed.<br><em>Fast method:</em> without replacement, drop 1 from the top and 1 from the bottom on each draw. Target: ~20 seconds." },
    { text: "If a constant is added to every value in a data set, what happens to the standard deviation?",
      choices: [
        "It increases by that constant",
        "It stays the same",
        "It doubles",
        "It becomes zero"],
      answer: 1,
      expl: "Picture the values sliding along a number line.<br>Add the same constant to each value and the mean shifts by that same constant.<br>So every distance from the mean is exactly what it was before.<br>Spread unchanged &rarr; the standard deviation <strong>stays the same</strong>.<br><em>The trap:</em> assuming SD rises by the constant &mdash; that confuses <em>location</em> with <em>spread</em>.<br><em>Fast method:</em> shifting never changes SD; only multiplying does, scaling it by |k|. Target: ~10 seconds." },
    { text: "How many distinct arrangements exist of the letters in LEVEL?",
      choices: ["120", "60", "30", "20"],
      answer: 2,
      expl: "Arrange 5 slots, then cancel the indistinguishable duplicates.<br>Five letters in a row: 5! = 120.<br>L appears twice &rarr; divide by 2!. E appears twice &rarr; divide by 2! again.<br>120/(2 &times; 2) = <strong>30</strong>.<br><em>The trap:</em> 120 ignores the repeats entirely; 60 divides for only one of the two repeated letters.<br><em>Fast method:</em> n! divided by the factorial of every repeat count. Target: ~20 seconds." },
    { text: "In a set of salaries where one executive earns far more than everyone else, which measure better represents a typical salary?",
      choices: ["The mean", "The median", "The mode", "The range"],
      answer: 1,
      expl: "Ask which measure a single extreme value can move.<br>The mean sums every salary, so one enormous figure pulls it far above almost everyone in the set.<br>The median depends only on position in the sorted list, so an outlier barely moves it.<br>The typical salary is therefore best captured by the <strong>median</strong>.<br><em>The trap:</em> reaching for the mean out of habit &mdash; that is exactly the number the outlier distorts.<br><em>Fast method:</em> skewed data or a visible outlier &rarr; report the median. Target: ~10 seconds." },
    { text: "Which two situations call for a combination rather than a permutation? (Select TWO.)",
      choices: [
        "Selecting a 3-person committee from a group",
        "Awarding gold, silver, and bronze medals",
        "Choosing 2 toppings from a list of 8",
        "Arranging 5 books in order on a shelf",
        "Determining a race finishing order"],
      answer: [0, 2],
      expl: "Test each option with one question: would swapping two picks change the outcome?<br>3-person committee: swapping two members leaves the same committee &rarr; <strong>combination</strong>.<br>2 toppings from 8: pepperoni-then-olive equals olive-then-pepperoni &rarr; <strong>combination</strong>.<br>Gold/silver/bronze, books in shelf order, and race finishing order all change when you swap two items &rarr; permutations.<br><em>The trap:</em> reading the word \"choosing\" as automatically meaning combination &mdash; medals are chosen too, but they are ranked.<br><em>Fast method:</em> swap two selections; if nothing changes, it's a combination. Target: ~20 seconds." }
  ]
},

/* ================= MODULE 14 ================= */
{
  id: "gm4_3", title: "Data Interpretation", minutes: 11, level: "core",
  content: `
<p>Data Interpretation gives you charts and tables followed by several questions. The math is easy. The
errors are almost never mathematical: they're <em>reading</em> errors.</p>

<h2>Spend 20–30 seconds on the chart BEFORE question 1</h2>
<p>Read, in this order:</p>
<ol>
  <li><strong>The title.</strong> What is this actually measuring?</li>
  <li><strong>The units.</strong> Thousands? Millions? Percentages? Dollars?</li>
  <li><strong>The axes and the scale.</strong> Does the y-axis start at zero, or is it truncated (which exaggerates differences)?</li>
  <li><strong>The legend.</strong> Which series is which?</li>
  <li><strong>Any footnotes.</strong> They exist to be tested.</li>
</ol>
<div class="warnbox"><strong>The classic DI trap:</strong> the chart is in <em>thousands</em> and the answer
choices are in <em>units</em>, or the question asks about a <em>different year</em> than the one your eye
lands on. You'll do the arithmetic perfectly and still get it wrong.</div>

<h2>The percent traps, again</h2>
<p>DI questions are built on percent language. Get these straight:</p>
<ul>
  <li>"A is what <strong>percent of</strong> B" → A/B</li>
  <li>"A is what <strong>percent greater than</strong> B" → (A − B)/B</li>
  <li>"<strong>Percent increase</strong> from B to A" → (A − B)/B, <em>always divide by the original</em></li>
</ul>
<p>If a value goes from 50 to 200: it is <strong>400% of</strong> the original, but a <strong>300%
increase</strong>. Both appear as choices.</p>

<h2>Ratios beat raw heights</h2>
<div class="worked"><h4>Which quarter had the highest profit margin?</h4>
<table>
  <tr><th>Quarter</th><th>Revenue</th><th>Profit</th><th>Margin</th></tr>
  <tr><td>Q1</td><td>50</td><td>5</td><td>10%</td></tr>
  <tr><td>Q2</td><td>60</td><td>9</td><td>15%</td></tr>
  <tr><td>Q3</td><td>80</td><td>16</td><td><strong>20%</strong></td></tr>
  <tr><td>Q4</td><td>90</td><td>17</td><td>18.9%</td></tr>
</table>
<p>The <em>tallest profit bar</em> is Q4, and Q4 is wrong. The best <em>margin</em> is Q3. Whenever a
question asks about a rate, ratio, or percentage, you must divide; you cannot eyeball bar heights.</p></div>

<h2>Estimate first</h2>
<p>DI answer choices are usually spread far apart. If the choices are 18%, 22%, 25%, 29%, 33%, you don't
need three decimal places. You need to know it's "about a fifth." Estimating cuts your time in half and
your error rate along with it.</p>
<p><strong>Useful approximations:</strong> 1/3 ≈ 33%, 1/4 = 25%, 1/5 = 20%, 1/6 ≈ 17%, 1/8 = 12.5%.</p>

<h2>Reading the chart types</h2>
<ul>
  <li><strong>Bar charts</strong>: compare magnitudes. Check whether bars are grouped (side by side) or stacked (cumulative). In a stacked bar, a segment's value is its <em>height</em>, not its top edge.</li>
  <li><strong>Line graphs</strong>: show change over time. The <em>steepness</em> is the rate of change; a rising line with decreasing slope still means growth, just slower growth.</li>
  <li><strong>Pie charts</strong>: parts of a whole. Percentages must sum to 100%. Central angle = (percent × 360°).</li>
  <li><strong>Tables</strong>: exact values. Take them from the right row <em>and</em> the right column.</li>
</ul>

<h2>Calculator discipline</h2>
<p>You have an on-screen calculator in Quant. It is <em>slow</em>. Use it for genuinely ugly arithmetic: 
not for 20% of 60. And beware order-of-operations errors when typing long expressions; break them into
steps.</p>

<h2>What you must remember</h2>
<ul>
  <li>Read title, units, scale, legend, and footnotes <em>before</em> question 1.</li>
  <li>"Percent of" ≠ "percent greater than." Percent change divides by the original.</li>
  <li>Rates and margins require division, never compare bar heights directly.</li>
  <li>Estimate. The choices are far apart on purpose.</li>
</ul>`,
  quiz: [
    { text: "A value increases from 50 to 200. Which statement is correct?",
      choices: [
        "It increased by 400%",
        "It increased by 300% and is 400% of the original",
        "It increased by 150%",
        "It is 300% of the original"],
      answer: 1,
      expl: "Two different percent questions hide in here, so compute both.<br>Percent increase = change &divide; original = (200 &minus; 50)/50 = 150/50 = 3 = <strong>300% increase</strong>.<br>Percent of = new &divide; original = 200/50 = 4 = <strong>400% of</strong> the original.<br>The correct statement is the one pairing them: 300% increase and 400% of the original.<br><em>The trap:</em> \"increased by 400%\" swaps the two figures; 150% reads the ratio 150/100 as the answer.<br><em>Fast method:</em> \"of\" uses new/original, \"increase\" uses change/original &mdash; always divide by the original. Target: ~20 seconds." },
    { text: "A bar chart shows Q4 with the tallest profit bar. The question asks which quarter had the highest profit MARGIN. What must you do?",
      choices: [
        "Select Q4, since its bar is tallest",
        "Divide each quarter's profit by its revenue and compare the ratios",
        "Select the quarter with the highest revenue",
        "Add the profits together"],
      answer: 1,
      expl: "Notice the word \"margin\" &mdash; that names a ratio, not a height.<br>Margin = profit &divide; revenue, so both numbers matter.<br>The tallest profit bar can sit on the largest revenue and still lose on the ratio.<br>So you must <strong>divide each quarter's profit by its revenue and compare the ratios</strong>.<br><em>The trap:</em> picking the quarter with the tallest profit bar &mdash; that answers \"largest profit,\" a different question. Choosing the highest revenue is the same error inverted.<br><em>Fast method:</em> the words rate, margin, per, or share always mean divide before comparing. Target: ~15 seconds." },
    { text: "What should you do BEFORE answering the first question in a Data Interpretation set?",
      choices: [
        "Start calculating immediately to save time",
        "Read the title, units, axis scales, legend, and any footnotes",
        "Read all the answer choices",
        "Skip the chart and read only the questions"],
      answer: 1,
      expl: "Ask where Data Interpretation points are actually lost.<br>The arithmetic is easy; the misreads are what cost you &mdash; wrong units, wrong year, truncated axis, unread footnote.<br>So the first move is to <strong>read the title, units, axis scales, legend, and any footnotes</strong>.<br>Twenty seconds spent once covers every question in the set.<br><em>The trap:</em> starting to calculate immediately \"to save time\" &mdash; you then compute flawlessly off the wrong row.<br><em>Fast method:</em> orient to the chart once, then answer; never re-read the chart question by question. Target: ~10 seconds." },
    { text: "A chart is labeled 'in thousands' and shows a bar at 45. What is the actual value?",
      choices: ["45", "450", "4,500", "45,000"],
      answer: 3,
      expl: "The axis label carries a multiplier, so apply it.<br>The bar reads 45 and the chart is labeled in thousands.<br>45 &times; 1,000 = <strong>45,000</strong>.<br><em>The trap:</em> answering 45, the bare number your eye lifts off the axis; 450 and 4,500 come from multiplying by 10 or 100 instead of 1,000.<br><em>Fast method:</em> read the units line before the bar, then apply the multiplier once. Target: ~10 seconds." },
    { text: "In a pie chart, a category represents 25% of the total. What is its central angle?",
      choices: ["25°", "45°", "90°", "125°"],
      answer: 2,
      expl: "A pie chart is one full circle divided by percentage.<br>The whole circle is 360&deg;.<br>Central angle = percent &times; 360&deg; = 0.25 &times; 360&deg; = <strong>90&deg;</strong>.<br>Sanity check: a quarter of a pie is a right angle, which matches.<br><em>The trap:</em> answering 25&deg;, which copies the percent straight across as though degrees and percents were the same unit.<br><em>Fast method:</em> multiply the share by 360. Target: ~10 seconds." },
    { text: "Why is estimation particularly effective on Data Interpretation questions?",
      choices: [
        "The answer choices are usually spread far apart",
        "Precision is not required for any GRE question",
        "The calculator is unavailable",
        "The charts are inaccurate"],
      answer: 0,
      expl: "Think about why estimating is safe on this question type in particular.<br>Chart readings are approximate to begin with, and DI <strong>answer choices are usually spread far apart</strong>.<br>If the options are 18%, 22%, 25%, 29%, 33%, knowing you are near \"a fifth\" is enough to land on 20-ish.<br>So estimation costs almost no accuracy and saves large amounts of time.<br><em>The trap:</em> the claim that precision is never needed on the GRE &mdash; plenty of quant questions demand exact values; DI usually just doesn't.<br><em>Fast method:</em> estimate first, refine only if two choices stay in contention. Target: ~15 seconds." },
    { text: "Which two are true about the on-screen calculator? (Select TWO.)",
      choices: [
        "It is available in the Quantitative sections",
        "It is available in the Verbal sections",
        "It is slow, and should be reserved for genuinely difficult arithmetic",
        "It automatically prevents order-of-operations errors",
        "It is required for every quant question"],
      answer: [0, 2],
      expl: "Check each claim against how the calculator actually behaves.<br>It appears in the <strong>Quantitative sections only</strong> &mdash; Verbal has none. First true statement.<br>It is clunky and slow, so it belongs on <strong>genuinely ugly arithmetic</strong>, not on 20% of 60. Second true statement.<br>It does not repair your thinking: it will execute a mistyped expression exactly as typed, order-of-operations errors included.<br><em>The trap:</em> believing it is required on every quant question &mdash; most quant is faster by hand.<br><em>Fast method:</em> calculator for ugly division and roots, mental math for everything else. Target: ~20 seconds." }
  ]
},

/* ================= MODULE 15 ================= */
{
  id: "gm4_4", title: "Quantitative Comparison, The GRE's Signature Question", minutes: 14, level: "advanced",
  content: `
<p>Quantitative Comparison (QC) is roughly a third of the Quant section and exists nowhere else. You're
given Quantity A and Quantity B and must choose:</p>
<table>
  <tr><td><strong>(A)</strong></td><td>Quantity A is greater</td></tr>
  <tr><td><strong>(B)</strong></td><td>Quantity B is greater</td></tr>
  <tr><td><strong>(C)</strong></td><td>The two quantities are equal</td></tr>
  <tr><td><strong>(D)</strong></td><td>The relationship cannot be determined from the information given</td></tr>
</table>
<div class="keybox"><strong>The choices never change.</strong> You are not solving for a value. You are
determining a <em>relationship</em>. Frequently you can answer without computing anything at all.</div>

<h2>The two rules that decide most QC questions</h2>
<div class="exambox">
<p><strong>Rule 1: If both quantities are specific numbers, (D) is IMPOSSIBLE.</strong> Two known numbers
always have a determinable relationship. So if there are no variables anywhere, cross out (D) immediately: 
you've improved your guess from 25% to 33% for free.</p>
<p><strong>Rule 2: If two different test cases give two different relationships, the answer is (D).</strong>
Stop instantly. You don't need a third case.</p>
</div>

<h2>The strategy: simplify, then test</h2>
<h3>Step 1: Simplify both sides</h3>
<p>You may safely do to <em>both</em> quantities:</p>
<ul>
  <li>Add or subtract the same thing</li>
  <li>Multiply or divide by the same <strong>positive</strong> number</li>
</ul>
<p><strong>You may NOT</strong> multiply or divide by a variable whose sign you don't know (it might be
negative, which flips the comparison), and you may not square both sides carelessly.</p>
<div class="worked"><h4>Quantity A: x + 5 · Quantity B: x − 5</h4>
<p>Subtract x from both: compare 5 with −5. <strong>(A)</strong>, for every possible x. No cases needed.</p></div>

<h3>Step 2, If variables remain, test strategic numbers</h3>
<p>Do not test random values. Test the ones that <em>break</em> things:</p>
<table>
  <tr><th>Test</th><th>Why</th></tr>
  <tr><td><strong>0</strong></td><td>Kills products; makes things equal</td></tr>
  <tr><td><strong>1</strong></td><td>The multiplicative identity; x² = x here</td></tr>
  <tr><td><strong>A fraction (0.5)</strong></td><td>Squaring shrinks it: reverses your intuition</td></tr>
  <tr><td><strong>A negative (−2)</strong></td><td>Flips signs and inequalities</td></tr>
  <tr><td><strong>A large number (100)</strong></td><td>Reveals growth-rate differences</td></tr>
</table>
<p>Mnemonic: <strong>ZONE F</strong>: Zero, One, Negative, Extreme, Fraction.</p>
<div class="worked"><h4>x is a number. Quantity A: x² · Quantity B: x</h4>
<p>x = 2 → 4 vs 2 → A is greater.<br>
x = 0.5 → 0.25 vs 0.5 → B is greater.</p>
<p>Two different relationships → <strong>(D)</strong>. Notice that if the problem had said "x > 1," the
answer would be (A). The constraint is everything.</p></div>

<h2>Read the constraint like a hawk</h2>
<p>QC problems live or die on the given information. "x > 1," "x is an integer," "x is positive": each of
these eliminates entire families of test cases. <strong>Always ask: what values am I actually allowed to
try?</strong></p>

<h2>The equality trap</h2>
<div class="worked"><h4>x > 0. Quantity A: x + 1/x · Quantity B: 2</h4>
<p>x = 2 → 2.5 vs 2 → A greater. x = 3 → 3.33 vs 2 → A greater. Tempting to pick (A).</p>
<p>But <strong>x = 1</strong> → 1 + 1 = 2 → <strong>equal</strong>.</p>
<p>Since A can be greater <em>and</em> they can be equal, the relationship isn't fixed → <strong>(D)</strong>.</p>
<p><strong>The lesson:</strong> "≥ with equality possible" means (D), not (A). Always test the boundary
case that makes them equal.</p></div>

<h2>Don't over-compute</h2>
<p>QC rewards laziness. Comparing 20π to 60? Divide both by 20: compare π to 3. π > 3 → (A). Done. You
never needed a decimal.</p>
<p>Comparing 3⁴⁰ to 9¹⁹? Rewrite in a common base: 9¹⁹ = 3³⁸ < 3⁴⁰ → (A). No exponent was ever evaluated.</p>

<h2>What you must remember</h2>
<ul>
  <li>Two specific numbers → <strong>(D) is impossible.</strong></li>
  <li>Two different results from two test cases → <strong>(D), immediately.</strong></li>
  <li>Test <strong>ZONE F</strong>: Zero, One, Negative, Extreme, Fraction.</li>
  <li>Always test the case that produces <em>equality</em>. That's how (A) becomes (D).</li>
  <li>Simplify both sides before computing. Never multiply by a variable of unknown sign.</li>
</ul>`,
  quiz: [
    { text: "Quantity A: 25% of 80. Quantity B: 80% of 25. What is the relationship?",
      choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
      answer: 2,
      expl: "Before computing, note that both quantities are specific numbers, so (D) is off the table.<br>Quantity A: 25% of 80 = (25 &times; 80)/100 = 20.<br>Quantity B: 80% of 25 = (80 &times; 25)/100 = 20.<br>Same product over the same denominator &rarr; <strong>the quantities are equal, (C)</strong>.<br><em>The trap:</em> assuming the larger percent wins and choosing (B). a% of b always equals b% of a.<br><em>Fast method:</em> percent-of is commutative, and with no variables anywhere (D) is impossible. Target: ~15 seconds." },
    { text: "Both quantities in a QC question are specific numbers with no variables. Which answer can be immediately eliminated?",
      choices: ["A", "B", "C", "D"],
      answer: 3,
      expl: "Ask what could ever make a relationship unknowable.<br>Only variables can: different allowed values could produce different comparisons.<br>With no variables, both quantities are fixed numbers, and two fixed numbers always compare in exactly one way.<br>So <strong>(D), the cannot-be-determined choice, is impossible</strong> and should be crossed out on sight.<br><em>The trap:</em> eliminating (C) instead &mdash; equality is entirely possible between two specific numbers, and the GRE builds questions around exactly that.<br><em>Fast method:</em> no variables &rarr; strike (D), and your guess improves from 25% to 33%. Target: ~10 seconds." },
    { text: "x is a number. Quantity A: x². Quantity B: x. What is the relationship?",
      choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
      answer: 3,
      expl: "x is unconstrained, so hunt for two cases that disagree.<br>x = 2 &rarr; 4 vs 2 &rarr; Quantity A is greater.<br>x = 0.5 &rarr; 0.25 vs 0.5 &rarr; Quantity B is greater.<br>Two different relationships &rarr; <strong>(D)</strong>. Stop there; a third case adds nothing.<br><em>The trap:</em> testing only integers of 2 or more and confidently picking (A). Squaring a fraction between 0 and 1 shrinks it, which is exactly what the fraction test exists to catch.<br><em>Fast method:</em> unconstrained variable &rarr; run ZONE F until two cases conflict, then answer (D). Target: ~20 seconds." },
    { text: "Given x > 0, Quantity A: x + 1/x, Quantity B: 2. What is the relationship?",
      choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
      answer: 3,
      expl: "The constraint x &gt; 0 kills negatives, so probe for the equality case instead.<br>x = 2 &rarr; 2 + 0.5 = 2.5 &gt; 2 &rarr; A greater.<br>x = 3 &rarr; about 3.33 &gt; 2 &rarr; A greater again.<br>x = 1 &rarr; 1 + 1 = 2 &rarr; <strong>exactly equal</strong>.<br>Greater and equal are both possible, so no single relationship holds &rarr; <strong>(D)</strong>.<br><em>The trap:</em> picking (A) after two confirming cases. QC asks whether the relationship is <em>always</em> the same, and one tie destroys it.<br><em>Fast method:</em> always test the value that forces equality &mdash; usually x = 1. Target: ~30 seconds." },
    { text: "Which set of test values is MOST useful in Quantitative Comparison?",
      choices: [
        "Only positive integers",
        "Zero, one, a negative, a fraction between 0 and 1, and a large number",
        "Only numbers greater than 10",
        "Random values"],
      answer: 1,
      expl: "The point of test values isn't coverage, it's breaking your own assumption.<br>Zero kills products and forces ties. One makes x&sup2; = x. A fraction between 0 and 1 shrinks when squared. A negative flips signs and inequalities. A large number exposes growth-rate gaps.<br>That's <strong>ZONE F: Zero, One, Negative, Extreme, Fraction</strong>.<br><em>The trap:</em> restricting yourself to positive integers &mdash; exactly the family that hides fraction and negative behavior and turns a true (D) into a false (A).<br><em>Fast method:</em> run ZONE F and stop the moment two cases disagree. Target: ~15 seconds." },
    { text: "Which operation is NOT safe to perform on both quantities in a QC question?",
      choices: [
        "Adding the same number to both",
        "Subtracting the same number from both",
        "Multiplying both by a variable whose sign is unknown",
        "Dividing both by 3"],
      answer: 2,
      expl: "Ask which operations preserve the direction of a comparison.<br>Adding or subtracting the same number from both: always safe.<br>Dividing both by 3, a known positive: safe.<br><strong>Multiplying both by a variable of unknown sign: unsafe</strong> &mdash; if it is negative the comparison flips, and if it is zero both sides collapse to 0.<br><em>The trap:</em> treating variable multiplication like ordinary equation-solving. In QC you are comparing, not solving, so direction matters.<br><em>Fast method:</em> only multiply or divide both quantities by something you know is positive. Target: ~15 seconds." },
    { text: "Quantity A: 20π. Quantity B: 60. What is the fastest approach?",
      choices: [
        "Compute 20π to three decimal places",
        "Divide both by 20 and compare π to 3",
        "Use the calculator",
        "The relationship cannot be determined"],
      answer: 1,
      expl: "Both quantities are specific numbers, so (D) is out, and no decimals are needed either.<br>20 is positive, so you may divide both quantities by 20.<br>Quantity A: 20&pi;/20 = &pi;. Quantity B: 60/20 = 3.<br>&pi; &asymp; 3.14 &gt; 3, so Quantity A is greater &mdash; reached by <strong>dividing both by 20 and comparing &pi; to 3</strong>.<br><em>The trap:</em> computing 20&pi; = 62.83&hellip; on the calculator. It's correct but slower, and QC rewards not computing.<br><em>Fast method:</em> strip the common positive factor off both sides before evaluating anything. Target: ~15 seconds." },
    { text: "Which two facts about QC are correct? (Select TWO.)",
      choices: [
        "If two test cases give different relationships, the answer is (D)",
        "If both quantities are specific numbers, (D) is still possible",
        "You should always test the value that makes the quantities equal",
        "You must always compute exact values",
        "The four answer choices change from question to question"],
      answer: [0, 2],
      expl: "Check each statement against the two governing QC rules.<br>Conflicting results from two test cases prove the relationship isn't fixed &rarr; (D). <strong>True.</strong><br>Testing the value that makes the quantities equal is what converts an apparent (A) into a correct (D). <strong>True.</strong><br>Two specific numbers make (D) <em>impossible</em>, not still possible.<br>Exact values are often unnecessary; simplifying both sides usually settles it.<br>And the four choices are identical on every QC question, which is why you can pre-learn them.<br><em>Fast method:</em> two conflicting cases &rarr; (D); no variables &rarr; never (D). Target: ~20 seconds." }
  ]
}
    ],

/* ================= CHECKPOINT 4 (cumulative) ================= */
    checkpoint: {
      id: "gcp4", title: "Advanced Quant", n: 18,
      questions: [
        { text: "Quantity A: x². Quantity B: x³, where x is negative. What is the relationship?",
          choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
          answer: 0,
          expl: "Signs decide this before any arithmetic.<br>x is negative. An even power of a negative is <strong>positive</strong>, so x&sup2; &gt; 0.<br>An odd power keeps the sign, so x&sup3; &lt; 0.<br>Positive beats negative every time &rarr; <strong>Quantity A is greater, (A)</strong>, for every negative x.<br><em>The trap:</em> choosing (D) because x isn't pinned to one value. The constraint \"x is negative\" locks both signs, and signs are all this comparison needs.<br><em>Fast method:</em> with negatives, compare signs first &mdash; even powers turn positive, odd powers stay negative. Target: ~15 seconds." },
        { text: "Two sides of a triangle are 6 and 10. Which could be the third side?",
          choices: ["4", "5", "16", "3"],
          answer: 1,
          expl: "Bound the third side from both directions.<br>Less than the sum: s &lt; 10 + 6 = 16.<br>Greater than the difference: s &gt; 10 &minus; 6 = 4.<br>So <strong>4 &lt; s &lt; 16</strong>, strictly.<br>3 is too small; 4 and 16 are the excluded endpoints; only <strong>5</strong> fits.<br><em>The trap:</em> the endpoint values &mdash; a third side of exactly 4 or 16 flattens the triangle into a segment.<br><em>Fast method:</em> difference &lt; third side &lt; sum, with the endpoints never allowed. Target: ~15 seconds." },
        { text: "A square has diagonal 8. What is its area?",
          choices: ["16", "32", "64", "32√2"],
          answer: 1,
          expl: "Use the diagonal shortcut instead of solving for the side.<br><strong>Area = d&sup2;/2 = 64/2 = 32.</strong><br>Confirm the long way: s&radic;2 = 8 &rarr; s = 8/&radic;2 = 4&radic;2 &rarr; s&sup2; = 32. Same answer.<br><em>The trap:</em> 64 treats the diagonal as the side; 32&radic;2 leaves a stray &radic;2 from a half-finished substitution.<br><em>Fast method:</em> square the diagonal, then halve it. Target: ~10 seconds." },
        { text: "A committee of 2 is chosen from 6 people. How many committees are possible?",
          choices: ["12", "15", "30", "36"],
          answer: 1,
          expl: "A committee has no order, so this is a combination.<br>C(6,2) = (6 &times; 5)/2 = 30/2 = <strong>15</strong>.<br><em>The trap:</em> 30 is the ordered count 6 &times; 5, which lists {Ann, Bob} and {Bob, Ann} as two different committees; dividing by 2 removes the duplicate.<br><em>Fast method:</em> committee = combination &mdash; multiply down r factors, then divide by r!. Target: ~15 seconds." },
        { text: "A fair die is rolled once. What is the probability of rolling greater than 4?",
          choices: ["1/6", "1/3", "1/2", "2/3"],
          answer: 1,
          expl: "Count the favorable outcomes over the total outcomes.<br>Total faces: 6.<br>\"Greater than 4\" means 5 or 6 &rarr; 2 favorable outcomes.<br>P = 2/6 = <strong>1/3</strong>.<br><em>The trap:</em> including 4 itself gives 3/6 = 1/2. \"Greater than\" is strict; \"at least 4\" would be the phrasing that includes it.<br><em>Fast method:</em> list the actual winning faces, then divide by 6. Target: ~10 seconds." },
        { text: "Which two are true about standard deviation? (Select TWO.)",
          choices: [
            "It is zero when all values are identical",
            "Adding a constant to every value increases it",
            "Adding a constant to every value leaves it unchanged",
            "It measures the mean",
            "It is always greater than the range"],
          answer: [0, 2],
          expl: "Standard deviation measures one thing only: spread around the mean.<br>All values identical &rarr; every deviation is 0 &rarr; <strong>SD = 0</strong>. True.<br>Add a constant to every value &rarr; the mean moves with them and all distances are preserved &rarr; <strong>SD unchanged</strong>. True.<br>So the claim that adding a constant increases SD is the same fact stated backwards.<br>SD doesn't measure the mean, and it is normally smaller than the range, not larger.<br><em>Fast method:</em> shifting leaves SD alone; only multiplying scales it, by |k|. Target: ~20 seconds." },
        { text: "Perpendicular lines have slopes that are:",
          choices: ["Equal", "Negative reciprocals", "Reciprocals", "Both positive"],
          answer: 1,
          expl: "Perpendicular requires two changes to the slope, not one.<br>Flip it: m &rarr; 1/m.<br>Negate it: 1/m &rarr; <strong>&minus;1/m</strong>.<br>So perpendicular slopes are <strong>negative reciprocals</strong>, and m &times; (&minus;1/m) = &minus;1.<br><em>The trap:</em> \"reciprocals\" without the sign flip; and equal slopes describe <em>parallel</em> lines, not perpendicular ones.<br><em>Fast method:</em> perpendicular &rarr; slopes multiply to &minus;1; parallel &rarr; slopes equal. Target: ~10 seconds." },
        { text: "In a QC question, both quantities are specific numbers. Which choice is impossible?",
          choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
          answer: 3,
          expl: "Only variables can make a relationship unknowable.<br>With no variables, both quantities are fixed numbers.<br>Two fixed numbers always compare in exactly one way: one is bigger, or they are equal.<br>So <strong>the cannot-be-determined choice, (D), is impossible</strong> here.<br><em>The trap:</em> ruling out equality instead &mdash; two specific numbers can absolutely be equal, and the GRE builds questions on exactly that.<br><em>Fast method:</em> scan for variables; if there are none, cross out (D) and guess among three. Target: ~10 seconds." },
        { text: "What is the probability of drawing 2 red marbles in a row, without replacement, from a bag of 4 red and 2 blue?",
          choices: ["4/9", "2/5", "1/3", "2/3"],
          answer: 1,
          expl: "Without replacement, update the bag after the first draw.<br>Start: 4 red out of 6 total &rarr; 4/6 = 2/3.<br>Now 3 red remain out of 5 total &rarr; 3/5.<br>Both must happen, so multiply: (2/3)(3/5) = 6/15 = <strong>2/5</strong>.<br><em>The trap:</em> 4/9 comes from squaring 2/3, which is the <em>with</em>-replacement answer and ignores the marble already removed.<br><em>Fast method:</em> without replacement, subtract 1 from the top and 1 from the bottom on each draw. Target: ~20 seconds." },
        { text: "A value goes from 40 to 100. What is the percent increase?",
          choices: ["60%", "150%", "250%", "40%"],
          answer: 1,
          expl: "Percent change always divides by the starting value.<br>Change = 100 &minus; 40 = 60.<br>Divide by the original: 60/40 = 1.5 = <strong>150%</strong>.<br><em>The trap:</em> 60% divides the change by the new value (60/100) instead of the original; 250% is 100/40, which says what the new value <em>is</em> as a percent of the old, not how much it rose.<br><em>Fast method:</em> percent change = change &divide; original, never &divide; new. Target: ~15 seconds." },
        { text: "In a normal distribution, approximately what percent of values fall within one standard deviation of the mean?",
          choices: ["50%", "68%", "95%", "99.7%"],
          answer: 1,
          expl: "This is a memorized fact, the empirical rule.<br>Within 1 SD of the mean: about <strong>68%</strong>.<br>Within 2 SD: about 95%. Within 3 SD: about 99.7%.<br><em>The trap:</em> 50%, which is the share lying below the mean rather than within one SD; 95% is the two-SD figure shifted up one step.<br><em>Fast method:</em> lock in 68 / 95 / 99.7 for 1 / 2 / 3 standard deviations. Target: ~10 seconds." },
        { text: "Quantity A: 3⁴⁰. Quantity B: 9¹⁹. What is the relationship?",
          choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
          answer: 0,
          expl: "Different bases can't be compared directly, so force a common base.<br>9 = 3&sup2;, so 9&sup1;&sup9; = (3&sup2;)&sup1;&sup9; = <strong>3&sup3;&sup8;</strong>.<br>Now compare 3&#8308;&#8304; with 3&sup3;&sup8;: same base, and it exceeds 1, so the bigger exponent wins.<br>40 &gt; 38 &rarr; <strong>Quantity A is greater, (A)</strong>.<br><em>The trap:</em> seeing 9 &gt; 3 and choosing (B), or reaching for (D) &mdash; with two specific numbers (D) is impossible.<br><em>Fast method:</em> rewrite both powers in the smaller base, then just compare exponents. Target: ~20 seconds." },
        { text: "A circle is inscribed in a square of side 6. What is the area of the region inside the square but outside the circle?",
          choices: ["36 − 9π", "36 − 6π", "36 − 36π", "9π − 36"],
          answer: 0,
          expl: "Sketch it: an inscribed circle touches all four sides, so its diameter equals the square's side.<br>Diameter = 6 &rarr; r = 3.<br>Square area = 6&sup2; = 36.<br>Circle area = &pi;r&sup2; = 9&pi;.<br>Region left over = <strong>36 &minus; 9&pi;</strong> &asymp; 36 &minus; 28.3 &asymp; 7.7, a plausibly small sliver.<br><em>The trap:</em> 36 &minus; 6&pi; subtracts the circle's <em>circumference</em> (2&pi; &times; 3 = 6&pi;) instead of its area; 36 &minus; 36&pi; uses r = 6 and goes negative.<br><em>Fast method:</em> inscribed circle &rarr; diameter = the square's side, then subtract areas. Target: ~30 seconds." },
        { text: "Which two values should ALWAYS be tested in a Quantitative Comparison with variables? (Select TWO.)",
          choices: [
            "A fraction between 0 and 1",
            "Only values above 100",
            "A negative number",
            "Only prime numbers",
            "Only even integers"],
          answer: [0, 2],
          expl: "The values worth testing are the ones that overturn intuition.<br><strong>A fraction between 0 and 1</strong>: squaring shrinks it, so x&sup2; &lt; x, reversing what integers taught you. True.<br><strong>A negative number</strong>: flips signs and reverses inequalities on multiplication. True.<br>Values above 100 only, primes only, and even integers only are narrow families that confirm your first guess rather than test it.<br><em>The trap:</em> testing only comfortable positive integers &mdash; that is how a true (D) gets mistaken for (A).<br><em>Fast method:</em> run ZONE F &mdash; Zero, One, Negative, Extreme, Fraction. Target: ~20 seconds." },
        { text: "What is the median of 3, 9, 4, 15, 8?",
          choices: ["4", "8", "9", "7.8"],
          answer: 1,
          expl: "The median needs sorted data, which is the whole question here.<br>Given: 3, 9, 4, 15, 8.<br>Sorted: 3, 4, 8, 9, 15.<br>Five values, so the third one is the middle: <strong>8</strong>.<br><em>The trap:</em> 7.8 is the mean (39/5), and 4 is what you get by taking the middle of the <em>unsorted</em> list.<br><em>Fast method:</em> sort first, then count in equally from both ends. Target: ~15 seconds." },
        { text: "How many distinct arrangements are there of the letters in the word BOOK?",
          choices: ["24", "12", "6", "4"],
          answer: 1,
          expl: "Arrange 4 slots, then cancel the repeat.<br>Four distinct letters would give 4! = 24.<br>O appears twice, so divide by 2!: 24/2 = <strong>12</strong>.<br><em>The trap:</em> 24 ignores the repeated O and counts every arrangement twice, since swapping the two O's changes nothing you can see.<br><em>Fast method:</em> n! divided by the factorial of each repeat count. Target: ~15 seconds." },
        { text: "A chart labeled 'thousands of units' shows a bar at 32. The question asks for the number of units. What is the answer?",
          choices: ["32", "320", "3,200", "32,000"],
          answer: 3,
          expl: "The axis label carries the multiplier.<br>The bar reads 32 and the chart is in thousands of units.<br>32 &times; 1,000 = <strong>32,000</strong>.<br><em>The trap:</em> answering 32, the bare number your eye lifts off the chart, when the question asked for units; 320 and 3,200 come from multiplying by 10 or 100.<br><em>Fast method:</em> read the unit label first, apply it once, then match the choices. Target: ~10 seconds." },
        { text: "The angles of a triangle are 40°, 60°, and 80°. Which side is shortest?",
          choices: [
            "The side opposite 40°",
            "The side opposite 60°",
            "The side opposite 80°",
            "All are equal"],
          answer: 0,
          expl: "Pure ordering &mdash; no formula required.<br>The smallest angle is 40&deg;.<br>The bigger angle faces the bigger side, so the smallest angle faces the shortest side.<br>The shortest side is the one <strong>opposite the 40&deg; angle</strong>.<br>The angles sum to 180&deg; but differ from each other, so the sides cannot all be equal.<br><em>The trap:</em> pairing the largest angle, 80&deg;, with the shortest side by inverting the rule.<br><em>Fast method:</em> rank the angles and the opposite sides rank identically. Target: ~10 seconds." },
        { text: "Given x > 1, Quantity A: 1/x. Quantity B: x. What is the relationship?",
          choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
          answer: 1,
          expl: "Read the constraint first: x &gt; 1 rules out fractions, 1, 0, and every negative.<br>Dividing 1 by something bigger than 1 gives a result below 1.<br>So 1/x &lt; 1 &lt; x.<br><strong>Quantity B is greater, (B)</strong>, for every allowed x &mdash; check x = 2 (0.5 vs 2) and x = 100 (0.01 vs 100).<br><em>The trap:</em> choosing (D) out of reflex whenever a variable appears. Here the constraint removes every case that could create a conflict.<br><em>Fast method:</em> read what the constraint forbids before hunting for counterexamples. Target: ~15 seconds." },
        { text: "Which two describe the relationship between mean and median? (Select TWO.)",
          choices: [
            "The mean is affected by outliers more than the median",
            "The median is always larger than the mean",
            "In an evenly spaced set, the mean equals the median",
            "They are always equal",
            "The median is the average of all values"],
          answer: [0, 2],
          expl: "Sort the true statements from the overstated ones.<br>The mean sums every value, so an outlier drags it, while the median depends only on position &rarr; <strong>the mean is more affected by outliers</strong>. True.<br>In an evenly spaced set the values are symmetric about the center &rarr; <strong>mean = median</strong>. True.<br>\"Median always larger\" and \"always equal\" both fail: in right-skewed data the mean exceeds the median, and in general the two move independently.<br>The average of all values is the definition of the mean, not the median.<br><em>Fast method:</em> outliers move the mean; symmetry makes the two coincide. Target: ~20 seconds." }
      ]
    }
  });
})();
