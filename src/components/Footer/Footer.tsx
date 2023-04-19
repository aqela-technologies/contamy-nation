import { Typography } from "@material-ui/core";
import React from "react";

const FooterText = (props: { children: React.ReactNode }) => (
  <section className="text-center">
    <Typography color="primary" variant="h4">
      <span className="text-lg md:text-3xl">{props.children}</span>
    </Typography>
  </section>
);
export default function Footer() {
  return (
    <footer className="w-full py-28">
      <FooterText> AQELA Technologies, All rights reserved 2022 </FooterText>
    </footer>
  );
}
