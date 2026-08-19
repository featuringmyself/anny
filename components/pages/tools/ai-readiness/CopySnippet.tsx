"use client";

import { useState } from "react";

export function CopySnippet({
  filename,
  code,
}: {
  filename: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="mt-4 overflow-hidden border border-zinc-200 bg-zinc-950 text-white">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
        <p className="truncate font-mono text-[11px] text-zinc-400">{filename}</p>
        <button
          type="button"
          className="shrink-0 text-[11px] font-medium tracking-wide text-[#9dffd4] uppercase"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1600);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-48 overflow-auto p-3 font-mono text-[11px] leading-relaxed text-zinc-300 whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
}
