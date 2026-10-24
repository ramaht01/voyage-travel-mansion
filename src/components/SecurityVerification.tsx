
import { Turnstile } from "@marsidev/react-turnstile";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import type { Ref } from "react";
import { ShieldCheck } from "lucide-react";

type SecurityVerificationProps = {
  turnstileRef: Ref<TurnstileInstance>;
};

export default function SecurityVerification({
  turnstileRef,
}: SecurityVerificationProps) {
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
            Please complete the quick security check below
            before submitting your travel request.
          </p>
        </div>
      </div>

      <div className="flex justify-start overflow-hidden">
        <Turnstile
          ref={turnstileRef}
          siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
          options={{
            theme: "dark",
            size: "flexible",
          }}
        />
      </div>
    </div>
  );
}
