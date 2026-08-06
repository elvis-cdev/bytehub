import {
  ShieldCheck,
  BriefcaseBusiness,
  GraduationCap,
  MessageSquare,
  CreditCard,
  Trophy,
} from "lucide-react";

import { Feature } from "@/types/feature";

export const whyByteHub: Feature[] = [
  {
    title: "Built for Student Developers",
    description:
      "Unlike generic job platforms, ByteHub is designed to help university students showcase practical software engineering skills.",
    icon: GraduationCap,
  },
  {
    title: "Hire by Proof, Not Promises",
    description:
      "Businesses evaluate real projects, portfolios, GitHub work, and achievements instead of relying only on CVs.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Verified Profiles",
    description:
      "Student and company verification helps build trust across the platform.",
    icon: ShieldCheck,
  },
  {
    title: "Communication Inside ByteHub",
    description:
      "Developers and clients collaborate through ByteHub, helping protect both parties and keeping projects organized.",
    icon: MessageSquare,
  },
  {
    title: "Secure Payments (Coming Soon)",
    description:
      "Future projects will support payments through ByteHub to provide safer transactions and milestone tracking.",
    icon: CreditCard,
  },
  {
    title: "Build Your Reputation",
    description:
      "Every completed project strengthens your professional profile and ByteScore, making it easier to earn future opportunities.",
    icon: Trophy,
  },
];
