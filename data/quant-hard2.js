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
      expl: "By AM–GM (or by testing), xy is maximized when x = y = 1/2, giving xy = 1/4 — equality is possible. Any unequal split (say x = 0.9, y = 0.1, xy = 0.09) makes B greater. Since \"equal\" and \"B greater\" both occur, the answer is (D).",
      tip: "A quantity with a maximum that exactly equals the other side is a classic (D) setup: test the extreme AND a middle case." },
    { id: "q2h_qc2", type: "qc", topic: "arithmetic", diff: d,
      info: "n is a positive integer",
      qa: "(−1)<sup>n</sup> + (−1)<sup>n+1</sup>", qb: "0",
      answer: 2,
      expl: "n and n + 1 have opposite parity, so one power is +1 and the other is −1 — for every n the sum is 0. Equal. Testing n = 1 and n = 2 both give 0; the variables here cannot actually vary the outcome.",
      tip: "Variables in the quantities don't automatically mean (D); check whether the expression is invariant." },
    { id: "q2h_qc3", type: "qc", topic: "data", diff: d,
      info: "Set S consists of the numbers 2, 4, 6, 8, and x.",
      qa: "The standard deviation of S when x = 5", qb: "The standard deviation of S when x = 2",
      answer: 1,
      expl: "With x = 5 the new value sits at the center of the set (mean 5), adding no spread. With x = 2 it duplicates an extreme value and drags the mean to 4.4, so every deviation grows. Computing confirms it: variance 4 versus 5.44. B is greater.",
      tip: "You never need the SD formula on the GRE — ask which version puts values closer to the mean." },
    { id: "q2h_qc4", type: "qc", topic: "data", diff: d,
      info: "A fair six-sided die is rolled twice.",
      qa: "The probability that the second roll is greater than the first",
      qb: "1/2",
      answer: 1,
      expl: "Of 36 equally likely ordered pairs, 6 are ties. The remaining 30 split symmetrically: 15 have the second roll greater. P = 15/36 = 5/12 < 1/2. The trap is forgetting that ties eat probability from both sides.",
      tip: "\"Greater / less / equal\" outcomes must sum to 1 — symmetry gives greater = less = (1 − P(tie))/2." },
    { id: "q2h_qc5", type: "qc", topic: "algebra", diff: d,
      info: "0 < a < b < 1",
      qa: "a<sup>b</sup>", qb: "b<sup>a</sup>",
      answer: 1,
      expl: "Test a = 1/4, b = 1/2: A = (1/4)<sup>1/2</sup> = 1/2, while B = (1/2)<sup>1/4</sup> ≈ 0.84. B is greater — and always is: B has the larger base AND the smaller exponent, and for bases below 1 a smaller exponent means a larger value, so both effects push the same way.",
      tip: "Between 0 and 1, raising to a bigger power makes numbers smaller — exponents work \"backwards\" there." },
    { id: "q2h_qc6", type: "qc", topic: "algebra", diff: d,
      info: "x² = 16 and y² = 9",
      qa: "x + y", qb: "1",
      answer: 3,
      expl: "x is 4 or −4, y is 3 or −3, so x + y is 7, 1, −1, or −7. It can equal 1 (x = 4, y = −3) and it can exceed 1 — cannot be determined. The trap is treating x² = 16 as x = 4.",
      tip: "x² = k always has two roots; enumerate every sign combination before comparing." },
    { id: "q2h_qc7", type: "qc", topic: "geometry", diff: d,
      info: "A rectangle has perimeter 20.",
      qa: "The area of the rectangle", qb: "24",
      answer: 3,
      expl: "Length + width = 10. Area peaks at 5 × 5 = 25 and can be arbitrarily small (9.9 × 0.1 = 0.99). Since areas both above and below 24 are possible, (D). Fixing the perimeter does not fix the area.",
      tip: "Perimeter pins the sum of the sides, not their product — squash the rectangle flat to find the extreme." },
    { id: "q2h_qc8", type: "qc", topic: "arithmetic", diff: d,
      info: "n is an integer greater than 1",
      qa: "The number of positive factors of n²", qb: "Twice the number of positive factors of n",
      answer: 3,
      expl: "n = 2: n² = 4 has 3 factors, but 2 × (factors of 2) = 4 — B greater. n = 12: 144 has 15 factors, but 2 × 6 = 12 — A greater. (D). Factor counts multiply as (exponent + 1) terms, so squaring roughly doubles each term minus one — sometimes more than doubling the product, sometimes less.",
      tip: "For factor-count comparisons, test one prime and one number with several prime factors." },
    { id: "q2h_qc9", type: "qc", topic: "algebra", diff: d,
      info: "x > 2",
      qa: "(x − 1)³", qb: "(x − 1)²",
      answer: 0,
      expl: "Let t = x − 1; the condition makes t > 1, and for t > 1, t³ > t². A is greater. Had the condition been 1 < x < 2 (so 0 < t < 1), cubing would have made it smaller — the given bound is what decides.",
      tip: "Substitute one variable for a repeated expression, then track which side of 1 it lives on." },
    { id: "q2h_qc10", type: "qc", topic: "arithmetic", diff: d,
      qa: "The remainder when 6<sup>83</sup> is divided by 10",
      qb: "The units digit of 4<sup>41</sup>",
      answer: 0,
      expl: "Powers of 6 always end in 6, so the remainder mod 10 is 6. Units digits of 4 cycle 4, 6 with period 2; an odd exponent gives 4. 6 > 4 — A is greater.",
      tip: "\"Remainder when divided by 10\" and \"units digit\" are the same question in disguise." },
    { id: "q2h_qc11", type: "qc", topic: "data", diff: d,
      qa: "The number of different committees of 3 that can be chosen from 8 people",
      qb: "The number of different committees of 5 that can be chosen from 8 people",
      answer: 2,
      expl: "Choosing 3 to include is the same act as choosing 5 to exclude: C(8,3) = C(8,5) = 56. Equal — no computation needed once you see the complement.",
      tip: "C(n, k) = C(n, n−k). Choosing who's in is choosing who's out." },
    { id: "q2h_qc12", type: "qc", topic: "algebra", diff: d,
      info: "|x − 3| ≤ 2 and |y + 1| ≤ 2",
      qa: "The greatest possible value of x − y", qb: "8",
      answer: 2,
      expl: "x ranges over [1, 5] and y over [−3, 1]. x − y is maximized at x = 5, y = −3: 5 − (−3) = 8. Equal. To maximize a difference, push the two variables to opposite ends of their ranges.",
      tip: "Unwrap each absolute value into an interval first; extremes of a difference come from opposite endpoints." }
  );

  /* ---------- Multiple Choice ---------- */
  Q.push(
    { id: "q2h_mc1", type: "mcq", topic: "data", diff: d,
      text: "A committee of 4 people is to be selected from 5 women and 4 men. How many different committees include at least one man?",
      choices: ["105", "120", "121", "125", "126"],
      answer: 2,
      expl: "Count all committees and subtract the all-woman ones: C(9,4) − C(5,4) = 126 − 5 = 121. Counting \"at least one\" directly requires four overlapping cases; the complement takes one line. 126 is the trap of forgetting to subtract.",
      tip: "\"At least one\" in counting = total minus \"none.\"" },
    { id: "q2h_mc2", type: "mcq", topic: "data", diff: d,
      text: "A box contains 4 defective and 8 working bulbs. If 2 bulbs are drawn at random without replacement, what is the probability that exactly one is defective?",
      choices: ["8/33", "14/33", "16/33", "4/11", "2/3"],
      answer: 2,
      expl: "Defective-then-working: (4/12)(8/11) = 32/132. Working-then-defective: (8/12)(4/11) = 32/132. \"Exactly one\" includes both orders: 64/132 = 16/33. Half of that (8/33) is the single-order trap.",
      tip: "\"Exactly one\" hides two orderings — multiply by 2 or you're counting only one path." },
    { id: "q2h_mc3", type: "mcq", topic: "data", diff: d,
      text: "Each of 150 students studies at least one of French and Spanish. If 95 study French and 105 study Spanish, how many study both languages?",
      choices: ["40", "45", "50", "55", "60"],
      answer: 2,
      expl: "With no \"neither\" group, Total = F + S − Both: 150 = 95 + 105 − Both, so Both = 50. The overlap is exactly the double-counted excess (200 − 150).",
      tip: "\"Each studies at least one\" means the neither-group is 0 — then overlap = (sum of groups) − total." },
    { id: "q2h_mc4", type: "mcq", topic: "arithmetic", diff: d,
      text: "Solution X is 10 percent salt and solution Y is 25 percent salt, by volume. How many liters of Y must be added to 6 liters of X to obtain a solution that is 20 percent salt?",
      choices: ["6", "8", "9", "12", "15"],
      answer: 3,
      expl: "Salt balance: 0.10(6) + 0.25y = 0.20(6 + y) → 0.6 + 0.25y = 1.2 + 0.20y → 0.05y = 0.6 → y = 12. Sanity check: 20% sits twice as far from 10% as from 25%, so you need twice as much Y as X.",
      tip: "Mixture shortcuts: the ratio of amounts is the inverse ratio of distances to the target concentration." },
    { id: "q2h_mc5", type: "mcq", topic: "arithmetic", diff: d,
      text: "Pipe A alone fills a tank in 4 hours and pipe B alone fills it in 6 hours. With both pipes open and a drain open, the tank fills in 3 hours. Working alone, how long would the drain take to empty a full tank?",
      choices: ["8 hours", "10 hours", "12 hours", "15 hours", "18 hours"],
      answer: 2,
      expl: "Rates: 1/4 + 1/6 − 1/d = 1/3. So 5/12 − 1/d = 4/12, giving 1/d = 1/12 — the drain empties the tank in 12 hours.",
      tip: "Work-rate problems: add filling rates, subtract emptying rates, all in tanks-per-hour." },
    { id: "q2h_mc6", type: "mcq", topic: "geometry", diff: d,
      text: "In the xy-plane, line k passes through the points (−2, 5) and (4, −7). Line m passes through the origin and is perpendicular to k. At what point do k and m intersect?",
      choices: ["(2/5, 1/5)", "(1/5, 2/5)", "(1, −1)", "(2, −3)", "(−2/5, −1/5)"],
      answer: 0,
      expl: "k has slope (−7 − 5)/(4 + 2) = −2, so k: y = −2x + 1. m is perpendicular through the origin: y = x/2. Setting x/2 = −2x + 1 gives x = 2/5, y = 1/5.",
      tip: "Perpendicular slope = negative reciprocal; then intersect by setting the two equations equal." },
    { id: "q2h_mc7", type: "mcq", topic: "algebra", diff: d,
      text: "In a sequence, a₁ = 3 and aₙ = 2aₙ₋₁ − 1 for n ≥ 2. What is the value of a₆?",
      choices: ["33", "63", "65", "95", "129"],
      answer: 2,
      expl: "Iterate: 3, 5, 9, 17, 33, 65. (Each term is 2<sup>n</sup> + 1, since doubling and subtracting 1 preserves the +1 offset.) a₆ = 65. Stopping a step early gives the trap answer 33.",
      tip: "For recursive sequences, write the terms out and COUNT them — off-by-one is the whole difficulty." },
    { id: "q2h_mc8", type: "mcq", topic: "algebra", diff: d,
      text: "If 2<sup>2x</sup> − 2<sup>x+1</sup> − 8 = 0, what is the value of x?",
      choices: ["1", "2", "3", "4", "8"],
      answer: 1,
      expl: "Substitute t = 2<sup>x</sup>: note 2<sup>2x</sup> = t² and 2<sup>x+1</sup> = 2t, so t² − 2t − 8 = 0 → (t − 4)(t + 2) = 0. Since t = 2<sup>x</sup> > 0, t = 4, so x = 2. The negative root must be discarded — an exponential is never negative.",
      tip: "Exponential equations with three terms usually hide a quadratic in disguise — substitute t for the base power." }
  );

  /* ---------- Multiple-answer ---------- */
  Q.push(
    { id: "q2h_ma1", type: "mcma", topic: "algebra", diff: d,
      text: "x is an integer and 12 < x² < 50. Which of the following could be the value of x?<br>Indicate <b>all</b> such values.",
      choices: ["−7", "−5", "−4", "3", "7"],
      answer: [0, 1, 2, 4],
      expl: "x² must lie strictly between 12 and 50, so |x| is 4, 5, 6, or 7. −7 (49), −5 (25), −4 (16), and 7 (49) all qualify; 3 gives 9, which is too small. Forgetting that negative values square to the same range is the classic miss here.",
      tip: "Solve for |x| first; every qualifying magnitude brings its negative twin along." },
    { id: "q2h_ma2", type: "mcma", topic: "data", diff: d,
      text: "The average (arithmetic mean) of five distinct positive integers is 10. Which of the following could be the median of the five integers?<br>Indicate <b>all</b> such values.",
      choices: ["2", "10", "14", "16"],
      answer: [1, 2],
      expl: "The sum is 50. Median 10 works (1, 2, 10, 17, 20). Median 14 works (1, 2, 14, 16, 17 — sum exactly 50). Median 2 fails: two distinct positive integers below 2 don't exist. Median 16 fails: the two above it must be at least 17 and 18, and 1 + 2 + 16 + 17 + 18 = 54 > 50.",
      tip: "Push the non-median values to their extremes (smallest possible below, largest needed above) and check the sum." },
    { id: "q2h_ma3", type: "mcma", topic: "geometry", diff: d,
      text: "Two sides of a triangle have lengths 5 and 9. Which of the following could be the length of the third side?<br>Indicate <b>all</b> such lengths.",
      choices: ["3", "4", "5", "13", "14"],
      answer: [2, 3],
      expl: "The third side must be strictly between 9 − 5 = 4 and 9 + 5 = 14. Only 5 and 13 fall inside the open interval; 4 and 14 make the \"triangle\" collapse into a line, and 3 violates the inequality outright.",
      tip: "Triangle inequality bounds are STRICT — the endpoints themselves never qualify." },
    { id: "q2h_ma4", type: "mcma", topic: "data", diff: d,
      text: "A list of 7 numbers has average (arithmetic mean) 20 and median 20. Which of the following must be true?<br>Indicate <b>all</b> such statements.",
      choices: [
        "The number 20 appears in the list",
        "At least three of the numbers are greater than or equal to 20",
        "Every number in the list is between 10 and 30"
      ],
      answer: [0, 1],
      expl: "With 7 (an odd count of) numbers, the median IS the 4th value, so 20 is in the list. The 4th through 7th values are all ≥ 20 — that's four, so \"at least three\" holds. The range claim fails: 0, 0, 0, 20, 40, 40, 40 has mean 20 and median 20.",
      tip: "Odd count → the median is an actual member of the list; even count → it may not be." }
  );

  /* ---------- Numeric Entry ---------- */
  Q.push(
    { id: "q2h_ne1", type: "num", topic: "arithmetic", diff: d,
      text: "Working alone, machine P produces 300 units in 5 hours, and machine Q produces 300 units in 3 hours. Working together at their constant rates, how many <b>minutes</b> do they take to produce 240 units?",
      answer: 90,
      expl: "Rates: 60 and 100 units per hour, 160 together. 240/160 = 1.5 hours = 90 minutes. The question asks for minutes — answering 1.5 is the units trap.",
      tip: "Re-read the units of the answer box before typing; hour-to-minute traps are deliberate." },
    { id: "q2h_ne2", type: "num", topic: "data", diff: d,
      text: "How many positive three-digit integers have three digits that are all different?",
      answer: 648,
      expl: "Hundreds digit: 9 choices (1–9). Tens: 9 remaining (0 now allowed, minus the used digit). Units: 8 remaining. 9 × 9 × 8 = 648.",
      tip: "Count slot by slot, and remember 0 is banned only from the leading position." },
    { id: "q2h_ne3", type: "num", topic: "arithmetic", diff: d,
      text: "The price of an item is increased by 25 percent, and the new price is then decreased by x percent, returning it exactly to its original price. What is the value of x?",
      answer: 20,
      expl: "1.25 × (1 − x/100) = 1 → 1 − x/100 = 0.8 → x = 20. The percent down is smaller than the percent up because it applies to a larger base — 25 back is the intuitive trap.",
      tip: "Undoing a +p% change never takes −p%; multiply the factors and set the product to 1." },
    { id: "q2h_ne4", type: "num", topic: "data", diff: d, frac: true, ansFrac: [1, 2],
      text: "Events A and B are independent, with P(A) = 1/3 and P(B) = 1/4. What is the probability that <b>neither</b> A nor B occurs?<br><i>Give your answer as a fraction.</i>",
      answer: 0.5,
      expl: "P(neither) = P(not A) × P(not B) = (2/3)(3/4) = 6/12 = 1/2. Independence lets the complements multiply. Computing 1 − 1/3 − 1/4 = 5/12 ignores the overlap and is the trap.",
      tip: "\"Neither\" under independence = product of the complements, not 1 minus the sum." }
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
        expl: "The median of 40 values is the average of the 20th and 21st. Cumulative counts: 6, then 18, then 32. Values 19 through 32 sit in the 80–89 range, so both the 20th and 21st are there.",
        tip: "For grouped data, run the cumulative count until it crosses n/2." },
      { id: "q2h_di1b", type: "mcq", topic: "data", diff: d,
        text: "What percent of the students scored below 80?",
        choices: ["30%", "36%", "45%", "55%", "65%"],
        answer: 2,
        expl: "Below 80 means the first two ranges: 6 + 12 = 18 students. 18/40 = 45%.",
        tip: "Check the boundary carefully — \"below 80\" excludes the 80–89 range entirely." },
      { id: "q2h_di1c", type: "num", topic: "data", diff: d,
        text: "How many more students scored in the 80–89 range than in the 60–69 range?",
        answer: 8,
        expl: "14 − 6 = 8.",
        tip: "Direct read-off — bank this time for the harder questions in the set." }
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
        expl: "Ratios: 2019: 60/40 = 1.50; 2020: 62/44 ≈ 1.41; 2021: 66/55 = 1.20; 2022: 72/50 = 1.44; 2023: 75/60 = 1.25. The greatest is 2019 — even though the trade gap in dollars was widest in 2022, the RATIO peaked when exports were smallest.",
        tip: "Largest gap and largest ratio are different questions; divide, don't subtract." },
      { id: "q2h_di2b", type: "mcq", topic: "data", diff: d,
        text: "From 2019 to 2023, exports increased by what percent?",
        choices: ["20%", "33%", "50%", "60%", "150%"],
        answer: 2,
        expl: "(60 − 40)/40 = 50%. Using the 2023 value as the base gives 33% — the wrong-base trap.",
        tip: "Percent change always divides by the STARTING value." },
      { id: "q2h_di2c", type: "num", topic: "data", diff: d,
        text: "What was the average (arithmetic mean) of Country Z's annual imports over the five years, in billions of dollars?",
        answer: 67,
        expl: "(60 + 62 + 66 + 72 + 75)/5 = 335/5 = 67.",
        tip: "Sum in pairs that make round numbers (60+75, 62+72…) to stay fast and accurate." }
    ]
  });
})();
