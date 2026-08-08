import ProfileHeader from "@/components/developer/ProfileHeader";
import ProfileForm from "@/components/developer/ProfileForm";
import SkillsInput from "@/components/developer/SkillsInput";
import { getMyDeveloperProfile } from "@/actions/profile";

export default async function DeveloperProfilePage() {
  const user = await getMyDeveloperProfile();
  const profile = user?.DeveloperProfile;

  return (
    <div className="space-y-8">
      <ProfileHeader
        name={user?.name ?? ""}
        image={user?.image ?? undefined}
        role="Student Developer"
      />

      <ProfileForm
        initial={{
          bio: user?.bio ?? "",
          image: user?.image ?? "",
          university: profile?.university ?? "",
          course: profile?.course ?? "",
          graduation: profile?.graduation?.toString() ?? "",
          hourlyRate: profile?.hourlyRate?.toString() ?? "",
          github: profile?.github ?? "",
          linkedin: profile?.linkedin ?? "",
          portfolio: profile?.portfolio ?? "",
        }}
      />

      <SkillsInput skills={profile?.Skill ?? []} />
    </div>
  );
}
