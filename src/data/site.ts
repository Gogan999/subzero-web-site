// Site-wide team info. Edit here and it updates everywhere on the site.

export const site = {
  name: 'SubZero Robotics',
  teamNumber: 5690,
  tagline: 'FIRST Robotics Competition Team 5690',
  location: 'Esko, Minnesota',
  school: 'Esko High School',
  founded: 2014,
  rookieYear: 2015,
  description:
    'SubZero Robotics is FIRST Robotics Competition Team 5690 from Esko High School in Esko, Minnesota. Students design, build and program competition robots while learning engineering, business and leadership skills.',
  email: 'subzerorobotics@esko.k12.mn.us',
  coaches: [
    { name: 'Logan Mills', email: 'gogan99@gmail.com' },
    { name: 'Lexxy Napper', email: 'lexnapper@gmail.com' },
  ],
  address: {
    lines: ['SubZero Robotics', 'Esko Public Schools', '2 E. Hwy 61, P.O. Box 10', 'Esko, MN 55733'],
  },
  social: {
    facebook: 'https://www.facebook.com/SubZeroRobotics5690',
    instagram: 'https://www.instagram.com/subzerorobotics/',
    blueAlliance: 'https://www.thebluealliance.com/team/5690',
    firstEvents: 'https://frc-events.firstinspires.org/team/5690',
    tiktok: 'https://www.tiktok.com/@subzero_robotics',
    github: 'https://github.com/SubZero-Robotics',
  },
} as const;

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Robots', href: '/robots/' },
  { label: 'History', href: '/history/' },
  { label: 'News', href: '/news/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Outreach', href: '/outreach/' },
  { label: 'Sponsors', href: '/sponsors/' },
] as const;
