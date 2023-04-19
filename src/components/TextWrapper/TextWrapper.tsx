import { Theme, useMediaQuery } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/styles";
import TextDecor from "../../assets/images/design-elements/text_decor.png";
import TextDecorSmallScreen from "../../assets/images/design-elements/text_decor_small_screen.png";


export default function TextWrapper(props: {
  children: React.ReactNode;
  last?: boolean;
}) {
  const theme = useTheme<Theme>();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div
      className={` ${props.last ? "pb-12" : "pb-32"} ${
        matches ? "pt-16" : "pt-0"
      }`}
    >
      <div
        className={`relative mx-auto mt-32 w-full my-sm:w-4/5`}
      >
        <img
          src={matches ? TextDecorSmallScreen.src : TextDecor.src}
          alt="text-rim"
          className="object-center max-h-full max-w-full w-full"
        />
        <p
          className={`text-white absolute TextWrapper text-center text-sm md:text-3xl h-full`}
        >
          {props.children}
        </p>
      </div>
    </div>
  );
}
