import { teamMembers, type TeamMember } from '@/data/content';

export type MemberDesignation = 'President' | 'President & Co-founder' | 'Former President & Co-founder' | 'Head' | 'Coordinator' | 'Technical Coordinator' | 'To be confirmed';

export interface CommunityMember {
  id: string;
  name: string;
  branch: string;
  team: string;
  designation: MemberDesignation;
  interests: string[];
  photoPath: string;
  /** Per-photo crop alignment for the square member thumbnails (CSS object-position). */
  photoPosition?: string;
  /** Optional gentle zoom for photos where the subject is farther from the camera. */
  photoZoom?: number;
  /** Anchor for the per-photo zoom crop. */
  photoTransformOrigin?: string;
  oneLiner?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills?: string[];
  originalRole?: string;
  existingDiscipline?: string;
  existingFocus?: string;
  avatarInitial?: string;
}

export interface CommunityTeam {
  id: string;
  name: string;
  heads: CommunityMember[];
  committeeMembers: CommunityMember[];
}

const seat = (id: string, team: string, designation: MemberDesignation): CommunityMember => ({
  id,
  name: '',
  branch: '',
  team,
  designation,
  interests: [],
  photoPath: '',
  oneLiner: '',
  linkedinUrl: '',
  githubUrl: '',
  skills: [],
});

const seats = (prefix: string, team: string, designation: MemberDesignation, count: number) =>
  Array.from({ length: count }, (_, index) => seat(`${prefix}-${index + 1}`, team, designation));

const coordinator = (
  id: string,
  name: string,
  team: string,
  photoPath: string,
  avatarInitial: string,
  photoPosition?: string,
  details: Pick<CommunityMember, 'linkedinUrl' | 'githubUrl' | 'skills'> = {},
  photoZoom?: number,
  photoTransformOrigin?: string,
): CommunityMember => ({
  id,
  name,
  branch: '',
  team,
  designation: 'Coordinator',
  interests: [],
  photoPath,
  photoPosition,
  photoZoom,
  photoTransformOrigin,
  oneLiner: '',
  linkedinUrl: '',
  githubUrl: '',
  skills: [],
  avatarInitial,
  ...details,
});

const fromExisting = (
  member: TeamMember,
  id: string,
  team: string,
  designation: MemberDesignation,
): CommunityMember => ({
  id,
  name: member.name,
  branch: '',
  team,
  designation,
  interests: [],
  photoPath: '',
  oneLiner: '',
  linkedinUrl: '',
  githubUrl: '',
  skills: [],
  originalRole: member.role,
  existingDiscipline: member.discipline,
  existingFocus: member.focus,
  avatarInitial: member.avatar,
});

const researchLead = teamMembers.find((member) => member.role === 'AI Research Lead');
const legacyMembers = teamMembers
  .filter((member) => member !== researchLead && member.name !== 'Aayush S.' && member.name !== 'Kavya Sharma' && member.name !== 'David Zhao')
  .map((member, index) => fromExisting(member, `existing-profile-${index + 1}`, 'Technical', 'Head'));
const prachiSharma: CommunityMember = {
  id: 'prachi-sharma-technical-head',
  name: 'Prachi Sharma',
  branch: '',
  team: 'Technical',
  designation: 'Head',
  interests: [],
  photoPath: '/community/members/technical-head-photo-2026-10-24.jpg',
  oneLiner: '',
  linkedinUrl: 'https://www.linkedin.com/in/prachi-sharma-188761397',
  githubUrl: 'https://github.com/Prachi-1717',
  skills: [
    'Python',
    'C++',
    'HTML',
    'CSS',
    'JavaScript',
    'FastAPI',
    'Artificial Intelligence',
    'Machine Learning',
    'Agentic AI',
    'Problem-Solving',
    'Leadership',
    'Adaptability',
    'Critical Thinking',
    'Time Management',
  ],
  avatarInitial: 'PS',
};

const soniyaTechnicalHead: CommunityMember = {
  id: 'soniya-technical-head',
  name: 'Soniya',
  branch: '',
  team: 'Technical',
  designation: 'Head',
  interests: [],
  photoPath: '/community/members/technical-head-soniya-2026-10-24.jpg',
  photoPosition: '50% 58%',
  linkedinUrl: 'https://www.linkedin.com/in/soniya-aa04a0262',
  githubUrl: 'https://github.com/scriptedbysoniya',
  skills: ['Frontend development', 'Python', 'SQL databases'],
  oneLiner: '',
  avatarInitial: 'S',
};

