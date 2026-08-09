import { getAllUsers } from "@/actions/admin";
import PageHeader from "@/components/dashboard/components/PageHeader";
import { UserRow } from "@/components/admin/UserRow";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-8">
      <PageHeader title="Users" description={`${users.length} registered users`} />
      <div className="space-y-3">
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
