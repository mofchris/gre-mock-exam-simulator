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
      expl: "Slope = rise/run = (8 − 2)/(3 − 1) = 6/2 = 3. Dividing run by rise gives the reciprocal trap 1/3.",
      tip: "Slope is Δy over Δx — y-difference on top, always." },
    { id: "qt_cg2", type: "qc", topic: "geometry", diff: "easy",
      qa: "The slope of the line 2x + 3y = 6", qb: "0",
      answer: 1,
      expl: "Solve for y: y = 2 − (2/3)x, so the slope is −2/3, which is less than 0. B is greater. A line in Ax + By = C form with A and B positive always slopes downward.",
      tip: "Put the equation in y = mx + b form before reading anything off it." },
    { id: "qt_cg3", type: "mcq", topic: "geometry", diff: "medium",
      text: "In the xy-plane, what is the distance between the points (−1, 2) and (5, 10)?",
      choices: ["6", "8", "10", "12", "14"],
      answer: 2,
      expl: "Distance = √((5 − (−1))² + (10 − 2)²) = √(36 + 64) = √100 = 10 — a 6-8-10 right triangle (the 3-4-5 triple doubled).",
      tip: "GRE distances are usually engineered onto Pythagorean triples; spot 6-8-10 before computing." },
    { id: "qt_cg4", type: "num", topic: "geometry", diff: "medium",
      text: "In the xy-plane, a line passes through the point (2, 3) and is parallel to the line y = 2x − 5. What is the y-intercept of this line?",
      answer: -1,
      expl: "Parallel lines share slopes, so the line is y = 2x + b. Through (2, 3): 3 = 4 + b, so b = −1.",
      tip: "Parallel = same slope; plug the known point in to find the intercept." },
    { id: "qt_cg5", type: "qc", topic: "geometry", diff: "medium",
      info: "The point (a, b) lies in quadrant II of the xy-plane.",
      qa: "a · b", qb: "0",
      answer: 1,
      expl: "Quadrant II means a < 0 and b > 0, so the product is negative. B is greater — for every point in the quadrant, not just some.",
      tip: "Memorize the sign pattern by quadrant: (+,+), (−,+), (−,−), (+,−) going counterclockwise." },
    { id: "qt_cg6", type: "mcq", topic: "geometry", diff: "medium",
      text: "The point M(3, −2) is the midpoint of the segment from A(7, 4) to point B. What are the coordinates of B?",
      choices: ["(−1, −8)", "(5, 1)", "(11, 10)", "(−4, −6)", "(1, −8)"],
      answer: 0,
      expl: "The midpoint averages the endpoints, so B = (2·3 − 7, 2·(−2) − 4) = (−1, −8). The point (5, 1) is the midpoint of A and M — the classic misread.",
      tip: "To reflect through a midpoint: double the midpoint, subtract the known endpoint." }
  );

  /* ---------- Statistics ---------- */
  Q.push(
    { id: "qt_st1", type: "mcq", topic: "data", diff: "easy",
      text: "What is the median of the list 3, 7, 9, 12, 15, 20?",
      choices: ["9", "10.5", "11", "12", "13"],
      answer: 1,
      expl: "Six values means the median is the average of the 3rd and 4th: (9 + 12)/2 = 10.5. An even-length list usually has a median that isn't in the list.",
      tip: "Even count → average the two middle values; the median needn't be a list member." },
    { id: "qt_st2", type: "mcq", topic: "data", diff: "medium",
      text: "The scores on an exam are approximately normally distributed with mean 500 and standard deviation 100. Approximately what percent of scores are between 400 and 600?",
      choices: ["34%", "50%", "68%", "95%", "99.7%"],
      answer: 2,
      expl: "400 to 600 is within one standard deviation of the mean on each side, which captures about 68% of a normal distribution. (95% is the two-SD figure — the most tempting wrong answer.)",
      tip: "Memorize 68 / 95 / 99.7 for 1, 2, and 3 standard deviations — the GRE never asks for more precision." },
    { id: "qt_st3", type: "qc", topic: "data", diff: "medium",
      info: "List L: 10, 20, 30&nbsp;&nbsp;&nbsp;&nbsp;List M: 110, 120, 130",
      qa: "The standard deviation of L", qb: "The standard deviation of M",
      answer: 2,
      expl: "M is L shifted by +100. Shifting every value by the same constant moves the mean but leaves every deviation from the mean — and therefore the standard deviation — unchanged. Equal.",
      tip: "Adding a constant: SD unchanged. MULTIPLYING by a constant: SD scales by its absolute value." },
    { id: "qt_st4", type: "mcq", topic: "data", diff: "medium",
      text: "For the list 2, 5, 7, 7, 11, 13, 17, 19, what is the interquartile range?",
      choices: ["6", "9", "11", "15", "17"],
      answer: 1,
      expl: "Split the ordered list in half. Lower half 2, 5, 7, 7 → Q1 = (5+7)/2 = 6. Upper half 11, 13, 17, 19 → Q3 = (13+17)/2 = 15. IQR = 15 − 6 = 9. The full range (17) and Q3 alone (15) are the distractors.",
      tip: "IQR = Q3 − Q1: median of the top half minus median of the bottom half." },
    { id: "qt_st5", type: "num", topic: "data", diff: "medium",
      text: "The average (arithmetic mean) of 6 numbers is 15. When one number is removed, the average of the remaining 5 numbers is 12. What number was removed?",
      answer: 30,
      expl: "Total before: 6 × 15 = 90. Total after: 5 × 12 = 60. Removed: 90 − 60 = 30.",
      tip: "Averages hide totals — convert to totals and the problem becomes subtraction." },
    { id: "qt_st6", type: "qc", topic: "data", diff: "medium",
      info: "The values of a large data set are approximately normally distributed with mean 60 and standard deviation 5.",
      qa: "The percent of values greater than 70", qb: "3%",
      answer: 1,
      expl: "70 is two standard deviations above the mean. About 95% of a normal distribution lies within two SDs, leaving about 5% in the two tails — roughly 2.5% in each. 2.5% < 3%, so B is greater.",
      tip: "One tail beyond 2 SD ≈ 2.5%; beyond 1 SD ≈ 16%. Halve the leftover, never the middle." }
  );

  /* ---------- Sequences ---------- */
  Q.push(
    { id: "qt_sq1", type: "mcq", topic: "algebra", diff: "medium",
      text: "In an arithmetic sequence, the 3rd term is 10 and the 7th term is 26. What is the 10th term?",
      choices: ["34", "36", "38", "40", "42"],
      answer: 2,
      expl: "From the 3rd to the 7th term is 4 steps covering 16, so the common difference is 4. The 10th term is 3 steps past the 7th: 26 + 12 = 38.",
      tip: "Count steps BETWEEN terms (7th − 3rd = 4 steps), not the term numbers themselves." },
    { id: "qt_sq2", type: "num", topic: "algebra", diff: "easy",
      text: "In a sequence, a₁ = 2 and each subsequent term is 5 more than the previous term. What is the value of a₂₀?",
      answer: 97,
      expl: "a₂₀ = 2 + 19 × 5 = 97. There are 19 steps from the 1st term to the 20th — using 20 steps gives the off-by-one trap 102.",
      tip: "aₙ = a₁ + (n − 1)d. The −1 is where the points are lost." },
    { id: "qt_sq3", type: "mcq", topic: "arithmetic", diff: "medium",
      text: "What is the sum of the first 30 positive even integers?",
      choices: ["870", "900", "930", "960", "1860"],
      answer: 2,
      expl: "2 + 4 + … + 60 = 2(1 + 2 + … + 30) = 2 × 465 = 930. Or pair ends: (2 + 60) × 15 pairs = 930.",
      tip: "Sum of the first n even integers = n(n + 1); of the first n integers = n(n + 1)/2." }
  );

  /* ---------- Overlapping sets ---------- */
  Q.push(
    { id: "qt_os1", type: "mcq", topic: "arithmetic", diff: "easy",
      text: "In a class of 40 students, 25 take mathematics, 20 take physics, and 12 take both. How many students take neither subject?",
      choices: ["5", "7", "8", "12", "15"],
      answer: 1,
      expl: "At least one subject: 25 + 20 − 12 = 33. Neither: 40 − 33 = 7. Adding 25 + 20 without removing the overlap double-counts the 12.",
      tip: "Total = A + B − both + neither. Solve for whichever piece is missing." },
    { id: "qt_os2", type: "mcq", topic: "arithmetic", diff: "medium",
      text: "In a survey, 80 percent of respondents own a phone and 60 percent own a laptop. If every respondent owns at least one of the two, what percent own both?",
      choices: ["20%", "30%", "40%", "48%", "60%"],
      answer: 2,
      expl: "With nobody in the \"neither\" group: 100 = 80 + 60 − both, so both = 40%. The 48% distractor is 0.8 × 0.6 — multiplying percentages assumes independence, which isn't given.",
      tip: "Never multiply group percentages unless independence is stated; use inclusion–exclusion." },
    { id: "qt_os3", type: "num", topic: "arithmetic", diff: "medium",
      text: "Of 100 people surveyed, 65 drink tea, 50 drink coffee, and 20 drink neither. How many drink both tea and coffee?",
      answer: 35,
      expl: "At least one: 100 − 20 = 80. Both = 65 + 50 − 80 = 35.",
      tip: "Handle the \"neither\" group first — inclusion–exclusion applies only to the at-least-one pool." }
  );

  /* ---------- Work & rates ---------- */
  Q.push(
    { id: "qt_wr1", type: "mcq", topic: "arithmetic", diff: "easy",
      text: "Six identical machines, working together at the same constant rate, complete a job in 12 days. How many days would 8 such machines take?",
      choices: ["8", "9", "10", "14", "16"],
      answer: 1,
      expl: "The job takes 6 × 12 = 72 machine-days. With 8 machines: 72/8 = 9 days. Machines and days are inversely proportional — scaling 12 by 8/6 (getting 16) is the direction trap.",
      tip: "More workers → less time. Compute total worker-days first; it's invariant." },
    { id: "qt_wr2", type: "mcq", topic: "arithmetic", diff: "easy",
      text: "Working alone, Ana paints a room in 3 hours and Ben paints the same room in 6 hours. Working together at these rates, how long do they take to paint the room?",
      choices: ["1.5 hours", "2 hours", "2.5 hours", "4.5 hours", "9 hours"],
      answer: 1,
      expl: "Rates add: 1/3 + 1/6 = 1/2 room per hour → 2 hours. The average of the two times (4.5) is meaningless; the answer must beat the faster worker's solo time.",
      tip: "Sanity check: together always takes LESS time than the fastest individual." },
    { id: "qt_wr3", type: "num", topic: "arithmetic", diff: "easy",
      text: "A car travels at a constant speed of 45 miles per hour. How many miles does it travel in 40 minutes?",
      answer: 30,
      expl: "40 minutes is 2/3 of an hour: 45 × 2/3 = 30 miles.",
      tip: "Convert minutes to a fraction of an hour before touching the speed." }
  );

  /* ---------- Mixtures ---------- */
  Q.push(
    { id: "qt_mx1", type: "mcq", topic: "arithmetic", diff: "medium",
      text: "Two liters of a 30 percent acid solution are mixed with 4 liters of a 60 percent acid solution. What is the acid concentration of the mixture?",
      choices: ["40%", "45%", "50%", "54%", "55%"],
      answer: 2,
      expl: "Acid: 0.30(2) + 0.60(4) = 0.6 + 2.4 = 3 liters, in 6 liters total → 50%. The unweighted average 45% ignores that there's twice as much of the stronger solution.",
      tip: "Concentrations combine as a WEIGHTED average — weight by volume." },
    { id: "qt_mx2", type: "num", topic: "algebra", diff: "medium",
      text: "A grocer blends coffee costing $8 per pound with coffee costing $12 per pound to make 10 pounds of a blend costing $9 per pound. How many pounds of the $12 coffee are in the blend?",
      answer: 2.5,
      expl: "Let x be pounds of $12 coffee: 12x + 8(10 − x) = 90 → 4x = 10 → x = 2.5. Check with distances: $9 is 3 times closer to $8 than to $12, so the cheap coffee gets 3 times the weight (7.5 vs 2.5).",
      tip: "The cheaper the target price, the more of the cheap component — weights are inverse to price distances." }
  );

  /* ---------- Counting & probability ---------- */
  Q.push(
    { id: "qt_cp1", type: "mcq", topic: "data", diff: "medium",
      text: "A shelf has room for 4 books in a row. If 6 different books are available, how many different arrangements of 4 books are possible?",
      choices: ["15", "24", "120", "360", "1296"],
      answer: 3,
      expl: "Order matters on a shelf: 6 × 5 × 4 × 3 = 360. Choosing without order gives C(6,4) = 15, and 6⁴ = 1296 wrongly allows repeats.",
      tip: "\"Arrangements\" = order matters = permutations. \"Selections/committees\" = combinations." },
    { id: "qt_cp2", type: "mcq", topic: "data", diff: "medium",
      text: "Two independent events have probabilities 0.3 and 0.5 of occurring. What is the probability that at least one of them occurs?",
      choices: ["0.15", "0.35", "0.65", "0.80", "0.85"],
      answer: 2,
      expl: "P(at least one) = 1 − P(neither) = 1 − (0.7)(0.5) = 0.65. Adding 0.3 + 0.5 = 0.8 double-counts the case where both occur.",
      tip: "\"At least one\" → complement of \"none\"; probabilities of independent complements multiply." },
    { id: "qt_cp3", type: "mcq", topic: "data", diff: "easy",
      text: "From a group of 5 people, how many different 2-person teams can be formed?",
      choices: ["10", "15", "20", "25", "120"],
      answer: 0,
      expl: "C(5,2) = (5 × 4)/2 = 10. Counting ordered pairs gives 20 — but a team of A-and-B is the same team as B-and-A.",
      tip: "Divide out the orderings (k!) whenever the group has no internal order." }
  );

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
        expl: "The median of 30 values averages the 15th and 16th. Cumulative counts: 4, 12, 21 — so values 13 through 21 are all \"2 books.\" Both middle values are 2.",
        tip: "In a frequency chart, walk the cumulative count to positions n/2 and n/2 + 1." },
      { id: "qt_di1b", type: "mcq", topic: "data", diff: "medium",
        text: "The average (arithmetic mean) number of books read is closest to which of the following?",
        choices: ["1.5", "1.7", "1.9", "2.1", "2.3"],
        answer: 2,
        expl: "Total books: 0(4) + 1(8) + 2(9) + 3(6) + 4(3) = 56. Mean = 56/30 ≈ 1.87 → closest to 1.9.",
        tip: "Frequency-chart means are weighted: multiply each value by its bar height, then divide by total count." },
      { id: "qt_di1c", type: "mcq", topic: "data", diff: "medium",
        text: "What percent of the students read at least 3 books?",
        choices: ["10%", "20%", "30%", "40%", "45%"],
        answer: 2,
        expl: "At least 3 means the last two bars: 6 + 3 = 9 students; 9/30 = 30%.",
        tip: "\"At least 3\" includes 3 itself — misreading it as \"more than 3\" gives 10%." }
    ]
  });
})();
