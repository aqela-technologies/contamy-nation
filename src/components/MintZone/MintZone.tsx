import TopZoneWaves from "../TopZoneWaves";
import {PublicKey} from "@metaplex-foundation/js";
import MintZoneContent from "../MintZoneContent";
// import MintWrapper, { MintWrapperProps } from "../../MintWrapper";
export default function MintZone(props: { candyMachineId:PublicKey }) {
  return (
    <section id="mint-zone" className="relative">
      <div className={`w-full absolute top-0 h-full`}>
        <TopZoneWaves />
      </div>
      <MintZoneContent {...props} />
    </section>
  );
}
