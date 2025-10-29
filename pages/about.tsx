import AboutSection from "@/components/AboutSection";
import Timeline from "@/components/Timeline";
import TechStackDetails from "@/components/TechStackDetails";
import PersonalityBanner from "@/components/PersonalityBanner";
import FandomSection from "@/components/FandomSection";
import InterestsServices from "@/components/InterestsServices";

export default function AboutPage() {
  return (
    <div className="space-y-10 py-10">
      <AboutSection />
      <PersonalityBanner />
      <InterestsServices />
      <FandomSection />
      <Timeline />
      <TechStackDetails />
    </div>
  );
}


