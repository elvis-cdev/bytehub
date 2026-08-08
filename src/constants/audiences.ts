import {
  BriefcaseBusiness,
  Code2,
  Search,
  FolderGit2,
  Users,
  Rocket,
} from "lucide-react";

export const audiences = [
  {
    title: "For Developers",
    subtitle: "Build your reputation through real work.",
    description:
      "Create a professional profile, showcase projects, and connect with businesses looking for skilled student developers.",

    button: "Start Building",

    href: "/register?role=developer",

    icon: Code2,

    features: [
      {
        icon: FolderGit2,
        text: "Showcase real software projects",
      },
      {
        icon: Rocket,
        text: "Build your professional portfolio",
      },
      {
        icon: Users,
        text: "Get discovered by businesses",
      },
    ],
  },

  {
    title: "For Businesses",

    subtitle: "Hire talent based on proven skills.",

    description:
      "Browse student portfolios, discover emerging developers, and hire confidently through one trusted platform.",

    button: "Find Talent",

    href: "/register?role=client",

    icon: BriefcaseBusiness,

    features: [
      {
        icon: Search,
        text: "Browse verified portfolios",
      },
      {
        icon: Users,
        text: "Discover emerging talent",
      },
      {
        icon: Rocket,
        text: "Hire with confidence",
      },
    ],
  },
];
