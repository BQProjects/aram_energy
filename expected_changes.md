# header section - <div className="flex items-center justify-center gap-x-40 w-full">

# {/* Center: Desktop Navigation */}
#     <nav className="hidden lg:flex items-center justify-center ml-36">

# our partner - image size

#             <div className="flex justify-center gap-2">
              {featureKeys.map((_, idx) => (
                <button
                  key={idx}
                  className={`transition-all duration-300 rounded-full focus:outline-none
                    ${idx === current ? "w-4 h-4 bg-gray-300" : "w-3 h-3 bg-gray-600"}
                  `}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => {
                    if (animating || idx === current) return;
                    setDirection(idx > current ? "right" : "left");
                    setAnimating(true);
                    setTimeout(() => {
                      setCurrent(idx);
                      setAnimating(false);
                    }, 600);
                  }}
                  type="button"
                ></button>

                