/* Quant bank - topic coverage set (easy/medium).
   Fills real-exam topics the original bank lacked: coordinate geometry,
   statistics (SD, normal distribution, quartiles), sequences, overlapping
   sets, work/rate, mixtures, and counting. Ids are prefixed qt_. */
(function () {
  const B = window.GREBANK = window.GREBANK || {};
  B.quant = B.quant || [];
  B.disets = B.disets || [];
  const Q = B.quant, D = B.disets;

  /* ---------- Coordinate geometry ---------- */
  Q.push(
    { id: "qt_cg1", type: "mcq", topic: "geometry", diff: "easy",
      text: "In the xy-plane, what is the slope of the line that passes through the points (1, 2) and (3, 8)?",
      choices: ["1/3", "2", "3", "4", "6"],
      answer: 2,
      expl: "Slope is the y-change over the x-change — y on top, always.<br>Δy = 8 − 2 = 6.<br>Δx = 3 − 1 = 2.<br>Slope = 6/2 = <strong>3</strong>.<br><em>The trap:</em> 1/3 is Δx/Δy, the fraction flipped. The bare 6 is the rise with the run never divided out.",
      tip: "Slope = Δy/Δx. Say \"rise over run\" as you write the fraction so y lands on top. Target: ~10 seconds." },
    { id: "qt_cg2", type: "qc", topic: "geometry", diff: "easy",
      qa: "The slope of the line 2x + 3y = 6", qb: "0",
      answer: 1,
      expl: "Never read a slope straight off Ax + By = C form — solve for y first.<br>2x + 3y = 6 → 3y = 6 − 2x.<br>y = 2 − (2/3)x.<br>Slope = <strong>−2/3</strong>, which is negative, so Quantity B (0) is bigger.<br><strong>(B)</strong><br><em>The trap:</em> grabbing the 2 or the 2/3 out of the original equation and calling it positive. With A and B both positive in Ax + By = C, the line always falls.",
      tip: "Slope of Ax + By = C is −A/B. Matching signs on A and B mean a negative slope, no algebra needed. Target: ~15 seconds." },
    { id: "qt_cg3", type: "mcq", topic: "geometry", diff: "medium",
      text: "In the xy-plane, what is the distance between the points (−1, 2) and (5, 10)?",
      choices: ["6", "8", "10", "12", "14"],
      answer: 2,
      expl: "Distance is Pythagoras run on the coordinate differences.<br>Δx = 5 − (−1) = 6.<br>Δy = 10 − 2 = 8.<br>Legs 6 and 8 → <strong>hypotenuse 10</strong>, the 3-4-5 triple doubled.<br>Longhand: &radic;(36 + 64) = &radic;100 = 10.<br><em>The trap:</em> subtracting −1 as if it were +1 gives Δx = 4 and a messy &radic;80. When the arithmetic stops being clean, recheck the negative sign.",
      tip: "Get Δx and Δy, then look for a triple (3-4-5, 5-12-13, 8-15-17) before reaching for the square root. Target: ~20 seconds." },
    { id: "qt_cg4", type: "num", topic: "geometry", diff: "medium",
      text: "In the xy-plane, a line passes through the point (2, 3) and is parallel to the line y = 2x − 5. What is the y-intercept of this line?",
      answer: -1,
      expl: "Parallel means identical slope — copy it, and only the intercept is left unknown.<br>y = 2x − 5 has slope 2, so the new line is y = 2x + b.<br>Substitute (2, 3): 3 = 2(2) + b.<br>3 = 4 + b → b = <strong>−1</strong>.<br><em>The trap:</em> reusing −5, the old line's intercept, or switching to the perpendicular slope −1/2. Parallel keeps the slope and changes the intercept.",
      tip: "Parallel: same m. Write y = mx + b, plug in the point, solve for b in one line. Target: ~20 seconds." },
    { id: "qt_cg5", type: "qc", topic: "geometry", diff: "medium",
      info: "The point (a, b) lies in quadrant II of the xy-plane.",
      qa: "a · b", qb: "0",
      answer: 1,
      expl: "Signs, not values, decide this one.<br>Quadrant II is the upper left: x negative, y positive.<br>So a &lt; 0 and b &gt; 0.<br>negative × positive = negative → <strong>a · b &lt; 0</strong>.<br>Quantity B is 0, so B is greater — for every point in the quadrant, not just some.<br><strong>(B)</strong><br><em>The trap:</em> choosing (D) because a and b are never given. Unknown numbers can still have known signs, and fixed signs fix the comparison.",
      tip: "Quadrant signs counterclockwise from the top right: (+,+), (−,+), (−,−), (+,−). Only II and IV give a negative product. Target: ~10 seconds." },
    { id: "qt_cg6", type: "mcq", topic: "geometry", diff: "medium",
      text: "The point M(3, −2) is the midpoint of the segment from A(7, 4) to point B. What are the coordinates of B?",
      choices: ["(−1, −8)", "(5, 1)", "(11, 10)", "(−4, −6)", "(1, −8)"],
      answer: 0,
      expl: "The midpoint is the average of the endpoints, so run the average backwards.<br>x: (7 + x)/2 = 3 → x = 2(3) − 7 = −1.<br>y: (4 + y)/2 = −2 → y = 2(−2) − 4 = −8.<br>B = <strong>(−1, −8)</strong>.<br><strong>Shortcut:</strong> double the midpoint, subtract the known endpoint.<br><em>The trap:</em> (5, 1) is the midpoint of A and M — a half-step instead of a full one. Sanity check: M must lie between A and B, and 3 does sit between 7 and −1.",
      tip: "Missing endpoint = 2·(midpoint) − (known endpoint), one coordinate at a time. Target: ~20 seconds." }
  );

  /* ---------- Statistics ---------- */
  Q.push(
    { id: "qt_st1", type: "mcq", topic: "data", diff: "easy",
      text: "What is the median of the list 3, 7, 9, 12, 15, 20?",
      choices: ["9", "10.5", "11", "12", "13"],
      answer: 1,
      expl: "Count the values first — the count picks the method.<br>Six values, already in order, so the median is the average of the 3rd and 4th.<br>3rd = 9, 4th = 12.<br>(9 + 12)/2 = <strong>10.5</strong>.<br><em>The trap:</em> grabbing 9 or 12 because a median \"should\" be one of the listed numbers. With an even count it usually is not.",
      tip: "Odd count → the single middle value. Even count → average the two middle ones. Sort before anything else. Target: ~10 seconds." },
    { id: "qt_st2", type: "mcq", topic: "data", diff: "medium",
      text: "The scores on an exam are approximately normally distributed with mean 500 and standard deviation 100. Approximately what percent of scores are between 400 and 600?",
      choices: ["34%", "50%", "68%", "95%", "99.7%"],
      answer: 2,
      expl: "Measure the endpoints in standard deviations, not in points.<br>Mean 500, SD 100.<br>400 = mean − 1 SD.<br>600 = mean + 1 SD.<br>Within 1 SD on both sides ≈ <strong>68%</strong>.<br><em>The trap:</em> 95% is the two-SD figure, which belongs to 300–700. And 34% is only the half from 500 up to 600 — right idea, one side missing.",
      tip: "Convert the endpoints to SD units, then read off 68 / 95 / 99.7 for ±1, ±2, ±3 SD. Halve it for one side. Target: ~15 seconds." },
    { id: "qt_st3", type: "qc", topic: "data", diff: "medium",
      info: "List L: 10, 20, 30&nbsp;&nbsp;&nbsp;&nbsp;List M: 110, 120, 130",
      qa: "The standard deviation of L", qb: "The standard deviation of M",
      answer: 2,
      expl: "Shift changes the mean, never the spread.<br>M is L with 100 added to every value: 10→110, 20→120, 30→130.<br>Mean of L = 20; mean of M = 120.<br>Deviations from the mean are identical: −10, 0, +10 in both lists.<br>Same deviations → <strong>same standard deviation</strong>. Equal.<br><strong>(C)</strong><br><em>The trap:</em> assuming bigger numbers mean a bigger SD and picking Quantity B. SD measures distance from the mean, and those distances never moved.",
      tip: "Add a constant: SD unchanged. Multiply by a constant: SD scales by that constant's absolute value. Target: ~15 seconds." },
    { id: "qt_st4", type: "mcq", topic: "data", diff: "medium",
      text: "For the list 2, 5, 7, 7, 11, 13, 17, 19, what is the interquartile range?",
      choices: ["6", "9", "11", "15", "17"],
      answer: 1,
      expl: "IQR needs two medians, not one — split the list, then take the median of each half.<br>8 values, so 4 per half: 2, 5, 7, 7 and 11, 13, 17, 19.<br>Q1 = (5 + 7)/2 = 6.<br>Q3 = (13 + 17)/2 = 15.<br>IQR = 15 − 6 = <strong>9</strong>.<br><em>The trap:</em> 17 is the full range, 19 − 2 — the whole spread instead of the middle half. 15 is Q3 reported on its own, with Q1 never subtracted.",
      tip: "Cut the ordered list in half (drop the middle value if the count is odd), median each half, subtract. Target: ~30 seconds." },
    { id: "qt_st5", type: "num", topic: "data", diff: "medium",
      text: "The average (arithmetic mean) of 6 numbers is 15. When one number is removed, the average of the remaining 5 numbers is 12. What number was removed?",
      answer: 30,
      expl: "Averages hide totals — turn both averages into sums and the problem becomes one subtraction.<br>Total before: 6 × 15 = 90.<br>Total after: 5 × 12 = 60.<br>Removed = 90 − 60 = <strong>30</strong>.<br><em>The trap:</em> answering 3 from 15 − 12. That drop of 3 is spread across the 5 numbers that stayed; it is not the value that left.",
      tip: "Sum = average × count. Convert every average into a sum before comparing anything. Target: ~20 seconds." },
    { id: "qt_st6", type: "qc", topic: "data", diff: "medium",
      info: "The values of a large data set are approximately normally distributed with mean 60 and standard deviation 5.",
      qa: "The percent of values greater than 70", qb: "3%",
      answer: 1,
      expl: "Locate 70 in SD units, then take one tail only.<br>Mean 60, SD 5, so 70 = mean + 2 SD.<br>About 95% lies within 2 SD, leaving 5% split between the two tails.<br>Above 70 ≈ 5%/2 = <strong>2.5%</strong>.<br>2.5% &lt; 3%, so Quantity B is greater.<br><strong>(B)</strong><br><em>The trap:</em> using the whole 5% and calling Quantity A greater. \"Greater than 70\" is one tail; the other 2.5% sits below 50.",
      tip: "One tail beyond 2 SD ≈ 2.5%; beyond 1 SD ≈ 16%. Subtract from 100, then halve the leftover. Target: ~25 seconds." }
  );

  /* ---------- Sequences ---------- */
  Q.push(
    { id: "qt_sq1", type: "mcq", topic: "algebra", diff: "medium",
      text: "In an arithmetic sequence, the 3rd term is 10 and the 7th term is 26. What is the 10th term?",
      choices: ["34", "36", "38", "40", "42"],
      answer: 2,
      expl: "Get the common difference from the gap, counting steps between terms.<br>3rd → 7th is 4 steps, and the value climbs 26 − 10 = 16.<br>d = 16/4 = 4.<br>7th → 10th is 3 more steps.<br>26 + 3(4) = <strong>38</strong>.<br><em>The trap:</em> 42 comes from taking 4 steps past the 7th term instead of 3. Count the gaps between terms, never the term numbers.",
      tip: "Steps from term m to term n = n − m. Solve for d, then walk forward by (steps × d). Target: ~25 seconds." },
    { id: "qt_sq2", type: "num", topic: "algebra", diff: "easy",
      text: "In a sequence, a₁ = 2 and each subsequent term is 5 more than the previous term. What is the value of a₂₀?",
      answer: 97,
      expl: "There is always one fewer step than there are terms.<br>a₁ = 2, d = 5.<br>From a₁ to a₂₀ is 19 steps, not 20.<br>a₂₀ = 2 + 19(5) = 2 + 95 = <strong>97</strong>.<br><em>The trap:</em> 102 comes from 2 + 20(5) — one step too many. Test the formula on something tiny: a₂ = 2 + 1(5) = 7, and 7 is right.",
      tip: "aₙ = a₁ + (n − 1)d. The (n − 1) is where the points get lost. Target: ~15 seconds." },
    { id: "qt_sq3", type: "mcq", topic: "arithmetic", diff: "medium",
      text: "What is the sum of the first 30 positive even integers?",
      choices: ["870", "900", "930", "960", "1860"],
      answer: 2,
      expl: "Factor the 2 out and you are summing 1 through 30, which has a formula.<br>2 + 4 + … + 60 = 2(1 + 2 + … + 30).<br>1 + … + 30 = 30(31)/2 = 465.<br>2 × 465 = <strong>930</strong>.<br><strong>Or pair the ends:</strong> 2 + 60 = 62, and 15 such pairs give 62 × 15 = 930.<br><em>The trap:</em> 465 stops before doubling back to the even numbers; 1860 doubles one time too many.",
      tip: "Sum of the first n even integers = n(n + 1). Here 30 × 31 = 930 in one stroke. Target: ~20 seconds." }
  );

  /* ---------- Overlapping sets ---------- */
  Q.push(
    { id: "qt_os1", type: "mcq", topic: "arithmetic", diff: "easy",
      text: "In a class of 40 students, 25 take mathematics, 20 take physics, and 12 take both. How many students take neither subject?",
      choices: ["5", "7", "8", "12", "15"],
      answer: 1,
      expl: "Total = A + B − both + neither. Fill in the three you know and solve for the hole.<br>Math or physics = 25 + 20 − 12 = 33.<br>Neither = 40 − 33 = <strong>7</strong>.<br><em>The trap:</em> adding 25 + 20 = 45 without removing the 12 overlap counts those students twice and pushes the total past the class size. And 15 is just 40 − 25, which ignores physics entirely.",
      tip: "Total = A + B − both + neither. Write the equation, plug in three numbers, solve for the fourth. Target: ~15 seconds." },
    { id: "qt_os2", type: "mcq", topic: "arithmetic", diff: "medium",
      text: "In a survey, 80 percent of respondents own a phone and 60 percent own a laptop. If every respondent owns at least one of the two, what percent own both?",
      choices: ["20%", "30%", "40%", "48%", "60%"],
      answer: 2,
      expl: "Everyone owns at least one device, so the union is the full 100%.<br>Inclusion–exclusion: phone + laptop − both = at least one.<br>80 + 60 − both = 100.<br>140 − both = 100 → both = <strong>40%</strong>.<br><strong>Mental shortcut:</strong> 80 + 60 = 140; whatever spills over 100 is the overlap: 140 − 100 = 40.<br><em>The trap:</em> 48% comes from multiplying 0.8 × 0.6 — that assumes owning a phone and owning a laptop are independent, which the problem never says.",
      tip: "Two groups covering everyone: Both = A + B − 100. Add, and the excess over 100 IS the overlap. Target: ~10 seconds." },
    { id: "qt_os3", type: "num", topic: "arithmetic", diff: "medium",
      text: "Of 100 people surveyed, 65 drink tea, 50 drink coffee, and 20 drink neither. How many drink both tea and coffee?",
      answer: 35,
      expl: "Strip out the \"neither\" group first — inclusion–exclusion only describes the at-least-one pool.<br>At least one drink: 100 − 20 = 80.<br>Tea + coffee − both = 80.<br>65 + 50 − both = 80 → 115 − both = 80.<br>both = <strong>35</strong>.<br><strong>Shortcut:</strong> 115 overshoots 80 by 35, and the overshoot IS the overlap.<br><em>The trap:</em> using 100 as the union instead of 80 gives 15. The 20 non-drinkers are not in the union.",
      tip: "Both = A + B − (total − neither). Peel off the \"neither\" group before applying the overlap formula. Target: ~25 seconds." }
  );

  /* ---------- Work & rates ---------- */
  Q.push(
    { id: "qt_wr1", type: "mcq", topic: "arithmetic", diff: "easy",
      text: "Six identical machines, working together at the same constant rate, complete a job in 12 days. How many days would 8 such machines take?",
      choices: ["8", "9", "10", "14", "16"],
      answer: 1,
      expl: "Total machine-days is fixed no matter how many machines show up.<br>6 machines × 12 days = 72 machine-days of work.<br>Same job, 8 machines: 72/8 = <strong>9 days</strong>.<br><em>The trap:</em> 16 comes from scaling 12 up by 8/6, the ratio inverted. More machines must mean fewer days, so anything above 12 is wrong before you compute it.",
      tip: "Workers × time is a constant. Compute it once, then divide by the new headcount. Target: ~15 seconds." },
    { id: "qt_wr2", type: "mcq", topic: "arithmetic", diff: "easy",
      text: "Working alone, Ana paints a room in 3 hours and Ben paints the same room in 6 hours. Working together at these rates, how long do they take to paint the room?",
      choices: ["1.5 hours", "2 hours", "2.5 hours", "4.5 hours", "9 hours"],
      answer: 1,
      expl: "Times never add; rates do.<br>Ana = 1/3 room per hour. Ben = 1/6 room per hour.<br>1/3 + 1/6 = 2/6 + 1/6 = 1/2 room per hour.<br>Half a room per hour → <strong>2 hours</strong> for the full room.<br><em>The trap:</em> 4.5 is the average of 3 and 6, which is slower than Ana working alone. Together must beat the faster worker, so anything 3 or above is dead on arrival.",
      tip: "Add the rates, then flip: combined time = 1/(1/a + 1/b). It must come out under the smaller of a and b. Target: ~20 seconds." },
    { id: "qt_wr3", type: "num", topic: "arithmetic", diff: "easy",
      text: "A car travels at a constant speed of 45 miles per hour. How many miles does it travel in 40 minutes?",
      answer: 30,
      expl: "Convert minutes to a fraction of an hour first — the speed is per hour.<br>40 minutes = 40/60 = 2/3 hour.<br>Distance = 45 × 2/3.<br>45/3 = 15, then 15 × 2 = <strong>30 miles</strong>.<br><em>The trap:</em> multiplying 45 × 40 and treating the minutes as hours. Sanity check: 40 minutes is less than an hour, so the distance must come in under 45.",
      tip: "Distance = rate × time, units matching. Divide the minutes by 60 before you multiply. Target: ~15 seconds." }
  );

  /* ---------- Mixtures ---------- */
  Q.push(
    { id: "qt_mx1", type: "mcq", topic: "arithmetic", diff: "medium",
      text: "Two liters of a 30 percent acid solution are mixed with 4 liters of a 60 percent acid solution. What is the acid concentration of the mixture?",
      choices: ["40%", "45%", "50%", "54%", "55%"],
      answer: 2,
      expl: "Track actual liters of acid, then divide by total liters.<br>Weak: 0.30 × 2 = 0.6 L of acid.<br>Strong: 0.60 × 4 = 2.4 L of acid.<br>Acid total = 3 L. Volume total = 2 + 4 = 6 L.<br>3/6 = <strong>50%</strong>.<br><em>The trap:</em> 45% is the plain average of 30 and 60. There is twice as much of the 60% solution, so the mixture has to land closer to 60 than to 30 — above the midpoint, not on it.",
      tip: "Concentration = total solute / total volume, weighted by volume. Check which side of the midpoint the answer belongs on. Target: ~30 seconds." },
    { id: "qt_mx2", type: "num", topic: "algebra", diff: "medium",
      text: "A grocer blends coffee costing $8 per pound with coffee costing $12 per pound to make 10 pounds of a blend costing $9 per pound. How many pounds of the $12 coffee are in the blend?",
      answer: 2.5,
      expl: "Write the money equation: cost of the parts equals cost of the blend.<br>Let x = pounds of $12 coffee, so 10 − x pounds are $8.<br>12x + 8(10 − x) = 10 × 9 = 90.<br>4x + 80 = 90 → 4x = 10 → x = <strong>2.5 pounds</strong>.<br><strong>Distance check:</strong> $9 is 1 away from $8 and 3 away from $12, so the split is 3 : 1 toward the cheap coffee — 7.5 and 2.5.<br><em>The trap:</em> splitting 5 and 5. The blend price sits much nearer $8, so the cheap side must dominate.",
      tip: "Weights are inverse to the price distances: the nearer a price is to the blend, the larger its share. Target: ~35 seconds." }
  );

  /* ---------- Counting & probability ---------- */
  Q.push(
    { id: "qt_cp1", type: "mcq", topic: "data", diff: "medium",
      text: "A shelf has room for 4 books in a row. If 6 different books are available, how many different arrangements of 4 books are possible?",
      choices: ["15", "24", "120", "360", "1296"],
      answer: 3,
      expl: "\"Arrangements\" means order matters, so fill the slots one at a time.<br>4 slots, 6 books available.<br>6 × 5 × 4 × 3 = <strong>360</strong>.<br>The count drops each slot because a book already shelved cannot be reused.<br><em>The trap:</em> 15 is C(6,4), the count if shelf order were irrelevant — that is the committee question, not this one. And 6⁴ = 1296 lets the same book appear twice.",
      tip: "Order matters → multiply down the slots (6 × 5 × 4 × 3). Order irrelevant → divide that by 4!. Target: ~20 seconds." },
    { id: "qt_cp2", type: "mcq", topic: "data", diff: "medium",
      text: "Two independent events have probabilities 0.3 and 0.5 of occurring. What is the probability that at least one of them occurs?",
      choices: ["0.15", "0.35", "0.65", "0.80", "0.85"],
      answer: 2,
      expl: "\"At least one\" is fastest as 1 minus \"neither.\"<br>P(neither) = (1 − 0.3)(1 − 0.5) = 0.7 × 0.5 = 0.35.<br>P(at least one) = 1 − 0.35 = <strong>0.65</strong>.<br><em>The trap:</em> 0.80 is 0.3 + 0.5, which counts the both-happen case twice — adding is only legal for outcomes that cannot co-occur. And 0.15 is P(both), 0.3 × 0.5.",
      tip: "At least one = 1 − (product of the complements). Multiply the misses, subtract from 1. Target: ~25 seconds." },
    { id: "qt_cp3", type: "mcq", topic: "data", diff: "easy",
      text: "From a group of 5 people, how many different 2-person teams can be formed?",
      choices: ["10", "15", "20", "25", "120"],
      answer: 0,
      expl: "A team has no internal order, so count ordered picks and then divide out the duplicates.<br>Ordered picks: 5 × 4 = 20.<br>Every team got counted twice — A-then-B and B-then-A are one team.<br>20/2 = <strong>10</strong>.<br><em>The trap:</em> 20 stops before dividing. It treats \"first pick\" and \"second pick\" as different roles when both people are simply teammates.",
      tip: "Choosing k with no order: multiply k terms down, then divide by k!. For pairs, divide by 2. Target: ~15 seconds." }
  );

  /* ---------- Data Interpretation: boxplots ---------- */
  D.push({
    id: "qt_di2", diff: "medium",
    intro: "<p><b>Daily commute times of employees at two offices</b></p>",
    display: {
      note: "Each boxplot shows minimum, first quartile, median, third quartile, and maximum.",
      box: { title: "Commute time (minutes)", unit: "minutes", xmax: 80,
        items: [
          { label: "Office A", min: 10, q1: 20, med: 30, q3: 45, max: 70 },
          { label: "Office B", min: 15, q1: 25, med: 35, q3: 40, max: 55 }
        ] }
    },
    questions: [
      { id: "qt_di2a", type: "num", topic: "data", diff: "medium",
        text: "What is the interquartile range, in minutes, of the commute times at Office A?",
        answer: 25,
        expl: "Read the two edges of the box — that's all the IQR is.<br>Office A's box runs from Q1 = 20 to Q3 = 45.<br>IQR = 45 − 20 = <strong>25</strong>.<br><em>The trap:</em> using the whiskers (70 − 10 = 60) — that's the full range, not the interquartile range. The box IS the middle 50%.",
        tip: "On a boxplot: box edges = Q1 and Q3, line inside = median, whisker ends = min and max. IQR = box width. Target: ~10 seconds." },
      { id: "qt_di2b", type: "mcq", topic: "data", diff: "medium",
        text: "Approximately what percent of Office A employees have a commute of 45 minutes or longer?",
        choices: ["10%", "25%", "50%", "75%", "It cannot be determined"],
        answer: 1,
        expl: "Locate 45 on Office A's plot first: it is exactly the third quartile.<br>By definition, the top quarter of the data lies at or above Q3.<br>So about <strong>25%</strong> of commutes are 45 minutes or longer.<br><em>The trap:</em> the boxplot never shows individual values, so \"cannot be determined\" tempts — but quartiles are exactly the values a boxplot DOES pin down: each region (whisker, half-box) holds ~25% of the data.",
        tip: "Boxplots answer percent questions only at the five marked values — min, Q1, median, Q3, max — where the cut is 0/25/50/75/100%. Target: ~15 seconds." },
      { id: "qt_di2c", type: "mcq", topic: "data", diff: "medium",
        text: "The middle 50 percent of commute times at Office B lie between",
        choices: ["15 and 55 minutes", "25 and 40 minutes", "25 and 55 minutes", "15 and 40 minutes", "30 and 45 minutes"],
        answer: 1,
        expl: "\"Middle 50 percent\" is the boxplot's box, nothing else.<br>Office B's box runs from Q1 = 25 to Q3 = 40.<br>So the middle half of commutes lie between <strong>25 and 40 minutes</strong>.<br><em>The trap:</em> 15 and 55 are Office B's whisker ends — that interval holds 100% of the data, not the middle 50%. The mixed pairs graft one whisker onto one box edge.",
        tip: "Middle 50% = Q1 to Q3 = the box. Whiskers are the outer quarters. Target: ~10 seconds." }
    ]
  });

  /* ---------- Data Interpretation ---------- */
  D.push({
    id: "qt_di1", diff: "medium",
    intro: "<p><b>Number of books read last month by the 30 students in a class</b></p>",
    display: {
      bar: { title: "Students by number of books read", unit: "students",
        cats: ["0 books", "1 book", "2 books", "3 books", "4 books"],
        series: [{ name: "Students", values: [4, 8, 9, 6, 3] }] }
    },
    questions: [
      { id: "qt_di1a", type: "mcq", topic: "data", diff: "medium",
        text: "What is the median number of books read?",
        choices: ["1", "1.5", "2", "2.5", "3"],
        answer: 2,
        expl: "In a frequency chart, walk a running total up to the middle positions.<br>30 students, so the median averages the 15th and 16th.<br>Running totals: 0 books → 4; through 1 book → 12; through 2 books → 21.<br>Positions 13 through 21 all read \"2 books,\" so the 15th and 16th are both 2.<br>Median = <strong>2</strong>.<br><em>The trap:</em> 1.5 comes from averaging 1 and 2 as if the middle straddled two bars. The \"1 book\" bar ends at position 12, so both middle values sit inside \"2 books.\"",
        tip: "Cumulative-count to positions n/2 and n/2 + 1; the bar you land in is the median. Target: ~30 seconds." },
      { id: "qt_di1b", type: "mcq", topic: "data", diff: "medium",
        text: "The average (arithmetic mean) number of books read is closest to which of the following?",
        choices: ["1.5", "1.7", "1.9", "2.1", "2.3"],
        answer: 2,
        expl: "A frequency chart needs a weighted mean: each value times how many students hold it.<br>0(4) + 1(8) + 2(9) + 3(6) + 4(3)<br>= 0 + 8 + 18 + 18 + 12 = 56 books.<br>56 books over 30 students = 1.867 → closest to <strong>1.9</strong>.<br><em>The trap:</em> averaging the five category labels, (0+1+2+3+4)/5 = 2, weights every bar equally even though the bars hold anywhere from 3 to 9 students. That slip makes 2.1 look plausible.",
        tip: "Weighted mean = (sum of value × frequency) / total count. Never average the category labels. Target: ~35 seconds." },
      { id: "qt_di1c", type: "mcq", topic: "data", diff: "medium",
        text: "What percent of the students read at least 3 books?",
        choices: ["10%", "20%", "30%", "40%", "45%"],
        answer: 2,
        expl: "\"At least 3\" includes 3 itself, so take the last two bars.<br>3 books: 6 students. 4 books: 3 students.<br>6 + 3 = 9 students.<br>9/30 = <strong>30%</strong>.<br><em>The trap:</em> 10% comes from reading it as \"more than 3\" and counting only the 3 students who read 4 books. \"At least 3\" means 3 or more; \"more than 3\" means 4 or more.",
        tip: "At least n = n and everything above it. Sum those bars, divide by the total count. Target: ~20 seconds." }
    ]
  });
})();
