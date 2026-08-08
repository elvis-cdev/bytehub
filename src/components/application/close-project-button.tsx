"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { closeProject } from "@/actions/application";
import { Loader2 } from "lucide-react";

export function CloseProjectButton({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClose() {
    setLoading(true);
    try {
      await closeProject(projectId);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button size="sm" variant="outline" onClick={handleClose} disabled={loading}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
      Mark Completed
    </Button>
  );
}
