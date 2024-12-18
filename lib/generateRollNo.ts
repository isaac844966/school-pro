

export function generateRollNo(
  schoolCode: string,
    sponsorshipType: "PS" | "SS",
   sequence: number
): string {
  if (sequence < 1 || sequence > 9999) {
    throw new Error(
      "Invalid sequence number. It should be between 1 and 9999."
    );
  }
  const paddedSequence = sequence.toString().padStart(4, "0");
  const year = new Date().getFullYear();
  const rollnumber = `${schoolCode}/${sponsorshipType}/${year}/${paddedSequence}`;

  return rollnumber;
}