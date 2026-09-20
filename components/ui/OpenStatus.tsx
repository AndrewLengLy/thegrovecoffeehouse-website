"use client";

import { useOpenStatus } from "@/lib/open-status";

/**
 * "Open now, until 5 PM". The one fact a phone visitor wants before anything
 * else. Until the browser has worked it out, the fallback shows instead, so the
 * server rendered page never states something that may be untrue by the time
 * it is read.
 */
export function OpenStatus({
  fallback,
  className = "",
  stacked = false,
}: {
  fallback: string;
  className?: string;
  /** Label and detail on two lines instead of one. */
  stacked?: boolean;
}) {
  const status = useOpenStatus();

  if (!status) {
    return <span className={className}>{fallback}</span>;
  }

  const dot =
    status.state === "open"
      ? "bg-[#6fcf8e]"
      : status.state === "closing"
        ? "bg-ember"
        : "bg-current opacity-50";

  return (
    <span
      className={`inline-flex ${stacked ? "flex-col items-start" : "flex-wrap items-baseline gap-x-1.5"} ${className}`}
    >
      <span className="inline-flex items-center gap-2 whitespace-nowrap">
        <span aria-hidden="true" className={`inline-block h-2 w-2 shrink-0 rounded-full ${dot}`} />
        <span>
          {status.label}
          {stacked ? null : <span aria-hidden="true">,</span>}
        </span>
      </span>
      {/* Stacked lives in tight spaces, so its detail is allowed to wrap. */}
      <span className={stacked ? "pl-4 opacity-75" : "whitespace-nowrap"}>{status.detail}</span>
    </span>
  );
}
