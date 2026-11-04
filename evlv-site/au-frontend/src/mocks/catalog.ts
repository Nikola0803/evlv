export const careCategories = [
  {
    slug: 'weight-loss',
    label: 'Weight Loss',
    blurb: 'GLP-1, GLP-2 and GLP-3 treatment guided by a licensed Australian provider and built around your goals.',
  },
  {
    slug: 'peptides',
    label: 'RX Peptides',
    blurb:
      'Prescribed RX peptides — not research vials. Reviewed by a licensed provider for recovery, body composition, and immune support, and available to women and their partners.',
  },
  {
    slug: 'hair-growth',
    label: 'Hair Growth',
    blurb: 'Clinically reviewed options for thinning hair, shedding, and regrowth.',
  },
  {
    slug: 'skin-care',
    label: 'Skin Care',
    blurb: 'Prescription skincare for texture, breakouts, and the visible signs of aging.',
  },
  {
    slug: 'labs',
    label: 'Labs & Testing',
    blurb: 'At-home testing with results reviewed and explained by a real clinician.',
  },
];

export const treatmentDetails = [
  {
    slug: 'glp-1',
    name: 'GLP-1',
    generic: 'Semaglutide',
    category: 'weight-loss',
    price: '$124',
    cents: '.99',
    cadence: 'per piece',
    image:
      '/images/products/au-cutouts/evlv-1-10mg.webp',
    tagline: 'Once-weekly semaglutide, the starting point for most patients.',
    summary:
      'GLP-1 is our entry-level weight treatment: a once-weekly semaglutide injection that slows digestion and quiets appetite signals. Your EVLV provider starts you low, reviews how your body responds, and moves you up only when it is the right call.',
    highlights: [
      'One injection per week, on a day that fits your life',
      'Dose titrated by your provider, never guessed',
      'Free, discreet delivery with signature on arrival',
    ],
    facts: [
      { label: 'Format', value: 'Weekly injection pen' },
      { label: 'Class', value: 'GLP-1 receptor agonist' },
      { label: 'Assessment', value: 'Free online review' },
      { label: 'Delivery', value: '2-3 business days' },
    ],
    included: [
      'Free online assessment with a licensed Australian provider',
      'Prescription, if appropriate, filled by a licensed pharmacy',
      'Ongoing check-ins and dose adjustments',
      'Discreet, unbranded packaging',
    ],
    goodFor:
      'Women starting medical weight support for the first time, who want a well-studied option and a clinician watching their progress week to week.',
  },
  {
    slug: 'glp-2',
    name: 'GLP-2',
    generic: 'Tirzepatide',
    category: 'weight-loss',
    price: '$289',
    cents: '.99',
    cadence: 'per piece',
    image:
      '/images/products/au-cutouts/evlv-2-30mg.webp',
    tagline: 'Dual-action tirzepatide for patients who need a step up.',
    summary:
      'GLP-2 is tirzepatide, a once-weekly injection that acts on two incretin receptors rather than one. Providers often move patients here when a single-pathway treatment has not moved the needle enough, or when appetite response has plateaued.',
    highlights: [
      'Dual receptor action in a single weekly dose',
      'Step-by-step titration with your provider',
      'Ongoing monitoring through your care plan',
    ],
    facts: [
      { label: 'Format', value: 'Weekly injection pen' },
      { label: 'Class', value: 'GIP / GLP-1 dual agonist' },
      { label: 'Assessment', value: 'Free online review' },
      { label: 'Delivery', value: '2-3 business days' },
    ],
    included: [
      'Free online assessment with a licensed Australian provider',
      'Prescription filled by a licensed pharmacy, if appropriate',
      'Ongoing dose review and support',
      'Free discreet shipping in unbranded packaging',
    ],
    goodFor:
      'Women who have already tried a GLP-1, or who want a dual-action option with a structured titration plan and regular clinician oversight.',
  },
  {
    slug: 'glp-3',
    name: 'GLP-3',
    generic: 'Retatrutide',
    category: 'weight-loss',
    price: '$399',
    cents: '.99',
    cadence: 'per piece',
    image:
      '/images/products/au-cutouts/evlv-3-30mg.webp',
    tagline: 'Triple-agonist retatrutide, the newest option in our protocol.',
    summary:
      'GLP-3 is retatrutide, a triple agonist that works on GLP-1, GIP and glucagon pathways at once. It is the most recent addition to the EVLV weight protocol and the one we monitor most closely, because it is still under clinical investigation in Australia.',
    highlights: [
      'Triple pathway action in one weekly dose',
      'Starting dose set only after your provider reviews your history',
      'Closer follow-up while the evidence base develops',
    ],
    facts: [
      { label: 'Format', value: 'Weekly injection pen' },
      { label: 'Class', value: 'GLP-1 / GIP / glucagon tri-agonist' },
      { label: 'Assessment', value: 'Free online review' },
      { label: 'Delivery', value: '2-3 business days' },
    ],
    included: [
      'Free online assessment with a licensed Australian provider',
      'Prescription, if appropriate, filled by a licensed pharmacy',
      'More frequent check-ins during titration',
      'Free discreet shipping in unbranded packaging',
    ],
    goodFor:
      'Women who have discussed retatrutide with their provider and want the closest available monitoring while the clinical picture continues to develop.',
  },
  {
    slug: 'bpc-157',
    name: 'BPC-157',
    generic: 'Body protection compound',
    category: 'peptides',
    price: '$149',
    cents: '.99',
    cadence: 'per piece',
    image:
      '/images/products/au-cutouts/bpc-157-10mg.webp',
    tagline: 'A peptide studied for recovery and gut lining support.',
    summary:
      'BPC-157 is a synthetic peptide that comes up often in recovery conversations. It is not TGA approved, so your EVLV provider reviews your history first and is upfront about what the evidence does and does not support.',
    highlights: [
      'Provider-reviewed before anything is dispensed',
      'Straight talk about where the evidence stands',
      'Reconstitution and storage guidance included',
    ],
    facts: [
      { label: 'Format', value: 'Subcutaneous vial' },
      { label: 'Class', value: 'Synthetic peptide' },
      { label: 'Status', value: 'Not TGA approved' },
      { label: 'Delivery', value: '2-3 business days' },
    ],
    included: [
      'Free online assessment with a licensed Australian provider',
      'Vial, supplies and storage instructions',
      'Check-ins during the first month',
      'Free discreet shipping in unbranded packaging',
    ],
    goodFor:
      'Women researching recovery support who want a clinician to review their history first rather than ordering blind.',
  },
  {
    slug: 'cjc-1295-ipamorelin',
    name: 'CJC-1295 + Ipamorelin',
    generic: 'Growth hormone secretagogue',
    category: 'peptides',
    price: '$189',
    cents: '.99',
    cadence: 'per piece',
    image:
      '/images/products/au-cutouts/cjc-ipa-blend-10mg.webp',
    tagline: 'A paired protocol for body composition and recovery.',
    summary:
      'CJC-1295 and ipamorelin are used together as a growth hormone secretagogue protocol. Providers consider it for body composition, sleep and recovery goals, and will tell you plainly when it is not appropriate for you.',
    highlights: [
      'Two-peptide protocol, planned by your provider',
      'Dosing schedule matched to your routine',
      'Progress reviewed at each refill',
    ],
    facts: [
      { label: 'Format', value: 'Two subcutaneous vials' },
      { label: 'Class', value: 'GH secretagogue' },
      { label: 'Status', value: 'Not TGA approved' },
      { label: 'Delivery', value: '2-3 business days' },
    ],
    included: [
      'Free online assessment with a licensed Australian provider',
      'Both vials, supplies and storage guidance',
      'Dosing plan written out in plain language',
      'Free discreet shipping in unbranded packaging',
    ],
    goodFor:
      'Women focused on body composition, sleep quality and recovery who want a provider-managed plan rather than a self-directed protocol.',
  },
  {
    slug: 'thymosin-alpha-1',
    name: 'Thymosin Alpha-1',
    generic: 'Immune support peptide',
    category: 'peptides',
    price: '$199',
    cents: '.99',
    cadence: 'per piece',
    image:
      '/images/products/au-cutouts/thymosin-alpha-1-5mg.webp',
    tagline: 'An immune-focused peptide protocol, reviewed case by case.',
    summary:
      'Thymosin alpha-1 is studied for immune modulation. It is not TGA approved for general use, so EVLV treats it as a case-by-case conversation with a licensed provider rather than an off-the-shelf add-on.',
    highlights: [
      'Reviewed against your full health history',
      'Clear explanation of what it can and cannot do',
      'Provider check-ins through the protocol',
    ],
    facts: [
      { label: 'Format', value: 'Subcutaneous vial' },
      { label: 'Class', value: 'Immunomodulatory peptide' },
      { label: 'Status', value: 'Not TGA approved' },
      { label: 'Delivery', value: '2-3 business days' },
    ],
    included: [
      'Free online assessment with a licensed Australian provider',
      'Vial, supplies and storage instructions',
      'Follow-up review after the first month',
      'Free discreet shipping in unbranded packaging',
    ],
    goodFor:
      'Women with a specific immune-related question who want it reviewed by a clinician before starting anything.',
  },
  {
    slug: 'minoxidil',
    name: 'Minoxidil',
    generic: 'Topical / oral minoxidil',
    category: 'hair-growth',
    price: '$29',
    cents: '.99',
    cadence: 'per piece',
    image:
      'https://readdy.ai/api/search-image?query=Amber%20glass%20dropper%20bottle%20of%20topical%20hair%20treatment%20with%20a%20brushed%20champagne%20gold%20pipette%20cap%2C%20a%20cream%20bottle%20label%20printed%20with%20MINOXIDIL%20in%20thin%20champagne%20gold%20capitals%20and%20no%20black%20label%2C%20standing%20beside%20a%20slim%20matte%20cream%20carton%20printed%20with%20EVLV%20in%20thin%20champagne%20lettering%2C%20product%20centred%20with%20generous%20space%20around%20it%2C%20minimal%20luxury%20pharmaceutical%20pack%20shot%2C%20seamless%20warm%20ivory%20studio%20sweep%20backdrop%2C%20soft%20directional%20daylight%20from%20the%20left%2C%20gentle%20cast%20shadow%2C%20editorial%20and%20premium&width=900&height=900&seq=evlv-pack-minoxidil-03&orientation=squarish',
    tagline: 'A first-line option for thinning hair and a widening part.',
    summary:
      'Minoxidil is one of the most studied treatments for pattern hair loss. Your EVLV provider reviews your history and photos, then recommends a format and strength that fit your routine.',
    highlights: [
      'Studied in women with female pattern hair loss',
      'Topical or oral format, chosen with your provider',
      'Progress reviewed with photos over time',
    ],
    facts: [
      { label: 'Format', value: 'Topical solution or tablet' },
      { label: 'Class', value: 'Vasodilator' },
      { label: 'Assessment', value: 'Free online review' },
      { label: 'Delivery', value: '2-3 business days' },
    ],
    included: [
      'Free online assessment with a licensed Australian provider',
      'Prescription, if appropriate, filled by a licensed pharmacy',
      'Photo-based progress check-ins',
      'Free discreet shipping in unbranded packaging',
    ],
    goodFor:
      'Women noticing early thinning or a widening part who want to act before more hair is lost.',
  },
  {
    slug: 'tretinoin',
    name: 'Tretinoin',
    generic: 'Topical tretinoin',
    category: 'skin-care',
    price: '$39',
    cents: '.99',
    cadence: 'per piece',
    image:
      'https://readdy.ai/api/search-image?query=Matte%20cream%20skincare%20tube%20with%20a%20brushed%20champagne%20gold%20cap%20lying%20on%20a%20warm%20ivory%20surface%2C%20the%20tube%20printed%20with%20TRETINOIN%20in%20thin%20champagne%20gold%20capital%20letters%20as%20part%20of%20the%20packaging%20and%20no%20black%20label%2C%20beside%20a%20small%20matte%20cream%20carton%20printed%20with%20EVLV%20in%20thin%20champagne%20lettering%2C%20product%20centred%20with%20generous%20space%20around%20it%2C%20minimal%20luxury%20skincare%20pack%20shot%2C%20seamless%20warm%20ivory%20studio%20sweep%20backdrop%2C%20soft%20directional%20daylight%20from%20the%20left%2C%20gentle%20cast%20shadow%2C%20editorial%20and%20refined&width=900&height=900&seq=evlv-pack-tretinoin-03&orientation=squarish',
    tagline: 'Prescription retinoid for texture, breakouts, and fine lines.',
    summary:
      'Tretinoin is a prescription retinoid used for acne and photoaging. It is stronger than anything you can buy off the shelf, so your provider starts you at a strength your skin can actually tolerate.',
    highlights: [
      'Prescription-strength retinoid',
      'Strength and frequency ramped up gradually',
      'Provider guidance on routine and irritation',
    ],
    facts: [
      { label: 'Format', value: 'Topical cream' },
      { label: 'Class', value: 'Retinoid' },
      { label: 'Assessment', value: 'Free online review' },
      { label: 'Delivery', value: '2-3 business days' },
    ],
    included: [
      'Free online assessment with a licensed Australian provider',
      'Prescription, if appropriate, filled by a licensed pharmacy',
      'Routine guidance for the first weeks',
      'Free discreet shipping in unbranded packaging',
    ],
    goodFor:
      'Women dealing with persistent breakouts, texture, or early signs of aging who have not got where they want with over-the-counter products.',
  },
  {
    slug: 'labs',
    name: 'Baseline Lab Panel',
    generic: 'At-home bloodwork',
    category: 'labs',
    price: '$89',
    cents: '',
    cadence: 'one time',
    image:
      'https://readdy.ai/api/search-image?query=Compact%20matte%20cream%20at%20home%20blood%20test%20collection%20kit%20box%20printed%20with%20EVLV%20in%20thin%20letter%20spaced%20champagne%20gold%20capitals%2C%20a%20small%20glass%20collection%20tube%20and%20a%20folded%20instruction%20card%20beside%20it%2C%20product%20centred%20with%20generous%20space%20around%20it%2C%20minimal%20luxury%20diagnostics%20pack%20shot%2C%20seamless%20warm%20ivory%20studio%20sweep%20backdrop%2C%20soft%20directional%20daylight%20from%20the%20left%2C%20gentle%20cast%20shadow%2C%20no%20other%20text%20or%20logos%2C%20editorial%20and%20calm&width=900&height=900&seq=evlv-pack-labs-02&orientation=squarish',
    tagline: 'Know your numbers before you start treatment.',
    summary:
      'A baseline panel covering the markers your provider needs before prescribing, plus the ones worth tracking as you go. Results come back with a plain-language explanation instead of a raw PDF.',
    highlights: [
      'At-home collection or partner lab visit',
      'Reviewed by the clinician managing your care',
      'Results explained in plain language',
    ],
    facts: [
      { label: 'Format', value: 'At-home collection kit' },
      { label: 'Turnaround', value: '3-5 business days' },
      { label: 'Review', value: 'Included with your plan' },
      { label: 'Delivery', value: 'Free shipping both ways' },
    ],
    included: [
      'Collection kit shipped to your door',
      'Prepaid return shipping and lab processing',
      'Clinician review of every result',
      'A written summary you can share with your family doctor',
    ],
    goodFor:
      'Anyone starting treatment, or tracking how their body is responding to it, who wants real data rather than guesswork.',
  },
];