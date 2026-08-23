import { useEffect, useRef } from "react";

const ScrollVideo = ({ src, className = "" }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video || !container || !video.duration) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Start when the section enters the viewport
      const start = viewportHeight;
      // End when the section has completely passed
      const end = -rect.height;

      const progress = Math.min(
        Math.max((start - rect.top) / (start - end), 0),
        1
      );

      video.currentTime = progress * video.duration;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className={`h-[300vh] relative ${className}`}>
      <div className="sticky top-0 h-screen w-full">
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default ScrollVideo;