export default function VideoSection() {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="relative w-full h-full">
        <iframe
          src="https://www.youtube-nocookie.com/embed/fgyTPneuhdc?si=rCStQqbW8Hm-q1o7&autoplay=1&mute=1&loop=1&playlist=fgyTPneuhdc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
}
