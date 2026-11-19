export const site = {
  name: 'Suggestions Blog',
  tagline: 'Clear UK guides for freelancers and remote workers',
  url: 'https://www.suggestionsblog.co.uk',
  description:
    'Plain-English UK guides on freelancer tax, Making Tax Digital, savings, AI tools and remote work. Every article is dated, sourced and starts with the answer.',
  // EDIT: shown on every article. Do not add credentials you do not hold.
  author: {
    name: 'Javed',
    role: 'Editor and writer',
    bio: 'Javed writes Suggestions Blog. He researches each topic from official UK sources such as GOV.UK and explains it in plain English. He is not a regulated financial adviser, accountant or medical professional.',
  },
  // EDIT: add your email-list provider form action to switch the sign-up on.
  // Example (Buttondown): https://buttondown.com/api/emails/embed-subscribe/YOUR-NAME
  newsletterAction: import.meta.env.PUBLIC_NEWSLETTER_ACTION ?? '',
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL ?? '',
  // EDIT: add your profile URLs. Empty ones are hidden.
  social: { x: '', linkedin: '', youtube: '', pinterest: '' } as Record<string, string>,
  pinterestVerify: 'e4525099fb465cac17cda4419420ba63',
};

export type CategoryKey = 'freelancer-finance' | 'money' | 'tech-ai' | 'remote-work' | 'health' | 'learn';

export const categories: Record<
  CategoryKey,
  { title: string; blurb: string; description: string; hue: number; notice: 'finance' | 'health' | null; icon: string }
> = {
  'freelancer-finance': {
    title: 'Freelancer Finance',
    blurb: 'Making Tax Digital, Self Assessment and running a sole-trader business.',
    description:
      'UK tax and money guides for freelancers and sole traders: Making Tax Digital deadlines, Self Assessment, bookkeeping and selling online.',
    hue: 168,
    notice: 'finance',
    icon: 'M4 19h16M6 16V9m6 7V5m6 11v-6',
  },
  money: {
    title: 'Money & Savings',
    blurb: 'ISAs, savings tax and everyday money habits, with UK dates and limits.',
    description: 'UK money guides: ISA limits, tax on savings interest, budgeting and saving, kept up to date after each Budget.',
    hue: 152,
    notice: 'finance',
    icon: 'M12 3v18M16 7.5C15 6.5 13.7 6 12 6c-2 0-3.5 1-3.5 2.6S10 11 12 11.5s3.5 1 3.5 2.9S14 18 12 18c-1.8 0-3.2-.6-4.2-1.6',
  },
  'tech-ai': {
    title: 'Tech & AI',
    blurb: 'Tools, AI and workflows that save a freelancer real time.',
    description: 'Practical guides to AI and software for freelancers and remote workers, with named workflows instead of long tool lists.',
    hue: 258,
    notice: null,
    icon: 'M8 9l-4 3 4 3m8-6l4 3-4 3m-5-9l-2 12',
  },
  'remote-work': {
    title: 'Remote Work',
    blurb: 'Your rights, how to ask for flexibility, and working well from home.',
    description: 'UK remote and flexible working: your rights, how to make a request, and how to work well away from the office.',
    hue: 28,
    notice: null,
    icon: 'M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z',
  },
  health: {
    title: 'Health & Wellbeing',
    blurb: 'Everyday habits and food, with NHS-sourced facts.',
    description: 'General health and wellbeing guides for busy people, based on NHS information. Not medical advice.',
    hue: 350,
    notice: 'health',
    icon: 'M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z',
  },
  learn: {
    title: 'Learn',
    blurb: 'Upskilling online and staying motivated, for freelancers.',
    description: 'How to learn new skills online and keep going, with a focus on upskilling for freelancers and remote workers.',
    hue: 205,
    notice: null,
    icon: 'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5',
  },
};

export const categoryKeys = Object.keys(categories) as CategoryKey[];

export const nav = [
  { href: '/freelancer-finance/', label: 'Freelancer Finance' },
  { href: '/money/', label: 'Money' },
  { href: '/tech-ai/', label: 'Tech & AI' },
  { href: '/remote-work/', label: 'Remote Work' },
  { href: '/blog/', label: 'All articles' },
];
