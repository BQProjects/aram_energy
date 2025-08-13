import React from "react";
import Image from "next/image";

export default function HowItWorkSection() {
  return (
    <div
      style={{
        backgroundImage: "url('/howitwork.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "0",
        margin: "0",
        width: "100vw",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px 24px 0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Top Left Texts */}
        <div
          style={{
            color: "#FF9641",
            fontFamily: "Poppins-Medium",
            fontSize: 22,
            fontWeight: 400,
            marginBottom: 12,
          }}
        >
          Interested in photovoltaic systems?
        </div>
        <div
          style={{
            color: "#FFF",
            fontFamily: "InriaSerif-Regular",
            fontSize: 32,
            fontWeight: 400,
            marginBottom: 18,
          }}
        >
          Use solar energy now and save in the long term!
        </div>
        <div
          style={{
            color: "#FFF",
            fontFamily: "InriaSerif-Regular",
            fontSize: 20,
            fontWeight: 400,
            marginBottom: 28,
            lineHeight: 1.5,
          }}
        >
          Are you considering a solar system for your home or business? Then
          you&apos;ve come to the right place. We&apos;ll be happy to receive
          your inquiry and forward it to one of our experienced partners.
        </div>
        <div
          style={{
            color: "#FF9641",
            fontFamily: "InriaSerif-Bold",
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          How it works:
        </div>

        {/* SVG Row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 60,
            width: "100%",
            flexWrap: "nowrap",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Image
              src="/GetInstantOffer.svg"
              alt="Step 1"
              width={100}
              height={100}
              style={{ maxWidth: "100%", height: "auto" }}
              priority
            />
            <span
              style={{
                color: "#E5E7EB",
                fontFamily: "Poppins-Light",
                fontSize: 14,
                marginTop: 8,
                textAlign: "center",
                maxWidth: 320,
                display: "block",
              }}
            >
              You register your interest with us.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Image
              src="/GetInstantOffer-1.svg"
              alt="Step 2"
              width={100}
              height={100}
              style={{ maxWidth: "100%", height: "auto" }}
              priority
            />
            <span
              style={{
                color: "#E5E7EB",
                fontFamily: "Poppins-Light",
                fontSize: 14,
                marginTop: 8,
                textAlign: "center",
                maxWidth: 320,
                display: "block",
              }}
            >
              A certified solar expert will contact you and come to your home
              for a personal consultation.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Image
              src="/GetInstantOffer-2.svg"
              alt="Step 3"
              width={100}
              height={100}
              style={{ maxWidth: "100%", height: "auto" }}
              priority
            />
            <span
              style={{
                color: "#E5E7EB",
                fontFamily: "Poppins-Light",
                fontSize: 14,
                marginTop: 8,
                textAlign: "center",
                maxWidth: 320,
                display: "block",
              }}
            >
              Together we will determine which solution best suits your roof,
              your consumption and your budget.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Image
              src="/GetInstantOffer-3.svg"
              alt="Step 4"
              width={100}
              height={100}
              style={{ maxWidth: "100%", height: "auto" }}
              priority
            />
            <span
              style={{
                color: "#E5E7EB",
                fontFamily: "Poppins-Light",
                fontSize: 14,
                marginTop: 8,
                textAlign: "center",
                maxWidth: 320,
                display: "block",
              }}
            >
              You will receive a tailor-made offer – transparent and
              non-binding.
            </span>
          </div>
        </div>
      </div>
      {/* Bottom Centered Text */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: 40,
          marginBottom: 40,
          paddingBottom: 80,
        }}
      >
        <span
          style={{
            color: "#E7EBF3",
            fontFamily: "InriaSerif-Bold",
            fontSize: 32,
            display: "inline-block",
          }}
        >
          Express your interest now without obligation and secure a
          consultation!
        </span>
      </div>
    </div>
  );
}
