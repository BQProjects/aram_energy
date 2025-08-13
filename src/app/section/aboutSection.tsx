import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full flex flex-col items-center justify-center"
    >
      {/* Top 25% black section */}
      <div
        className="w-full flex items-center"
        style={{ background: "#000", height: "25vh", minHeight: 180 }}
      >
        <span
          className="ml-8"
          style={{
            color: "#FF9641",
            fontFamily: "Quando",
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: 0.5,
          }}
        >
          About Aram Energy Solution
        </span>
      </div>
      {/* Bottom white section */}
      <div
        className="w-full flex flex-col lg:flex-row items-center justify-center bg-white py-12 px-4 lg:px-16"
        style={{ minHeight: 400 }}
      >
        {/* Image on left */}
        <div className="flex items-center justify-center mb-8 lg:mb-0 lg:mr-12">
          <Image
            src="/aboutimage.png"
            alt="About Section Image"
            width={735}
            height={458}
            style={{ borderRadius: 16, objectFit: "cover" }}
          />
        </div>
        {/* Right: 3 paragraphs with icon circles */}
        <div className="flex flex-col gap-10 max-w-xl w-full">
          {/* 1st para */}
          <div className="flex items-center gap-6">
            <div
              className="flex items-center justify-center"
              style={{
                width: 85,
                height: 64,
                borderRadius: "50%",
                background: "#F2F2F2",
              }}
            >
              <Image
                src="/ribbon.svg"
                alt="Ribbon Icon"
                width={18}
                height={24}
                style={{ objectFit: "contain" }}
              />
            </div>
            <span
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                fontWeight: 500,
                color: "#171717",
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  display: "block",
                  fontFamily: "InriaSerif-Bold",
                  marginBottom: 4,
                }}
              >
                Affordable rates for everyone
              </span>
              Attractive electricity and gas prices for businesses and private
              customers.
            </span>
          </div>
          {/* 2nd para */}
          <div className="flex items-center gap-6">
            <div
              className="flex items-center justify-center"
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#F2F2F2",
              }}
            >
              <Image
                src="/personcheck.svg"
                alt="Personcheck Icon"
                width={30}
                height={24}
                style={{ objectFit: "contain" }}
              />
            </div>
            <span
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                fontWeight: 500,
                color: "#171717",
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  display: "block",
                  fontFamily: "InriaSerif-Bold",
                  marginBottom: 4,
                }}
              >
                Permanent contact person
              </span>
              Personal support without constant changes.
            </span>
          </div>
          {/* 3rd para */}
          <div className="flex items-center gap-6">
            <div
              className="flex items-center justify-center"
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#F2F2F2",
              }}
            >
              <Image
                src="/clock.svg"
                alt="Clock Icon"
                width={24}
                height={24}
                style={{ objectFit: "contain" }}
              />
            </div>
            <span
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                fontWeight: 500,
                color: "#171717",
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  display: "block",
                  fontFamily: "InriaSerif-Bold",
                  marginBottom: 4,
                }}
              >
                Reliable partner
              </span>
              Together with Energie Service Pool GmbH.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
