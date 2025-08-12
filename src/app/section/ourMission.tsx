import Image from "next/image";

const features = [
  {
    title: "Transparent pricing",
    desc: "No hidden fees. Clear, upfront costs for all customers.",
  },
  {
    title: "Sustainable energy",
    desc: "We support green energy solutions for a better future.",
  },
  {
    title: "Fast switching",
    desc: "Quick and easy transition to our services with minimal hassle.",
  },
  {
    title: "Customer satisfaction",
    desc: "Dedicated to providing excellent support and reliable service.",
  },
];

export default function OurMission() {
  return (
    <section className="w-full flex flex-col lg:flex-row items-stretch justify-center">
      {/* Left: black background, heading, features, button */}
      <div
        className="flex flex-col justify-between bg-black py-12 px-6 lg:px-12 w-full lg:w-1/2 min-h-[600px] ml-10"
        style={{ minWidth: 400 }}
      >
        <div>
          <h2
            style={{
              fontFamily: "InriaSerif-Bold",
              fontSize: 36,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 32,
            }}
          >
            Our Mission
          </h2>
          <div className="flex flex-col gap-8">
            {features.map((f, i) => (
              <div key={f.title} className="flex items-start gap-5">
                <div
                >
                  <Image
                    src="/orangeTick.svg"
                    alt="Tick Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "InriaSerif-Bold",
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 4,
                    }}
                  >
                    {f.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 16,
                      fontWeight: 400,
                      color: "#9CA3AF",
                    }}
                  >
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Button at bottom */}
        <div className="mt-12 flex items-center">
          <button
            className="flex items-center justify-between"
            style={{
              width: 380,
              height: 64,
              background: "#fff",
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: 18,
              color: "#FF9641",
              border: "none",
              outline: "none",
              cursor: "pointer",
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
            <span style={{ fontWeight: 600 }}>Get a quote</span>
            <span className="flex items-center gap-2">
              <Image
                src="/rightarrow.svg"
                alt="Right Arrow"
                width={24}
                height={24}
              />
            </span>
          </button>
        </div>
      </div>
      {/* Right: image */}
      <div className="flex items-center justify-center bg-black w-full lg:w-1/2 py-12 px-6 lg:px-12">
        <Image
          src="/ourMission.png"
          alt="Mission Section Image"
          width={697}
          height={533}
          style={{ borderRadius: 16, objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
