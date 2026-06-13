import { useMediaQuery } from "../hooks/use-media-query";

export default function HomeBackground() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-[#0e0e0e]">
      {isMobile ? (
        <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-purple-900/15 to-transparent" />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
          <div className="absolute top-[-10%] right-[20%] w-[40%] h-[40%] rounded-full bg-purple-800/25 blur-[180px]" />
          <div className="absolute bottom-[-10%] left-[10%] w-[35%] h-[35%] rounded-full bg-blue-900/20 blur-[150px]" />
        </>
      )}
    </div>
  );
}
