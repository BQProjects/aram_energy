import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-black text-white py-6 sm:py-8 px-4 sm:px-6 md:px-8 h-60">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-10 font-poppins-regular text-sm sm:text-base font-normal">
        {/* Content sections - Stacked on mobile, side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
          {/* Logo - Centered on mobile */}
          <div className="w-full flex justify-center md:justify-start">
            <Image
              src="/AramLogo.svg"
              alt="Aram Energy Solution Logo"
              width={170}
              height={100}
              className="w-40 h-24 sm:w-48 sm:h-28 md:w-[170px] md:h-[100px]"
            />
          </div>
          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <span className="font-medium text-lg sm:text-xl font-poppins-regular">
              +49 5251 4032589
            </span>
            <span className="text-sm font-normal font-poppins-regular text-gray-300">
              support@aram-energy-solution.com
            </span>
          </div>

          {/* Address Section */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <span className="font-medium text-lg sm:text-xl font-poppins-regular">
              Paderborn,
            </span>
            <span className="text-lg sm:text-xl font-poppins-regular">
              Deutschland
            </span>
            <div className="flex gap-4 mt-2">
              {/* SVG social icons horizontally */}
              {/* Twitter */}
              <span className="hover:opacity-80 transition-opacity cursor-pointer">
                <svg
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-4"
                >
                  <path
                    d="M17.9441 4.42613C17.9568 4.60379 17.9568 4.78148 17.9568 4.95914C17.9568 10.3779 13.8325 16.6216 6.29441 16.6216C3.97207 16.6216 1.81473 15.9489 0 14.7815C0.329961 14.8195 0.647187 14.8322 0.989844 14.8322C2.90605 14.8322 4.67004 14.185 6.07867 13.081C4.27664 13.0429 2.76648 11.8627 2.24617 10.2383C2.5 10.2764 2.75379 10.3018 3.02031 10.3018C3.38832 10.3018 3.75637 10.251 4.09898 10.1622C2.22082 9.78144 0.812148 8.13172 0.812148 6.13934V6.08859C1.35781 6.39316 1.99238 6.58352 2.66492 6.60887C1.56086 5.87281 0.837539 4.61648 0.837539 3.19516C0.837539 2.43375 1.04055 1.73578 1.3959 1.12664C3.41367 3.61395 6.44668 5.23828 9.84766 5.41598C9.78422 5.11141 9.74613 4.79418 9.74613 4.47691C9.74613 2.21801 11.5736 0.37793 13.8451 0.37793C15.0253 0.37793 16.0913 0.872852 16.84 1.67234C17.7664 1.49469 18.6547 1.15203 19.4416 0.6825C19.137 1.6343 18.4898 2.43379 17.6395 2.94137C18.4644 2.85258 19.2639 2.6241 19.9999 2.30687C19.4416 3.11902 18.7436 3.84234 17.9441 4.42613Z"
                    fill="#9CA3AF"
                  />
                </svg>
              </span>
              {/* Facebook */}
              <span className="hover:opacity-80 transition-opacity cursor-pointer">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <g clipPath="url(#clip0_1006_565)">
                    <g clipPath="url(#clip1_1006_565)">
                      <path
                        d="M19.6875 10.5C19.6875 5.14844 15.3516 0.8125 10 0.8125C4.64844 0.8125 0.3125 5.14844 0.3125 10.5C0.3125 15.3352 3.85508 19.343 8.48633 20.0703V13.3004H6.02539V10.5H8.48633V8.36562C8.48633 5.93789 9.93164 4.59687 12.1453 4.59687C13.2055 4.59687 14.3141 4.78594 14.3141 4.78594V7.16875H13.0922C11.8891 7.16875 11.5137 7.91562 11.5137 8.68164V10.5H14.2004L13.7707 13.3004H11.5137V20.0703C16.1449 19.343 19.6875 15.3352 19.6875 10.5Z"
                        fill="#9CA3AF"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_1006_565">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                    <clipPath id="clip1_1006_565">
                      <path d="M0 0.5H20V20.5H0V0.5Z" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              {/* LinkedIn */}
              <span className="hover:opacity-80 transition-opacity cursor-pointer">
                <svg
                  width="18"
                  height="21"
                  viewBox="0 0 18 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-5"
                >
                  <g clipPath="url(#clip0_1006_571)">
                    <g clipPath="url(#clip1_1006_571)">
                      <path
                        d="M16.25 1.75H1.24609C0.558594 1.75 0 2.31641 0 3.01172V17.9883C0 18.6836 0.558594 19.25 1.24609 19.25H16.25C16.9375 19.25 17.5 18.6836 17.5 17.9883V3.01172C17.5 2.31641 16.9375 1.75 16.25 1.75ZM5.28906 16.75H2.69531V8.39844H5.29297V16.75H5.28906ZM3.99219 7.25781C3.16016 7.25781 2.48828 6.58203 2.48828 5.75391C2.48828 4.92578 3.16016 4.25 3.99219 4.25C4.82031 4.25 5.49609 4.92578 5.49609 5.75391C5.49609 6.58594 4.82422 7.25781 3.99219 7.25781ZM15.0117 16.75H12.418V12.6875C12.418 11.7188 12.3984 10.4727 11.0703 10.4727C9.71875 10.4727 9.51172 11.5273 9.51172 12.6172V16.75H6.91797V8.39844H9.40625V9.53906H9.44141C9.78906 8.88281 10.6367 8.19141 11.8984 8.19141C14.5234 8.19141 15.0117 9.92188 15.0117 12.1719V16.75Z"
                        fill="#9CA3AF"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_1006_571">
                      <rect
                        width="17.5"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                    <clipPath id="clip1_1006_571">
                      <path d="M0 0.5H17.5V20.5H0V0.5Z" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              {/* TikTok */}
              <span className="hover:opacity-80 transition-opacity cursor-pointer">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M16.6002 5.82C15.9167 5.03953 15.5401 4.0374 15.5402 3H12.4502V15.4C12.4268 16.0712 12.1437 16.7071 11.6605 17.1735C11.1773 17.6399 10.5318 17.9004 9.86016 17.9C8.44016 17.9 7.26016 16.74 7.26016 15.3C7.26016 13.58 8.92016 12.29 10.6302 12.82V9.66C7.18016 9.2 4.16016 11.88 4.16016 15.3C4.16016 18.63 6.92016 21 9.85016 21C12.9902 21 15.5402 18.45 15.5402 15.3V9.01C16.7932 9.90985 18.2975 10.3926 19.8402 10.39V7.3C19.8402 7.3 17.9602 7.39 16.6002 5.82Z"
                    fill="white"
                    fillOpacity="0.75"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <a
              href="/privacy-policy"
              className="hover:underline transition-colors duration-200 text-sm sm:text-base hover:text-[#FF9641] font-poppins-regular"
            >
              {t("footer.privacy")}
            </a>
            <a
              href="#"
              className="hover:underline transition-colors duration-200 text-sm sm:text-base hover:text-[#FF9641] font-poppins-regular"
            >
              {t("footer.accessibility")}
            </a>
            <a
              href="#"
              className="hover:underline transition-colors duration-200 text-sm sm:text-base hover:text-[#FF9641] font-poppins-regular"
            >
              {t("footer.terms")}
            </a>
            <a
              href="/refund-policy"
              className="hover:underline transition-colors duration-200 text-sm sm:text-base hover:text-[#FF9641] font-poppins-regular"
            >
              {t("footer.refund")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
