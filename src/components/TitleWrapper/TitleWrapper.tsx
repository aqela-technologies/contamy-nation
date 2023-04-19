import { Theme, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import Background from "../../assets/images/design-elements/header_background.png";
import Image from "next/image";
export default function TitleWrapper(props: {
  id?: string;
  children: React.ReactNode;
}) {
  const theme = useTheme<Theme>();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <article id={props.id} className="relative">
      <section className="text-center text-yellow-200 font-bold text-6xl md:text-8xl xl:text-8xl w-full">
        <img
          src={Background.src}
          alt="header background"
          className="absolute left-1/2 transform"
          style={{
            height: matches ? "600%" : "400%",
            transform: "translate(-50%,-35%)",
          }}
        />
        {props.children}
      </section>
    </article>
  );
}
