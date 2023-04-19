import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import fish1 from "../../assets/images/fishes/1.jpg";
import fish2 from "../../assets/images/fishes/2.jpg";
import fish3 from "../../assets/images/fishes/3.jpg";
import fish4 from "../../assets/images/fishes/4.jpg";
import CarouselShadow from "../../assets/images/design-elements/carousel-shadow.png";
import BigFish from "../../assets/images/design-elements/big-fish.png";
import CardCarouseSlide from "./components";

// import "swiper/swiper.min.css";
// import "swiper/modules/navigation/navigation.min.css";
// import "swiper/modules/autoplay/autoplay.min.css";
import { styleConstants } from "../../assets/constants/styleConstants";
import { TopThreeWavesLayer } from "../WaveLayers";
import BottomZoneWaves from "../BottomZoneWaves";
import { Theme, useMediaQuery, useTheme } from "@material-ui/core";
// @ts-ignore
import TextTransition, { presets } from "react-text-transition";
import { useState } from "react";
import Image from "next/image";

const fishes = [
  {
    id: "legendary",
    img: fish1,
    description:
      "And finally, if you are one of the chosen few, you can get a Legendary Contamy Nation NFT, with the goldenberg (golden) gradient, and the unique kelpy g flare - with lots of squid and other squid-like species. The Brain of Chtulu medusa is only available on Legendary NFTs (but not on all of them) so if you get a hold of one, you're in luck!",
  },
  {
    id: "epic",
    img: fish2,
    description:
      "If fortune smiles on you, your card will get the alkaline (purple) gradient and the jellyfish flare - and you'll be the proud owner of an Epic tier Contamy Nation NFT!",
  },
  {
    id: "rare",
    img: fish3,
    description:
      "If your card has the acidic (blue) gradient and the anchovies flare, it is a rare Contamy Nation NFT.",
  },
  {
    id: "common",
    img: fish4,
    description:
      "So if your card has no gradient and has the bubble flare on it, you have a common Contamy Nation NFT.",
  },
];

export default function CardCarousel() {
  const theme = useTheme<Theme>();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [index, setIndex] = useState(0);

  return (
    <section id="cards" className="relative">
      <div id="swiper" className="w-full relative">
        <img
          className="w-full absolute z-big-fish"
          style={{ top: "50%", transform: "translateY(-62.5%)" }}
          src={BigFish.src}
          alt="fish"
        />
        <img
          className={`${styleConstants.centerFullyBehind} z-top`}
          src={CarouselShadow.src}
          alt="carousel-shadow"
        />
        <div id="carousel-wrapper" className="relative w-full mx-auto z-top">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={50}
            slidesPerView={matches ? 1 : 3}
            onSlideChange={(swiper) => setIndex(swiper.realIndex)}
            loop
            centeredSlides
            navigation
            autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
          >
            {fishes.map((image) => {
              return (
                <SwiperSlide key={image.id}>
                  <CardCarouseSlide
                    imageSrc={image.img}
                    imageAlt={`${image.img}`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="absolute top-0 h-full w-full flex">
        <TopThreeWavesLayer />
      </div>
      <div className="relative z-top w-4/5 mx-auto text-white text-center text-sm md:text-3xl font-extrabold">
        <div className="my-16">
          <TextTransition direction="up" springConfig={presets.default}>
            <span className="uppercase text-4xl font-extrabold text-secondary">
              {fishes[index % fishes.length].id}
            </span>
            <br />
            In addition to their unique appearance, all our fish have their own
            unique features and characteristics.
            <br />
            {fishes[index % fishes.length].description}
          </TextTransition>
        </div>
      </div>
      <BottomZoneWaves />
    </section>
  );
}
