import type { JSX } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function TermsAndConditionsPage(): JSX.Element {
  return (
    <main className="scroll-section bg-med-bg/60 py-10">
      <ScrollReveal animation="fade-up" duration={0.8}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          These terms outline the basic conditions under which MedExpress provides medicine
          delivery services. Please adapt and extend this with legal review.
        </p>
        <div className="mt-6 space-y-4 text-sm text-slate-700">
          <section>
            <h2 className="font-semibold text-slate-900">Prescription requirement</h2>
            <p>
              Orders are accepted only against valid prescriptions from registered medical
              practitioners. MedExpress reserves the right to decline orders that do not meet
              regulatory requirements.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900">Service scope</h2>
            <p>
              MedExpress operates as a logistics and facilitation platform connecting customers
              in Domariyaganj with verified pharmacies in Lucknow. We do not provide medical
              advice or replace your doctor.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900">Payments and pricing</h2>
            <p>
              Medicines are billed at MRP as per the pharmacy invoice. Delivery charges and
              convenience fees, where applicable, will be communicated before confirmation.
            </p>
          </section>
        </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
