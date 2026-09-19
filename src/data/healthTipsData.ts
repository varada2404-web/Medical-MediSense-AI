import { HealthTip } from '../types';

export const HEALTH_TIPS_DATA: HealthTip[] = [
  {
    id: 'tip-1',
    category: 'Cardiovascular Health',
    title: 'Aerobic Exercise and Blood Pressure Regulation',
    summary:
      'Engaging in 150 minutes of moderate-intensity aerobic exercise per week supports endothelial elasticity and can reduce resting systolic blood pressure by 4–9 mmHg.',
    readTime: '3 min read',
    keyTakeaways: [
      'Brisk walking, cycling, or swimming for 30 minutes 5 days a week.',
      'Consistency is more impactful than occasional high-intensity exhaustion.',
      'Always warm up for 5 minutes and cool down gradually.',
    ],
    clinicalReference: 'AHA / ACC Hypertension Guidelines',
    tags: ['Blood Pressure', 'Heart Health', 'Exercise', 'Endothelium'],
  },
  {
    id: 'tip-2',
    category: 'Clinical Nutrition & Diet',
    title: 'Electrolyte Balance and Dietary Sodium Reduction',
    summary:
      'Balancing dietary sodium with potassium-rich foods (such as avocados, spinach, and sweet potatoes) facilitates healthy extracellular osmotic pressure and kidney filtration.',
    readTime: '4 min read',
    keyTakeaways: [
      'Target under 2,300 mg sodium daily, ideally moving toward 1,500 mg.',
      'Incorporate whole fruits, legumes, and dark greens rich in natural potassium.',
      'Read nutrition labels carefully for hidden sodium in processed sauces and broths.',
    ],
    clinicalReference: 'DASH Diet Nutritional Review, NIH / WHO',
    tags: ['Nutrition', 'Sodium', 'Kidneys', 'Potassium'],
  },
  {
    id: 'tip-3',
    category: 'Sleep & Circadian Recovery',
    title: 'Circadian Hygiene and Deep Phase Glymphatic Clearance',
    summary:
      'Maintaining consistent sleep-wake cycles synchronizes cortisol rhythm and optimizes glymphatic clearance of metabolic waste in the brain during slow-wave sleep.',
    readTime: '3 min read',
    keyTakeaways: [
      'Keep a steady bedtime and wake time within a 30-minute window every day.',
      'Eliminate high-frequency blue light exposure 60 minutes prior to resting.',
      'Keep your sleeping environment cool (around 65–68°F / 18–20°C) and completely dark.',
    ],
    clinicalReference: 'National Sleep Foundation Consensus Report',
    tags: ['Sleep', 'Circadian', 'Brain Health', 'Melatonin'],
  },
  {
    id: 'tip-4',
    category: 'Respiratory Medicine',
    title: 'Diaphragmatic Breathing and Autonomic Tone',
    summary:
      'Controlled slow diaphragmatic breathing stimulates vagal nerve activity, transitioning the body from sympathetic fight-or-flight into parasympathetic equilibrium.',
    readTime: '2 min read',
    keyTakeaways: [
      'Inhale slowly through the nose for 4 counts, expanding the lower abdomen.',
      'Hold gently for 2 counts, then exhale smoothly through the mouth for 6 counts.',
      'Practice 5 minutes upon waking and prior to bedtime to lower heart rate variability stress.',
    ],
    clinicalReference: 'Journal of Neurophysiology & Stress Medicine',
    tags: ['Breathing', 'Stress', 'Vagus Nerve', 'Pulmonary'],
  },
  {
    id: 'tip-5',
    category: 'Mental Health & Stress Regulation',
    title: 'Mindfulness, Cortisol Regulation & Neuroplasticity',
    summary:
      'Chronic unmitigated psychological stress elevates systemic serum cortisol, suppressing natural immune defense and provoking systemic micro-inflammation.',
    readTime: '4 min read',
    keyTakeaways: [
      'Engage in 10 minutes of daily mindfulness meditation or guided body scan.',
      'Establish firm work-life boundaries and digital disconnect intervals.',
      'Seek professional psychological counseling if anxiety impairs daily activities for over two weeks.',
    ],
    clinicalReference: 'American Psychological Association (APA) Stress Report',
    tags: ['Mental Health', 'Cortisol', 'Stress', 'Neuroplasticity'],
  },
  {
    id: 'tip-6',
    category: 'Diabetes & Glucose Management',
    title: 'Postprandial Glycemic Spikes and Fiber Preloading',
    summary:
      'Consuming soluble dietary fiber and healthy proteins prior to carbohydrates blunts rapid postprandial glucose surges and reduces insulin demand.',
    readTime: '4 min read',
    keyTakeaways: [
      'Begin meals with non-starchy vegetables or salads before eating starches.',
      'Take a light 10–15 minute walk after meals to promote GLUT4 muscle glucose uptake without insulin.',
      'Monitor fasting glucose and HbA1c periodically to assess long-term glycemic control.',
    ],
    clinicalReference: 'American Diabetes Association (ADA) Standards of Care',
    tags: ['Diabetes', 'Glucose', 'Insulin', 'Metabolism'],
  },
  {
    id: 'tip-7',
    category: 'Bone & Joint Health',
    title: 'Weight-Bearing Exercise and Osteopenia Prevention',
    summary:
      'Mechanical loading on long bones stimulates osteoblast bone remodeling, slowing mineral density loss and safeguarding against post-menopausal osteoporosis.',
    readTime: '3 min read',
    keyTakeaways: [
      'Perform resistance training, brisk walking, or stair climbing at least 3 times weekly.',
      'Ensure adequate dietary calcium (1,000–1,200 mg daily) and vitamin D3 for optimal absorption.',
      'Avoid high-impact falls through balance drills such as single-leg stands.',
    ],
    clinicalReference: 'National Osteoporosis Foundation (NOF) Clinical Practice Guidelines',
    tags: ['Bones', 'Joints', 'Calcium', 'Osteoporosis'],
  },
  {
    id: 'tip-8',
    category: "Women's Health & Hormones",
    title: 'Perimenopause, Estrogen Shifts and Cardiovascular Protection',
    summary:
      'Declining estrogen levels during perimenopause alter lipid profiles and vascular compliance, necessitating targeted cardiovascular screening.',
    readTime: '4 min read',
    keyTakeaways: [
      'Track monthly cycle regularity, vasomotor symptoms, and mood fluctuations.',
      'Incorporate phytoestrogen-rich legumes, flaxseeds, and omega-3 fatty acids.',
      'Schedule annual mammograms and cervical cancer screening per clinical guidelines.',
    ],
    clinicalReference: 'The Menopause Society & ACOG Guidelines',
    tags: ["Women's Health", 'Hormones', 'Cardiology', 'Screening'],
  },
  {
    id: 'tip-9',
    category: "Men's Preventive Health",
    title: 'Prostate Health, PSA Monitoring & Metabolic Vitality',
    summary:
      'Benign prostatic hyperplasia (BPH) and prostate screening require shared clinical decision-making beginning at age 50 (or 45 for higher-risk individuals).',
    readTime: '3 min read',
    keyTakeaways: [
      'Report changes in urinary flow stream, nocturnal frequency, or pelvic discomfort.',
      'Incorporate lycopene-rich cooked tomatoes and zinc-rich pumpkin seeds into your diet.',
      'Undergo annual metabolic panel screenings including lipid and androgen markers.',
    ],
    clinicalReference: 'American Urological Association (AUA) Best Practice Statement',
    tags: ["Men's Health", 'Prostate', 'PSA', 'Urology'],
  },
  {
    id: 'tip-10',
    category: 'Pediatrics & Child Wellness',
    title: 'Early Childhood Nutrition and Pediatric Immunization Schedules',
    summary:
      'Timely adherence to the standard pediatric vaccination calendar confers herd and individual protection against debilitating infectious pathogens.',
    readTime: '4 min read',
    keyTakeaways: [
      'Maintain an up-to-date pediatric immunization log with your pediatrician.',
      'Limit sedentary recreational screen time for young children to under 1 hour daily.',
      'Foster sensory-motor development through varied open-air outdoor play and varied whole foods.',
    ],
    clinicalReference: 'American Academy of Pediatrics (AAP) Bright Futures Guidelines',
    tags: ['Pediatrics', 'Vaccines', 'Child Development', 'Family'],
  },
  {
    id: 'tip-11',
    category: 'Senior & Geriatric Care',
    title: 'Sarcopenia Mitigation and Polypharmacy Review',
    summary:
      'Age-related loss of skeletal muscle mass (sarcopenia) accelerates frailty. Regular medication reconciliation reduces risk of adverse drug-drug interactions.',
    readTime: '4 min read',
    keyTakeaways: [
      'Target 1.0–1.2 grams of dietary protein per kilogram of body weight daily for healthy older adults.',
      'Review all prescription, OTC, and herbal supplements annually with a geriatrician.',
      'Perform home hazard checks to eliminate tripping risks like loose rugs and dim hallways.',
    ],
    clinicalReference: 'Beers Criteria / American Geriatrics Society Guidelines',
    tags: ['Geriatrics', 'Aging', 'Polypharmacy', 'Mobility'],
  },
  {
    id: 'tip-12',
    category: 'Dermatological & Skin Health',
    title: 'Broad-Spectrum UV Photoprotection & The ABCDE Melanoma Rule',
    summary:
      'Cumulative ultraviolet radiation induces DNA pyrimidine dimers in melanocytes. Daily SPF 30+ reduces squamous and melanoma skin cancer risk by over 50%.',
    readTime: '3 min read',
    keyTakeaways: [
      'Apply broad-spectrum water-resistant sunscreen (SPF 30 or higher) every morning.',
      'Inspect moles monthly using the ABCDE rule (Asymmetry, Border, Color, Diameter >6mm, Evolving).',
      'Promptly evaluate any non-healing sores or bleeding lesions with a certified dermatologist.',
    ],
    clinicalReference: 'American Academy of Dermatology (AAD) Photoprotection Protocol',
    tags: ['Dermatology', 'Skin Care', 'Melanoma', 'UV Protection'],
  },
  {
    id: 'tip-13',
    category: 'Ophthalmology & Vision Care',
    title: 'Digital Eye Strain (20-20-20 Rule) & Glaucoma Screening',
    summary:
      'Prolonged near-focus screen viewing decreases spontaneous blink rate from 18 to 4 times per minute, producing severe ocular surface desiccation.',
    readTime: '3 min read',
    keyTakeaways: [
      'Practice the 20-20-20 rule: every 20 minutes, look at an object 20 feet away for 20 seconds.',
      'Ensure adequate ambient workspace lighting to reduce monitor glare and pupil strain.',
      'Undergo dilated eye exams every 1–2 years to screen for silent intraocular pressure changes.',
    ],
    clinicalReference: 'American Academy of Ophthalmology (AAO) Eye Strain Report',
    tags: ['Vision', 'Eye Care', 'Glaucoma', 'Screen Fatigue'],
  },
  {
    id: 'tip-14',
    category: 'Gastroenterology & Gut Health',
    title: 'Dietary Microbiome Diversity and Short-Chain Fatty Acids (SCFAs)',
    summary:
      'Fermentation of diverse prebiotic plant fibers by colonic anaerobic bacteria yields acetate, propionate, and butyrate, strengthening gut mucosal barrier integrity.',
    readTime: '4 min read',
    keyTakeaways: [
      'Aim to eat 30 different plant foods (vegetables, fruits, herbs, grains, nuts) each week.',
      'Include naturally fermented foods such as kefir, plain yogurt, kimchi, or sauerkraut.',
      'Limit artificial sweeteners and ultra-processed emulsifiers that disrupt bacterial flora.',
    ],
    clinicalReference: 'American Gastroenterological Association (AGA) Microbiome Review',
    tags: ['Gut Health', 'Microbiome', 'Digestion', 'Fiber'],
  },
  {
    id: 'tip-15',
    category: 'Nephrology & Kidney Function',
    title: 'Estimated Glomerular Filtration Rate (eGFR) and Hydration',
    summary:
      'Kidneys filter approximately 180 liters of blood daily. Chronic dehydration, high-dose NSAID abuse, and unmanaged hypertension are leading causes of renal decline.',
    readTime: '3 min read',
    keyTakeaways: [
      'Avoid chronic daily reliance on over-the-counter NSAIDs (such as ibuprofen or naproxen).',
      'Monitor urine color: aim for pale straw yellow rather than dark amber.',
      'Check annual serum creatinine and urine albumin-to-creatinine ratio (uACR) if diabetic or hypertensive.',
    ],
    clinicalReference: 'National Kidney Foundation (NKF) KDOQI Clinical Guidelines',
    tags: ['Kidneys', 'Nephrology', 'Creatinine', 'Hydration'],
  },
  {
    id: 'tip-16',
    category: 'Immunology & Viral Defense',
    title: 'Adaptive Immunity, Vitamin D3 Sufficiency & Hand Hygiene',
    summary:
      'Innate and adaptive white blood cells express vitamin D nuclear receptors. Adequate serum 25(OH)D levels modulate cytokine release and lower upper respiratory infections.',
    readTime: '3 min read',
    keyTakeaways: [
      'Wash hands thoroughly with soap and water for at least 20 seconds during virus seasons.',
      'Test serum 25(OH)D levels and supplement under clinician guidance if deficient (<30 ng/mL).',
      'Get annual influenza and recommended booster immunizations before winter respiratory peaks.',
    ],
    clinicalReference: 'CDC Infection Prevention & WHO Immunization Strategy',
    tags: ['Immunology', 'Immunity', 'Vitamin D', 'Infection Control'],
  },
  {
    id: 'tip-17',
    category: 'Physical Fitness & Mobility',
    title: 'Zone 2 Cardiovascular Base & Functional Longevity',
    summary:
      'Low-intensity, steady-state Zone 2 training stimulates mitochondrial biogenesis and fat oxidation efficiency without taxing the central nervous system.',
    readTime: '4 min read',
    keyTakeaways: [
      'Maintain an exercise intensity where you can sustain nasal breathing or conversational speech.',
      'Combine 3–4 Zone 2 sessions weekly with 2 weekly multi-joint compound resistance sessions.',
      'Incorporate mobility stretching for hip flexors, hamstrings, and thoracic spine daily.',
    ],
    clinicalReference: 'American College of Sports Medicine (ACSM) Exercise Guidelines',
    tags: ['Fitness', 'Exercise', 'Cardio', 'Mitochondria'],
  },
  {
    id: 'tip-18',
    category: 'Preventive Health & Screenings',
    title: 'USPSTF Evidence-Based Preventive Health Screening Timelines',
    summary:
      'Early detection of asymptomatic chronic conditions through age-appropriate clinical screening significantly reduces 10-year all-cause mortality.',
    readTime: '4 min read',
    keyTakeaways: [
      'Begin colorectal cancer screening at age 45 (colonoscopy every 10 years or annual FIT test).',
      'Check fasting lipid panels every 4–6 years for adults aged 20+; annually for ages 40+.',
      'Schedule periodic skin, vision, blood pressure, and dental preventive checks.',
    ],
    clinicalReference: 'US Preventive Services Task Force (USPSTF) Recommendations',
    tags: ['Prevention', 'Screening', 'Checkups', 'Longevity'],
  },
  {
    id: 'tip-19',
    category: 'Cellular Hydration & Electrolytes',
    title: 'Water Osmolality, Mineral Density & Dehydration Markers',
    summary:
      'Even mild hypohydration (1–2% body mass loss) impairs cognitive processing speed, induces tension headaches, and elevates blood viscosity.',
    readTime: '3 min read',
    keyTakeaways: [
      'Consume water consistently across the day rather than chugging large volumes at once.',
      'Replenish electrolytes (sodium, potassium, magnesium) during heavy endurance sweating or illness.',
      'Monitor thirst cues, dry mouth, and postural dizziness as warning signs of fluid deficit.',
    ],
    clinicalReference: 'European Journal of Clinical Nutrition / Institute of Medicine (IOM)',
    tags: ['Hydration', 'Electrolytes', 'Water', 'Brain Function'],
  },
  {
    id: 'tip-20',
    category: 'Oral & Dental Health',
    title: 'Periodontal Disease and Systemic Arterial Inflammation',
    summary:
      'Porphyromonas gingivalis from subgingival plaque can enter the bloodstream, elevating high-sensitivity C-reactive protein (hs-CRP) and arterial atheroma risk.',
    readTime: '3 min read',
    keyTakeaways: [
      'Brush teeth twice daily with fluoride or hydroxyapatite toothpaste for full 2 minutes.',
      'Floss daily or use an interdental brush to remove subgingival bacterial biofilm.',
      'Schedule professional dental prophylaxis cleanings and periodontal probings every 6 months.',
    ],
    clinicalReference: 'American Dental Association (ADA) & Journal of Periodontology',
    tags: ['Dental', 'Oral Health', 'Periodontal', 'Heart Connection'],
  },
  {
    id: 'tip-21',
    category: 'Allergy & Asthma Management',
    title: 'Aeroallergen Mitigation, HEPA Filtration & Peak Flow Checks',
    summary:
      'Indoor allergen burdens (dust mites, pet dander, mold spores) trigger eosinophilic airway hyperreactivity in sensitized individuals.',
    readTime: '4 min read',
    keyTakeaways: [
      'Use certified True HEPA air filtration in sleeping quarters to capture airborne particulates.',
      'Wash bedding weekly in hot water (minimum 130°F / 54°C) to eliminate dust mite allergens.',
      'Keep rescue inhalers accessible at all times and monitor personal best peak flow readings.',
    ],
    clinicalReference: 'Global Initiative for Asthma (GINA) Guidelines & AAAAI',
    tags: ['Allergy', 'Asthma', 'Pulmonology', 'Air Quality'],
  },
  {
    id: 'tip-22',
    category: 'Brain Health & Neuro-Cognition',
    title: 'Cognitive Reserve, Sleep Spindles & Neurodegenerative Protection',
    summary:
      'Building cognitive reserve through novel skill acquisition, bilingualism, and social engagement buffers against synaptic decline in later decades.',
    readTime: '4 min read',
    keyTakeaways: [
      'Challenge your brain regularly with musical instruments, chess, languages, or complex puzzles.',
      'Maintain strong social bonds and active community engagement to protect emotional health.',
      'Emphasize the MIND diet (Mediterranean-DASH Intervention for Neurodegenerative Delay).',
    ],
    clinicalReference: 'Lancet Commission on Dementia Prevention, Intervention and Care',
    tags: ['Brain Health', 'Neuroscience', 'Memory', 'Dementia Prevention'],
  },
  {
    id: 'tip-23',
    category: 'Occupational Ergonomics & Posture',
    title: 'Forward Head Posture, Cervical Spine Load & Micro-Breaks',
    summary:
      'For every inch the head tilts forward over a computer or phone, the effective cervical spine load increases by 10 pounds, triggering myofascial pain syndromes.',
    readTime: '3 min read',
    keyTakeaways: [
      'Position your primary monitor so the top third of the screen sits at horizontal eye level.',
      'Take 60-second micro-breaks every 45 minutes to do chin tucks and scapular retractions.',
      'Keep feet flat on the floor with knees and hips bent at roughly 90-degree angles.',
    ],
    clinicalReference: 'OSHA Computer Workstation Ergonomics Guidelines',
    tags: ['Ergonomics', 'Posture', 'Spine', 'Neck Pain'],
  },
  {
    id: 'tip-24',
    category: 'Hepatic & Liver Wellness',
    title: 'Metabolic Dysfunction-Associated Steatohepatitis (MASH)',
    summary:
      'Excess dietary high-fructose corn syrup and refined carbohydrates drive de novo lipogenesis in hepatocytes, precipitating fatty liver disease.',
    readTime: '4 min read',
    keyTakeaways: [
      'Minimize sugar-sweetened sodas, energy drinks, and processed syrups.',
      'Incorporate antioxidant-rich black coffee (2–3 cups daily), proven to support hepatic enzymes.',
      'Undergo routine hepatic enzyme panels (ALT, AST, GGT) as part of your annual metabolic checkup.',
    ],
    clinicalReference: 'American Association for the Study of Liver Diseases (AASLD)',
    tags: ['Liver', 'Hepatology', 'Fatty Liver', 'Metabolism'],
  },
];
