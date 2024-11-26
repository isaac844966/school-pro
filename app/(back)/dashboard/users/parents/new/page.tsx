import ParentForm from "@/components/dashboard/forms/users/parent-form";
import { Card, CardContent } from "@/components/ui/card";

function page() {
  return (
    <div className="w-full mx-auto p-6 lg:px-20">
      <Card className="border-t-4 border-blue-600 shadow mt-10">
        <CardContent className="p-6">
          <ParentForm />
        </CardContent>
      </Card>
    </div>
  );
}
export default page;
