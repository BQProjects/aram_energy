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
      <section className="w-full flex bg-white items-start py-12 bg-transparent pb-48">
        <div className="w-full max-w-6xl mx-auto text-justify">
          <h2
            style={{
              fontFamily: "Source-Serif",
              fontSize: 36,
              color: "#FF9641",
              textAlign: "left",
              marginBottom: 12,
            }}
          >
            <span style={{ fontWeight: 700 }}>
              Customers refer customers &nbsp;– Join in. It&apos;s worth it!
            </span>
            <br />
            <span style={{ fontWeight: 600 }}>
              Recommend Aram Energy Solution
            </span>
            &nbsp;and benefit:
          </h2>
          <p
            style={{
              fontFamily: "IBMPlexSans",
              fontSize: 20,
              color: "#374151",
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
      {/* World image section with centered transparent container */}
      <section className="relative w-full h-[800px] flex items-start justify-center -mt-[100px]">
        {/* Background world image */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/worldimage.png"
            alt="World Background"
            fill
            style={{ objectFit: "fill", objectPosition: "center" }}
          />
        </div>
        {/* Centered transparent container, half on white, half on image */}
        <div
          className=" h-[260px] mx-auto flex items-center justify-center gap-8"
          style={{ background: "rgba(255,255,255,0.0)" }}
        >
          {/* Card 1 */}
          <div className="relative bg-[#000] rounded-2xl h-full flex-1 flex flex-col justify-between px-8 py-6 min-w-[220px] max-w-[460px]">
            {/* Top left icon */}
            <Image
              src="/orangeUserPlus.svg"
              alt="Recommend"
              width={58}
              height={58}
              className="absolute top-6 left-6"
            />
            {/* Top right number */}
            <span
              className="absolute top-4 right-6"
              style={{
                fontSize: 80,
                color: "#EBEEF7",
                fontWeight: 400,
                fontFamily: "InriaSerif-Regular",
                lineHeight: 1,
              }}
            >
              01
            </span>
            {/* Bottom center text */}
            <div className="flex flex-1 items-end justify-center">
              <span
                className="text-center pb-14"
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "InriaSerif-Regular",
                  fontWeight: 400,
                }}
              >
                Recommend us to friends, acquaintances or business partners.
              </span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="relative bg-[#000] rounded-2xl h-full flex-1 flex flex-col justify-between px-8 py-6 min-w-[220px] max-w-[460px]">
            <Image
              src="/orangeScript.svg"
              alt="Contract"
              width={60}
              height={60}
              className="absolute top-6 left-6"
            />
            <span
              className="absolute top-4 right-6"
              style={{
                fontSize: 80,
                color: "#EBEEF7",
                fontWeight: 400,
                fontFamily: "InriaSerif-Regular",
                lineHeight: 1,
              }}
            >
              02
            </span>
            <div className="flex flex-1 items-end justify-center">
              <span
                className="text-center pb-8"
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "InriaSerif-Regular",
                  fontWeight: 400,
                }}
              >
                The new customer concludes a contract based on your
                recommendation.
              </span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="relative bg-[#000] rounded-2xl h-full flex-1 flex flex-col justify-between px-8 py-6 min-w-[220px] max-w-[460px]">
            <Image
              src="/orangeContainer.svg"
              alt="Bonus"
              width={50}
              height={50}
              className="absolute top-6 left-6"
            />
            <span
              className="absolute top-4 right-6"
              style={{
                fontSize: 80,
                color: "#EBEEF7",
                fontWeight: 400,
                fontFamily: "InriaSerif-Regular",
                lineHeight: 1,
              }}
            >
              03
            </span>
            <div className="flex flex-1 items-end justify-center">
              <span
                className="text-center pb-16"
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "InriaSerif-Regular",
                  fontWeight: 400,
                }}
              >
                You will receive a 40€ bonus
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
