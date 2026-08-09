import { getMyConversations } from "@/actions/collaboration";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import PageHeader from "@/components/dashboard/components/PageHeader";
import { MessagesInbox } from "@/components/collaboration/messages-inbox";

export default async function AdminMessagesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const conversations = await getMyConversations();

  return (
    <div className="space-y-8">
      <PageHeader title="Messages" description="Your conversations." />
      <MessagesInbox conversations={conversations} currentUserId={session?.user.id ?? ""} />
    </div>
  );
}
