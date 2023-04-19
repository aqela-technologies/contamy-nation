import { Theme, useMediaQuery, useTheme } from "@material-ui/core";
import { useSwiperSlide } from "swiper/react";
import Image, {StaticImageData} from "next/image";
export interface CardCarouselSlideProps {
  imageSrc: StaticImageData;
  imageAlt: string;
}
export default function CardCarouseSlide(props: CardCarouselSlideProps) {
  const theme = useTheme<Theme>();
  const swiperSlide = useSwiperSlide();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <section className={` mx-auto ${matches ? "max-w-xs" : "max-w-none"}`}>
      {swiperSlide.isActive}
      <Image src={props.imageSrc} alt={props.imageAlt} />
    </section>
  );
}
