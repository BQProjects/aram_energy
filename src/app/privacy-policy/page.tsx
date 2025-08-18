"use client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-primary text-[#FF9641]">
          Data protection
        </h1>
        <p className="mb-4">
          This is a privacy policy. Data protection is an important component of
          a website. This template contains sample text, is not exhaustive, and
          cannot be published. The wording of your privacy policy will vary
          depending on the features of your website. Website owners should
          therefore adapt this text. A privacy policy must list all third-party
          components used on the website. Make sure the link to the privacy
          policy is accessible from every page of the website.
        </p>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-primary text-[#FF9641]">
            Data collection, use and sharing
          </h2>
          <p>
            Statement about ownership of information collected on the website,
            how data is collected, sharing with third parties, etc.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-primary text-[#FF9641]">
            Control over data
          </h2>
          <p>
            Statement about the ability to access, change, and update personal
            information and data, concerns about data use, etc.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-primary text-[#FF9641]">
            Data security
          </h2>
          <p>
            User data protection measures, data encryption, server information
            on which the data is stored, data transfer, etc.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
