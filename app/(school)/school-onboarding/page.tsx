import SchoolOnboardingForm from "@/components/dashboard/forms/school/school-onboarding";
import { Card, CardContent } from "@/components/ui/card";

export default function page() {
  return (
    <div>
      <div className="max-w-3xl mx-auto p-16">
        <Card className="border-t-4 border-blue-600 shadow">
          <CardContent className="p-6">
            <SchoolOnboardingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
