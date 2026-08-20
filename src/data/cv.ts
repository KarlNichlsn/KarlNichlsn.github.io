export interface CvEntry {
  id: string;
  title: string;
  organisation: string;
  period: string;
  location?: string;
  summary?: string;
  details: string[];
}

export const education: CvEntry[] = [
  {
    id: 'cambridge-mphil',
    title: 'MPhil Data Intensive Science',
    organisation: 'University of Cambridge',
    period: '2025–2026',
    summary: 'Grades available from Dr. Fergusson once assessed.',
    details: [
      'Relevant modules include Statistical Methods, Machine Learning, Research Computing, Data Driven Radio Astronomy in the SKA Era, Multi-Agent Reinforcement Learning and Agentic Artificial Intelligence, and Cosmology.',
    ],
  },
  {
    id: 'trinity-physics',
    title: 'BA (Mod.) Honours Physics and Astrophysics',
    organisation: 'Trinity College Dublin',
    period: '2020–2024',
    summary: 'Final grade: High 2:1 (69%).',
    details: [
      'Received the Laidlaw Undergraduate Leadership & Research Scholarship.',
      'Entrance Exhibitioner and Undergraduate of the Year for Innovation finalist (2023).',
      'Physics Convenor and Representative, representing physics students as an elected Executive Board member.',
      'Relevant modules included Mathematics for Physics 1–5, Computer Simulation 1 & 2, Statistical Thermodynamics, Cosmology, Exoplanets & Planetary Formation, and Stellar & Galactic Physics.',
    ],
  },
  {
    id: 'harvard-smithsonian-research',
    title: 'Thesis and capstone research project',
    organisation: 'Center for Astrophysics | Harvard–Smithsonian',
    period: '2023',
    summary: 'First-Class Honours mark.',
    details: [
      'Used Sub-Millimeter Array interferometer observations to investigate the distribution and properties of Giant Molecular Clouds in NGC 891.',
      'Produced an extensive catalogue of Giant Molecular Clouds and investigated property variation with vertical separation from the galactic plane.',
      'Attended lectures in Interferometry and Imaging, the Institute for Theory & Computation, and ASTROAI.',
    ],
  },
  {
    id: 'st-michaels-college',
    title: 'Leaving Certificate',
    organisation: 'St Michael’s College',
    period: '2014–2020',
    summary: '613/625 points (top 1.5%).',
    details: [
      'Higher level Physics, Chemistry, Mathematics, Applied Mathematics, English, French and Business.',
      'Award for General Excellence; Science and Chemistry Olympiad representative; Joutes Oratoires finalist.',
    ],
  },
  {
    id: 'ctyi',
    title: 'High-ability and early university programmes',
    organisation: 'Centre for Talented Youth Ireland',
    period: '2016–2018',
    details: [
      'Theoretical Physics; Sports & Exercise Science; Materials & Electronics Engineering.',
    ],
  },
];

export const experience: CvEntry[] = [
  {
    id: 'retainit',
    title: 'Design Engineer',
    organisation: 'Retainit',
    period: '2025',
    location: 'Remote',
    details: [
      'Iterated a memory-assistant AI application toward product-market fit.',
      'Created a quiz-generation workflow for partner channels, particularly physics content.',
      'Performed quality control on science-channel output for channels with a combined subscriber count above 40 million.',
    ],
  },
  {
    id: 'visely-ai',
    title: 'Physics Expert',
    organisation: 'Visely AI',
    period: 'March–May 2025',
    details: ['Worked on undergraduate-level AI physics solution development.'],
  },
  {
    id: 'formula-trinity',
    title: 'Path Planning Team Lead / Control Team Member',
    organisation: 'Formula Trinity Autonomous',
    period: '2022–2024',
    location: 'Dublin, Ireland',
    details: [
      'Awarded the Tata Elxsi Autonomous Best Design Award at Formula Student UK in Silverstone.',
      'Developed a solution for an autonomous electric vehicle.',
      'Led a path-planning team of five in 2023/24, using lidar and visual data to generate optimal racing lines.',
      'Worked on the control team in 2022/23, guiding the vehicle to precise waypoints by fine-tuning output signals.',
    ],
  },
  {
    id: 'world-science-foundation',
    title: 'Teaching Fellow',
    organisation: 'World Science Foundation',
    period: '2023–2024',
    location: 'New York, NY',
    details: [
      'Completed a Laidlaw leadership-in-action project at the World Science Foundation.',
      'Served as a teaching fellow for a cosmology course developed with Nobel Laureate Dr. John Mather.',
      'Created a workshop for more than 60 students during the World Science Scholars Festival.',
      'Managed logistics for an international conference with more than 100 attendees.',
    ],
  },
  {
    id: 'ilofar',
    title: 'Research Student',
    organisation: 'Irish Low Frequency Array (I-LOFAR)',
    period: '2022',
    location: 'Birr, Ireland',
    details: [
      'Awarded a funding stipend to study space-weather impacts using I-LOFAR.',
      'Conducted a qualitative analysis of the Irish electrical grid’s vulnerability to solar events.',
      'Presented a poster at the Laidlaw Conference at the London School of Economics.',
    ],
  },
];
