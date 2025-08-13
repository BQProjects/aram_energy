import Image from "next/image";

export default function WhatisSub() {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center py-16">
      <div className="w-full max-w-6xl flex flex-col gap-8">
        {/* Top row: left heading, right button */}
        <div className="flex flex-row w-full items-start justify-between mb-8">
          <div className="flex flex-col items-start" style={{ minWidth: 340 }}>
            <div
              style={{
                color: "#FF9641",
                fontFamily: "Poppins-Regular",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Submetering
            </div>
            <div
              style={{
                color: "#111",
                fontFamily: "InriaSerif-Bold",
                fontSize: 32,
                marginBottom: 0,
              }}
            >
              What is submetering?
            </div>
          </div>
          <button
            className="flex items-center justify-between"
            style={{
              width: 280,
              height: 60,
              background: "#FF9641",
              color: "#fff",
              fontFamily: "Poppins, sans-serif",
              fontSize: 20,
              fontWeight: 600,
              border: "none",
              outline: "none",
              cursor: "pointer",
              paddingLeft: 32,
              paddingRight: 24,
            }}
          >
            <span style={{ textAlign: "left", flex: 1 }}>Click to start</span>
            <Image
              src="/whiteRightArrow.svg"
              alt="Right Arrow"
              width={28}
              height={28}
            />
          </button>
        </div>
        {/* Cards row: centered below button */}
        <div className="w-full flex flex-row gap-6 justify-center mb-8">
          {[
            {
              svg: "/sub1.svg",
              title: "Transparent consumption thanks to submetering",
              para: "Submetering is the individual recording of consumption of resources such as water, heat or electricity in multi-unit buildings.",
            },
            {
              svg: "/sub2.svg",
              title: "Pay fairly – only what you use",
              para: "It enables fair and transparent billing, as each user only pays for what they actually consume.",
            },
            {
              svg: "/sub3.svg",
              title: "Save energy, reduce costs",
              para: "This promotes energy efficiency and cost savings.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-2xl flex flex-col justify-between items-start px-6 py-6"
              style={{
                background: "#000",
                width: 380,
                height: 200,
                minWidth: 220,
                boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
              }}
            >
              <div className="flex flex-row items-center gap-3 mb-2">
                <Image src={card.svg} alt={card.title} width={48} height={48} />
                <span
                  style={{
                    color: "#fff",
                    fontFamily: "InriaSerif-Regular",
                    fontSize: 16,
                    fontWeight: 500,
                    textAlign: "left",
                  }}
                >
                  {card.title}
                </span>
              </div>
              <p
                style={{
                  color: "#D1D5DB",
                  fontFamily: "InriaSerif-Regular",
                  fontSize: 16,
                  fontWeight: 400,
                  textAlign: "justify",
                }}
              >
                {card.para}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Info text below cards */}
      <div className="w-full max-w-6xl flex flex-col items-start mt-12">
        <div
          style={{
            color: "#FF9641",
            fontFamily: "Poppins-Medium",
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Who can use this?
        </div>
        <div
          style={{
            color: "#111827",
            fontFamily: "InriaSerif-Bold",
            fontSize: 22,
            fontWeight: 700,
            textAlign: "left",
            maxWidth: 900,
          }}
        >
          Property managers, homeowners, housing associations and other relevant
          contacts are potential customers.
        </div>
      </div>
    </section>
  );
}
