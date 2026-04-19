export default function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="scrollbar-hide h-full overflow-y-auto p-5">
        {children}
      </div>
    </div>
  );
}
