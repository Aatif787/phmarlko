import Hero3D from "@/components/Hero3D";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSafety } from "@/components/TrustSafety";
import { ContactSupport } from "@/components/ContactSupport";

export default function HomePage() {
  return (
    <>
      <Hero3D />
      <HowItWorks />
      <TrustSafety />
      <ContactSupport />
    </>
  );
}
