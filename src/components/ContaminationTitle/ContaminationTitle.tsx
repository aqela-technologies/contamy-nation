import { makeStyles } from "@material-ui/core";
import {useState, useRef, useLayoutEffect, useEffect} from "react";
import FinalContamination from "../../assets/images/design-elements/contamination.png";
import Image from "next/image";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const useStyles = makeStyles(() => ({
  TextWrapper: {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "black",
      borderRadius: "8px",
    },
  },
}));

export default function ContaminationTitle() {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null;
  }
 return <ContaminationTitleContent/>
}
 function ContaminationTitleContent() {
  const [height, setHeight] = useState<number | "auto">("auto");
  const [vw] = useWindowSize();
  const ref = useRef<HTMLImageElement | null>(null);
  useLayoutEffect(() => {
    if (ref?.current?.clientHeight) {
      setHeight((ref?.current?.clientHeight * 6.5) / 10 || "auto");
    }
  }, [vw]);
  const classes = useStyles();
  return (
    <section id="contamination" className="relative" style={{ height }}>
      <img
        ref={ref}
        onLoad={(e) => {
          const target: HTMLImageElement = e.target as HTMLImageElement;
          setHeight((target.height * 6.5) / 10);
        }}
        className="w-full bg-gradient-to-b from-top-gradient-start via-via-gradient to-transparent"
        src={FinalContamination.src}
        alt={"Hero"}
      />
      <article className="absolute z-30 h-1/3" style={{ top: "55%" }}>
        <p
          className={`${classes.TextWrapper} text-center text-white w-4/5 h-full max-h-full mx-auto overflow-y-auto font-bold text-xl lg:text-3xl`}
        >
          Dive into the Polluted Shoal and discover this strange world, filled
          with odd creatures and unique polluted flora. The Contamy-Nation is an
          NFT collection on the Solana blockchain, based on the myths about the
          radioactive creatures that survived within the fallout zone. We have
          officially entered the era of pollution. And it is no longer science
          fiction, it&apos;s the reality. Walking amongst our once beautiful
          forests, rivers and the skeletal concrete remnants of the great
          outdoors, it feels almost post-apocalyptic. As all living things on
          Earth, fishes and other sea-creatures are also capable of surviving
          and adapting. But what mutations did the radiation cause in their
          bodies? How have they evolved over the last few decades as humanity
          has done nothing but continue to pollute and destroy their natural
          habitat? What exactly was the biological response of these organisms
          to the toxic pollutants in the water? We want to bring awareness to
          the pollution of the oceans by creating these sea creatures that are
          (and will be) doomed due to humanity&apos;s irresponsible and
          inconsiderate behavior. We would like to donate 10% of our earnings to
          NGO&apos;s that are actively fighting against ocean pollution, and are
          dedicated to keeping our oceans clean. We are building a constantly
          growing, like-minded community that loves good art and a clean
          environiment! Join us in being the change, show the world that you can
          make a change for a better, more sustainable future! By having a
          Contamy-Nation NFT in Your wallet, You&apos;re showing that
          you&apos;re actively fighting pollution of our oceans and You&apos;re
          helping them stay clean by making a purchase!
        </p>
      </article>
    </section>
  );
}
