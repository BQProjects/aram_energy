import Image from "next/image";

export default function OurService() {
  return (
    <section className="w-full min-h-screen bg-black flex flex-col items-center py-16">
      <div className="w-full max-w-7xl flex flex-col gap-8">
        {/* Top left heading and button */}
        <div className="flex flex-row w-full items-start justify-between mb-8">
          <div className="flex flex-col items-start">
            <div
              style={{
                color: "#fff",
                fontFamily: "InriaSerif-Bold",
                fontSize: 36,
                marginBottom: 24,
              }}
            >
              Our Services
            </div>
            <button
              className="flex items-center justify-between"
              style={{
                width: 310,
                height: 65,
                background: "#FF9641",
                color: "#fff",
                fontFamily: "Inter",
                fontSize: 18,
                fontWeight: 400,
                border: "none",
                outline: "none",
                cursor: "pointer",
                paddingLeft: 32,
                paddingRight: 24,
              }}
            >
              <span style={{ textAlign: "left", flex: 1 }}>Arrange a call</span>
              <Image
                src="/whiteRightArrow.svg"
                alt="Right Arrow"
                width={28}
                height={28}
              />
            </button>
          </div>
        </div>
        {/* 3 image cards row */}
        <div className="w-full flex flex-row gap-8 justify-center mt-8">
          {["Home Visit", "Telephone Appointment", "Online Meeting"].map(
            (label, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden flex flex-col items-start"
                style={{
                  width: 377,
                  height: 511,
                  background: "#222",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                }}
              >
                {/* Card image */}
                <Image
                  src={`/ourService-${i + 1}.png`}
                  alt={label}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* Text above button, left-aligned */}
                <span
                  className="absolute left-8 bottom-24"
                  style={{
                    color: "#fff",
                    fontFamily: "InriaSerif-Regular",
                    fontSize: 36,
                    fontWeight: 400,
                    textAlign: "left",
                    zIndex: 2,
                    letterSpacing: 0.5,
                  }}
                >
                  {label}
                </span>
                {/* Book button inside card, left-aligned */}
                <button
                  className="absolute bottom-8 left-8 flex items-center justify-between"
                  style={{
                    width: 200,
                    height: 48,
                    background: "#FF9641",
                    color: "#fff",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: 18,
                    fontWeight: 600,
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    paddingLeft: 24,
                    paddingRight: 18,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                    zIndex: 2,
                  }}
                >
                  <span style={{ textAlign: "left", flex: 1 }}>Book</span>
                  <Image
                    src="/whiteRightArrow.svg"
                    alt="Right Arrow"
                    width={22}
                    height={22}
                  />
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
