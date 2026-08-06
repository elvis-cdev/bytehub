import { ReactNode } from "react";

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
}

export default function SidebarSection({
  title,
  children,
}: SidebarSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>

      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}
