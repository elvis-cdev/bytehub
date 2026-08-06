import { LucideIcon } from "lucide-react";

export interface AudienceFeature {
  icon: LucideIcon;
  text: string;
}

export interface Audience {
  title: string;
  subtitle: string;
  description: string;
  button: string;
  href: string;
  icon: LucideIcon;
  features: AudienceFeature[];
}
