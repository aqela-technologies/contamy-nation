import { IconProps } from "../../../types/types";
import Aqela from "../../../assets/images/aqela/aqela-logo.svg";
import IconWrapper from "../IconWrapper/IconWrapper";
export default function AqelaIcon(props: IconProps) {
  return (
    <IconWrapper onClick={()=>{
        if(window.top){
            window.top.location.replace("https://aqela.org/")
            return
        }
        window.location.replace("https://aqela.org/")}}>
      <img
        src={Aqela.src}
        width={props.width || 50}
        height={props.height || 50}
        style={{ aspectRatio: "1/1" }}
        alt={"Aqela Icon"}
      />
    </IconWrapper>
  );
}
