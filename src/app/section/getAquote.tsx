import Image from "next/image";

export default function GetAquote() {
  return (
    <>
      <section className="relative w-full min-h-[600px] flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/getAquote.png"
            alt="Get a quote background"
            fill
            style={{ objectFit: "fill", objectPosition: "center" }}
          />
        </div>
        {/* Right-side overlay box */}
        <div className="flex w-full h-full">
          {/* Left empty space (40%) */}
          <div className="w-[40%]" />
          {/* Right content box (60%) */}
          <div className="w-[60%] flex items-center" style={{ minHeight: 320 }}>
            <div
              className="w-full px-10 py-12"
              style={{
                background: "rgba(12,12,12,0.79)",
                borderRadius: 24,
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              }}
            >
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#FF9641",
                  marginBottom: 24,
                  textAlign: "left",
                }}
              >
                How can I get a quote?
              </h2>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 18,
                  fontWeight: 400,
                  color: "#fff",
                  textAlign: "left",
                  lineHeight: 1.6,
                }}
              >
                You have an electricity bill, which you send to us digitally via
                WhatsApp or email. We&apos;ll explain everything to you and send
                you an offer immediately. If you accept it, we&apos;ll take care
                of the switching process for you.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* New text section below image */}
      <section className="w-full flex bg-white items-start py-12 bg-transparent">
        <div className="w-full max-w-4xl mx-auto">
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 36,
              fontWeight: 700,
              color: "#FF9641",
              textAlign: "left",
              marginBottom: 12,
            }}
          >
            Customers refer customers – Join in. It&apos;s worth it!
            <br />
            Recommend Aram Energy Solution and benefit:
          </h2>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 20,
              fontWeight: 400,
              color: "#222",
              textAlign: "left",
              marginBottom: 0,
              lineHeight: 1.6,
            }}
          >
            We&apos;d like to thank you for your loyalty – and at the same time
            give even more people the opportunity to benefit from our affordable
            electricity and gas offers. That&apos;s why we&apos;ve launched our
            referral program.
          </p>
        </div>
      </section>
    </>
  );
}