const dorisTechnicalHead: CommunityMember = {
  id: 'doris-technical-head',
  name: 'Doris Dagar',
  branch: '',
  team: 'Technical',
  designation: 'Head',
  interests: [],
  photoPath: '/community/members/technical-head-doris-dagar-2026-10-27.jpg',
  oneLiner: '',
  linkedinUrl: 'https://www.linkedin.com/in/doris-dagar',
  githubUrl: 'https://github.com/DorisDagar',
  skills: [
    'Python',
    'Machine Learning',
    'Frontend Development',
    'Git & GitHub',
    'Problem-Solving',
    'Team Collaboration',
    'Adaptability',
    'Leadership',
  ],
  avatarInitial: 'DD',
};

const bhavyaResearchHead: CommunityMember = {
  id: 'bhavya-bhardwaj-research-head',
  name: 'Bhavya Bhardwaj',
  branch: '',
  team: 'Research & Innovation',
  designation: 'Head',
  interests: [],
  photoPath: '/community/members/research-head-bhavya-bhardwaj-2026-10-27.jpg',
  photoPosition: '50% 25%',
  photoZoom: 1.15,
  linkedinUrl: 'https://www.linkedin.com/in/bhavya-bhardwaj-64572937b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/bhadiv2007-bot',
  skills: ['C++', 'Python', 'HTML', 'CSS', 'React', 'SQL', 'RAG', 'Public Speaking', 'Event Management', 'Content writing'],
  oneLiner: '',
  avatarInitial: 'BB',
};

const swastiResearchHead: CommunityMember = {
  id: 'swasti-tomar-research-head',
  name: 'Swasti Tomar',
  branch: '',
  team: 'Research & Innovation',
  designation: 'Head',
  interests: [],
  photoPath: '/community/members/research-head-swasti-toma-2026-10-27.jpg',
  photoPosition: '50% 35%',
  linkedinUrl: 'https://www.linkedin.com/in/swasti-tomar',
  githubUrl: 'https://github.com/Swasti-Tomar',
  skills: ['Python', 'C++', 'HTML/CSS', 'MySQL', 'React.js', 'FastAPI', 'Git & GitHub', 'Problem-solving', 'Critical thinking', 'Teamwork', 'Communication', 'Leadership'],
  oneLiner: '',
  avatarInitial: 'ST',
};

const rakshaSponsorshipHead: CommunityMember = {
  id: 'raksha-dagar-sponsorship-head',
  name: 'Raksha Dagar',
  branch: '',
  team: 'Partnership',
  designation: 'Head',
  interests: [],
  photoPath: '/community/members/sponsorship-head-raksha-dagar-2026-10-27.jpg',
  photoPosition: '50% 72%',
  oneLiner: '',
  linkedinUrl: 'https://www.linkedin.com/in/raksha-dagar-736393374?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/RakshaDagar-codes',
  skills: ['C++', 'Python', 'Generative AI', 'AI Agents', 'RAG pipeline', 'LangChain', 'LangGraph', 'HTML', 'CSS', 'Java', 'Communication skills', 'Analytical Thinking', 'Public speaking'],
  avatarInitial: 'RD',
};

const charviEventCoordinator: CommunityMember = {
  id: 'charvi-khurana-event-coordinator',
  name: 'Charvi Khurana',
  branch: '',
  team: 'Event Management',
  designation: 'Coordinator',
  interests: [],
  photoPath: '/community/members/event-coordinator-charvi-khurana-2026-10-27.jpg',
  linkedinUrl: 'https://www.linkedin.com/in/charvi-khurana-076346322?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  githubUrl: 'https://github.com/charvikh08',
  skills: ['Frontend development', 'Event Management', 'Sponsorship'],
  oneLiner: '',
  avatarInitial: 'CK',
};

