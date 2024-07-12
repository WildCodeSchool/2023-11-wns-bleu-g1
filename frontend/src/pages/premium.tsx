import AuthLayout from "@/components/elements/auth-layout";
import ExternalLinkIcon from "@/components/elements/external-link-arrow";
import { memo, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
 
interface PricingOption {
  name: string;
  price: string;
  yearlyPrice: string;
  description: string;
  features: string[];
  extraBenefits?: string;
  link?: string;
  btn?: string;
  external?: boolean;
}
 
interface PricingToggleProps {
  enabled: boolean;
  setEnabled: (e: boolean) => void;
  color?: string;
}
 
interface PricingCardProps {
  option: PricingOption;
  enabled: boolean;
}
 
const PricingToggle = memo(
  ({ enabled, setEnabled, color }: PricingToggleProps) => (
    <div className="flex items-center">
      <span
        className={`mr-2 font-bold ${enabled ? "text-neutral-500/60" : ""}`}
      >
        Mensuel
      </span>
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? `${color}` : "bg-neutral-400"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </div>
      </label>
      <span
        className={`ml-2 font-bold ${enabled ? "" : "text-neutral-500/60"}`}
      >
        Annuel
      </span>
    </div>
  ),
);
 
const PricingCard = memo(({ option, enabled }: PricingCardProps) => (
  <div className="grid h-full w-full grid-cols-1 rounded-xl border border-neutral-700/50 lg:grid-cols-5">
    <div className="col-span-2 flex flex-col justify-between gap-y-10 rounded-t-xl bg-neutral-50 p-5 dark:bg-neutral-900 lg:rounded-t-none lg:rounded-bl-xl lg:rounded-tl-xl">
      <div className="flex flex-col gap-y-2">
        <p className="text-2xl font-semibold text-white">
          {option.name}
        </p>
        <p className="mx-0 max-w-md font-medium tracking-tight text-neutral-400">
          {option.description}
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-sm font-medium text-white">
          <span className="text-3xl font-[620] text-white">
            {enabled ? option.yearlyPrice : option.price}
            <span className="text-sm font-medium text-neutral-400">
              {enabled ? "/an" : "/mois"}
            </span>
          </span>
        </h3>
        {/* className="my-2 flex h-10 w-full items-center justify-center rounded-lg border border-neutral-500 text-base font-bold transition duration-100 hover:shadow-md hover:drop-shadow-md bg-neutral-100 text-neutral-800"> */}
        <Link href={option.link} className={buttonVariants()} target={option.external && "_blank"}>
            <span className="tracking-tight">
                {option.btn}
            </span>
            {option.external && <ExternalLinkIcon className="h-4 w-4 ml-2" />}
        </Link>
      </div>
    </div>
    <div className="col-span-3 flex flex-col justify-center gap-y-5 p-5 lg:pl-10">
      {option.extraBenefits && (
        <p className="text-[15px] font-medium text-neutral-500">
          {option.extraBenefits}
        </p>
      )}
      {option.features.map((feature, index) => (
        <div key={index} className="flex gap-x-3">
          <div className="flex items-center justify-center">
            {/* <CheckCircledIcon className="h-6 w-6 text-green-500" /> */}
          </div>
          <p className="font-medium text-neutral-900 dark:text-white">
            {feature}
          </p>
        </div>
      ))}
    </div>
  </div>
));
 
export default function Pricing() {
  const [enabled, setEnabled] = useState(false);
const pricingOptions: PricingOption[] = [
    {
        name: "Gratuit",
        price: "0€",
        yearlyPrice: "0€",
        description:
            "Profitez d'un éditeur de code gratuit pour développer vos projets. Accédez à toutes les fonctionnalités essentielles pour écrire, tester et déboguer votre code.",
        features: [
            "Accès à toutes les fonctionnalités",
            "Coloration syntaxique",
            "Auto-complétion",
            "50 exécutions de code par jour",
        ],
        link: "/coding/codingPage",
        external: false,
        btn: "Continuer avec le plan gratuit",
        
    },
    {
        name: "Pro",
        price: "9,99€",
        yearlyPrice: "99,99€",
        description:
            "En plus de toutes les fonctionnalités de la version gratuite, vous bénéficiez d'un support prioritaire, et bien plus encore avec notre abonnement Pro.",
        features: [
            "Accès à toutes les fonctionnalités",
            "Coloration syntaxique",
            "Auto-complétion",
            "Support prioritaire",
            "Exécution de code illimitée",
        ],
        link: "https://buy.stripe.com/test_5kAcQy4Qj08j0c8fYZ",
        btn: "Passer premium",
        external: true,
        extraBenefits: "Tout ce qui est inclus dans le plan gratuit, plus",
    },
];
 
  return (
    <AuthLayout>
        <section className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-y-2">
                <div className="mx-auto max-w-5xl text-center">
            
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Développez sans limite
                    </h2>
            
                    <p className="mt-4 text-2xl leading-8 text-white">
                        avec notre éditeur de code <strong>puissant</strong> et <strong>intuitif</strong>.
                    </p>
                </div>
                <div className="mt-5 flex justify-center">
                    <PricingToggle
                        enabled={enabled}
                        setEnabled={setEnabled}
                        color="bg-primary"
                    />
                </div>
                    <div className="mx-auto grid h-full w-full max-w-4xl place-content-center items-center gap-6 px-10 py-6 lg:items-start">
                    {pricingOptions.map((option, index) => (
                        <PricingCard key={index} option={option} enabled={enabled} />
                    ))}
                </div>
            </div>
        </section>
    </AuthLayout>
  );
}