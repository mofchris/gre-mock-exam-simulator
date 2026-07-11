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
      expl: "The third side must satisfy 8 − 5 < s < 8 + 5, so 3 < s < 13 strictly. Only 10 falls inside; 3 and 13 are excluded boundaries." },
    { text: "A square has a diagonal of length 10. What is its area?",
      choices: ["25", "50", "100", "100√2"],
      answer: 1,
      expl: "For a square, area = d²/2 = 100/2 = 50. Memorizing this shortcut avoids computing the side length first." },
    { text: "A figure in a GRE problem is not marked 'drawn to scale.' What may you assume?",
      choices: [
        "That it is accurate anyway",
        "Nothing about lengths or angles that isn't explicitly stated",
        "That all angles shown as right angles are right angles",
        "That the figure is symmetric"],
      answer: 1,
      expl: "Unless stated otherwise, figures may be deliberately misleading. Only coordinate systems and number lines are guaranteed to be drawn to scale." },
    { text: "What is the sum of the interior angles of a pentagon?",
      choices: ["360°", "450°", "540°", "720°"],
      answer: 2,
      expl: "(n − 2) × 180° = (5 − 2) × 180° = 540°." },
    { text: "Two lines are perpendicular. If one has slope 3, what is the other's slope?",
      choices: ["3", "−3", "1/3", "−1/3"],
      answer: 3,
      expl: "Perpendicular slopes are negative reciprocals: the negative reciprocal of 3 is −1/3." },
    { text: "In a triangle with angles 50°, 60°, and 70°, which side is longest?",
      choices: [
        "The side opposite the 50° angle",
        "The side opposite the 60° angle",
        "The side opposite the 70° angle",
        "They are all equal"],
      answer: 2,
      expl: "The largest angle always faces the longest side. This principle resolves many comparison questions without any calculation." },
    { text: "A circle has circumference 12π. What is its area?",
      choices: ["36π", "24π", "144π", "12π"],
      answer: 0,
      expl: "2πr = 12π gives r = 6, so area = πr² = 36π. Convert circumference to radius first." },
    { text: "Which two are true about a 30-60-90 triangle? (Select TWO.)",
      choices: [
        "Its sides are in the ratio x : x√3 : 2x",
        "Its sides are in the ratio x : x : x√2",
        "The shortest side is opposite the 30° angle",
        "The hypotenuse is opposite the 60° angle",
        "All sides are equal"],
      answer: [0, 2],
      expl: "The 30-60-90 ratio is x : x√3 : 2x with the short leg facing 30°. The x : x : x√2 ratio belongs to the 45-45-90 triangle." }
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
      expl: "Order doesn't matter, so use combinations: C(7,3) = 7!/(3!·4!) = 35." },
    { text: "A fair coin is flipped 3 times. What is the probability of getting at least one head?",
      choices: ["1/2", "3/8", "7/8", "1/8"],
      answer: 2,
      expl: "Use the complement: P(no heads) = (1/2)³ = 1/8, so P(at least one head) = 1 − 1/8 = 7/8. 'At least' almost always means complement." },
    { text: "A set consists of five identical values. What is its standard deviation?",
      choices: ["0", "1", "Equal to the mean", "Cannot be determined"],
      answer: 0,
      expl: "Standard deviation measures spread. With no variation at all, the standard deviation is exactly zero." },
    { text: "A bag has 3 red and 2 blue marbles. Two are drawn without replacement. What is P(both red)?",
      choices: ["9/25", "3/10", "1/2", "6/25"],
      answer: 1,
      expl: "(3/5) × (2/4) = 6/20 = 3/10. Without replacement, both the numerator and denominator must be updated for the second draw." },
    { text: "If a constant is added to every value in a data set, what happens to the standard deviation?",
      choices: [
        "It increases by that constant",
        "It stays the same",
        "It doubles",
        "It becomes zero"],
      answer: 1,
      expl: "Adding a constant shifts every value equally, so the spread (and therefore the standard deviation) is unchanged." },
    { text: "How many distinct arrangements exist of the letters in LEVEL?",
      choices: ["120", "60", "30", "20"],
      answer: 2,
      expl: "5 letters with L twice and E twice: 5!/(2!·2!) = 120/4 = 30. Divide by the factorial of each repeated letter." },
    { text: "In a set of salaries where one executive earns far more than everyone else, which measure better represents a typical salary?",
      choices: ["The mean", "The median", "The mode", "The range"],
      answer: 1,
      expl: "The mean is dragged upward by outliers, while the median is resistant to them, which is why median income is the standard reported figure." },
    { text: "Which two situations call for a combination rather than a permutation? (Select TWO.)",
      choices: [
        "Selecting a 3-person committee from a group",
        "Awarding gold, silver, and bronze medals",
        "Choosing 2 toppings from a list of 8",
        "Arranging 5 books in order on a shelf",
        "Determining a race finishing order"],
      answer: [0, 2],
      expl: "Committees and topping selections don't depend on order, so they are combinations. Medals, shelf arrangements, and race results all depend on order and are permutations." }
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
      expl: "Percent increase = (200 − 50)/50 = 300%. Separately, 200/50 = 4, so the new value is 400% OF the original. Both figures appear as answer choices." },
    { text: "A bar chart shows Q4 with the tallest profit bar. The question asks which quarter had the highest profit MARGIN. What must you do?",
      choices: [
        "Select Q4, since its bar is tallest",
        "Divide each quarter's profit by its revenue and compare the ratios",
        "Select the quarter with the highest revenue",
        "Add the profits together"],
      answer: 1,
      expl: "Margin is a ratio, so it requires division. The largest absolute profit often does not have the best margin. This is the most common DI trap." },
    { text: "What should you do BEFORE answering the first question in a Data Interpretation set?",
      choices: [
        "Start calculating immediately to save time",
        "Read the title, units, axis scales, legend, and any footnotes",
        "Read all the answer choices",
        "Skip the chart and read only the questions"],
      answer: 1,
      expl: "Most DI errors are reading errors, not math errors. Twenty seconds spent orienting to units and scale prevents them." },
    { text: "A chart is labeled 'in thousands' and shows a bar at 45. What is the actual value?",
      choices: ["45", "450", "4,500", "45,000"],
      answer: 3,
      expl: "45 thousand = 45,000. Unit mismatches between the chart and the answer choices are a deliberate trap." },
    { text: "In a pie chart, a category represents 25% of the total. What is its central angle?",
      choices: ["25°", "45°", "90°", "125°"],
      answer: 2,
      expl: "Central angle = percent × 360° = 0.25 × 360° = 90°." },
    { text: "Why is estimation particularly effective on Data Interpretation questions?",
      choices: [
        "The answer choices are usually spread far apart",
        "Precision is not required for any GRE question",
        "The calculator is unavailable",
        "The charts are inaccurate"],
      answer: 0,
      expl: "DI answer choices are typically far enough apart that a rough calculation identifies the answer, cutting both time and error rates." },
    { text: "Which two are true about the on-screen calculator? (Select TWO.)",
      choices: [
        "It is available in the Quantitative sections",
        "It is available in the Verbal sections",
        "It is slow, and should be reserved for genuinely difficult arithmetic",
        "It automatically prevents order-of-operations errors",
        "It is required for every quant question"],
      answer: [0, 2],
      expl: "The calculator is available only in Quant, and it is slow enough that using it for simple arithmetic costs more time than it saves. It will also faithfully execute an order-of-operations mistake." }
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
      expl: "a% of b always equals b% of a: both are (25 × 80)/100 = 20. Note that with two specific numbers, 'cannot be determined' is impossible by definition." },
    { text: "Both quantities in a QC question are specific numbers with no variables. Which answer can be immediately eliminated?",
      choices: ["A", "B", "C", "D"],
      answer: 3,
      expl: "Two known numbers always have a determinable relationship, so (D) is impossible. Eliminating it raises a blind guess from 25% to 33%." },
    { text: "x is a number. Quantity A: x². Quantity B: x. What is the relationship?",
      choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
      answer: 3,
      expl: "x = 2 makes A greater; x = 0.5 makes B greater. Two different relationships from two test cases means the answer is (D): stop immediately." },
    { text: "Given x > 0, Quantity A: x + 1/x, Quantity B: 2. What is the relationship?",
      choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
      answer: 3,
      expl: "For x = 2, A is greater. But at x = 1, x + 1/x = 2 exactly. They are equal. Since both 'greater' and 'equal' are possible, the answer is (D)." },
    { text: "Which set of test values is MOST useful in Quantitative Comparison?",
      choices: [
        "Only positive integers",
        "Zero, one, a negative, a fraction between 0 and 1, and a large number",
        "Only numbers greater than 10",
        "Random values"],
      answer: 1,
      expl: "ZONE F (Zero, One, Negative, Extreme, Fraction) targets exactly the values that break intuition and expose (D) answers." },
    { text: "Which operation is NOT safe to perform on both quantities in a QC question?",
      choices: [
        "Adding the same number to both",
        "Subtracting the same number from both",
        "Multiplying both by a variable whose sign is unknown",
        "Dividing both by 3"],
      answer: 2,
      expl: "If the variable is negative, multiplying flips the comparison. You may only multiply or divide both sides by a quantity you know to be positive." },
    { text: "Quantity A: 20π. Quantity B: 60. What is the fastest approach?",
      choices: [
        "Compute 20π to three decimal places",
        "Divide both by 20 and compare π to 3",
        "Use the calculator",
        "The relationship cannot be determined"],
      answer: 1,
      expl: "Dividing both quantities by the positive number 20 reduces the comparison to π versus 3. Since π > 3, Quantity A is greater, no decimals needed." },
    { text: "Which two facts about QC are correct? (Select TWO.)",
      choices: [
        "If two test cases give different relationships, the answer is (D)",
        "If both quantities are specific numbers, (D) is still possible",
        "You should always test the value that makes the quantities equal",
        "You must always compute exact values",
        "The four answer choices change from question to question"],
      answer: [0, 2],
      expl: "Conflicting test cases prove the relationship isn't fixed, and testing for equality is what converts an apparent (A) into a correct (D). The four choices are always the same." }
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
          expl: "A negative squared is positive; a negative cubed stays negative. Positive always exceeds negative, so A is greater for every negative x." },
        { text: "Two sides of a triangle are 6 and 10. Which could be the third side?",
          choices: ["4", "5", "16", "3"],
          answer: 1,
          expl: "The third side must satisfy 4 < s < 16 strictly. Only 5 qualifies; 4 and 16 are excluded boundaries." },
        { text: "A square has diagonal 8. What is its area?",
          choices: ["16", "32", "64", "32√2"],
          answer: 1,
          expl: "Area = d²/2 = 64/2 = 32." },
        { text: "A committee of 2 is chosen from 6 people. How many committees are possible?",
          choices: ["12", "15", "30", "36"],
          answer: 1,
          expl: "C(6,2) = (6×5)/2 = 15. The answer 30 counts ordered pairs: the permutation trap." },
        { text: "A fair die is rolled once. What is the probability of rolling greater than 4?",
          choices: ["1/6", "1/3", "1/2", "2/3"],
          answer: 1,
          expl: "Greater than 4 means 5 or 6: 2 outcomes out of 6 = 1/3. Note that 'greater than 4' excludes 4 itself." },
        { text: "Which two are true about standard deviation? (Select TWO.)",
          choices: [
            "It is zero when all values are identical",
            "Adding a constant to every value increases it",
            "Adding a constant to every value leaves it unchanged",
            "It measures the mean",
            "It is always greater than the range"],
          answer: [0, 2],
          expl: "Standard deviation measures spread. Identical values have no spread (SD = 0), and shifting every value by the same constant doesn't change the spread." },
        { text: "Perpendicular lines have slopes that are:",
          choices: ["Equal", "Negative reciprocals", "Reciprocals", "Both positive"],
          answer: 1,
          expl: "If one line has slope m, a perpendicular line has slope −1/m." },
        { text: "In a QC question, both quantities are specific numbers. Which choice is impossible?",
          choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
          answer: 3,
          expl: "Two known numbers always have a determinable relationship, so (D) can be eliminated on sight." },
        { text: "What is the probability of drawing 2 red marbles in a row, without replacement, from a bag of 4 red and 2 blue?",
          choices: ["4/9", "2/5", "1/3", "2/3"],
          answer: 1,
          expl: "(4/6) × (3/5) = 12/30 = 2/5. Without replacement, update both numerator and denominator." },
        { text: "A value goes from 40 to 100. What is the percent increase?",
          choices: ["60%", "150%", "250%", "40%"],
          answer: 1,
          expl: "(100 − 40)/40 = 60/40 = 150%. Divide the change by the ORIGINAL value." },
        { text: "In a normal distribution, approximately what percent of values fall within one standard deviation of the mean?",
          choices: ["50%", "68%", "95%", "99.7%"],
          answer: 1,
          expl: "About 68% fall within 1 SD, 95% within 2 SD, and 99.7% within 3 SD." },
        { text: "Quantity A: 3⁴⁰. Quantity B: 9¹⁹. What is the relationship?",
          choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
          answer: 0,
          expl: "Rewrite in a common base: 9¹⁹ = (3²)¹⁹ = 3³⁸, which is less than 3⁴⁰. No exponent needs to be evaluated." },
        { text: "A circle is inscribed in a square of side 6. What is the area of the region inside the square but outside the circle?",
          choices: ["36 − 9π", "36 − 6π", "36 − 36π", "9π − 36"],
          answer: 0,
          expl: "An inscribed circle's diameter equals the square's side, so r = 3. Area = 36 − 9π ≈ 7.7." },
        { text: "Which two values should ALWAYS be tested in a Quantitative Comparison with variables? (Select TWO.)",
          choices: [
            "A fraction between 0 and 1",
            "Only values above 100",
            "A negative number",
            "Only prime numbers",
            "Only even integers"],
          answer: [0, 2],
          expl: "Fractions between 0 and 1 reverse the behavior of powers, and negatives flip signs and inequalities. Both routinely expose (D) answers." },
        { text: "What is the median of 3, 9, 4, 15, 8?",
          choices: ["4", "8", "9", "7.8"],
          answer: 1,
          expl: "Sort first: 3, 4, 8, 9, 15. The middle value is 8. (7.8 is the mean: a deliberate trap.)" },
        { text: "How many distinct arrangements are there of the letters in the word BOOK?",
          choices: ["24", "12", "6", "4"],
          answer: 1,
          expl: "4 letters with O repeated twice: 4!/2! = 24/2 = 12." },
        { text: "A chart labeled 'thousands of units' shows a bar at 32. The question asks for the number of units. What is the answer?",
          choices: ["32", "320", "3,200", "32,000"],
          answer: 3,
          expl: "32 thousand = 32,000. Unit mismatches between chart labels and answer choices are a standard Data Interpretation trap." },
        { text: "The angles of a triangle are 40°, 60°, and 80°. Which side is shortest?",
          choices: [
            "The side opposite 40°",
            "The side opposite 60°",
            "The side opposite 80°",
            "All are equal"],
          answer: 0,
          expl: "The smallest angle faces the shortest side. This comparison requires no computation at all." },
        { text: "Given x > 1, Quantity A: 1/x. Quantity B: x. What is the relationship?",
          choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
          answer: 1,
          expl: "If x > 1 then 1/x < 1 < x, so Quantity B is greater for every allowed value. The constraint eliminates all the awkward cases." },
        { text: "Which two describe the relationship between mean and median? (Select TWO.)",
          choices: [
            "The mean is affected by outliers more than the median",
            "The median is always larger than the mean",
            "In an evenly spaced set, the mean equals the median",
            "They are always equal",
            "The median is the average of all values"],
          answer: [0, 2],
          expl: "Outliers drag the mean but not the median, and in a symmetric or evenly spaced set the two coincide. Otherwise they move independently." }
      ]
    }
  });
})();
