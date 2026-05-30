import { type LicenseTier } from "@/lib/products";
import {
  getLicensesConfig,
  getLicenseTypeInfo,
  resolveLicenseLabel,
} from "@/lib/licenses";

type Props = { licenses: LicenseTier[] };

export function ProductLicenses({ licenses }: Props) {
  if (licenses.length === 0) return null;

  const config = getLicensesConfig();

  return (
    <div className="mt-8">
      <h2 className="text-ink text-lg font-medium">{config.title}</h2>
      <div className="mt-4 space-y-4">
      {licenses.map((tier, index) => {
        const info = getLicenseTypeInfo(tier.key);
        const label = resolveLicenseLabel(tier.key, tier.label);

        return (
          <div key={tier.key} className="space-y-4">
            <a
              href={tier.payurl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                index === 0
                  ? "bg-accent border-ink text-ink shadow-brutal flex w-full items-center justify-between gap-4 rounded-xl border-2 px-6 py-4 transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
                  : "border-ink text-ink shadow-brutal-sm flex w-full items-center justify-between gap-4 rounded-xl border-2 bg-surface px-6 py-4 transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
              }
            >
              <span className="text-base font-medium">{label}</span>
              <span className="flex shrink-0 items-center gap-3">
                {tier.free ? (
                  <span className="bg-ink/10 rounded-md px-3 py-1 text-sm font-medium">
                    Free
                  </span>
                ) : (
                  <>
                    {tier.price ? (
                      <span className="text-muted text-sm sm:text-base">
                        {tier.price}
                      </span>
                    ) : null}
                    <span className="bg-ink/10 rounded-md px-3 py-1 text-sm font-medium">
                      Purchase
                    </span>
                  </>
                )}
              </span>
            </a>
            {info?.description ? (
              <p className="text-muted mt-2 px-1 text-sm leading-6 sm:text-base">
                <span className="text-ink font-medium">{label}</span>
                {" — "}
                {info.description}
              </p>
            ) : null}
          </div>
        );
      })}
      </div>
    </div>
  );
}
