import ProfileHeader from "@/components/developer/ProfileHeader";
import ProfileForm from "@/components/developer/ProfileForm";
import SkillsInput from "@/components/developer/SkillsInput";
import WorkTab from "@/components/developer/WorkTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyDeveloperProfile } from "@/actions/profile";
import { getMyPortfolioProjects } from "@/actions/developer";
export default async function DeveloperProfilePage() {
  const user = await getMyDeveloperProfile();
  const profile = user?.DeveloperProfile;
  const workSamples = await getMyPortfolioProjects();
  return (
    <div className="space-y-8">
      <ProfileHeader
        name={user?.name ?? ""}
        image={user?.image ?? undefined}
        role="Student Developer"
      />
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="work">Work</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-8 mt-6">
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
        </TabsContent>
        <TabsContent value="work" className="mt-6">
          <WorkTab initialProjects={workSamples} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
