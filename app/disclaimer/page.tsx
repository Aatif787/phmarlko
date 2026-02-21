import { ScrollReveal } from "@/components/ScrollReveal";

export default function DisclaimerPage() {
  return (
    <main className="scroll-section bg-med-bg/60 py-10">
      <ScrollReveal animation="fade-up" duration={0.8}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
          Medical & Service Disclaimer
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          This service is built around safe, prescription‑based medicine delivery. The
          following points summarise key responsibilities and limitations.
        </p>
        <div className="mt-6 space-y-4 text-sm text-slate-700">
          <section>
            <h2 className="font-semibold text-slate-900">
              Prescription and restricted medicines
            </h2>
            <p>
              We deliver medicines only against valid prescriptions. Restricted or controlled
              medicines are not delivered without strict verification and are subject to local
              laws and pharmacy policies.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900">No medical advice</h2>
            <p>
              MedExpress does not provide medical advice, diagnosis or treatment. Always
              consult your doctor for any questions regarding your medicines or health
              condition.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900">Emergency situations</h2>
            <p>
              MedExpress is not an emergency service. In case of medical emergencies, please
              contact your nearest hospital or emergency helpline immediately.
            </p>
          </section>
        </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
