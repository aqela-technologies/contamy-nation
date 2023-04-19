import {useCallback} from "react";
import {Box, CircularProgress, Paper, Snackbar, Theme, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {Nft} from "@metaplex-foundation/js";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import Countdown from "react-countdown";

import {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {GatewayProvider} from "@civic/solana-gateway-react";
import {defaultGuardGroup, network} from "../config";
import Sun from "../assets/images/design-elements/sun.png";

import {Minus, MultiMintButton, NumericField, Plus} from "../MultiMintButton";
import {
    MintCount,
} from "../styles";
import {AlertState} from "../utils";
import NftsModal from "../NftsModal";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import useCandyMachineV3 from "../hooks/useCandyMachineV3";
import {
    NftPaymentMintSettings, PaymentRequired,
} from "../hooks/types";
import Grid from "@material-ui/core/Grid";
import {styleConstants} from "../assets/constants/styleConstants";
import Keret from "../assets/images/design-elements/keret.png";

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const WalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
  margin: 30px;
  z-index: 999;
  position: relative;

  .wallet-adapter-dropdown-list {
    background: #ffffff;
  }

  .wallet-adapter-dropdown-list-item {
    background: #000000;
  }

  .wallet-adapter-dropdown-list {
    grid-row-gap: 5px;
  }
`;

const WalletAmount = styled.div`
  color: black;
  width: auto;
  padding: 5px 5px 5px 16px;
  min-width: 48px;
  min-height: auto;
  border-radius: 5px;
  background-color: #85b1e2;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
  0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
  box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
  border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 500;
  line-height: 1.75;
  text-transform: uppercase;
  border: 0;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: flex-start;
  gap: 10px;
`;

const Wallet = styled.ul`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
`;

const ConnectButton = styled(WalletMultiButton)`
  border-radius: 5px !important;
  padding: 6px 16px;
  background-color: #484CB4;
  color: #fff;
  margin: 0 auto;

  :hover {
    opacity: 0.8;
    background-color: #484CB4 !important;
    color: #fff;
  }
`;

const Card = styled(Paper)`
  display: inline-block;
  background-color: var(--countdown-background-color) !important;
  margin: 5px;
  min-width: 40px;
  padding: 24px;

  h1 {
    margin: 0px;
  }
`;

export interface MintZoneContentProps {
    candyMachineId: PublicKey;
}

const candyMachineOps = {};
const MintZoneContent = (props: MintZoneContentProps) => {
    const theme = useTheme<Theme>();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const {connection} = useConnection();
    const wallet = useWallet();
    const candyMachineV3 = useCandyMachineV3(
        props.candyMachineId,
        candyMachineOps
    );

    const [balance, setBalance] = useState<number>();
    const [mintedItems, setMintedItems] = useState<Nft[]>();

    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: "",
        severity: undefined,
    });

    const {guardLabel, guards, guardStates, prices} = useMemo(() => {
        const guardLabel = defaultGuardGroup;
        return {
            guardLabel,
            guards:
                candyMachineV3.guards[guardLabel] ||
                candyMachineV3.guards.default ||
                {},
            guardStates: candyMachineV3.guardStates[guardLabel] ||
                candyMachineV3.guardStates.default || {
                    isStarted: true,
                    isEnded: false,
                    isLimitReached: false,
                    canPayFor: 10,
                    messages: [],
                    isWalletWhitelisted: true,
                    hasGatekeeper: false,
                },
            prices: candyMachineV3.prices[guardLabel] ||
                candyMachineV3.prices.default || {
                    payment: [],
                    burn: [],
                    gate: [],
                },
        };
    }, [
        candyMachineV3.guards,
        candyMachineV3.guardStates,
        candyMachineV3.prices,
    ]);
    useEffect(() => {
        console.log({guardLabel, guards, guardStates, prices});
    }, [guardLabel, guards, guardStates, prices]);
    useEffect(() => {
        (async () => {
            if (wallet?.publicKey) {
                const balance = await connection.getBalance(wallet.publicKey);
                setBalance(balance / LAMPORTS_PER_SOL);
            }
        })();
    }, [wallet, connection]);

    const openOnSolscan = useCallback((mint) => {
        window.open(
            `https://solscan.io/address/${mint}${
                [WalletAdapterNetwork.Devnet, WalletAdapterNetwork.Testnet].includes(
                    network
                )
                    ? `?cluster=${network}`
                    : ""
            }`
        );
    }, []);
    const [mintCount, setMintCount] = useState(1);


    const startMint = useCallback(
        async () => {
            const nftGuards: NftPaymentMintSettings[] = Array(mintCount)
                .fill(undefined)
                .map((_, i) => {
                    return {
                        burn: guards.burn?.nfts?.length
                            ? {
                                mint: guards.burn.nfts[i]?.mintAddress,
                            }
                            : undefined,
                        payment: guards.payment?.nfts?.length
                            ? {
                                mint: guards.payment.nfts[i]?.mintAddress,
                            }
                            : undefined,
                        gate: guards.gate?.nfts?.length
                            ? {
                                mint: guards.gate.nfts[i]?.mintAddress,
                            }
                            : undefined,
                    };
                });

            console.log({nftGuards});
            // debugger;
            candyMachineV3
                .mint(mintCount, {
                    groupLabel: guardLabel,
                    nftGuards,
                })
                .then((items) => {
                    setMintedItems(items as any);
                })
                .catch((e) =>
                    setAlertState({
                        open: true,
                        message: e.message,
                        severity: "error",
                    })
                );
        },
        [candyMachineV3.mint, guards, mintCount]
    );

    useEffect(() => {
        console.log({candyMachine: candyMachineV3.candyMachine});
    }, [candyMachineV3.candyMachine]);

    const limit = useMemo(() => guardStates.canPayFor, [guardStates]);

    const totalSolCost = useMemo(
        () =>
            prices
                ? mintCount *
                (prices.payment
                        .filter(({kind}) => kind === "sol")
                        .reduce((a, {price}) => a + price, 0) +
                    0.012)
                : 0.012,
        [mintCount, prices]
    );


    const deepClone = (items: PaymentRequired[]) =>
        items.map((item) => ({...item}));


    const totalTokenCosts = useMemo((): PaymentRequired[] => {
        if (!prices) return [];
        const maxPriceHash: { [k: string]: number } = {};
        const payment$burn$lenth = prices.payment.length + prices.burn.length;
        let payments = deepClone(
            prices.payment.concat(prices.burn).concat(prices.gate)
        ).filter((price, index) => {
            const cacheKey = price.mint?.toString();
            if (!["token", "nft"].includes(price.kind)) return false;
            const alreadyFound = !!maxPriceHash[cacheKey];
            if (index < payment$burn$lenth) price.price *= mintCount;
            price.price = maxPriceHash[cacheKey] = Math.max(
                maxPriceHash[cacheKey] || 0,
                price.price
            );
            return !alreadyFound;
        });
        return payments;
    }, [mintCount, prices]);

    const totalTokenCostsString = useMemo(() => {
        return totalTokenCosts.reduce(
            (text, price) => `${text} + ${price.price} ${price.label}`,
            ""
        );
    }, [totalTokenCosts]);


    function incrementValue() {
        var numericField = document.querySelector(".mint-qty") as HTMLInputElement;
        if (numericField) {
            var value = parseInt(numericField.value);
            if (!isNaN(value) && value < Math.min(10, candyMachineV3.items.remaining)) {
                value++;
                numericField.value = "" + value;
                updateAmounts(value);
            }
        }
    }

    function decrementValue() {
        var numericField = document.querySelector(".mint-qty") as HTMLInputElement;
        if (numericField) {
            var value = parseInt(numericField.value);
            if (!isNaN(value) && value > 1) {
                value--;
                numericField.value = "" + value;
                updateAmounts(value);
            }
        }
    }

    function updateMintCount(target: any) {
        var value = parseInt(target.value);
        if (!isNaN(value)) {
            if (value > Math.min(10, candyMachineV3.items.remaining)) {
                value = Math.min(10, candyMachineV3.items.remaining);
                target.value = "" + value;
            } else if (value < 1) {
                value = 1;
                target.value = "" + value;
            }
            updateAmounts(value);
        }
    }

    function updateAmounts(qty: number) {
        setMintCount(qty);
        // setTotalCost(Math.round(qty * (price + 0.012) * 1000) / 1000); // 0.012 = approx of account creation fees
    }

    const disabled = useMemo(
        () =>
            !candyMachineV3.items.remaining ||
            candyMachineV3.status.minting ||
            !guardStates.isStarted ||
            guardStates.isEnded ||
            !(!!candyMachineV3.items.remaining) ||
            mintCount > limit,
        [candyMachineV3, guardStates]
    );

    const MintButton = ({
                            gatekeeperNetwork,
                        }: {
        gatekeeperNetwork?: PublicKey;
    }) => (
        <MultiMintButton
            candyMachine={candyMachineV3.candyMachine}
            gatekeeperNetwork={gatekeeperNetwork}
            isMinting={candyMachineV3.status.minting}
            setIsMinting={() => {
            }}
            isActive={!!candyMachineV3.items.remaining}
            isEnded={guardStates.isEnded}
            isSoldOut={!candyMachineV3.items.remaining}
            guardStates={guardStates}
            onMint={startMint}
            prices={prices}
            disabled={disabled}
        />
    );

    return (
        <Grid className="relative" container direction="row">
            <img
                src={Sun.src}
                alt="Sun"
                className={`${styleConstants.centerFullyBehindHeight} transform -translate-x-1/2`}
                style={{aspectRatio: "1/1", maxWidth: "none", left: "50%"}}
            />
            <Grid item xs={false} sm={3}/>
            <Grid item xs={9} sm={6} className="relative">
                <img className="relative z-top" src={Keret.src} alt="keret"/>
                <section
                    className="absolute w-4/5 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-top"
                    style={{height: "41.5%", top: "49.5%", left: "49.5%"}}
                >
                    <Box className="relative h-full flex flex-col justify-center">
                        <Paper
                            style={{
                                padding: 24,
                                paddingBottom: 10,
                                backgroundColor: "transparent",
                                borderRadius: 6,
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-evenly",
                            }}
                        >

                            <>
                                {/*<Header>*/}
                                {/*    <WalletContainer>*/}
                                {/*        <Wallet>*/}
                                {/*            {wallet ? (*/}
                                {/*                <WalletAmount>*/}
                                {/*                    {(balance || 0).toLocaleString()} SOL*/}
                                {/*                    <ConnectButton/>*/}
                                {/*                </WalletAmount>*/}
                                {/*            ) : (*/}
                                {/*                <ConnectButton>Connect Wallet</ConnectButton>*/}
                                {/*            )}*/}
                                {/*        </Wallet>*/}
                                {/*    </WalletContainer>*/}
                                {/*</Header>*/}
                                {guardStates.isStarted && wallet?.publicKey && (
                                    <Typography
                                        variant={matches ? "h6" : "h5"}
                                        align="center"
                                        display="block"
                                        color="primary"
                                        style={{
                                            marginBottom: 7,
                                            color: "#fff",
                                            textTransform: "uppercase",
                                            fontWeight: "bold",
                                            flex: 1,
                                        }}
                                    >
                                        {guardStates.isEnded || candyMachineV3.items.remaining === 0 ?
                                            "Minting has Ended" : "Minting is Live"
                                        }
                                    </Typography>
                                )}

                                {guardStates.isStarted && wallet?.publicKey && (
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        style={{flex: 2}}

                                    >
                                        <Grid item xs={4}>
                                            <Typography
                                                variant={matches ? "body2" : "h6"}
                                                className="uppercase text-center"
                                                style={{fontWeight: "bold"}}
                                                color="textPrimary"
                                            >
                                                Price:
                                            </Typography>
                                            <Typography
                                                variant={matches ? "body2" : "h6"}
                                                className="uppercase text-center text-golden"
                                                style={{fontWeight: "bold"}}
                                            >
                                                ◎ {prices.payment[0]?.price}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography
                                                variant={matches ? "body2" : "h6"}
                                                className="uppercase text-center"
                                                style={{fontWeight: "bold"}}
                                                color="textPrimary"
                                            >
                                                Supply
                                            </Typography>
                                            <Typography
                                                variant={matches ? "body2" : "h6"}
                                                className="uppercase text-center text-golden"
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {candyMachineV3.items.available}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography
                                                variant={matches ? "body2" : "h6"}
                                                className="uppercase text-center"
                                                style={{fontWeight: "bold"}}
                                                color="textPrimary"
                                            >
                                                Minted
                                            </Typography>
                                            <Typography
                                                variant={matches ? "body2" : "h6"}
                                                className="uppercase text-center text-golden"
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {candyMachineV3.items.redeemed}/
                                                {candyMachineV3.items.available}{" "}
                                                {(guards?.mintLimit?.mintCounter?.count ||
                                                    guards?.mintLimit?.settings?.limit) && (
                                                    <>
                                                        ({guards?.mintLimit?.mintCounter?.count || "0"}
                                                        {guards?.mintLimit?.settings?.limit && (
                                                            <>/{guards?.mintLimit?.settings?.limit} </>
                                                        )}
                                                        by you)
                                                    </>
                                                )}
                                            </Typography>
                                        </Grid>

                                        {candyMachineV3.status.minting && (
                                            <Grid item xs={12} container justifyContent="center">
                                                <div className="hidden md:flex">
                                                    <CircularProgress/>
                                                </div>
                                            </Grid>
                                        )}
                                        {limit  === 0 && candyMachineV3.items.remaining !== 0 && (
                                                <Typography variant='h4' align={'center'}>You might need more SOL in order to buy at least one item (this includes possible transaction fees)</Typography>
                                            )}
                                        {candyMachineV3.items.remaining !== 0 && !candyMachineV3.status.minting && limit > 0 && (
                                            <Grid item xs={false} container justifyContent={"center"}>
                                                <div className="hidden md:flex w-full justify-center">
                                                    <Typography align={"center"}>Quantity (estimated total
                                                        price: {totalSolCost} SOL):
                                                    </Typography>
                                                </div>
                                                <div className="hidden md:flex flex-row justify-center w-full">
                                                    <Minus
                                                        disabled={disabled || mintCount <= 1}
                                                        onClick={() => decrementValue()}
                                                    >
                                                        <span style={{marginTop: "-5px !important"}}>-</span>
                                                    </Minus>
                                                    <NumericField
                                                        disabled={disabled}
                                                        type="number"
                                                        className="mint-qty text-black"
                                                        step={1}
                                                        min={1}
                                                        max={Math.min(limit, 10)}
                                                        value={mintCount}
                                                        onChange={(e) => updateMintCount(e.target as any)}
                                                    />
                                                    <Plus
                                                        disabled={disabled || limit <= mintCount}
                                                        onClick={() => incrementValue()}
                                                    >
                                                        +
                                                    </Plus>
                                                </div>
                                            </Grid>
                                        )}

                                    </Grid>

                                )}
                                {!guardStates.isStarted ? (
                                    <Box className="grid content-center w-full h-full">
                                        <Countdown
                                            date={guards.startTime}
                                            renderer={renderGoLiveDateCounter}
                                            onComplete={() => {
                                                candyMachineV3.refresh();
                                            }}
                                        />
                                    </Box>
                                ) : !wallet?.publicKey ? (
                                    <ConnectButton>Connect Wallet</ConnectButton>
                                    // ) : !guardStates.canPayFor ? (
                                    //   <h1>You cannot pay for the mint</h1>
                                ) : !guardStates.isWalletWhitelisted ? (
                                    <h1>Mint is private.</h1>
                                ) : (
                                    <>
                                    </>
                                )}
                                <NftsModal
                                    openOnSolscan={openOnSolscan}
                                    mintedItems={mintedItems || []}
                                    setMintedItems={setMintedItems}
                                />

                            </>
                        </Paper>
                    </Box>
                </section>
                <Snackbar
                    open={alertState.open}
                    autoHideDuration={6000}
                    onClose={() => setAlertState({...alertState, open: false})}
                >
                    <Alert
                        onClose={() => setAlertState({...alertState, open: false})}
                        severity={alertState.severity}
                    >
                        {alertState.message}
                    </Alert>
                </Snackbar>
            </Grid>
            <Grid
                item
                container
                direction="column"
                justifyContent="center"
                xs={3}
                className="z-top"
            >
                <div>
                    {!!candyMachineV3.items.remaining &&
                    guardStates.hasGatekeeper &&
                    wallet.publicKey &&
                    wallet.signTransaction ? (
                        <GatewayProvider
                            wallet={{
                                publicKey: wallet.publicKey,
                                //@ts-ignore
                                signTransaction: wallet.signTransaction,
                            }}
                            gatekeeperNetwork={guards.gatekeeperNetwork}
                            connection={connection}
                            cluster={
                                process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet"
                            }
                            options={{autoShowModal: false}}
                        >
                            <MintButton
                                gatekeeperNetwork={guards.gatekeeperNetwork}
                            />
                        </GatewayProvider>
                    ) : (
                        <MintButton/>
                    )}
                </div>
            </Grid>
            {candyMachineV3.status.minting && (
                <Grid item xs={12} container justifyContent="center" className="z-top py-8">
                    <div className="flex md:hidden">
                        <CircularProgress size={100} color={"secondary"} className="flex md:hidden"/>
                    </div>
                </Grid>
            )}
            {!candyMachineV3.status.minting && !disabled &&
                <div className="mx-auto w-4/5 flex md:hidden flex-col justify-center relative z-top py-8">
                    <div className="w-full text-white text-center">
                        <Typography variant="h4" className="pb-8"><span className="text-center">Quantity (estimated total
                            price: {totalSolCost} SOL):</span></Typography>
                    </div>
                    <div className="w-full flex flex-row justify-center">
                        <Minus
                            disabled={disabled || mintCount <= 1}
                            onClick={() => decrementValue()}
                        >
                            <span style={{marginTop: "-5px !important"}}>-</span>
                        </Minus>
                        <NumericField
                            disabled={disabled}
                            type="number"
                            className="mint-qty text-black"
                            step={1}
                            min={1}
                            max={Math.min(limit, 10)}
                            value={mintCount}
                            onChange={(e) => updateMintCount(e.target as any)}
                        />
                        <Plus
                            disabled={disabled || limit <= mintCount}
                            onClick={() => incrementValue()}
                        >
                            +
                        </Plus>
                    </div>
                </div>}
        </Grid>
    );
};

export default MintZoneContent;

const renderGoLiveDateCounter = ({days, hours, minutes, seconds}: any) => {
    return (
        <>
            <div className="hidden sm:flex justify-center">
                <Card elevation={1}>
                    <h1>{days}</h1>Days
                </Card>
                <Card elevation={1}>
                    <h1>{hours}</h1>
                    Hours
                </Card>
                <Card elevation={1}>
                    <h1>{minutes}</h1>Mins
                </Card>
                <Card elevation={1}>
                    <h1>{seconds}</h1>Secs
                </Card>
            </div>
            <div className="flex sm:hidden justify-center">
                <Typography variant={"h4"}>
                    {days}:
                    {hours}:
                    {minutes}:
                    {seconds}</Typography>
            </div>
        </>
    );
};
