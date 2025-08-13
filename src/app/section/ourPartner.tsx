import Image from "next/image";

export default function OurPartner() {
  return (
    <section className="w-full min-h-[350px] bg-black flex flex-col items-center py-16">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-start">
        <div
          style={{
            color: "#FF9641",
            fontFamily: "InriaSerif-Bold",
            fontSize: 32,
            fontWeight: 400,
            marginBottom: 32,
            textAlign: "left",
          }}
        >
          Our corporation partner:
        </div>
        <div className="w-full flex flex-row justify-evenly items-center gap-8 mt-10">
          <Image
            src="/partner1.png"
            alt="Stadtwerke Duisburg"
            width={220}
            height={60}
            style={{ objectFit: "contain" }}
          />
          <Image
            src="/partner2.png"
            alt="Plugman"
            width={120}
            height={120}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  );
}
