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
    title: 'SHARK HACK: Don’t Just Build. Make Them Believe.',
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
  { label: 'Cohort', path: '/cohort' },
  { label: 'Community', path: '/community' },
];

export const footerLinks = [
  { label: 'Explore', path: '/' },
  { label: 'Events', path: '/events' },
  { label: 'Cohort', path: '/cohort' },
  { label: 'Community', path: '/community' },
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/impulse-community' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Discord', href: '#' },
  { label: 'X / Twitter', href: '#' },
];
