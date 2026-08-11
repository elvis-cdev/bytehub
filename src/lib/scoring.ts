export function calculateByteScore(profile: {
  showcases: unknown[];
  Skill: unknown[];
  certifications: unknown[];
  testimonials: { approved: boolean }[];
  events: unknown[];
}) {
  let score = 0;
  score += Math.min(profile.showcases.length * 15, 60);
  score += Math.min(profile.Skill.length * 5, 40);
  score += Math.min(profile.certifications.length * 10, 30);
  score += profile.testimonials.filter((t) => t.approved).length * 20;
  score += Math.min(profile.events.length * 8, 24);
  return Math.min(score, 999);
}

export function calculateProfileCompleteness(user: { bio: string | null }, profile: {
  university: string | null;
  Skill: unknown[];
  showcases: unknown[];
  github: string | null;
  linkedin: string | null;
} | null) {
  const checks = [
    !!user.bio,
    !!profile?.university,
    (profile?.Skill.length ?? 0) > 0,
    (profile?.showcases.length ?? 0) > 0,
    !!profile?.github,
    !!profile?.linkedin,
  ];
  const complete = checks.filter(Boolean).length;
  return Math.round((complete / checks.length) * 100);
}
