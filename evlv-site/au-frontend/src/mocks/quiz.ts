export const quizQuestions = [
  {
    id: 'goal',
    title: 'What would you like to change first?',
    helper: 'Choose the one that matters most right now.',
    type: 'single',
    options: [
      {
        id: 'plateau',
        label: 'Break through a weight plateau',
        hint: 'The scale has not moved in months',
        weights: { glp2: 3, glp3: 2 },
      },
      {
        id: 'sustainable',
        label: 'Steady, sustainable fat loss',
        hint: 'Roughly 5 to 10kg, and keeping it off',
        weights: { glp1: 3, glp2: 1 },
      },
      {
        id: 'metabolic',
        label: 'More energy and better metabolic health',
        hint: 'Blood sugar, sleep, the numbers on a lab report',
        weights: { glp1: 2, labs: 3 },
      },
      {
        id: 'composition',
        label: 'Tone, recovery and body composition',
        hint: 'Stronger, firmer, less sore after training',
        weights: { peptides: 3, glp2: 1 },
      },
    ],
  },
  {
    id: 'history',
    title: 'How long have you been working on this?',
    helper: 'There is no wrong answer here.',
    type: 'single',
    options: [
      {
        id: 'starting',
        label: 'This is the start for me',
        hint: 'I want guidance before I begin',
        weights: { glp1: 3, labs: 1 },
      },
      {
        id: 'months',
        label: 'A few months of trying on my own',
        hint: 'Diet, walking, the usual',
        weights: { glp1: 1, glp2: 2 },
      },
      {
        id: 'years',
        label: 'More than a year of trying',
        hint: 'It has been a long road',
        weights: { glp2: 2, glp3: 3 },
      },
      {
        id: 'restart',
        label: 'I am coming back after a break',
        hint: 'I stopped and want to restart properly',
        weights: { glp1: 2, labs: 2 },
      },
    ],
  },
  {
    id: 'lifestyle',
    title: 'Which of these sound like you?',
    helper: 'Select everything that applies.',
    type: 'multiple',
    options: [
      { id: 'desk', label: 'Desk job, little time to cook', hint: '', weights: { glp1: 1 } },
      { id: 'eating-out', label: 'Eating out or ordering in most days', hint: '', weights: { glp1: 1, glp2: 1 } },
      { id: 'training', label: 'Training or strength work each week', hint: '', weights: { peptides: 2 } },
      { id: 'steps', label: 'Walking most days', hint: '', weights: { glp1: 1 } },
      { id: 'sleep', label: 'Sleep is not great', hint: '', weights: { labs: 1, glp2: 1 } },
      { id: 'stress', label: 'Stress runs the week', hint: '', weights: { labs: 1 } },
    ],
  },
  {
    id: 'health',
    title: 'Has any of these ever been flagged for you?',
    helper: 'This helps your expert choose the safest starting point.',
    type: 'single',
    options: [
      { id: 'insulin', label: 'Insulin resistance or prediabetes', hint: '', weights: { glp2: 2, labs: 2 } },
      { id: 'hormonal', label: 'PCOS or a hormonal imbalance', hint: '', weights: { glp2: 2, labs: 1 } },
      { id: 'cardio', label: 'Blood pressure or cholesterol', hint: '', weights: { glp1: 1, labs: 1 } },
      { id: 'clear', label: 'Nothing that I know of', hint: '', weights: { glp1: 1 } },
      { id: 'private', label: 'Prefer not to say right now', hint: '', weights: {} },
    ],
  },
  {
    id: 'experience',
    title: 'Have you used prescription weight management before?',
    helper: 'This changes what your expert would recommend.',
    type: 'single',
    options: [
      { id: 'never', label: 'Never', hint: 'This would be my first', weights: { glp1: 3 } },
      { id: 'current', label: 'Yes, I am on one now', hint: 'Looking for better support', weights: { glp2: 2, glp3: 1 } },
      {
        id: 'stopped',
        label: 'I tried one and stopped',
        hint: 'Side effects or supply got in the way',
        weights: { glp3: 2, glp2: 1 },
      },
      {
        id: 'gentle',
        label: 'I would rather avoid injections',
        hint: 'Open to other approaches',
        weights: { peptides: 1, labs: 1 },
      },
    ],
  },
  {
    id: 'priorities',
    title: 'What matters most in a plan?',
    helper: 'Select up to three.',
    type: 'multiple',
    options: [
      { id: 'weekly', label: 'Once-weekly dosing only', hint: '', weights: { glp1: 2 } },
      { id: 'cost', label: 'The lowest monthly cost', hint: '', weights: { glp1: 2 } },
      { id: 'fast', label: 'The fastest visible change', hint: '', weights: { glp3: 2, glp2: 1 } },
      { id: 'tolerable', label: 'The gentlest side-effect profile', hint: '', weights: { glp1: 2 } },
      { id: 'discreet', label: 'Discreet delivery', hint: '', weights: {} },
      { id: 'recovery', label: 'Recovery and strength support', hint: '', weights: { peptides: 2 } },
    ],
  },
];

