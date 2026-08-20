export const SITE = {
  name: 'Karl Nicholson',
  title: 'Karl Nicholson — Physics, data-intensive science and writing',
  description:
    'The personal site of Karl Nicholson: physics, data-intensive science, selected projects, essays and travel writing.',
  url: 'https://karlnicholson.net',
  email: 'kn457@cam.ac.uk',
  links: {
    linkedin: 'https://www.linkedin.com/in/karl-nicholson/',
    github: 'https://github.com/KarlNichlsn',
  },
} as const;

export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/cv/', label: 'CV' },
  { href: '/projects/', label: 'Projects' },
  { href: '/writing/', label: 'Writing' },
] as const;
