import { DashboardPreveiw } from "@/components/frontend/DashboardPreview";
import HeroSection from "@/components/frontend/HeroSection";
import LogoCloud from "@/components/frontend/LogoCloud";
import FeaturesGrid from "@/components/frontend/FeaturesGrid";
import Pricing from "@/components/frontend/Pricing";
import TabFeatures from "@/components/frontend/TabFeatures";

function Home() {
  return (
    <div>
      <HeroSection />
      <LogoCloud />
      <DashboardPreveiw />
      <FeaturesGrid />
      <TabFeatures />
      <Pricing />
    </div>
  );
}
export default Home;
