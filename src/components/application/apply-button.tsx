"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { applyToProject } from "@/actions/application";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function ApplyButton({
  projectId,
  alreadyApplied,
}: {
  projectId: string;
  alreadyApplied: boolean;
}) {
  const [applied, setApplied] = useState(alreadyApplied);
  const [loading, setLoading] = useState(false);

  async function handleApply() {
    setLoading(true);
    try {
      await applyToProject(projectId);
      setApplied(true);
      toast.success("Application sent!", {
        description: "You'll be notified when the company responds.",
        icon: <Sparkles className="h-4 w-4" />,
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to apply");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {applied ? (
        <motion.div
          key="applied"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-full"
        >
          <Button disabled variant="secondary" className="gap-2 w-full">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Applied
          </Button>
        </motion.div>
      ) : (
        <motion.div key="apply" className="w-full">
          <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01 }}>
            <Button onClick={handleApply} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Applying...
                </>
              ) : (
                "Apply Now"
              )}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
