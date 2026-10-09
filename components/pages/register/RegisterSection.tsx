import Image from "next/image";

import { brand } from "@/components/Home/brand";
import RegisterForm from "@/components/pages/register/RegisterForm";
import RegisterSocialProof from "@/components/pages/register/RegisterSocialProof";
import type { RegisterPlan } from "@/lib/plans";

import logoImg from "@/public/logo.png";

/**
 * Split signup layout aligned with GEO peers (Otterly, Scrunch, Profound):
 * form on a white column, value + steps on a dark column.
 */
export default function RegisterSection({ plan }: { plan?: RegisterPlan }) {
  return (
    <section
      className="relative w-full overflow-hidden rounded-2xl border border-zinc-900/10 bg-white"
      aria-labelledby="register-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[640px]">
        <div className="order-1 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-16">
          <Image
            src={logoImg}
            alt="Dodox"
            width={logoImg.width}
            height={logoImg.height}
            className="h-9 w-auto object-contain sm:h-10"
            style={{ width: "auto" }}
          />
          <RegisterForm plan={plan} />
        </div>

        <div className="order-2 lg:min-h-full">
          <RegisterSocialProof />
        </div>
      </div>
    </section>
  );
}
