import SiteFooter from "@/components/frontend/SiteFotter";
import SiteHeader from "@/components/SiteHeader";

function FontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
export default FontLayout;
