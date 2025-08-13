import Image from "next/image";

export default function GetInTouch() {
  return (
    <div className="bg-black flex justify-center items-center min-h-screen p-4 pb-16 sm:pb-20 md:pb-28">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-[896px]">
        {/* Left: Contact Card */}
        <div className="bg-[#0F0F0F] text-white rounded-xl p-6 sm:p-8 flex flex-col md:w-1/2">
          <h2 className="mb-6 sm:mb-8 text-xl sm:text-2xl font-semibold font-inria-serif-bold">
            Contact Information
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                icon: "/orangePhone.svg",
                title: "Phone",
                content: "+495251 4032589",
              },
              {
                icon: "/orangeMail.svg",
                title: "Email",
                content: (
                  <a
                    href="mailto:support@aram-energy-solution.com"
                    className="underline hover:text-[#FF9641] transition-colors duration-200"
                  >
                    support@aram-energy-solution.com
                  </a>
                ),
              },
              {
                icon: "/orangeLocation.svg",
                title: "Office",
                content: "Paderborn, Germany",
              },
              {
                icon: "/orangeClock.svg",
                title: "Business Hours",
                content: (
                  <>
                    <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p>Sat: 9:00 AM - 4:00 PM</p>
                  </>
                ),
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 sm:gap-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                />
                <div>
                  <p className="font-inter text-base sm:text-lg text-[#F9FAFB] font-medium">
                    {item.title}
                  </p>
                  <div className="font-inter text-sm sm:text-base text-[#F9FAFB]">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8">
            <hr className="border-[#374151] mb-4" />
            <p className="font-inter text-base sm:text-lg text-[#F9FAFB] mb-4">Follow Us</p>
            <div className="flex gap-3">
              {[
                "/orangeFacebook.svg",
                "/orangeTwitter.svg",
                "/orangeLinkedIn.svg",
                "/orangeInsta.svg",
              ].map((icon, idx) => (
                <a key={idx} href="#" className="hover:opacity-80 transition-opacity duration-200">
                  <Image src={icon} alt="Social" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form Card */}
        <div className="bg-white rounded-xl p-6 sm:p-8 md:w-1/2">
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-inria-serif-bold text-[#2C2C2C]">
            Send Us a Message
          </h2>

          <form className="space-y-4 sm:space-y-5">
            <div className="flex flex-col md:flex-row gap-4">
              {[
                {
                  id: "firstName",
                  label: "First Name",
                  placeholder: "First Name",
                },
                {
                  id: "lastName",
                  label: "Last Name",
                  placeholder: "Last Name",
                },
              ].map((field) => (
                <div key={field.id} className="w-full">
                  <label
                    htmlFor={field.id}
                    className="block font-inter text-sm text-[#374151] mb-1"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full border border-[#ADAEBC] rounded-xl px-3 py-2 bg-[#F9FAFB] text-black placeholder-[#ADAEBC] font-inter text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-inter text-sm text-[#374151] mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full border border-[#ADAEBC] rounded-xl px-3 py-2 bg-[#F9FAFB] text-black placeholder-[#ADAEBC] font-inter text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block font-inter text-sm text-[#374151] mb-1"
              >
                Telephone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full border border-[#ADAEBC] rounded-xl px-3 py-2 bg-[#F9FAFB] text-black placeholder-[#ADAEBC] font-inter text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="block font-inter text-sm text-[#374151] mb-1"
              >
                Service Type
              </label>
              <select
                id="service"
                className="w-full border border-[#ADAEBC] rounded-xl px-3 py-2 bg-[#F9FAFB] text-[#ADAEBC] font-inter text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
              >
                <option>Select a service</option>
                <option>Service 1</option>
                <option>Service 2</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-inter text-sm text-[#374151] mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Tell us your energy needs..."
                className="w-full border border-[#ADAEBC] rounded-xl px-3 py-2 h-24 sm:h-28 bg-[#F9FAFB] placeholder-[#ADAEBC] font-inter text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent resize-none"
              ></textarea>
            </div>

            <label className="flex items-start gap-2 text-xs sm:text-sm text-[#6C757D]">
              <input type="checkbox" className="mt-1" />I agree to receive
              communications from PowerGrid and understand that I can
              unsubscribe at any time.
            </label>

            <button
              type="submit"
              className="bg-[#FF9641] w-full text-white px-4 sm:px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-inter font-medium hover:bg-[#e88537] transition-colors duration-200"
            >
              <Image src="/sendSvg.svg" alt="Send" width={16} height={16} className="w-4 h-4 sm:w-4 sm:h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
