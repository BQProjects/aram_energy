"use client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-primary text-[#FF9641]">
          Refund Policy
        </h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-primary text-[#FF9641]">
            Disclaimer
          </h2>
          <p>
            The explanations and information provided on this page are purely
            general explanations and information for developing your own refund
            policy. This text does not constitute legal advice or a
            recommendation for action, as we cannot know in advance what the
            specific refund policies will be between the company and its
            customers. We recommend seeking legal advice to gain an
            understanding of the matter and to develop your own refund policy.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-primary text-[#FF9641]">
            Refund Policy – The Basics
          </h2>
          <p>
            From this perspective, refund policies are a legally binding
            document that serves to establish the legal relationship between the
            company and its customers regarding how and whether a refund will be
            granted. Online retailers selling products are sometimes required
            (depending on local laws and regulations) to make their product
            return and refund policies publicly available. In some
            jurisdictions, this is required to maintain compliance with consumer
            protection laws. They can also help defend against legal claims from
            customers dissatisfied with the products they purchased.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-primary text-[#FF9641]">
            What should be included in the refund policy?
          </h2>
          <p>
            Generally, refund policies address the following issues: the
            deadline for requesting a refund; whether a refund will be partial
            or full; under what conditions customers will receive a refund, and
            much more.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
