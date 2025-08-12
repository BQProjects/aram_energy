import Image from "next/image";
import WideRangeScroll from "./WideRangeScroll";

export default function WideRange() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/widerange.png"
          alt="Wide Range Background"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Top content */}
      <div
        className="w-full flex flex-col items-start px-8 lg:px-24 pb-[200px]"
        style={{ gap: 20 }}
      >
        <h2
          style={{
            fontFamily: "InriaSerif-Bold",
            fontSize: 36,
            fontWeight: 700,
            color: "#FF9641",
            marginBottom: 18,
          }}
        >
          Bundle energy cleverly – with Aram Energy Solution
        </h2>
        <div
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 20,
            fontWeight: 400,
            color: "#fff",
            marginBottom: 24,
          }}
        >
          Energy that suits you – for businesses and private households
        </div>
        <button
          className="flex items-center justify-between"
          style={{
            width: 470,
            height: 55,
            background: "#FF9641",
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 16,
            color: "#fff",
            border: "none",
            outline: "none",
            cursor: "pointer",
            paddingLeft: 32,
            paddingRight: 32,
            marginBottom: 32,
          }}
        >
          <span style={{ textAlign: "left" }}>
            Contact us now and secure a framework agreement!
          </span>
          <Image
            src="/whiteRightArrow.svg"
            alt="Right Arrow"
            width={32}
            height={32}
          />
        </button>
        <div
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 20,
            fontWeight: 400,
            color: "#fff",
            textAlign: "justify",
          }}
        >
          As an independent energy optimizer based in Paderborn, we offer
          attractive electricity and gas contracts – regardless of whether you
          are billed according to the RLM or SLP. Whether you are a small
          business, medium-sized company, or private household – Aram Energy
          Solution offers customized electricity and gas contracts at
          consistently favorable terms.
        </div>
      </div>
    </section>
  );
}
