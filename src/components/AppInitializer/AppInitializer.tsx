import { CircularProgress } from "@material-ui/core";
import useImagePreloader from "../../hooks/useImagePreloader";
import Background from "../../assets/images/design-elements/header_background.png";
import TextDecor from "../../assets/images/design-elements/text_decor.png";
import TextDecorSmallScreen from "../../assets/images/design-elements/text_decor_small_screen.png";
import ArrowIcon from "../../assets/images/header-icons/arrow.png";
import BrainIcon from "../../assets/images/header-icons/brain.png";
import EyeIcon from "../../assets/images/header-icons/eye.png";
import FishIcon from "../../assets/images/header-icons/fish.png";
import Aqela from "../../assets/images/aqela/aqela.png";
import fish1 from "../../assets/images/fishes/1.jpg";
import fish2 from "../../assets/images/fishes/2.jpg";
import fish3 from "../../assets/images/fishes/3.jpg";
import fish4 from "../../assets/images/fishes/4.jpg";
import CarouselShadow from "../../assets/images/design-elements/carousel-shadow.png";
import BigFish from "../../assets/images/design-elements/big-fish.png";
import BlackBubbles from "../../assets/images/design-elements/black-bubble-bottom.png";
import Transitionary from "../../assets/images/design-elements/transitionary.png";

const preloadSrcList = [
  Background,
  TextDecor,
  TextDecorSmallScreen,
  ArrowIcon,
  BrainIcon,
  EyeIcon,
  FishIcon,
  Aqela,
  fish1,
  fish2,
  fish3,
  fish4,
  CarouselShadow,
  BigFish,
  BlackBubbles,
  Transitionary,
];

export default function AppInitializer(props: { children: JSX.Element }) {
  return <>{props.children}</>;
}
