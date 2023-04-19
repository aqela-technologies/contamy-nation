import BlackBubbles from "../../assets/images/design-elements/black-bubble-bottom.png";
import Transitionary from "../../assets/images/design-elements/transitionary.png";
import Image from "next/image";

export default function BottomShadowZone() {
  return (
    <div className="relative z-bottom-shadow">
      <img
        className="absolute bottom-0 z-10"
        src={BlackBubbles.src}
        alt="BlackBubbles"
      />
      <img
          className="relative w-full z-20"
        src={Transitionary.src}
        alt="transitionary"
      />
    </div>
  );
}
