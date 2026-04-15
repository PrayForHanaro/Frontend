type SectionProps = {
  title?: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="flex flex-col gap-3 px-4">
      {title && (
        <span className="text-sm font-semibold text-gray-500">{title}</span>
      )}

      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}