const kumkumResearchCoordinator: CommunityMember = {
  id: 'kumkum-research-coordinator',
  name: 'Kumkum',
  branch: '',
  team: 'Research & Innovation',
  designation: 'Coordinator',
  interests: [],
  photoPath: '/community/members/research-coordinator-kumkum-2026-10-27.jpg',
  linkedinUrl: 'https://www.linkedin.com/in/kumkum-8678b5430',
  githubUrl: 'https://github.com/kumkum456qw-debug',
  skills: ['Python', 'MySQL', 'HTML', 'CSS', 'Communication', 'Active listening', 'Creativity', 'Self-motivated learning'],
  oneLiner: '',
  avatarInitial: 'K',
};

const pragatiResearchCoordinator: CommunityMember = {
  id: 'pragati-saha-research-coordinator',
  name: 'Pragati Saha',
  branch: '',
  team: 'Research & Innovation',
  designation: 'Coordinator',
  interests: [],
  photoPath: '/community/members/research-coordinator-pragati-saha-2026-10-27.jpg',
  linkedinUrl: 'https://www.linkedin.com/in/pragati-saha-477b82435?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/pragatisaha19-code',
  skills: ['C', 'Python', 'HTML'],
  oneLiner: '',
  avatarInitial: 'PS',
};

const anushaResearchCoordinator = coordinator('anusha-research-coordinator', 'Anusha', 'Research & Innovation', '/community/members/research-coordinator-anusha-2026-10-27.jpg', 'A', '50% 10%', {
  linkedinUrl: 'https://www.linkedin.com/in/anusha-rawat-434246436',
  githubUrl: 'https://github.com/anusha-codes26',
  skills: ['Python', 'R Programming', 'Learning HTML & web development', 'Leadership', 'Communication', 'Presentation Skills'],
});

const pranshiResearchCoordinator = coordinator('pranshi-aggarwal-research-coordinator', 'Pranshi Aggarwal', 'Research & Innovation', '/community/members/research-coordinator-pranshi-aggarwal-2026-10-27.jpg', 'PA', '50% 50%', {
  linkedinUrl: 'https://www.linkedin.com/in/pranshi-aggarwal-2618b342a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/pranshiaggarwal',
  skills: ['Python', 'C', 'C++', 'MySQL', 'Learning web development', 'HTML', 'CSS', 'Leadership', 'Communication', 'Teamwork', 'Creativity', 'Quick learning'],
});

const millyshreeGuptaEventHead: CommunityMember = {
  id: 'millyshree-gupta-event-management-head',
  name: 'Millyshree Gupta',
  branch: '',
  team: 'Event Management',
  designation: 'Head',
  interests: [],
  photoPath: '/community/members/event-head-millyshree-gupta-2026-10-27-v2.jpg',
  photoPosition: '50% 80%',
  photoZoom: 1.2,
  oneLiner: '',
  linkedinUrl: 'https://www.linkedin.com/in/millyshree-gupta-b72103245?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  githubUrl: 'https://github.com/millyshreenp-ship-it',
  skills: ['AI/ML', 'C++', 'Python', 'LLM agents', 'FastAPI', 'REST API', 'Creative Thinking', 'Problem-Solving', 'Adaptability'],
  avatarInitial: 'MG',
};

