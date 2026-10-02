import type { IconName } from '../components/Icon.astro';

// The departments students can join. Shown on the home and About pages.
export const subteams: { name: string; icon: IconName; text: string }[] = [
  { name: 'Design & CAD', icon: 'box', text: 'Turn strategy into mechanisms: sketch, prototype and model the robot in CAD.' },
  { name: 'Fabrication', icon: 'wrench', text: 'Machine, cut, drill and assemble. Our shop turns raw aluminum into a robot.' },
  { name: 'Electrical', icon: 'zap', text: 'Wire the power distribution, motor controllers, sensors and pneumatics, cleanly and safely.' },
  { name: 'Programming', icon: 'code', text: 'Write the code that drives the robot, from teleop controls to autonomous routines and vision.' },
  { name: 'Strategy & Scouting', icon: 'chart', text: 'Break down the game, scout every match and help pick the right alliance partners.' },
  { name: 'Business & Outreach', icon: 'megaphone', text: 'Find sponsors, plan fundraisers and share STEM with our community.' },
  { name: 'Media & Design', icon: 'camera', text: 'Photos, video, social media, graphic design and the team look that makes SubZero, SubZero.' },
  { name: 'Safety', icon: 'shield', text: 'Keep everyone safe in the shop and the pits, and build a culture of safety on the team.' },
];

// Written by the team at a 2019 core values session.
export const coreValues: { name: string; text: string }[] = [
  { name: 'Acceptance', text: 'We welcome all individuals and their ideas with an open mind.' },
  { name: 'Respect', text: "We honor everyone's opinions, goals, and actions." },
  { name: 'Kindness', text: 'We are friendly to all we meet and share goodwill in all we do.' },
  { name: 'Integrity', text: 'We strive for honesty and speak up for what we believe is right.' },
  { name: 'Confidence', text: 'We are bold in our ideas and driven by curiosity.' },
  { name: 'Resilience', text: 'We are dedicated to our goals and approach challenges with optimism.' },
  { name: 'Teamwork', text: 'We work together as a cohesive unit to accomplish more.' },
  { name: 'Fun', text: 'We enjoy working with each other and celebrate what we do.' },
];
