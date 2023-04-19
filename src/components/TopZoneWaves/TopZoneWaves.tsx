import Wave from "react-wavify";
import { styleConstants } from "../../assets/constants/styleConstants";
import { TopThreeWavesLayer } from "../WaveLayers";

export default function TopZoneWaves() {
  return (
    <div className="relative max-w-full flex flex-col h-full">
      <div className="flex-1"></div>
      <div className="relative" style={{ height: "150px" }}>
        <Wave
          className="absolute z-wave-one"
          fill={styleConstants.waveOneColor}
          options={{
            height: 20,
            amplitude: 15,
            speed: 0.5,
            points: 6,
          }}
        />
        <Wave
          className="absolute z-wave-two"
          fill={styleConstants.waveTwoColor}
          options={{
            height: 20,
            amplitude: 10,
            speed: 0.5,
            points: 6,
          }}
        />
        <Wave
          className="relative z-wave-three"
          fill={styleConstants.waveThreeColor}
          options={{
            height: 20,
            amplitude: 5,
            speed: 0.5,
            points: 6,
          }}
        />
      </div>
      <TopThreeWavesLayer />
    </div>
  );
}
