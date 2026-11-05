export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  type: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: 'flagship-hackathon',
    title: 'Flagship Hackathon',
    description: 'Build under pressure. Solve real problems. Ship something real in 48 hours.',
    type: 'FLAGSHIP',
  },
  {
    id: 'build-sprints',
    title: 'Build Sprints',
    description: 'Short collaborative building challenges designed to move fast and prototype.',
    type: 'SPRINT',
  },
  {
    id: 'ai-labs',
    title: 'AI Labs',
    description: 'Explore emerging technologies and fine-tuning through hands-on experimentation.',
    type: 'LAB',
  },
  {
    id: 'demo-nights',
    title: 'Demo Nights',
    description: 'Put projects, experiments and ideas in front of founders, builders and investors.',
    type: 'SHOWCASE',
  },
  {
    id: 'build-sessions',
    title: 'Build Sessions',
    description: 'Learn directly from engineers, researchers and creators who actually ship.',
    type: 'SESSION',
  },
  {
    id: 'community-experiences',
    title: 'Community Experiences',
    description: 'Create relationships, builder culture, and memorable collaborative moments.',
    type: 'COMMUNITY',
  },
];

export interface EventItem {
  id: string;
  date: string;
  title: string;
  type: 'HACKATHONS' | 'BUILD SPRINTS' | 'AI LABS' | 'DEMO NIGHTS' | 'COMMUNITY';
  description: string;
  location: string;
  status: 'UPCOMING' | 'REGISTRATION OPEN' | 'SOON' | 'TBA';
  tags?: string[];
  capacity?: string;
  highlight?: string;
  link?: string;
  image?: string;
  featured?: boolean;
}

export const events: EventItem[] = [
  {
    id: 'shark-hack-2027',
    date: '23 JAN 2027',
    title: '🦈 SHARK HACK: Don’t Just Build. Make Them Believe.',
    type: 'HACKATHONS',
    description: 'An All-India flagship hackathon where technical execution meets pitching, product thinking, and live negotiation. Compete for ₹1 Lakh+ Prize Pool, pitch in the offline Shark Room in Delhi, and negotiate deals in Impulse Credits.',
    location: 'DELHI · OFFLINE GRAND ROUND',
    status: 'REGISTRATION OPEN',
    tags: ['Flagship', 'Live Deal Room', 'Impulse Credits', 'Women-In-Tech'],
    capacity: '2–4 BUILDERS / TEAM',
    highlight: '₹1 LAKH+ PRIZE POOL',
    link: '/shark-hack',
    image: '/images/shark-hack-banner.jpg',
    featured: true,
  },
  {
    id: 'impulse-hack-01',
    date: 'OCT 18 - 20, 2026',
    title: 'Impulse Hack 01: Autonomous Systems',
    type: 'HACKATHONS',
    description: '48-hour builder sprint to create autonomous agents, multi-model pipelines, and physical computing prototypes. $10,000 builder grant pool.',
    location: 'BUILDER ARENA / HYBRID',
    status: 'REGISTRATION OPEN',
    tags: ['Agents', 'Hardware', 'Grant Pool'],
    capacity: '120 BUILDERS',
    highlight: '$10K PRIZE POOL',
  },
  {
    id: 'ai-lab-local-models',
    date: 'OCT 29, 2026',
    title: 'AI Lab: Local Fine-Tuning & Quantization',
    type: 'AI LABS',
    description: 'Hands-on deep dive into LoRA fine-tuning, Unsloth, and deploying quantized 8B/70B models with vLLM on local workstations and edge clusters.',
    location: 'LAB 04 / DISCORD LIVE',
    status: 'REGISTRATION OPEN',
    tags: ['PyTorch', 'vLLM', 'LoRA'],
    capacity: '40 SEATS',
    highlight: 'HANDS-ON WORKSHOP',
  },
  {
    id: 'neural-audio-sprint',
    date: 'NOV 08 - 10, 2026',
    title: '48h Neural Audio & Voice Sprint',
    type: 'BUILD SPRINTS',
    description: 'Rapid prototyping sprint focused on sub-50ms conversational voice agents, streaming audio models, and spatial sound environments.',
    location: 'ONLINE / DISTRIBUTED',
    status: 'SOON',
    tags: ['Voice AI', 'WebRTC', 'AudioCraft'],
    capacity: '80 TEAMS',
    highlight: 'RAPID SPRINT',
  },
  {
    id: 'winter-demo-night-01',
    date: 'NOV 27, 2026',
    title: 'Demo Night: Cohort 01 Showcase',
    type: 'DEMO NIGHTS',
    description: 'The inaugural showcase. 12 chosen builder teams take the stage to demo products, tools, and research shipped during the first cohort.',
    location: 'MAIN AUDITORIUM',
    status: 'UPCOMING',
    tags: ['Live Demos', 'Investors', 'Founders'],
    capacity: '250 GUESTS',
    highlight: 'FLAGSHIP SHOWCASE',
  },
  {
    id: 'global-builder-meet',
    date: 'DEC 12, 2026',
    title: 'Global Decentralized Builder Meet',
    type: 'COMMUNITY',
    description: 'Synchronized cross-chapter meetup celebrating open source, decentralized AI infrastructure, and community governance.',
    location: 'GLOBAL / LIVE STATIONS',
    status: 'TBA',
    tags: ['Open Source', 'Decentralized', 'Global'],
    capacity: 'OPEN ACCESS',
    highlight: 'ALL CHAPTERS',
  },
];

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  category: 'AI' | 'PRODUCT' | 'RESEARCH' | 'OPEN SOURCE' | 'EXPERIMENTAL';
  contributors: string[];
  status: 'EXPERIMENT' | 'BUILDING' | 'SHIPPED' | 'OPEN SOURCE';
  github?: string;
  demo?: string;
  tags?: string[];
  stars?: string;
}

