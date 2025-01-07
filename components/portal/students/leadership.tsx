import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

interface YearData {
  [term: string]: string[];
}

interface LeadershipRecord {
  [year: string]: YearData;
}

type LeadershipProps = {
  selectedTerm: { term: string; year: string };
};

export function Leadership({ selectedTerm }: LeadershipProps) {
  const leadershipRecords: LeadershipRecord = {
    "2023": {
      "1": [
        "Class Representative",
        "Science Club President",
        "Basketball Team Captain",
        "Volunteer at Local Animal Shelter",
      ],
      "2": [
        "Class Representative",
        "Science Club President",
        "Debate Team Member",
        "Math Olympiad Participant",
      ],
      "3": [
        "Student Council Member",
        "Science Fair Organizer",
        "Basketball Team Captain",
        "Environmental Club Leader",
      ],
    },
    "2022": {
      "1": [
        "Class Monitor",
        "Science Club Member",
        "Junior Basketball Team",
        "Art Club Participant",
      ],
      "2": [
        "Class Monitor",
        "Science Club Vice President",
        "Junior Basketball Team",
        "School Newsletter Editor",
      ],
      "3": [
        "Class Representative",
        "Science Club President",
        "Junior Basketball Team Captain",
        "Volunteer at Local Library",
      ],
    },
  };

  const leadershipData =
    leadershipRecords[selectedTerm.year]?.[selectedTerm.term] || [];

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          Leadership & Activities
        </CardTitle>
        <Award className="h-6 w-6 text-blue-600" />
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-sm text-gray-500">
          Term {selectedTerm.term}, {selectedTerm.year}
        </p>
        <ul className="list-disc list-inside space-y-2">
          {leadershipData.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
