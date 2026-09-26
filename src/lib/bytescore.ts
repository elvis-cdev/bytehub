import type { Prisma } from "@prisma/client";

export type ByteScoreBreakdown = {
  profile: number;
  skills: number;
  projects: number;
  applications: number;
  certifications: number;
  testimonials: number;
  profileViews: number;
  total: number;
};

type DeveloperForByteScore = Prisma.UserGetPayload<{
  include: {
    DeveloperProfile: {
      include: {
        Skill: true;
        showcases: true;
        certifications: true;
        testimonials: true;
        views: true;
      };
    };
    applications: true;
  };
}>;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function calculateByteScore(
  user: DeveloperForByteScore
): ByteScoreBreakdown {
  const profile = user.DeveloperProfile;

  if (!profile) {
    return {
      profile: 0,
      skills: 0,
      projects: 0,
      applications: 0,
      certifications: 0,
      testimonials: 0,
      profileViews: 0,
      total: 0,
    };
  }

  // 250 points
  let profileScore = 0;

  if (user.name?.trim()) profileScore += 40;
  if (user.email?.trim()) profileScore += 20;
  if (user.bio?.trim()) profileScore += 30;
  if (profile.university?.trim()) profileScore += 20;
  if (profile.course?.trim()) profileScore += 20;
  if (profile.github?.trim()) profileScore += 20;
  if (profile.portfolio?.trim()) profileScore += 20;
  if (profile.linkedin?.trim()) profileScore += 20;
  if (profile.graduation) profileScore += 15;
  if (profile.videoIntroUrl?.trim()) profileScore += 15;
  if (profile.languages.length > 0) profileScore += 10;
  if (profile.available) profileScore += 20;

  // 150 points
  const skillsScore = clamp(profile.Skill.length * 30, 0, 150);

  // 200 points
  const projectsScore = clamp(profile.showcases.length * 40, 0, 200);

  // 150 points
  const applicationsScore = clamp(user.applications.length * 25, 0, 150);

  // 100 points
  const certificationsScore = clamp(
    profile.certifications.length * 25,
    0,
    100
  );

  // 75 points
  const approvedTestimonials = profile.testimonials.filter(
    (testimonial) => testimonial.approved
  );

  const testimonialsScore = clamp(
    approvedTestimonials.length * 25,
    0,
    75
  );

  // 75 points
  const profileViewsScore = clamp(
    profile.views.length * 5,
    0,
    75
  );

  const total =
    profileScore +
    skillsScore +
    projectsScore +
    applicationsScore +
    certificationsScore +
    testimonialsScore +
    profileViewsScore;

  return {
    profile: profileScore,
    skills: skillsScore,
    projects: projectsScore,
    applications: applicationsScore,
    certifications: certificationsScore,
    testimonials: testimonialsScore,
    profileViews: profileViewsScore,
    total: clamp(total, 0, 1000),
  };
}
