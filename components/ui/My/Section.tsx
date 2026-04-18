type SectionProps = {
  title?: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      {title ? (
        <span className="font-semibold text-gray-500 text-sm">{title}</span>
      ) : null}

      <div className="flex w-full flex-col gap-2">{children}</div>
    </div>
  );
}
