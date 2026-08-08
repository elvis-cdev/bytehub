import ProfileHeader from "@/components/developer/ProfileHeader";
import ProfileForm from "@/components/developer/ProfileForm";
import SkillsInput from "@/components/developer/SkillsInput";

export default function DeveloperProfilePage() {
  return (
    <div className="space-y-8">

      <ProfileHeader
        name="John Doe"
        role="Full Stack Developer"
      />

      <ProfileForm />

      <SkillsInput />

    </div>
  );
}
