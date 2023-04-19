import React from "react";
import {
    ContaminationTitle,
    Header,
    MintZone,
    CardCarousel,
    InformationalContent,
    Footer,
} from "../components";
import {PublicKey} from "@metaplex-foundation/js";
// import { MintWrapperProps } from "../MintWrapper";
export default function ContamynationHome(props: { candyMachineId:PublicKey }) {
    return (
        <div className="container mx-auto bg-black ">
            <Header />
            <main
                id="main"
                className="font-aaargh relative bg-background-main z-app overflow-hidden"
            >
                <ContaminationTitle />
                <MintZone {...props} />
                <CardCarousel />
                <InformationalContent />
            </main>
            <Footer />
        </div>
    );
}
