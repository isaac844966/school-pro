function SmallTitle({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex w-fit mx-auto items-center rounded-lg bg-muted px-3 py-1 text-sm">
      {icon}
      <h4 className="text-lg font-semibold capitalize">{text}</h4>
    </div>
  );
}
export default SmallTitle;
