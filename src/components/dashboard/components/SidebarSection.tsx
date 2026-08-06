import { ReactNode } from "react";

interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
}

export default function SidebarSection({
  title,
  children,
}: SidebarSectionProps) {
  return (
    <div className="space-y-2">
      {title && (
        <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
      )}

      {children}
    </div>
  );
}