export const quizRecommendations = [
  {
    key: 'glp1',
    tier: 'Foundation protocol',
    name: 'GLP-1 · Semaglutide',
    href: '/treatments/glp-1',
    price: '$124.99 / month',
    summary:
      'A single-pathway, once-weekly injection at the lowest monthly price. This is the usual starting point for a first prescription.',
    reasons: [
      'Fits a first-time or restarting profile with a steady, sustainable goal.',
      'One injection a week, so the routine is simple enough to actually keep.',
      'Expert-titrated, so the dose climbs slowly and side effects stay manageable.',
    ],
  },
  {
    key: 'glp2',
    tier: 'Dual-action protocol',
    name: 'GLP-2 · Tirzepatide',
    href: '/treatments/glp-2',
    price: '$289.99 / month',
    summary:
      'Two receptor pathways instead of one, for women who have stalled on a single-pathway treatment.',
    reasons: [
      'Built for a plateau: months of effort with the scale refusing to move.',
      'Metabolic flags such as insulin resistance or PCOS suit a dual-action approach.',
      'Still once weekly, with the same expert check-ins as the foundation plan.',
    ],
  },
  {
    key: 'glp3',
    tier: 'Advanced protocol',
    name: 'GLP-3 · Retatrutide',
    href: '/treatments/glp-3',
    price: '$399.99 / month',
    summary:
      'The newest triple agonist in the line. It is prescribed more selectively and monitored more closely.',
    reasons: [
      'Suggested for a long history, or a previous treatment that stopped working.',
      'Triple pathway action makes it the most closely watched option we offer.',
      'An expert confirms eligibility before anything is dispensed.',
    ],
  },
  {
    key: 'peptides',
    tier: 'Recovery and composition protocol',
    name: 'Peptide programme',
    href: '/treatments/bpc-157',
    price: 'From $149.99 / month',
    summary:
      'Expert-reviewed peptides for recovery, body composition and training load, rather than appetite alone.',
    reasons: [
      'You put training, recovery or body composition ahead of appetite.',
      'Peptides are prescribed and reviewed the same way as any other treatment here.',
      'An expert explains the evidence and approval status before you start.',
    ],
  },
  {
    key: 'labs',
    tier: 'Baseline first',
    name: 'Baseline Lab Panel',
    href: '/treatments/labs',
    price: '$89.00 one-off',
    summary:
      'A baseline panel before treatment, so your expert prescribes from data instead of guesswork.',
    reasons: [
      'Your answers point to metabolic numbers worth seeing before medication.',
      'Results feed straight into your assessment with an expert.',
      'A sensible first step if you are still deciding between the GLP options.',
    ],
  },
];

export const quizTrustPoints = [
  'Every result is reviewed by an expert',
  'No payment until an expert approves your plan',
  'Free, discreet delivery, Australia wide',
];

export const quizAnalyzingSteps = [
  'Analysing your answers',
  'Matching you with a clinical protocol',
  'Checking eligibility with an expert',
];

export const quizIntroFacts = [
  { value: '60', label: 'seconds to finish' },
  { value: '6', label: 'short questions' },
  { value: '0', label: 'cost, no card needed' },
];