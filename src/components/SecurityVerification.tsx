import { useState } from "react";
import type { Ref } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { ShieldCheck } from "lucide-react";

type SecurityVerificationProps = {
  turnstileRef: Ref<TurnstileInstance>;
};

export default function SecurityVerification({
  turnstileRef,
}: SecurityVerificationProps) {
  // Track when the Cloudflare widget finishes loading
  const [isWidgetLoading, setIsWidgetLoading] = useState(true);

  return (
    <div className="my-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
          <ShieldCheck size={20} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            One last step — Security Verification
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-slate-300">
            Please complete the quick security check below before submitting
            your travel request.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 overflow-hidden">
        {/* Display while Cloudflare loads */}
        {isWidgetLoading && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-3 text-sm text-slate-400"
          >
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-cyan-400"
            />

            <span>Loading security verification...</span>
          </div>
        )}

        {/* Cloudflare Turnstile */}
        <Turnstile
          ref={turnstileRef}
          siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
          onWidgetLoad={() => setIsWidgetLoading(false)}
          options={{
            theme: "dark",
            size: "flexible",
          }}
        />
      </div>
    </div>
  );
}
