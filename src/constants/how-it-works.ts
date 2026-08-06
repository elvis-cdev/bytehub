import {
  UserPlus,
  FolderGit2,
  Handshake,
  Rocket,
} from "lucide-react";

import { Step } from "@/types/step";

export const howItWorks: Step[] = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Build your ByteHub profile with your skills, education, and portfolio.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Showcase Projects",
    description:
      "Upload your best work so clients can evaluate your real abilities.",
    icon: FolderGit2,
  },
  {
    number: "03",
    title: "Connect with Clients",
    description:
      "Receive opportunities, apply for projects, and collaborate through ByteHub.",
    icon: Handshake,
  },
  {
    number: "04",
    title: "Grow Your Career",
    description:
      "Complete projects, earn reviews, and build your ByteScore.",
    icon: Rocket,
  },
];