const soumyaTechnicalCoordinator = coordinator('soumya-verma-technical-coordinator', 'Saumya Verma', 'Technical', '/community/members/technical-coordinator-soumya-verma-2026-10-27.jpg', 'SV', '50% 58%', {
  linkedinUrl: 'https://www.linkedin.com/in/saumya-verma-0b5531428/?isSelfProfile=true',
  githubUrl: 'https://github.com/9saumyaverma-svg',
  skills: ['Python', 'SQL', 'Communication', 'Teamwork'],
});
const manasiTechnicalCoordinator = coordinator('manasi-technical-coordinator', 'Mansi', 'Technical', '/community/members/technical-coordinator-manasi-2026-10-27.jpg', 'M', '50% 58%', {
  linkedinUrl: 'https://www.linkedin.com/in/mansi-9aa402381?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/mansi246yadav-cloud',
  skills: ['Python (Basics)', 'C (Basics)', 'HTML', 'CSS', 'JavaScript', 'Canva', 'SQL', 'Communication', 'Teamwork', 'Problem-Solving', 'Creativity', 'Adaptability', 'Time Management'],
});
const chahTechnicalCoordinator = coordinator('chah-gupta-technical-coordinator', 'Chehak Gupta', 'Technical', '/community/members/technical-coordinator-chah-gupta-2026-10-27.jpg', 'CG', undefined, {
  linkedinUrl: 'https://in.linkedin.com/in/chehak-gupta-55a645438',
  githubUrl: 'https://github.com/tweetchehak',
  skills: ['Python', 'C++', 'Learning DSA', 'AI'],
});
const anjaliTechnicalCoordinator = coordinator('anjali-gupta-technical-coordinator', 'Anjali Gupta', 'Technical', '/community/members/technical-coordinator-anjali-gupta-2026-10-27.jpg', 'AG', undefined, {
  linkedinUrl: 'https://www.linkedin.com/in/anjali-gupta-189863292/',
  githubUrl: 'https://github.com/ANJALI-G1',
  skills: ['Full Stack web development'],
});
const vaishnaviTechnicalCoordinator: CommunityMember = {
  id: 'vaishnavi-yashwantrao-technical-coordinator',
  name: 'Vaishnavi Yashwantrao',
  branch: '',
  team: 'Technical',
  designation: 'Technical Coordinator',
  interests: [],
  photoPath: '/community/members/technical-coordinator-vaishnavi-yashwantrao-2026-11-03.jpg',
  photoPosition: '58% 50%',
  oneLiner: '',
  linkedinUrl: 'https://www.linkedin.com/in/vaishnavi-yashwantrao-4b6757428?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/vaishnavirao1610-source',
  skills: ['Python', 'Vibe Coding', 'C++ Basics', 'Stage Speaker'],
  avatarInitial: 'VY',
};
const bhavyaGuptaMediaCoordinator = coordinator('bhavya-gupta-media-pr-coordinator', 'Bhaavya Gupta', 'Media & PR', '/community/members/media-pr-coordinator-bhavya-gupta-2026-10-27.jpg', 'BG', undefined, {
  linkedinUrl: 'https://www.linkedin.com/in/bhaavya-gupta-b00614428?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/bhaavyagupta',
  skills: ['Python', 'MySQL', 'JavaScript', 'HTML'],
});
const ektaYadavMediaCoordinator = coordinator('ekta-yadav-media-pr-coordinator', 'Ekta Yadav', 'Media & PR', '/community/members/media-pr-coordinator-ekta-yadav-2026-10-27.jpg', 'EY', '50% 25%', {
  linkedinUrl: 'https://www.linkedin.com/in/ekta-yadav-4a2a6b438?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/ektayadav196',
  skills: ['Python', 'MySQL', 'HTML', 'Public Speaking', 'Fast learner', 'Editing', 'Communication', 'Teamwork'],
});
const meherGuptaMediaCoordinator = coordinator('meher-gupta-media-pr-coordinator', 'Mehr Gupta', 'Media & PR', '/community/members/media-pr-coordinator-meher-gupta-2026-10-27.jpg', 'MG', undefined, {
  linkedinUrl: 'https://www.linkedin.com/in/mehr-gupta-07a5092a0/',
  githubUrl: 'https://github.com/MehrGupta',
  skills: ['Learning C', 'HTML', 'Canva', 'AI Agents', 'Communication', 'Leadership', 'Analytical Thinking', 'Public speaking'],
});
const abhishaEventCoordinator = coordinator('abhisha-maurya-event-coordinator', 'Abisha Mourya', 'Event Management', '/community/members/event-management-coordinator-abhisha-maurya-2026-10-27.jpg', 'AM', '50% 100%', {
  linkedinUrl: 'https://www.linkedin.com/in/abisha-mourya-933243430',
  githubUrl: 'https://github.com/abisha-mourya',
  skills: ['Python', 'SQL', 'R language', 'HTML', 'CSS (learning)', 'Public Speaking', 'Presentation Skills'],
}, 2.4, '50% 65%');
const diyaEventCoordinator = coordinator('diya-bhatt-event-coordinator', 'Diya Bhatt', 'Event Management', '/community/members/event-management-coordinator-diya-bhatt-2026-10-27.jpg', 'DB', undefined, {
  linkedinUrl: 'https://www.linkedin.com/in/diya-bhatt-aab031447',
  githubUrl: 'https://github.com/COOKIE-DB',
  skills: ['Python', 'C', 'HTML', 'CSS', 'Teamwork and Collaboration', 'Communication', 'Leadership'],
});
const shreyaResearchCoordinator = coordinator('shreya-yadav-research-coordinator', 'Shreya Yadav', 'Research & Innovation', '/community/members/research-innovation-coordinator-shreya-yadav-2026-10-27.jpg', 'SY', undefined, {
  linkedinUrl: 'https://www.linkedin.com/in/shreya-yadav-583a08425?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/shreyayadav0825-rgb',
  skills: ['Python', 'MySQL', 'AI Agents', 'AI Studio', 'Communication', 'Leadership', 'Public Speaking', 'Debate', 'Presentation skills', 'Learning C++', 'DSA', 'Web development'],
});
const anyaResearchCoordinator = coordinator('anya-jain-research-coordinator', 'Aaniya Jain', 'Research & Innovation', '/community/members/research-innovation-coordinator-anya-jain-2026-10-27.jpg', 'AJ', '50% 50%', {
  linkedinUrl: 'https://www.linkedin.com/in/aaniya-jain-b41074359',
  githubUrl: 'https://github.com/AANIYA-JAIN-igdtuw',
  skills: ['Python', 'MySQL', 'Canva', 'UI/UX', 'Web development (learning)', 'Analytical thinking', 'Problem solving', 'Painting', 'Editing'],
}, 1.25);
const rushikaSponsorshipCoordinator = coordinator('rushika-gupta-sponsorship-coordinator', 'Rushika Gupta', 'Partnership', '/community/members/sponsorship-coordinator-rushika-gupta-2026-10-27.jpg', 'RG', undefined, {
  linkedinUrl: 'https://www.linkedin.com/in/rushika-gupta',
  githubUrl: 'https://github.com/rushikagupta',
  skills: ['Currently learning Python', 'HTML', 'CSS', 'C++', 'DSA', 'Teamwork & Leadership', 'Communication skills', 'Analytical thinking'],
});
const ayushiSponsorshipCoordinator = coordinator('ayushi-sponsorship-coordinator', 'Aayushi', 'Partnership', '/community/members/sponsorship-coordinator-ayushi-2026-10-27.jpg', 'A', undefined, {
  linkedinUrl: 'https://www.linkedin.com/in/aayushi-19b779430?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/ayushicodex',
  skills: ['Python', 'C', 'Learning DSA', 'Communication', 'Leadership'],
});

