import ProfileHeader from "@/components/developer/ProfileHeader";
import CompanyProfileForm from "@/components/company/CompanyProfileForm";
import { getMyCompanyProfile } from "@/actions/profile";

export default async function CompanyProfilePage() {
  const user = await getMyCompanyProfile();
  const profile = user?.ClientProfile;
  return (
    <div className="space-y-8">
      <ProfileHeader
        name={user?.name ?? ""}
        image={user?.image ?? undefined}
        role="Company"
      />
      <CompanyProfileForm
        initial={{
          bio: user?.bio ?? "",
          image: user?.image ?? "",
          company: profile?.company ?? "",
          website: profile?.website ?? "",
        }}
      />
    </div>
  );
}