export const projects: ProjectItem[] = [
  {
    id: 'omniagent-os',
    name: 'OmniAgent OS',
    description: 'An autonomous multi-agent operating scaffold with verifiable execution traces, sandboxed microVMs, and persistent semantic memory.',
    category: 'AI',
    contributors: ['Alex K.', 'Priya M.', 'Devon S.'],
    status: 'SHIPPED',
    github: 'https://github.com/impulse-community/omniagent-os',
    demo: 'https://omniagent.impulse.build',
    tags: ['Multi-Agent', 'TypeScript', 'Docker', 'WebSockets'],
    stars: '1.2k',
  },
  {
    id: 'neural-canvas-3d',
    name: 'NeuralCanvas 3D',
    description: 'A real-time WebGL and NeRF spatial generation workspace where natural language prompts synthesize 3D environments and interactable physics assets.',
    category: 'PRODUCT',
    contributors: ['Marcus L.', 'Sofia C.'],
    status: 'BUILDING',
    github: 'https://github.com/impulse-community/neural-canvas',
    demo: 'https://canvas.impulse.build',
    tags: ['Three.js', 'WebGL', 'NeRF', 'Python'],
    stars: '840',
  },
  {
    id: 'vocalis-sub50',
    name: 'Vocalis AI',
    description: 'Ultra low-latency streaming speech pipeline delivering sub-50ms conversational turnaround using localized Whisper and chunked token audio synthesis.',
    category: 'RESEARCH',
    contributors: ['Chen W.', 'Liam B.'],
    status: 'EXPERIMENT',
    github: 'https://github.com/impulse-community/vocalis',
    tags: ['Streaming Audio', 'Rust', 'WebRTC', 'PyTorch'],
    stars: '490',
  },
  {
    id: 'edgevision-robotics',
    name: 'EdgeVision Core',
    description: 'Quantized computer vision and spatial depth inference model running at 90fps on Raspberry Pi 5 and Jetson Orin edge modules.',
    category: 'EXPERIMENTAL',
    contributors: ['Tara N.', 'Hassan R.'],
    status: 'OPEN SOURCE',
    github: 'https://github.com/impulse-community/edgevision',
    demo: 'https://edgevision.impulse.build',
    tags: ['Edge AI', 'ONNX', 'C++', 'Robotics'],
    stars: '620',
  },
  {
    id: 'eval-engine',
    name: 'EvalEngine Suite',
    description: 'Deterministic quality benchmarking and regression harness for continuous evaluation of agentic reasoning pipelines and LLM systems.',
    category: 'OPEN SOURCE',
    contributors: ['Elena P.', 'David O.'],
    status: 'SHIPPED',
    github: 'https://github.com/impulse-community/eval-engine',
    tags: ['Benchmarking', 'Python', 'Evaluation', 'CI/CD'],
    stars: '1.8k',
  },
];

export interface TeamMember {
  name: string;
  role: string;
  discipline: string;
  tag: string;
  avatar: string;
  focus: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Aayush S.',
    role: 'Founding Lead',
    discipline: 'Systems & Architecture',
    tag: '01 / CORE',
    avatar: 'A',
    focus: 'Ecosystem Architecture & Autonomous Systems',
  },
  {
    name: 'Marcus Vance',
    role: 'AI Research Lead',
    discipline: 'Deep Learning',
    tag: '02 / LABS',
    avatar: 'M',
    focus: 'Local LLM Fine-Tuning & Quantization',
  },
  {
    name: 'Kavya Sharma',
    role: 'Design & Interaction Lead',
    discipline: 'Creative Engineering',
    tag: '03 / CREATIVE',
    avatar: 'K',
    focus: 'Spatial Computing & 3D Interactive Web',
  },
  {
    name: 'David Zhao',
    role: 'Community & Hackathons',
    discipline: 'Growth & Ops',
    tag: '04 / CULTURE',
    avatar: 'D',
    focus: 'Flagship Hackathons & Sprints',
  },
];

export const navLinks = [
  { label: 'Explore', path: '/' },
  { label: 'Events', path: '/events' },
  { label: 'Projects', path: '/projects' },
  { label: 'Community', path: '/community' },
  { label: 'About', path: '/about' },
];

export const footerLinks = [
  { label: 'Explore', path: '/' },
  { label: 'Events', path: '/events' },
  { label: 'Projects', path: '/projects' },
  { label: 'Community', path: '/community' },
  { label: 'About', path: '/about' },
  { label: 'Join', path: '/join' },
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/impulse-community' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Discord', href: '#' },
  { label: 'X / Twitter', href: '#' },
];

export const interests = [
  'AI Agents',
  'Systems Engineering',
  'Machine Learning Research',
  'Product Design',
  'Robotics & Hardware',
  'Creative WebGL / 3D',
  'Open Source',
  'Venture & Startups',
];
