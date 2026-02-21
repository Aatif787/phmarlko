import type { JSX } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <main className="scroll-section bg-med-bg/60 py-10">
      <ScrollReveal animation="fade-up" duration={0.8}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          MedExpress respects your privacy. This summary is provided for the prototype and
          should be reviewed by legal counsel before production use.
        </p>
        <div className="mt-6 space-y-4 text-sm text-slate-700">
          <section>
            <h2 className="font-semibold text-slate-900">Information we collect</h2>
            <p>
              We collect basic contact details, delivery addresses and prescription images
              shared by you for the purpose of fulfilling medicine delivery orders.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900">
              How we use your information
            </h2>
            <p>
              Your information is used only to process your orders, coordinate with partner
              pharmacies and arrange deliveries. We do not sell your data.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900">Data sharing</h2>
            <p>
              Prescription details are shared only with verified pharmacies and delivery
              partners strictly for order fulfilment and regulatory requirements.
            </p>
          </section>
        </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