const kaishaaBathejaPartnershipMember: CommunityMember = {
  id: 'kaisha-batheja-partnership-member',
  name: 'Kaishaa Batheja',
  branch: '',
  team: 'Partnership',
  designation: 'Coordinator',
  interests: [],
  photoPath: '/community/members/partnership-member-kaishaa-batheja-2026-10-27.jpg',
  photoPosition: '50% 100%',
  photoZoom: 1.45,
  oneLiner: '',
  linkedinUrl: 'https://www.linkedin.com/in/kaishaa-batheja-9ab046437/',
  githubUrl: 'https://github.com/kaishaab',
  skills: ['HTML', 'Canva', 'Power BI', 'Currently learning Python', 'Problem Solving', 'Creativity and Designing', 'Communication skills', 'Singing', 'Art', 'Ukulele', 'Harmonium'],
  avatarInitial: 'KB',
};

const vaishnaviMediaHead: CommunityMember = {
  id: 'vaishnavi-shukla-media-head',
  name: 'Vaishnavi Shukla',
  branch: '',
  team: 'Media & PR',
  designation: 'Head',
  interests: [],
  photoPath: '/community/members/media-pr-head-vaishnavi-shukla-2026-10-27.jpg',
  photoPosition: '50% 75%',
  photoZoom: 1.1,
  oneLiner: '',
  linkedinUrl: 'https://www.linkedin.com/in/vaishnavi-shukla-624a54375/',
  githubUrl: 'https://github.com/shukla1vaishnavi-wq',
  skills: ['Java', 'Python', 'Generative AI', 'AI Agents', 'LangChain', 'LangGraph', 'Graphic Design', 'Photography', 'Public Relations', 'Communication'],
  avatarInitial: 'VS',
};

