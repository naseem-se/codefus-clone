
export default function VideoBackground() {
  return (
    <div className=" relative -z-1 h-[0]">
        <div className="absolute top-[-480px] left-1/2 w-full -translate-x-1/2 max-[1680px]:top-[-25vw]">
        <video
          className="mx-auto aspect-1680/945 h-full max-h-[945px] w-full max-w-[1680px]o"
          src="/bg-wave.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        </div>
      </div>
  );
}
