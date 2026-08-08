"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { updateApplicationStatus } from "@/actions/application";
import { Check, X, Loader2, UserRound } from "lucide-react";
import { toast } from "sonner";

export function ApplicantActions({
  applicationId,
  developerId,
}: {
  applicationId: string;
  developerId: string;
}) {
  const [loading, setLoading] = useState<"accept" | "reject" | null>(null);

  async function handle(status: "ACCEPTED" | "REJECTED") {
    setLoading(status === "ACCEPTED" ? "accept" : "reject");
    try {
      await updateApplicationStatus(applicationId, status);
      toast.success(
        status === "ACCEPTED" ? "Applicant accepted 🎉" : "Applicant declined"
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="ghost" asChild>
        <Link href={`/company/developers/${developerId}`}>
          <UserRound className="h-4 w-4" />
        </Link>
      </Button>
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          size="sm"
          variant="outline"
          className="hover:border-green-400 hover:bg-green-50 hover:text-green-700"
          onClick={() => handle("ACCEPTED")}
          disabled={loading !== null}
        >
          {loading === "accept" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
        </Button>
      </motion.div>
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          size="sm"
          variant="outline"
          className="hover:border-red-400 hover:bg-red-50 hover:text-red-700"
          onClick={() => handle("REJECTED")}
          disabled={loading !== null}
        >
          {loading === "reject" ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
        </Button>
      </motion.div>
    </div>
  );
}
