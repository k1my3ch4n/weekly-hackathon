interface StepDetailProps {
  step: {
    icon: string;
    title: string;
    desc: string;
    visual: string;
    color: string;
  };
}

export default function StepDetail({ step }: StepDetailProps) {
  return (
    <>
      <div
        className="font-display text-base font-semibold mb-2 flex items-center gap-2"
        style={{ color: step.color }}
      >
        {step.icon} {step.title}
      </div>
      <div className="text-[13px] text-text-secondary leading-[1.8]">
        {step.desc}
      </div>
      <pre className="mt-4 rounded-lg p-4 bg-bg-deep text-[12px] leading-[1.8] font-mono text-text-secondary overflow-x-auto whitespace-pre">
        {step.visual}
      </pre>
    </>
  );
}
