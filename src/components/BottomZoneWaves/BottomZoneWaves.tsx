import Wave from "react-wavify";
import { styleConstants } from "../../assets/constants/styleConstants";

export default function BottomZoneWaves() {
  return (
    <div
      className="relative max-w-full"
      style={{ height: "150px", marginTop: "150px" }}
    >
      <Wave
        className="absolute z-wave-four"
        fill={styleConstants.waveFourColor}
        options={{
          height: 20,
          amplitude: 15,
          speed: 0.5,
          points: 6,
        }}
      />
      <Wave
        className="relative z-wave-five"
        fill={styleConstants.waveFiveColor}
        options={{
          height: 20,
          amplitude: 10,
          speed: 0.5,
          points: 6,
        }}
      />
    </div>
  );
}