const shubhangiMediaHead: CommunityMember = {
  id: 'shubhangi-sinha-media-head',
  name: 'Shubhangi Sinha',
  branch: '',
  team: 'Media & PR',
  designation: 'Head',
  interests: [],
  photoPath: '/community/members/media-pr-head-shubhangi-sinha-2026-10-28.jpg',
  photoPosition: '50% 25%',
  photoZoom: 1.05,
  oneLiner: '',
  linkedinUrl: 'https://www.linkedin.com/in/shubhangi-sinha-415613382/',
  githubUrl: 'https://github.com/shubhangiverse',
  skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Python', 'C++', 'Content creation', 'Git and Github', 'Cyber Security', 'Public Speaking'],
  avatarInitial: 'SS',
};

const ektaChauhan: CommunityMember = {
  id: 'ekta-chauhan-president',
  name: 'Ekta Chauhan',
  branch: '',
  team: 'Presidents',
  designation: 'President & Co-founder',
  interests: [],
  photoPath: '/community/members/president-ekta-chauhan-2026-11-03.jpg',
  photoPosition: '50% 28%',
  oneLiner: '',
  linkedinUrl: 'https://www.linkedin.com/in/ektaa-chauhan/',
  githubUrl: 'https://github.com/ektachauhan013',
  skills: [
    'HTML', 'CSS', 'JavaScript', 'R', 'C++', 'React', 'Python', 'SQL', 'Tableau',
    'Event Management', 'Team Leadership', 'Communication',
  ],
  avatarInitial: 'EC',
};

const ektaYadav: CommunityMember = {
  id: 'ekta-yadav-president',
  name: 'Ekta Yadav',
  branch: '',
  team: 'Presidents',
  designation: 'Former President & Co-founder',
  interests: [],
  photoPath: '/community/members/president-ekta-yadav-2026-11-03.jpg',
  photoPosition: '50% 28%',
  photoZoom: 1.18,
  photoTransformOrigin: '50% 30%',
  oneLiner: '',
  linkedinUrl: 'https://www.linkedin.com/in/ekta-yadav-8b87bb36a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/ektay24y24-creator',
  skills: [
    'AI/ML', 'Python', 'C++', 'LLMs', 'AI application development',
    'Entrepreneurship', 'Leadership', 'Team management', 'Strategic planning', 'Communication',
  ],
  avatarInitial: 'EY',
};

export const communityPresidents = [
  ektaChauhan,
  ektaYadav,
];

export const communityTeams: CommunityTeam[] = [
  {
    id: 'technical',
    name: 'Technical',
    heads: [prachiSharma, soniyaTechnicalHead, dorisTechnicalHead, ...legacyMembers],
    committeeMembers: [
      anjaliTechnicalCoordinator,
      soumyaTechnicalCoordinator,
      manasiTechnicalCoordinator,
      chahTechnicalCoordinator,
      vaishnaviTechnicalCoordinator,
    ],
  },
  {
    id: 'research',
    name: 'Research & Innovation',
    heads: [bhavyaResearchHead, swastiResearchHead],
    committeeMembers: [
      anushaResearchCoordinator,
      pranshiResearchCoordinator,
      kumkumResearchCoordinator,
      pragatiResearchCoordinator,
      shreyaResearchCoordinator,
      anyaResearchCoordinator,
    ],
  },
  {
    id: 'media-pr',
    name: 'Media & PR',
    heads: [vaishnaviMediaHead, shubhangiMediaHead],
    committeeMembers: [bhavyaGuptaMediaCoordinator, ektaYadavMediaCoordinator, meherGuptaMediaCoordinator],
  },
  {
    id: 'event-management',
    name: 'Event Management',
    heads: [millyshreeGuptaEventHead],
    committeeMembers: [charviEventCoordinator, abhishaEventCoordinator, diyaEventCoordinator],
  },
  {
    id: 'partnership',
    name: 'Partnership',
    heads: [rakshaSponsorshipHead],
    committeeMembers: [rushikaSponsorshipCoordinator, ayushiSponsorshipCoordinator, kaishaaBathejaPartnershipMember],
  },
];

export const allCommunityMembers = [
  ...communityPresidents,
  ...communityTeams.flatMap((team) => [...team.heads, ...team.committeeMembers]),
];

if (allCommunityMembers.length !== 31) {
  throw new Error(`Community roster must contain exactly 31 members; found ${allCommunityMembers.length}.`);
}
