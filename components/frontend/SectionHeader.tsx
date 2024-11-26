import SmallTitle from "./SmallTitle";
import { Sparkles } from "lucide-react";
export default function SectionHeader({
  title,
  description,
  heading,
}: {
  title?: string;
  description: string;
  heading: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      {title && (
        <SmallTitle icon={<Sparkles className="mr-2 h-4 w-4" />} text={title} />
      )}
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        {heading}
      </h2>
      <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
