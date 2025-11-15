import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectsGridPreview from "@/components/ProjectsGridPreview";
import TechStack from "@/components/TechStack";
import CurrentRole from "@/components/CurrentRole";
import ContactCTA from "@/components/ContactCTA";
import GamingStickerBar from "@/components/GamingStickerBar";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <GamingStickerBar />
      <FeaturedProject />
      <ProjectsGridPreview />
      <TechStack />
      <CurrentRole />
      <ContactCTA />
    </div>
  );
}

