import { useId } from "react";

type Props = {
  progress: number;
  size?: number;
  stroke?: number;
  label?: string;
};

export function ProgressRing({ progress, size = 120, stroke = 6, label }: Props) {
  const uid = useId();
  const gradId = `ringGrad-${uid}`;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgb(255 255 255 / 0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-200 ease-linear"
        />
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-lg font-semibold tabular-nums text-white">
          {Math.round(progress * 100)}%
        </span>
        {label && (
          <span className="text-[10px] uppercase tracking-wider text-slate-500">{label}</span>
        )}
      </div>
    </div>
  );
}
