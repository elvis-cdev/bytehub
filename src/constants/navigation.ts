import {
  Rss,
  LayoutDashboard,
  UserRound,
  FolderKanban,
  FileText,
  MessageSquare,
  Settings,
  Building2,
  Users,
  ShieldCheck,
  BriefcaseBusiness,
} from "lucide-react";

/* =========================
   Marketing Navigation
========================= */

export const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Developers",
    href: "/developers",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Jobs",
    href: "/jobs",
  },
];

/* =========================
   Developer Dashboard
========================= */

export const developerNavigation = [
  {
    label: "Dashboard",
    href: "/developer/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Feed",
    href: "/feed",
    icon: Rss,
  },
  {
    label: "Profile",
    href: "/developer/profile",
    icon: UserRound,
  },
  {
    label: "Projects",
    href: "/developer/projects",
    icon: FolderKanban,
  },
  {
    label: "Applications",
    href: "/developer/applications",
    icon: FileText,
  },
  {
    label: "Messages",
    href: "/developer/messages",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    href: "/developer/settings",
    icon: Settings,
  },
];

/* =========================
   Company Dashboard
========================= */

export const companyNavigation = [
  {
    label: "Dashboard",
    href: "/company/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Feed",
    href: "/feed",
    icon: Rss,
  },
  {
    label: "Company Profile",
    href: "/company/profile",
    icon: Building2,
  },
  {
    label: "Projects",
    href: "/company/projects",
    icon: FolderKanban,
  },
  {
    label: "Developers",
    href: "/company/developers",
    icon: Users,
  },
  {
    label: "Messages",
    href: "/company/messages",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    href: "/company/settings",
    icon: Settings,
  },
];

/* =========================
   Admin Dashboard
========================= */

export const adminNavigation = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Companies",
    href: "/admin/companies",
    icon: Building2,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: BriefcaseBusiness,
  },
  {
    label: "Reports",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    label: "Administration",
    href: "/admin/system",
    icon: ShieldCheck,
  },
];
