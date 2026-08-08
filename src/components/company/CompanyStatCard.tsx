"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CompanyStatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
}

export default function CompanyStatCard({
  title,
  value,
  icon,
}: CompanyStatCardProps) {
  const numeric = typeof value === "number" ? value : null;
  const [display, setDisplay] = useState(numeric === null ? value : 0);

  useEffect(() => {
    if (numeric === null) return;
    const duration = 500;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * numeric));
      if (progress < 1) requestAnimationFrame(tick);
    }

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [numeric]);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-xl border bg-background p-6 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        {icon}
      </div>
      <h2 className="mt-4 text-3xl font-bold tabular-nums">{display}</h2>
    </motion.div>
  );
}
