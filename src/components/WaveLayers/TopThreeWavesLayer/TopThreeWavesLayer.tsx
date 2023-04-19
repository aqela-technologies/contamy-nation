export default function TopThreeWavesLayer() {
  return (
    <div className="relative flex-1">
      <div className="absolute w-full h-full z-wave-one bg-wave-one-color" />
      <div className="absolute w-full h-full z-wave-two bg-wave-two-color" />
      <div className="absolute w-full h-full z-wave-three bg-wave-three-color" />
    </div>
  );
}
